import express from 'express';
import { PhotographersController } from './photographers.controller';
import { ctrlWrapper } from 'helpers';
import { accessAuth, refreshAuth, validate } from 'middleware';
import { singInPhotographersDto } from './dto/singInPhotographers.dto';

const router = express.Router();
const breakpointName = 'photographers';

const { singIn, getUserByToken, refresh, logout } = new PhotographersController();

router.post(
  `/${breakpointName}/singIn`,
  validate(singInPhotographersDto, 'body'),
  ctrlWrapper(singIn)
);
router.get(`/${breakpointName}/current`, accessAuth, ctrlWrapper(getUserByToken));
router.get(`/${breakpointName}/refresh`, refreshAuth, ctrlWrapper(refresh));
router.get(`/${breakpointName}/logout`, refreshAuth, ctrlWrapper(logout));

export const photographersRouter = router;
