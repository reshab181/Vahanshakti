import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import './notification.css'

import notificationImage from '../../assets/notification.png'
import { getBeforeminutesAgoEpoch, getCurrentDateEpoch } from '../Common/PowerUpFunctions'
import { alarmsMap } from "../../constants/alarmMap";
import { BaseURL } from '../../constants/baseURL'
const worker = new Worker(new URL('./worker.js', import.meta.url));

const Notification = (props) => {

    const [notificationList, setNotificationList] = useState([]) // notification list

    console.log("response_parsed", "notificationDataArray")  
    
    const fetchAlarmLog = async () => {
        let time = {
            start: getBeforeminutesAgoEpoch(60),
            end: getCurrentDateEpoch()
        }

        
        const eid = (sessionStorage.getItem("userType") === "SBU" || sessionStorage.getItem("userType") === "SBU") ? -1 : sessionStorage.getItem("entityId")

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const token = sessionStorage.getItem("token")
        const access_token = sessionStorage.getItem("access_token")

        // worker.postMessage({ eid, time, alarmsMap, BaseURL, formattedDate, token, access_token});

        // // Handle messages from the worker
        // worker.onmessage = (e) => {
        //   const { success, alarmsData } = e.data;
        //   if (success) {
        //     setNotificationList(alarmsData);
        //   } 
          
        // };
        
    }

    useEffect(()=>{
        fetchAlarmLog()
        setInterval(()=>fetchAlarmLog(), 60*60000);
    },[])


    return (
        <>
            {/* Main Container */}
            <div className="not_container">

                {/* Header */}
                <div className="not_af_container">
                    <div className="not_af_header">
                        <span className="" style={{ fontSize: '16px' }}>Notifications</span>
                        <span className='cross_button' onClick={() => props.close()}><RxCross2 size={20} /></span>
                    </div>
                </div>

                {/* Notification List */}
                <div className="not_msg_container">

                    {
                        notificationList?.length > 0 ?
                            <>
                                {
                                    notificationList?.map((elem, index) =>
                                        
                                            <div key={index} className="notifications" style={{ position: 'relative' }}>
                                                {/* <div style={{ fontSize: '20px' }} className='animate__animated animate__swing'><FaBell fill="#ffaa26" size={25} /></div> */}
                                                <div>
                                                    <div style={{ fontWeight: 700 }}>{elem?.entityName}</div>
                                                    <div style={{ fontWeight: 500 }}>{elem?.alarmDescription}</div>
                                                    <div style={{ fontWeight: 400, fontSize: '12px' }}>{elem?.address}</div>
                                                </div>
                                                <span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(172, 79, 15,0.9)', padding: '3px 6px', fontSize: '12px', color: 'white' }}>{elem?.timestampStr}</span>
                                            </div>
                                        )
                                }
                            </>
                            :
                            <>
                                <div className='' style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '90vh', alignItems: 'center', padding: '10px', justifyContent: 'center' }}>
                                    <img src={notificationImage} style={{ width: '10rem' }} alt="" />
                                    <span style={{ fontWeight: 600, fontSize: '16px' }}>! No Notification Available !</span>
                                </div>
                            </>
                    }

                </div>

            </div>

        </>
    )
}

export default Notification