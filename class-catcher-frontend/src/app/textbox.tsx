import React, { useState, ChangeEvent, FormEvent } from 'react';
// import Modal from 'react-modal';
import styles from './page.module.css'
import AddressSearch from './AddressSearch';

interface TextValues {
  adress: string;
  college: string;
  courseDepartment: string;
  courseNumber: string;
  transportMode: string;
}

const CustomTextBox: React.FC = () => {
  const [textValues, setTextValues] = useState<TextValues>({
    adress: '',
    college: '',
    courseDepartment: '',
    courseNumber: '',
    transportMode: '',
  });



  //the conditionals to see if all fields are filled
  const [validationError, setValidationError] = useState<string | null>(null);

  // const [backendData, setBackendData] = useState<any | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);



  const validateForm = () => {
    if (
      !textValues.adress ||
      !textValues.college ||
      !textValues.courseDepartment ||
      !textValues.courseNumber ||
      !textValues.transportMode
    ) {
      setValidationError('Please fill out all fields.');
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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


  //Where the submitted values go after the button is pressed
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${textValues.college} ${textValues.courseDepartment} ${textValues.courseNumber}`,
          address: textValues.adress,
          transportMode: textValues.transportMode,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.alert(`Data from Backend:\n${JSON.stringify(data, null, 2)}`);
      } else {
        console.error('Error during submission:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className={styles['address-search']}>
      <h1>Class-Catcher</h1>
      {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
      <AddressSearch onAddressSelected={handleAddressSelected} />
      {/* Transportation Dropdown */}
      <select
        name="transportMode"
        value={textValues.transportMode}
        onChange={handleTextChange}
        placeholder="transportMode"
      >
        <option value="">Mode of Travel</option>
        <option value="driving">Driving</option>
        <option value="transit">Transit</option>
        <option value="walking">Walking</option>
        <option value="bicycle">Bicycle</option>
      </select>
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

      {/* Display backend data in a modal */}
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Backend Data Modal"
      >
        <h2>Data from Backend:</h2>
        <pre>{JSON.stringify(backendData, null, 2)}</pre>
        <button onClick={closeModal}>Close</button>
      </Modal> */}

    </div>
  );
};

export default CustomTextBox;