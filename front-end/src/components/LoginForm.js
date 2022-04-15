import styled from "styled-components"
import { useState } from "react"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const LoginForm = ({ onLogin, errors = [] }) => {
  const [username, setUsername] = useState('John')
  const [password, setPassword] = useState('password')

  const loginHandler = () => {
    onLogin({
      username,
      password
    })
  }

  return (
    <Wrapper>
      <form>
        <div className="errors">{errors}</div>
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
