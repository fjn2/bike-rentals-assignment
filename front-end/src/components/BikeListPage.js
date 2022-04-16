import styled from 'styled-components'
import useBikeListPage from "../hooks/useBikeListPage"
import BikeCard from "./BikeCard"
import { useState, useCallback, useEffect } from 'react'
import { debounce } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import NoResultPage from './NoResultsPage'
import MenuComponent from './MenuComponent'
import useApplication from '../hooks/useApplication'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;  
  overflow: hidden;
`
const ToggleFilterButton = styled.button`
  display: none;
  z-index: 150;
  margin: 16px;
  width: 40px;
  height: 40px;

  @media only screen and (max-width: 768px) {
    display: block;
    position: fixed;
    right: 0;
    bottom: 65px;
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
  min-height: 100vh;

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
    position: fixed;
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
  const [{ bikes, loading, filters }, { nextPage, setFilters, reserveBike }] = useBikeListPage()
  const [{ user }] = useApplication()
  // used only for mobile
  const [showFilters, setShowFilters] = useState(false)
  const reserveHandler = (bikeId) => (dateFrom, daysAmount) => {
    console.log('reserving', bikeId, dateFrom, daysAmount)
    reserveBike({
      userId: user.id,
      bikeId,
      from: dateFrom,
      days: daysAmount
    })
  }

  const filterHandler = (filterKey, value) => {
    setFilters({
      ...filters,
      [filterKey]: value
    })
  }
  const debounceFilterHandler = useCallback(
    debounce(filterHandler, 500),
    [filters],
  )

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
      onPageScroll()
    }
  }, [loading])

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
            defaultValue={filters.model}
          />
        </div>
        <div>
          <label for="color">Color:</label><br />
          <input
            onChange={(e) => debounceFilterHandler('color', e.target.value)}
            type="text"
            id="color"
            defaultValue={filters.color}
          />
          </div>
      </Filters>
      <ToggleFilterButton onClick={() => setShowFilters(!showFilters)}>
        <FontAwesomeIcon icon={faFilter} />
      </ToggleFilterButton>
      {
        bikes && bikes.length === 0 && !loading && (
          <NoResultPage />
        )
      }
      {bikes && bikes.length > 0 && (
        <ListItems>
          {
            bikes.map((bike) => (
              <BikeCard bike={bike} onReserve={reserveHandler(bike.id)} />
            ))
          }
        </ListItems>
      )}
      <MenuComponent />
    </Wrapper>
  )
}

export default BikeListPage
