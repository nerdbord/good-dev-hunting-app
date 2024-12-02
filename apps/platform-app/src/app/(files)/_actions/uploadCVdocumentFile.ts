'use server'

import { withSentry } from '@/utils/errHandling'
import { validateCvFile } from '@/utils/validateCvFileHelper'
import { put } from '@vercel/blob'
import { customAlphabet } from 'nanoid'
import { revalidatePath } from 'next/cache'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
) // 7-character random string

function mapMimeTypeToCvDocumentType(mimeType: string): 'PDF' | null {
  if (mimeType === 'application/pdf') {
    return 'PDF'
  } else {
    return null
  }
}

export const uploadCVdocumentFile = withSentry(async (form: FormData) => {
  const cvFile = form.get('cvFileUpload') as File | null

  if (!cvFile) {
    throw new Error('No file uploaded')
  }

  try {
    const validatedCVfile = validateCvFile(cvFile)
    if (!validatedCVfile) {
      throw new Error('Invalid file')
    }

    const cvFileType = mapMimeTypeToCvDocumentType(cvFile.type)
    if (!cvFileType) {
      throw new Error('Unsupported file type')
    }

    const cvFileName = `${nanoid()}.${cvFile.type.split('/')[1]}`

    const blob = await put(cvFileName, cvFile, {
      access: 'public',
      addRandomSuffix: false,
    })

    revalidatePath('/')
    console.log('CV NAME: ', cvFile.name)
    console.log('CV URL : ', blob.url)
    return { success: true, cvUrl: blob.url, cvFile: cvFile.name }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error uploading CV file:', error.message)
      return { success: false, error: error.message }
    }

    console.error('Unexpected error during file upload')
    return { success: false, error: 'Błąd przesyłania pliku' }
  }
})
