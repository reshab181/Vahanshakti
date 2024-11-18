import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ListTable from './Common/Listtable/ListTable';
import BackButton from './Common/BackButton';

import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';
import { BaseURL } from '../constants/baseURL';

const AlertSubDash = () => {

    const {t} = useTranslation()

    const navigate = useNavigate()
    const params = useParams();
    const location = useLocation();
    const [data, setData] = useState([]);

    const [toggle, setToggle] = useState(false)
    const [rawDataToggle, setRawDataToggle] = useState(false)
    // const [sosReleaseToggle, setSOSReleaseToggle] = useState(false)
    const [currentData, setCurrentData] = useState(null)
    const [sosReleasePressed, setSOSReleasePressed] = useState(false)
    const [getRawPackets, setGetRawPackets] = useState(false)
    const [fetchedRawPacket, setFetchedRawpacket] = useState(false)

    const toggleForm = (obj) => {
      setCurrentData(obj)
      setToggle(true)
    }

    const toggleRawCollection = (obj) => {
      setCurrentData(obj)
      setRawDataToggle(true)
    }

    useEffect(() => {
          setData(location?.state?.data)
    }, [location.state]);

    const releaseSOS = async (data) => {  
      console.log(data, "SOSReleaseData")
      const datapacket = "+##STOP_MSG"
      const encodedData = encodeURIComponent(datapacket);
      const url = `${BaseURL}/Intuchproxy/devices/${data?.intuchEntityId}/command?type=34&val1=${encodedData}`;
      const myHeaders = new Headers();
      
      myHeaders.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));

      const requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow"
        };

      
      const response = await fetch(url,requestOptions)
      console.log(url,response.status, "getRawPacketSOSRelease")  
      if(response.status === 200){
        setGetRawPackets(true)
        setSOSReleasePressed(true)
        getRawDataFeed(imei)
      }
    }

    const getRawPacketData = async (imei,time) => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

      const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
      };
      console.log(currentData, "currentData")
      const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${imei}&startTime=${time}&endTime=${time+10*60}&type=3`, requestOptions)
      const response_parsed = await response.json()
      console.log(response_parsed, "getRawPacketSOSRelease")
      if(response_parsed?.data?.length > 0){
          const packetData=response_parsed?.data.filter(item=>item?.raw.includes("EA,11"))
          if(packetData.length>0){
            setFetchedRawpacket(true)
            Swal.fire({
              icon: 'success',
              title: 'SOS Released Successfully',
              text: packetData[0]["raw"]
            })
          }
      }
  
      
  }


    const getRawDataFeed = (imei) => {
      let dateTime = new Date();
      let epochTime = dateTime.getTime();
      let epochTimeInSeconds = Math.floor(epochTime/1000)-10

      const intervalId = setInterval(()=>getRawPacketData(imei,epochTimeInSeconds), 5000);

      const checkDataReceived = setInterval(() => {
          if (fetchedRawPacket) {
              clearInterval(intervalId); 
              clearInterval(checkDataReceived); 
          }
      }, 5000);

      setTimeout(() => {
          clearInterval(intervalId);
          clearInterval(checkDataReceived);
      }, 120000); 
  }




    

    const column = [
        {
        Header: t("deviceList.VehicleRegistrationNumberText"),
        accessor: "vrn",
        width: '15%',
        Cell: ({ cell }) => <>
        <div onClick={() => navigate(`/subDashboard/details/${cell?.row?.original?.intuchEntityId}`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.vrn}</span>
        </div>
      </>
      },
      {
        Header: t("deviceList.TimeStamp"),
        accessor: 'alertTimeStamp',
        Cell: ({cell}) => (cell?.row?.original?.alertTimeStamp || 'N/A')
      },
      {
        Header: t("deviceList.LastLocationText"),
        accessor: 'alertLocation',
        Cell: ({cell}) => (cell?.row?.original?.alertLocation || 'N/A')
      },
      {
        Header: t("deviceList.OwnerNameText"),
        accessor: 'ownerName',
        Cell: ({cell}) => (cell?.row?.original?.ownerName || 'N/A')
      },
      {
        Header: t("deviceList.OwnerPhoneNumberText"),
        accessor: 'ownerPhoneNumber',
        Cell: ({cell}) => (cell?.row?.original?.ownerPhoneNumber || 'N/A')
      },
      {
        Header: t("deviceList.VltdModelCodeText"),
        accessor: 'vltdModelCode',
        Cell: ({cell}) => (cell?.row?.original?.vltdModelCode || 'N/A')
      },
      {
        Header: t("deviceList.ImeiNoText"),
        accessor: 'imei',
        Cell: ({cell}) => (cell?.row?.original?.imei || 'N/A')
      },
      {
        Header: "Raw Data",
        accessor: 'rawData',
        Cell: ({cell}) => <>
        <button style={{ cursor: 'pointer', backgroundColor: 'green', border: '1px solid green', color: 'white', padding: '3px 8px', fontSize: '12px' }} onClick={() => toggleRawCollection(cell?.row?.original)}>Raw Data</button>
      </>
      },
      
      ]
    
    const additionalColumn = [
      {
        Header: t("basicWord.ActionText"),
        Cell: ({ cell }) => <>
          <button style={{ cursor: 'pointer', backgroundColor: '#f44444', border: '1px solid #f82121', color: 'white', padding: '3px 8px', fontSize: '12px' }} onClick={() => releaseSOS(cell?.row?.original)}>SOS Release</button>
        </>
      }
    ]
    
    const finalColumn = location?.state?.code === 24 ? [...column, ...additionalColumn] : column

    return (
      //   <>
      //   {
      //   toggle ? <SosInfoForm data={currentData} back={() => setToggle(false)} />
      //     :
      //     <div>
      //       <nav className="sub-nav">
      //         <BackButton />
      //       </nav>
      //       <p style={{ margin: "5px 0 10px 10px", fontSize: "16px", fontWeight: "600" }}>Alerts | {params?.alertType}</p>
      //       <div>
      //         {data && <ListTable dataList={data} columns={column} />}
      //       </div>
      //     </div>
      // }
      //   </>
        <>
        {getRawPackets ? <RawPacketScreen />:
          <div>
            <nav className="sub-nav">
              <BackButton />
            </nav>
            <p style={{ margin: "5px 0 10px 10px", fontSize: "16px", fontWeight: "600" }}>Raw Packets</p>
            <div>
              {data && <ListTable dataList={data} columns={finalColumn} heading="Raw Packets Data"/>}
            </div>
          </div>
      }
        </>
        
        
    );
};

export default AlertSubDash;
