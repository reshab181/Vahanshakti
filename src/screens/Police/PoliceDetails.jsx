import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate} from 'react-router-dom';
import { BiDetail } from "react-icons/bi";
import { getPoliceDetailsById, getUsersInPoliceeid } from '../../apis/police';
import ListTable from '../../components/Common/Listtable/ListTable';
import { AddUser } from '../userManagement/userAdd';
import { LoadingWidget } from '../../components/loading';
// import {getDeviceInventoryListRTO} from "../../apis/deviceInventory";

export const PoliceDetails = () => {
    const location = useLocation();
    const navigate= useNavigate
    const params = useParams();
    // const rtoId = location.state;
    const [policeId, setPoliceId] = useState(null);
    const [policeDetails,setPoliceDetails] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [deviceList, setDeviceList] = useState([]);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserCreateUIopen,setIsUserCreateUIopen]=useState(false);

      useEffect(()=>{
        const entityId = params.entityID;
        console.log(location.state);
        // console.log(entityId);
        setPoliceId(entityId)
        const geRTOData = async () => {
            try {
                setLoading(true);
                const response = await getPoliceDetailsById(params.entityID);
                console.log(response.result[0]);
                if (response) {
                    setPoliceDetails(response.result[0]);
                }
                const usersListResponse = await getUsersInPoliceeid(params.entityID);
                if (usersListResponse.status) {
                    console.log(usersListResponse, "users");
                    setUsersList(usersListResponse.result);
                }
                // const deviceListResponce = await getDeviceInventoryListRTO();
                // if (deviceListResponce.status) {
                //   console.log(deviceListResponce, "devices");
                //   setDeviceList(deviceListResponce.result);
                // }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again.');
                setLoading(false);
            }
        };
        geRTOData();

    },[location,params])

    const column = [
        {
          Header: "Entity Name ",
          accessor: "fullname",
          width: '15%',
          Cell: ({cell}) => <>
          <div onClick={() => navigate(`/Police/details/${cell?.row?.original?.id}`)} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{color: '#42a4f5'}}>{cell?.row?.original?.fullname}</span>
          </div>
          </>
        },
        {
          Header: "User Name",
          accessor: "username",
          Cell: ({ cell }) => (cell.row.original?.username || "N/A")
        },
        {
          Header: "Designation",
          accessor: "designation",
          Cell: ({ cell }) => (cell.row.original?.designation || "N/A")
        },
        {
          Header: "Email ID",
          accessor: "emailid",
          Cell: ({ cell }) => (cell.row.original?.emailid || "N/A")
        },
        {
          Header: "Contact No",
          accessor: "contactNo",
          Cell: ({ cell }) => (cell.row.original?.contactNo || "N/A")
        },
        
      ]

    const verticalCombinedUI = (label, value) => {
        return (
          <div className="col my-auto">
            <p style={{ fontSize: "1rem", margin: "0", fontWeight: "bold", color: "#555" }}>{label}</p>
            <p style={{ fontSize: "1rem", margin: "0", padding: "2px 0", color: "#333" }}>{value || "N/A"}</p>
          </div>
        );
      };

    //   console.log(RTODetails);

    return (
        <>
            <div style={{textAlign:'left',margin:"20px",fontWeight:"600"}}>
                <h3>Police Details</h3>
            </div>
            {loading ? (
                <p style={{textAlign:"center",color:"gray"}}>Loading...</p>
            ) 
            : error ? (
                <p>{error}</p>
            ) : policeDetails ? (
                <div className="manufacturer-details-container">
                    <div className="manufacturer-details">
                        <div className="detail-row">
                            {verticalCombinedUI("Entity Code", policeDetails["entitycode"])}
                            {verticalCombinedUI("Entity Name", policeDetails["entityName"])}
                            {verticalCombinedUI("GST/PAN", policeDetails["kycgstpan"])}
                            {verticalCombinedUI("Location", policeDetails["address"])}
                            {verticalCombinedUI("District", policeDetails["district"])}
                            {verticalCombinedUI("State", policeDetails["state"])}
                            {verticalCombinedUI("Pin Code", policeDetails["pinCode"])}
                        </div>
                    </div>
                </div>
            ) : null}
            <div style={{textAlign:'left',margin:"20px",fontWeight:"600"}}>
                <h3>Police User Details</h3>
            </div>
            <div>
            {loading ? <LoadingWidget/> : <>
                {usersList && usersList.length > 0 ? (
                    <div className="table-list">
                    <ListTable
                        dataList={usersList}
                        columns={column}
                        viewStatus = {true}
                    />
                    </div>
                ) : (
                    <>
                    <div style={{ margin: "10px", fontWeight: "600",textAlign:"center" }}>
                    <p style={{textAlign:"center"}}>No User Created</p>
                    <button className="user-button-mnf" style={{textAlign:"center"}} onClick={() =>setIsUserCreateUIopen(true)}>Create User</button>
                    </div>
                    <div>
                        {isUserCreateUIopen ? <AddUser userType="POLICE" entityId={policeId} navigateto = {"/Police/listPoliceLog"}/>:null}
                    </div>
                    </>
                )}
                </>
            }
            </div>
            {/* <div style={{textAlign:'center',margin:"10px",fontWeight:"600"}}>
                {"RTO Device Details"}
            </div>
            <div>
                {deviceList && deviceList.length > 0 ? (
                    <Table
                        data={deviceList}
                        sequence={["deviceSerialNo", "imeiNo","iccidNumber", "vltdModelCode", "vehicleRegistrationNumber"]}
                        links={"rtos/RTO-details"}
                    />
                ) : (
                    <p>No user created</p>
                )}
            </div> */}
        </>
    );
};


