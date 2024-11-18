import { useState, useEffect } from "react";
import { getApprovingAuthority } from "../../apis/masters";
import ListTable from "../../components/Common/Listtable/ListTable";
import { LoadingWidget } from "../../components/loading";
import { BiDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";

export const ApprovingAuthorityList = () => {
  const navigate=useNavigate();
  const [approvingAuthority, setApprovingAuthority] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorityName, setAuthorityName] = useState(null);

  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
  const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["masters"]
  setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesManufacturer")


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getApprovingAuthority();
      console.log(result, "AUT_List");
      const firstProviderCode = result.length > 0 ? result[0].authId : null;

      setAuthorityName(firstProviderCode);
      setApprovingAuthority(result);
      setLoading(false);
    };

    fetchData();
  }, []);

    const column = [
      {
        Header: "Auth Id",
        accessor: "entitycode",
        width: '13%',
        Cell: ({ cell }) => <>
        <div onClick={() => navigate(`/masters/viewDeviceAuthority/${cell?.row?.original?.id}`,{ state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{color: '#42a4f5'}}>{cell?.row?.original?.entitycode}</span>
        </div>
      </>
      },
      {
        Header: "Auth Name",
        accessor: "entityName",
        Cell: ({ cell }) => (cell?.row?.original?.entityName || "N/A")
      },
      {
        Header: "Auth Address",
        accessor: "address",
        Cell: ({ cell }) => (cell?.row?.original?.address || "N/A")
      },
      {
        Header: "District",
        accessor: "district",
        Cell: ({ cell }) => (cell?.row?.original?.district || "N/A")
      },
      {
        Header: "State",
        accessor: "state",
        Cell: ({ cell }) => (cell?.row?.original?.state || "N/A")
      },
      mappedRoles && mappedRoles.includes("update_autority") ? {
        Header: "Action",
        Cell: ({ cell }) => <>
          <attr title="Edit" style={{ display: 'flex', margin: '0px 5px', color: 'white', backgroundColor: '#2162B2', width: 'max-content', padding: '5px 10px', cursor: 'pointer' }} onClick={() => navigate(`/masters/updateApprovingAuthority/${cell?.row?.original?.id}`)}><MdOutlineEdit size={15} /> Edit</attr>
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
        <p className="table-listp">DEVICE APPROVING AUTHORITIES</p>
      </div>
      {loading ? (
        // Display a loading component while fetching data
        <LoadingWidget/>
      ) : (
        <>
          <ListTable dataList={approvingAuthority} columns={column} />
        </>
      )}
    </div>
  );
};
