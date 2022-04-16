import { useEffect, useState } from "react"
import { getFirstPage, getNextPage } from "../services/reservations"

const useReservationListPage = () => {
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState()

  const nextPage = () => {
    if (!meta) {
      return
    }
    const hasMore = meta.total - (meta.offset + meta.count) > 0

    if (!loading && hasMore) {
      setLoading(true)
      getNextPage({}, meta).then(({ data, meta: newMeta }) => {
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

    getFirstPage({}, meta).then(({data, meta}) => {
      setBikes(data)
      setMeta(meta)
      setLoading(false)
    })
  }, [])

  return [{
    bikes,
    loading,
    meta,
  }, {
    nextPage
  }]
}

export default useReservationListPage
