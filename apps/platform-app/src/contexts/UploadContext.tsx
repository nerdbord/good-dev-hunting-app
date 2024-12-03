'use client'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

interface UploadContextProps {
  imageUploadError: boolean
  setImageUploadError: React.Dispatch<React.SetStateAction<boolean>>
  formDataWithFile: FormData | null
  setFormDataWithFile: React.Dispatch<React.SetStateAction<FormData | null>>
  cvUploadError: boolean
  setCvUploadError: React.Dispatch<React.SetStateAction<boolean>>
  cvFormData: FormData | null
  setCvFormData: React.Dispatch<React.SetStateAction<FormData | null>>
}

// onSetCvUploadError: (error: string) => void
// onSetCvFormData: (data: FormData) => void

export const UploadProvider = ({ children }: PropsWithChildren) => {
  const [imageUploadError, setImageUploadError] = useState(false)
  const [formDataWithFile, setFormDataWithFile] = useState<FormData | null>(
    null,
  )
  const [cvUploadError, setCvUploadError] = useState(false)
  const [cvFormData, setCvFormData] = useState<FormData | null>(null)

  return (
    <UploadContext.Provider
      value={{
        imageUploadError,
        setImageUploadError,
        formDataWithFile,
        setFormDataWithFile,
        cvUploadError,
        setCvUploadError,
        cvFormData,
        setCvFormData,
      }}
    >
      {children}
    </UploadContext.Provider>
  )
}

const UploadContext = createContext<UploadContextProps | undefined>(undefined)
export const useUploadContext = () => {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error('useUploadContext must be used within an UploadProvider')
  }
  return context
}
