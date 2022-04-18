import qs from 'qs'
import { Bike, PaginatedObject, BikeFilters, Pagination } from "./types"
import { getUserToken } from './utils'

const URL = `${process.env.REACT_APP_BACKEND_URL}/bikes`

export const getBikes = async (filters: BikeFilters, pagination: Pagination) : Promise<PaginatedObject<Bike>> => {
  return fetch(`${URL}/with-reservations?${qs.stringify({ ...filters, ...pagination })}`, {
    headers: {
      authentication: getUserToken()
    }
  })
    .then(r => r.json())
    .catch(e => console.log(e))
}

export const createBikeApi = async () => {
  return fetch(`${URL}`, {
    method: 'POST',
    headers: {
      authentication: getUserToken()
    }
  })
}

export const updateBikeApi = async (data: Bike) => {
  return fetch(`${URL}`, {
    method: 'PUT',
    headers: {
      authentication: getUserToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}


export const deleteBikeApi = async (bikeId : string) => {
  return fetch(`${URL}/${bikeId}`, {
    method: 'DELETE',
    headers: {
      authentication: getUserToken()
    }
  })
}