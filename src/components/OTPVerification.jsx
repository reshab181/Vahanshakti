import React, { useState } from 'react';

const OTPVerification = () => {
  const [otp, setOTP] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleGetOTP = async () => {
    e.preventDefault();
    try {
      const response = await getOT(); 
      if (response.status === true) {
        setShowInput(true); 
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleValidateOTP = () => {
    console.log('Validating OTP:', otp);
  };

  return (
    <div>
      <div className="form-submit-btn">
        <button onClick={handleGetOTP}>Get OTP</button>
      </div>
      {showInput && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button onClick={handleValidateOTP}>Validate OTP</button>
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
