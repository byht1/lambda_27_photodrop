import express from 'express';
import { ctrlWrapper } from 'helpers';
import { AlbumController } from './album.controller';
import { uploadFiles, validate, validateToken } from 'middleware';
import { newAlbumDto } from './dto/createAlbum.dto';
import { paginationDto } from 'modules/dto/pagination.dto';

const router = express.Router();
const breakpointName = 'album';

const { createAlbum, getAlbums, addPhotosToAlbum, getPhotosForAlbum } = new AlbumController();

router.post(
  `/${breakpointName}`,
  validateToken,
  validate(newAlbumDto, 'body'),
  ctrlWrapper(createAlbum)
);
router.get(
  `/${breakpointName}`,
  validateToken,
  validate(paginationDto, 'query'),
  ctrlWrapper(getAlbums)
);
router.post<'/album/:albumId/photos', any>(
  `/${breakpointName}/:albumId/photos`,
  validateToken,
  uploadFiles,
  ctrlWrapper(addPhotosToAlbum)
);
router.get(`/${breakpointName}/:albumId/photos`, validateToken, ctrlWrapper(getPhotosForAlbum));

export const albumRouter = router;
