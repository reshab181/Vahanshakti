import React,{ useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import '../components/HOC/notification.css'
import './ChangePassword.css'
import { changePasswordRequest, sendOtpRequest } from '../apis/authentication';

const ChangePasswordPage = (props) => {
    const [username, setUsername] = useState('');
    const [type, setType] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const sendOTP = async () => {
        const success = await sendOtpRequest(username);

        if (success.status == true) {
            setOtpSent(true);
        }else{
          alert('Failed to Send OTP');
        }
    };

    const changePassword = async () => {
        const success = await changePasswordRequest(username, type, newPassword, otp);

        if (success.status == true) {
            console.log('Password changed successfully');
        } else {
            console.error('Failed to change password');
        }
    };

  return (
    <>
    <div className="not_container" onClick={() => props.close()}>
        <div className="not_af_container">
            <div className="not_af_header">
                <span className="" style={{ fontSize: '16px' }}>Change Password</span>
                <span className='cross_button' onClick={() => props.close()}><RxCross2 size={20} /></span>
            </div>
        </div>
        <div>
      <h4>Change Password</h4>
      <form className='change-password-form'>
        <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        {/* <label>Email:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        <br /> */}
        {otpSent ? (
          <>
            <label>New Password:</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            {/* <br /> */}
            <label>OTP:</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            {/* <br /> */}
            <button type="button" className='password-send-otp-btn' onClick={changePassword} >
              Change Password
            </button>
          </>
        ) : (
            <>
          <button type="button" onClick={sendOTP} className='password-send-otp-btn'>
            Send OTP
          </button>
          </>
        )}
      </form>
    </div>
    </div>
    </>
  )
}

export default ChangePasswordPage