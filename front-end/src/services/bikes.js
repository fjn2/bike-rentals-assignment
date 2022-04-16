import { getBikes } from "../api/bikes"

const PAGE_SIZE = 10

export const getFirstPage = (filters) => {
  return getBikes(filters)
}

export const getNextPage = (filters, meta) => {
  return getBikes(filters, { count: PAGE_SIZE, offset: meta.offset + meta.count })
}