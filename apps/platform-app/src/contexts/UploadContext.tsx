'use client'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

interface UploadContextProps {
  fileUploadError: boolean
  setFileUploadError: React.Dispatch<React.SetStateAction<boolean>>
  formDataWithFile: FormData | null
  setFormDataWithFile: React.Dispatch<React.SetStateAction<FormData | null>>
}

export const UploadProvider = ({ children }: PropsWithChildren) => {
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formDataWithFile, setFormDataWithFile] = useState<FormData | null>(
    null,
  )

  return (
    <UploadContext.Provider
      value={{
        fileUploadError: fileUploadError,
        setFileUploadError: setFileUploadError,
        formDataWithFile,
        setFormDataWithFile,
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
