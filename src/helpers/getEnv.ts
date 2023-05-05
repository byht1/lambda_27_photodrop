import * as dotenv from 'dotenv';
dotenv.config();

type TEnvKey =
  | 'DB_URL'
  | 'PORT'
  | 'COUNT_OF_QUERIES_IN_LOG'
  | 'TOKEN_SECRET_KEY'
  | 'AWS_S3_ACCESS_KEY'
  | 'AWS_S3_BUCKET'
  | 'AWS_S3_KEY_SECRET';

export const getEnv = (envKey: TEnvKey, defaultValue: string = '') => {
  const value = process.env[envKey];
  return value ? value : defaultValue;
};
