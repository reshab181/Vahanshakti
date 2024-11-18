import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDistributorsDetailsById,
  getUsersInDST,
} from "../../apis/distributor";
import { BiDetail } from "react-icons/bi";
import ListTable from "../../components/Common/Listtable/ListTable";


export const ViewDistributorDetail = () => {
  const location = useLocation();
  
  const [distributorData, setDistributorData] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Calling for ViewDistributorDeatils
  useEffect(() => {
    setLoading(true);
    console.log(location.state);
    
    const getDistributorData = async () => {
      try {
        setLoading(true);
      
        const distributorDetailsResponse = await getDistributorsDetailsById(location.state);
        console.log(distributorDetailsResponse);
        if (distributorDetailsResponse) {
          setDistributorData(distributorDetailsResponse.result);
        }
        const usersListResponse = await getUsersInDST(location.state);
        console.log(usersListResponse);
        if (usersListResponse) {
          setUsersList(usersListResponse.result);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    }
    getDistributorData();
  }, [location.state])
  
 
  const verticalCombinedUI = (label, value) => {
    return (
      <div className="content">
        <span className="sub-heading">{label}</span>
        <span className="text">{value || "N/A"}</span>
      </div>
    );
  };

  let column = [
    {
      Header: "Full Name",
      accessor: 'fullname',
      Cell: ({ cell }) => <>
        <div onClick={() => navigate("/distributors/distributor-details")} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: "pointer" }}>
              <span style={{color: '#42a4f5'}}>{cell?.row?.original?.fullname}</span>
        </div>
      </>
    },
    {
      Header: "Username",
      accessor: 'username',
      Cell: ({ cell }) => (cell?.row?.original?.username || "N/A")
    },
    {
      Header: "Designation",
      accessor: 'designation',
      Cell: ({ cell }) => (cell?.row?.original?.designation || "N/A")
    },
    {
      Header: "Email Id",
      accessor: 'emailid',
      Cell: ({ cell }) => (cell?.row?.original?.emailid || "N/A")
    },
    {
      Header: "Contact No.",
      accessor: 'contactNo',
      Cell: ({ cell }) => (cell?.row?.original?.contactNo || "N/A")
    },
  ]

  let column2 = [
    {
      Header: "Device Serial No.",
      accessor: 'deviceSerialNo',
      Cell: ({ cell }) => <>
        <div onClick={() => navigate("/distributors/distributor-details")} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{color: '#42a4f5'}}>{cell?.row?.original?.deviceSerialNo}</span>
        </div>
      </>
    },
    {
      Header: "IMEI No.",
      accessor: 'imeiNo',
      Cell: ({ cell }) => (cell?.row?.original?.imeiNo || "N/A")
    },
    {
      Header: "ICC Id No.",
      accessor: 'iccidNumber',
      Cell: ({ cell }) => (cell?.row?.original?.iccidNumber || "N/A")
    },
    {
      Header: "VLTD Model Code",
      accessor: 'vltdModelCode',
      Cell: ({ cell }) => (cell?.row?.original?.vltdModelCode || "N/A")
    },
    {
      Header: "Vehicle Reg. No.",
      accessor: 'vehicleRegistrationNumber',
      Cell: ({ cell }) => (cell?.row?.original?.vehicleRegistrationNumber || "N/A")
    },
  ]

  return (
    <>
      <div style={{ textAlign: "left", margin: "20px", fontWeight: "600" }}>
        <h3 className="heading">Distributor Details :</h3>
      </div>
      {loading ? (
        <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        distributorData.map((distributor, index) => (
          <div key={index} className="card">
            <div className="detail-row">
              {verticalCombinedUI("Entity Code", distributor["entitycode"])}
              {verticalCombinedUI("Entity Name", distributor["entityName"])}
              {verticalCombinedUI("GST/PAN", distributor["kycgstpan"])}
              {verticalCombinedUI("Location", distributor["address"])}
              {verticalCombinedUI("District", distributor["district"])}
              {verticalCombinedUI("State", distributor["state"])}
              {verticalCombinedUI("Pin Code", distributor["pinCode"])}
            </div>
          </div>
        ))
      )}
      <div style={{ textAlign: "left", margin: "20px", fontWeight: "600" }}>
        <h3 className="heading">Distributor User Details :</h3>
      </div>
      <div>
        {usersList && usersList.length > 0 ?
          <ListTable viewStatus={true} dataList={usersList} columns={column} />
          : (
            <p style={{ textAlign: "center" }}>No user created</p>
          )
        }
      </div>
      <div style={{ textAlign: "left", margin: "20px", fontWeight: "600" }}>
        <h3 className="heading">Distributor Device Details :</h3>
      </div>
      <div>
        {deviceList && deviceList.length > 0 ?
          <ListTable viewStatus={true} dataList={usersList} columns={column2} />
          : (
            <p style={{ textAlign: "center" }}>No Device Details</p>
          )}
      </div>
    </>
  );
};


