import React, {useEffect, useState} from 'react'
import MAPLayout from "../../components/map.jsx";
import Card from './Components/Card.jsx';
import Table from './Components/Table.jsx';
import './Components/Table.css'
import '../manufacturers/components/UploadDetaisMNF.css'


import {ManufactureOnboarding} from './manfOnboarding.jsx';
import { getDashboarData } from '../../apis/dashboardApi.jsx';

const MnfDashboard = ({ navigationOpen, data, loader }) => {
  
  const [active, setActive] = useState(true)

  const docStatus = sessionStorage.getItem("docStatus")
  const manufacturerId = sessionStorage.getItem("entityId")

  const [deactiveTableData, setDeactiveTableData] = useState(null)
  
  const getDashboardSummary = async () => {
    const response = await getDashboarData()
    console.log(response, "getDashboardSummary")
    if(response.status == true){
      setDeactiveTableData(response?.expnext30day)
    }
  }

  useEffect(()=>{
    getDashboardSummary()
  },[])

  const cardData = [
    { title: "Device Approved", count: data?.approvedDevices || 0 },
    { title: "Distributers Count", count: data?.distributers || 0 },
    { title: "RFC Count", count: data?.rfc || 0 },
    { title: "Active Devices", count: data?.activeDevices || 0 },
    { title: "Inventory Uploaded", count: data?.uploadedInventory || 0 },
    { title: "Activations (7 days)", count: data?.acitvationLast7Days || 0 },
  ]

  const cardDummyData = [
    { title: "Device Approved", count: 'Loading...' },
    { title: "Distributers Count", count: 'Loading...' },
    { title: "Active Devices", count: 'Loading...' },
    { title: "Inventory Uploaded", count: 'Loading...' },
    { title: "Activations (7 days)", count: 'Loading...' },
  ]

  return (
    <>

      {docStatus === "1" && <div className={navigationOpen ? "map-container-shrink" : "map-container-expand"} style={{ margin: '5px' }}>

        <div className="card_wrap">

          {
            !loader && cardData?.map((elem, index) =>
              <Card key={index} title={elem?.title} count={elem?.count} />
            )
          }

          {
            loader && cardDummyData?.map((elem, index) =>
              <Card key={index} title={elem?.title} count={elem?.count} loading={loader} />
            )
          }

        </div>

        <div className="map-alert-container animate__animated animate__fadeIn animate__faster">
          <div className="map-new-container" >
            <MAPLayout />
          </div>

          <div className="dash_table_wrap">
            <p>Expire WIthin 30 Days</p>

            {
              
              deactiveTableData && deactiveTableData.length > 0 ? <Table data={deactiveTableData} /> : <p style={{height:"100%",display:"flex",alignItems:"center"}}>No Device Expire in 30 days</p> 
                
            }

            
          </div>

        </div>
      </div>}

      {docStatus === "2" &&  <ManufactureOnboarding />}
    </>
  )
}

export default MnfDashboard