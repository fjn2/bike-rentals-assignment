import qs from 'qs'
import { PaginatedObject, Pagination, Reservation, ApiOperation } from "./types"
import { getUserToken } from './utils'

const URL = `${process.env.REACT_APP_BACKEND_URL}/reservations`

export const getReservations = async (pagination: Pagination) : Promise<PaginatedObject<Reservation>> => {
  return fetch(`${URL}?${qs.stringify({ ...pagination })}`, {
    headers: {
      authentication: getUserToken()
    }
  })
    .then(r => r.json())
    .catch(e => console.log(e))
}

export const createReservation = async (data: Reservation) : Promise<ApiOperation> => {
  return fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authentication: getUserToken()
    },
    body: JSON.stringify(data)
  })
    .then(r => r.json())
    .catch(e => console.log(e))
}
