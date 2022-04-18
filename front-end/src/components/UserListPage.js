import styled from 'styled-components'
import useUserListPage from "../hooks/useUserListPage"
import MenuComponent from './MenuComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Wrapper = styled.div `
  background: var(--primary2);
  padding-bottom: 66px;
`

const UserCard = styled.div`
  display: flex;
  min-height: 35px;
  margin: 0;
  line-height: 35px;
  padding: 8px;

  &:nth-child(even) {
    background: var(--backgroundSecondary);
  }

  > *:nth-child(1) {
    flex: 1;
  }
  button {
    margin: 0 4px;
  }
  button.update {

  }
  button.delete {
    color: var(--error);
  }
`

const UserListPage = () => {
  const [{ users }, { updateUser, createUser, deleteUser }] = useUserListPage()

  const [username, setUserName] =  useState('')
  const [rol, setRol] =  useState('user')

  const roleHandler = (user) => {
    updateUser({
      ...user,
      rol: user.rol === 'user' ? 'manager' : 'user'
    })
  }

  const onAddUserClick = () => {
    createUser({
      username,
      rol
    }).then(() => {
      setRol('user')
      setUserName('')
    })
  }

  const onRemoveUserClick = (user) => {
    deleteUser(user.id)
  }
  
  return (
    <Wrapper>
      <input value={username} type="text" onChange={(e) => setUserName(e.target.value)} placeholder="username" />
      <select value={rol} onChange={e => setRol(e.target.value)}>
        <option value={'user'}>User</option>
        <option value={'manager'}>Manager</option>
      </select>
      <input type="button" onClick={onAddUserClick} value="Add user" />
      <div>
        {
          (users || []).map((user) => (
            <UserCard key={user.id}>
              <label className="title">
                {user.username} (<label className="title">{user.rol === 'manager'? 'Manager' : 'User'}</label>)
              </label>
              <button className="update" onClick={() => roleHandler(user)}>
                <FontAwesomeIcon icon={user.rol === 'manager'? faArrowDown : faArrowUp} />
              </button>
              <button className="delete" onClick={() => onRemoveUserClick(user)}>
                <FontAwesomeIcon icon={faRemove} />
              </button>
            </UserCard>
          ))
        }
        <MenuComponent />
      </div>
    </Wrapper>
  )
}

export default UserListPage
