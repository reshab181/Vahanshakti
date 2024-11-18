import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ListTable from "../../components/Common/Listtable/ListTable";

import { LoadingWidget } from "../../components/loading";
import { useLocation } from 'react-router-dom';
import { getApproveDetailsById, getAllDeviceApproval, getApproveUser } from "../../apis/masters";
import { AddUser } from '../userManagement/userAdd';

export const ViewDeviceAuthority = () => {
   
   
    
    const {authID} = useParams();
   
    
    const [deviceApproval, setDeviceApproval] = useState([])
    const [deviceAuthority, setDeviceAuthority] = useState([])
    const [deviceAuthorityUser, setDeviceAuthorityUser] = useState([])
    const [loading, setLoading] = useState(false);
    const [isUserCreateUIopen,setIsUserCreateUIopen]=useState(false);
    const [error, setError] = useState(null)

    // useEffect(()=>{
    //     console.log("location.state",location.state);
    // },[location.state])

    const handleUserAdded = () => {
       
        setIsUserCreateUIopen(false)
        // useEffect(()=>{
        //   const getManufacturerUserData = async () => {
        //   const usersListResponse = await getUsersInMNF(manufacturerId);
        //   console.log("usersListResponse",usersListResponse);
        //   if (usersListResponse.status) {
        //     console.log(usersListResponse, "users");
        //     setUsersList(usersListResponse.result);
        //     console.log("hevfe",usersListResponse.result);
        //   }
        // }
        
        // getManufacturerUserData()
        // },[])
      };

    const column = [
        {
            Header: "Auth Id",
            accessor: "entitycode",
            width:"13%",
            Cell: ({ cell }) => <>
                <div className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center' }}>
                    <span>{cell?.row?.original?.entitycode}</span>
                </div>
            </>
        },
        {
            Header: "Auth Name",
            accessor: "entityName",
            Cell: ({ cell }) => (cell.row.original?.entityName || "N/A")
        },
        {
            Header: "Auth Address",
            accessor: "address",
            Cell: ({ cell }) => (cell.row.original?.address || "N/A")
        },
        {
            Header: "Auth District",
            accessor: "district",
            Cell: ({ cell }) => (cell.row.original?.district || "N/A")
        },
        {
            Header: "Pin Code",
            accessor: "pinCode",
            Cell: ({ cell }) => (cell.row.original?.pinCode || "N/A")
        }
    ]

    const column_2 = [
        {
            Header: "modelCode ",
            accessor: "modelCode",
            width:"13%",
            Cell: ({ cell }) => <>
                <div className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center' }}>
                    <span>{cell?.row?.original?.modelCode}</span>
                </div>
            </>
        },
        {
            Header: "modelName",
            accessor: "modelName",
            Cell: ({ cell }) => (cell.row.original?.modelName || "N/A")
        },
        {
            Header: "certifyingAuthority",
            accessor: "certifyingAuthority",
            Cell: ({ cell }) => (cell.row.original?.certifyingAuthority || "N/A")
        },
        {
            Header: "tacCertificateNo",
            accessor: "tacCertificateNo",
            Cell: ({ cell }) => (cell.row.original?.tacCertificateNo || "N/A")
        },
        {
            Header: "copCertificateNo",
            accessor: "copCertificateNo",
            Cell: ({ cell }) => (cell.row.original?.copCertificateNo || "N/A")
        }
    ]

    const column_3 = [
        {
            Header: "Designation",
            accessor: "designation",
            width:"13%",
            Cell: ({ cell }) => <>
                <div className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center' }}>
                    <span>{cell?.row?.original?.designation}</span>
                </div>
            </>
        },
        {
            Header: "Full Name",
            accessor: "fullname",
            Cell: ({ cell }) => (cell.row.original?.fullname || "N/A")
        },
        {
            Header: "User Name",
            accessor: "username",
            Cell: ({ cell }) => (cell.row.original?.username || "N/A")
        },
        {
            Header: "emailid",
            accessor: "Email ID",
            Cell: ({ cell }) => (cell.row.original?.emailid || "N/A")
        },
        {
            Header: "contactNo",
            accessor: "Contact No",
            Cell: ({ cell }) => (cell.row.original?.contactNo || "N/A")
        }
    ]

    useEffect(() => {
        const getEsimData = async () => {
            try {
                const approveDetailsResponse = await getApproveDetailsById(authID);

                if (approveDetailsResponse && approveDetailsResponse.result) {
                    console.log(approveDetailsResponse.result);
                    setDeviceAuthority([approveDetailsResponse.result[0]]);
                } else {
                    console.error("Invalid  approveDetailsResponse:", approveDetailsResponse);

                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data. Please try again.");
                setLoading(false);
            }
        }
        getEsimData();
    }, [authID])

    useEffect(() => {
        const getAuthUser = async () => {
            try {
                const res = await getApproveUser(authID);
                if(res.result){
                    console.log(res);
                    setDeviceAuthorityUser(res.result)
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data. Please try again.");
                setLoading(false);
            }
        }
        getAuthUser();
    }, [authID])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const status = 1;
                const result = await getAllDeviceApproval(status);
                console.log(result, "authority");

                const certifyingAuthorityToFilter = result[0].certifyingAuthority;

                const filteredDevices = result.filter(device => device.certifyingAuthority === certifyingAuthorityToFilter);

                if (filteredDevices.length > 0) {
                    setDeviceApproval(filteredDevices);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div>
                <div className="table-header-section">
                    <p className="table-listp">Approving Authorities</p>
                </div>
                {loading ? (
                    <LoadingWidget />
                ) : (

                    <ListTable viewStatus={true} dataList={deviceAuthority} columns={column} />

                )}
            </div>

            <div>
                {/* <div className="table-header-section">
                    <p className="table-listp">Approving Authorities User</p>
                </div> */}
                {loading ? (
                    <LoadingWidget />
                ) : 
                // <>{deviceAuthorityUser && (<ListTable viewStatus={true} dataList={deviceAuthorityUser} columns={column_3} />)}</>
                (deviceAuthorityUser.length !==0 ? <>
                    <div>
                      <div style={{ textAlign: "left", margin: "10px", fontWeight: "600" }}>
                        <p>Approving Authorities User</p>
                      </div>
                      <ListTable viewStatus={true}
                        dataList={deviceAuthorityUser} columns={column_3} />
                      </div>
                    </> : <>
                      <p style={{fontWeight:"600",margin:"10px"}}>Approving Authorities User</p>
                    <div style={{ margin: "10px", fontWeight: "600",textAlign:"center" }}>
                      <p style={{textAlign:"center"}}>No User Created</p>
                      <button className="user-button-mnf" style={{textAlign:"center"}} onClick={() =>setIsUserCreateUIopen(true)}>Create User</button>
                    </div>
                    <div>
                      {isUserCreateUIopen ? <AddUser userType="AUTH" entityId = {authID}  onUserAdded={handleUserAdded} navigateto={"/masters/listApprovingAuthority"}/>:null}
                    </div>
                    </>)
                }
            </div>
            {/* <div>
                <div className="table-header-section">
                    <p className="table-listp">Approval Details</p>
                </div>
                {loading ? (

                    <LoadingWidget />
                ) : <>
                    <ListTable viewStatus={true} dataList={deviceApproval} columns={column_2} />
                </>}
            </div> */}
        </>
    )
}

