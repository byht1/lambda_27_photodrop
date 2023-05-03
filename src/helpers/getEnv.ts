import * as dotenv from 'dotenv';
dotenv.config();

type TEnvKey =
  | 'DB_URL'
  | 'PORT'
  | 'COUNT_OF_QUERIES_IN_LOG'
  | 'ACCESS_SECRET_KEY'
  | 'REFRESH_SECRET_KEY';

export const getEnv = (envKey: TEnvKey, defaultValue: string = '') => {
  const value = process.env[envKey];
  return value ? value : defaultValue;
};
