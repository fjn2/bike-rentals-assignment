import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faUndo, faCancel } from '@fortawesome/free-solid-svg-icons'
import { Reservation } from '../api/types'
import RatingComponent from './RatingComponent'
import useApplication from '../hooks/useApplication'

const addDays = (date: string, daysToAdd: number) => {
  return new Date((new Date(date)).setDate((new Date(date).getDate() + daysToAdd))).toISOString().slice(0, 10)
}

const Wrapper = styled.div`
background-color: transparent;
height: 200px;
perspective: 1000px;
transition: 0.5s;
border: 0px;

/* This container is needed to position the front and back side */
& .flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
&.active .flip-card-inner {
  transform: rotateY(180deg);
}
&:hover {
  transform: scale(1.02);
}

/* Position the front and back side */
& .flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
& .flip-card-front {
  h3 {
    color: var(--primary3);
  }

  background-color: #bbb;
  color: black;
  cursor: pointer;
  background: var(--primary1);
}

/* Style the back side */
& .flip-card-back {
  color: var(--primary1);
  background-color: var(--primary0);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    flex: 1;
  }
}

.reserve-button {
  border: 0;
  flex: 1;
  width: 40px;
  height: 40px;
}

.turn-back-card {
  position: absolute;
  top:0;
  right: 0;
  background: transparent;
  border: 0;
  width: 40px;
  height: 40px;
}

@media only screen and (max-width: 768px) {
  &:hover {
    transform: scale(1.02);
  }
}
`
const ReservationCard = ({reservation, onCancelReservation, onUpdateRating}: { reservation: Reservation, onCancelReservation: () => void, onUpdateRating : (newRating : number) => void }) => {
  const [active, setActive] = useState(false)
  // @ts-ignore
  const [{ user }] = useApplication()
  const [currentRating, setCurrentRating] = useState<number>(reservation.rating)
  
  const onRatingChange = (val: number) => {
    setCurrentRating(val)
    onUpdateRating(val)
  }
  return (
    <Wrapper className={active ? 'active' : ''}>
      <div className="flip-card-inner">
        <div className="flip-card-front" onClick={() => setActive(!active)}>
          <h3>{(reservation.bike || {}).model}</h3>
          <h4>{`${reservation.from.slice(0, 10)} to ${addDays(reservation.from, reservation.days)}`}</h4>
          <a title={(reservation.bike || {}).color}>
            <FontAwesomeIcon icon={faBicycle} color={(reservation.bike || {}).color} size="2x" />
          </a>
          <p>{((reservation.bike || {}).location || {}).description}</p>
          {
            user.rol === 'manager' && (
              <p>{((reservation.user || {}).username)}</p>
            )
          }
        </div>
        <div className="flip-card-back">
          <button className="reserve-button" onClick={onCancelReservation}><FontAwesomeIcon size="2x" icon={faCancel} /></button>
          { /* To prevent errors if the bike was deleted */}
          {reservation.bike && (
            <RatingComponent total={5} selected={currentRating} onChange={onRatingChange} />
          )}
          <button className="turn-back-card" onClick={() => setActive(!active)}><FontAwesomeIcon icon={faUndo} /></button>
        </div>
      </div>
    </Wrapper>
  )
}

export default ReservationCard
