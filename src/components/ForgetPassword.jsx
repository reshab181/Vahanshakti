

import  { useEffect, useState } from 'react';
import { sendOtpRequest, changePasswordRequest } from '../apis/authentication';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

const ForgetPassword = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingChange, setLoadingChange] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [resendCount, setResendCount] = useState(0);
    const [timer, setTimer] = useState(120);
    const [otplimit, setOTPLimit] = useState(null);

    useEffect(() => {
        let interval;
        if (timer > 0 && resendDisabled) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && resendDisabled) {
            setResendDisabled(false);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timer, resendDisabled]);

    const navigate = useNavigate();

    const sendOTP = async (e) => {
        e.preventDefault();
        if(resendCount==4){
            return;
        }
        setLoading(true);
        try{
            const success = await sendOtpRequest(username);
    
            if (success.status === true) {
                setOtpSent(true);
                Swal.fire({
                    icon: 'success',
                    title: '',
                    text: success?.message,
                });
                setLoading(false);
                setResendDisabled(true);
                setTimer(120);
                setResendCount((prevCount) => prevCount + 1);
                setOTPLimit(success?.otplimit)
                sessionStorage.setItem("otplimit",success?.otplimit)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: success?.message,
                    text: 'This feature is blocked for today. Please try again tomorrow.',
                });
                
            }
        }catch(err){
            Swal.fire({
                icon: 'error',
                title: '',
                text:'API Error! Please try after some time',
            });
        }
        setLoading(false);
    };

    const changePassword = async (e) => {
        e.preventDefault();
        setLoadingChange(true);
        const success = await changePasswordRequest(username,"user", newPassword, otp);

        if (success.status === true) {
            console.log('Password changed successfully');
            Swal.fire({
                icon: 'success',
                title: '',
                text: success?.message,
            });
            navigate('/');
        } else {
            Swal.fire({
                icon: 'error',
                title: '',
                text: success?.message,
            });
            console.error('Failed to change password');
        }
        setLoadingChange(false);
    };

    return (
        <>
            <div className='forget-password-form'>
                <h4>Change Password</h4>
                <form>
                    <label>Username:</label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />

                    {otpSent ? (
                        <>
                            <label>New Password:</label>
                            <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <label>OTP:</label>
                            <input type='text' value={otp} onChange={(e) => setOtp(e.target.value)} />
                            <p className={`${timer !== 0 ? 'resend_otp_disable' : 'resend_otp'}`} onClick={timer === 0 && resendCount <= 4 ? sendOTP : null}>
                                {timer === 0 ? 'Resend OTP' : `Resend OTP in (${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60})`}
                            </p>
                            {otplimit == 0 ? '' : <p style={{color:"red",fontSize:"14px"}}>You have Only {otplimit} Attempts</p>}
                            <button type='button' className='password-send-otp-btn' onClick={changePassword}>
                                {loadingChange ? 'Changing Password...' : 'Change Password'}
                            </button>
                        </>
                    ) : (
                        <button type='button' onClick={sendOTP} className='password-send-otp-btn'>
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    )}
                </form>
                {resendCount == 4 &&<p style={{color:"red",fontSize:"14px"}}>This feature is blocked for today. Please try again tomorrow.</p>}
            </div>
        </>
    );
};

export default ForgetPassword;





