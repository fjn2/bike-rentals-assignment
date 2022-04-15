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
  rating: number;
  available: boolean;
}

export type Metadata = {
  total: number;
  offset: number
}

export type PaginatedObject<T> = {
  resp: T[],
  meta: Metadata
}

export type User = {
  id: string,
  username: string,
  rol: Rol
}

export enum OperationResult {
  SUCESS,
  ERROR
}

export type ApiOperation = {
  result: OperationResult,
  messages: string[],
  error?: string[]
}