import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getDeviceApprovedByeId,
  getDistributorsDetailsById,
  getRFCsDetailsById,
  getManufactureDetailsById,
  getUsersInMNF,
  getdeviceApprovalById,
  removeDistributorsFromManufacturers,
  removeRFCFromManufacturer
} from "../../apis/manufacture";

import UploadDetailsMNF from "./components/UploadDetailsMNF";
import ListTable from "../../components/Common/Listtable/ListTable";

import { AddUser } from '../userManagement/userAdd';
import { LoadingWidget } from "../../components/loading";
import '../../components/common.css'
import { MapDistributorToMNF } from "./components/mapDistributorUI";
import { MapRFCToMNF } from "./components/mapRFCUI";
import { getAllDistributor } from "../../apis/distributor";
import { getAllRFCs } from "../../apis/rfcMaster";


export const ViewManufacturerDetail = () => {
 
  const navigate = useNavigate();
  const params = useParams();
  const entityId = params.entityID;
  console.log(entityId,"id");

  const [manufacturerData, setManufacturerData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [approvalData, setApprovalData] = useState([]);
  const [approvalDataSBU, setApprovalDataSBU] = useState(null);
  const [mnfDoc, setMNFDoc] = useState([]);
  const [distributorData, setDistributorData] = useState(null);
  const [allDistributorFilteredData, setAllDistributorFilteredData] = useState([]);
  const [allRFCFilteredData, setAllRFCFilteredData] = useState([]);
  const [distributorMappingUI, setDistributorMappingUI] = useState(false);
  const [rfcData, setRFCData] = useState(null);
  const [rfcMappingUI, setRFCMappingUI] = useState(false);
  const [activeTab, setActiveTab] = useState("manufacturerDetails");
  const [isUserCreateUIopen,setIsUserCreateUIopen]=useState(false);
  const [confirmDistRemoval, setConfirmDistRemoval] = useState(false)
  const [distSelectedForRemoval, setDistSelectedForRemoval] = useState(null)
  const [confirmRFCRemoval, setConfirmRFCRemoval] = useState(false)
  const [rfcSelectedForRemoval, setRFCSelectedForRemoval] = useState(null)

  const userType = sessionStorage.getItem("userType");
  
  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
  const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["manufacturers"]
  setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesManufacturer")


  const distFieldsForRemoval = {entityName:"Entity Name", entitycode: "Entity Code", address:"Address" }
  const rfcFieldsForRemoval = {entityName:"Entity Name", entitycode: "Entity Code", address:"Address" }

  let manufacturerId;
  if (userType === "MNF") {
    manufacturerId = sessionStorage.getItem('entityId')
  } else {
    manufacturerId = sessionStorage.getItem('manufactureId');
  }

  console.log(manufacturerId);

  
  useEffect(() => {
    const fetchAllDistributorData = async () => {
      try {
        const distributorDetails = await getDistributorsDetailsById(manufacturerId);
        const allDistributors = await getAllDistributor();
        const distributorEntityCodes = distributorDetails.result.map((distributor) => distributor.entitycode);
        const filteredDST = allDistributors.filter((res) => !distributorEntityCodes.includes(res.entitycode));
        console.log(filteredDST);
        setAllDistributorFilteredData(filteredDST);
      } catch (error) {
        console.error("Error fetching distributor data:", error);
      }
    };
  
    if (manufacturerId) {
      fetchAllDistributorData();
    }
  }, [manufacturerId]); 
  
  useEffect(() => {
    const fetchAllRFCData = async () => {
      try {
        const rfcDetails = await getRFCsDetailsById(manufacturerId);
        const allRFC = await getAllRFCs();
        console.log(allRFC, "setAllRFCFilteredData");
        console.log(rfcDetails, "setAllRFCFilteredData");
        if (allRFC.length > 0) {
          const rfcEntityCodes = rfcDetails.result.map((rfc) => rfc.entitycode);
          const filteredRFC = allRFC.filter((res) => !rfcEntityCodes.includes(res.entitycode));
          console.log(filteredRFC, "setAllRFCFilteredData");
          setAllRFCFilteredData(filteredRFC);
        }
      } catch (error) {
        console.error("Error fetching RFC data:", error);
      }
    };
  
    if (manufacturerId) {
      fetchAllRFCData();
    }
  }, [manufacturerId]); 
  
  useEffect(() => {
    const getManufacturerData = async () => {
      console.log(manufacturerId);
      try {
        setLoading(true);
        const manufacturerDetailsResponse = await getManufactureDetailsById(manufacturerId);
        console.log(manufacturerDetailsResponse);
        if (manufacturerDetailsResponse) {
          console.log(manufacturerDetailsResponse.result[0].mnfDoc);
          setManufacturerData(manufacturerDetailsResponse.result[0]);
          setMNFDoc(manufacturerDetailsResponse.result[0].mnfDoc);
        }
  
        const usersListResponse = await getUsersInMNF(manufacturerId);
        console.log("usersListResponse", usersListResponse);
        if (usersListResponse.status) {
          console.log(usersListResponse, "users");
          setUsersList(usersListResponse.result);
        }
  
        let approvalResponse;
        if (userType === "SUA" || userType === "SBU") {
          approvalResponse = await getDeviceApprovedByeId(manufacturerId);
        } else {
          approvalResponse = await getdeviceApprovalById(manufacturerId);
        }
        if (approvalResponse.status) {
          console.log(approvalResponse, "device approval");
          setApprovalData(approvalResponse.result);
        }
  
        const distributorResponse = await getDistributorsDetailsById(manufacturerId);
        if (distributorResponse.status) {
          setDistributorData(distributorResponse.result);
        }
  
        const rfcResponse = await getRFCsDetailsById(manufacturerId);
        if (rfcResponse.status) {
          setRFCData(prev => rfcResponse.result);
        }
  
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };
  
    if (manufacturerId) {
      getManufacturerData();
    }
  }, [manufacturerId]); 
  

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


  
  const removeDistMNFMapping = async (selectedDist) => {
    
    const data = JSON.stringify({entity_id:parseInt(manufacturerData.id), mapping_entids: [{entity_id:parseInt(selectedDist?.id)}]})
    const response = await removeDistributorsFromManufacturers(data)
    if(response.status == true){
      Swal.fire({
        icon: "success",
        title: "Remove Success!",
        text: response?.message,
    });
    window.location.reload();
    }else{
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: response?.message,
    });
    }
  }
  const removeRFCMNFMapping = async (selectedRFC) => {
    
    const data = JSON.stringify({entity_id:parseInt(manufacturerData.id), mapping_entids: [{entity_id:parseInt(selectedRFC?.id)}]})
    const response = await removeRFCFromManufacturer(data)
    if(response.status == true){
      window.location.reload();
  }
    
  
  }

  const confirmationDistRemoval =  (selectedDist) => {
    setConfirmDistRemoval(true)
    setDistSelectedForRemoval(selectedDist)
  }

  const confirmationRFCRemoval =  (selectedDist) => {
    setConfirmRFCRemoval(true)
    setRFCSelectedForRemoval(selectedDist)
  }
  const columnDistributor = [
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
    },
    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => <>
      <button onClick={() => confirmationDistRemoval(row?.original)} style={{ backgroundColor: 'rgba(0,100,0, 0.8)', outline: 'none', fontSize: '12px', color: 'white', border: '1px solid rgba(0,122,0, 0.9)', padding: '3px 7px', cursor: 'pointer' }}>Remove</button>
    </>
    }
  ];
  const columnRFC = [
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
    },
    {
      Header: "Action",
      accessor: 'action',
      Cell: ({ row }) => <>
      <button onClick={() => confirmationRFCRemoval(row?.original)} style={{ backgroundColor: 'rgba(0,100,0, 0.8)', outline: 'none', fontSize: '12px', color: 'white', border: '1px solid rgba(0,122,0, 0.9)', padding: '3px 7px', cursor: 'pointer' }}>Remove</button>
    </>
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
    

  ];
    
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
          onClick={() => setActiveTab("rfcDetails")}
          className={`tabButton ${activeTab === "rfcDetails" ? "tabButtonActive" : ""}`}
        >
          RFCs
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
                  {verticalCombinedUI("Entity Code", manufacturerData.entitycode)}
                  {verticalCombinedUI("Entity Name", manufacturerData.entityName)}
                  {verticalCombinedUI("GST/PAN", manufacturerData.gstNo)}
                  {verticalCombinedUI("Location", manufacturerData.address)}
                  {verticalCombinedUI("District", manufacturerData.district)}
                  {verticalCombinedUI("State", manufacturerData.state)}
                  {verticalCombinedUI("Pin Code", manufacturerData.pinCode)}
                </div>

              </div>
            </div>
          ) : null}

          {
            loading ? <LoadingWidget/> :
            mappedRoles.includes("manufacturer_user_management") && (usersList && usersList.length !==0 ? <>
              <div>
                <div style={{ textAlign: "left", margin: "10px", fontWeight: "600" }}>
                  <h3>Manufacturer User Details</h3>
                </div>
                <ListTable viewStatus={true}
                  dataList={usersList} columns={column} />
                </div>
              </> : <>
                <h3>Manufacturer User Details</h3>
              <div style={{ margin: "10px", fontWeight: "600",textAlign:"center" }}>
                <p style={{textAlign:"center"}}>No User Created</p>
                <button className="user-button-mnf" style={{textAlign:"center"}} onClick={() =>setIsUserCreateUIopen(true)}>Create User</button>
              </div>
              <div>
                {isUserCreateUIopen ? <AddUser userType="MNF" entityId={manufacturerId} onUserAdded={handleUserAdded}/>:null}
              </div>
              </>)
          }

          {loading ? <LoadingWidget/> : 
            
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
              {confirmDistRemoval && <div style={{margin:"20px", backgroundColor:"white", padding:"20px"}}>
                                  <p style={{textAlign:"center"}}><b>Confirm Removal of Distributor Manufacturer Mapping</b></p>
                                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", margin:"5px"}}>
                                      {Object.keys(distFieldsForRemoval).map(item=><div key={item}>
                                                                                  <p style={{color:"gray"}}>{distFieldsForRemoval[item]}</p>
                                                                                  <p>{distSelectedForRemoval[item]}</p>
                                                                                  </div>)}
                                  </div>                                                                                    
                                  <button onClick={()=>setConfirmDistRemoval(false)} style={{margin:"5px 3px", padding:"10px 20px", backgroundColor:"gray", color:"white", border:"solid 2px gray"}}>Cancel</button>
                                  <button onClick={()=>removeDistMNFMapping(distSelectedForRemoval)} style={{margin:"5px 3px", padding:"10px 20px", backgroundColor:"red", color:"white", border:"solid 2px red"}}>Confirm</button>                                  
                                </div>}
              <ListTable viewStatus={true} dataList={distributorData} columns={columnDistributor} onClick={obj => navigate(`/distributors/distributor-details/${obj?.id}`, { state: obj })} />
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "gray" }}>
              No Distributor Mapped Yest
            </p>
          )}

          {!distributorMappingUI &&<button style={{margin:"5px 10px", padding:"5px 15px", backgroundColor:"blue", color:"white", borderColor:"blue"}} onClick={()=>{setRFCMappingUI(true), setDistributorMappingUI(true)}} >Map New Distributor</button>}

          {distributorMappingUI && <MapDistributorToMNF manfId={manufacturerData.id} setDistributorMappingUI = {setDistributorMappingUI} allDistributorFilteredData ={allDistributorFilteredData}/>}  
            
        </div>
      }


      {
        activeTab == 'rfcDetails' &&
        <div>
          {loading ? (
            <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : rfcData && rfcData.length > 0 ? (
            <div>
              <h3 style={{ textAlign: "left", margin: "20px", fontWeight: "600" }}>
                Manufacturer RFC Details :
              </h3>
              {confirmRFCRemoval && <div style={{margin:"20px", backgroundColor:"white", padding:"20px"}}>
                                  <p style={{textAlign:"center"}}><b>Confirm Removal of RFC Manufacturer Mapping</b></p>
                                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", margin:"5px"}}>
                                      {Object.keys(rfcFieldsForRemoval).map(item=><div key={item}>
                                                                                  <p style={{color:"gray"}}>{rfcFieldsForRemoval[item]}</p>
                                                                                  <p>{rfcSelectedForRemoval[item]}</p>
                                                                                  </div>)}
                                  </div>                                                                                    
                                  <button onClick={()=>setConfirmRFCRemoval(false)} style={{margin:"5px 3px", padding:"10px 20px", backgroundColor:"gray", color:"white", border:"solid 2px gray"}}>Cancel</button>
                                  <button onClick={()=>removeRFCMNFMapping(rfcSelectedForRemoval)} style={{margin:"5px 3px", padding:"10px 20px", backgroundColor:"red", color:"white", border:"solid 2px red"}}>Confirm</button>                                  
                                </div>}
              {rfcData && rfcData.length > 0 && <ListTable viewStatus={true} dataList={rfcData} columns={columnRFC} />}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "gray" }}>
              No RFCs Mapped Yest
            </p>
          )}

          {!rfcMappingUI &&<button style={{margin:"5px 10px", padding:"5px 15px", backgroundColor:"blue", color:"white", borderColor:"blue"}} onClick={()=>setRFCMappingUI(true)}>Map New RFC</button>}

          {rfcMappingUI && allRFCFilteredData.length > 0 && <MapRFCToMNF manfId={manufacturerData.id} setDistributorMappingUI = {setRFCMappingUI} allRFCFilteredData ={allRFCFilteredData}/>}  
            
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
              No Device created
            </p>
          )}
          
        </div>

      }
    </>
  );
};

export default ViewManufacturerDetail;

      



  




  




  











