import  { useState } from 'react';
import { FiEdit, FiCheckCircle, FiEye } from 'react-icons/fi';
import { RotatingLines } from 'react-loader-spinner';
import { getDocumentFullUrl } from '../apis/manufacture';
import { MdOutlineCancel } from "react-icons/md";

export const FileUploadUI = ({ name = "", onUpload = null, onFileEdit = null, initialFile = null, disabled = false, layout="rows"}) => {
  
  const userType = sessionStorage.getItem("userType")

  const uploadedFile = initialFile
  
  const [fileLoader, setFileLoader] = useState(false);
  const [editModeOn, setEditModeOn] = useState(false)

  const handleEditClick = async (e) => {
    const file = e.target.files[0]
    await onFileEdit(file,name)
  };

  const handleViewClick = async () => {
    const imageUrl = await getDocumentFullUrl(uploadedFile); 
    window.open(imageUrl, '_blank');
  };

  const handleUploadFile = async (e) => {
    setFileLoader(true)
    const file = e.target.files[0]
    const fileUploadResponse = await onUpload(file,name)
    
    setFileLoader(false)
  }

  return (
    
      <div>      
      {initialFile && !editModeOn ? 
          <div style={{display:"flex", justifyContent:"end"}}>
            <p><b>Available</b></p>
            <span title="View" style={{ paddingLeft: '8px', cursor: 'pointer' }}>
              <FiCheckCircle size={30} color='green'/>
            </span>
            <span onClick={handleViewClick} title="View" style={{ paddingLeft: '8px', cursor: 'pointer' }}>
              <FiEye size={30} color = 'blue'/>
            </span>
            {userType === "MNF" ? <span onClick={()=>setEditModeOn(true)} title="Edit" style={{ paddingLeft: '8px', cursor: 'pointer' }}>
              <FiEdit size={30} color='orange' />
            </span> : null}
            
          </div> : <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {userType === "MNF" ? <input
          required
          className="form-inputs"
          name={name}
          type="file"
          onChange={editModeOn ? handleEditClick : handleUploadFile}
          disabled={disabled}
        />: <div style={{width:"100%"}}><p style={{color:"red", textAlign:"right"}}><b>No File Uploaded</b></p></div>}
        {editModeOn ? <MdOutlineCancel onClick={()=>setEditModeOn(false)} size={30} color = 'red'/> : null}
        <span className="upload_status">
          {fileLoader  ? 
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
           : null}
        </span>
      </div>
        }
    </div>
  );
};
