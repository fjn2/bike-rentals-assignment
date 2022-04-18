import styled from 'styled-components'
import useBikeListPage from "../hooks/useBikeListPage"
import BikeCard from "./BikeCard"
import { useState, useCallback, useEffect } from 'react'
import { debounce } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faAdd } from '@fortawesome/free-solid-svg-icons'
import NoResultPage from './NoResultsPage'
import MenuComponent from './MenuComponent'
import useApplication from '../hooks/useApplication'
import Snackbar from './SnackbarComponent'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;  
  overflow: hidden;
  background: var(--primary2);
  padding-bottom: 67px;

  .add-button {
    height: 200px;
    border: 2px solid var(--primary1);
    color: var(--primary1);
    flex: 0 0 calc((100% - 8px)/3);
  }

  @media only screen and (max-width: 768px) {
    // height: 100%;
    .add-button {
      height: 40px;
      flex: 0 0 calc(100%);
    }
  }
`
const ToggleFilterButton = styled.button`
  display: none;
  z-index: 150;
  margin: 16px;
  width: 40px;
  height: 40px;
  boder: 0px;
  border: 0;

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
  flex: 1;
  display: flex;
  height: auto;
  flex-wrap: wrap;
  overflow-x: hidden;
  
  gap: 4px;

  & > div {
    width: 100%;
    margin: 0;
    flex: 0 0 calc((100% - 8px)/3);
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    // height: 100%;
    // flex-direction: column;
    // flex-wrap: nowrap;

    & > div {
      margin: 4px 0;
      flex: 0 0 calc(100%);
    }
  }
`
const Filters = styled.div`
  background: var(--background);
  color: var(--primary0);
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
  const [{ bikes, loading, filters }, { nextPage, setFilters, reserveBike, createBike, updateBike, deleteBike }] = useBikeListPage()
  const [{ user }] = useApplication()
  const [snackbarData, setSnackbarData] = useState({})

  // used only for mobile
  const [showFilters, setShowFilters] = useState(false)
  const reserveHandler = (bikeId) => (dateFrom, daysAmount) => {
    reserveBike({
      userId: user.id,
      bikeId,
      from: dateFrom,
      days: daysAmount
    }).then((resp) => {
      if (resp.errors) {
        setSnackbarData({
          text: resp.errors[0],
          visible: true
        })
      } else {
        setSnackbarData({
          text: 'Bike reserved',
          visible: true
        })
      }
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

  const addBikeHandler = () => {
    createBike().then(() => {
      setSnackbarData({
        text: 'Bike created',
        visible: true
      })
    })
  }

  const updateBikeHandler = (data) => {
    updateBike(data).then(() => {
      setSnackbarData({
        text: 'Bike updated',
        visible: true
      })
    })
  }

  const deleteBikeHandler = (bikeId) => {
    deleteBike(bikeId).then(() => {
      setSnackbarData({
        text: 'Bike deleted',
        visible: true
      })
    })
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
      onPageScroll()
    }
  }, [loading])

  return (
    <Wrapper>
      <Snackbar data={snackbarData} />
      <Filters visible={showFilters}>
        <div>
          <h3>
            Filter Options
          </h3>
        </div>
        <div>
          <label for="model">Model</label><br />
          <input
            onChange={(e) => debounceFilterHandler('model', e.target.value)}
            type="text"
            id="model"
            defaultValue={filters.model}
          />
        </div>
        <div>
          <label for="color">Color</label><br />
          <input
            onChange={(e) => debounceFilterHandler('color', e.target.value)}
            type="text"
            id="color"
            defaultValue={filters.color}
          />
        </div>
        <div>
          <label for="color">Date From</label><br />
          <input
            onChange={(e) => debounceFilterHandler('dateFrom', e.target.value)}
            type="date"
            id="dateFrom"
            defaultValue={filters.dateFrom}
          />
        </div>
        <div>
          <label for="color">Date To</label><br />
          <input
            onChange={(e) => debounceFilterHandler('dateTo', e.target.value)}
            type="date"
            id="dateTo"
            defaultValue={filters.dateTo}
          />
        </div>
        <div>
          <label for="color">Only availables</label><br />
          <input
            type="checkbox"
            onChange={(e) => debounceFilterHandler('available', e.target.checked)}
            id="available"
            defaultValue={filters.available}
          />
        </div>
      </Filters>
      <ToggleFilterButton onClick={() => setShowFilters(!showFilters)}>
        <FontAwesomeIcon icon={faFilter} />
      </ToggleFilterButton>
      <div style={{ width: '100%'}}>
        {
          bikes && bikes.length === 0 && !loading && (
            <NoResultPage />
          )
        }
        {bikes && bikes.length > 0 && (
          <ListItems>
            {user.rol === 'manager' && (
              <button onClick={addBikeHandler} className="add-button">
                <FontAwesomeIcon size="2x" icon={faAdd} />
              </button>
            )}
            {
              bikes.map((bike) => (
                <BikeCard
                  key={bike.id}
                  bike={bike}
                  onReserve={reserveHandler(bike.id)}
                  onUpdateBike={updateBikeHandler}
                  onDeleteBike={deleteBikeHandler}
                />
              ))
            }
          </ListItems>
        )}
      </div>
      <MenuComponent />
    </Wrapper>
  )
}

export default BikeListPage
