import React, { useState, useContext, ReactChild, createContext } from "react"
import useLocalStorage from "./useLocalStorage"
import { useNavigate } from "react-router-dom"
import { logout as logoutApi, login as loginApi, register as registerApi } from '../api/users'

export const StoreContext = createContext({})

export const ApplicationContext = ({ children }: { children: ReactChild }) => {
  const [user, setUser] = useLocalStorage('user_bike_rentals') as any
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage('token') as any

  const login = ({ username, password }: { username: string, password: string }) => {
    return loginApi({
      username,
      password
    }).then(resp => {
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

  const register = (username: string) => {
    return registerApi(username).then(() => {
      return login({
        username,
        password: 'password'
      })
    })
  }

  return (
    <StoreContext.Provider
      value={[{
        user,
        theme
      }, {
        login,
        logout,
        register,
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
