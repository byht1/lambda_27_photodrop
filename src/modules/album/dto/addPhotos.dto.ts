import { z } from 'zod'

export type TAddPhotosDto = {
  photos: string[]
}

const filenameSchema = z.string().regex(/^[^/\\]*\.(png|jpg|jpeg|gif|bmp|svg|webp)$/)
export const addPhotosDto = z.object({
  photos: z.array(filenameSchema),
})
