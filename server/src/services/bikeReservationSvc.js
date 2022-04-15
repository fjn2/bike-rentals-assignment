const bikeSvc = require('./bikeSvc')
const reservationSvc = require('./reservationSvc')

const bikeSvcInstance = new bikeSvc()
const reservationSvcInstance = new reservationSvc()

const HIGHT_NUMBER = 99999

const bikeReservationSvc = function() {
  this.getList = async (filters, pagination) => {
    const bikeResp = await bikeSvcInstance.getList(filters, { total: HIGHT_NUMBER })

    const promises = bikeResp.data.map(async (bike) => {
      let isBikeAvailable = true
      const filterReservationByBike = {
        bikeId: bike.id
      }
      const reservationResp = await reservationSvcInstance.getList(filterReservationByBike, { total: HIGHT_NUMBER })
      reservationResp.data.find((reservation) => {
        const reservationDateFinish = (new Date(reservation.from)).setDate((new Date(reservation.from).getDate() + reservation.days))
        if (filters.dateFrom) {
          if (filters.dateFrom > reservation.from && filters.dateFrom < reservationDateFinish) {
            isBikeAvailable = false
          }
        }
        if (filters.dateTo) {
          if (filters.dateTo > reservation.from && filters.dateTo < reservationDateFinish) {
            isBikeAvailable = false
          }
        }
        if (filters.dateFrom && filters.dateTo) {
          if (filters.dateFrom < reservation.from && filters.dateTo > reservationDateFinish) {
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

    const avaiableBikes = bikesWithAvailability.filter((bike) => bike.isBikeAvailable)

    return {
      data: avaiableBikes.slice(pagination.offset, pagination.total),
      meta: {
        offset: pagination.offset,
        total: pagination.total
      }
    }
  }


  this.formatFilters = (query) => {
    return {
      available: query.available,
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