import { useState, useEffect } from "react";
import { getEsimAllProvider, getEsimAllProviderIdCodeName} from "../../apis/masters";
import ListTable from "../../components/Common/Listtable/ListTable";
import { BiDetail } from "react-icons/bi";
import { LoadingWidget } from "../../components/loading";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
// import {ViewEsimProviderDetails} from "./viewEsimProviderDetails"


export const ESIMProviderList = () => {
  const navigate=useNavigate();
  const [esimProviders, setESIMProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [esimProviderName, setEsimProviderName] = useState(null);
  let userType = localStorage.getItem("userType");
  let user = JSON.parse(userType);

  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
  const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["masters"]
  setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesManufacturer")


  useEffect(() => {
    const fetchData = async () => {
      console.warn("test", "result2");

      console.log(user);
      setLoading(true);
      let result;
      if (user === "MNF") {
        result = await getEsimAllProviderIdCodeName();
      } else {
        result = await getEsimAllProvider();
      }
      console.log(result, "ESM");
          
          const firstProviderCode = result.length > 0 ? result[0].providerCode : null;

         
          setEsimProviderName(firstProviderCode);

      setESIMProviders(result);
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(esimProviderName,"abc");

  const column = [
    {
      Header: "Entity Name",
      accessor: "providerName",
      width: '15%',
      Cell: ({ cell }) => <>
      <div onClick={() => navigate("/masters/viewEsimDetails", { state: cell?.row?.original})} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
        <span style={{color: '#42a4f5'}}>{cell?.row?.original?.providerName}</span>
      </div>
    </>
    },
    {
      Header: "Entity Code",
      accessor: "providerCode",
      Cell: ({ cell }) => (cell?.row?.original?.providerCode || "N/A")
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: ({ cell }) => (cell?.row?.original?.address || "N/A")
    },
    {
      Header: "Contact Name",
      accessor: "pocName",
      Cell: ({ cell }) => (cell?.row?.original?.pocName || "N/A")
    },
    {
      Header: "Contact No",
      accessor: "pocPhone",
      Cell: ({ cell }) => (cell?.row?.original?.pocPhone || "N/A")
    },
    mappedRoles && mappedRoles.includes("update_autority") ? {
      Header: "Action",
      Cell: ({ cell }) => <>
        <attr title="Edit" style={{ display: 'flex', margin: '0px 5px', color: 'white', backgroundColor: '#2162B2', width: 'max-content', padding: '5px 10px', cursor: 'pointer' }} onClick={() => navigate(`/masters/updateESIMProviders/${cell?.row?.original?.providerCode}`)}><MdOutlineEdit size={15} /> Edit</attr>
      </>
    }:{
      Header: "Status",
      accessor: "status",
      Cell: "active"
    }
  ]

  return (
    <div>
      <div className="table-header-section">
        {user === "RTO" ? (
          <p className="table-listp">ESIM PROVIDER DETAILS</p>
        ) : (
          <p className="table-listp">ESIM PROVIDER LIST</p>
        )}
      </div>
      {loading ? (
        // Display a loading component while fetching data
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
      ) : (
        <>
          <ListTable dataList={esimProviders} columns={column} heading="ESIM Provider List"/>
        </>
      )}
    </div>
  );
};
