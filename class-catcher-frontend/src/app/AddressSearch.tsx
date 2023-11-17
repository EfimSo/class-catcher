import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles from './page.module.css';

interface AddressSearchProps {
  onAddressSelected: (address: string) => void;
}

function AddressSearch({ onAddressSelected }: AddressSearchProps) {
  const [input, setInput] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState<string[]>([]);
  const addressData = ['Warren Towers', 'West Campus, Claflin Hall', 'West Campus, Sleeper Hall', 
  'West Campus, Rich Hall', 'Myles Standish Hall', 'Kilachand Hall', 'The Towers', 'Danielsen Hall',
  '1019 Commonwealth Ave', '575 Commonwealth Ave (Hojo)', '10 Buick Street (StuVi-1)', 
  '33 Harry Agganis Way (StuVi-2)'];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInput(userInput);

    // Filter and update filteredAddresses based on userInput
    const filtered = addressData.filter((address) =>
      address.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredAddresses(filtered);
  };

  const handleAddressClick = (address: string, e: MouseEvent) => {
    e.preventDefault();
    onAddressSelected(address);
    setInput(address);
    setFilteredAddresses([]); // Close the dropdown when an address is clicked
  };

  const renderAddresses = () => {
    if (filteredAddresses.length === 0) {
      return null;
    }

    return (
      <ul className={styles['address-dropdown']}>
        {filteredAddresses.map((address, index) => (
          <li key={index} onClick={(e) => handleAddressClick(address, e)}>
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