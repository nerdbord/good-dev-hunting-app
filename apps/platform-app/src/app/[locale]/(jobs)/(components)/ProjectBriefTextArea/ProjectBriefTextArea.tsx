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
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

import { useFormikContext } from 'formik'
import React, { useEffect, useRef, Component, ErrorInfo, ReactNode, useState } from 'react'
import type { CreateJobFormValues } from '../../_utils/types'
import styles from './ProjectBriefTextArea.module.scss'
import dynamic from 'next/dynamic'

// Dynamically import MDXEditor with no SSR to avoid hydration issues
const MDXEditor = dynamic(
  () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor),
  { ssr: false }
)

// Error boundary to catch React 19 ref errors
class EditorErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('EditorErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// Simple textarea fallback for when MDXEditor fails
const FallbackEditor: React.FC<{
  value: string
  onChange: (value: string) => void
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
}> = ({ value, onChange, onBlur }) => {
  return (
    <textarea
      className={styles.fallbackTextarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  )
}

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
  const { setFieldValue } = useFormikContext<CreateJobFormValues>()
  const maxLength = 1500
  const lastValueRef = useRef(value)
  const [isMounted, setIsMounted] = useState(false)

  // Only render on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChange = (newValue: string) => {
    if (newValue.length <= maxLength && newValue !== value) {
      // Store the value to be processed in useEffect
      lastValueRef.current = newValue
    }
  }

  // Move state updates to useEffect to avoid React 19 warnings
  useEffect(() => {
    const currentValue = lastValueRef.current
    // Only update if the value has changed from what's in Formik
    if (currentValue !== value && currentValue.length <= maxLength) {
      setFieldValue(name, currentValue)
    }
  }, [name, setFieldValue, value, maxLength])

  // Return a placeholder during server-side rendering or before client hydration
  if (!isMounted) {
    return (
      <div className={styles.editorWrapper}>
        <textarea 
          className={styles.fallbackTextarea} 
          value={value}
          readOnly
        />
      </div>
    )
  }

  return (
    <div className={styles.editorWrapper}>
      <EditorErrorBoundary
        fallback={
          <FallbackEditor
            value={value}
            onChange={(newValue) => {
              if (newValue.length <= maxLength) {
                setFieldValue(name, newValue)
              }
            }}
            onBlur={onBlur as any}
          />
        }
      >
        <MDXEditor
          className={`${styles.mdxEditorCustom} dark-theme dark-editor`}
          contentEditableClassName={styles.mdxContentEditable}
          onChange={handleChange}
          onBlur={onBlur as any}
          markdown={value}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  {/* Use regular divs instead of the specific components */}
                  <div className="mdxeditor-toolbar-group">
                    <button type="button" className="mdxeditor-toolbar-button" title="Toggle Lists">
                      Lists
                    </button>
                    <button type="button" className="mdxeditor-toolbar-button" title="Format Block">
                      Format
                    </button>
                    <button type="button" className="mdxeditor-toolbar-button" title="Create Link">
                      Link
                    </button>
                  </div>
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
      </EditorErrorBoundary>
    </div>
  )
}

