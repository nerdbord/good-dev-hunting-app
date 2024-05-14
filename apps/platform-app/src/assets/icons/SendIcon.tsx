export const SendIcon = ({ color = '#69717B' }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5622 11.1059C21.3031 11.4734 21.3031 12.5302 20.5622 12.8976L4.44436 20.8926C3.77965 21.2223 3 20.7387 3 19.9967V14.0003L12 12.0003L3 9.79466L3 4.00684C3 3.26484 3.77966 2.78127 4.44437 3.11099L20.5622 11.1059Z"
        stroke={color}
        strokeLinejoin="round"
      />
    </svg>
  )
}
