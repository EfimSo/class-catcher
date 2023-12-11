import React, { useState, ChangeEvent, FormEvent } from 'react';
// import Modal from 'react-modal';
import styles from './page.module.css'
import AddressSearch from './AddressSearch';

//initalize the fields the user is going to input
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
  const [classData, setClassData] = useState<any[]>([]); // State to store class data
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [selectedClass, setSelectedClass] = useState<any | null>(null); // State to store the selected class

  //make sure the user fills out all fields
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
    //connects the frontend to the backend using fetch
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
        setClassData(data); // Set class data received from the backend
        //window.alert(`Data from Backend:\n${JSON.stringify(data, null, 2)}`);
        setOpenModal(true); // Open the modal
      } else {
        console.error('Error during submission:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };


  const handleClassSelection = (classItem: any) => {
    setSelectedClass(classItem);
  };

  //connects the frontend to the google calender API
  const addToGoogleCalendar = async (selectedClass: any) => {
    try {
      if (selectedClass) {
        const response = await fetch('http://127.0.0.1:5000/add-to-calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            classData: selectedClass,
            // Include any other necessary parameters
          }),
        });

        if (response.ok) {
          console.log('Event added to Google Calendar!');
        } else {
          console.error('Error adding to Google Calendar:', response.status, response.statusText);
        }
      } else {
        console.log('Please select a class before adding to Google Calendar.');
      }
    } catch (error) {
      console.error('Error adding to Google Calendar:', error);
    }
  };

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
      {openModal && (
  <div className={styles.modal}>
    <h2>Class Schedule</h2>
    {classData.map((classItem: any) => (
      <div key={classItem.name} onClick={() => handleClassSelection(classItem)}>
        <p>
          <strong>Class Name:</strong> {classItem.name}
        </p>
        <p>
          <strong>Professor:</strong> {classItem.professor}
        </p>
        <p>
          <strong>Time:</strong> {classItem.time}
        </p>
        <p>
          <strong>Building:</strong> {classItem.building}
        </p>
        <p>
          <strong>Distance:</strong> {classItem.distance}
        </p>
        <p>
          <strong>Commute Length:</strong> {classItem.commute_length}
        </p>
        <button onClick={() => addToGoogleCalendar(classItem)}>
          Add to Google Calendar
        </button>
      </div>
    ))}
    <button onClick={() => setOpenModal(false)}>Close</button>
  </div>
)}
    </div>
  );
};

export default CustomTextBox;