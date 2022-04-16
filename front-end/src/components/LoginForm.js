import styled from "styled-components"
import { useState, useEffect } from "react"
import useApplication from "../hooks/useApplication"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const ErrorMessages = styled.div`
  color: var(--error)
`

const LoginForm = () => {
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState('John')
  const [password, setPassword] = useState('password')
  const [, { login }] = useApplication()

  const loginHandler = () => {
    login({
      username,
      password
    }).catch((error) => {
      console.log('error', error, error.data)
      setErrors(error.data)
    })
  }

  useEffect(() => {
    setErrors([])
  }, [username, password])

  return (
    <Wrapper>
      <form>
        <h1>Login</h1>
        <ErrorMessages className="errors">{errors}</ErrorMessages>
        <label for="username">Username:</label><br />
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          id="username"
          name="username"
          required
        /><br />
        <label for="password">Password:</label><br />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          required
        /><br /><br />
        <input type="button" value="Submit" onClick={loginHandler} />
      </form> 
    </Wrapper>
  )
}

export default LoginForm
