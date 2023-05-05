import { Request, Response, NextFunction } from 'express';
import { createError } from 'helpers/error/createError';
import multer from 'multer';
import { join as pathJoin } from 'path';
import { v4 as uuidv4 } from 'uuid';

const temporaryDir = pathJoin(__dirname, '../temporary');

export interface IUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, temporaryDir);
  },
  filename: (req, file, cd) => {
    const [extension] = file.originalname.split('.').reverse();
    const uniqueName = uuidv4() + '.' + extension;
    cd(null, uniqueName);
  },
});

const upload = multer({ storage: multerConfig });

export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  upload.array('photos')(req, res, err => {
    if (!req.files) {
      return next(createError(400, 'File is missing'));
    }
    if (err) {
      return next(err);
    }
    return next();
  });
};
