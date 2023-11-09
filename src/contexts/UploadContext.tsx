'use client'
import { createContext, useContext, useState, PropsWithChildren } from 'react'

interface UploadContextProps {
  triggerUpload: boolean
  setTriggerUpload: React.Dispatch<React.SetStateAction<boolean>>
  uploadSuccess: boolean
  setUploadSuccess: React.Dispatch<React.SetStateAction<boolean>>
  fileSelected: boolean;
  setFileSelected: React.Dispatch<React.SetStateAction<boolean>>;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadProvider = ({ children }: PropsWithChildren) => {
  const [triggerUpload, setTriggerUpload] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [fileSelected, setFileSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <UploadContext.Provider
      value={{
        triggerUpload,
        setTriggerUpload,
        uploadSuccess,
        setUploadSuccess,
        fileSelected,
    setFileSelected,
    isUploading,
    setIsUploading
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
