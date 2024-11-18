/*
==================================================================
# Component: DodForm.jsx
# Status: Closed
# Description: Drivers on Duty Form
==================================================================
*/

import React, { useState } from 'react'
import './AccidentInfoForm.css'
import Swal from 'sweetalert2';
import { addDodInfo } from '../../apis/accidentApi';
import { LoadingWidget } from '../../components/loading';
import { useLocation } from "react-router-dom";

const DodForm = () => {
  const location = useLocation();
  console.log(location, "locationDoDForm")

  const [basicForm, setBasicForm] = useState([{
    vehicleNo: location?.state?.imeiNo,
    imeiNo: location?.state?.vehicleRegistrationNumber,
    origin: '',
    startTime: '',
    destination: '',
    endTime: '',
    driverName: '',
    driverLicenseNo: '',
    driverPhoneNo: '',
    driverAddress: '',
  }])

  const [loader, setLoader] = useState(false)

  const checkBasicFormError = () => {

    
    if (!basicForm?.origin) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter origin',
        text: ''
      })
      return true;
    }

    if (!basicForm?.startTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Planned Trip Start Time',
        text: ''
      })
      return true;
    }

    if (!basicForm?.destination) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter destination',
        text: ''
      })
      return true;
    }

    if (!basicForm?.endTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Planned Trip End Time',
        text: ''
      })
      return true;
    }

    if (!basicForm?.driverName) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Driver name',
        text: ''
      })
      return true;
    }

    if (!basicForm?.driverLicenseNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Driver License no.',
        text: ''
      })
      return true;
    }
    
    
    if (!basicForm?.driverPhoneNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Driver Phone no.',
        text: ''
      })
      return true;
    } 

    if (basicForm.driverPhoneNo && basicForm.driverPhoneNo?.length !== 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Check Driver Phone no.',
        text: ''
      })
      return true;
    }

    return false;

  }

  const handleBasicFormChange = (e) => {
    const { name, value } = e.target;
    setBasicForm(prev => ({ ...prev, [name]: value }));
  }

  const formSubmit = async (e) => {

    e.preventDefault()

    if (checkBasicFormError() === true) {
      return;
    }

    let body = {
      "vehicleNumber": basicForm?.vehicleNo,
      "imei": basicForm?.imeiNo,
      "origin": basicForm?.origin,
      "tripStart": basicForm?.startTime,
      "destination": basicForm?.destination,
      "tripClosed": basicForm?.endTime,
      "driverName": basicForm?.driverName,
      "driverLicence": basicForm?.driverLicenseNo,
      "driverPhone": basicForm?.driverPhoneNo,
      "driverAddress": basicForm?.driverAddress,
      "status": 0
    }

    setLoader(true)

    let response = await addDodInfo(body)

    if (response?.status == true) {
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully',
        text: "Drivers on Duty Form"
      })

      setBasicForm(null)

    }

    setLoader(false)

  }

  return (
    <div style={{maxWidth:"750px", backgroundColor:"white", margin:"2px auto"}}>

      {loader && <LoadingWidget />}

      <h1 className="form_heading" style={{ position: 'relative' }}>
        Drivers on Duty Form
      </h1>

      <form className='fr_form' onChange={(e) => handleBasicFormChange(e)}>

        {/* Basic */}
        <section>

          <div className="form_wrap">
            <label htmlFor="">Vehicle No.</label>
            {/* <input type="text" name="vehicleNo" id="" value={basicForm?.vehicleNo} /> */}
            <p>{location?.state?.vehicleRegistrationNumber}</p>
          </div>

          <div className="form_wrap">
            <label htmlFor="">IMEI No.</label>
            <p>{location?.state?.imeiNo}</p>
          </div>

        </section>

        
        <section>

          <h3 className="form_sub_heading">Trip Info</h3>

          <div className="form_wrap">
            <label htmlFor="">Origin</label>
            <input type="text" name="origin" value={basicForm?.origin} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Planned Trip Start Time</label>
            <input type="datetime-local" name="startTime" value={basicForm?.startTime} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Destination</label>
            <input type="text" name="destination" value={basicForm?.destination} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Planned Trip End Time</label>
            <input type="datetime-local" name="endTime" value={basicForm?.endTime} id="" />
          </div>

        </section>

        {/* Sos Image */}
        <section>

          <h3 className="form_sub_heading">Details of Driver</h3>

          <div className="form_wrap">
            <label htmlFor="">Driver Name</label>
            <input type="text" name="driverName" value={basicForm?.driverName} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Driver License No.</label>
            <input type="text" name="driverLicenseNo" value={basicForm?.driverLicenseNo} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Driver Phone No.</label>
            <input type="number" name="driverPhoneNo" value={basicForm?.driverPhoneNo} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Driver Address</label>
            <input type="text" name="driverAddress" value={basicForm?.driverAddress} id="" />
          </div>
        
        </section>

        <button type='submit' onClick={(e) => formSubmit(e)} className='button_style' style={{ padding: '5px', fontSize: '14px', fontWeight: '600', color: 'white', backgroundColor: '#0b530b', borderRadius: '3px', marginTop: '10px' }}>Submit</button>

      </form>

      <div style={{ height: '5vh' }}></div>

    </div>
  )
}

export default DodForm