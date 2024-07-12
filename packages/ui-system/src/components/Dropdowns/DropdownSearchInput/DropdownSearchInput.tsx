import React from "react";
import styles from "./DropdownSearchInput.module.scss";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showNoMatchingOptions: boolean;
}

export const DropdownSearchInput = ({
  searchTerm,
  setSearchTerm,
  showNoMatchingOptions,
}: SearchInputProps) => {
  return (
    <>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {showNoMatchingOptions && (
        <p className={styles.noMatchingOptions}>No matching options found</p>
      )}
    </>
  );
};
