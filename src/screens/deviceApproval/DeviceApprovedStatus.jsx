import { useState, useEffect } from "react";
import {
  activateDeviceApproval,
  getAllDeviceApproval,
  getAuthCodeFromEntityID,
  getAuthorityDetailByID,
  getDetailFromAuthCode,
  getPendingAuthApproval,
} from "../../apis/masters";

import { useNavigate } from "react-router-dom";
import ListTable from "../../components/Common/Listtable/ListTable";

import { BiDetail } from "react-icons/bi";
import { LoadingWidget } from "../../components/loading";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const DeviceApprovedStatus = () => {
  const navigate = useNavigate();

  const [allApprovedDeviceUser, setAllApprovedDeviceUser] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendindAuthority, setPendingAuthority] = useState([]);
  const [authorityEntityID, setAuthorityEntityID] = useState(null);
  const [mappedRoles, setMappedRoles] = useState(null)
  
  const userType = sessionStorage.getItem("userType");

  useEffect(() => {
    const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["deviceApproval"]
    setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  



  const column = [
    {
      Header: "modelCode ",
      accessor: "modelCode",
      width: "13%",
      Cell: ({ cell }) => (
        <>
          {userType === "AUTH" ? (<div
            onClick={() =>
              navigate("/deviceApproval/deviceApprovaldetailsAuth", {
                state: { mCode: cell?.row?.original},
              })
            }
            className=""
            style={{
              display: "flex",
              gap: "5px",
              alignContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "#42a4f5" }}>
              {cell?.row?.original?.modelCode}
            </span>
          </div>): (<div
            onClick={() =>
              mappedRoles.includes("device_testing_approval") &&
              navigate("/deviceApproval/deviceApprovaldetails", {
                state: { mCode: cell?.row?.original?.modelCode, approve: true },
              })
            }
            className=""
            style={{
              display: "flex",
              gap: "5px",
              alignContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ color: "#42a4f5" }}>
              {cell?.row?.original?.modelCode}
            </span>
          </div>)}
        </>
      ),
    },
    {
      Header: "modelName",
      accessor: "modelName",
      Cell: ({ cell }) => cell.row.original?.modelName || "N/A",
    },
    {
      Header: "certifyingAuthority",
      accessor: "certifyingAuthority",
      Cell: ({ cell }) => cell.row.original?.certifyingAuthority || "N/A",
    },
    {
      Header: "tacCertificateNo",
      accessor: "tacCertificateNo",
      Cell: ({ cell }) => cell.row.original?.tacCertificateNo || "N/A",
    },
    {
      Header: "copCertificateNo",
      accessor: "copCertificateNo",
      Cell: ({ cell }) => cell.row.original?.copCertificateNo || "N/A",
    },
    {
      Header: "Auth Status",
      accessor: "authStatus",
      Cell: ({ cell }) => (
        <>
          {cell?.row?.original?.authStatus === 2 && (
            <span
              style={{
                color: "white",
                padding: "5px 7px",
                display: "flex",
                justifyContent: "center",
                width: "max-content",
                alignItems: "center",
                backgroundColor: "rgba(255, 0, 0, 0.8)",
              }}
            >
              Rejected
            </span>
          )}
    
          {["MNF", "DST", "SUA", "SBU"].includes(userType) &&
            cell?.row?.original?.authStatus === null && (
              <span
                style={{
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  width: "max-content",
                  alignItems: "center",
                }}
              >
                Pending
              </span>
            )}
    
          {userType === "AUTH" &&
            cell?.row?.original?.authStatus === 0 && (
              <div
                className=""
                style={{ display: "flex", alignContent: "center", gap: "5px" }}
              >
                <button
                  onClick={(e) =>
                    activateDeviceApprovalAuth(
                      e,
                      cell?.row?.original?.modelCode,
                      cell?.row?.original?.id
                    )
                  }
                  style={{
                    border: "1px solid orange",
                    padding: "5px 7px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: "orange",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
              </div>
            )}
    
          {userType !== "AUTH" &&
            cell?.row?.original?.authStatus === 0 && (
              <span
                style={{
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  width: "max-content",
                  alignItems: "center",
                }}
              >
                Pending
              </span>
            )}
    
          {cell?.row?.original?.authStatus === 1 && (
            <span
              style={{
                color: "green",
                display: "flex",
                justifyContent: "center",
                width: "max-content",
                alignItems: "center",
              }}
            >
              Approved
            </span>
          )}
        </>
      ),
    },
    {
      Header: " SB Status",
      accessor: "approvalstatusbysb",
      Cell: ({ cell }) => (
        <>
          {cell?.row?.original?.approvalstatusbysb == "1" && (
            <span
              style={{
                color: "white",
                padding: "5px 7px",
                display: "flex",
                justifyContent: "center",
                width: "max-content",
                alignItems: "center",
                backgroundColor: "green",
              }}
            >
              Approved
            </span>
          )}

          {cell?.row?.original?.approvalstatusbysb == "2" && (
            <span
              style={{
                color: "white",
                padding: "5px 7px",
                display: "flex",
                justifyContent: "center",
                width: "max-content",
                alignItems: "center",
                backgroundColor: "rgba(255, 0, 0, 0.8)",
              }}
            >
              Rejected
            </span>
          )}

          {["MNF", "DST"]?.includes(userType) &&
            cell?.row?.original?.approvalstatusbysb == "0" && (
              <span
                style={{
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  width: "max-content",
                  alignItems: "center",
                }}
              >
                Pending
              </span>
            )}
          
          {userType == "AUTH" && (
            cell?.row?.original?.approvalstatusbysb == 0 ? (
            <span
              style={{
                color: "black",
                display: "flex",
                justifyContent: "center",
                width: "max-content",
                alignItems: "center",
                }}
              >
                Pending
            </span>
            ) : (
            <span
              style={{
                color: "green",
                display: "flex",
                justifyContent: "center",
                width: "max-content",
                alignItems: "center",
                }}
              >
                Approved
              </span>
            )
          ) }

          {userType == "SUA" || userType == "SBU" ? (
            mappedRoles.includes("device_testing") &&
            !["1", "2"]?.includes(cell?.row?.original?.approvalstatusbysb) ? (
              <div
                className=""
                style={{ display: "flex", alignContent: "center", gap: "5px" }}
              >
                <button
                  onClick={() =>
                    navigate(
                      `/deviceApproval/deviceTest/${encodeURIComponent(cell?.row?.original?.modelCode)}`
                    )
                  }
                  style={{
                    border: "1px solid red",
                    padding: "5px 7px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: "rgba(255, 0, 0, 0.8)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Test Space  
                </button>
              </div>
            ) : (
              <span
                style={{
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  width: "max-content",
                  alignItems: "center",
                }}
              >
                Pending
              </span>
            )
          ) : null}
        </>
      ),
      option: [{ 1: "Approved" }, { 2: "Reject" }, { 0: "Pending" }],
    },
  ];



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let result;
      let status = 0;

      if (userType === "MNF" || userType === "DST") {
        result = await getAllDeviceApproval(1);
      } else if (userType === "AUTH") {
        let entityID = await getAuthorityDetailByID(sessionStorage.getItem("entityId"));
        console.log(entityID, "AuthorityEntityID");
        setAuthorityEntityID(entityID[0]["entitycode"])
        result = await getPendingAuthApproval(entityID[0]["entitycode"]);
        console.log(result, "pendingAuthorityApproval");
      } else {
        result = await getAllDeviceApproval(status);
        console.log(result);
      }
      setAllApprovedDeviceUser(result);
      setLoading(false);
      console.log(allApprovedDeviceUser);
    };
    fetchData();
  }, [authorityEntityID]);

  useEffect(() => {
    const fetchAuthCode = async () => {
      setLoading(true);
      let status = 0
      let res = await getAuthCodeFromEntityID();
      let res2 = await getDetailFromAuthCode(res.result[0].entitycode,status);
      console.log(res2.result, "res.result.entityode");
      setPendingAuthority(res2.result);
      setLoading(false);
    };
    fetchAuthCode();
  }, []);

  const headers = [
    "Entity Name",
    "Entity Code",
    "Address",
    "Contact Name",
    "Contact No",
  ];
  const data =
    allApprovedDeviceUser &&
    Array.isArray(allApprovedDeviceUser) &&
    allApprovedDeviceUser.length > 0
      ? allApprovedDeviceUser.map((esimProvider) => [
          esimProvider.entityName,
          esimProvider.entityCode,
          esimProvider.address,
          esimProvider.contactName,
          esimProvider.contactNo,
        ])
      : [];

  const FilteredAllApprovedDeviceUser = allApprovedDeviceUser;

  const processDataForTable = (data) => {
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map((item) => ({
        ...item,
        approvalStatus:
          item.createdbyRemarks === null
            ? "Pending"
            : item.createdbyRemarks === "Approved"
            ? "Approved"
            : "",
      }));
    } else {
      return [];
    }
  };

  // Processed data for the table
  const processedData = processDataForTable(FilteredAllApprovedDeviceUser);

  const activateDeviceApprovalAuth = async (e, mCode, id) => {
    e.preventDefault();
  
    // Show SweetAlert confirmation dialog
    const confirmation = await Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to activate this device approval?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate it!',
      cancelButtonText: 'Cancel',
    });
  
    // If the user clicks "OK," proceed with the activation
    if (confirmation.isConfirmed) {
      try {
        const res = await activateDeviceApproval(mCode, id);
        console.log(res);
  
        // Display success message
        Swal.fire({
          title: 'Device Approval Activated!',
          text: 'The device approval has been successfully activated.',
          icon: 'success',
        });
        const approvingDevice =await getPendingAuthApproval(authorityEntityID);
        console.log(approvingDevice);
        setAllApprovedDeviceUser(approvingDevice);
        console.log("allApprovedDeviceUser",allApprovedDeviceUser);
      } catch (error) {
        console.error('Error activating device approval:', error);
  
        // Display error message
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while activating the device approval. Please try again.',
          icon: 'error',
        });
      }
    }
  };


  return (
    <div>
      <div className="table-header-section">
        <p className="table-listp" style={{ margin: "10px 0px 10px 15px" }}>
          DEVICE PENDING APPROVAL
        </p>
      </div>
      {loading ? (
        // Display a loading component while fetching data
        <div className="shimmer-container">
        {/* Render shimmer rows */}
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div key={rowIndex} className="shimmer-row">
            {Array.from({ length: 6 }).map((_, cellIndex) => (
              <div key={cellIndex} className="shimmer-cell"></div>
            ))}
          </div>
        ))}
      </div>
      ) : (
        <>
          {userType !== "AUTH" ? (
            <div className="table-list">
              <ListTable dataList={allApprovedDeviceUser} columns={column} />
            </div>
          ) : (
            <div className="table-list">
              <ListTable dataList={pendindAuthority} columns={column} />
            </div>
          )}
        </>
      )}
    </div>
  );
};





