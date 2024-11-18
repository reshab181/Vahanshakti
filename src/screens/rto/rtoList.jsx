import { useState, useEffect } from "react";
import { getRTOList } from "../../apis/rto";
import { useNavigate } from "react-router-dom";
import ListTable from "../../components/Common/Listtable/ListTable";
import { MdOutlineEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const RTOList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rtos, setRTOs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mappedRoles, setMappedRoles] = useState(null);

  // Fetch allowed navigation map from session storage
  useEffect(() => {
    const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["rtos"];
    setMappedRoles(allowedNavigationMap.map((item) => item.code));
  }, []);

  // Fetch RTO list data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getRTOList();
      setRTOs(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Define table columns
  const column = [
    {
      Header: t("list.EntityNameText"),
      accessor: "entityName",
      width: "15%",
      Cell: ({ cell }) => (
        <div
          onClick={() => navigate(`/rtos/details/${cell?.row?.original?.id}`)}
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#42a4f5" }}>{cell?.row?.original?.entityName}</span>
        </div>
      ),
    },
    {
      Header: t("list.EntityCodeText"),
      accessor: "entitycode",
      Cell: ({ cell }) => cell.row.original?.entitycode || "N/A",
    },
    {
      Header: t("list.AddressText"),
      accessor: "address",
      Cell: ({ cell }) => cell.row.original?.address || "N/A",
    },
    {
      Header: t("list.DistrictText"),
      accessor: "district",
      Cell: ({ cell }) => cell.row.original?.district || "N/A",
    },
    {
      Header: t("list.PincodeText"),
      accessor: "pinCode",
      Cell: ({ cell }) => cell.row.original?.pinCode || "N/A",
    },
    mappedRoles && mappedRoles.includes("update_rto")
      ? {
          Header: t("list.ActionText"),
          Cell: ({ cell }) => (
            <div
              title="Edit"
              style={{
                display: "flex",
                margin: "0px 5px",
                color: "white",
                backgroundColor: "#2162B2",
                width: "max-content",
                padding: "5px 10px",
                cursor: "pointer",
                alignItems: "center",
              }}
              onClick={() => navigate(`/rtos/updateRTO/${cell?.row?.original?.id}`)}
            >
              <MdOutlineEdit size={15} /> Edit
            </div>
          ),
        }
      : {
          Header: "Status",
          accessor: "status",
          Cell: "active",
        },
  ];

  return (
    <div>
      <div className="table-header-section">
        <p className="table-listp">RTO LIST</p>
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
      ) : (
        <div className="table-lit">
          <ListTable dataList={rtos} columns={column} />
        </div>
      )}
    </div>
  );
};
