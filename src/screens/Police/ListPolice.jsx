import { useState, useEffect } from "react";
import { getPoliceList } from "../../apis/police";
import { useLocation, useNavigate } from "react-router-dom";
import ListTable from "../../components/Common/Listtable/ListTable";
import { BiDetail } from "react-icons/bi";
import { LoadingWidget } from "../../components/loading";
import { MdOutlineEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const ListPolice = () => {
  const {t} = useTranslation()

  // const location = useLocation();
  const navigate = useNavigate();
  const [police, setPolice] = useState([])
  const [loading, setLoading] = useState(false);
  
  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
  const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["Police"]
  setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesPolice")
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getPoliceList()
      setPolice(result)
      setLoading(false);
    }
    fetchData()
  }, [])

  const column = [
    {
      Header: t('list.EntityNameText'),
      accessor: "entityName",
          width: '15%',
      Cell: ({ cell }) => <>
        <div onClick={() => navigate(`/Police/details/${cell?.row?.original?.id}`)} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}  >
          <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.entityName}</span>
        </div>
      </>
    },
    {
      Header: t('list.EntityCodeText'),
      accessor: 'entitycode',
      Cell: ({ cell }) => (cell?.row?.original?.entitycode || 'N/A')
    },
    {
      Header: t('list.AddressText'),
      accessor: 'address',
      Cell: ({ cell }) => (cell?.row?.original?.address || 'N/A')
    },
    {
      Header: t('list.DistrictText'),
      accessor: 'district',
      Cell: ({ cell }) => (cell?.row?.original?.district || 'N/A')
    },
    {
      Header: t('list.PincodeText'),
      accessor: 'pinCode',
      Cell: ({ cell }) => (cell?.row?.original?.pinCode || 'N/A')
    },
    mappedRoles && mappedRoles.includes("upd_police") ? {
      Header: t('list.ActionText'),
      Cell: ({ cell }) => <>
        <attr title="Edit" style={{ display: 'flex', margin: '0px 5px', color: 'white', backgroundColor: '#2162B2', width: 'max-content', padding: '5px 10px', cursor: 'pointer' }} onClick={() => navigate(`/Police/updatePolice/${cell?.row?.original?.id}`)}><MdOutlineEdit size={15} /> Edit</attr>
      </>
    } : {
      Header: "Status",
      accessor: "status",
      Cell: "active"
  }
  ]

  return (
    <div>
      <div className="table-header-section">
        <p className="table-listp">POLICE LIST</p>
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
        <ListTable dataList={police} columns={column} />
      </>
      }
    </div>
  )
}
