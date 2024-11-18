import React, { useEffect, useState } from "react";
import MAPLayout from "../../components/map";
import Table from "./Components/Table"
import "./Components/Table.css";
import { getCurrentDate } from "../../components/Common/PowerUpFunctions";
import ListTable from "../../components/Common/Listtable/ListTable";
import { FaFilter } from "react-icons/fa6";
import { fetchLiveData, getDevicesPermitHolder } from "../../apis/permit";
import { useNavigate } from "react-router-dom";

const PermitDashboard = ({ navigationOpen, data, loader }) => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([])

  const mergeArrays = (arr1, arr2, key1, key2) => {
    return arr1.reduce((mergedArray, item1) => {
      const matchingItem = arr2.find(item2 => item2[key2] === item1[key1]);
      if (matchingItem) {
        const mergedItem = { ...item1, ...matchingItem };
        mergedArray.push(mergedItem);
      }
      return mergedArray;
    }, []);
  };

  useEffect(() => {
    const fetchLiveTable = async () => {
      try {
        const res_devices = await getDevicesPermitHolder();
        const res_location = await fetchLiveData();
        console.log(res_devices, res_location, "getDevicesPermitHolder");
        const merged_array = mergeArrays(res_devices, res_location, "intEntityId", "id")
        console.log(merged_array, "getDevicesPermitHolder");
        setDataList(merged_array)
      } catch (err) {
        console.log("Api Error");
      }
    };
    fetchLiveTable();
  }, []);
  
  const column = [
    
    {
    Header: 'IMEI No',
    accessor: "imeiNo",
    // Cell: ({cell}) => (cell?.row?.original?.imeiNo || '')
    Cell: ({ cell }) => <>
    <div onClick={() => navigate(`/permitHolder/details`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
      <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.imeiNo}</span>
    </div>
  </>
  },
  {
    Header: "Vehicle",
    accessor: 'vehicleRegistrationNumber',
    Cell: ({cell}) => (cell?.row?.original?.vehicleRegistrationNumber || '')
  },
  {
    Header: "ESIM Provider",
    accessor: 'esimProvider',
    Cell: ({cell}) => (cell?.row?.original?.esimProvider || 0)
  },
  {
    Header: "ICCID Number",
    accessor: 'iccidNumber',
    Cell: ({cell}) => (cell?.row?.original?.iccidNumber || '')
  },
  {
    Header: "Valid Upto",
    accessor: 'iccidValidUpto',
    Cell: ({cell}) => (cell?.row?.original?.iccidValidUpto || '')
  },
  {
    Header: "Vehicle Class",
    accessor: 'vehicleClass',
    Cell: ({cell}) => (cell?.row?.original?.vehicleClass || 0)
  },
  {
    Header: "VLTD Model Code",
    accessor: 'vltdModelCode',
    Cell: ({cell}) => (cell?.row?.original?.vltdModelCode || 0)
  },
  {
    Header: "Location",
    accessor: 'address',
    Cell: ({cell}) => (cell?.row?.original?.address || 0)
  },
  {
    Header: "Add Driver",
    accessor: 'addDriver',
    Cell: ({cell}) => <>
    <button style={{ cursor: 'pointer', backgroundColor: '#f44444', border: '1px solid #f82121', color: 'white', padding: '3px 8px', fontSize: '12px' }} onClick={() => navigate(`/permitHolder/dodForm`, { state: cell?.row?.original })}>Add Driver</button>
  </>
  }
  ]

  return (
    <>

    
    <div className={navigationOpen ? "map-container-shrink" : "map-container-expand"} style={{ margin: '5px' }}>
        <div>
          <div className="dash_table_wp">
          <p style={{marginLeft:'10px',marginBottom:"10px",fontSize:"16px",fontWeight:"500"}}>Table List</p>
          <ListTable dataList={dataList} columns={column}/>
          </div>
          
        {/* <div className="" style={{display:"flex"}}>
            <div className="map-new-container">
            <MAPLayout heights={"90vh"} />
            </div>

        </div> */}
        </div>
    </div>
    </>
  );
};

export default PermitDashboard;
