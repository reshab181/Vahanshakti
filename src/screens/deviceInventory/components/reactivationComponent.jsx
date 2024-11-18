import React, { useEffect, useState } from "react";
import { deviceDetailLiveByID, getOTP, revalidateOTP} from "../../../apis/deviceInventory";
import Swal from "sweetalert2";
import '../activateDevice.css'
import MAPLayout from "../../../components/map";
import { LoadingWidget } from "../../../components/loading";
import { useNavigate } from 'react-router';

export const ReActivationComponent = (props) => {
  const navigate = useNavigate()  
  console.log(props.infoData, "props.infoData")  
  const id = props.infoData.id
  const IMEI = props.infoData.imeiNo  
  
  const [loading, setLoading] = useState(true);
  const [otpSent, setOTPSent] = useState(false);
  const [otp, setOTP] = useState(null);
  const [otpValidated, setOTPValidated] = useState(false);
  const [coordinates, setCoordinates] = useState(null)
  const [htmlData, setHtmlData] = useState(null)
  const [showActivationMessage, setShowActivationMessage] = useState(false)


  const epochToDateTime = (stamp) => {
    let date = new Date(stamp * 1000);
    
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
  
    let dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    let dt = `${day}-${month}-${year}`

    return dt;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await deviceDetailLiveByID(props?.infoData?.intuchEntityId);
        let details = response?.data[0]
        console.log(details, "deviceDetails")  
        if(details?.latitude && details?.longitude){
          
          setHtmlData(`<div style='background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 10px; max-width: 500px; margin: 0;'><h2 style='border-bottom: 1px solid gainsboro; padding-bottom: 5px;'>Vehicle Details</h2><div style='margin: 0px 0;'><p><strong>Registration Number:</strong> ${details?.registrationNumber}</p><p><strong>Charging:</strong> ${details?.cancharging_Status == 0 ? 'No' : 'Yes'}</p><p><strong>Battery:</strong> ${details?.vehicleBattery}%</p><p><strong>Ignition On:</strong> ${details?.veh_ignition_on == 0 ? 'No' : 'Yes'}</p><p><strong>Address:</strong> ${details?.address}</p><p><strong>Time Stamp:</strong> ${epochToDateTime(details?.server_insert_ts)}</p></div></div>`);
          setCoordinates([[details?.latitude, details?.longitude]])
          setLoading(false)  
        } 
        
      } catch (error) {
        console.error("Error fetching live data:", error.message);
      }
    };

    if (props?.infoData &&  props?.infoData?.intuchEntityId) {
        console.log("Device Data Fetched")
        fetchData();
    }
  }, [props]);



  const handleGetOTP = async () => {
    
    try {
      const response = await getOTP(String(id), String(IMEI), String(props.infoData.ownemail), String(props.infoData.ownerPhoneNumber));
      if (response.status === true) {
        Swal.fire({
          icon: "success",
          title: "",
          text: response.message,
        });
        setOTPSent(true)        
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error in Network",
      });
    }
    setLoading(false)
  };

  const handleValidateOTP = async (e) => {

    e.preventDefault();

    const uploadData = {
      id:String(id),
      imeiNo: props?.infoData?.imeiNo,
      otp: otp,
      ownerAddress:props?.infoData?.ownerAddress,
      ownerPhoneNumber:props?.infoData?.ownerPhoneNumber,
      rc_registeredName:props?.infoData?.rc_registeredName,
      vehicleCategory:props?.infoData?.vehicleClass,
      fuelType: props?.infoData?.fuelType,
      ownemail:props?.infoData?.ownemail,
      vhmodel: props?.infoData?.vhmodel,
      vhmake: props?.infoData?.vhmake,
      remarks:"reactivated",
    }

    try {
      const response = await revalidateOTP(uploadData);
      if (response.status === true) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.message
        });
        setShowActivationMessage(true)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.message
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    }
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

const createInputField = (label, placeholder, stateUpdater,ownerAddress, disabled=false) => (
    <div key={label} className="form-groups">
      <label htmlFor={label} className="form-labels">{label}</label>
      <input
      className="form-inputs"
        type="text"
        id={label}
        name={ownerAddress}
        value={ownerAddress}
        placeholder={placeholder}
        onChange={(e) => stateUpdater(e.target.value)}
        disabled={disabled}
      />
    </div>
  );


  return (
    <>
      {props.infoData && Object.keys(props.infoData).length > 0 && !loading && (
        <div style={{ marginBottom: "20px", marginTop: "20px" }}>
          <div style={{ width: "97%", border: '1px solid gainsboro', padding: '10px', backgroundColor: 'white', margin: "auto" }}>
            
            
            {!coordinates ? <p style={{color:"red"}}><b>Device Not Sending Data</b></p>: null}

            {!otpSent && <div>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
                    {contentView("Permit Holder Email", props.infoData.ownemail)}
                    {contentView("Permit Holder Phone", props.infoData.ownerPhoneNumber)}
                    {contentView("Permit Holder Name", props.infoData.ownerName)}
                </div>
                <button className="form_button button_submit" onClick={handleGetOTP}>Send OTP</button>
            </div>}

            {!showActivationMessage ? <>{otpSent && !otpValidated &&<div className="form-tag">
                <div style={{width:"20%"}}>
                    {createInputField("OTP", "Enter OTP", setOTP)}
                </div>
                <button className="form_button button_submit" style={{marginTop:"10px"}} onClick={handleValidateOTP}>Validate OTP</button>
            </div>}</>: <div>
              <p style={{ color: "green", fontSize: "15px" }}>OTP Verified Successfully and Device is Reregistered</p>
              <button className="form_button button_submit" style={{marginTop:"10px"}} onClick={() => navigate(`/rfc/printVltdList/${IMEI}`)}>Print Certificate</button>
              </div>}
                        
          </div>
        </div>
      )}

      
      {loading ? (
        
        <LoadingWidget/>
      ) :
        <>
        
          {props.infoData && <div className="id_containr" style={{display:"flex",gap:"5px", backgroundColor:"white", margin:"5px"}}>
              <div style={{width:"50%",display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"5px"}}>
                {contentView("Device SerialNo", props.infoData.deviceSerialNo)}
                {contentView("IMEI No", props?.infoData?.imeiNo)}
                {contentView("ESIM Provider", props?.infoData?.esimProvider)}
                {contentView("ICCID Number", props?.infoData?.iccidNumber)}
                {contentView("Chassis No", props?.infoData?.chassisNo)}
                {contentView("Engine Number", props?.infoData?.engineNumber)}
                {contentView("Vehicle Class", props?.infoData?.vehicleClass)}
                {contentView("VLTD ModelCode", props?.infoData?.vltdModelCode)}
                {contentView("Owner Name", props?.infoData?.ownerName)}
                {contentView("Vehicle Registration Number", props?.infoData?.vehicleRegistrationNumber)}
                {contentView("Owner Phone Number", props?.infoData?.ownerPhoneNumber)}                
                {contentView("Vehicle Category", props?.infoData?.vehicleCategory)}
                {contentView("ICCID Valid Upto", props?.infoData?.iccidValidUpto)}                
                {contentView("Primary MSISDN", props?.infoData?.primaryMsisdn)}
                {contentView("Fallback MSISDN", props?.infoData?.fallbackMsisdn)}
                
              </div>
              <div style={{width:"50%"}}>
                <MAPLayout data={coordinates} htmlData={htmlData} /> 
              </div>
          </div>}
        </>
      }

    </>
  );
};
