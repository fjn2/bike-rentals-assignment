import styled from 'styled-components'
import useBikeListPage from "../hooks/useBikeListPage"
import BikeCard from "./BikeCard"
import { useState, useCallback } from 'react'
import { debounce } from '../utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;  
  overflow: hidden;
`
const ToggleFilterButton = styled.button`
  &:after {
    content: "F";
  }
  display: none;
  z-index: 150;
  margin: 16px;
  width: 40px;
  height: 40px;

  @media only screen and (max-width: 768px) {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    background: var(--primary0);
  }
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
const Filters = styled.div`
  background: var(--backgroundSecondary);

  > div {
    width: 100%;
    padding: 0 5%;
    input {
      width: 100%;
      box-sizing: border-box;
    }
    box-sizing: border-box;
  }
  
  @media only screen and (max-width: 768px) {
    position: absolute;
    right: 0;
    bottom: ${({ visible }) => visible ? '0' : '100%'};
    left: 0;
    z-index: 100;
    height: 100vh;
    pointer-events: ${({ visible }) => visible ? 'all' : 'none'};
    transition: 0.5s;
  }
`

const BikeListPage = () => {
  const [{ bikes }] = useBikeListPage()
  // used only for mobile
  const [showFilters, setShowFilters] = useState(false)
  const reserveHandler = (bikeId) => () => {
    console.log('reserving', bikeId)
  }

  const filterHandler = (filterKey, value) => {
    console.log('handler', filterKey, value)
  }
  const debounceFilterHandler = useCallback(
    debounce(filterHandler, 500),
    [],
  )
  return (
    <Wrapper>
      <Filters visible={showFilters}>
        <div>
          <h3>
            Filter Options
          </h3>
        </div>
        <div>
          <label for="model">Model:</label><br />
          <input
            onChange={(e) => debounceFilterHandler('model', e.target.value)}
            type="text"
            id="model"
          />
        </div>
        <div>
          <label for="color">Color:</label><br />
          <input
            onChange={(e) => debounceFilterHandler('color', e.target.value)}
            type="text"
            id="color"
          />
          </div>
      </Filters>
      <ToggleFilterButton onClick={() => setShowFilters(!showFilters)} />
      <ListItems>
        {console.log(bikes)}
        {
          bikes.map((bike) => (
            <BikeCard bike={bike} onReserve={reserveHandler(bike.id)} />
          ))
        }
      </ListItems>
    </Wrapper>
  )
}

export default BikeListPage
