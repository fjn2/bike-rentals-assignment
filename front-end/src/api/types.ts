export enum Rol {
  USER,
  MANAGER
}

type Location = {
  lat: number,
  lng: number,
  description: string
}

export type Bike = {
  id: string;
  model: string;
  color: string;
  location: Location;
  rating?: number;
  available: boolean;
}

export type Metadata = {
  total: number;
  offset: number
}

export type PaginatedObject<T> = {
  data: T[],
  meta: Metadata
}

export type User = {
  id: string,
  username: string,
  rol: Rol
}

export type ApiOperation = {
  data: any,
  errors?: string[]
}

export type Pagination = {
  offset: number,
  total: number,
  count: number
}

export type BikeFilters = {
  available?: boolean,
  model?: string,
  color?: string,
  rating?: number,
}

export type Reservation = {
  id: string,
  bike: Bike,
  user: User,
  from: string,
  days: number,
  rating: number
}