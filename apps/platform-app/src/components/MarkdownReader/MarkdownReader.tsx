import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import styles from './MarkdownReader.module.scss'

interface MarkdownReaderProps {
  text: string
}

export const MarkdownReader = (props: MarkdownReaderProps) => {
  return (
    <ReactMarkdown
      className={styles.markdownReader}
      rehypePlugins={[rehypeRaw]}
    >
      {props.text}
    </ReactMarkdown>
  )
}
