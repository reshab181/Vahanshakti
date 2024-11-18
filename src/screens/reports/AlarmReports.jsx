import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
// import ListTable from "../../components/Common/Listtable/ListTable";
// import { getAllAlarm } from "../../apis/dashboard";
import { getBeforeDate, getCurrentDate } from "../../components/Common/PowerUpFunctions";
import '../deviceInventory/activateDevice.css'
// import { getDevicesWithAlarmReport } from "../../apis/reports";
//import { ListTableAlarms } from "../../components/Common/ListTableBP/ListTableAlarms";
// import { alarmsMap } from "../../constants/alarmMap";
import ListTableAlarms from "../../components/Common/ListTableBP/ListTableAlarms";
import { BaseURL } from "../../constants/baseURL";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AlarmReports = () => {
  const navigate = useNavigate()
  const [changeData, setChangeData] = useState(null)
  const [fromDate, setFromDate] = useState(getBeforeDate(90));
  const [uptoDate, setUptoDate] = useState(getCurrentDate());
  const [showTable, setShowTable] = useState(false);

  useEffect(()=>{
    if(uptoDate && fromDate){
      setShowTable(true)
    }
  },[fromDate, uptoDate])  

  const column = [
    {
    Header: 'Device Serial No',
    accessor: "deviceSerialNo",
    // Cell: ({cell}) => (cell?.row?.original?.deviceSerialNo || ''),
    Cell: ({ cell }) => <>
    <div onClick={() => navigate(`/reports/alarmReportsDetails/${cell?.row?.original?.intuchEntityId}`, { state: cell?.row?.original })} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
      <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.deviceSerialNo}</span>
    </div>
  </>
  },
  {
    Header: "IMEI No",
    accessor: 'imeiNo',
    Cell: ({cell}) => (cell?.row?.original?.imeiNo || '')
  },
  {
    Header: "VRN",
    accessor: 'vehicleRegistrationNumber',
    Cell: ({cell}) => (cell?.row?.original?.vehicleRegistrationNumber || '')
  },
  {
    Header: "SOS Press",
    accessor: 'emergencyAlertON',
    Cell: ({cell}) => (cell?.row?.original?.emergencyAlertON || 0)
  },
  {
    Header: "SOS Tamper",
    accessor: 'sosTamper',
    Cell: ({cell}) => (cell?.row?.original?.sosTamper || 0)
  },
  {
    Header: "Device Tamper",
    accessor: 'deviceOpen',
    Cell: ({cell}) => (cell?.row?.original?.deviceOpen || 0)
  },
  {
    Header: "Over Speed",
    accessor: 'overSpeeding',
    Cell: ({cell}) => (cell?.row?.original?.overSpeeding || 0)
  }

  ]

  const handleSearch = (e) => {
    e.preventDefault()
    let todayDate = getCurrentDate()

    if (fromDate > uptoDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'From date must be less than Upto Date'
      })
      return;
    }

    if (uptoDate > todayDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Upto date must be less than or equal to Today's Date"
      })
      return;
    }

    if (uptoDate < fromDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Upto date must be greater or equal to From Date'
      })
      return;
    }
    setShowTable(true)
  }


  return (
    <>
      <form className="filter_container">

        <div className="field_wrapper">
          <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={fromDate}
            onChange={(e) => (
              setFromDate(e.target.value), setUptoDate(getCurrentDate())
            )}
            max={getCurrentDate()}
            id=""
          />
        </div>

        <div className="field_wrapper">
          <label htmlFor="uptoDate">Upto Date:</label>
          <input
            type="date"
            name="uptoDate"
            value={uptoDate}
            onChange={(e) => setUptoDate(e.target.value)}
            disabled={fromDate === ""}
            min={fromDate}
            max={getCurrentDate()}
            id=""
          />
        </div>

        <div className="filter_button" onClick={handleSearch}>
          <span>
            <FaFilter size={18} fill="#fff" />
          </span>
          <span>Search</span>
        </div>

      </form>
      {showTable ? 
      <div style={{marginTop:"10px"}}>

      <ListTableAlarms
              api={`${BaseURL}/DeviceInventory/getalldevicelistv2?eid=-1&fromDt=${fromDate}&toDt=${uptoDate}&locate=1&cttatus=1&status=1&`}
              method="GET"
              columns={column}
              changeData={changeData}
              // getData={(data) => setDataList(data?.devicelist)}
            /> 
      </div>
          : null} 
    </>
  );
};
export default AlarmReports;







