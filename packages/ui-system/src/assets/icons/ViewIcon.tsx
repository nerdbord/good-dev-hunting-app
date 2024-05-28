export const ViewIcon = ({ color = '#69717B' }: { color?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"
        stroke={color}
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" stroke={color} strokeLinecap="round" />
    </svg>
  )
}
