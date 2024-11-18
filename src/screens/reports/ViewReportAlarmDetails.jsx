import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MAPLayout from "../../components/map";
import ListTable from "../../components/Common/Listtable/ListTable";
import { getAlarmDetailsByIntouchID } from "../../apis/dashboard";
import { searchEMEIDevice } from "../../apis/deviceInventory";

const ViewReportAlarmDetails = () => {
    const location = useLocation();
    const params = useParams();
    const data = location.state || null
    const entityId = params.ID || null;
    const [intouchData , setIntouchData]  = useState([])
    const [coordinates, setCoordinates] = useState([])
    const [deviceData, setDeviceData] = useState(null)
    const [htmlData, setHtmlData] = useState('')

    
    const fetchAlarmDetailsData = async () => {
      const result = await getAlarmDetailsByIntouchID(entityId)
      let details = result?.data[0]
      setIntouchData(result.data)
      setHtmlData(`<div style='background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 10px; max-width: 500px; margin: 0;'><h2 style='border-bottom: 1px solid gainsboro; padding-bottom: 5px;'>Vehicle Details</h2><div style='margin: 0px 0;'><p><strong>Registration Number:</strong> ${details?.registrationNumber}</p><p><strong>Charging:</strong> ${details?.cancharging_Status == 0 ? 'No' : 'Yes'}</p><p><strong>Battery:</strong> ${details?.vehicleBattery}%</p><p><strong>Ignition On:</strong> ${details?.veh_ignition_on == 0 ? 'No' : 'Yes'}</p><p><strong>Address:</strong> ${details?.address}</p></div></div>`);
      const coordinatesData = result.data.map(item => ({
          latitude: item.latitude,
          longitude: item.longitude
        }));
        setCoordinates(coordinatesData);
  }


  const fetchDeviceDetails = async () => {
    const result = await searchEMEIDevice(data?.imeiNo)
    if(result?.status){
      setDeviceData(result?.result[0])
    }
  }

  useEffect(() => {
    if(data && entityId){
      fetchDeviceDetails()
      fetchAlarmDetailsData()
    }
    
  }, [data, entityId]);


    const contentView = (name = '', value = '', type = '') => {
        return (
        <>
            <div className={`table-card-cell ${type === 'full' && ' full_width'}`}>
            <span className="table-card-key sub-heading">{name} </span>
            <div className="table-card-value text">{value || "N/A"}</div>
            </div>
        </>
        )
    }

    const column = [
        {
        Header: 'Entity Name',
        accessor: "entityName",
        width: '15%',
        Cell: ({cell}) => (cell?.row?.original?.entityName || 'N/A')
      },
      {
        Header: "Event Id",
        accessor: 'eventId',
       
        Cell: ({cell}) => (cell?.row?.original?.eventId || 'N/A')
      },
      {
        Header: "Latitude",
        accessor: 'latitude',
        width: '15%',
        Cell: ({cell}) => (cell?.row?.original?.latitude || 'N/A')
      },
      {
        Header: "Longitude",
        accessor: 'longitude',
        // width: '15%',
        Cell: ({cell}) => (cell?.row?.original?.longitude || 'N/A')
      },
      {
        Header: "Time Stamp",
        accessor: 'timestamp',
        // width: '15%',
        Cell: ({cell}) => (cell?.row?.original?.timestamp || 'N/A')
      },
      {
        Header: "Time Stamp Str",
        accessor: 'timestampStr',
        width: '15%',
        Cell: ({cell}) => (cell?.row?.original?.timestampStr || 'N/A')
      },
      {
        Header: "Type",
        accessor: 'type',
        Cell: ({cell}) => (cell?.row?.original?.type || 'N/A')
      },
      {
        Header: "Description",
        accessor: 'description',
        Cell: ({cell}) => (cell?.row?.original?.description || 'N/A')
      },
      {
        Header: "Alarm ConfigID",
        accessor: 'alarmConfigId',
        Cell: ({cell}) => (cell?.row?.original?.alarmConfigId || 'N/A')
      },
      {
        Header: "Address",
        accessor: 'address',
        width:"20%",
        Cell: ({cell}) => (cell?.row?.original?.address || 'N/A')
      }
  
      ]

  console.log(deviceData, "deviceData")    

  return (
    <>
    <div className="id_container">
        <div className="id_top_container">
            {data && deviceData && <div className="id_top_content_containers">
                {contentView("VRN", deviceData?.vehicleRegistrationNumber)}
                {contentView("IMEI Number", deviceData?.imeiNo)}
                {contentView("ESIM Provider",deviceData?.esimProvider)}
                {contentView("RTO",deviceData?.rtoCode)}
                {contentView("ESIM ICCID", deviceData?.iccidNumber)}
                {contentView("ESIM Validity", deviceData?.iccidValidUpto)}
                {contentView("Device Model",deviceData?.vltdModelCode)}
                {contentView("Chassis Number", deviceData?.chassisNo)}
                {contentView("Device Serial No",deviceData?.deviceSerialNo)}
                {contentView("Owner Name",deviceData?.ownerName)}
                {contentView("Owner Phone",deviceData?.ownerPhoneNumber)}
                {contentView("vehicle Class",deviceData?.vehicleClass)}
                {contentView("Device Model",deviceData?.vltdModelCode)}                
                
            </div>}
            
            {/* Top Right Part */}
            <div className="id_map_container">
                {
                // <div style={{ width: "100%" }}>
                (coordinates?.length > 0 ? <>
                    <MAPLayout data={coordinates}  heights={"90vh"}/>
                    </> : <>
                    <MAPLayout heights={"90vh"}/>
                </>)
                // </div>
                }
            </div>

        </div>

        {/* Bottom Part */}
        <div className="id_bottom_container">
            {intouchData && <ListTable dataList={intouchData}  columns={column} />}
        </div>
    </div>
    </>
  )
}

export default ViewReportAlarmDetails