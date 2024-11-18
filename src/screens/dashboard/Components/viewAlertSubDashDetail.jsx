import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MAPLayout from "../../../components/map";
import { getAlarmDetailsByIntouchID } from "../../../apis/dashboard";
import ListTable from "../../../components/Common/Listtable/ListTable";
import { searchEMEIDevice } from "../../../apis/deviceInventory";
import { alarmsMap } from "../../../constants/alarmMap";
import BackButton from '../../../components/Common/BackButton';
import { useTranslation } from "react-i18next";

const ViewAlertSubDashDetail = () => {
    const location = useLocation();
    const params = useParams();
    const {t}=useTranslation();

    const [data, setData] = useState([]);
    const [intouchData , setIntouchData]  = useState([])
    const [coordinates, setCoordinates] = useState([])
    const [htmlData, setHtmlData] = useState('')

    useEffect(() => {
    
      const entityId = params?.ID;
      const imei = location?.state?.imei
      
      const fetchAlarmDetailsData = async() => {
          const deviceData = await searchEMEIDevice(imei)
          console.log(deviceData?.result[0], "searchEMEIDevice")
          setData(deviceData?.status && deviceData?.result[0])
          
          
          const result = await getAlarmDetailsByIntouchID(entityId)
          console.log(result, "getAlarmDetailsByIntouchID")
          // const alarmsData = result.data.map(item=>{
          //   const alarmDescription = alarmsMap.filter(alarmMapItem=>alarmMapItem["id"]===item["type"] && alarmMapItem["key"]===item["data"])
          //   return alarmDescription.length > 0 ? {...item, "description":alarmDescription[0]["uiLabel"]} : {...item, "description":item["description"]}
          // })

          const sortedData = result.data.sort((a,b)=>b?.timestamp-a?.timestamp)
          setIntouchData(sortedData)
          
          console.log(result.data, "setIntouchData")
          //setHtmlData(`<div style='background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 10px; max-width: 500px; margin: 0;'><h2 style='border-bottom: 1px solid gainsboro; padding-bottom: 5px;'>Vehicle Details</h2><div style='margin: 0px 0;'><p><strong>Registration Number:</strong> ${details?.registrationNumber}</p><p><strong>Charging:</strong> ${details?.cancharging_Status == 0 ? 'No' : 'Yes'}</p><p><strong>Battery:</strong> ${details?.vehicleBattery}%</p><p><strong>Ignition On:</strong> ${details?.veh_ignition_on == 0 ? 'No' : 'Yes'}</p><p><strong>Address:</strong> ${details?.address}</p></div></div>`);
          const coordinatesData = result.data.map(item => ({
              latitude: item.latitude,
              longitude: item.longitude
            }));
            console.log(coordinatesData);
            setCoordinates(coordinatesData);
    }

    fetchAlarmDetailsData()
    
  }, [location, params]);


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

    const column = [
      {
        Header: t("deviceList.TimeStamp"),
        accessor: 'timestampStr',
        width:"15%",
        Cell: ({cell}) => (cell?.row?.original?.timestampStr || 'N/A')
      },
      {
        Header: t("deviceList.AlertTypeText"),
        accessor: 'description',
        width:"15%",
        Cell: ({cell}) => (cell?.row?.original?.description || 'N/A')
      },
      {
        Header: t("deviceList.LatitudeText"),
        accessor: 'latitude',
        width:"10%",
        Cell: ({cell}) => (cell?.row?.original?.latitude || 'N/A')
      },
      {
        Header: t("deviceList.LongitudeText"),
        accessor: 'longitude',
        width:"10%",
        Cell: ({cell}) => (cell?.row?.original?.longitude || 'N/A')
      },
      {
        Header: t("deviceList.LastLocationText"),
        accessor: 'address',
        Cell: ({cell}) => (cell?.row?.original?.address || 'N/A')
      }
      ]

  return (
    <>
    <nav className="sub-nav">
            <BackButton/>
          </nav>
    <div className="id_container">
        <div className="id_top_container">
            {data && <div className="id_top_content_containers">
                {contentView(t("deviceList.VehicleRegistrationNumberText"), data.vehicleRegistrationNumber)}
                {contentView(t("deviceList.RtoText"), data.rto)}
                {contentView(t("deviceList.OwnerNameText"), data.ownerName)}
                {contentView(t("deviceList.OwnerPhoneNumberText"), data.ownerPhoneNumber)}
                {contentView(t("deviceList.OwnerAddresText"), data.ownerAddress, 'full')}
                {contentView(t("deviceList.ImeiNoText"), data.imeiNo)}
                {contentView(t("deviceList.VltdModelCodeText"), data.vltdModelCode)}                
                {contentView(t("deviceList.EsimProviderText"), data.esimProvider)}
                {contentView(t("deviceList.IccidNumberText"), data.iccidNumber)}
                {contentView(t("deviceList.ValidUptoText"), data.iccidValidUpto, 'full')}
                {contentView(t("deviceList.VehicleCategoryText"), data.vehicleClass)}
            </div>}
            
            
            <div className="id_map_container">
                {
                (coordinates?.length > 0 ? <>
                    <MAPLayout data={coordinates}  heights={"60vh"}/>
                    </> : <>
                    <MAPLayout heights={"60vh"}/>
                </>)
                }
            </div>

        </div>
        {/* 
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
          <div className="id_bottom_container">
              {intouchData && <ListTable dataList={intouchData}  columns={column} />}
          </div>
          <div style={{backgroundColor:"white"}}>
                <p>Hello World</p>
          </div>
          
        </div> */}
        <div className="id_bottom_container">
              {intouchData && <ListTable dataList={intouchData}  columns={column} heading={"Alerts Report for IMEI: "+location?.state?.imei} />}
          </div>
    </div>
    </>
  )
}

export default ViewAlertSubDashDetail
