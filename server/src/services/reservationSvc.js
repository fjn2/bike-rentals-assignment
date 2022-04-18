const { getInstance } = require('../db')
const userSvc = require('./userSvc')
const bikeSvc = require('./bikeSvc')

const RESOURCE_NAME = 'reservations'

const userSvcInstance = new userSvc()
const bikeSvcInstance = new bikeSvc()

const reservationSvc = function() {
  this.formatFilters = (query) => {
    return {
      userId: query.userId
    }
  }
  this.getList = async (filters, pagination) => {
    const reservationsResp = await getInstance().getList(RESOURCE_NAME, filters, pagination)
    
    // get user information
    const userPromises = reservationsResp.data.map(async (reservation) => {
      const user = await userSvcInstance.getById(reservation.userId)
      reservation.user = user
    })

    // get bike information
    const bikePromises = reservationsResp.data.map(async (reservation) => {
      const bike = await bikeSvcInstance.getById(reservation.bikeId)
      reservation.bike = bike
    })

    // for for the resolution of the queries
    await Promise.all([...userPromises, ...bikePromises])

    // format output
    const formattedOutput = reservationsResp.data.map(({
      userId,
      bikeId,
      ...otherProps
    }) => otherProps)

    return {
      data: formattedOutput,
      meta: reservationsResp.meta
    }
  }

  this.rateReservation = async (reservation, newReservationData) => {
    if (newReservationData.rating) {
      // check if the user has already rated the reservation
      if (reservation.rating) {
        // check if the rating has changed
        if (reservation.rating !== newReservationData.rating) {
          // update the information
          const bike = await bikeSvcInstance.getById(reservation.bikeId)
          if (!bike) {
            return ['bike not found']
          }
          bike.ratingAcum += (newReservationData.rating - reservation.rating)
          await bikeSvcInstance.updateById(bike.id, bike)
        }
      } else {
        // add new rate information to the bike
        const bike = await bikeSvcInstance.getById(reservation.bikeId)
        if (!bike) {
          return ['bike not found']
        }
        bike.ratingVotes += 1
        bike.ratingAcum += newReservationData.rating
        await bikeSvcInstance.updateById(bike.id, bike)
      }
    }
  }

  this.validate = (data) => {
    const errors = []
    if (!data.from) {
      errors.push('The date field is not defined')
    }
    if (!data.days) {
      errors.push('The days field is not defined')
    }
    if (!data.userId) {
      errors.push('The user field is not defined')
    }
    return errors.length ? errors : null
  }

  this.createReservation = async (data) => {
    const resp = await getInstance().create(RESOURCE_NAME, data)
    return {
      data: resp
    }
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


module.exports = reservationSvc