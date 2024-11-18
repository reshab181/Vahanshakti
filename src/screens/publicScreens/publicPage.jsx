import './login.css'
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { login, loginPermitHolder } from "../../apis/authentication";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import RegisterMNF from '../manufacturers/components/RegisterMNF';
import logo from '../../assets/logo4.png'
import { LuRefreshCw } from "react-icons/lu";
import PublicDashboard from './PublicDashboard';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import loginImage from '../../assets/undraw_remotely_2j6y.svg'

const generateRandomString = () => {
  const characters = 'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  // console.log(captcha);
  return captcha;
};

export const PublicPage = () => {

  // navigate constant
  const navigate = useNavigate()

  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [showPublicDashboard, setShowPublicDashboard] = useState(false)
  const [showPermitViolationPage, setShowPermitViolationPage] = useState(false)
  const [username, setUsername] = useState('') // to store username
  const [password, setPassword] = useState('') // to store password
  const [error, setError] = useState(false) // to handle error state
  const [loader, setLoader] = useState(false) // to handle loader state
  const [activeTab, setActiveTab] = useState('tab1'); // State to manage active tab
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [captcha, setCaptcha] = useState(generateRandomString());
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [capchaError, setCapchaError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const generateImageFromString = (text, width, height) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = width;
    canvas.height = height;
  
    ctx.font = 'italic 22px Arial';
    ctx.fillText(text, 10, 25);
  
    const dataURL = canvas.toDataURL();
  
    return dataURL;
  };

  const handleChangeCapcha = (e) => {
    setInputValue(e.target.value);
    setIsCaptchaValid(e.target.value === captcha);
    setCapchaError("");
  };

  const handleRefresh = () => {
    setCaptcha(generateRandomString());
    setInputValue('');
    setIsCaptchaValid(false);
  };

  console.log(showRegisterForm, "showRegisterForm")
  // Function to handle change event of fields and handling error state
  const handleChange = (e) => {
    setError(false)
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'username': {
        setUsername(value)
      } break;
      case 'password': {
        setPassword(value)
      }
    }

  }

  //Function to check field value to handle error
  const checkValidation = () => {
    if (!username) {
      return true
    }
    if (!password) {
      return true
    }
    return false;
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  // Function to submit form and handle navigations and error
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(checkValidation())

    if (!inputValue) {
      setCapchaError("Please fill Captcha");
      return
    } 
    if (!isCaptchaValid) {
      setCapchaError("Captcha is wrong");
      handleRefresh();
      return
    } 

    if (!checkValidation()) {
        setLoader(true)

        // Set a timeout for the login process
        const loginTimeout = setTimeout(() => {
            setLoader(false)
            setError(true)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login timed out. Please try again.",
            });
        }, 25000); // 25 seconds

        try {
            const data = await login(username, password)
            sessionStorage.setItem("loginResp",JSON.stringify(data.loginResp))
            
            if (data?.status == true) {
              if(data?.loginResp?.userType === "AUTH"){
                navigate('/deviceApproval/listDeviceApproval')
              }else{
                navigate('/dashboard')
              }
                setLoader(false)
            } else {
                setLoader(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data?.message,
                });
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoader(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while logging in. Please try again.",
            });
        } finally {
            // Clear the timeout
            clearTimeout(loginTimeout);
        }
    }
  }

  // Function to submit Permit form and handle navigations and error
  const handleSubmitPermit = async (e) => {
    e.preventDefault();
    setError(checkValidation())

    if (!isCaptchaValid) {
      setCapchaError("Captcha is wrong");
      handleRefresh();
      return
    } 

    if (!checkValidation()) {
        setLoader(true)

        // Set a timeout for the login process
        const loginTimeout = setTimeout(() => {
            setLoader(false)
            setError(true)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login timed out. Please try again.",
            });
        }, 25000); // 25 seconds

        try {
            const data = await loginPermitHolder(username, password)
            sessionStorage.setItem("loginResp",JSON.stringify(data.loginResp))

            if (data?.status == true) {
                navigate('/dashboard')
                setLoader(false)
            } else {
                setLoader(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data?.message
                });
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoader(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred while logging in. Please try again.",
            });
        } finally {
            // Clear the timeout
            clearTimeout(loginTimeout);
        }
    }
  }

  
  const handleToggleSwitch = () => {
    setToggleSwitch(!toggleSwitch);
    setActiveTab(toggleSwitch ? 'tab1' : 'tab2');
  };


  const handleDownload = (e) => {
    e.preventDefault(); // Prevents default link behavior
    const link = document.createElement('a');
    link.href = "https://vahanshakti.in/vahanshakti_live.apk";
    link.download = "vahanshakti.apk"; // Optional filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


  return (
    <>
      {/* Main Container */}
      <div className="main-container" style={{ position: "relative" }}>
        {/* Wrapped Sub container */}
        <div className="container animate__animated animate__slideInDown animate__faster" style={{border:'1px solid gainsboro'}}>

          {/* Image */}
          <div className="testimonial" style={{borderRight: '1px solid rgba(0,0,255,0.1)'}}>
            <img
              src={loginImage}
              alt=""
            />
          </div>
            <form className="login-form" autoComplete='off'>

                {/* Logo Header */}
                <div className="header">
                  <img src={logo} style={{marginTop: '10px'}} width={'35%'} alt="" />
                  {/* <p className="description">Vahan Shakti</p> */}
                </div>

                {/* Information */}
                <span className="message">Sign in to your account</span>

                {/* Username Field */}
                <div className={`${error && !username ? 'animate__animated animate__shakeX animate__faster input_container' : 'input_container'}`}>
                  <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M16.8035889,14.4605103c2.0820923-1.2811279,3.4776611-3.5723267,3.4776611-6.1885376  C20.28125,4.262207,17.0146484,1,13,1S5.71875,4.262207,5.71875,8.2719727c0,2.6162109,1.3955688,4.9074097,3.4776611,6.1885376  c-4.4957886,1.0071411-7.6505127,3.7583618-7.6505127,7.0878296C1.5458984,24.2729492,8.7460938,25,13,25  s11.4541016-0.7270508,11.4541016-3.4516602C24.4541016,18.2188721,21.2993774,15.4676514,16.8035889,14.4605103z   M7.21875,8.2719727C7.21875,5.0893555,9.8125,2.5,13,2.5s5.78125,2.5893555,5.78125,5.7719727S16.1875,14.043457,13,14.043457  S7.21875,11.4545898,7.21875,8.2719727z M13,23.5c-6.1149902,0-9.7753906-1.289978-9.9536743-1.9567261  C3.0509644,18.2345581,7.5145874,15.543457,13,15.543457c5.4848633,0,9.9481201,2.6906128,9.9536133,5.9988403  C22.7797852,22.2085571,19.1190186,23.5,13,23.5z" fill={error && !username ? "#ff0000" : "#1D1D1B"} />
                  </svg>
                  <input autoComplete='false' id="email_field" onChange={handleChange} onKeyDown={handleKeyPress} className={`${error && !username ? 'error_input_field' : 'input_field'}`} type="text" name="username" title="Inpit title" placeholder="Enter username" />
                </div>

                {/* Password Field */}
                <div className={`${error && !password ? 'animate__animated animate__shakeX animate__faster input_container' : 'input_container'}`}>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z" fill={error && password ? "#ff0000" : "#1D1D1B"}></path>
                  </svg>
                  <input autoComplete='false' id="password_field" onChange={handleChange} onKeyDown={handleKeyPress}   className={`${error && !password ? 'error_input_field' : 'input_field'}`} type={showPassword ? "text" : "password"} name="password" title="Inpit title" placeholder="Enter password" />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{position:"absolute",right:"5px",top:"10px",cursor:"pointer"}}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </div>

                <div className='capcha_container'>
                  <div className='capcha_refresh_con'>
                  <div className='capcha_feild'>
                    <img src={generateImageFromString(captcha, 200, 50)} alt="CAPTCHA" />
                  </div>
                    <div onClick={handleRefresh} className='capcha_refresh'>
                      <LuRefreshCw />
                    </div>
                  </div>
                  <div className='capcha_input'>
                    <input
                      type="text"
                      id="captcha"
                      value={inputValue}
                      onChange={handleChangeCapcha}
                      placeholder="Enter the Captcha"
                    />
                  </div>
                </div>

                {/* <div className="toggle-switch-container">
                  <label className="switch">
                    <input type="checkbox" onChange={handleToggleSwitch} checked={toggleSwitch} />
                    <span className="slider round"></span>
                  </label>
                  <span style={{marginLeft:"10px"}}>{toggleSwitch ? '' : 'Login as Permit Holder'}</span>
                </div> */}

                {capchaError && <p style={{fontSize:"14px",color:"red"}}>{capchaError}</p>}

                {!loader ?
                  // Sign In button
                  <>
                    <button type='submit' style={{ cursor: "pointer" }} className="sign-in_btn" onClick={(e) => toggleSwitch ? handleSubmitPermit(e) : handleSubmit(e)} title="Sign In">
                      <span>{toggleSwitch ? 'Sign In Permit' : 'Sign In'}</span>
                    </button>
                  </>
                  :
                  // Loader
                  <div className="loader-spin">
                    <RotatingLines
                      visible={true}
                      height="25"
                      width="25"
                      color="#000"
                      strokeWidth="5"
                      strokeColor="grey"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                }

                {/* Forgot Message */}
                {toggleSwitch ? <>{
                  !loader &&
                    <div className="" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingBottom: '7px' }}>
                      {/* <Link to='/forgetPasswordPermit' className='forgot-message'><span >Forgot Password</span></Link>             */}
                    </div>
                  }</> : <>{
                  !loader && 
                    <div className="" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingBottom: '3px' }}>                      
                      <Link to='/manufacturerSignUp' className='forgot-message'><span >Register MNF</span></Link>
                      <span className='' style={{ height: '1rem', backgroundColor: 'black', border: '1px solid gray', margin: '0px 5px' }}></span>
                      <Link to='/forgetPassword' className='forgot-message'><span >Forgot Password</span></Link>            
                    </div>
                  }</>}
                  <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingBottom: '7px' }}>
                    <Link to='/publicDashboard' className='forgot-message'><span >Public Dashboard</span></Link>
                    <span className='' style={{ height: '1rem', backgroundColor: 'black', border: '1px solid gray', margin: '0px 5px' }}></span>
                    <Link to='/reportPermitViolation' className='forgot-message'><span >Report Permit Violation</span></Link>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingBottom: '7px' }}>
                    <Link to='/privacyLink' className='forgot-message'><span >Privacy Policy</span></Link>
                    <span className='' style={{ height: '1rem', backgroundColor: 'black', border: '1px solid gray', margin: '0px 5px' }}></span>
                    <Link  to="#" onClick={handleDownload} className='forgot-message'><span >Download App</span></Link>
                  </div>
            </form>
        </div>
      </div>

      

      {showPublicDashboard && <div className='modal'>
        <PublicDashboard closePublicDashboard={setShowPublicDashboard} />
      </div>}
    </>
  )
};
