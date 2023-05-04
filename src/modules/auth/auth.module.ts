import express from 'express';
import { ctrlWrapper } from 'helpers';
import { validate, validateToken } from 'middleware';
import { singInDto } from './dto/singIn.dto';
import { AuthController } from './auth.controller';

const router = express.Router();
const breakpointName = 'auth';

const { singIn, getUserByToken } = new AuthController();

router.post(`/${breakpointName}/singIn`, validate(singInDto, 'body'), ctrlWrapper(singIn));
router.get(`/${breakpointName}/current`, validateToken, ctrlWrapper(getUserByToken));

export const authRouter = router;
