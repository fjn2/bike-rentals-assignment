const debug = require('debug')('app:DB')
const { v4: uuidv4 } = require('uuid');
const generateMockedData = require('./_initialMockedData')
const RESOURCES = require('./resources')

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_OFFSET = 0

const OPERATIONS = {
  GT: 'gt',
  LT: 'lt',
  LIKE: 'like'
}

const initialDbStructure = {
  [RESOURCES.BIKES]: {},
  [RESOURCES.USERS]: {},
  [RESOURCES.RESERVATIONS]: {}
}

const InMemoryDb = function({
  withMockedData
}) {
  console.log('InMemoryDb - initialization')
  const data = withMockedData ? generateMockedData() : initialDbStructure;

  this.create = async (resource, newItem) => {
    debug('create', resource, newItem)
    const id = uuidv4()
    data[resource][id] = {
      id,
      ...newItem
    }

    return data[resource][id]
  }

  this.update = async (resource, id, data) => {
    data[resource][id] = data
  }

  this.delete = async (resource, id) => {
    delete data[resource][id]
  }

  this.getOne = async (resource, id) => {
    return data[resource][id]
  }

  this.getList = async (resource, filterCriteria, pagination = {}) => {
    debug('getList', resource, filterCriteria, pagination)
    const allItemsKeys = Object.keys(data[resource]).filter((key) => {
      let itemMatchWithCriteria = true
      Object.keys(filterCriteria).forEach((resourceFieldName) => {
        // for number and string match the exact number
        if (['number', 'string'].includes(typeof filterCriteria[resourceFieldName])) {
          if (filterCriteria[resourceFieldName] !== data[resource][key][resourceFieldName]) {
            itemMatchWithCriteria = false
          }
        } else if (filterCriteria[resourceFieldName]) {
          // it is an Object
          if (filterCriteria[resourceFieldName].operation == OPERATIONS.GT) {
            if (!(data[resource][key] > filterCriteria[resourceFieldName].value)) {
              itemMatchWithCriteria = false
            }
          } else if (filterCriteria[resourceFieldName].operation == OPERATIONS.LT) {
            if (!(data[resource][key] < filterCriteria[resourceFieldName].value)) {
              itemMatchWithCriteria = false
            }
          } else if (filterCriteria[resourceFieldName].operation == OPERATIONS.LIKE) {
            if (!(data[resource][key][resourceFieldName].indexOf(filterCriteria[resourceFieldName].value) > -1)) {
              itemMatchWithCriteria = false
            }
          } else {
            debug(`The operation "${filterCriteria[resourceFieldName].operation}" is not supported`)
          }
        }
      })
      return itemMatchWithCriteria
    })
    return {
      data: allItemsKeys.map(key => data[resource][key]).slice(
        pagination.offset || DEFAULT_OFFSET,
        (pagination.offset || DEFAULT_OFFSET) + pagination.count || DEFAULT_PAGE_SIZE),
      meta: {
        total: allItemsKeys.length,
        offset: pagination.offset || DEFAULT_OFFSET,
        count: pagination.count || DEFAULT_PAGE_SIZE
      }
    }
  }

  return this
}

module.exports = InMemoryDb