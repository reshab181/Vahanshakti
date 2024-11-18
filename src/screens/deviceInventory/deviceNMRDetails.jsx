import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MAPLayout from "../../components/map";
import { deviceDetailLiveByID } from "../../apis/deviceInventory";
import './style.css'
import MAPLayoutTrails from "../../components/mapWithTrail";
import { useTranslation } from "react-i18next";
import { BaseURL } from "../../constants/baseURL";


export const DeviceNMRDetails = () => {

  const location = useLocation();
  const {t}=useTranslation();
  const [data, setData] = useState([]);
  const [intuchEntityId, setIntuchEntityId] = useState("");
  const [liveData, setLiveData] = useState([]);
  const [coordinates, setCoordinates] = useState([])
  const [htmlData, setHtmlData] = useState('')


  const sampleNMR = {
    "146_391":[28.551406860352, 77.268905639648],
    "146_8572":[28.551922, 77.271137],
    "146_31236":[28.554001, 77.2686],
    "146_6031":[28.550034, 77.266617],
    "146_6032":[28.550033569336, 77.268905639648],
}
  
  useEffect(() => {
    
    setData(location.state);
    setIntuchEntityId(location.state.intuchEntityId);
    
  }, [location]);

  const getRawPacketData = async () => {

    let dateTime = new Date();
    let epochTime = dateTime.getTime();
    let epochTimeInSeconds = Math.floor(epochTime/1000)
    

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${data?.imeiNo}&startTime=${epochTimeInSeconds-60*60}&endTime=${epochTimeInSeconds}`, requestOptions)
    const response_parsed = await response.json()
    
    if(response_parsed?.data?.length > 0){
        const response_sorted = response_parsed["data"].sort((a,b)=>b.timestamp-a.timestamp)

        const final_response = response_sorted?.map(item=>{
            return {
                rawPacket: item?.raw 
            }
        })
        
        const lastPacket = final_response[0]?.rawPacket?.split(",")
        
        console.log(lastPacket, sampleNMR[`${lastPacket[31]}_${lastPacket[32]}`],`${lastPacket[31]}_${lastPacket[32]}`, "NMRDetailsPassed")
        const coordinatesData = [{latitude:sampleNMR[`${lastPacket[31]}_${lastPacket[32]}`][0], longitude:sampleNMR[`${lastPacket[31]}_${lastPacket[32]}`][1]}, {latitude:sampleNMR[`${lastPacket[34]}_${lastPacket[35]}`][0], longitude:sampleNMR[`${lastPacket[34]}_${lastPacket[35]}`][1]}, {latitude:sampleNMR[`${lastPacket[37]}_${lastPacket[38]}`][0], longitude:sampleNMR[`${lastPacket[37]}_${lastPacket[38]}`][1]}, {latitude:sampleNMR[`${lastPacket[40]}_${lastPacket[41]}`][0], longitude:sampleNMR[`${lastPacket[40]}_${lastPacket[41]}`][1]}, {latitude:sampleNMR[`${lastPacket[43]}_${lastPacket[44]}`][0], longitude:sampleNMR[`${lastPacket[43]}_${lastPacket[44]}`][1]}]
        console.log(coordinatesData, "NMRDetailsPassed")
        setCoordinates(coordinatesData)
    }
}



  useEffect(() => {
    
    const interval = setInterval(() => {
      if (intuchEntityId) {
        getRawPacketData();
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
console.log('live Data: ', liveData)
  return (
    <>

      {/* Main Container */}
      <div className="id_container">

        <div className="id_top_container">

          
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
              (coordinates?.length > 0 ? <>
                <MAPLayout data={coordinates} htmlData={htmlData} heights={"90vh"}/>
                </> : <>
                <MAPLayout heights={"90vh"}/>
              </>)
            }
          </div>

        </div>


      </div>
    </>
  );
};
