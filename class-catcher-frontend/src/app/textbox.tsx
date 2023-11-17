import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './page.module.css'
import AddressSearch from './AddressSearch';

interface TextValues {
  adress: string;
  college: string;
  courseDepartment: string;
  courseNumber: string;
}

const CustomTextBox: React.FC = () => {
  const [textValues, setTextValues] = useState<TextValues>({
    adress: '',
    college: '',
    courseDepartment: '',
    courseNumber: '',
  });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'courseNumber' && !/^\d{0,3}$/.test(value)) {
      // Allow only up to 3 digits for courseNumber
      return;
    }

    if (name === 'courseDepartment' && !/^[A-Za-z]{0,2}$/.test(value)) {
      // Allow only up to 2 letters for courseDepartment
      return;
    }

    setTextValues({ ...textValues, [name]: value });
  };

  const handleAddressSelected = (address: string) => {
    // Set the selected address in the state
    setTextValues({ ...textValues, adress: address });
  };

  const handleCollegeSelected = (college: string) => {
    // Set the selected college in the state
    setTextValues({ ...textValues, college });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Values:', textValues);
    // Here where submitted data goes
  };

  return (
    <div className={styles['address-search']}>
      <h1>Class-Catcher</h1>
      <AddressSearch onAddressSelected={handleAddressSelected} />
      <br />
      {/* College Dropdown */}
      <select
        name="college"
        value={textValues.college}
        onChange={handleTextChange}
        placeholder="College"
      >
        <option value="">Select College</option>
        <option value="BUA">BUA</option>
        <option value="CAS">CAS</option>
        <option value="CDS">CDS</option>
        <option value="CFA">CFA</option>
        <option value="CGS">CGS</option>
        <option value="COM">COM</option>
        <option value="ENG">ENG</option>
        <option value="EOP">EOP</option>
        <option value="FRA">FRA</option>
        <option value="GMS">GMS</option>
        <option value="GRS">GRS</option>
        <option value="HUB">HUB</option>
        <option value="KHC">KHC</option>
        <option value="LAW">LAW</option>
        <option value="MED">MED</option>
        <option value="MET">MET</option>
        <option value="OTP">OTP</option>
        <option value="PDP">PDP</option>
        <option value="QST">QST</option>
        <option value="SAR">SAR</option>
        <option value="SDM">SDM</option>
        <option value="SED">SED</option>
        <option value="SHA">SHA</option>
        <option value="SPH">SPH</option>
        <option value="SSW">SSW</option>
        <option value="STH">STH</option>
        <option value="XAS">XAS</option>
        <option value="XRG">XRG</option>
      </select>
      <br />
      {/* Class Department Input */}
      <input
        type="text"
        name="courseDepartment"
        value={textValues.courseDepartment}
        onChange={handleTextChange}
        maxLength={2}
        placeholder="Course Department"
      />
      <br />
      {/* Course Number Input */}
      <input
        type="text"
        name="courseNumber"
        value={textValues.courseNumber}
        onChange={handleTextChange}
        pattern="\d{3}"
        placeholder="Course Number"
      />
      <br />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomTextBox;