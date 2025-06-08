'use client'
import { type CreateProfileFormValues } from '@/app/[locale]/(profile)/profile.types'
import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import styles from './MarkdownTextArea.module.scss'

import CharacterCount from '@tiptap/extension-character-count'
import LinkExtension from '@tiptap/extension-link'
import PlaceholderExtension from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'

import TiptapToolbar from '../TiptapToolbar/TiptapToolbar'

export interface MarkdownTextAreaProps {
  value: string
  placeholder: string
  name: string
  maxLength?: number
  dataTestId?: string
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void
  toolbarHasNavOffset?: boolean
}

export const MarkdownTextArea: React.FC<MarkdownTextAreaProps> = ({
  value,
  name,
  placeholder,
  onBlur: onBlurFromProps,
  maxLength: propMaxLength = 1500,
  dataTestId,
  toolbarHasNavOffset = false,
}) => {
  const { setFieldValue } = useFormikContext<CreateProfileFormValues>()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Restore default behavior for most elements,
        // so their inputRules and pasteRules work (e.g., for bold, italic, list, heading)
        heading: {
          levels: [1, 2, 3], // According to the toolbar
        },
        // Bold, Italic, Lists - leave default so their pasteRules work
        // Disable only those that we definitely don't use and don't want their shortcuts/pasting
        code: false,
        codeBlock: false,
        strike: false,
        blockquote: false,
        horizontalRule: false,
      }),

      LinkExtension.configure({
        // Key for blocking automatic linking on paste
        linkOnPaste: false,
        // If we also want typed URLs not to become links automatically:
        autolink: false,
        openOnClick: false, // This is a good setting so links don't open in edit mode
        HTMLAttributes: {
          class: 'tiptap-link',
          rel: 'noopener noreferrer nofollow',
          target: '_blank',
        },
      }),

      PlaceholderExtension.configure({
        placeholder: placeholder || 'Napisz coś o sobie...',
      }),
      CharacterCount.configure({
        limit: propMaxLength,
      }),
      Markdown.configure({
        html: false,
        linkify: true,
        tightLists: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: `tiptap-content-editable`,
      },
    },
    onBlur: ({ editor: currentEditor, event }) => {
      const markdownOutput = currentEditor.storage.markdown.getMarkdown()
      setFieldValue(name, markdownOutput)
      if (onBlurFromProps) {
        onBlurFromProps(event as unknown as React.FocusEvent<HTMLDivElement>)
      }
    },
  })

  useEffect(() => {
    if (editor && value !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

  return (
    <div className={styles.editorWrapper}>
      <div
        className={`${styles.toolbarContainer} ${
          toolbarHasNavOffset ? styles.toolbarOffset : ''
        }`}
      >
        <TiptapToolbar editor={editor} />
      </div>
      <EditorContent
        editor={editor}
        data-testid={dataTestId}
        className={styles.editorContentArea}
      />
      {editor?.storage.characterCount && propMaxLength && (
        <div className={styles.characterCount}>
          {editor.storage.characterCount.characters()}/{propMaxLength}
        </div>
      )}
    </div>
  )
}
