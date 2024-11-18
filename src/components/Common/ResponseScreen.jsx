///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Component   : ResponseScreen
// 👉 Status      : Open
// 👉 Description : To show submission success pop up.
//                   It requires props:
//                                    1. heading             -> heading 
//                                    2. message             -> message 
//                                    3. close               -> close
//                                    4. action on close     -> closeAction
// 👉 Functions   :  
//                  1. closeAction  -> To handle event in close button.
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// 👉 Importing packages 👈
import React from "react";
import { RxCross2 } from 'react-icons/rx'
import check from './check2.png'
import './ResponseScreen.css'
import { useNavigate } from "react-router-dom";

const ResponseScreen = (props) => {

    const navigate = useNavigate()

    // 👉 Function 1 👈
    const closeAction = () => {
        navigate("/")
        props.close()
        props.closeAction()
    }

    return (
        <>
            <div className="modal-container">

                <div className='modal-background  ' onClick={() => closeAction()}></div>

                <div className="contain_modal animate__animated animate__zoomIn animate__faster" style={{ backgroundColor: '', paddingBottom: '2px' }}>

                    <div className='modal-sub-container' style={{ position: 'relative', border: '1px solid gainsboro', backgroundColor: 'white' }}>


                        <div style={{margin:"2px auto", maxWidth:"700px", paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "1.5rem", fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600 }}>

                            <div style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", borderRadius: "0.125rem", fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: 600, textAlign: "center", color: "#ffffff", textTransform: "uppercase", backgroundColor: "#4F46E5", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", '@media (min-width: 1536px)': {} }}>
                                {props?.heading}
                            </div>

                            <div className="response_header">

                                <div style={{ padding: "1.5rem" }}>
                                    <img src={check} alt=""  style={{ width: "10rem", filter: 'hue-rotate(47deg)' }} />
                                </div>

                                <div style={{ padding: "0rem 1.5rem", paddingBottom: '0.5rem', fontWeight: 400, width: '100%' }}>
                                    <div style={{ fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: 600, color: "#10B981", "@media (min-width: 1536px)": {}, textAlign: 'center' }}>{props?.message}</div>
                                </div>

                            </div>

                            <div style={{ display: "flex", marginTop: "1.5rem", marginBottom: "1.5rem", justifyContent: "center", alignItems: "center" }}>
                                <button className="response_close_btn" onClick={() => closeAction()}>Close</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default ResponseScreen;