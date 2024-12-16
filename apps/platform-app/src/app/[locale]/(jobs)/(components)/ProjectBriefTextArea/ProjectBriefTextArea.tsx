'use client'

import { type CreateJobDetailsFormValues } from '@/app/[locale]/(jobs)/jobDetailsTypes'
import {
  BlockTypeSelect,
  CreateLink,
  ListsToggle,
  MDXEditor,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

import { useFormikContext } from 'formik'
import React from 'react'
import styles from './ProjectBriefTextArea.module.scss'

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
  const { setFieldValue } = useFormikContext<CreateJobDetailsFormValues>()
  const maxLength = 1500

  const handleChange = (newValue: string) => {
    if (newValue.length <= maxLength) {
      setFieldValue(name, newValue)
    }
  }
  return (
    <div className={styles.editorWrapper}>
      <MDXEditor
        className={`${styles.mdxEditorCustom} dark-theme dark-editor`}
        contentEditableClassName={styles.mdxContentEditable}
        onChange={handleChange}
        //@ts-ignore
        onBlur={onBlur}
        markdown={value}
        autoFocus={true}
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
    </div>
  )
}
