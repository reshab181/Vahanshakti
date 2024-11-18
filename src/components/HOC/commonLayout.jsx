import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/navigation";
import SidebarPermitHolder from "../permitHolderNavigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux';
import { setNavigationOpen } from '../../reducer/slice/commonSlice'
import './layout.css'
import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import './notification.css'
import Notification from "./Notification";
import ChangePasswordPage from "../ChangePasswordPage";
import UserProfile from "../UserProfile";
import { FiAlertCircle } from 'react-icons/fi'
import { logout } from "../../apis/authentication";
import ChangeLanguageComponent from "../../Translation/ChangeLanguageComponent";
import { useTranslation } from "react-i18next";


export const CommonLayout = () => {

    const {t} = useTranslation()

    const [showProfile, setShowProfile] = useState(false)
    
    const dialogRef = useRef()
    const dialogRef2 = useRef()
    const dialogRef3 = useRef()
    const dialogRef4 = useRef()
    let { navigationOpen,navigationSlide } = useSelector((state) => state.common);
    const dispatch = useDispatch()
    let token = sessionStorage.getItem("token")
    let userType = sessionStorage.getItem("userType");

    const menuToggleFun = () => {
        dispatch(setNavigationOpen(!navigationOpen))
        sessionStorage.setItem('staticToggle', navigationOpen)
    }

    useEffect(() => {
        sessionStorage.setItem('staticToggle', true)
    }, [])

    return (
        <>
            <div className='layout-container '>

                <div className="sidebar-container" style={{ zIndex: 999 }}>
                    {userType !== "PHOLDER" ? 
                        <Sidebar navigationOpen={navigationOpen} navigationSlide = {navigationSlide}/> : 
                        <SidebarPermitHolder  navigationOpen={navigationOpen} navigationSlide = {navigationSlide}/>
                    }
                </div>

                <div className='pages-container'>

                    {/* 👉 Top header 👈 */}
                    <div className="top-bar animate__animated animate__slideInDown animate__faster">
                        <div className="nav-title">
                            {
                                token && <GiHamburgerMenu size={20} style={{ cursor: "pointer" }} onClick={() => menuToggleFun()} />
                            }
                            <span className="logo-name">{t("basicWord.projectName")}</span>
                        </div>
                        <div className="profile" style={{gap:"20px"}}>
                            <div className="hide-on-small-screen">
                                <p style={{color:"black", fontSize:"14px",fontWeight:"400"}}>Language:</p>
                                <ChangeLanguageComponent />
                            </div>
                            {/* {userType !== "MNF" && userType !== "DST" && userType !== "PHOLDER"  ? <span style={{cursor: "pointer"}} onClick={() => dialogRef.current.showModal()}><FaBell size={22} fill="#000" /></span>: null} */}
                            <svg width="40" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: "pointer"}} onClick={() => setShowProfile(!showProfile)}>
                                <rect width="40" height="40" rx="20" fill="#2A85FF" />
                                <path d="M20.1334 19.0583C20.05 19.05 19.95 19.05 19.8584 19.0583C17.875 18.9917 16.3 17.3667 16.3 15.3667C16.3 13.325 17.95 11.6667 20 11.6667C22.0417 11.6667 23.7001 13.325 23.7001 15.3667C23.6917 17.3667 22.1167 18.9917 20.1334 19.0583Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.9666 22.1333C13.9499 23.4833 13.9499 25.6833 15.9666 27.025C18.2583 28.5583 22.0166 28.5583 24.3083 27.025C26.3249 25.675 26.3249 23.475 24.3083 22.1333C22.0249 20.6083 18.2666 20.6083 15.9666 22.1333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* 👉 Checking Authentication to show outlets or navigate to login 👈 */}
                    <div className={` pages_render `}>
                        <Outlet navigationOpen={navigationOpen} />
                    </div>

                    <div className="bottom-spacer"></div>

                </div>
            </div>

            {showProfile && 
            <div className="head-dialouge" >
                <ul>
                    <li onClick={() => dialogRef4.current.showModal()}>Profile</li>
                    <li  onClick={() => dialogRef2.current.showModal()}>Change Password</li>
                    <li onClick={() => dialogRef3.current.showModal()}>Logout</li>
                </ul>
            </div>
            }

            <dialog ref={dialogRef} className='not_dialog animate__animated animate__slideInRight animate__faster'>
                <Notification close={() => dialogRef.current.close()} />
            </dialog>
            
            <dialog ref={dialogRef2} className='not_dialog animate__animated animate__slideInRight animate__faster'>
                <ChangePasswordPage close={() => dialogRef2.current.close()} />
            </dialog>

            <dialog ref={dialogRef3} className="modal-container">
                <div className='modal-background  ' onClick={() => dialogRef.current.close()}></div>
                <div className="contain_modal">
                <div className='modal-sub-container  animate__animated animate__slideInLeft animate__faster'>
                <div className='modal-message'>
                    <span className='modal-icon '><FiAlertCircle size={25} /></span>
                    <div className='modal-contents'>
                    <span className='modal-content-first '>Are you sure?</span>
                    <span className='modal-content-second'>You will be logged out.</span>
                    </div>
                </div>
                <div className='modal-buttons'>
                    <button className='modal-cancel-button ' onClick={() => dialogRef3.current.close()}>No</button>
                    <button className='modal-confirm-button ' onClick={() => logout()}>Yes</button>
                </div>
                </div>
                </div>
            </dialog>

            <dialog ref={dialogRef4} className='not_dialog animate__animated animate__slideInRight animate__faster'>
                <UserProfile close={() => dialogRef4.current.close()} />
            </dialog>

        </>
    );
}
