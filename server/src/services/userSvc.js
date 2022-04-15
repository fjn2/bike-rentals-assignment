const { getInstance } = require('../db')

const RESOURCE_NAME = 'users'

const userSvc = function() {
  this.getList = async (filters, pagination) => {
    const resp = await getInstance().getList(RESOURCE_NAME, filters, pagination)
    // calculate the rating
    const dataWithRating = resp.data.map(({
      password, // discard password prop
      ...otherProps
    }) => ({
      ...otherProps
    }))

    return {
      data: dataWithRating,
      meta: resp.meta
    }
  }

  this.getById = async (id) => {
    return await getInstance().getOne(RESOURCE_NAME, id)
  }
  return this
}


module.exports = userSvc