import React, { useState, useContext, ReactChild, createContext } from "react"
import useLocalStorage from "./useLocalStorage"
import { useNavigate } from "react-router-dom"
import { logout as logoutApi, login as loginApi } from '../api/users'

export const StoreContext = createContext({})

export const ApplicationContext = ({ children }: { children: ReactChild }) => {
  const [user, setUser] = useLocalStorage('user_bike_rentals') as any
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token') as any

  const login = ({ username, password }: { username: string, password: string }) => {
    return loginApi({
      username,
      password
    }).then(resp => {
      console.log('____resp.data', resp.data)
      setToken(resp.data.token)
      setUser(resp.data.user)
      navigate('/list')
    })
  }

  const logout = (token: string) => {
    setToken(null)
    setUser(null)
    return logoutApi(token).then(() => {
      navigate('/login')
    })
  }
  console.log(user, token)
  return (
    <StoreContext.Provider
      value={[{
        user,
        theme
      }, {
        login,
        logout,
        setTheme
      }]}
    >
      {children}
    </StoreContext.Provider>
  )
}

// @ts-ignore
const useApplication = () => useContext(StoreContext)

export default useApplication
