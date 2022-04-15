import { getBikes } from "../api/bikes"

export const getFirstPage = (filters) => {
  return getBikes(filters)
}