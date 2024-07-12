import { AccordionIconType } from "../Accordion";

interface AccordionIconProps {
  type: AccordionIconType;
}

const AccordionIcon = (props: AccordionIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M17 12H7" stroke="#E2EAF1" strokeLinecap="round" />
      {props.type === AccordionIconType.Add && (
        <path d="M12 17V7" stroke="#E2EAF1" strokeLinecap="round" />
      )}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#E2EAF1"
      />
    </svg>
  );
};

export default AccordionIcon;
