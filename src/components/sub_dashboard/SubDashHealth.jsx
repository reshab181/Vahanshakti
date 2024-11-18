import React from 'react'
import { AiOutlineFilePdf } from 'react-icons/ai';
import { SiMicrosoftexcel } from 'react-icons/si';
import { useState } from 'react';
const SubDashHealth = () => {
  const data = [
    {
      imei: '123456789',
      vendorId: 'Vendor A',
      firmwareVersion: '1.0',
      batteryPercentage: '75%',
      lowBatteryThreshold: '20%',
      memoryPercentage: '30%',
      dataUpdateWhenIgnitionOn: 'Enabled',
      dataUpdateWhenIgnitionOff: 'Disabled',
      historyTracking: 'Enabled',
    },
    {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    },
    {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    },
    {
      imei: '123456789',
      vendorId: 'Vendor A',
      firmwareVersion: '1.0',
      batteryPercentage: '75%',
      lowBatteryThreshold: '20%',
      memoryPercentage: '30%',
      dataUpdateWhenIgnitionOn: 'Enabled',
      dataUpdateWhenIgnitionOff: 'Disabled',
      historyTracking: 'Enabled',
    }, {
      imei: '123456789',
      vendorId: 'Vendor A',
      firmwareVersion: '1.0',
      batteryPercentage: '75%',
      lowBatteryThreshold: '20%',
      memoryPercentage: '30%',
      dataUpdateWhenIgnitionOn: 'Enabled',
      dataUpdateWhenIgnitionOff: 'Disabled',
      historyTracking: 'Enabled',
    }, {
      imei: '123456789',
      vendorId: 'Vendor A',
      firmwareVersion: '1.0',
      batteryPercentage: '75%',
      lowBatteryThreshold: '20%',
      memoryPercentage: '30%',
      dataUpdateWhenIgnitionOn: 'Enabled',
      dataUpdateWhenIgnitionOff: 'Disabled',
      historyTracking: 'Enabled',
    }, {
      imei: '123456789',
      vendorId: 'Vendor A',
      firmwareVersion: '1.0',
      batteryPercentage: '75%',
      lowBatteryThreshold: '20%',
      memoryPercentage: '30%',
      dataUpdateWhenIgnitionOn: 'Enabled',
      dataUpdateWhenIgnitionOff: 'Disabled',
      historyTracking: 'Enabled',
    },
    {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    }, {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    }, {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    }, {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    },
    {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    }, {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    }, {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    }, {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    }, {
      imei: '987654321',
      vendorId: 'Vendor B',
      firmwareVersion: '2.0',
      batteryPercentage: '90%',
      lowBatteryThreshold: '15%',
      memoryPercentage: '40%',
      dataUpdateWhenIgnitionOn: 'Disabled',
      dataUpdateWhenIgnitionOff: 'Enabled',
      historyTracking: 'Disabled',
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filterData = (data, searchTerm) => {
    return data.filter((item) =>
      item.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const filteredData = filterData(data, searchTerm);
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5; // Maximum number of page buttons to show
    if (totalPages <= maxButtonsToShow) {
      // If there are less than or equal to maxButtonsToShow pages, show all buttons
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={i === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Otherwise, show a range of buttons with ellipsis
      const halfMaxButtonsToShow = Math.floor(maxButtonsToShow / 2);
      const firstButton = Math.max(currentPage - halfMaxButtonsToShow, 1);
      const lastButton = Math.min(
        currentPage + halfMaxButtonsToShow,
        totalPages
      );
      if (currentPage - halfMaxButtonsToShow > 1) {
        buttons.push(
          <button
            key="first"
            className={1 === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        if (currentPage - halfMaxButtonsToShow > 2) {
          buttons.push(<span key="ellipsis1">...</span>);
        }
      }
      for (let i = firstButton; i <= lastButton; i++) {
        buttons.push(
          <button
            key={i}
            className={i === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
      if (currentPage + halfMaxButtonsToShow < totalPages) {
        if (currentPage + halfMaxButtonsToShow < totalPages - 1) {
          buttons.push(<span key="ellipsis2">...</span>);
        }
        buttons.push(
          <button
            key="last"
            className={totalPages === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }
    return buttons;
  };
  return (
    <div className="Health-data-vehicle">
      <div className="container">
        <div className="left">
          <select className="vendor-select">
            <optgroup label="Select Vendor">
              <option value="option1">Select Vendor</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </optgroup>
          </select>
        </div>
        <div className="right">
          <div className="download-btn-container">
            <button>
              Download as <SiMicrosoftexcel />
            </button>
            <button>
              Download as <AiOutlineFilePdf />
            </button>
          </div>
        </div>
      </div>
      <div className="health-monitoring-table">
        <h2>Health Monitoring Data Details</h2>
        <div className="search-bar">
          <div className="left-side-bar">
            <label>Show</label>
            <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
            <label>entries</label>
          </div>
          <div className="right-side-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="monitoring-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>IMEI</th>
              <th>VendorID</th>
              <th>FirmwareVersion</th>
              <th>BatteryPercentage</th>
              <th>LowBatteryThresholdValue</th>
              <th>MemoryPercentage</th>
              <th>DataUpdateWhenIgnitionOn</th>
              <th>DataUpdateWhenIgnitionOFF</th>
              <th>HistoryTracking</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.imei}</td>
                <td>{item.vendorId}</td>
                <td>{item.firmwareVersion}</td>
                <td>{item.batteryPercentage}</td>
                <td>{item.lowBatteryThreshold}</td>
                <td>{item.memoryPercentage}</td>
                <td>{item.dataUpdateWhenIgnitionOn}</td>
                <td>{item.dataUpdateWhenIgnitionOff}</td>
                <td>{item.historyTracking}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="paginations">
          {currentPage > 1 ? (
            <button
              className="prev-btn"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          ) : (
            <button className="prev-btn" disabled>
              Previous
            </button>
          )}
          {renderPaginationButtons()}
          {currentPage < totalPages && (
            <button
              className="next-btn"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
        <div className="entries-info">
          Showing {indexOfFirstItem + 1} to{' '}
          {Math.min(indexOfLastItem, filteredData.length)} out of{' '}
          {filteredData.length} entries
        </div>
      </div>
    </div>
  );
};
export default SubDashHealth;