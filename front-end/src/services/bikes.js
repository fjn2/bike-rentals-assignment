import { getBikes, createBikeApi, updateBikeApi, deleteBikeApi } from "../api/bikes"

const PAGE_SIZE = 10

export const getFirstPage = (filters) => {
  return getBikes(filters)
}

export const getNextPage = (filters, meta) => {
  return getBikes(filters, { count: PAGE_SIZE, offset: meta.offset + meta.count })
}

export const createBike = () => {
  return createBikeApi()
}

export const updateBike = (data) => {
  return updateBikeApi(data)
}

export const deleteBike = (data) => {
  return deleteBikeApi(data)
}
