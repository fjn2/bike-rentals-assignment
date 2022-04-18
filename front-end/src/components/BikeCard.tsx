import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faUndo, faPencil, faTrash, faTicket } from '@fortawesome/free-solid-svg-icons'
import { Bike } from '../api/types'
import RatingComponent from './RatingComponent'
import useApplication from '../hooks/useApplication'

const Wrapper = styled.div`
background-color: transparent;
height: 200px;
perspective: 1000px;
transition: 0.5s;
border: 0;

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
}

.reserve-button {
  width: 40px;
  height: 40px;
  border: 0;
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
.bike-detail-form {
  width: 90%;
  > div {
    display: flex;
    label {
      flex: 1;
      text-align: right;
      margin-right: 18px;
    }
    > input {
      flex: 1;
    }
  }
}
.update {
  position: absolute;
  color: var(--primary1);
  right: 0;
  bottom: 40px;
  width: 40px;
  height: 40px;
  border: 0;
}
.delete {
  color: var(--primary1);
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  border: 0;
}
.available-checkbox {
  transform: scale(1.3);
  accent-color: var(--primary3); 
}

@media only screen and (max-width: 768px) {
  &:hover {
    transform: scale(1.02);
  }
}
`
const BikeCard = ({
    bike,
    onReserve,
    onUpdateBike,
    onDeleteBike
  }: {
    bike: Bike,
    onReserve: (dateFrom: string | undefined, daysAmount: number | undefined) => void,
    onUpdateBike: (bike: Bike) => void,
    onDeleteBike: (bikeId: string) => void
  }) => {
  const [{ user }] = useApplication() as any
  const [active, setActive] = useState(false)
  const [dateFrom, setDateFrom] = useState<string | undefined>()
  const [daysAmount, setDaysAmount] = useState<number | undefined>(1)
  // update bike fields
  const [model, setModel] = useState<string>(bike.model)
  const [color, setColor] = useState<string>(bike.color)
  const [location, setLocation] = useState<string>(bike.location.description)
  const [available, setAvailable] = useState<boolean>(bike.available)

  return (
    <Wrapper className={active ? 'active' : ''}>
      <div className="flip-card-inner">
        <div className="flip-card-front" onClick={() => setActive(!active)}>
          <h3>{bike.model}</h3>
          { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
          <a title={bike.color}>
            <FontAwesomeIcon icon={faBicycle} color={bike.color} size="2x" />
          </a>
          <RatingComponent total={5} selected={bike.rating} />
          <p>{(bike.location || {}).description}</p>
        </div>
        <div className="flip-card-back">
          <div style={{margin: '4px'}}>
            <div className="bike-detail-form" style={{ height: '50px' }}>
              <div>
                <label>Date from</label>
                <input
                  type="date"
                  min={new Date().toISOString()}
                  onChange={(e) => { setDateFrom(e.target.value)}}
                />
              </div>
              <div>
                <label>Days amount</label>
                <input
                  type="number"
                  max={30}
                  defaultValue={1}
                  style={{ width: '20px' }}
                  onChange={e => setDaysAmount(+e.target.value)}
                />
              </div>
              <br />
            </div>
            <button className="reserve-button" onClick={() => onReserve(dateFrom, daysAmount)}><FontAwesomeIcon size="2x" icon={faTicket} /></button>
            {user.rol === 'manager' && (
              <div className="bike-detail-form">
                <div>
                  <label>Model</label>
                  <input
                    type="text"
                    defaultValue={model}
                    onChange={(e) => { setModel(e.target.value)}}
                  />
                </div>
                <div>
                  <label>Color</label>
                  <input
                    type="text"
                    defaultValue={color}
                    onChange={(e) => { setColor(e.target.value)}}
                  />
                </div>
                <div>
                  <label>Location</label>
                  <input
                    type="text"
                    defaultValue={location}
                    onChange={(e) => { setLocation(e.target.value)}}
                  />
                </div>
                <div>
                  <label>Available</label>
                  <div style={{ width: '188px' }}>
                    <input
                      type="checkbox"
                      className="available-checkbox"
                      checked={available}
                      onChange={(e) => { setAvailable(e.target.checked)}}
                    />
                  </div>
                </div>
                <button
                  className="update"
                  onClick={() => {
                    onUpdateBike({
                      id: bike.id,
                      model,
                      color,
                      location: {
                        description: location,
                        lat: 0,
                        lng: 0
                      },
                      available
                    })
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                
                <button className="delete" onClick={() => onDeleteBike(bike.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            )}
          </div>
          <button className="turn-back-card" onClick={() => setActive(!active)}><FontAwesomeIcon icon={faUndo} /></button>
        </div>
      </div>
    </Wrapper>
  )
}

export default BikeCard
