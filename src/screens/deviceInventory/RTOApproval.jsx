import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { deviceApprovalRTO, deviceDetailLiveByID } from "../../apis/deviceInventory";
import './style.css'
import MAPLayoutTrails from "../../components/mapWithTrail";
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';

export const DeviceRTOApproval = () => {

  const location = useLocation();
  const params = useParams();


  const navigate = useNavigate()
  const {t}=useTranslation();
  const [data, setData] = useState([]);
  const [intuchEntityId, setIntuchEntityId] = useState("");
  const [liveData, setLiveData] = useState([]);
  const [coordinates, setCoordinates] = useState([])
  const [htmlData, setHtmlData] = useState('')

  const [formData, setFormData] = useState({})  

  console.log(data, liveData, coordinates, "rtoApprovalDevice")

  useEffect(() => {
    console.log(location.state);

    if (location.state === null || location.state === undefined) {
      const entityId = params.ID;
      console.log(entityId);
    } else {
      setData(location.state);
      setIntuchEntityId(location.state.intuchEntityId);
    }
  }, [location, params]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await deviceDetailLiveByID(intuchEntityId);
        if( liveData.length === 0 || response?.data[0]["can_ts"] !== liveData[0]["can_ts"] ){
          setHtmlData(response.data);
          setLiveData(response.data);
          setCoordinates((prevCoordinates) => [...prevCoordinates, response?.data[0]]); 
        }
        
      } catch (error) {
        console.error("Error fetching live data:", error.message);
      }
    };
  
    const interval = setInterval(() => {
      if (intuchEntityId) {
        fetchData();
      }
    }, 10000); 
  
    // Cleanup interval on component unmount or when intuchEntityId changes
    return () => clearInterval(interval);
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

  const changeFormData = e => {
    setFormData(prev=>{
        return {...prev, [e.target.name]:[e.target.value]}
    })
  }

  const handleRTOApproval = async (e) => {
    e.preventDefault
    console.log(formData, "handleRTOApproval")
    if(Object.values(formData).includes("fail") || Object.keys(formData).length < 5){
        return null
    }
    
    const dataBuilt = [
                        {
                          "id": data?.id.toString(),
                          "imeiNo": data?.imeiNo,
                          "status":1,
                          "remarks":JSON.stringify(formData)
                        }
                      ]

    const response_parsed = await deviceApprovalRTO(dataBuilt)

    if(response_parsed.status){
      Swal.fire({
        icon: 'success',
        title: 'Device Approved Successfully',
        text: ""
      })

      navigate('/deviceInventory/deviceInventoryList')
    }
  }


  return (
    <>

      {/* Main Container */}
      <div className="id_container">

        <div style={{backgroundColor:"white", margin:"5px", padding:"10px"}}>
          <div style={{display:"grid", gridTemplateColumns:"3fr 1fr", margin:"5px"}}>
              <p>VLTD Mounted</p>
              <select name="vltd_mounted" onChange={(e)=>changeFormData(e)}>
                  <option value="fail">Select</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
              </select>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"3fr 1fr", margin:"5px"}}>
              <p>SOS Button Working</p>
              <select name="sos_button" onChange={(e)=>changeFormData(e)}>
                  <option value="fail">Select</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
              </select>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"3fr 1fr", margin:"5px"}}>
              <p>Wiring and Connections</p>
              <select name="wiring_connections" onChange={(e)=>changeFormData(e)}>
                  <option value="fail">Select</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
              </select>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"3fr 1fr", margin:"5px"}}>
              <p>Location Verificaton</p>
              <select name="location_verification" onChange={(e)=>changeFormData(e)}>
                  <option value="fail">Select</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
              </select>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"3fr 1fr", margin:"5px"}}>
              <p>SOS Button Stickers and Marking</p>
              <select name="stickers_markings" onChange={(e)=>changeFormData(e)}>
                  <option value="fail">Select</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
              </select>
          </div>
          <button style={{backgroundColor:"blue", padding:"5px 15px", color:"white"}} onClick={(e)=>handleRTOApproval(e)}>Submit</button>
        </div>
        {/* Top Part */}
        <div className="id_top_container">

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
            {contentView(t("deviceList.VehicleCategoryText"), data.vehicleCategory)}
            {contentView(t("deviceList.VehicleRegistrationDateText"), data.vehicleRegistrationDate)}
            {contentView("Chassis No.", data.chassisNo)}
            {contentView("Fuel Type", data.fuelType)}
            {contentView("ICCID Valid Upto", data.iccidValidUpto)}
            {contentView("RTO", data.rto)}
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

        </div>

        
      </div>
    </>
  );
};
