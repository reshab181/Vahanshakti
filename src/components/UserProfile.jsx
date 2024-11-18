import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
// import './notification.css'
import '../components/HOC/notification.css'

const UserProfile = (props) => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        let datas = sessionStorage.getItem("loginResp")
        const parsedData = JSON.parse(datas);
        setData(parsedData);
    },[])

    const contentView = (name = '', value = '', type = '') => {
        return (
        <>
            <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
            <span className="table-card-key sub-heading">{name} </span>
            <div className="table-card-value text">{value || "N/A"}</div>
            </div>
        </>
        )
    }
  return (
    <>
    <div className="not_container">
        <div className="not_af_container">
            <div className="not_af_header">
                <span className="" style={{ fontSize: '16px' }}>User Profile</span>
                <span className='cross_button' onClick={() => props.close()}><RxCross2 size={20} /></span>
            </div>
        </div>
        {/* <div> */}
        {data && <div className="id_top_content_contain"  style={{backgroundColor:"white",padding:"10px"}}>
                {contentView("User ID", data.userid)}
                {contentView("Full Name", data.fullname)}
                {contentView("Designation", data.designation)}
                {contentView("User Name", data.userName)}
                {contentView("Email ID", data.emailId)}
                {contentView("Contact No", data.contactNo)}
                {contentView("User Type", data.userType)}
                {contentView("Entity ID", data.entityId)}
                {contentView("Parent ID", data.parentId)}
            </div>}
        {/* </div> */}
    </div>
    </>
  )
}

export default UserProfile