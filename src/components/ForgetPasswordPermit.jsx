import { useState } from 'react'

import '../components/HOC/notification.css'
import './ChangePassword.css'
import { changePasswordRequest, sendOtpRequest } from '../apis/authentication';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPermit = (props) => {
    const [username, setUsername] = useState('');
    const [type, setType] = useState('');
    
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const sendOTP = async () => {
      setLoading(true)
        const success = await sendOtpRequest(username);

        if (success.status == true) {
            setOtpSent(true);
            Swal.fire({
              icon: "success",
              title: "",
              text: success?.message
            });
            setLoading(false)
        }else{
          Swal.fire({
            icon: "error",
            title: "",
            text: success?.message
          });
          setLoading(false)
        }
    };

    const changePassword = async () => {

      setLoading(true)
        const success = await changePasswordRequest(username, type, newPassword, otp);

        if (success.status == true) {
            console.log('Password changed successfully');
            Swal.fire({
              icon: "success",
              title: "",
              text: success?.message
            });
            navigate('/')
        } else {
            Swal.fire({
                icon: "error",
                title: "",
                text: success?.message
              });
            console.error('Failed to change password');
        }
        setLoading(false)
    };
    
  return (
    <>
      <div className='forget-password-form'>
      <h4>Change Password</h4>
      <form >
        <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        {otpSent ? (
          <>
            <label>New Password:</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            {/* <br /> */}
            <label>OTP:</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            {/* <br /> */}
            <button type="button" className='password-send-otp-btn' onClick={changePassword} >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
            <p>Resend OTP</p>
          </>
        ) : (
            <>
          <button type="button" onClick={sendOTP} className='password-send-otp-btn'>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
          </>
        )}
      </form>
    </div>



    <div>
      {/* <p>Original String: {inputString}</p> */}
      {/* <p>Binary Representation: {binaryReprbaseesentation}</p> */}
    </div>
    </>
  )
}

export default ForgetPasswordPermit






