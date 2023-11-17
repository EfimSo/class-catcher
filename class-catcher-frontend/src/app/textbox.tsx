import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './page.module.css'
import AddressSearch from './AddressSearch';

interface TextValues {
  adress: string;
  text2: string;
  text3: string;
}

const CustomTextBox: React.FC = () => {
  const [textValues, setTextValues] = useState<TextValues>({
    adress: '',
    text2: '',
    text3: '',
  });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValues({ ...textValues, [e.target.name]: e.target.value });
  };

  const handleAddressSelected = (address: string) => {
    // Set the selected address in the state
    setTextValues({ ...textValues, adress: address });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Values:', textValues);
    // Here where submitted data goes
  };

  return (
    <div className={styles['address-search']}>
      <h1>Class-catcher</h1>
      <AddressSearch onAddressSelected={handleAddressSelected} />
      <input
        type="text"
        name="text2"
        value={textValues.text2}
        onChange={handleTextChange}
        placeholder="Text 2"
      />
      <br />
      <input
        type="text"
        name="text3"
        value={textValues.text3}
        onChange={handleTextChange}
        placeholder="Text 3"
      />
      <br />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomTextBox;