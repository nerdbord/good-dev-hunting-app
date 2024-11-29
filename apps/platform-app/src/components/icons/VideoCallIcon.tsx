import type { SVGProps } from 'react'

const VideoCallIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 10L19.553 7.724C19.7054 7.64784 19.8748 7.61188 20.0466 7.61952C20.2184 7.62716 20.3832 7.67814 20.5274 7.76773C20.6715 7.85732 20.7899 7.98266 20.8718 8.13161C20.9537 8.28056 20.9965 8.44851 20.996 8.619V15.381C20.9965 15.5515 20.9537 15.7194 20.8718 15.8684C20.7899 16.0173 20.6715 16.1427 20.5274 16.2323C20.3832 16.3219 20.2184 16.3728 20.0466 16.3805C19.8748 16.3881 19.7054 16.3522 19.553 16.276L15 14V10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="3"
      y="6"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default VideoCallIcon
