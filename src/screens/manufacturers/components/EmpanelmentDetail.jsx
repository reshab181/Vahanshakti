
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDeviceInventoryList, getDistributorsDetailsById, getManufactureDetailsById, getUsersInMNF, getdeviceApprovalById } from "../../../apis/manufacture";
import { AddUser } from "../../userManagement/userAdd";
import { LoadingWidget } from "../../../components/loading";
import ListTable from "../../../components/Common/Listtable/ListTable";
import UploadDetailsMNF from "./UploadDetailsMNF";


export const EmpanelmentDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  // const entityId = params.entityID;
  // console.log(entityId,"id");

  const [manufacturerData, setManufacturerData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [approvalData, setApprovalData] = useState(null);
  const [mnfDoc, setMNFDoc] = useState([]);

  const [distributorData, setDistributorData] = useState(null);
  const [activeTab, setActiveTab] = useState("manufacturerDetails");
  const [isUserCreateUIopen,setIsUserCreateUIopen]=useState(false);

  const userType = sessionStorage.getItem("userType");

  // const handleDetailClick = (mnfId) => {
  //   setSelectedRTO(mnfId);
  //   setIsModalOpen(true);
  //   const distributorId = mnfId?.id;
  //   navigate("/distributors/distributor-details", { state: distributorId });
  // };
  
  let manufacturerId;
  if (userType === "MNF") {
    manufacturerId = sessionStorage.getItem('entityId')
  } else {
    manufacturerId = sessionStorage.getItem('manufactureId');
  }

  console.log(manufacturerId);

  useEffect(() => {
    console.log(location.state);
    setManufacturerData(location.state);
    // setMNFDoc(manufacturerDetailsResponse.result[0].mnfDoc)
    const getManufacturerData = async () => {

      console.log(manufacturerId);
      try {
        setLoading(true);
        // const manufacturerDetailsResponse = await getManufactureDetailsById(manufacturerId);
        // console.log(manufacturerDetailsResponse);
        // if (manufacturerDetailsResponse) {
        //   console.log(manufacturerDetailsResponse.result[0].mnfDoc);
        //   setManufacturerData(manufacturerDetailsResponse.result[0]);
        //   setMNFDoc(manufacturerDetailsResponse.result[0].mnfDoc)
        // }
        const usersListResponse = await getUsersInMNF(location.state.id);
        console.log("usersListResponse",usersListResponse);
        if (usersListResponse.status) {
          console.log(usersListResponse, "users");
          setUsersList(usersListResponse.result);
          console.log("hevfe",usersListResponse.result);
        }
        const deviceListResponce = await getDeviceInventoryList(location.state.id);
        console.log(deviceListResponce, "devices");
        if (deviceListResponce.status) {
          setDeviceList(deviceListResponce.result);
        }
        const deviceApprovalResponse = await getdeviceApprovalById(
          manufacturerId
        );
        if (deviceApprovalResponse.status) {
          console.log(deviceApprovalResponse, "device approval");
          setApprovalData(deviceApprovalResponse.result);
        }
        const distributorResponse = await getDistributorsDetailsById(
          manufacturerId
        );
        if (distributorResponse.status) {
          console.log(distributorResponse, "device distributor");
          setDistributorData(distributorResponse.result);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };
    getManufacturerData();
  }, [location,manufacturerId]);

  console.log(manufacturerData, "abc");

  const verticalCombinedUI = (label, value) => {
    return (
      <div className="col my-auto">
        <p
          style={{
            fontSize: "1rem",
            margin: "0",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: "1rem",
            margin: "0",
            padding: "2px 0",
            color: "#333",
          }}
        >
          {value || "N/A"}
        </p>
      </div>
    );
  };


  const column = [
    {
      Header: 'Full Name',
      accessor: "fullname",
          width: '15%',
      Cell: ({ cell }) => <>
        <div className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center'}}  >
          <span>{cell?.row?.original?.fullname}</span>
        </div>
      </>
    },
    {
      Header: "User Name",
      accessor: 'username',
      Cell: ({ cell }) => (cell?.row?.original?.username || 'N/A')
    },
    {
      Header: "Designation",
      accessor: 'designation',
      Cell: ({ cell }) => (cell?.row?.original?.designation || 'N/A')
    },
    {
      Header: "Email Id",
      accessor: 'emailid',
      Cell: ({ cell }) => (cell?.row?.original?.emailid || 'N/A')
    },
    {
      Header: "Contact No",
      accessor: 'contactNo',
      Cell: ({ cell }) => (cell?.row?.original?.contactNo || 'N/A')
    },

  ];

  const column2 = [
    {
      Header: 'Entity Name',
      accessor: "entityName",
          width: '15%',
      Cell: ({ cell }) =>
        <>
          <div className="">
            <span>{cell?.row?.original?.entityName}</span>
          </div>
        </>
    },
    {
      Header: "Entitiy Code",
      accessor: 'entitycode',
      Cell: ({ cell }) => (cell?.row?.original?.entitycode)
    },
    {
      Header: "Address",
      accessor: 'address',
      Cell: ({ cell }) => (cell?.row?.original?.address)
    },
    {
      Header: "District",
      accessor: 'district',
      Cell: ({ cell }) => (cell?.row?.original?.district)
    },
    {
      Header: "Pin Code",
      accessor: 'pinCode',
      Cell: ({ cell }) => (cell?.row?.original?.pinCode)
    }
  ];

  const column_3 = [
    {
      Header: 'Model Code',
      accessor: "modelCode",
      Cell: ({ cell }) => <>
        <div className="">
          <span>{cell?.row?.original?.modelCode}</span>
        </div>
      </>
    },
    {
      Header: "Model Name",
      accessor: 'modelName',
      Cell: ({ cell }) => (cell?.row?.original?.modelName)
    },
    {
      Header: "Certifying Authority",
      accessor: 'certifyingAuthority',
      Cell: ({ cell }) => (cell?.row?.original?.certifyingAuthority)
    },
    {
      Header: "Tac Certificate No",
      accessor: 'tacCertificateNo',
      Cell: ({ cell }) => (cell?.row?.original?.tacCertificateNo)
    },
    {
      Header: "Cop Certificate No",
      accessor: 'copCertificateNo',
      Cell: ({ cell }) => (cell?.row?.original?.copCertificateNo)
    },
    {
      Header: "Vehicle Registration Number",
      accessor: 'vehicleRegistrationNumber',
      Cell: ({ cell }) => (cell?.row?.original?.vehicleRegistrationNumber)
    }

  ];

  const column_4 = [
    {
      Header: 'Device Serial No',
      accessor: "deviceSerialNo",
      Cell: ({ cell }) => <>
        <div className="">
          <span>{cell?.row?.original?.deviceSerialNo}</span>
        </div>
      </>
    },
    {
      Header: "Imei No",
      accessor: 'imeiNo',
      Cell: ({ cell }) => (cell?.row?.original?.imeiNo || 'N/A')
    },
    {
      Header: "Iccid Number",
      accessor: 'iccidNumber',
      Cell: ({ cell }) => (cell?.row?.original?.iccidNumber || 'N/A')
    },
    {
      Header: "vltd Model Code",
      accessor: 'vltdModelCode',
      Cell: ({ cell }) => (cell?.row?.original?.vltdModelCode || 'N/A')
    },

    {
      Header: "Vehicle Registration Number",
      accessor: 'vehicleRegistrationNumber',
      Cell: ({ cell }) => (cell?.row?.original?.vehicleRegistrationNumber || 'N/A')
    }
  ]

  const handleUserAdded = () => {
    // e.preventDefault();
    setIsUserCreateUIopen(false)
    useEffect(()=>{
      const getManufacturerUserData = async () => {
      const usersListResponse = await getUsersInMNF(manufacturerId);
      console.log("usersListResponse",usersListResponse);
      if (usersListResponse.status) {
        console.log(usersListResponse, "users");
        setUsersList(usersListResponse.result);
        console.log("hevfe",usersListResponse.result);
      }
    }
    
    getManufacturerUserData()
    },[])
  };

  return (
    <>
      <h3 style={{ textAlign: "center" }}>All Details </h3>
      {/* Tab Navigation */}
      <div style={{ display: "flex", marginBottom: "20px", justifyContent:"left",marginLeft:"15px"}}>
        <button
          onClick={() => setActiveTab("manufacturerDetails")}
          className={`tabButton ${activeTab === "manufacturerDetails" ? "tabButtonActive" : ""}`}
        >
          Account
        </button>

        <button
          onClick={() => setActiveTab("distributorDetails")}
          className={`tabButton ${activeTab === "distributorDetails" ? "tabButtonActive" : ""}`}
        >
          Distributors
        </button>
        <button
          onClick={() => setActiveTab("approvalDetails")}
          className={`tabButton ${activeTab === "approvalDetails" ? "tabButtonActive" : ""}`}
        >
          Devices
        </button>
       
      </div>

      {
        activeTab == 'manufacturerDetails' &&
        <div>
          {loading ? (
            <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : manufacturerData ? (
            <div className="manufacturer-details-container">
              <div className="manufacturer-details">
                <div className="detail-row">
                  {verticalCombinedUI("ID", manufacturerData.id)}
                  {verticalCombinedUI("Entity Name", manufacturerData.entityName)}
                  {verticalCombinedUI("GST/PAN", manufacturerData.gstNo)}
                  {/* {verticalCombinedUI("Entity Code", manufacturerData.entitycode)} */}
                  {verticalCombinedUI("Location", manufacturerData.address)}
                  {verticalCombinedUI("District", manufacturerData.district)}
                  {verticalCombinedUI("State", manufacturerData.state)}
                  {verticalCombinedUI("Pin Code", manufacturerData.pinCode)}
                </div>

              </div>
            </div>
          ) : null}

          {
            loading ?  (<div className="shimmer-container">
              {/* Render shimmer rows */}
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div key={rowIndex} className="shimmer-row">
                  {Array.from({ length: 6 }).map((_, cellIndex) => (
                    <div key={cellIndex} className="shimmer-cell"></div>
                  ))}
                </div>
              ))}
            </div>) :
            (usersList.length !==0 ? <>
              <div>
                <div style={{ textAlign: "left", margin: "10px", fontWeight: "600" }}>
                  <h3>Manufacturer User Details</h3>
                </div>
                <ListTable viewStatus={true}
                  dataList={usersList} columns={column} />
                </div>
              </> : <>
                <h3>Manufacturer User Details</h3>
              <div style={{margin: "10px", fontWeight: "600",textAlign:"center" }}>
                <p style={{textAlign:"center"}}>No User Created</p>
                <button className="user-button-mnf" style={{textAlign:"center"}} onClick={() =>setIsUserCreateUIopen(true)}>Create User</button>
              </div>
              <div>
                {isUserCreateUIopen ? <AddUser userType="MNF" entityId={manufacturerId} onUserAdded={handleUserAdded}/>:null}
              </div>
              </>)
          }

          {/* <div>
            <div style={{ textAlign: "left", margin: "10px", fontWeight: "600" }}>
              <h3>Manufacturer User Details :</h3>
              <button className="user-button" onClick={() =>setIsUserCreateUIopen(true)}>Create User</button>
            </div>
            <ListTable viewStatus={true}
              dataList={usersList} columns={column} />
          </div> */}

          {loading ?  (<div className="shimmer-container">
              {/* Render shimmer rows */}
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div key={rowIndex} className="shimmer-row">
                  {Array.from({ length: 6 }).map((_, cellIndex) => (
                    <div key={cellIndex} className="shimmer-cell"></div>
                  ))}
                </div>
              ))}
            </div>) : 
            
            <div>
              <h3 style={{marginLeft:"10px"}}>View Document Details</h3>
              {manufacturerData.status == 1 ?<UploadDetailsMNF mnfDoc={mnfDoc}/>: (<p style={{textAlign:"center"}}>No Documents Uploded</p>)}
            </div>
          }

        </div>
      }

      {
        activeTab == 'distributorDetails' &&
        <div>
          {loading ? (
            <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : distributorData && distributorData.length > 0 ? (
            <div>
              <h3 style={{ textAlign: "left", margin: "20px", fontWeight: "600" }}>
                Manufacturer Distributor Details :
              </h3>
              <ListTable viewStatus={true} dataList={distributorData} columns={column2} onClick={obj => navigate(`/distributors/distributor-details/${obj?.id}`, { state: obj })} />
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "gray" }}>
              No Distributor created
            </p>
          )}
        </div>
      }

      {
        activeTab == 'approvalDetails' &&
        <div>
          {loading ? (
            <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : approvalData && approvalData.length > 0 ? (
            <div>
              <h3 style={{ textAlign: "left", margin: "20px", fontWeight: "600" }}>
                Manufacturer Device Approval Details :
              </h3>
              <ListTable viewStatus={true} dataList={approvalData} columns={column_3} />
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "gray" }}>
              No Distributor created
            </p>
          )}
          <div>
            {loading ? (
              <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : deviceList && deviceList.length > 0 ? (
              <div>
                <h3 style={{ textAlign: "left", margin: "20px", fontWeight: "600" }}>
                  Manufacturer Device Inventory :
                </h3>
                <ListTable viewStatus={true} dataList={deviceList} columns={column_4} />
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "gray" }}>
                No Distributor created
              </p>
            )}
          </div>

        </div>

      }

      {/* {
        activeTab == 'deviceInventory' &&
        
      } */}

      {/* {renderTabContent()} */}


    </>
  );
};

export default EmpanelmentDetail;




