import { useEffect, useState } from "react"
import {
  getFirstPage,
  getNextPage,
  createBike as createBikeSvc,
  updateBike as updateBikeSvc,
  deleteBike as deleteBikeSvc
} from "../services/bikes"
import { reserveBike } from "../services/reservations"

import { useSearchParams } from "react-router-dom"
import { ApplicationErrorHandling } from "./utils"

const useBikeListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState()
  const [filters, setFilters] = useState(Object.fromEntries(searchParams))
  
  const nextPage = () => {
    if (!meta) {
      return
    }
    const hasMore = meta.total - (meta.offset + meta.count) > 0

    if (!loading && hasMore) {
      setLoading(true)
      getNextPage(filters, meta).then(({ data, meta: newMeta }) => {
        setBikes([
          ...bikes,
          ...data
        ])
        setMeta(newMeta)
        setLoading(false)
      })
    }
  }

  const createBike = () => {
    return createBikeSvc().then(() => {
      loadFirstPage()
    })
  }

  const updateBike = (data) => {
    return updateBikeSvc(data).then(() => {
      loadFirstPage()
    })
  }
  
  const deleteBike = (data) => {
    return deleteBikeSvc(data).then(() => {
      loadFirstPage()
    })
  }

  const loadFirstPage = () => {
    setLoading(true)
    return getFirstPage(filters, meta).then(({data, meta}) => {
      setBikes(data)
      setMeta(meta)
      setLoading(false)
    }).catch(ApplicationErrorHandling)
  }

  useEffect(() => {
    loadFirstPage()
    setSearchParams(filters)
  }, [filters])

  return [{
    bikes,
    loading,
    meta,
    filters
  }, {
    setFilters,
    nextPage,
    reserveBike,
    createBike,
    updateBike,
    deleteBike
  }]
}

export default useBikeListPage
