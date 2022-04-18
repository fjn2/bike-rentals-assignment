import styled from "styled-components"
import { useState, useEffect } from "react"
import useApplication from "../hooks/useApplication"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignIn, faDriversLicense } from "@fortawesome/free-solid-svg-icons"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: var(--primary0);

  .login-button {
    border: 0;
    color: var(--primary1);
  }
`
const ErrorMessages = styled.div`
  color: var(--error)
`

const LoginForm = () => {
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState('John')
  const [password, setPassword] = useState('password')
  const [, { login, register }] = useApplication()

  const loginHandler = () => {
    login({
      username,
      password
    }).catch((error) => {
      console.log('error', error, error.data)
      setErrors(error.data)
    })
  }

  const registerHandler = () => {
    register(username).catch((error) => {
      setErrors(error.data)
    })
  }

  useEffect(() => {
    setErrors([])
  }, [username, password])

  return (
    <Wrapper>
      <div>
        <h1>Login</h1>
        <ErrorMessages className="errors">{errors}</ErrorMessages>
        <div>
          <label for="username">Username:</label><br />
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div>
          <label for="password">Password:</label><br />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div>
          <button className="login-button" onClick={loginHandler}>
            <FontAwesomeIcon icon={faSignIn} size="2x" />
          </button>
          <button className="login-button" onClick={registerHandler}>
            <FontAwesomeIcon icon={faDriversLicense} size="2x" />
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

export default LoginForm
