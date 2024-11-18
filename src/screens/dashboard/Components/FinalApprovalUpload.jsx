import React, { useState, useEffect, useRef } from "react";
import './Table.css'
import '../../manufacturers/components/UploadDetaisMNF.css'
import { MdOutlinePendingActions } from "react-icons/md";
import Swal from "sweetalert2";
import { updateStatus } from "../../../apis/dashboard";

export const FinalApprovalUpload = ({ manufacturerData, setStage }) => {

  const userType = sessionStorage.getItem("userType")
  console.log(manufacturerData);

  const handleStagesChanges = async(e) => {
    e.preventDefault()
    setStage(7)
    const response = await updateStatus(manufacturerData.id, "docstatus", 1);
    console.log(response, "updateStatus");
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: `Verified`,
    });
  }

  return (
    <>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>

        <div className="" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', border: '1px solid gainsboro', padding: '20px', backgroundColor: 'white' }}>
          <span style={{ color: 'green', margin: '5px 0px' }}><MdOutlinePendingActions size={70} /></span>
          {userType === "MNF" && <>
            <p style={{ fontWeight: '400', fontSize: '17px' }}>Your document is uploded </p>
            <p style={{ fontWeight: '600', fontSize: '20px' }}>Please Wait for Verification</p>
          </>}
          {(userType === "SBU" || userType === "SUA") && <>
            <p style={{ fontWeight: '600', fontSize: '20px' }}>Document is Uploded and Verified!</p>
            <p style={{ fontWeight: '400', fontSize: '16px' }}>Please Click button for Final Submit</p>
          </>}
        </div>

      {(userType === "SBU" || userType === "SUA") ?
        <div className="saveNextEmplamentButtonDevice">
          <button onClick={handleStagesChanges}>Final Submit</button>
        </div> : null}

      </div>

    </>
  )

};
