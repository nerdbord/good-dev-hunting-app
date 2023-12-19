'use client'
import { createContext, useContext, useState, PropsWithChildren } from 'react'

interface UploadContextProps {
  imageUploadError: boolean
  setImageUploadError: React.Dispatch<React.SetStateAction<boolean>>
  selectedFile: File | null
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
}

export const UploadProvider = ({ children }: PropsWithChildren) => {
  const [imageUploadError, setImageUploadError] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  return (
    <UploadContext.Provider
      value={{
        imageUploadError,
        setImageUploadError,
        selectedFile,
        setSelectedFile,
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
