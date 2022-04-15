import { Bike, PaginatedObject } from "./types"

export const getBikes = async () : Promise<PaginatedObject<Bike>> => {
  return new Promise((resolve) => {
    resolve({
      resp: [{
        id: '1',
        model: 'foo',
        color: 'foo',
        rating: 40,
        location: {
          lat: 0,
          lng: 0,
          description: 'center of the word'
        },
        available: true,
      }, {
        id: '1',
        model: 'foo',
        color: 'foo',
        rating: 40,
        location: {
          lat: 0,
          lng: 0,
          description: 'center of the word'
        },
        available: true,
      }, {
        id: '1',
        model: 'foo',
        color: 'foo',
        rating: 40,
        location: {
          lat: 0,
          lng: 0,
          description: 'center of the word'
        },
        available: true,
      }, {
        id: '1',
        model: 'foo',
        color: 'foo',
        rating: 40,
        location: {
          lat: 0,
          lng: 0,
          description: 'center of the word'
        },
        available: true,
      }],
      meta: {
        total: 1,
        offset: 0
      }
    })
  }) 
}
