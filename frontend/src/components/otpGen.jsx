import React, { useState } from 'react';
import {  } from "../pages/otpPage";

const OTPGenerator = () => {
  const [otp, setOTP] = useState('');
  const [input, setInput] = useState('');

  const generateOTP = () => {
    const newOTP = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit OTP
    setOTP(newOTP.toString());
  };

  const validateOTP = () => {
    if (otp === input) {
      alert('OTP is valid!');
    } else {
      alert('Invalid OTP!');
    }
  };

  return (
    <div>
      <h2>OTP Generator</h2>
      <button onClick={generateOTP}>Generate OTP</button>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={validateOTP}>Validate OTP</button>
      <br />
      <p>Generated OTP: {otp}</p>
    </div>
  );
};


export default OTPGenerator;
