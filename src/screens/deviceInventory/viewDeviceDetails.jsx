import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MAPLayout from "../../components/map";
import { deviceDetailLiveByID, searchEMEIDevice, updatePermitHolder } from "../../apis/deviceInventory";
import './style.css'
import MAPLayoutTrails from "../../components/mapWithTrail";
import { useTranslation } from "react-i18next";


export const DeviceDetails = () => {

  const params = useParams();
  const navigate = useNavigate()
  const {t}=useTranslation();
  const [data, setData] = useState(null);
  const [intuchEntityId, setIntuchEntityId] = useState("");
  const [liveData, setLiveData] = useState([]);
  const [coordinates, setCoordinates] = useState([])
  const [htmlData, setHtmlData] = useState('')
  const [error, setError] = useState(null)
  const [changeData, setChangeData] = useState(false)
  const [permitHolderData, setPermitHolderData] = useState({})

  console.log(permitHolderData,data,"permitHolderData")

  const userType = sessionStorage.getItem("userType")

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
    if (data?.status === 1) {
      setPermitHolderData({name:data.ownerName, address:data.ownerAddress})
    }
  }, [data])


  useEffect(() => {

      const getDeviceData = async () => {
        const response = await searchEMEIDevice(params?.ID)
        console.log(response, "IMEI Number Passed");
        if(response?.status && response?.result?.length > 0){
          setData(response?.result[0])
          setIntuchEntityId(response?.result[0]?.intuchEntityId);
          
        }else{
          setError("No device / vehicle found for the IMEI")
        }
      }
      
      if(params?.ID){
        getDeviceData()
      } 
    
  }, [params]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await deviceDetailLiveByID(intuchEntityId);
        console.log("device_data_live", response?.data);
        console.log("data_live", liveData);
        console.log("coordinates", coordinates);
        if( liveData.length === 0 || response?.data[0]["can_ts"] !== liveData[0]["can_ts"] ){
          setLiveData(response.data);
          setCoordinates((prevCoordinates) => [...prevCoordinates, response?.data[0]]); 
        }
        
      } catch (error) {
        console.error("Error fetching live data:", error.message);
      }
    };
  
      if (intuchEntityId) {
        fetchData();
      }

    }, [intuchEntityId]);


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

  const updatePermitHolderData = async () => {
    const newdata = {
      id:data?.id.toString(),
      imeiNo: data?.imeiNo.toString(),
      vehicleRegistrationNumber:data?.vehicleRegistrationNumber,
      ownerName:permitHolderData?.name, 
      ownerAddress:permitHolderData?.address,
    }
    const response = await updatePermitHolder(newdata)
    if(response?.status===true){
      setChangeData(prev=>!prev)
      window.location.reload()
    }
    console.log(response, "updatePermitHolder")
  }


  console.log('live Data: ', liveData)
  return (
    <>

      {/* Main Container */}
      {error ? <div style={{margin:"20px", textAlign:"center", padding:"20px", backgroundColor:"white"}}>{error}</div> : <div className="id_container">

        {/* Top Part */}
        {data && data?.status === 1 && 
            <div style={{display:"flex", gap:"5px"}}>
            <button style={{ backgroundColor: 'rgba(0,100,0, 0.8)', outline: 'none', fontSize: '12px', color: 'white',  padding: '5px 7px', cursor: 'pointer' }}
                onClick={()=>navigate(`/deviceInventory/printVltdList/${data?.imeiNo}`)}>
                Print Certificate
            </button>
            {userType === "RFC" && <button style={{ backgroundColor: 'rgba(0,0,100, 0.8)', outline: 'none', fontSize: '12px', color: 'white',  padding: '5px 7px', cursor: 'pointer' }}
                onClick={()=>setChangeData(changeData=>!changeData)}>
                {changeData ? "Close Edit":"Edit Permit Holder"}
            </button>}
            {userType === "RTO" && data && <button style={{ backgroundColor: 'rgba(0,0,100, 0.8)', outline: 'none', fontSize: '12px', color: 'white',  padding: '5px 7px', cursor: 'pointer' }}
                onClick={()=>navigate(`/deviceInventory/rtoApproval/${params?.ID}`, { state: data })}>
                RTO Approval
            </button>}
            </div>}

        {
          changeData && (userType === "RFC") && <div style={{backgroundColor:"white", padding:"1rem", display:"grid",  gridTemplateColumns:"2fr 5fr 2fr"}}>
              <div style={{margin:"0.5rem"}}>
                  <p>Permit Holder Name</p>
                  <input style={{width:"90%"}} type="text" id = "name" name="name" value={permitHolderData?.name} 
                      onChange={(e)=>setPermitHolderData(prev=>{return {...prev, name:e.target.value}})}/>
              </div>
              <div style={{margin:"0.5rem"}}>
                  <p>Permit Holder Address</p>
                  <input style={{width:"90%"}} type="text" id = "address" name="address" value={permitHolderData?.address} 
                      onChange={(e)=>setPermitHolderData(prev=>{return {...prev, address:e.target.value}})}/>
              </div>
              <div  style={{margin:"0.5rem"}}>
                <p>Update</p>
                <button style={{ backgroundColor: 'rgba(0,0,100, 0.8)', outline: 'none', fontSize: '12px', color: 'white',  padding: '5px 7px', cursor: 'pointer' }}
                  onClick={()=>updatePermitHolderData()}>
                  Update Detail
                </button>
              </div>
          </div>
        } 
        
        {data && <div className="id_top_container">

          {/* Top Left Part */}
          <div className="id_top_content_containers">
            {contentView( t('deviceList.DeviceSerialNoText'), data.deviceSerialNo)}
            {contentView(t('deviceList.DeviceuploadedonText'), data.deviceuploadedon)}
            {contentView(t('deviceList.OwnerNameText'), data.ownerName, 'full')}
            {contentView(t('deviceList.OwnerAddresText'), data.ownerAddress, 'full')}
            {contentView(t('deviceList.OwnerPhoneNumberText'), data.ownerPhoneNumber)}            
            {contentView(t('deviceList.IccidNumberText'), data.iccidNumber)}
            {contentView(t('deviceList.VehicleRegistrationNumberText'), data.vehicleRegistrationNumber)}
            {contentView(t('deviceList.VltdModelCodeText'), data.vltdModelCode)}
            {contentView(t('deviceList.ImeiNoText'), data.imeiNo)}
            {contentView(t('deviceList.EngineNumberText'), data.engineNumber)}
            {contentView(t("deviceList.EsimProviderText"), data.esimProvider)}
            {contentView(t("deviceList.PrimaryMsisdnText"), data.primaryMsisdn)}
            {contentView(t("deviceList.VehicleCategoryText"), data.vehicleCategory)}
            {contentView(t("deviceList.VehicleRegistrationDateText"), data.vehicleRegistrationDate)}
          </div>

          
          <div className="id_map_container">
            {
              (liveData?.length > 0 ? <>
                <MAPLayoutTrails data={coordinates} htmlData={htmlData} heights={"90vh"}/>
                </> : <>
                <MAPLayoutTrails heights={"90vh"}/>
              </>)
            }
          </div>

        </div>}

        {/* Bottom Part */}
        {data && <div className="id_bottom_container">
          {contentView("Chassis No.", data.chassisNo)}
          {contentView("Fallback Misdn", data.fallbackMsisdn)}
          {contentView("Fuel Type", data.fuelType)}
          {contentView("ICCID Valid Upto", data.iccidValidUpto)}
          {contentView("RTO", data.rto)}
          
        </div>}
        <button style={{ backgroundColor: 'rgba(0,100,0, 0.8)', outline: 'none', fontSize: '12px', color: 'white', border: '1px solid rgba(0,122,0, 0.9)', padding: '3px 7px', cursor: 'pointer' }}
             onClick={()=>navigate(`/deviceInventory/nmrDetails`, { state: data })}>NMR Report
        </button>  
      </div>}
    </>
  );
};
