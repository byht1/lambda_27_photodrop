import * as dotenv from 'dotenv'
dotenv.config()

type ToNumberEnvKey = 'WATERMARK_SIZE' | 'PORT'

type TEnvKey =
  | 'DB_URL'
  | 'COUNT_OF_QUERIES_IN_LOG'
  | 'TOKEN_SECRET_KEY'
  | 'AWS_S3_ACCESS_KEY'
  | 'AWS_S3_BUCKET'
  | 'AWS_S3_KEY_SECRET'

type ResponseGetEnv<T> = T extends ToNumberEnvKey ? number : string

export const getEnv = <T extends TEnvKey | ToNumberEnvKey>(
  envKey: T,
  defaultValue = ''
): ResponseGetEnv<T> => {
  const value = process.env[envKey]
  const response = value ? value : defaultValue

  if (envKey === 'WATERMARK_SIZE' || envKey === 'PORT') {
    return +response as ResponseGetEnv<T>
  }

  return response as ResponseGetEnv<T>
}
