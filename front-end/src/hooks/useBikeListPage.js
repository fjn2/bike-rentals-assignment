import { useEffect, useState } from "react"
import { getFirstPage } from "../services/bikes"

const useBikeListPage = (initialFilters) => {
  const [bikes, setBikes] = useState([])
  const [meta, setMeta] = useState()
  const [filters, setFilters] = useState(initialFilters)

  useEffect(() => {
    getFirstPage().then(({resp, meta}) => {
      setBikes(resp)
      setMeta(meta)
    })
  }, [filters])

  return [{
    bikes,
    meta
  }, {
    setFilters
  }]
}

export default useBikeListPage
