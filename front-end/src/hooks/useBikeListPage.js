import { useEffect, useState } from "react"
import { getFirstPage, getNextPage } from "../services/bikes"
import { reserveBike } from "../services/reservations"

import { useNavigate, useSearchParams } from "react-router-dom"

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

  useEffect(() => {
    setLoading(true)

    getFirstPage(filters, meta).then(({data, meta}) => {
      setBikes(data)
      setMeta(meta)
      setLoading(false)
    })
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
    reserveBike
  }]
}

export default useBikeListPage
