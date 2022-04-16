import qs from 'qs'
import { Bike, PaginatedObject, BikeFilters, Pagination } from "./types"

const URL = `${process.env.REACT_APP_BACKEND_URL}/bikes`

export const getBikes = async (filters: BikeFilters, pagination: Pagination) : Promise<PaginatedObject<Bike>> => {
  return fetch(`${URL}?${qs.stringify({ ...filters, ...pagination })}`)
    .then(r => r.json())
    .catch(e => console.log(e))
}
