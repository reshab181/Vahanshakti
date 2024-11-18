import React, { useEffect, useState } from "react";
import {getInfo, removeDevice, searchEMEIDevice} from "../../apis/deviceInventory";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import './activateDevice.css'
import { InfoDataComponent } from "./components/infoDataComponent";
import { ActivationComponent } from "./components/activationComponent";
import { LoadingWidget } from "../../components/loading";


export const VLTDDeactivation = () => {
 
  const [id, setId] = useState(null);
  const [IMEI, setIMEI] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showIMEIFeild, setShowIMEIFeild] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showIMEIPage, setShowIMEIPage] = useState(false);
  

  const handleSearch = async (imeisearchdata) => {
    try {
      const result = await searchEMEIDevice(imeisearchdata);
      
      if (result.status && result?.result?.length === 0) {
        setData(null);
        setErrorMessage("Data not found for the provided IMEI.");
        
      } else if (result.status && result?.result?.length > 0) {
        console.log(result.result[0], "result.result[0]")
        setData(result.result[0]);
        setId(result.result[0].id);
        setIMEI(result.result[0].imeiNo);
        
        setErrorMessage("");
        setShowIMEIFeild(false)
      } else {
        setData(null);
        setErrorMessage("Error occurred ");
      }
    } catch (error) {
      console.error("Error searching device:", error);
      setErrorMessage("Error occurred while searching for the device.");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setErrorMessage('')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

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
  
  const deactivateDevice = async () => {
    console.log(data["id"], data["imeiNo"], "deviceData")
    const result = await removeDevice(String(data["id"]), String(data["imeiNo"]))

    if (result.status == true) {
      Swal.fire({
        icon: 'success',
        title: '',
        text: `Device deactivated successfully`
      })
      setShowIMEIPage(true)
      setShowIMEIFeild(true)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result?.message,
      });
    console.log(data, "deactivateDevice")
  }}
  
  return (
    <>
      {showIMEIFeild && <form className="activeDeviceContainer">
        <div  style={{ display:"flex",justifyContent:"left",alignItems:"center",gap:"30px",marginLeft:"15px"}}>
          <p style={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}>SEARCH DEVICE BY IMEI NUMBER FOR DEACTIVATION</p>
          <div style={{display:"flex",alignItems:"center",gap:"15px"}}>
            : <input
              style={{ padding: "10px", borderRadius: "5px", outline: "none", border: "1px solid grey" }}
              type="text"
              placeholder="Search IMEI for Deactivation"
              value={searchValue}
              onChange={handleInputChange}
            />
            <button className="form-submit-btn-search" onClick={handleSubmit} >Get Device Data</button>
          </div>
        </div>
      </form>}
      {errorMessage && <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>}
      {!showIMEIPage && <>{data ? <div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", backgroundColor:"white", padding:"10px", margin:"10px"}} >
            {contentView("Registration Number", data.vehicleRegistrationNumber)}
            {contentView("Device SerialNo", data.deviceSerialNo)}
            {contentView("Engine Number", data.engineNumber)}
            {contentView("Chassis No", data.chassisNo)}
            {contentView("ICCID Number", data.iccidNumber)}
            {contentView("IMEI No", data.imeiNo)}
            {contentView("ESIM Provider", data.esimProvider)}
            {contentView("Vehicle Class", data.vehicleClass)}
            {contentView("VLTD Model", data.vltdModelCode)}
        </div>
        <div style={{textAlign:"center"}}>
          <button onClick={deactivateDevice} className="form_button button_reset" style={{margin:"10px"}}>
            Deactivate
          </button>
        </div>

      </div> : null}</>}
  

    </>
  );

}