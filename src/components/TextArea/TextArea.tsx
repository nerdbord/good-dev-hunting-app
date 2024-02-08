'use client'
import { CreateProfileFormValues } from '@/app/(profile)/types'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  linkDialogPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useFormikContext } from 'formik'
import React from 'react'
import styles from './TextArea.module.scss'

interface TextAreaProps {
  label: string
  value: string
  placeholder: string
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
  addImportantIcon?: boolean
  name: string
  excludeDigits?: boolean
  maxLength?: number
  height?: number
  tooltipText?: string | null
  dataTestId?: string
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  label,
  value,
  onChange,
  addImportantIcon,
  name,
  excludeDigits,
  maxLength,
  height,
  tooltipText,
  dataTestId,
  onBlur,
}) => {
  const { setFieldValue } = useFormikContext<CreateProfileFormValues>()

  const handleChange = (newValue: string) => {
    setFieldValue(name, newValue)
  }

  return (
    <div>
      <MDXEditor
        className={`${styles.mdxEditorCustom} dark-theme dark-editor`}
        onChange={(newValue) => handleChange(newValue)}
        markdown={value}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <CreateLink />
                <ListsToggle />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
              </>
            ),
          }),
          headingsPlugin(),
          listsPlugin(),
          linkDialogPlugin(),
          markdownShortcutPlugin(),
        ]}
      />
    </div>
  )
}

export default TextArea
