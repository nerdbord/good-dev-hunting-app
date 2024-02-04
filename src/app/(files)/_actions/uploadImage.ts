'use server'

import { withSentry } from '@/utils/errHandling'
import { put } from '@vercel/blob'
import { customAlphabet } from 'nanoid'
import { revalidatePath } from 'next/cache'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
) // 7-character random string

export const uploadImage = withSentry(async (form: FormData) => {
  const image = form.get('fileUpload') as File
  const imageName = `${nanoid()}.${image.type.split('/')[1]}`

  const blob = await put(imageName, image, {
    access: 'public',
    addRandomSuffix: false,
  })

  revalidatePath('/')

  return blob.url
})
