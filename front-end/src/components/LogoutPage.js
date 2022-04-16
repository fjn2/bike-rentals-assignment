import useApplication from "../hooks/useApplication"
import { useEffect } from "react"

const LogoutPage = () => {
  const [, { logout }] = useApplication()
  useEffect(() => {
    logout()
  }, [])

  return (
    <div>
      Logging out in progress...
    </div>
  )
}

export default LogoutPage
