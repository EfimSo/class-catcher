import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TextValues {
  text1: string;
  text2: string;
  text3: string;
}

const CustomTextBox: React.FC = () => {
  const [textValues, setTextValues] = useState<TextValues>({
    text1: '',
    text2: '',
    text3: '',
  });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValues({ ...textValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Values:', textValues);
    // Here where submitted data goes
  };

  return (
    <div>
      <h1>Class-catcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text1"
          value={textValues.text1}
          onChange={handleTextChange}
          placeholder="Adress"
        />
        <br />
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomTextBox;