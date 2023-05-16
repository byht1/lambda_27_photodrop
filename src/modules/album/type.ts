import { TAlbums } from 'db/schema'
import { TCreateAlbumData } from './dto/createAlbum.dto'
import { TGetAllResponse } from 'db/repository/albums/type'
import { TGetAllPhotosAlbum } from 'db/repository/photos/type'
import { TAddPersonDto, TAddPhotosDto } from './dto'

//____________CONTROLLER_________
export interface IAlbumController {
  createAlbum: TCreateAlbumRoutFn
  getAlbums: TGetAlbumsRoutFn
  addPhotosToAlbum: TAddPhotosToAlbumRoutFn
  getPhotosForAlbum: TGetPhotosForAlbumRoutFn
  addPerson: TAddPersonRoutFn
}

export type TCreateAlbumRoutFn = TRouterFn<TAlbums, TCreateAlbumData>
export type TGetAlbumsRoutFn = TRouterFn<TGetAllResponse, void, void, TPaginationParamsRequest>
export type TAddPhotosToAlbumRoutFn = TRouterFn<string[], TAddPhotosDto, TParamsAlbumId>
export type TGetPhotosForAlbumRoutFn = TRouterFn<TGetAllPhotosAlbum[], void, TParamsAlbumId>
export type TAddPersonRoutFn = TRouterFn<TGetAllPhotosAlbum, TAddPersonDto, void>

export type TPaginationParamsRequest = { limit: number; page: number }
export type TParamsAlbumId = { albumId: string }

//____________SERVICE_________
//AlbumService
export interface IAlbumService {
  createAlbum: TCreateAlbumFn
  getAlbums: TGetAlbumsFn
}

export type TCreateAlbumFn = (userId: string, albumData: TCreateAlbumData) => Promise<TAlbums>
export type TGetAlbumsFn = (params: TPaginationParamsRequest) => Promise<TGetAllResponse>

//PhotoService
export interface IPhotoService {
  addPhotosToAlbum: TAddPhotosToAlbumFn
  getPhotosForAlbum: TGetPhotosForAlbumFn
  addPerson: TAddPersonFn
}

export type TAddPhotosToAlbumFn = (files: string[], albumId: string) => Promise<string[]>
export type TGetPhotosForAlbumFn = (
  userId: string,
  albumId: string
) => Promise<TGetAllPhotosAlbum[]>
export type TAddPersonFn = (
  photoId: string,
  userId: string,
  photographersId: string
) => Promise<TGetAllPhotosAlbum>
