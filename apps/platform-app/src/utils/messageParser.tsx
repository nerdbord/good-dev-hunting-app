import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import React from 'react'

/**
 * MessageElement interface defines the structure for special message elements
 */
interface MessageElement {
  name: string
  pattern: RegExp
  startTag: string
  endTag: string
  translationKey?: string
  translationNamespace?: I18nNamespaces
  render: (content: string, label?: string) => React.ReactNode
}

/**
 * Component that wraps a message element with translation support
 */
function MessageElementWithTranslation({
  element,
  content,
}: {
  element: MessageElement
  content: string
}) {
  // Use translations if namespace is provided
  const t = element.translationNamespace
    ? useTranslations(element.translationNamespace)
    : undefined

  // Get the translated label if translation key is provided
  const label =
    element.translationKey && t ? t(element.translationKey) : undefined

  return <>{element.render(content, label)}</>
}

/**
 * Registry of all special message elements that can be parsed in chat messages
 */
export const messageElements: MessageElement[] = [
  {
    name: 'cvButton',
    pattern: /\[CV_BUTTON\](.*?)\[\/CV_BUTTON\]/,
    startTag: '[CV_BUTTON]',
    endTag: '[/CV_BUTTON]',
    translationKey: 'viewCV',
    translationNamespace: I18nNamespaces.Inbox,
    render: (url: string, label = 'View CV') => (
      <div style={{ marginTop: '16px' }}>
        <Button variant="primary" onClick={() => window.open(url, '_blank')}>
          {label}
        </Button>
      </div>
    ),
  },
  // Add more message elements here in the future
  // Example:
  // {
  //   name: 'portfolioLink',
  //   pattern: /\[PORTFOLIO\](.*?)\[\/PORTFOLIO\]/,
  //   startTag: '[PORTFOLIO]',
  //   endTag: '[/PORTFOLIO]',
  //   translationKey: 'viewPortfolio',
  //   translationNamespace: I18nNamespaces.Inbox,
  //   render: (url: string, label = 'View Portfolio') => (
  //     <Button
  //       variant="secondary"
  //       onClick={() => window.open(url, '_blank')}
  //     >
  //       {label}
  //     </Button>
  //   ),
  // },
]

/**
 * Formats a special element in a message
 * @param content - Content to be wrapped with special element tags
 * @param elementName - Name of the element from the registry
 * @returns Formatted string with special element tags
 */
export function formatMessageElement(
  content: string,
  elementName: string,
): string {
  const element = messageElements.find((el) => el.name === elementName)
  if (!element) return content

  return `${element.startTag}${content}${element.endTag}`
}

/**
 * Parses a message content and renders special elements
 * @param content - Message content to parse
 * @returns React node with parsed content
 */
export function parseMessageContent(content: string): React.ReactNode {
  // If content is empty, return it as is
  if (!content) return content

  const remainingContent = content
  const segments: React.ReactNode[] = []
  let segmentIndex = 0

  // Check for each element in our registry
  for (const element of messageElements) {
    // Find all matches for this element
    const matches = [
      ...remainingContent.matchAll(new RegExp(element.pattern, 'g')),
    ]

    if (matches.length > 0) {
      // Split content at each match position
      let lastIndex = 0

      for (const match of matches) {
        if (!match.index) continue

        // Add text before the current match
        if (match.index > lastIndex) {
          const beforeText = remainingContent.substring(lastIndex, match.index)
          if (beforeText) {
            segments.push(
              <React.Fragment key={`segment-${segmentIndex++}`}>
                {beforeText}
              </React.Fragment>,
            )
          }
        }

        // Add the special element with translation support
        const elementContent = match[1] // First capture group has the content
        segments.push(
          <React.Fragment key={`element-${element.name}-${segmentIndex++}`}>
            <MessageElementWithTranslation
              element={element}
              content={elementContent}
            />
          </React.Fragment>,
        )

        lastIndex = match.index + match[0].length
      }

      // Add any remaining text after the last match
      if (lastIndex < remainingContent.length) {
        segments.push(
          <React.Fragment key={`segment-${segmentIndex++}`}>
            {remainingContent.substring(lastIndex)}
          </React.Fragment>,
        )
      }

      // Reset with content that has all of this element type replaced
      if (segments.length > 0) {
        return <>{segments}</>
      }
    }
  }

  // If no special elements were found, return the original content
  return remainingContent
}

/**
 * Helper to wrap text with a special element tag
 * @param text - Text content of the message
 * @param elementData - The element to add (like CV URL)
 * @param elementName - Name of the element from the registry
 * @returns Formatted message with the special element
 */
export function addSpecialElementToMessage(
  text: string,
  elementData: string,
  elementName: string,
): string {
  if (!text || !elementData) return text

  // Format the element and append it to the text
  const formattedElement = formatMessageElement(elementData, elementName)
  return `${text}\n\n${formattedElement}`
}
