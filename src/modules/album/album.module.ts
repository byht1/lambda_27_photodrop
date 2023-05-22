import express from 'express'
import { ctrlWrapper } from 'helpers'
import { validate, validateToken } from 'middleware'
import { paginationDto } from 'modules/dto/pagination.dto'
import { albumIdSchema } from 'modules/dto/uuidValidate.dto'
import { addPersonDto, addPhotosDto, newAlbumDto } from './dto'
import { AlbumController } from './album.controller'

const router = express.Router()

const { breakpointName, createAlbum, getAlbums, addPhotosToAlbum, getPhotosForAlbum, addPerson } =
  new AlbumController()

router.post(
  `/${breakpointName}`,
  validateToken,
  validate(newAlbumDto, 'body'),
  ctrlWrapper(createAlbum)
)
router.get(
  `/${breakpointName}`,
  validateToken,
  validate(paginationDto, 'query'),
  ctrlWrapper(getAlbums)
)
router.post(
  `/${breakpointName}/:albumId/photos`,
  validateToken,
  validate(addPhotosDto, 'body'),
  validate(albumIdSchema, 'params'),
  ctrlWrapper(addPhotosToAlbum)
)
router.get(
  `/${breakpointName}/:albumId/photos`,
  validateToken,
  validate(albumIdSchema, 'params'),
  ctrlWrapper(getPhotosForAlbum)
)
router.post(
  `/${breakpointName}/photos/person`,
  validateToken,
  validate(addPersonDto, 'body'),
  ctrlWrapper(addPerson)
)

export const albumRouter = router
