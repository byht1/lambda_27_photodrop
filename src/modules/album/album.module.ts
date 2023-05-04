import express from 'express';
import { ctrlWrapper } from 'helpers';
import { AlbumController } from './album.controller';
import { validate, validateToken } from 'middleware';
import { newAlbumDto } from './dto/createAlbum.dto';
import { paginationDto } from 'modules/dto/pagination.dto';

const router = express.Router();
const breakpointName = 'album';

const { createAlbum, getAlbums } = new AlbumController();

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

export const albumRouter = router;
