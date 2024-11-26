'use server'

import { withSentry } from '@/utils/errHandling'
import { put } from '@vercel/blob'
import { customAlphabet } from 'nanoid'
import { revalidatePath } from 'next/cache'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
) // 7-character random string

export const uploadFile = withSentry(async (form: FormData) => {
  const file = form.get('fileUpload') as File
  const fileName = `${nanoid()}.${file.type.split('/')[1]}`

  const blob = await put(fileName, file, {
    access: 'public',
    addRandomSuffix: false,
  })

  revalidatePath('/')

  return blob.url
})
