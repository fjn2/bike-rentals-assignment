import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { Bike } from '../api/types'
import RatingComponent from './RatingComponent'

const Wrapper = styled.div`
background-color: transparent;
height: 200px;
perspective: 1000px;

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
  background-color: #bbb;
  color: black;
  cursor: pointer;
}

/* Style the back side */
& .flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}

.reserve-button {

}
.turn-back-card {
  position: absolute;
  bottom:0;
  right: 0;
}
`
const BikeCard = ({bike, onReserve}: { bike: Bike, onReserve: () => void }) => {
  const [active, setActive] = useState(false)
  return (
    <Wrapper className={active ? 'active' : ''}>
      <div className="flip-card-inner">
        <div className="flip-card-front" onClick={() => setActive(!active)}>
          <h3>{bike.model}</h3>
          <FontAwesomeIcon icon={faBicycle} />
          <p>{bike.rating}</p>
          <RatingComponent total={5} selected={4} />
          <p>{bike.location.description}</p>
        </div>
        <div className="flip-card-back">
          <button className="reserve-button" onClick={onReserve}>Reserve</button>
          <button className="turn-back-card" onClick={() => setActive(!active)}>Turn back</button>
        </div>
      </div>
    </Wrapper>
  )
}

export default BikeCard
