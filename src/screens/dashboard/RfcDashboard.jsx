import React, { useEffect, useState } from 'react'
import MAPLayout from "../../components/map.jsx";
import Card from './Components/Card.jsx';
import Table from './Components/Table.jsx';
import './Components/Table.css'
import { getDashboarData } from '../../apis/dashboardApi.jsx';

const RfcDashboard = ({ navigationOpen, data, loader }) => {

    const [active, setActive] = useState(true)
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
    
    // Card Data
    const cardData = [
        { title: "Active Devices", count: data?.activeDevices || 0 },
        { title: "Inventory Assigned", count: data?.uploadedInventory || 0 },
        { title: "Activations (7 days)", count: data?.acitvationLast7Days || 0 },
        { title: "Expiring in 30 days", count: data?.expin30Day || 0 },
        { title: "Expired, not renewed", count: data?.expired || 0 },
        
    ]

    const cardDummyData = [
        { title: "Active Devices", count: "Loading..." },
        { title: "Inventory Assigned", count: "Loading..." },
        { title: "Activations (7 days)", count: "Loading..." },
        { title: "Expiring in 30 days", count: "Loading..." },
        { title: "Expired, not renewed", count: "Loading..." },
    ]


    return (
        <>
            <div className={navigationOpen ? "map-container-shrink" : "map-container-expand"} style={{ margin: '5px' }}>

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
            </div>
        </>
    )
}

export default RfcDashboard