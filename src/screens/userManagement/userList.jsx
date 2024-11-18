
import {useState, useEffect} from "react"
import {  getAlluserDST, getAlluserMNF, getAlluserRTO } from "../../apis/useradd"
import { useNavigate } from "react-router-dom";
import {getUsersInAUTH, getUsersInPolice} from "../../apis/police";
import ListTable from "../../components/Common/Listtable/ListTable"
import { LoadingWidget } from "../../components/loading";
import { getAllUsersById } from "../../apis/users";
import { MdOutlineEdit } from 'react-icons/md'
import { getUsersInRFC, statusUpdateRFCUser } from "../../apis/rfcMaster";


export const UserList = () => {

  const navigate = useNavigate();
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false);
    
    let userType = sessionStorage.getItem("userType")
    let designation = sessionStorage.getItem("designation").toLowerCase()
    
    useEffect(() => {
        const fetchData = async () => {
          let result;
          setLoading(true);
          if (userType === "MNF") {
            result = await getAlluserMNF();
            setUser(result);
          } else if (userType === "DST") {
            result = await getAlluserDST();
            setUser(result);
          } else if (userType === "RTO") {
            result = await getAlluserRTO();
            setUser(result);
          } else if (userType === "POLICE") {
            result = await getUsersInPolice();           
            setUser(result.result);
          } else if (userType === "AUTH") {
            result = await getUsersInAUTH();  
            console.log(result);          
            setUser(result.result);
          } else if (userType === "RFC") {
            result = await getUsersInRFC();  
            console.log(result);          
            setUser(result.result);
          } else {
            result = await getAllUsersById();
            console.log(result, "UserList");
            setUser(result);
          }
          setLoading(false);
      
          console.log("result:", result); 
        };
        fetchData();
      }, [userType]);


      const statusUpdateRFCUserFunc = async (userdata) => {
        console.log(userdata, "statusUpdateRFCUserFunc")
        const response = await statusUpdateRFCUser({
          userid: userdata?.userid,
          status: userdata?.status === 1 ? 0 : 1,
          username: userdata?.username
        });
        if(response.status == true){
            window.location.reload()
        }
      }

      const column = [
        {
          Header: "Full Name ",
          accessor: "fullname",
          width: '15%',
          Cell: ({cell}) => <>
          <div onClick={() => navigate(`/userManagement/userDetails/${cell?.row?.original?.userid}`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
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
        {
          Header: "Edit",
          Cell: ({ cell }) => <>
            <attr title="Edit" style={{ display: 'flex', margin: '0px 5px', color: 'white', backgroundColor: '#2162B2', width: 'max-content', padding: '5px 10px', cursor: 'pointer' }} onClick={() => navigate(`/userManagement/updateUser/${cell?.row?.original?.userid}`)}><MdOutlineEdit size={15} /> Edit</attr>
          </>
        }
      ]

    let statusChangeCol = [
      {
        Header: "Block / Unblock",
        Cell: ({ cell }) => <>
          <attr title="Edit" style={{ display: 'flex', margin: '0px 5px', color: 'white', backgroundColor: cell?.row?.original?.status === 1 ? "red" : "green", width: 'max-content', padding: '5px 10px', cursor: 'pointer' }} onClick={() => statusUpdateRFCUserFunc(cell?.row?.original)}>{cell?.row?.original?.status === 1 ? "Block" : "Unblock"}</attr>
        </>
      }
    ]

    return(
        <div>
            <div className="table-header-section">
            <p className="table-listp" style={{margin:"10px 0px 10px 15px"}}>ALL USER LIST</p>
            </div>
            {loading ? 
             (<div className="shimmer-container">
              {/* Render shimmer rows */}
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div key={rowIndex} className="shimmer-row">
                  {Array.from({ length: 6 }).map((_, cellIndex) => (
                    <div key={cellIndex} className="shimmer-cell"></div>
                  ))}
                </div>
              ))}
            </div>)
              : 
              designation == "admin" && userType==="RFC" ? 
                <div className="table-list">
                    <ListTable 
                        dataList={user}
                        columns={[...column, ...statusChangeCol]}
                        heading="User List"
                    />
                  </div>
                : <div className="table-list">
                    <ListTable 
                        dataList={user}
                        columns={column}
                        heading="User List"
                    />
                  </div>
        }
        </div>
    )
}




