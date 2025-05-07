import type { SVGProps } from 'react'

const PostIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 2.5C17.8978 2.10217 18.4374 1.87868 19 1.87868C19.5626 1.87868 20.1022 2.10217 20.5 2.5C20.8978 2.89782 21.1213 3.43739 21.1213 4C21.1213 4.56261 20.8978 5.10217 20.5 5.5L12 14L8 15L9 11L17.5 2.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default PostIcon
