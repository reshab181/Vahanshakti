import React, { useEffect, useRef, useState } from 'react'
import './AccidentInfoForm.css'
import { RxCross2 } from 'react-icons/rx'
// import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { addAccidentInfo, uploadDoc } from '../../apis/accidentApi';
import { ProgressBar } from 'react-loader-spinner';
import { LoadingWidget } from '../../components/loading';

const AccidentInfoForm = () => {

  const [basicForm, setBasicForm] = useState([{
    accidentTime: '',
    latitude: ' ',
    longitude: ' ',
    address: '',
    accidentInfo: ''
  }])
  const [partyList, setPartyList] = useState([])
  const [tempParty, setTempParty] = useState({
    name: '',
    mobile: '',
    vehicle: ''
  })
  const [accidentImageList, setAccidentImageList] = useState([])
  const [tempAccidentImage, setTempAccidentImage] = useState({
    image: '',
    docName: '',
    context: ''
  })

  const [imageLoader, setImageLoader] = useState(false)
  const [repeat, setRepeat] = useState(0)

  const [imageData, setImageData] = useState(null);
  const [capImage, setCapImage] = useState(false)

  const [loader, setLoader] = useState(false)

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const dialogRef = useRef(null)

  const openDialog = () => {
    dialogRef.current.showModal()
    setImageData(null)
    startCamera()
  }

  const closeDialog = () => {
    dialogRef.current.close()
    stopCamera()
  }

  // const getLocationByLatLong = (latitude, longitude) => {
  //   if (latitude !== null && longitude !== null) {
  //     fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setBasicForm(prev => ({ ...prev, address: data?.display_name }))
  //       })
  //       .catch(error => {
  //         console.error('Error fetching location data:', error);
  //         Swal.fire({
  //           icon: 'warning',
  //           title: 'Unable to fetch location.',
  //           text: "Your location must be on."
  //         })
  //       });
  //   }
  // }

  // const enableLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setBasicForm(prev => ({ ...prev, latitude: position.coords.latitude, longitude: position.coords.longitude, }))
  //       getLocationByLatLong(position.coords.latitude, position.coords.longitude)
  //     },
  //     () => {
  //       alert("Please enable location first.");
  //       setRepeat(repeat + 1)
  //     }
  //   );
  // }

  const startCamera = async () => {

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setCapImage(true)
        videoRef.current.onloadedmetadata = () => {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
        };
      })
      .catch((error) => {
        if (error.name === 'NotAllowedError') {
          alert('Permission to access camera was not granted');
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          alert('No camera found');
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          alert('Could not start camera');
        } else {
          alert('Error accessing camera');
        }
        console.log("Error accessing camera:", error);
      });
  };

  const stopCamera = async () => {

    let data = await navigator.mediaDevices;

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: false })
      .then((stream) => {
        stream.active = false;
        videoRef.current.srcObject = null
      })

    setCapImage(false)

    const stream = videoRef.current.srcObject;

    if (stream) {
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

  };

  const captureImage = () => {
    stopCamera()
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0);
    const data = canvasRef.current.toDataURL("image/jpg");
    setImageData(data);
  };

  const saveImage = () => {
    const link = document.createElement("a");
    setTempAccidentImage(prev => ({ ...prev, image: dataURLtoFile(imageData, tempAccidentImage?.context) }));
    closeDialog()
  };

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // useEffect(() => {
  //   enableLocation()
  // }, [repeat])

  const basicFormChange = (e) => {
    const { name, value } = e.target;
    setBasicForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePartyChange = (e) => {
    const { name, value } = e.target;
    setTempParty(prev => ({ ...prev, [name]: value }));
  }

  const checkPartyFormError = () => {

    if (!tempParty.name) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter name',
        text: ''
      })
      return true;
    }

    if (!tempParty.vehicle) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter vehicle no.',
        text: ''
      })
      return true;
    }

    if (!tempParty.mobile) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter mobile no.',
        text: ''
      })
      return true;
    }

    if (tempParty.mobile && tempParty.mobile?.length !== 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Check mobile no.',
        text: ''
      })
      return true;
    }

    if (partyList?.length !== 0) {
      let name = partyList.some(item => item.name === tempParty.name)
      let mobile = partyList.some(item => item.mobile === tempParty.mobile)
      let vehicle = partyList.some(item => item.vehicle === tempParty.vehicle)

      if (name === true) {
        Swal.fire({
          icon: 'warning',
          title: 'Name already exist.',
          text: ''
        })
        return true;
      }

      if (mobile === true) {
        Swal.fire({
          icon: 'warning',
          title: 'mobile already exist.',
          text: ''
        })
        return true;
      }

      if (vehicle === true) {
        Swal.fire({
          icon: 'warning',
          title: 'vehicle already exist.',
          text: ''
        })
        return true;
      }

      return false;

    }

    return false;

  }

  const actionPartyForm = (actionType, key = '') => {

    switch (actionType) {
      case 'add': {
        if (checkPartyFormError() === false) {
          setPartyList(prev => [...prev, {
            name: tempParty.name,
            mobile: tempParty.mobile,
            vehicle: tempParty.vehicle
          }])
          setTempParty({
            name: '',
            mobile: '',
            vehicle: ''
          })
        }
      } break;

      case 'edit': {
        let data = partyList.filter(item => item?.vehicle === key)[0]
        setTempParty(data)
      } break;

      case 'delete': {
        let data = partyList.filter(item => item?.vehicle !== key)
        setPartyList(data)
      } break;

    }

  }

  const accidentImageChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files.length > 0) {
      const file = files[0];
      if (file instanceof File) {
        setTempAccidentImage(prev => ({ ...prev, image: file }));
      } else {
        console.error('Invalid file type', file);
      }
      e.target.value = null;
    }
    if (name === 'context') {
      setTempAccidentImage(prev => ({ ...prev, context: value }));
    }
  }

  const checkAccidentImageError = () => {

    if (!tempAccidentImage.context) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter image name or context.',
        text: ''
      })
      return true;
    }

    if (!tempAccidentImage.image) {
      Swal.fire({
        icon: 'warning',
        title: 'Select or capture image',
        text: ''
      })
      return true;
    }

    if (accidentImageList?.length !== 0) {
      let name = accidentImageList.some(item => item.context === tempAccidentImage.context)

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

  const actionAccidentImage = async (actionType, key = '') => {

    switch (actionType) {
      case 'add': {
        if (checkAccidentImageError() === false) {

          setImageLoader(true)

          let getDocName = await uploadDoc(tempAccidentImage.image)

          setImageLoader(false)

          setAccidentImageList(prev => [...prev, {
            image: tempAccidentImage.image,
            docName: getDocName?.filename,
            context: tempAccidentImage.context,
          }])

          setTempAccidentImage({
            context: '',
            docName: '',
            image: ''
          })

        }
      } break;

      case 'edit': {
        let data = accidentImageList.filter(item => item?.context === key)[0]
        setTempAccidentImage(data)
      } break;

      case 'delete': {
        let data = accidentImageList.filter(item => item?.context !== key)
        setAccidentImageList(data)
      } break;

    }

  }

  const checkBasicFormError = () => {

    if (Array.isArray(partyList) && partyList?.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: "No any involved party found.",
        text: ''
      })
      return true;
    }

    if (Array.isArray(accidentImageList) && accidentImageList?.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: "No any image proof found.",
        text: ''
      })
      return true;
    }

    if (!basicForm?.accidentTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter accident time',
        text: ''
      })
      return true;
    }

    // if (!basicForm?.latitude) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Latitude not found',
    //     text: 'Turn on your location'
    //   })
    //   return true;
    // }

    // if (!basicForm?.longitude) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Longitude not found',
    //     text: 'Turn on your location'
    //   })
    //   return true;
    // }

    if (!basicForm?.address) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter loaction address',
        text: ''
      })
      return true;
    }

    if (!basicForm?.accidentInfo) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter accident information',
        text: ''
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

    let body = {
      "accidentDt": basicForm?.accidentTime,
      "lat": "na",
      "lng": "na",
      "address": basicForm?.address,
      "accidentInfo": basicForm?.accidentInfo,
      "partiesDetails": partyList?.map((elem) => {
        return {
          "name": elem?.name,
          "phone": elem?.mobile,
          "vehNumber": elem?.vehicle
        }
      }),
      "imgInfo": accidentImageList?.map((elem) => {
        return {
          "doctype": elem?.context,
          "docName": elem?.docName
        }
      })
    }

    setLoader(true)

    let response = await addAccidentInfo(body)

    if (response?.status == true) {
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully',
        text: "Accident Info Form"
      })

      setBasicForm(null)
      setPartyList([])
      setTempParty(null)
      setAccidentImageList([])
      setTempAccidentImage(null)

    }

    setLoader(false)

  }

  return (
    <div style={{maxWidth:"750px", backgroundColor:"white", margin:"2px auto"}}>

      {loader && <LoadingWidget />}

      
      <h1 className="form_heading" style={{ position: 'relative' }}>
        {!loader && <div style={{ position: 'absolute', left: '2px', fontWeight: 600 }} onClick={() => window.history.back()}>&larr;</div>}
        Accident Info Form
      </h1>


      <form className='fr_form'>

        {/* Basic */}
        <section>

          <div className="form_wrap">
            <label htmlFor="">Time of Accident/Incident</label>
            <input type="datetime-local" name="accidentTime" value={basicForm?.accidentTime} onChange={(e) => basicFormChange(e)} id="" />
          </div>

          {/* <div className="form_wrap">
            <label htmlFor="">Latitude</label>
            <input type="text" name="" id="" value={basicForm?.latitude || ''} />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Longitude</label>
            <input type="text" name="" id="" value={basicForm?.longitude || ''} />
          </div> */}

          <div className="form_wrap">
            <label htmlFor="">Location / Address</label>
            <input type="text" name="address" value={basicForm?.address || ''} id="" onChange={(e) => basicFormChange(e)}/>
          </div>

          <div className="form_wrap">
            <label htmlFor="">Accident Information</label>
            <input type="text" name="accidentInfo" value={basicForm?.accidentInfo} onChange={(e) => basicFormChange(e)} id="" />
          </div>

        </section>

        {/* Involved Parties */}
        <section>

          <h3 className="form_sub_heading">Involved Parties Details</h3>

          {
            partyList?.map((elem, index) =>
              <div key={index} className="details_card">

                <div className="action_buttons">
                  {/* <FaEdit onClick={() => actionPartyForm('edit', elem?.vehicle)} color='#007000' size={17} style={{ cursor: 'pointer' }} /> */}
                  <FaDeleteLeft onClick={() => actionPartyForm('delete', elem?.vehicle)} color='#e00000' size={17} style={{ cursor: 'pointer' }} />
                </div>

                <div className="details">
                  <span className="key">Name:</span>
                  <span className='value'>{elem?.name}</span>
                </div>

                <div className="details">
                  <span className="key">Mobile:</span>
                  <span className='value'>{elem?.mobile}</span>
                </div>

                <div className="details">
                  <span className="key">Vehicle No.:</span>
                  <span className='value'>{elem?.vehicle}</span>
                </div>

              </div>
            )}

          <div className="form_wrap">
            <label htmlFor="">Name</label>
            <input type="text" name="name" value={tempParty?.name} onChange={(e) => handlePartyChange(e)} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Mobile No.</label>
            <input type="number" name="mobile" value={tempParty?.mobile} onChange={(e) => handlePartyChange(e)} id="" />
          </div>

          <div className="form_wrap">
            <label htmlFor="">Vehicle No.</label>
            <input type="text" name="vehicle" value={tempParty?.vehicle} onChange={(e) => handlePartyChange(e)} id="" />
          </div>

          <input type='button' onClick={() => actionPartyForm('add', '')} className='add_button' value={`Add ${partyList?.length == 0 ? '' : 'Another '}Party`} />

        </section>

        {/* Accident Image */}
        <section>

          <h3 className="form_sub_heading">Upload Images</h3>

          {
            accidentImageList?.map((elem, index) =>
              <div key={index} className="details_card">

                <div className="action_buttons">
                  <FaDeleteLeft onClick={() => actionAccidentImage('delete', elem?.context)} color='#e00000' size={17} style={{ cursor: 'pointer' }} />
                </div>

                <div className="image_card">
                  <span className="image">
                    <img style={{ height: '20vh', width: '100%', objectFit: 'contain' }} src={URL.createObjectURL(elem?.image)} alt="" srcSet="" />
                  </span>
                  <div style={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', marginTop: '5px', padding: '3px 0px' }} className='image_name'>{elem?.context}</div>
                </div>

              </div>
            )}

          <div className="form_wrap">
            <label htmlFor="">Image Context</label>
            <input disabled={imageLoader} type="text" name="context" value={tempAccidentImage?.context} onChange={(e) => accidentImageChange(e)} id="" />
            <i style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255, 0, 0, 0.8)' }}>Enter image context first to capture or select image.</i>
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
                  <label htmlFor="">Capture or Select Image</label>
                  {tempAccidentImage?.image && <p>Image to be save:
                    <img style={{ height: '20vh', width: '100%', objectFit: 'contain' }} src={URL.createObjectURL(tempAccidentImage.image)} alt="" srcSet="" />
                  </p>}
                  <input type="file" disabled={!tempAccidentImage?.context} accept=".jpg,.jpeg,.png" name="image" onChange={(e) => accidentImageChange(e)} id="" />
                  {/* <input type="button" disabled={!tempAccidentImage?.context} value="Open Camera" style={{ backgroundColor: '#c1c1c1' }} onClick={() => openDialog()} /> */}
                </>
            }
          </div>

          <input disabled={imageLoader} type='button' onClick={() => actionAccidentImage('add', '')} className='add_button' value={`Add ${accidentImageList?.length == 0 ? '' : 'Another '}Image`} />

        </section>

        <button type='submit' onClick={(e) => formSubmit(e)} className='button_style' style={{ padding: '5px', fontSize: '14px', fontWeight: '600', color: 'white', backgroundColor: '#0b530b', borderRadius: '3px', marginTop: '10px' }}>Submit</button>

      </form>

      <div style={{ height: '5vh' }}></div>

      <dialog ref={dialogRef} className=' animate__animated animate__zoomIn animate__faster'>

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

      </dialog>

    </div>
  )
}

export default AccidentInfoForm