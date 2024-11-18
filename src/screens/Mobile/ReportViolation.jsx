import React, { useState } from 'react'
import './AccidentInfoForm.css'
import Swal from 'sweetalert2';
import { LoadingWidget } from '../../components/loading';
import { postPermitViolation } from '../../apis/logsApi';

const ReportViolation = () => {
  
  const [basicForm, setBasicForm] = useState([{
    name: '',
    phoneNo: '',
    vehicleNo: '',
    violationDate: '',
    violationType: '',
    
  }])

  const [loader, setLoader] = useState(false)

  const checkBasicFormError = () => {

    if (!basicForm?.name) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter name',
        text: ''
      })
      return true;
    }

    if (!basicForm?.phoneNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Phone Number',
        text: ''
      })
      return true;
    }

    if (!basicForm?.vehicleNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Vehicle Number',
        text: ''
      })
      return true;
    }

    if (!basicForm?.violationDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Planned Trip End Time',
        text: ''
      })
      return true;
    }

    if (!basicForm?.violationType) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Violation Type',
        text: ''
      })
      return true;
    }
  }

  const handleBasicFormChange = (e) => {
    const { name, value } = e.target;
    setBasicForm(prev => ({ ...prev, [name]: value }));
  }

  const formSubmit = async (e) => {
    console.log(basicForm, "violationReporting")
    e.preventDefault()

    if (checkBasicFormError() === true) {
      return;
    }

    let body = {
      "name": basicForm?.name,
      "phoneNo": basicForm?.phoneNo,
      "vehicleNo": basicForm?.vehicleNo,
      "violationDate": basicForm?.violationDate,
      "violationType": basicForm?.violationType,
      "statePermit": basicForm?.violationType === "statePermit" ? "Permit Violation" : " ",
      "workingHour": basicForm?.violationType === "workingHour"? "Working Hour Violation" : " ",
      "status": 1,
    }
    
    setLoader(true)
    
    let response = await postPermitViolation(body)
    console.log(response, body, "postPermitViolation")
    if (response?.status == true) {
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully',
        text: "Permit Violation"
      })
      setBasicForm(null)
    }
    setLoader(false)
  }

  return (
    <div style={{maxWidth:"750px", backgroundColor:"white", margin:"2px auto"}}>

      {loader && <LoadingWidget />}

      <h1 className="form_heading" style={{ position: 'relative' }}>
        Report Violations
      </h1>

      <form className='fr_form' onChange={(e) => handleBasicFormChange(e)}>

        
        <section>
          <div className="form_wrap">
            <label htmlFor="">Citizen Name</label>
            <input type="text" name="name" value={basicForm?.name} id="" />
          </div>

          
          <div className="form_wrap">
            <label htmlFor="">Citizen Phone</label>
            <input type="text" name="phoneNo" value={basicForm?.phoneNo} id="" />
          </div>


          <div className="form_wrap">
            <label htmlFor="">Permit Violating Vehicle number</label>
            <input type="text" name="vehicleNo" value={basicForm?.vehicleNo} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Violation Date Time</label>
            <input type="datetime-local" name="violationDate" value={basicForm?.violationDate} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Violation Type</label>
            {/* <input type="datetime-local" name="endTime" value={basicForm?.violationDate} id="" /> */}
            <select name="violationType" value={basicForm?.violationType}>
                <option value="">Select</option>
                <option value="statePermit">Permit violations</option>
                <option value="workingHour">Working out of permitted hours</option>
            </select>
          </div>

        </section>

        <button type='submit' onClick={(e) => formSubmit(e)} className='button_style' style={{ padding: '5px', fontSize: '14px', fontWeight: '600', color: 'white', backgroundColor: '#0b530b', borderRadius: '3px', marginTop: '10px' }}>Submit</button>

      </form>

      <div style={{ height: '5vh' }}></div>

    </div>
  )
}

export default ReportViolation