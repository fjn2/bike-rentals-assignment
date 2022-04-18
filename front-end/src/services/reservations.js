import {
  getReservations,
  createReservation,
  cancelReservationApi,
  updateReservationApi
} from "../api/reservations"

const PAGE_SIZE = 10

export const getFirstPage = (filters) => {
  return getReservations(filters)
}

export const getNextPage = (filters, meta) => {
  return getReservations(filters, { count: PAGE_SIZE, offset: meta.offset + meta.count })
}

export const reserveBike = (data) => {
  return createReservation(data)
}

export const cancelReservation = (data) => {
  return cancelReservationApi(data)
}

export const updateReservation = (reservation) => {
  return updateReservationApi(reservation)
}