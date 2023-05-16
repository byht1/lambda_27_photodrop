import { z } from 'zod'

type TKeyUUID = 'albumId'

const uuidSchema = (key: TKeyUUID) => {
  return z.object({
    [key]: z.string().uuid(),
  })
}

export const albumIdSchema = uuidSchema('albumId')
