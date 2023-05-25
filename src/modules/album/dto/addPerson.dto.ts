import validator from 'validator'
import { z } from 'zod'

export type TAddPersonDto = {
  photoId: string
  phoneNumbers: string[]
}

const validateMessage = {
  phoneNumber:
    'The phone number must be in the format +380ХХХХХХХХХХ. The country code may be different',
}

export const addPersonDto = z.object({
  photoId: z.string(),
  phoneNumbers: z.array(
    z.string().refine(
      (str) => validator.isMobilePhone(str, 'any', { strictMode: true }),
      () => ({
        message: validateMessage.phoneNumber,
      })
    )
  ),
})
