import React, { useState, useEffect } from 'react'
import './OtaCommandScreen.css'
import { convertEpochToDateAndTime } from '../../components/Common/PowerUpFunctions'
import ListTable from '../../components/Common/Listtable/ListTable'
import { BaseURL } from '../../constants/baseURL'


const RawDataCollected = (props) => {

    const [fetchedRawPacket, setFetchedRawPacket] = useState(null)

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

        const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${props?.inventory?.imeiNo}&startTime=${epochTimeInSeconds-60*60}&endTime=${epochTimeInSeconds}`, requestOptions)
        const response_parsed = await response.json()
        if(response_parsed?.data?.length > 0){
            const response_sorted = response_parsed["data"].sort((a,b)=>b.timestamp-a.timestamp)

            const final_response = response_sorted?.map(item=>{
                return {
                    timeStamp: convertEpochToDateAndTime(item?.timestamp),
                    rawPacket: item?.raw 
                }
            })
            console.log(final_response, "setFetchedRawPacket")
            setFetchedRawPacket(final_response)
        }
    }

    useEffect(()=>{        
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
        Header: "Raw Packet",
        accessor: 'rawPacket',
        
        Cell: ({cell}) => (cell?.row?.original?.rawPacket || 'N/A')
      },
      
      ]

    return (
        <>

            <main className='ota_main_container'>
                <button onClick={() => props?.setRawDataToggle(false)} style={{ position: 'absolute', left: '5px', top: '5px', color: 'rgba(0,0,0,0.8)', outline: 'none', border: '1px solid gainsboro', padding: '4px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Back To List</button>
                <section className='ota_section'>
                    <header>Raw Packets</header>
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
                    <div style={{maxWidth:"80%", margin:"0 auto"}}>
                        {fetchedRawPacket && fetchedRawPacket?.length>0 && <ListTable dataList={fetchedRawPacket} columns={column} heading={"Raw Packets IMEI: "+props?.inventory?.imeiNo}/>}
                    </div>
        
                </section>                                
            </main>
        </>
    )

}

export default RawDataCollected