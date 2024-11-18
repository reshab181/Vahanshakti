import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDistributor, getAllDistributorMNF } from "../../apis/distributor";
import ListTable from "../../components/Common/Listtable/ListTable";
import { LoadingWidget } from "../../components/loading";
import { MdOutlineEdit } from "react-icons/md";
import { getAllManufacturer } from "../../apis/manufacture";

export const DistributorList = () => {

  let userType = sessionStorage.getItem("userType")
  
  const navigate = useNavigate();
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mnfList, setMnfList] = useState([])

  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
    const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["distributors"]
    setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesDistributor")
  


  const fetchData = async (mnfId) => {
    setLoading(true);
    let result;

    switch (userType) {
      case 'MNF': {
        let eid = sessionStorage.getItem('entityId')
        result = await getAllDistributorMNF(eid);
      } break;

      default: {

        if (!mnfId) {
          result = await getAllDistributor();
        } else {
          result = await getAllDistributorMNF(mnfId);
        }

      } break;
    }

    setDistributors(result);
    setLoading(false);
  };

  // fetch Manufacturer list
  const fetchAllManufacturer = async () => {
    let resp = await getAllManufacturer()
    setMnfList(resp)
  }

  useEffect(() => {
    fetchAllManufacturer()
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    fetchData(value);
  }

  const column = [
    {
      Header: 'Entity Name',
      accessor: "entityName",
      width: '15%',
      Cell: ({ cell }) => <>
        <div onClick={() => navigate("/distributors/distributorDetails", { state: cell?.row?.original?.id })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.entityName}</span>
        </div>
      </>
    },
    {
      Header: "Entitiy Code",
      accessor: 'entitycode',
      Cell: ({ cell }) => (cell?.row?.original?.entitycode || 'N/A')
    },
    {
      Header: "Address",
      accessor: 'address',
      Cell: ({ cell }) => (cell?.row?.original?.address || 'N/A')
    },
    {
      Header: "District",
      accessor: 'district',
      Cell: ({ cell }) => (cell?.row?.original?.district || 'N/A')
    },
    {
      Header: "Pin Code",
      accessor: 'pinCode',
      Cell: ({ cell }) => (cell?.row?.original?.pinCode || 'N/A')
    },
    mappedRoles && mappedRoles.includes("update_distributor") ? {
      Header: "Action",
      Cell: ({ cell }) => <>
        <attr title="Edit" style={{ display: 'flex', margin: '0px 5px', color: 'white', backgroundColor: '#2162B2', width: 'max-content', padding: '5px 10px', cursor: 'pointer' }} onClick={() => navigate(`/distributors/updateDistributor/${cell?.row?.original?.id}`)}><MdOutlineEdit size={15} /> Edit</attr>
      </>
    } : {
      Header: "Status",
      accessor: 'status',
      Cell: "Active"
    }
  ]

  return <>
    { mappedRoles && <div>
      <div className="table-header-section" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', margin: '5px 0px' }}>
        <p className="table-listp">DISTRIBUTORS LIST</p>
        {(userType == "SUA" || userType == "SBU") && <select className="alarm_filter" name="mnfList" id="" onChange={handleChange}>
          <option value="" selected>All Manufacturer</option>
          {
            Array.isArray(mnfList) &&
            mnfList?.map((elem, index) =>
              <option key={index} value={elem?.id}>{elem?.entityName}</option>
            )
          }
        </select>}
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
      ) :
        <ListTable dataList={distributors} columns={column} />
      }
    </div>}
    </>
};
