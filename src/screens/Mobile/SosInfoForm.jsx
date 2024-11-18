import React, { useEffect, useRef, useState } from 'react'
import './AccidentInfoForm.css'
import { RxCross2 } from 'react-icons/rx'
import { useLocation } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { addSosInfo, uploadDoc } from '../../apis/accidentApi';
import { ProgressBar } from 'react-loader-spinner';
import { LoadingWidget } from '../../components/loading';
import BackButton from '../../components/Common/BackButton'

const SosInfoForm = (props) => {
  const location = useLocation();
  console.log(location.state, "SosInfoForm")
  const [basicForm, setBasicForm] = useState([{
    sosTime: '',
    vehicleNo: '',
    ownerName: '',
    ownerPhone: '',
  }])

  const [sosPersonDetails, setSosPersonDetails] = useState({
    name: '',
    gender: '',
    mobileNo: ''
  })

  const [sosImageList, setSosImageList] = useState([])
  const [tempSosImage, setTempSosImage] = useState({
    image: '',
    docName: '',
    context: ''
  })

  const [remarks, setRemarks] = useState('')

  const [imageLoader, setImageLoader] = useState(false)

  // const [imageData, setImageData] = useState(null);
  // const [capImage, setCapImage] = useState(false)

  const [loader, setLoader] = useState(false)

  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  // const dialogRef = useRef(null)

  // const openDialog = () => {
  //   dialogRef.current.showModal()
  //   setImageData(null)
  //   startCamera()
  // }

  // const closeDialog = () => {
  //   dialogRef.current.close()
  //   stopCamera()
  // }

  const stampToDateTime = (alertTimeStamp) => {
    console.log(alertTimeStamp, "alertTimeStamp123")
    const parts = alertTimeStamp.split(', ');
    const [month,day,year] = parts[0].split('/');
    const timeParts = parts[1].split(' ');
    const [hours, minutes, seconds] = timeParts[0].split(':');
    
    const formattedDate = timeParts[1] === "AM" ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hours}:${minutes}:${seconds}.000Z` : `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${parseInt(hours)+12}:${minutes}:${seconds}.000Z`;
    return formattedDate;
    
  }

  const feedFormData = () => {
    setBasicForm({
      sosDateTime: stampToDateTime(location.state?.alertTimeStamp,),
      sosTime: location.state?.alertTimeStamp,
      vehicleNo: location.state?.vrn,
      ownerName: location.state?.ownerName,
      ownerPhoneNo: location.state?.ownerPhoneNumber
    })
  }



  // const startCamera = async () => {

  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then((stream) => {
  //       videoRef.current.srcObject = stream;
  //       setCapImage(true)
  //       videoRef.current.onloadedmetadata = () => {
  //         canvasRef.current.width = videoRef.current.videoWidth;
  //         canvasRef.current.height = videoRef.current.videoHeight;
  //       };
  //     })
  //     .catch((error) => {
  //       if (error.name === 'NotAllowedError') {
  //         alert('Permission to access camera was not granted');
  //       } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
  //         alert('No camera found');
  //       } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
  //         alert('Could not start camera');
  //       } else {
  //         alert('Error accessing camera');
  //       }
  //       console.log("Error accessing camera:", error);
  //     });
  // };

  // const stopCamera = async () => {

  //   let data = await navigator.mediaDevices;

  //   navigator.mediaDevices
  //     .getUserMedia({ video: false, audio: false })
  //     .then((stream) => {
  //       stream.active = false;
  //       videoRef.current.srcObject = null
  //     })

  //   setCapImage(false)

  //   const stream = videoRef.current.srcObject;

  //   if (stream) {
  //     const tracks = stream.getTracks();

  //     tracks.forEach(track => track.stop());
  //     videoRef.current.srcObject = null;
  //   }
  // };

  // const captureImage = () => {
  //   stopCamera()
  //   const context = canvasRef.current.getContext("2d");
  //   context.drawImage(videoRef.current, 0, 0);
  //   const data = canvasRef.current.toDataURL("image/jpg");
  //   setImageData(data);
  // };

  // const saveImage = () => {
  //   const link = document.createElement("a");
  //   settempSosImage(prev => ({ ...prev, image: dataURLtoFile(imageData, tempSosImage?.context) }));
  //   closeDialog()
  // };

  // function dataURLtoFile(dataurl, filename) {
  //   const arr = dataurl.split(",");
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  // }

  useEffect(() => {
    feedFormData()
  }, [])

  const handleSosPersonChange = (e) => {
    const { name, value } = e.target;
    setSosPersonDetails(prev => ({ ...prev, [name]: value }));
  }

  const checkSosPersonError = () => {

    if (!sosPersonDetails.name) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter SOS Pressing Person name',
        text: ''
      })
      return true;
    }

    if (!sosPersonDetails.gender) {
      Swal.fire({
        icon: 'warning',
        title: 'Select SOS Pressing Person gender',
        text: ''
      })
      return true;
    }

    if (!sosPersonDetails.mobileNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter SOS Pressing Person mobile no.',
        text: ''
      })
      return true;
    }

    if (sosPersonDetails.mobileNo && sosPersonDetails.mobileNo?.length !== 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Check mobile no.',
        text: ''
      })
      return true;
    }

    return false;

  }

  const sosImageChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files.length > 0) {
      const file = files[0];
      if (file instanceof File) {
        setTempSosImage(prev => ({ ...prev, image: file }));
      } else {
        console.error('Invalid file type', file);
      }
      e.target.value = null;
    }
    if (name === 'context') {
      setTempSosImage(prev => ({ ...prev, context: value }));
    }
  }

  const checkSosImageError = () => {

    if (!tempSosImage.context) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter image name or context.',
        text: ''
      })
      return true;
    }

    if (!tempSosImage.image) {
      Swal.fire({
        icon: 'warning',
        title: 'Select or capture image',
        text: ''
      })
      return true;
    }

    if (sosImageList?.length !== 0) {
      let name = sosImageList.some(item => item.context === tempSosImage.context)

      if (name === true) {
        Swal.fire({
          icon: 'warning',
          title: 'Image already exist.',
          text: ''
        })
        return true;
      }

      return false;

    }

    return false;

  }

  const actionSosImage = async (actionType, key = '') => {

    switch (actionType) {
      case 'add': {
        if (checkSosImageError() === false) {

          setImageLoader(true)

          let getDocName = await uploadDoc(tempSosImage.image)

          setImageLoader(false)

          setSosImageList(prev => [...prev, {
            image: tempSosImage.image,
            docName: getDocName?.filename,
            context: tempSosImage.context,
          }])

          setTempSosImage({
            context: '',
            docName: '',
            image: ''
          })

        }
      } break;

      case 'edit': {
        let data = sosImageList.filter(item => item?.context === key)[0]
        setTempSosImage(data)
      } break;

      case 'delete': {
        let data = sosImageList.filter(item => item?.context !== key)
        setSosImageList(data)
      } break;

    }

  }

  const checkBasicFormError = () => {

    // if (Array.isArray(sosImageList) && sosImageList?.length === 0) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: "No any image proof found.",
    //     text: ''
    //   })
    //   return true;
    // }

    if (!basicForm?.sosTime) {
      Swal.fire({
        icon: 'warning',
        title: 'SOS date time not found.',
        text: 'Please try again later.'
      })
      return true;
    }

    if (!basicForm?.vehicleNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Vehicle no. not found',
        text: 'Please try again later.'
      })
      return true;
    }

    if (!basicForm?.ownerName) {
      Swal.fire({
        icon: 'warning',
        title: 'Owner name not found.',
        text: 'Please try again later.'
      })
      return true;
    }

    if (!basicForm?.ownerPhoneNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Owner Phone no. not found.',
        text: 'Please try again later.'
      })
      return true;
    }

    return false;

  }

  const formSubmit = async (e) => {

    e.preventDefault()

    if (checkBasicFormError() === true) {
      return;
    }

    // if (checkSosPersonError() === true) {
    //   return;
    // }
    console.log(basicForm?.sosDateTime, "sosDateTime")
    let body = {
      "sosDate": basicForm?.sosDateTime,
      "vehicleNo": basicForm?.vehicleNo,
      "ownerDet": basicForm?.ownerName,
      "ownerPhone": basicForm?.ownerPhoneNo,
      "personName": sosPersonDetails?.name,
      "gender": sosPersonDetails?.gender,
      "mobileNo": sosPersonDetails?.mobileNo,
      "imgInfo": sosImageList?.map((elem) => {
        return {
          "doctype": elem?.context,
          "docName": elem?.docName
        }
      }),
      "remarks": remarks,
      "alertId": location?.state?.intuchEntityId.toString() + "_" + location?.state?.alertEpochTime.toString() 
    }


    setLoader(true)

    let response = await addSosInfo(body)

    if (response?.status == true) {
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully',
        text: "Sos Info Form"
      })
      setLoader(false)
      setBasicForm(null)
      setSosPersonDetails(null)
      setRemarks('')
      setSosImageList([])
      setTempSosImage(null)

      props?.back()

    }
  }

  return (
    <div style={{maxWidth:"750px", backgroundColor:"white", margin:"2px auto", padding:"5px"}}>

      {loader && <LoadingWidget />}

      <h1 className="form_heading" style={{ position: 'relative' }}>
        {!loader && <div style={{ position: 'absolute', left: '2px', fontWeight: 600 }} onClick={() => window.history.back()}>&larr;</div>}
        SOS Info Form
      </h1>


        {/* Basic */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5px"}}>

          <div style={{width:"100%", padding:"5px"}}>
            <p>Time of SOS</p>
            <input style={{width:"80%"}} type="text" disabled name="sosTime" value={basicForm?.sosTime} id="" />
          </div>

          <div style={{width:"100%", padding:"5px"}}>
            <p>Vehicle No.</p>
            <input style={{width:"80%"}} type="text" disabled name="" id="" value={basicForm?.vehicleNo} />
          </div>

          <div style={{width:"100%", padding:"5px"}}>
            <p>Owner Name</p>
            <input style={{width:"80%"}} type="text" disabled name="" id="" value={basicForm?.ownerName} />
          </div>

          <div style={{width:"100%", padding:"5px"}}>
            <p>Owner Phone No.</p>
            <input style={{width:"80%"}} type="text" disabled name="address" value={basicForm?.ownerPhoneNo} id="" />
          </div>

        </div>

        {/* SOS Person Details */}
        

          <h4>SOS Pressing Person Details</h4>
          <div  style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"5px"}}>
          <div style={{width:"100%", padding:"5px"}}>
            <p htmlFor="">Name</p>
            <input  style={{width:"80%"}} type="text" name="name" value={sosPersonDetails?.name} onChange={(e) => handleSosPersonChange(e)} id="" />
          </div>

          <div style={{width:"100%", padding:"5px"}}>
            <p htmlFor="">Gender</p>
            <select  style={{width:"80%"}} name="gender" value={sosPersonDetails?.gender} onChange={(e) => handleSosPersonChange(e)} id="">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{width:"100%", padding:"5px"}}>
            <p htmlFor="">Mobile No.</p>
            <input  style={{width:"80%"}} type="number" name="mobileNo" value={sosPersonDetails?.mobileNo} onChange={(e) => handleSosPersonChange(e)} id="" />
          </div>

        </div>

        {/* Sos Image */}
        

          <h4>Upload Images</h4>
          <div>
          {
            sosImageList?.map((elem, index) =>
              <div key={index} className="details_card">

                <div className="action_buttons">
                  <FaDeleteLeft onClick={() => actionSosImage('delete', elem?.context)} color='#e00000' size={17} style={{ cursor: 'pointer' }} />
                </div>

                <div className="image_card">
                  <span className="image">
                    <img style={{ height: '20vh', width: '100%', objectFit: 'contain' }} src={URL.createObjectURL(elem?.image)} alt="" srcSet="" />
                  </span>
                  <div style={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', marginTop: '5px', padding: '3px 0px' }} className='image_name'>{elem?.context}</div>
                </div>

              </div>
            )}
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
          <div className="form_wrap">
            <p htmlFor="">Image Context</p>
            <input style={{width:"90%"}} disabled={imageLoader} type="text" name="context" value={tempSosImage?.context} onChange={(e) => sosImageChange(e)} id="" placeholder='Enter image context first to capture or select image' />
            
          </div>

          <div className="form_wrap" style={{ position: 'relative' }}>

            {
              imageLoader ?
                <div style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 1, top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(3px)' }}>
                  <ProgressBar
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
                :
                <>
                  <p htmlFor="">Capture or Select Image</p>
                  {tempSosImage?.image && <p>Image to be save:
                    <img style={{ height: '20vh', width: '100%', objectFit: 'contain' }} src={URL.createObjectURL(tempSosImage.image)} alt="" srcSet="" />
                  </p>}
                  <input type="file" disabled={!tempSosImage?.context} accept=".jpg,.jpeg,.png" name="image" onChange={(e) => sosImageChange(e)} id="" />
                </>
            }
          </div>
        </div>
        <input style={{marginTop:"5px"}} disabled={imageLoader} type='button' onClick={() => actionSosImage('add', '')} className='add_button' value={`Add ${sosImageList?.length == 0 ? '' : 'Another '}Image`} />
        
        
          <div className="form_wrap" style={{margin: '10px 0px'}}>
            <p htmlFor=""><b>Remarks</b></p>
            <input style={{width:"90%"}} type="text" name="remarks" value={remarks} onChange={(e) => setRemarks(e.target?.value)} id="" />
          </div>

          <button type='submit' onClick={(e) => formSubmit(e)} className='button_style' style={{ padding: '5px', fontSize: '14px', fontWeight: '600', color: 'white', backgroundColor: 'blue', borderRadius: '3px', marginTop: '10px' }}>Submit</button>
        

      <div style={{ height: '5vh' }}></div>

      {/* <dialog ref={dialogRef} className=' animate__animated animate__zoomIn animate__faster'>

        <div className="dialog_container">

          <div className="cross_button" onClick={() => closeDialog()}><RxCross2 /></div>

          <div className='button_wrap'>
            <button onClick={startCamera} className="button_style" style={{ backgroundColor: 'rgba(38, 181, 16, 0.91)', color: 'white' }}>Start Camera</button>
            <button onClick={stopCamera} className="button_style" style={{ backgroundColor: 'rgba(138, 0, 0, 0.81)', color: 'white' }}>Stop Camera</button>
          </div>
          <div className='camera_image_container'>
            <div className='camera_container' style={{ height: capImage ? 'auto' : '0vh' }}>
              <video ref={videoRef} autoPlay className='video_container' style={{ border: capImage ? '1px solid gainsboro' : 'none', transform: 'scaleX(-1)', height: 'auto', width: '95%' }} />
              <canvas ref={canvasRef} style={{ display: "none" }} />
              {capImage && <div className=''>
                <button onClick={captureImage} style={{ backgroundColor: 'rgba(0, 0, 255, 0.71)', color: 'white' }} className="button_style">Capture</button>
              </div>}
            </div>
            {imageData && <>
              <div className='image_container'>
                <img src={imageData} alt="Captured Image" width={'95%'} style={{ border: '1px solid gainsboro' }} />
                <div className=''>
                  <button onClick={saveImage} style={{ backgroundColor: 'rgba(0, 0, 255, 0.71)', color: 'white' }} className="button_style">Save</button>
                </div>
              </div>
            </>}
          </div>
        </div>

      </dialog> */}

    </div>
  )
}

export default SosInfoForm