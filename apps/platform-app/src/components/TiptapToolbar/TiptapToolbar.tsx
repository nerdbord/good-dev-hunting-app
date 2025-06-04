'use client'

import { I18nNamespaces } from '@/i18n/request'
import type { Editor } from '@tiptap/react'
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Link2,
  List,
  ListOrdered,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface TiptapToolbarProps {
  editor: Editor | null
}

const TiptapToolbar: React.FC<TiptapToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null
  }
  const t = useTranslations(I18nNamespaces.TiptapToolbar)

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt(t('enterLink'), previousUrl || 'https://')

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const handleBlockTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value
    const chain = editor.chain().focus()

    switch (value) {
      case 'paragraph':
        chain.setParagraph().run()
        break
      case 'h1':
        chain.toggleHeading({ level: 1 }).run()
        break
      case 'h2':
        chain.toggleHeading({ level: 2 }).run()
        break
      case 'h3':
        chain.toggleHeading({ level: 3 }).run()
        break
      default:
        break
    }
  }

  const getCurrentBlockType = () => {
    if (editor.isActive('heading', { level: 1 })) return 'h1'
    if (editor.isActive('heading', { level: 2 })) return 'h2'
    if (editor.isActive('heading', { level: 3 })) return 'h3'
    if (editor.isActive('paragraph')) return 'paragraph'
    return 'paragraph'
  }

  const blockTypeOptions = [
    { value: 'paragraph', label: t('paragraph') },
    { value: 'h1', label: t('heading1') },
    { value: 'h2', label: t('heading2') },
    { value: 'h3', label: t('heading3') },
  ]

  return (
    <div className="tiptap-toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        type="button"
        title={t('bulletList')}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        type="button"
        title={t('orderedList')}
      >
        <ListOrdered size={18} />
      </button>

      <select
        value={getCurrentBlockType()}
        onChange={handleBlockTypeChange}
        className="tiptap-toolbar-select"
        title={t('blockType')}
      >
        {blockTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        type="button"
        title={t('bold')}
        disabled={!editor.can().toggleBold()}
      >
        <BoldIcon size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        type="button"
        title={t('italic')}
        disabled={!editor.can().toggleItalic()}
      >
        <ItalicIcon size={18} />
      </button>

      <button
        onClick={addLink}
        type="button"
        title={t('link')}
        className={editor.isActive('link') ? 'is-active' : ''}
        disabled={!editor.can().setLink({ href: '' })}
      >
        <Link2 size={18} />
      </button>
    </div>
  )
}

export default TiptapToolbar
