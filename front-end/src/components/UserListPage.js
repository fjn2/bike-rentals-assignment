import styled from 'styled-components'
import useUserListPage from "../hooks/useUserListPage"
import { Rol } from '../api/types'
import MenuComponent from './MenuComponent'

const Wrapper = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  tr:nth-child(even){ background-color: var(--primary2) }

  th, td {
    text-align: left;
    padding: 8px;
  }
`

const UserListPage = () => {
  const [{ users }, { updateUser }] = useUserListPage()
  
  const roleHandler = (userId) => (event) => {
    updateUser({
      ...users.find(u => u.id === userId),
      rol: event.target.checked ? Rol.MANAGER : Rol.USER
    })
  }

  const onAddUserClick = () => {
    
  }

  console.log('users', users)
  return (
    <>
      <h1>
        Users Administration
      </h1>
      <input type="button" onClick={onAddUserClick} value="Add user" />
      <Wrapper>
        <thead>
          <tr>
            <th>
              Username
            </th>
            <th>
              is Manager?
            </th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => {
              return (
                <tr>
                  <td>
                    {user.username}
                  </td>
                  <td>
                    <input type="checkbox" checked={user.rol === Rol.MANAGER} onClick={roleHandler(user.id)} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
        <MenuComponent />
      </Wrapper>
    </>
  )
}

export default UserListPage
