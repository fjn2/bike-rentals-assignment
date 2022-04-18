import styled from 'styled-components'
import ReservationCard from "./ReservationCard"
import { useEffect, useCallback } from 'react'
import NoResultPage from './NoResultsPage'
import MenuComponent from './MenuComponent'
import useReservationListPage from '../hooks/useReservationListPage'
import useApplication from '../hooks/useApplication'

const Wrapper = styled.div`
  background: var(--primary2);
  height: 100%;
`

const ListItems = styled.div`
  display: flex;
  height: auto;
  flex-wrap: wrap;
  overflow: hidden;
  gap: 4px;

  & > div {
    width: 100%;
    flex: 0 0 calc((100% - 8px)/3);
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    
    & > div {
      margin: 4px 0;
    }
  }
`

const ReservationsListPage = () => {
  const [{ reservations, loading, filters, allBikes, allUsers }, { nextPage, cancelReservation, updateRating, setFilters }] = useReservationListPage()
  const [{ user }] = useApplication()
  const cancelHandler = (reservationId) => () => {
    cancelReservation(reservationId)
  }
  const ratingUpdateHandler = (reservationId) => (newVal) => {
    updateRating(reservationId, newVal)
  }

  const onPageScroll = useCallback(() => {
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        document.documentElement.clientHeight <=
      100
    ) {
      nextPage()
    }
  }, [nextPage])
  
  useEffect(() => {
    window.addEventListener('scroll', onPageScroll)
    return () => {
      window.removeEventListener('scroll', onPageScroll)
    }
  }, [onPageScroll])

  useEffect(() => {
    if (!loading) {
      // onPageScroll()
    }
  }, [loading])

  const updateFilter = (filterKey, filterValue) => {
    setFilters({
      ...filters,
      [filterKey]: filterValue
    })
  }

  return (
    <>
      {
        user && user.rol === 'manager' && (
          <div>
            <select onChange={(e) => updateFilter('userId', e.target.value)}>
              <option value="">NONE</option>
              {allUsers.map(user => (
                <option value={user.id}>{user.username}</option>
              ))}
            </select>
            <select onChange={(e) => updateFilter('bikeId', e.target.value)}>
              <option value="">NONE</option>
              {allBikes.map(bike => (
                <option value={bike.id}>{bike.model} - {bike.color}</option>
              ))}
            </select>
          </div>
        )
      }
      <Wrapper>
        {
          reservations && reservations.length === 0 && !loading && (
            <NoResultPage />
          )
        }
        {reservations && reservations.length > 0 && (
          <ListItems>
            {
              reservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onCancelReservation={cancelHandler(reservation.id)}
                  onUpdateRating={ratingUpdateHandler(reservation.id)}
                />
              ))
            }
          </ListItems>
        )}
        <MenuComponent />
      </Wrapper>
    </>
  )
}

export default ReservationsListPage
