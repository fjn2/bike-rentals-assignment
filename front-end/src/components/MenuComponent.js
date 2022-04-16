import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSignOut, faTicket, faBicycle, faUser, faMagic } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useApplication from '../hooks/useApplication'

const Wrapper = styled.div`
  position:fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--menuBackground);
  > ul {
    display: flex;
    list-style-type: none;
    padding-left: 0px;
    text-align: center;
    padding: 0;
    margin: 0;

    > li {
      flex: 1;
      height: 65px;

      &.active {
        background: var(--primary1);
      }

      button {
        border: 0;
        background: inherit;
        height: 65px;
        padding: 0;
        margin: 0;
        cursor: pointer;
         * {
           pointer-events: none;
         }
      }

      label {
        display: block;
      }
    }
  }
`
const MenuComponent = () => {
  const navigation = useNavigate()
  const [{ user, theme }, { setTheme }] = useApplication()
  const location = useLocation()
  const onSectionClick = (sectionName) => {
    navigation(sectionName)
  }
  
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  
  const activeSection = location.pathname
  return (
    <Wrapper>
      <ul>
        <li className={activeSection === '/list'? 'active' : ''}>
          <button onClick={() => { onSectionClick('/list') }}>
            <FontAwesomeIcon icon={faBicycle} />
            <label>Bikes</label>
          </button>
        </li>
        <li className={activeSection === '/reservations'? 'active' : ''}>
        <button onClick={() => { onSectionClick('/reservations') }}>
            <FontAwesomeIcon icon={faTicket} />
            <label>Reservations</label>
          </button>
        </li>
        {
          user.rol === 'manager' && (
            <li className={activeSection === '/users'? 'active' : ''}>
              <button onClick={() => { onSectionClick('/users') }}>
                <FontAwesomeIcon icon={faUser} />
                <label>Users</label>
              </button>
            </li>
          )
        }
        <li className={activeSection === '/logout'? 'active' : ''}>
        <button onClick={() => { themeToggler() }}>
            <FontAwesomeIcon icon={faMagic} />
            <label>Theme</label>
          </button>
        </li>
        <li className={activeSection === '/logout'? 'active' : ''}>
        <button onClick={() => { onSectionClick('/logout') }}>
            <FontAwesomeIcon icon={faSignOut} />
            <label>Logout</label>
          </button>
        </li>
      </ul>
    </Wrapper>
  )
}

export default MenuComponent