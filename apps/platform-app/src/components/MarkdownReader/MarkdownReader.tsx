import ReactMarkdown, {
  type Options as ReactMarkdownOptions,
} from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { CustomLink } from '../CustomLink/CustomLink'
import styles from './MarkdownReader.module.scss'

interface MarkdownReaderProps {
  text: string
  /**
   * Allows passing additional options directly to ReactMarkdown,
   * excluding 'children' and 'components' which are handled internally.
   */
  reactMarkdownOptions?: Partial<
    Omit<
      ReactMarkdownOptions,
      'children' | 'components' | 'rehypePlugins' | 'remarkPlugins'
    >
  >
  customRenderers?: ReactMarkdownOptions['components']
}

export const MarkdownReader: React.FC<MarkdownReaderProps> = ({
  text,
  reactMarkdownOptions,
  customRenderers,
}) => {
  if (!text) {
    return null
  }
  const components: ReactMarkdownOptions['components'] = {
    a: CustomLink,
    ...customRenderers,
  }

  return (
    <ReactMarkdown
      className={styles.markdownReader}
      rehypePlugins={[rehypeRaw as any]} // Pass rehypeRaw, 'as any' might be needed depending on plugin type versions
      remarkPlugins={[remarkGfm]}
      components={components}
      {...reactMarkdownOptions}
    >
      {text}
    </ReactMarkdown>
  )
}
