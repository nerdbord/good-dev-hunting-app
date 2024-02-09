'use client'
import { CreateProfileFormValues } from '@/app/(profile)/types'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  ListsToggle,
  MDXEditor,
  UndoRedo,
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
import Tooltip from '../Tooltip/Tooltip'
import styles from './TextArea.module.scss'

export interface TextAreaProps {
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

const BioTextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  addImportantIcon,
  name,
  tooltipText,
}) => {
  const { setFieldValue } = useFormikContext<CreateProfileFormValues>()
  const maxLength = 1500

  const handleChange = (newValue: string) => {
    if (newValue.length <= maxLength) {
      setFieldValue(name, newValue)
    }
  }

  return (
    <div>
      <label className={styles.formLabel}>
        {label}
        {addImportantIcon && (
          <Tooltip text={tooltipText || null}>
            <ImportantIcon />
          </Tooltip>
        )}
      </label>
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
                <ListsToggle />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
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

export default BioTextArea
