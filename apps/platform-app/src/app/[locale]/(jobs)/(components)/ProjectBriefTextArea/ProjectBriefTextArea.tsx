'use client'

import {
  BlockTypeSelect,
  CreateLink,
  ListsToggle,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  MDXEditor,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

import { useFormikContext } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import type { CreateJobFormValues } from '../../_utils/types'
import styles from './ProjectBriefTextArea.module.scss'
import dynamic from 'next/dynamic'

// Create a client-only inner editor component
const EditorComponent = ({ 
  value, 
  name, 
  onBlur,
  maxLength = 1500
}: {
  value: string;
  name: string;
  onBlur?: any;
  maxLength?: number;
}) => {
  const { setFieldValue } = useFormikContext<CreateJobFormValues>()
  const lastValueRef = useRef(value)

  const handleChange = (newValue: string) => {
    if (newValue.length <= maxLength) {
      lastValueRef.current = newValue
      setFieldValue(name, newValue)
    }
  }

  return (
    <MDXEditor
      className={`${styles.mdxEditorCustom} dark-theme dark-editor`}
      contentEditableClassName={styles.mdxContentEditable}
      onChange={handleChange}
      //@ts-ignore
      onBlur={onBlur}
      markdown={value}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <ListsToggle />
              <BlockTypeSelect />
              <CreateLink />
            </>
          ),
        }),
        linkPlugin(),
        linkDialogPlugin(),
        headingsPlugin(),
        listsPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  )
}

// Dynamically import the editor component with no SSR
const ClientOnlyEditor = dynamic(
  () => Promise.resolve(EditorComponent),
  { ssr: false }
)

export interface TextAreaProps {
  value: string
  placeholder: string
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
  name: string
  excludeDigits?: boolean
  maxLength?: number
  height?: number
  dataTestId?: string
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
}

export const ProjectBriefTextArea: React.FC<TextAreaProps> = ({
  value,
  name,
  onBlur,
}) => {
  const maxLength = 1500
  const [isClient, setIsClient] = useState(false)
  
  // Only show editor on client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className={styles.editorWrapper}>
      {isClient ? (
        <ClientOnlyEditor 
          value={value} 
          name={name} 
          onBlur={onBlur} 
          maxLength={maxLength}
        />
      ) : (
        // Simple textarea placeholder during SSR
        <textarea 
          className={styles.placeholder} 
          value={value} 
          readOnly 
        />
      )}
    </div>
  )
}
