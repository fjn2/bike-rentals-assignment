const { getInstance } = require('../db')

const RESOURCE_NAME = 'users'

const userSvc = function() {
  this.getList = async (filters, pagination) => {
    const resp = await getInstance().getList(RESOURCE_NAME, filters, pagination)
    // calculate the rating
    const data = resp.data.map(({
      password, // discard password prop
      ...otherProps
    }) => ({
      ...otherProps
    }))

    return {
      data,
      meta: resp.meta
    }
  }

  this.create = async (data) => {
    return await getInstance().create(RESOURCE_NAME, data)
  }

  this.getById = async (id) => {
    return await getInstance().getOne(RESOURCE_NAME, id)
  }

  this.updateById = async (id, data) => {
    return await getInstance().update(RESOURCE_NAME, id, data)
  }

  this.deleteById = async (id) => {
    return await getInstance().delete(RESOURCE_NAME, id)
  }

  return this
}


module.exports = userSvc