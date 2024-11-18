import { useState, useEffect } from "react"
import { getAllDeviceApproval, getAuthCodeFromEntityID, getDetailFromAuthCode, getEsimAllProvider } from "../../apis/masters"
import { useNavigate } from "react-router-dom"
import ListTable from "../../components/Common/Listtable/ListTable"
import { BiDetail } from "react-icons/bi";
import { LoadingWidget } from "../../components/loading"

export const DeviceApprovalList = () => {
  const userType = sessionStorage.getItem("userType")
  const navigate = useNavigate();

  const [deviceApproval, setDeviceApproval] = useState([])
  const [approvedAuthority, setApprovedAuthority] = useState([]);
  const [loading, setLoading] = useState(false);

  const column = [
    {
      Header: "modelCode ",
      accessor: "modelCode",
      width: '13%',
      // Cell: ({ cell }) => <>
      //   <div onClick={() => navigate("/deviceApproval/deviceApprovaldetails", { state: {mCode: cell?.row?.original?.modelCode} })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
      //     <span style={{color: '#42a4f5'}}>{cell?.row?.original?.modelCode}</span>
      //   </div>
      // </>
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
              sessionStorage.getItem("userType") === "SBU" &&
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
    },
    
  ]

    useEffect(()=>{
        const fetchData = async () => {
          let status = 1;
            setLoading(true);
                        
            const result = await getAllDeviceApproval(status)
            console.log(result, "ESM list of Approval Devices")
            setDeviceApproval(result)
            setLoading(false);
        }
        fetchData()

  }, [])

  useEffect(() => {
    const fetchAuthCode = async () => {
      setLoading(true);
      let status = 1
      let res = await getAuthCodeFromEntityID();
      console.log(res.result[0].entitycode, "res.result.entityode");
      // setAuthID(res.result[0].entitycode);
      let res2 = await getDetailFromAuthCode(res.result[0].entitycode,status);
      console.log(res2.result, "res.result.entityode");
      setApprovedAuthority(res2.result);
      setLoading(false);
    };
    fetchAuthCode();
  }, []);

  return (
    <div>
      <div className="table-header-section">
        <p className="table-listp" style={{margin:"10px 0px 10px 15px"}}>DEVICE APPROVAL LIST</p>
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
              <ListTable
                dataList={deviceApproval}
                columns={column}
              />
            </div>
          ) : (
            <div className="table-list">
              <ListTable dataList={approvedAuthority} columns={column} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

