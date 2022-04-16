import styled from 'styled-components'
import ReservationCard from "./ReservationCard"
import { useState, useCallback, useEffect } from 'react'
import { debounce } from '../utils'
import NoResultPage from './NoResultsPage'
import MenuComponent from './MenuComponent'
import useReservationListPage from '../hooks/useReservationListPage'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;  
  overflow: hidden;
`

const ListItems = styled.div`
  display: grid;
  flex: 1;
  grid-gap: 4px;
  grid-template-columns: repeat(3, 1fr);

  & > div {
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    grid-template-columns: repeat(1, 1fr);
  }
`

const ReservationsListPage = () => {
  const [{ reservations, loading }, { nextPage }] = useReservationListPage()
  const cancelHandler = (bikeId) => () => {
    console.log('cancel', bikeId)
  }

  const onPageScroll = () => {
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        document.documentElement.clientHeight <=
      100
    ) {
      nextPage()
    }
  }
  
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
              <ReservationCard reservation={reservation} onCancelReservation={cancelHandler(reservation.id)} />
            ))
          }
        </ListItems>
      )}
      <MenuComponent />
    </Wrapper>
  )
}

export default ReservationsListPage
