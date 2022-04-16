const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker')
const RESOURCES = require('./resources')

////////////////////////
/// MOCK FOR BIKES /////
////////////////////////
const BIKES_COUNT = 24
const LOCATION_CENTER_REFERENCE_POINT = [52.369266, 4.9028] // Amsterdam

const generateBike = () => {
  const [lat, lng] = faker.address.nearbyGPSCoordinate(LOCATION_CENTER_REFERENCE_POINT)
  const ratingVotes = faker.datatype.number({
    max: 10,
    min: 0,
  })
  const ratingAcum = faker.datatype.number({
    max: ratingVotes * 5,
    min: 0,
  })
  ratingAcum
  return {
    id: uuidv4(),
    model: faker.vehicle.bicycle(),
    color: faker.vehicle.color(),
    location: {
      lat,
      lng,
      description: faker.address.streetAddress(true)
    },
    ratingAcum,
    ratingVotes,
    // 80% of the bikes are availables
    available: !faker.datatype.number({
      max: 100,
      min: 0,
    }) > 80,
  }
}

////////////////////////
/// MOCK FOR USERS /////
////////////////////////
const USERS_COUNT = 12
const generateUser = () => {
  return {
    id: uuidv4(),
    username: faker.internet.userName(),
    password: 'password',
    rol: Math.round(Math.random() * 2) === 1 ? 'manager': 'user'
  }
}

/////////////////////////////
/// MOCK FOR RESERVATIONS ///
/////////////////////////////
const RESERVATION_COUNT = 16

const generateReservation = (users, bikes, reservations) => {
  const userId = users[Object.keys(users)[faker.datatype.number(Object.keys(users).length - 1)]].id
  const bikeId = bikes[Object.keys(bikes)[faker.datatype.number(Object.keys(bikes).length - 1)]].id
  return {
    id: uuidv4(),
    userId,
    bikeId,
    from: faker.date.future(),
    days: faker.datatype.number(20),
    rating: undefined
  }
}

////////////////////////
/////// GENERAL // /////
////////////////////////

const generateMockedDatabase = () => {
  console.log('Using mocked data')
  const data = {
    [RESOURCES.BIKES]: {},
    [RESOURCES.USERS]: {},
    [RESOURCES.RESERVATIONS]: {}
  }

  for (let i = 0; i < BIKES_COUNT; i++) {
    const bike = generateBike()
    data[RESOURCES.BIKES][bike.id] = bike
  }

  data[RESOURCES.USERS]['12345'] = {
    id: '12345',
    username: 'fede',
    password: 'password',
    rol: 'manager'
  }
  for (let i = 1; i < USERS_COUNT; i++) {
    const user = generateUser()
    data[RESOURCES.USERS][user.id] = user
  }

  for (let i = 0; i < RESERVATION_COUNT; i++) {
    const reservation = generateReservation(data[RESOURCES.USERS], data[RESOURCES.BIKES])
    data[RESOURCES.RESERVATIONS][reservation.id] = reservation
  }

  return data
}

module.exports = generateMockedDatabase
