import React, { useState, useEffect, useRef } from 'react';
import { GetTestingDeviceByid, uploadDocDeviceApproval, uploadDocTestingDeviceImage } from '../../../apis/masters';
import '../../manufacturers/components/UploadDetaisMNF.css'
import { FiCheckCircle } from "react-icons/fi";
import { GrCloudUpload } from "react-icons/gr";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { getDocumentFullUrl } from '../../../apis/manufacture';
import { FcDocument } from 'react-icons/fc';
import { getAddTestingBylist } from '../../../apis/deviceInventory';

const DeviceImagesUpload = (props) => {

  const dialogRef = useRef()
  const [uploadedFiles, setUploadedFiles] = useState(null)
  const [fileLoader, setFileLoader] = useState('')
  const [filename, setFilename] = useState('')
  const [currentImage, setCurrentImage] = useState('')
  const [testingDeviceList, setTestingDeviceList] = useState(null)
  
  const userType = sessionStorage.getItem("userType")
  
  const fetchDeviceTestingDevices = async () => {
    const updatedTopTableData = await getAddTestingBylist(props.uploadedDevice["modelCode"]);
    console.log(updatedTopTableData, "updatedTopTableData")
    setTestingDeviceList(updatedTopTableData);
    if (updatedTopTableData?.length > 0) {
      updatedTopTableData.forEach(elem => {
        console.log(elem);
        setUploadedFiles(prevState => ({ ...prevState, [elem.id]: { frontImage: true, frontImageDoc: '', backImage: true, backImageDoc: '' } }))
        getDocUploaded(elem?.id)
      });
    }
  }
  
  useEffect(() => {
    fetchDeviceTestingDevices()
  }, [])
  console.log("DeviceImagesData", testingDeviceList)

  const testingFileUploadChange = async (e, id) => {

    const docType = e.target.name;
    const file = e.target.files[0];

    const fileType = (e.target.files[0]?.type)?.split('/')[0]

    if (fileType != 'image') {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please upload an image file!',
      })
      return;
    }

    setFileLoader(id)
    setFilename(docType)

    const response = await uploadDocTestingDeviceImage(file, id, docType)

    if (response?.status) {
      setFileLoader(false)
      setFileLoader('')
      setFilename('')
    }
  }

  const getDocUploaded = async (id = '') => {

    const getDocResponse = await GetTestingDeviceByid(id)
    let data = JSON.parse(getDocResponse?.result?.deviceImg);
    
    let front = data?.filter(item => item?.doctype == 'frontImage')
    let back = data?.filter(item => item?.doctype == 'backImage')

    const updatedKey = String(getDocResponse?.result?.id);
    console.log(front, back, 'Testing Device Document Response: ')
    setUploadedFiles((prevFiles) => {
      return {
        ...prevFiles,
        [updatedKey]: {
          frontImage: !(Array.isArray(front) && front?.length == 1),
          frontImageDoc: front?.length == 1 && (front[0]?.docname || ''),
          backImage: !(Array.isArray(back) && back?.length == 1),
          backImageDoc: back?.length == 1 && (back[0]?.docname || '')
        },
      };
    });

  }

  console.log(uploadedFiles, "uploadedFiles")

  const checkError = (name, id) => {
    if (!id || !name || !uploadedFiles) {
      return true
    } else {
      let check = uploadedFiles[id][name];
      return check
    }
  }


  const getFileUrl = async (name, id) => {
    setCurrentImage('')
    if (!id || !name || !uploadedFiles) {
      return ''
    } else {
      let file = uploadedFiles[id][`${name}Doc`];
      let fileUrl = await getDocumentFullUrl(file)
      setCurrentImage(fileUrl)
      return fileUrl
    }
  }

  const openModal = (file) => {
    dialogRef.current.showModal()
  }

  const handleSubmit = () => {
    props.setStage(5);
    Swal.fire({
      icon: 'success',
      title: '',
      text: 'Approved!',
    })
  }
  const formFieldUI = (label, name, type, star = "",  id = '') => {

    return (<>
      {!checkError(name, id) ? <p style={{textAlign:"center"}}>Document Uploaded</p> : <div key={name} className="form-groups" style={{ position: 'relative' }}>

        <label className="form-labels" style={{ fontWeight: '600', fontSize: '12px' }}>
          {label}<sup>{star}</sup>
        </label>

        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input style={{ outline: 'none', border: '1px solid gainsboro' }} accept='.jpg, .jpeg, .png' type={type} name={name} onChange={(e) => testingFileUploadChange(e, id)} />
          <span className="upload_status">
            {(fileLoader == id && filename == name) ?
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
              :
              <>
                {
                  checkError(name, id) ? <span style={{ color: 'blue' }}><GrCloudUpload size={20} /></span> :
                    <span style={{ color: 'green' }}>
                      <FiCheckCircle size={20} />
                    </span>
                }
              </>
            }
          </span>
        </div>

      </div>}
      </>);
  };

  return (
  <>
  <p className="emplament-heading">Device Images</p>
  <div className={`table-container border_top`}>
  
  <table className="table table_main_container" style={{ overflowX: 'auto' }}>

    <thead className='table-header' style={{ width: '100%' }}>
      <tr style={{ width: '100%' }}>
        <th>#</th>
        <th>Model Code</th>
        <th>IMEI</th>
        <th>Preview</th>
        {userType === "MNF" && <th>Action</th>}
      </tr>
    </thead>

    <tbody className="table-body">
    {
      Array.isArray(testingDeviceList) && testingDeviceList?.length > 0 && <>
        {testingDeviceList?.map((row,index)=> <>
          <tr className="table-row">
            <td key={row?.id} className="table-cell" rowSpan={2}>{index + 1}</td>
            <td key={row?.id} className="table-cell" rowSpan={2}>{row?.modelCode}</td>
            <td key={row?.id} className="table-cell" rowSpan={2}>{row?.imei}</td>
            <td key={row?.id} className="table-cell">
              {!checkError('frontImage', row?.id) ? <FcDocument size={30} style={{ cursor: 'pointer' }} onClick={async () => openModal(await getFileUrl('frontImage', row?.id))} /> : <strong></strong>}
              <br /><span style={{ fontWeight: '600', fontSize: '12px' }}>Front Image</span>
            </td>
            {userType === "MNF" && <td key={row?.id} className="table-cell">
              {formFieldUI("Front Image", "frontImage", "file", "*", row?.id, 'testingDevice')}
            </td>}
          </tr>
          <tr className="table-row">
            <td key={index} className="table-cell">
              {!checkError('backImage', row?.id) ? <FcDocument size={30} style={{ cursor: 'pointer' }} onClick={async () => openModal(await getFileUrl('backImage', row?.id))} /> : <strong>N/A</strong>}
              <br /><span style={{ fontWeight: '600', fontSize: '12px' }}>Back Image</span>
            </td>
            {userType === "MNF" && <td key={index} className="table-cell">
              {formFieldUI("Back Image", "backImage", "file", "*",  row?.id, 'testingDevice')}
            </td>}
          </tr>
        </>
        )}
      </>
    }
    </tbody>

  </table>


  </div>
  <dialog ref={dialogRef} className="modal-container animate__animated animate__zoomIn animate__faster" style={{ position: 'relative' }}>
        <div className='modal-background  ' onClick={() => dialogRef.current.close()}></div>

        <div className="contain_modal">
          <div className='modal-sub-container  animate__animated animate__zoomIn animate__faster'>

            <img src={currentImage} style={{ width: '60vw' }} alt="" />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className='modal-confirm-button' onClick={() => dialogRef.current.close()}>Close</button>
            </div>
          </div>
        </div>

      </dialog>


      {userType === "SBU"  ? <div className='saveNextEmplamentButton'>
              <button  onClick={handleSubmit}>Approve for next stage</button>
          </div> : null}

          
  </>
  );
};

export default DeviceImagesUpload


