const bikeSvc = require('./bikeSvc')
const reservationSvc = require('./reservationSvc')

const bikeSvcInstance = new bikeSvc()
const reservationSvcInstance = new reservationSvc()

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_OFFSET = 0

const HIGHT_NUMBER = 99999

const bikeReservationSvc = function() {
  this.getList = async (filters, pagination) => {
    const bikeResp = await bikeSvcInstance.getList(filters, { count: HIGHT_NUMBER })
    // Check for bike availability
    const promises = bikeResp.data.map(async (bike) => {
      let isBikeAvailable = true
      const filterReservationByBike = {
        bikeId: bike.id
      }
      const reservationResp = await reservationSvcInstance.getList(filterReservationByBike, { total: HIGHT_NUMBER })
      reservationResp.data.find((reservation) => {
        const reservationDateFinish = (new Date(reservation.from)).setDate((new Date(reservation.from).getDate() + reservation.days))
        if (filters.dateFrom) {
          if (new Date(filters.dateFrom) > new Date(reservation.from) && new Date(filters.dateFrom) < reservationDateFinish) {
            isBikeAvailable = false
          }
        }
        if (filters.dateTo) {
          if (new Date(filters.dateTo) > new Date(reservation.from) && new Date(filters.dateTo) < reservationDateFinish) {
            isBikeAvailable = false
          }
        }
        if (filters.dateFrom && filters.dateTo) {
          if (new Date(filters.dateFrom) < new Date(reservation.from) && new Date(filters.dateTo) > reservationDateFinish) {
            isBikeAvailable = false
          }
        }
      })
      
      return {
        isBikeAvailable,
        ...bike
      }
    })

    const bikesWithAvailability = await Promise.all(promises)

    const avaiableBikes = bikesWithAvailability.filter((bike) => bike.isBikeAvailable || !filters.available )
    const data = avaiableBikes.slice(
      pagination.offset || DEFAULT_OFFSET,
      (pagination.offset || DEFAULT_OFFSET) + (pagination.count || DEFAULT_PAGE_SIZE))

    return {
      data: data,
      meta: {
        total: avaiableBikes.length,
        offset: pagination.offset || DEFAULT_OFFSET,
        count: pagination.count || DEFAULT_PAGE_SIZE
      }
    }
  }


  this.formatFilters = (query) => {
    return {
      available: query.available === 'true' ? true : undefined,
      model: query.model ? { operation: 'like', value: query.model } : undefined,
      color: query.color ? { operation: 'like', value: query.color } : undefined,
      rating: query.rating ? +query.rating : undefined,
      dateFrom: query.dateFrom ? new Date(query.dateFrom) : undefined,
      dateTo: query.dateTo ? new Date(query.dateTo) : undefined,
      // TODO implement localization filter
    }
  }

  return this
}


module.exports = bikeReservationSvc