import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllManufacturer } from "../../apis/manufacture";
import ListTable from "../../components/Common/Listtable/ListTable";
import { LoadingWidget } from "../../components/loading";
import { MdOutlineEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const ManufacturerList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const manufacturerData = location.state;

  const [manufactures, setManufactures] = useState([]);
  const [selectedMNF, setSelectedMNF] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
  const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["manufacturers"]
  setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesManufacturer")

  // To navigate on Click 
  const handleDetailClick = (mnf) => {
    console.log("mnf data", mnf);
    setSelectedMNF(mnf);
    navigate("/manufacturers/manufacturerDetails");
    const manufactureId = mnf?.id;
    sessionStorage.setItem("manufactureId", manufactureId);
  };

  useEffect(() => {
    console.log("selectedRTO has been updated:", selectedMNF);
  
  }, [selectedMNF]);

// API Function calling to get Lists of manufacturers
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getAllManufacturer();
      const filteredManufactures = result.filter(mnf => mnf.status === 1);
      console.log(result, "MNF");
      console.log(filteredManufactures, "filteredManufactures")
      setManufactures(filteredManufactures);
      setLoading(false);
    };
    fetchData();
  }, []);

// For ListTable view Columns
    const column = [
      {
      Header: t('list.EntityNameText'),
      accessor: "entityName",
          width: '15%',
      Cell: ({ cell }) => <>
        <div onClick={() => handleDetailClick(cell?.row?.original)} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}  >
          <span style={{color: '#42a4f5'}}>{cell?.row?.original?.entityName}</span>
          </div>
      </>
    },
    {
      Header: t('list.EntityCodeText'),
      accessor: 'entitycode',
      Cell: ({cell}) => (cell?.row?.original?.entitycode || 'N/A')
    },
    {
      Header: t('list.AddressText'),
      accessor: 'address',
      Cell: ({cell}) => (cell?.row?.original?.address || 'N/A')
    },
    {
      Header: t('list.DistrictText'),
      accessor: 'district',
      Cell: ({cell}) => (cell?.row?.original?.district || 'N/A')
    },
    {
      Header: t('list.PincodeText'),
      accessor: 'pinCode',
      Cell: ({cell}) => (cell?.row?.original?.pinCode || 'N/A')
    },
    {
      Header: t('list.StatusText'),
      accessor: 'status',
      Cell: ({ cell }) => <>
        {
          cell?.row?.original?.status == 1 ?
            <p style={{  padding: '5px 7px', fontSize: '12px', fontWeight: '600', color: 'green', cursor: 'pointer',textAlign:"center" }}>Uploaded</p>
            :
            <p style={{  padding: '5px', fontSize: '12px', fontWeight: '600', color: 'black',textAlign:"center" }} >Pending</p>
            
        }
      </>
    },
    mappedRoles && mappedRoles.includes("update_manufacturer") ? {
      Header: t('list.ActionText'),
      Cell: ({ cell }) => <>
        <attr title="Edit" style={{ display: 'flex', margin: '0px 5px', color: 'white', backgroundColor: '#2162B2', width: 'max-content', padding: '5px 10px', cursor: 'pointer' }} onClick={() => navigate(`/manufacturers/updateManufacturer/${cell?.row?.original?.id}`)}><MdOutlineEdit size={15} /> Edit</attr>
      </>
    } : {
      Header: "Activity status",
      accessor: 'activityStatus',
      Cell: "active"
    }

    ]

// return statement
  return (
    <div>
      <div className="table-header-section">
        <p className="table-listp">MANUFACTURERS LIST</p>
      </div>
      {loading ? (
      
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
      ) : <>
        <ListTable dataList={manufactures} userType="Manufacturer" columns={column} heading="Approved Manufacturer List"/>
      </>}
    </div>
  );
};
