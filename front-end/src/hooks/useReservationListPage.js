import { useEffect, useState } from "react"
import { getFirstPage, getNextPage, updateReservation} from "../services/reservations"
import {
  getFirstPage as getFirstBikesPage
} from "../services/bikes"
import {
  getFirstPage as getFirstUsersPage
} from "../services/users"
import useApplication from "./useApplication"
import {
  cancelReservation as cancelReservationSvc,
} from "../services/reservations"

const useReservationListPage = () => {
  const [reservations, setReservations] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allBikes, setAllBikes] = useState([])

  // filters are only used by managers
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState()
  const [{ user }] = useApplication()

  const nextPage = () => {
    if (!meta) {
      return
    }
    const hasMore = meta.total - (meta.offset + meta.count) > 0

    if (!loading && hasMore && user) {
      setLoading(true)
      getNextPage({
        ...filters,
        userId: user.rol === 'manager' ? filters.userId : user.id,
      }, meta).then(({ data, meta: newMeta }) => {
        setReservations([
          ...reservations,
          ...data
        ])
        setMeta(newMeta)
        setLoading(false)
      })
    }
  }

  const loadFirstPage = () => {
    setLoading(true)
    return getFirstPage({
      ...filters,
      userId: user.rol === 'manager' ? filters.userId : user.id,
    }, meta).then(({data, meta}) => {
      setReservations(data)
      setMeta(meta)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (user) {
      loadFirstPage()
    }
  }, [user, filters])

  useEffect(() => {
    if (user && user.rol === 'manager') {
      getFirstBikesPage({}, { count: 9999 }).then((resp) => {
        setAllBikes(resp.data)
      })
      getFirstUsersPage({}, { count: 9999 }).then((resp) => {
        setAllUsers(resp.data)
      })
    }
  }, [user])
  
  const cancelReservation = (data) => {
    cancelReservationSvc(data).then(() => {
      loadFirstPage()
    })
  }

  const updateRating = (reservationId, newValue) => {
    const reservationToUpdate = reservations.find(r => r.id === reservationId)
    reservationToUpdate.rating = newValue
    if (!reservationToUpdate) {
      console.log('The reservation to update was not found in the reservations list')
    }
    return updateReservation(reservationToUpdate)
  }

  return [{
    reservations,
    loading,
    filters,
    meta,
    allBikes,
    allUsers
  }, {
    setFilters,
    nextPage,
    cancelReservation,
    updateRating
  }]
}

export default useReservationListPage
