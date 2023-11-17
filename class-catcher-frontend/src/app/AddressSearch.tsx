import React, { useState, ChangeEvent, MouseEvent, useEffect, FC } from 'react';
import styles from './page.module.css';

interface AddressSearchProps {
  onAddressSelected: (address: string) => void;
}

const AddressSearch: FC<AddressSearchProps> = ({ onAddressSelected }) => {
  const [input, setInput] = useState<string>('');
  const [filteredAddresses, setFilteredAddresses] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const addressData: string[] = [
    'Warren Towers',
    'West Campus, Claflin Hall',
    'West Campus, Sleeper Hall',
    'West Campus, Rich Hall',
    'Myles Standish Hall',
    'Kilachand Hall',
    'The Towers',
    'Danielsen Hall',
    '1019 Commonwealth Ave',
    '575 Commonwealth Ave (Hojo)',
    '10 Buick Street (StuVi-1)',
    '33 Harry Agganis Way (StuVi-2)',
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput: string = e.target.value;
    setInput(userInput);

    // Filter and update filteredAddresses based on userInput
    const filtered: string[] = addressData.filter((address: string) =>
      address.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredAddresses(filtered);
    setShowDropdown(true);
  };

  const handleAddressClick = (address: string, e: MouseEvent) => {
    e.preventDefault();
    onAddressSelected(address);
    setInput(address);
    setFilteredAddresses([]);
    setShowDropdown(false); // Close the dropdown when an address is clicked
  };

  const closeDropdown = () => {
    setFilteredAddresses([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Add a global click event listener to close the dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      const isOutside = !target.closest(`.${styles['address-search']}`);
      if (isOutside) {
        closeDropdown();
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const renderAddresses = () => {
    if (!showDropdown || filteredAddresses.length === 0) {
      return null;
    }

    return (
      <ul className={styles['address-dropdown']}>
        {filteredAddresses.map((address: string, index: number) => (
          <li key={index} onClick={(e: MouseEvent) => handleAddressClick(address, e)}>
            {address}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles['address-search']}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Address"
      />
      {renderAddresses()}
    </div>
  );
}

export default AddressSearch;