const { v4: uuidv4 } = require('uuid');
const generateMockedData = require('./_initialMockedData')
const RESOURCES = require('./resources')

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_OFFSET = 0

const OPERATIONS = {
  GT: 'gt',
  LT: 'lt'
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

  this.create = async (resource, data) => {
    const id = uuidv4()
    data[resource][id] = {
      id,
      ...data
    }
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
    const allItemsKeys = Object.keys(data[resource]).filter((key) => {
      let itemMatchWithCriteria = true
      Object.keys(filterCriteria).forEach((resourceFieldName) => {
        // for number and string match the exact number
        if (['number', 'string'].includes(typeof filterCriteria[resourceFieldName])) {
          if (filterCriteria[resourceFieldName] !== data[resource][key][resourceFieldName]) {
            itemMatchWithCriteria = false
          }
        } else if (filterCriteria[resourceFieldName]) {
          console.log(filterCriteria, resourceFieldName)
          // it is an Object
          if (filterCriteria[resourceFieldName].operation == OPERATIONS.GT) {
            if (!(data[resource][key] > filterCriteria[resourceFieldName].value)) {
              itemMatchWithCriteria = false
            }
          } else if (filterCriteria[resourceFieldName].operation == OPERATIONS.LT) {
            if (!(data[resource][key] < filterCriteria[resourceFieldName].value)) {
              itemMatchWithCriteria = false
            }
          } else {
            // OPERATION NOT IMPLEMENTED
          }
        }
      })
      return itemMatchWithCriteria
    })
    return {
      data: allItemsKeys.map(key => data[resource][key]).slice(
        pagination.offset || DEFAULT_OFFSET,
        pagination.count || DEFAULT_PAGE_SIZE
        ),
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