'use server'

import { withSentry } from '@/utils/errHandling'
// import { validateCvFile } from '@/utils/validateCvFileHelper'
import { put } from '@vercel/blob'
import { customAlphabet } from 'nanoid'
import { revalidatePath } from 'next/cache'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
) // 7-character random string

export const uploadCVdocumentFile = withSentry(async (form: FormData) => {
  const cvFile = form.get('fileUpload') as File

  if (!cvFile) {
    throw new Error('No file uploaded');
  }

  //   const validatedCVfile = validateCvFile(cvFile)
  const cvFileName = `${nanoid()}.${cvFile.type.split('/')[1]}`


  const blob = await put(cvFileName, cvFile, {
    access: 'public',
    addRandomSuffix: false,
  })

  revalidatePath('/')

  return blob.url
})
