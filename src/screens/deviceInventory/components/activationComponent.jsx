import React, { useEffect, useState } from "react";
import { deviceDetailLiveByID, getOTP, getPermitHolder, validateOTP } from "../../../apis/deviceInventory";
import Swal from "sweetalert2";
import '../activateDevice.css'
import AddUserPermitHolder from "../../../components/AddUserPermitHolder";
import MAPLayout from "../../../components/map";
import { LoadingWidget } from "../../../components/loading";
import { useNavigate } from 'react-router';
import { startRawPacketCollection } from "../../../apis/devicetesting";


export const ActivationComponent = (props) => {
  const navigate = useNavigate()
  const id = props.infoData.id
  const IMEI = props.infoData.imeiNo  
  // const deviceType = props.infoData?.model
  
  console.log(props, "ActivationComponentProps")


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [showInput, setShowInput] = useState("0");
  const [showActiveDevice, setShowActiveDevice] = useState(false)
  const [showUserPermit, setShowUserPermit] = useState(false)
  const [mobile, setMobile] = useState("");
  const [otp, setOTP] = useState('');
  const [ownerAddress, setOwnerAddress] = useState("");
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [ownemail, setOwnemail] = useState("");
  const [rcRegisteredName, setrcRegisteredName] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [vhmodel, setVhmodel] = useState("");
  const [vhmake, setVhmake] = useState("");
  const [remarks, setRemarks] = useState("OK");
  const [otpRequestSent, setOTPRequestSent] = useState(false)

  const [coordinates, setCoordinates] = useState(null)
  const [htmlData, setHtmlData] = useState(null)


  useEffect(()=>{

  },[])

  const validateMobile = (value) => {
    return value.length === 10 && !isNaN(value);
  };
  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

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
            
        } 
        
      } catch (error) {
        console.error("Error fetching live data:", error.message);
      }

      setLoading(false)
    };

    if (props?.infoData &&  props?.infoData?.intuchEntityId) {
        console.log("Device Data Fetched")
        fetchData();
    }
  }, [props]);


  const startRawpacketCollection = async () => {
    try {
      const response = await startRawPacketCollection(IMEI);
      console.log(response, "rawPacketStartOnActivation")
    } catch (error) {
      console.error("Error Raw Packet Collection Start:", error.message);
    }

    setLoading(false)
  };

  useEffect(() => {
    
    if (props?.infoData &&  props?.infoData?.intuchEntityId) {
      startRawpacketCollection();
    }
  }, [props]);


  const handleCheckPermit = async(e) => {
    e.preventDefault()

    if (!validateMobile(mobile)) {
      setError("Please enter a valid 10 digit mobile number")
      return;
    }
    
    try{
      setLoading(true);
      const result = await getPermitHolder(String(mobile));
      if (result.message == "No records found") {
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "No Records Found! Please Make User for this Mobile",
        });
        setShowUserPermit(true)
      } else {
        console.log(result.result.contactNo,);
        setOwnerPhoneNumber(result.result.contactNo)
        setOwnerAddress(result.result.address)
        setOwnemail(result.result.emailId,result.result.address)
        setShowInput("1");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error in Network",
      });
      setLoading(false);
    }
    setLoading(false);
  }

  const handleGetOTP = async (e) => {
    e.preventDefault();
    setOTPRequestSent(true)
    // Validate all required fields before proceeding
    if (!validateEmail(ownemail)) {
      setError("Please enter a valid email address")
      return;
    }
    if (ownerPhoneNumber.trim() === "") {
      setError("Please enter owner phone number")
      return;
    }
    if (ownerAddress.trim() === "") {
      setError("Please enter owner address")
      return;
    }
    if (fuelType === "") {
      setError("Please select fuel type")
      return;
    }
    if (rcRegisteredName.trim() === "") {
      setError("Please enter RC registered name")
      return;
    }
    if (vhmake.trim() === "") {
      setError("Please enter vehicle make")
      return;
    }
    if (vhmodel.trim() === "") {
      setError("Please enter vehicle model")
      return;
    }
  
    try {
      
      const response = await getOTP(String(id), String(IMEI), String(ownemail), String(ownerPhoneNumber));
      if (response.status === true) {
        Swal.fire({
          icon: "success",
          title: "",
          text: response.message,
        });
        setShowInput("2");

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
        setOTPRequestSent(false)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error in Network",
      });
    }
    setLoading(false);
    setTimeout(function(){
      setOTPRequestSent(false)
    }, 90*1000)
  };
  
  const handleValidateOTP = async (e) => {

    e.preventDefault();

    const uploadData = {
      id:String(id),
      IMEI,
      otp,
      ownerAddress:ownerAddress,
      ownerPhoneNumber:ownerPhoneNumber,
      rc_registeredName:rcRegisteredName,
      vehicleCategory:props?.infoData?.vehicleClass,
      fuelType,
      ownemail:ownemail,
      vhmodel, 
      vhmake,
      remarks,
    }

    console.log(uploadData);
    try {
      const response = await validateOTP(uploadData);
      if (response.status === true) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.message
        });
        setShowActiveDevice(true)
        setShowInput("1");

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

  
  const selectFuelType = (label, star, options, setState) => {
    return (
      <div className="form-groups">
        <label className="form-labels">
          {label}
          <span className="vaglidation_mark" style={{color:"red"}}>{star}</span>
        </label>
        <select
          required
          className="form-inputs"
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
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

  const createInputField = (label, placeholder,star='', stateUpdater,ownerAddress, disabled=false) => (
    <div key={label} className="form-groups">
      <label htmlFor={label} className="form-labels">{label}<span className="vaglidation_mark" style={{color:"red"}}>{star}</span></label>
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
  

  console.log(showInput, showActiveDevice, loading, "showActiveDevice")
  
  return (
    <>
      {props.infoData && Object.keys(props.infoData).length > 0 && !loading && (
        <div style={{ marginBottom: "20px", marginTop: "20px" }}>
          <div style={{ width: "97%", border: '1px solid gainsboro', padding: '10px', backgroundColor: 'white', margin: "auto" }}>
            
            {showInput === "0" && !showActiveDevice  ?  
            <div>
            {!coordinates ? <p style={{color:"red"}}><b>Device Not Sending Data</b></p>:    
              !showUserPermit && <div className="form-tag">
                  <div className="form-rows">
                      
                  <div className="form-groups" style={{width:'90%'}}>
                      <label className="form-labels">Mobile :</label>
                      <input 
                        type="number" 
                        className="form-inputs" 
                        name='mobile' 
                        onChange={(e) => {
                          setMobile(e.target.value);
                          setError(''); 
                        }}
                        />
                        {error && <p style={{color:"red"}}>{error}</p>}
                  </div>
                  
                  </div>
                  <div className="check_permit_btn">
                    <button className="form_button button_submit" style={{marginTop: '10px'}} onClick={handleCheckPermit}>Check Permit Holder</button>
                  </div>
              </div>}
            </div> : null}

            {showUserPermit && <>
              <div>
                <AddUserPermitHolder entityId = {sessionStorage.getItem("entityId") } roles = {"permitHolder"} mobileNumber = {mobile} changeCreateUser = {setShowUserPermit} cancelComponent = {setShowUserPermit}/>
              </div>
              </>
            }
            {showInput === "1" && !showActiveDevice && 
            <div>
            
              <div className="form-tag">
              {error && <p style={{padding:"5px", backgroundColor:"red", color:"white", margin:"5px 0"}}><b>{error}</b></p>}
                <div className="form-rows">
                    {createInputField("Owner Email", "Enter ownemail",'*', setOwnemail,ownemail, true)}
                    {createInputField("Owner Phone Number", "Enter ownerPhoneNumber",'*', setOwnerPhoneNumber,ownerPhoneNumber, true)}
                    {createInputField("Owner Address", "Enter ownerAddress",'*', setOwnerAddress,ownerAddress, true)}
                </div>
                <div className="form-rows">
                  {selectFuelType("Fuel Type","*",["petrol", "diesel", "cng", "electric"],setFuelType)}
                  {createInputField("RC Registered Name", "Enter RC Holder",'*', setrcRegisteredName)}
                  {createInputField("Vehicle Make", "Enter Vehicle Make",'*', setVhmake)}
                  {createInputField("Vehicle Model", "Enter Vehicle Model",'*', setVhmodel)}
                  
                </div>
                
              </div>
              {otpRequestSent ? null : <button className="form_button button_submit" style={{marginTop: '15px'}} onClick={handleGetOTP}>Send OTP</button>}
            </div>}

            {showInput === "2" && (
              <div className="form-tag">
                <div style={{width:"20%"}}>
                {createInputField("OTP", "Enter OTP",'*', setOTP)}
                </div>
                <button className="form_button button_submit" style={{marginTop:"10px"}} onClick={handleValidateOTP}>Validate OTP</button>
              </div>
            )}
            {
              showActiveDevice && (<div>
                <p style={{ color: "green", fontSize: "15px" }}>OTP Verified Successfully and Device is Activated</p>
                <button className="form_button button_submit" style={{marginTop:"10px"}} onClick={() => navigate(`/deviceInventory/printVltdList/${IMEI}`)}>Print Certificate</button>
              </div>)
            }
          </div>
        </div>
      )}
      
      {loading ? (
        // <p style={{ textAlign: "center" }}>Loading...</p>
        <LoadingWidget/>
      ) :
        <>
          {/* {props.infoData && <div className="id_container" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5px", backgroundColor:"white"}}> */}
          {props.infoData && <div className="id_containr" style={{display:"flex",gap:"5px", backgroundColor:"white"}}>
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
