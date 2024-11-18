import React, { useState, useEffect } from 'react'
import './OtaCommandScreen.css'
import { convertEpochToDateAndTime } from '../../components/Common/PowerUpFunctions'
import ListTable from '../../components/Common/Listtable/ListTable'
import { BaseURL } from '../../constants/baseURL'


const HealthPacketDetails = (props) => {

    const [fetchedRawPacket, setFetchedRawPacket] = useState(null)

    console.log(fetchedRawPacket, "fetchedHealthRawPacket")

    useEffect(()=>{
        const getRawPacketData = async (time) => {

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
    
            const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${props?.inventory?.imeiNo}&startTime=${epochTimeInSeconds-60*60*24}&endTime=${epochTimeInSeconds}&type=2`, requestOptions)
            const response_parsed = await response.json()
            console.log(response_parsed, "healthPacketsData")
            if(response_parsed?.data?.length > 0){
                const response_sorted = response_parsed["data"].sort((a,b)=>b.timestamp-a.timestamp)
                const final_response = response_sorted.map(item=>{
                    const dataPacket = item?.raw?.split(",");
                    console.log(dataPacket, "dataPacket")
                    console.log(dataPacket, "dataPacket")
                    return {
                        "timeStamp": convertEpochToDateAndTime(item?.timestamp),
                        "batteryPercentage": dataPacket[4],
                        "batteryThreshold": dataPacket[5],
                        "memoryPercentage": dataPacket[6],
                        "pingFrequencyOn": dataPacket[7],
                        "pingFrequencyOff": dataPacket[8],
                        "digitalIO": dataPacket[9],
                        "analogIO": dataPacket[10],
                    }
                })
                setFetchedRawPacket(final_response)
            }
        }
    
        getRawPacketData()
    },[props])

    let infoList = [
        { name: "Device Serial No", key: "deviceSerialNo", },
        { name: "Manufacturer Name", key: "mnfName", },
        { name: "Distributor Name", key: "distName", },
        { name: "IMEI No", key: "imeiNo", },
        { name: "ICCID Number", key: "iccidNumber" },
        { name: "VLTD Model Code", key: "vltdModelCode", },
    ]

    const column = [
        {
        Header: 'Time Stamp',
        accessor: "timeStamp",
        width: '15%',
        Cell: ({ cell }) => (cell?.row?.original?.timeStamp || 'N/A')
      },
      {
        Header: "Battery Percentage",
        accessor: 'batteryPercentage',
        Cell: ({cell}) => (cell?.row?.original?.batteryPercentage || 'N/A')
      },
      {
        Header: "Battery Threshold",
        accessor: 'batteryThreshold',
        Cell: ({cell}) => (cell?.row?.original?.batteryThreshold || 'N/A')
      },
      {
        Header: "Memory Percentage",
        accessor: 'memoryPercentage',
        Cell: ({cell}) => (cell?.row?.original?.memoryPercentage || 'N/A')
      },
      
      {
        Header: "Ping Frequency IgnitionON",
        accessor: 'pingFrequencyOn',
        Cell: ({cell}) => (cell?.row?.original?.pingFrequencyOn || 'N/A')
      },
      {
        Header: "Ping Frequency IgnitionOFF",
        accessor: 'pingFrequencyOff',
        Cell: ({cell}) => (cell?.row?.original?.pingFrequencyOff || 'N/A')
      },
      {
        Header: "Digital I/O",
        accessor: 'digitalIO',
        Cell: ({cell}) => (cell?.row?.original?.digitalIO || 'N/A')
      },
      {
        Header: "Analog I/O",
        accessor: 'analogIO',
        Cell: ({cell}) => (cell?.row?.original?.analogIO || 'N/A')
      },
  
      ]

    return (
        <>

            <main className='ota_main_container'>
                <button onClick={() => props?.setHealthPacketView(false)} style={{ position: 'absolute', left: '5px', top: '5px', color: 'rgba(0,0,0,0.8)', outline: 'none', border: '1px solid gainsboro', padding: '4px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Back To List</button>
                <section className='ota_section'>
                    <header>Health Packet Details</header>
                    <section className="ota_info_section">
                        {
                            infoList?.map((elem, index) =>
                                <>
                                    <div className="ota_info_wrapper">
                                        <span className="ota_name">{elem?.name}</span>
                                        <span className="ota_value">{props?.inventory[elem?.key]}</span>
                                    </div>
                                </>)
                        }
                    </section>
                    <div>
                        {fetchedRawPacket && fetchedRawPacket?.length>0 && <ListTable dataList={fetchedRawPacket} columns={column}/>}
                    </div>
        
                </section>                                
            </main>
        </>
    )

}

export default HealthPacketDetails