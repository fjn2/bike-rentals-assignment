import { useState } from "react"
import useLocalStorage from "./useLocalStorage"
import { useNavigate } from "react-router-dom"
import { User, Rol } from "../api/types"

const useApplication = () => {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token') as any

  const login = ({ username, password }: { username: string, password: string }) => {
    console.log('navigeta')
    setToken('XXXXXXXXXXXXXXX')
    setUser({
      id: 'tuvi',
      username: 'Pepito',
      rol: Rol.USER
    })
    navigate('/list')
    return Promise.resolve()
  }

  return [{
    user
  }, {
    login
  }]
}

export default useApplication
