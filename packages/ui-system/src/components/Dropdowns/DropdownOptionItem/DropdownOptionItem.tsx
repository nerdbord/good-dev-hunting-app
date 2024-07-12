import { IoIosCheckmark } from "react-icons/io";
import styles from "./DropdownOptionItem.module.scss";

export interface DropdownOption {
  name: string;
  value: string;
}

interface DropdownOptionItemProps {
  option: DropdownOption;
  onSelect: (option: DropdownOption) => void;
  hasSearchInput: boolean | undefined;
  isSelected: boolean;
}

export const DropdownOptionItem = ({
  option,
  onSelect,
  isSelected,
  hasSearchInput,
}: DropdownOptionItemProps) => (
  <label
    className={
      hasSearchInput ? styles.dropdownInputSearchBar : styles.dropdownInput
    }
  >
    <div className={`${styles.checkbox} ${isSelected ? styles.checked : ""}`}>
      <input
        type="checkbox"
        className={styles.hidden}
        checked={isSelected}
        onChange={() => onSelect(option)}
      />
      {isSelected && <IoIosCheckmark className={styles.checkmark} />}
    </div>
    {option.name}
  </label>
);
