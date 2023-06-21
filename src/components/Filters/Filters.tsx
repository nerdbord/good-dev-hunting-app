'use client'
import styles from './Filters.module.scss'
import React, {useState} from 'react'
import 'material-icons/iconfont/material-icons.css'
import { FilterButton } from '@/components/FilterButton/FilterButton'

const Filters = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  
  const handleSelect = (option: string, buttonType: string) => {
    let updatedOptions: string[];

    switch (buttonType) {
      case 'Technology':
        updatedOptions = selectedTechnology.includes(option)
          ? selectedTechnology.filter((selectedOption) => selectedOption !== option)
          : [...selectedTechnology, option];
        setSelectedTechnology(updatedOptions);
        console.log(selectedTechnology);
        break;

      case 'Seniority':
        updatedOptions = selectedSeniority.includes(option)
          ? selectedSeniority.filter((selectedOption) => selectedOption !== option)
          : [...selectedSeniority, option];
        setSelectedSeniority(updatedOptions);
        console.log(selectedSeniority);
        break;

      case 'Availability':
        updatedOptions = selectedAvailability.includes(option)
          ? selectedAvailability.filter((selectedOption) => selectedOption !== option)
          : [...selectedAvailability, option];
        setSelectedAvailability(updatedOptions);
        console.log(selectedAvailability);
        break;

      case 'Location':
        updatedOptions = selectedLocation.includes(option)
          ? selectedLocation.filter((selectedOption) => selectedOption !== option)
          : [...selectedLocation, option];
        setSelectedLocation(updatedOptions);
        console.log(selectedLocation);
        break;

      default:
        break;
    }
  };

  const technologyList = [
    'Javascript',
    'Python',
    'Node.js',
    'React.js',
    'Vue.js',
    'Angular',
    'MongoDB',
  ]

  const seniorityList = ['Intern', 'Junior', 'Mid', 'Senior', 'Lead / Expert']
  const availabilityList = ['Full-time', 'Part-time', 'Contract']
  const locationsList = ['Poland', 'Europe', 'Other']

  return (
    <div className={styles.mainContainer}>
       <div className={styles.features}>
        <FilterButton
          text="Technology"
          options={technologyList}
          onSelect={(option) => handleSelect(option, 'Technology')}
          selectedValue={selectedTechnology}
        />
        <FilterButton
          text="Seniority"
          options={seniorityList}
          onSelect={(option) => handleSelect(option, 'Seniority')}
          selectedValue={selectedSeniority}
        />
        <FilterButton
          text="Availability"
          options={availabilityList}
          onSelect={(option) => handleSelect(option, 'Availability')}
          selectedValue={selectedAvailability}
        />
        <FilterButton
          text="Location"
          options={locationsList}
          onSelect={(option) => handleSelect(option, 'Location')}
          selectedValue={selectedLocation}
        />
      </div>
      <div className={styles.devType}>
        <button className={styles.devTypeBtn + ' ' + styles.frontend}>
          Frontend
        </button>
        <button className={styles.devTypeBtn + ' ' + styles.backend}>
          Backend
        </button>
        <button className={styles.devTypeBtn + ' ' + styles.fullstack}>
          Fullstack
        </button>
      </div>
    </div>
  )
}

export default Filters
