import React, { useState, useEffect } from 'react';
import { BsXLg } from "react-icons/bs";
import { getPublicDashboard } from '../../apis/logsApi';
import ListTable from '../../components/Common/Listtable/ListTable';

const PublicDashboard = (props) => {
  
  const [data, setData] = useState()  
  
  useEffect(()=>{
    const publicData = async () => {
        const response = await getPublicDashboard()
        
        if(response?.status){    
            setData(response?.result)
        }
    }

    publicData()
  },[])  

  const column = [
    {
      Header: "Model Code",
      accessor: "device_approved",
      Cell: ({cell}) => (cell.row.original?.device_approved || "N/A")
    },
    {
      Header: "Manufacturer Name",
      accessor: "mnf_name",
      Cell: ({ cell }) => (cell.row.original?.mnf_name || "N/A")
    },
    {
      Header: "Total Devices",
      accessor: "total_device",
      Cell: ({ cell }) => (cell.row.original?.total_device || "N/A")
    },
    {
        Header: "Active Devices",
        accessor: "active_device",
        Cell: ({ cell }) => (cell.row.original?.active_device)
      },
      {
        Header: "Inactive Devices",
        accessor: "inactive_device",
        Cell: ({ cell }) => (cell.row.original?.inactive_device)
      },
      {
        Header: "Online Device Percentage",
        accessor: "online_device_percentage",
        Cell: ({ cell }) => ((cell.row.original?.active_device/cell.row.original?.total_device*100).toFixed(2) || "N/A")
      },
  ]

  return (
    <>  
        <div >
            <p style={{textAlign:"center", margin:"5px", padding:"10px", "backgroundColor":"white"}}> Page will live from 15th November </p>
            <p style={{textAlign:"center", margin:"5px", padding:"10px", "backgroundColor":"white"}}> For any details, contact info@vahanshakti.in </p>
        </div>
    </>
  )
}

export default PublicDashboard


{/* <div className='heading-para'>
              <p style={{margin:"5px 10px"}}><b>Public Dashboard</b></p>
              <div style={{background:"white", padding:"10px", margin:"10px", borderRadius:"10px"}}>
                {data ? <ListTable dataList={data} columns={column}/> : <p style={{marginTop:"10px", textAlign:"center", color:"gray"}}><b>No Approved Devices Yet!!</b></p>}
              </div>
            </div> */}