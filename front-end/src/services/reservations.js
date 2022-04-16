import { getReservations, createReservation } from "../api/reservations"

const PAGE_SIZE = 10

export const getFirstPage = () => {
  return getReservations()
}

export const getNextPage = (meta) => {
  return getReservations({ count: PAGE_SIZE, offset: meta.offset + meta.count })
}

export const reserveBike = (data) => {
  return createReservation(data)
}