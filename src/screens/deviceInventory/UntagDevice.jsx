import React, { useEffect, useState } from "react";
import { deviceDetailLiveByID, getInfo, getOTP, getPermitHolder, searchEMEIDevice, validateOTP } from "../../apis/deviceInventory";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import './activateDevice.css'
import { InfoDataComponent } from "./components/infoDataComponent";
import { ActivationComponent } from "./components/activationComponent";
import { LoadingWidget } from "../../components/loading";


export const UntagDevice = () => {
  
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [IMEI, setIMEI] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showIMEIFeild, setShowIMEIFeild] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoData, setInfoData] = useState([]);

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    
    if (location.state) {
      setId(location.state.id);
      setShowIMEIFeild(false);      
      setIMEI(location.state.imeiNo);
      handleSearch(location.state.imeiNo)
    } else {
      setData(null);
      setShowIMEIFeild(true);
      setId(null);
      setIMEI(null);
    }
  }, [location.state]);


  

  const handleSearch = async (imeisearchdata) => {
    try {
      const result = await searchEMEIDevice(imeisearchdata);
      
      if (result.status && result?.result?.length === 0) {
        setData(null);
        setErrorMessage("Data not found for the provided IMEI.");
        
      } else if (result.status && result?.result?.length > 0) {
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


  const getDeviceInfo = async () => {
    const result_vahan_esim = await getInfo(String(id), String(IMEI));
    if (result_vahan_esim.status == true) {
      setInfoData(result_vahan_esim.resultResp);
      setToggle(true)      
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result_vahan_esim?.message,
      });
      setToggle(false)
    }
  }

  return (
    <>
      {showIMEIFeild && <form className="activeDeviceContainer">
        <div  style={{ display:"flex",justifyContent:"left",alignItems:"center",gap:"30px",marginLeft:"15px"}}>
          <p style={{ textAlign: "center", fontSize: "16px", fontWeight: "500" }}>SEARCH DEVICE BY IMEI NUMBER</p>
          <div style={{display:"flex",alignItems:"center",gap:"15px"}}>
            : <input
              style={{ padding: "10px", borderRadius: "5px", outline: "none", border: "1px solid grey" }}
              type="text"
              placeholder="Search By IMEI..."
              value={searchValue}
              onChange={handleInputChange}
            />
            <button className="form-submit-btn-search" onClick={handleSubmit} >Get Data</button>
          </div>
        </div>
      </form>}
      {errorMessage && <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>}
      
      {data && !toggle && <InfoDataComponent data = {data} getInfo= {getDeviceInfo} setLoading={setLoading}/>}
      
      {loading ? <LoadingWidget/> : <>{toggle && infoData && <ActivationComponent infoData={infoData}/>}</>}

    </>
  );
};