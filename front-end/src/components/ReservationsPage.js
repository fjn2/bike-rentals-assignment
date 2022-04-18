import styled from 'styled-components'
import ReservationCard from "./ReservationCard"
import { useEffect, useCallback } from 'react'
import NoResultPage from './NoResultsPage'
import MenuComponent from './MenuComponent'
import useReservationListPage from '../hooks/useReservationListPage'

const Wrapper = styled.div`
  background: var(--primary2);
  height: 100%;
`

const ListItems = styled.div`
  display: flex;
  height: auto;
  flex-wrap: wrap;
  overflow-x: hidden;
  // overflow-y: scroll;
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
  const [{ reservations, loading }, { nextPage, cancelReservation, updateRating }] = useReservationListPage()
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

  return (
    <>
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
