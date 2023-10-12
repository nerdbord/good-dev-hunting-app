'use client'
import React from 'react'
import styles from './UserPhotoUploader.module.scss'
import { useState, useCallback, useMemo, ChangeEvent } from 'react'

import { PutBlobResult } from '@vercel/blob'
export const UserPhotoUploader = () => {
    const [data, setData] = useState<{
        image: string | null
      }>({
        image: null,
      })
      const [file, setFile] = useState<File | null>(null)
    

      const onChangePicture = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          const file = event.currentTarget.files && event.currentTarget.files[0]
          if (file) {
            if (file.size / 1024 / 1024 > 50) {
              alert('File size too big (max 50MB)'); 
            } else {
              setFile(file)
              const reader = new FileReader()
              reader.onload = (e) => {
                setData((prev) => ({ ...prev, image: e.target?.result as string }))
              }
              reader.readAsDataURL(file)
            }
          }
        },
        [setData]
      )
    
      const [saving, setSaving] = useState(false)
      const [uploadStatus, setUploadStatus] = useState<string | null>(null);  // Dodane
    
      const saveDisabled = useMemo(() => {
        return !data.image || saving
      }, [data.image, saving])
    
      return (
        <form
          className="grid gap-6"
          onSubmit={async (e) => {
            e.preventDefault()
            setSaving(true)
            fetch('/api/user/photo', {
              method: 'POST',
              headers: { 'content-type': file?.type || 'application/octet-stream' },
              body: file,
            }).then(async (res) => {
              if (res.status === 200) {
                const { url } = (await res.json()) as PutBlobResult 
                setUploadStatus(`File uploaded! Your file has been uploaded to ${url}`); 
              } else {
                const error = await res.text()
                setUploadStatus(`Upload failed: ${error}`); 
              }
              setSaving(false)
            })
          }}
        >
          <div>
            <div className="space-y-1 mb-4">
              <h2 className="text-xl font-semibold">Upload a file</h2>
              <p className="text-sm text-gray-500">
                Accepted formats: .png, .jpg, .gif, .mp4
              </p>
            </div>
            <label
              htmlFor="image-upload"
              className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
            >
      
              {data.image && (
                <img
                  src={data.image}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              )}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                id="image-upload"
                name="image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onChangePicture}
              />
            </div>
          </div>
    
          <button
            disabled={saveDisabled}
            className={`${
              saveDisabled
                ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                : 'border-black bg-black text-white hover:bg-white hover:text-black'
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {saving ? (
              <span>loading</span>
            ) : (
              <p className="text-sm">Confirm upload</p>
            )}
          </button>
          {uploadStatus && <span>{uploadStatus}</span>}  // Dodane
        </form>
      )
    }
export default UserPhotoUploader