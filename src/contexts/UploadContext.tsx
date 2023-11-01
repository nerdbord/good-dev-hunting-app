'use client'
import { createContext, useContext, useState, PropsWithChildren } from 'react'

interface UploadContextProps {
  triggerUpload: boolean
  setTriggerUpload: React.Dispatch<React.SetStateAction<boolean>>
  uploadSuccess: boolean
  setUploadSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export const UploadProvider = ({ children }: PropsWithChildren) => {
  const [triggerUpload, setTriggerUpload] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  return (
    <UploadContext.Provider
      value={{
        triggerUpload,
        setTriggerUpload,
        uploadSuccess,
        setUploadSuccess,
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
