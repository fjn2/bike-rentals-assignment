const { getInstance } = require('../db')

const RESOURCE_NAME = 'bikes'

const bikeSvc = function() {
  this.getList = async (filters, pagination) => {
    const resp = await getInstance().getList(RESOURCE_NAME, filters, pagination)
    // calculate the rating
    const dataWithRating = resp.data.map(({
      ratingAcum,
      ratingVotes,
      ...otherProps
    }) => ({
      ...otherProps,
      rating: Math.round(ratingAcum / ratingVotes)
    }))

    return {
      data: dataWithRating,
      meta: resp.meta
    }
  }

  this.formatFilters = (query) => {
    return {
      available: query.available === 'true' ? true : undefined,
      model: query.model ? { operation: 'like', value: query.model } : undefined,
      color: query.color ? { operation: 'like', value: query.color } : undefined,
      rating: query.rating ? +query.rating : undefined,
      // TODO implement localization filter
    }
  }

  this.create = async (data) => {
    return await getInstance().create(RESOURCE_NAME, data)
  }

  this.updateById = async (id, data) => {
    return await getInstance().update(RESOURCE_NAME, id, data)
  }

  this.getById = async (id) => {
    return await getInstance().getOne(RESOURCE_NAME, id)
  }

  this.deleteById = async (id) => {
    return await getInstance().delete(RESOURCE_NAME, id)
  }

  return this
}


module.exports = bikeSvc