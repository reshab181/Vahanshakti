import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRFCMNF, getAllRFCs } from "../../apis/rfcMaster";
import ListTable from "../../components/Common/Listtable/ListTable";
import { LoadingWidget } from "../../components/loading";
import { MdOutlineEdit } from "react-icons/md";
import { getAllManufacturer } from "../../apis/manufacture";

export const RFCList = () => {

  let userType = sessionStorage.getItem("userType")
  
  const navigate = useNavigate();
  const [rfcDataList, setRFCDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mnfList, setMnfList] = useState([])

  const fetchData = async (mnfId) => {
    setLoading(true);
    let result;

    switch (userType) {
      case 'MNF': {
        let eid = sessionStorage.getItem('entityId')
        result = await getAllRFCMNF(eid);
      } break;

      default: {

        if (!mnfId) {
          result = await getAllRFCs();
        } else {
          result = await getAllRFCMNF(mnfId);
        }

      } break;
    }

    setRFCDataList(result);
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
        <div onClick={() => navigate("/rfcMaster/rfcDetails", { state: cell?.row?.original?.id })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
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
    {
      Header: "Action",
      Cell: ({ cell }) => <>
        <attr title="Edit" style={{ display: 'flex', margin: '0px 5px', color: 'white', backgroundColor: '#2162B2', width: 'max-content', padding: '5px 10px', cursor: 'pointer' }} onClick={() => navigate(`/rfcMaster/updateRFC/${cell?.row?.original?.id}`)}><MdOutlineEdit size={15} /> Edit</attr>
      </>
    }
  ]

  return (
    <div>
      <div className="table-header-section" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', margin: '5px 0px' }}>
        <p className="table-listp">RFC LIST</p>
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
      </div>)
       :
        <ListTable dataList={rfcDataList} columns={column} />
      }
    </div>
  );
};
