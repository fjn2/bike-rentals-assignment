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
      available: query.available,
      model: query.model ? { operation: 'like', value: query.model } : undefined,
      color: query.color ? { operation: 'like', value: query.color } : undefined,
      rating: query.rating ? +query.rating : undefined,
      // TODO implement localization filter
    }
  }
  return this
}


module.exports = bikeSvc