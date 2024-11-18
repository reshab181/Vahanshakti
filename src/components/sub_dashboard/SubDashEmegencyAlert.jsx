// import React from 'react'

// const SubDashEmegencyAlert = () => {
//   return (
//     <div>SubDashEmegency</div>
//   )
// }

// export default SubDashEmegencyAlert

import React, { useState, useEffect, useRef } from 'react';
import { FaChevronRight, FaSearch } from 'react-icons/fa';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import { SiMicrosoftexcel } from 'react-icons/si';
import MAPLayout  from '../map';

const SubDashEmergencyAlert = () => {
  // State to track whether the alarm is ON or OFF
  const [alarmOn, setAlarmOn] = useState(false);

  // State for input fields
  const [responseStatus, setResponseStatus] = useState('');
  const [dateTimeFrom, setDateTimeFrom] = useState('');
  const [dateTimeTo, setDateTimeTo] = useState('');

  // Function to toggle the alarm state
  const toggleAlarm = () => {
    setAlarmOn(!alarmOn);
  };

  const data = [
    {
      signalId: 1,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 2,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 3,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 4,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 5,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 6,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 7,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 8,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',

      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 9,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    {
      signalId: 10,
      vehicleNo: 'ABC123',
      mobileNo: '1234567890',
      panicData: 'Emergency Alert',
      serverLogDate: '2023-10-01 10:30 AM',
      packetStatus: 'Received',
      sendToNersStatus: 'Sent',
      dateSendToNers: '2023-10-01',
      smsSendToOwnerStatus: 'Sent',
      emergencyStatus: 'Active',
    },
    // Add more data rows as needed
  ];

  // Function to handle the fetch button click
  const handleFetchClick = () => {
    // Perform the fetch operation or any other desired action here
    console.log('Fetching data...');
    console.log('NERS Response Status:', responseStatus);
    console.log('Date and Time From:', dateTimeFrom);
    console.log('Date and Time To:', dateTimeTo);
  };

  const chartRef = useRef(null);


  // Sample data for two series


  
useEffect(() => {
  // Chart dimensions and margins
  const width = 600;
  const height = 400;
  const margin = { top: 30, right: 50, bottom: 50, left: 70 };

  // Data
  const labels = ["19-02-2023", "20-02-2023", "21-02-2023", "22-02-2023", "23-02-2023", "24-02-2023", "25-02-2023"];
  const line1Data = [182, 119, 75, 69, 94, 136, 392];
  const line2Data = [182, 119, 75, 69, 45, 69, 392];

  // Create SVG element
  const svg = d3
    .select(chartRef.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create scales
  const xScale = d3
    .scalePoint()
    .domain([0, ...labels])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 500])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Create x-axis
  const xAxis = d3.axisBottom(xScale)
    .tickValues([0, ...labels]);
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

  // Create y-axis
  const yAxis = d3.axisLeft(yScale)
    .tickValues(d3.range(0, 501, 100)); // Set tick values at intervals of 100
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis);

  // Create lines
  const lineGenerator = d3.line()
    .x((d, i) => xScale(labels[i]))
    .y((d) => yScale(d))
    .curve(d3.curveLinear);

  svg
    .append("path")
    .datum(line1Data)
    .attr("class", "line1")
    .attr("fill", "none")
    .attr("stroke", "rgba(54, 162, 235, 0.6)")
    .attr("stroke-width", 2)
    .attr("d", lineGenerator);

  svg
    .append("path")
    .datum(line2Data)
    .attr("class", "line2")
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2)
    .attr("d", lineGenerator);

  // Create data points
  svg
    .selectAll(".point")
    .data(line1Data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", (d, i) => xScale(labels[i]))
    .attr("cy", (d) => yScale(d))
    .attr("r", 5)
    .style("fill", "rgba(54, 162, 235, 0.6)");

  svg
    .selectAll(".point")
    .data(line2Data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", (d, i) => xScale(labels[i]))
    .attr("cy", (d) => yScale(d))
    .attr("r", 5)
    .style("fill", "rgba(255, 99, 132, 0.6)");

}, []);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const [searchTerm, setSearchTerm] = useState('');

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const filterData = (data, searchTerm) => {
  return data.filter((item) =>
    item && item.vehicleNo && item.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="sub-dash-emergency">
      <div>
        <button className='Alarm' onClick={toggleAlarm}>
          <FaChevronRight />
          {alarmOn ? ' Alarm OFF' : 'Alarm ON'}
        </button>
      </div>

      <div className='EmergencyAlert-inputs'>
        <div className='emergency-input'>
          <label htmlFor="responseStatus">NERS/ERSS Response Status:</label>
          <input
            type="text"
            id="responseStatus"
            value={responseStatus}
            onChange={(e) => setResponseStatus(e.target.value)}
          />
        </div>
        <div className='emergency-input'>
          <label htmlFor="dateTimeFrom">(Date and Time) From:</label>
          <input
            type="text"
            id="dateTimeFrom"
            placeholder='dd-mm-yy  hh:mm'
            value={dateTimeFrom}
            onChange={(e) => setDateTimeFrom(e.target.value)}
          />
        </div>
        <div className='emergency-input'>
          <label htmlFor="dateTimeTo"> To:</label>
          <input
            type="text"
            id="dateTimeTo"
            placeholder='dd-mm-yy  hh:mm'
            value={dateTimeTo}
            onChange={(e) => setDateTimeTo(e.target.value)}
          />
        </div>
        <div>
          <button className="fetch-button" onClick={handleFetchClick}>
            <FaSearch /> Fetch
          </button>
        </div>
        <div className="legends">
          <div className="legend">
            <span className="legend-icon legend-success">✓</span>
            <span>Success</span>
          </div>
          <div className="legend">
            <span className="legend-icon legend-failed">✗</span>
            <span>Failed</span>
          </div>
          <div className="legend">
            <span className="legend-icon legend-pending">⏳</span>
            <span>Pending</span>
          </div>
        </div>
      </div>
      <div>
        <table className='emergency-table'>
          <thead>
            <tr>
              <th>SignalId</th>
              <th>VehicleNo</th>
              <th>MobileNo</th>
              <th>Panic Date(As per VLTD)</th>
              <th>ServerLogDate</th>
              <th>PacketStatus</th>
              <th>Sendto NERS Status</th>
              <th>Date(Send to NERS)</th>
              <th>SMS sendtoOwnerStatus</th>
              <th>EmergencyStatus</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
    <tr key={item.signalId}>
                <td>{item.signalId}</td>
                <td>{item.vehicleNo}</td>
                <td>{item.mobileNo}</td>
                <td>{item.panicData}</td>
                <td>{item.serverLogDate}</td>
                <td>{item.packetStatus}</td>
                <td>{item.sendToNersStatus}</td>
                <td>{item.dateSendToNers}</td>
                <td>{item.smsSendToOwnerStatus}</td>
                <td>{item.emergencyStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='emergency-data'>
        <div className="scatter-plot">
          <svg width="600" height="400" ref={chartRef}></svg>
        </div>
        <div className="table-list">
          <div className='excel-emergency'>
            <h3>Total Emergency Alert Vehicle wise details</h3>
            <button className='download-btn-container'>
              Export to excel <SiMicrosoftexcel />
            </button>
          </div>
          <div className="emergency-search">
            <div className="left-side-bars">
              <label>Show </label>
              <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
                <option>10</option>
                <option>20</option>
                <option>30</option>

              </select>
              <label>enteries</label>
            </div>
            <div className="right-side-bars">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
          </div>
          <table id="customers">
            <tr>
              <th>Vehicle No</th>
              <th>IMEI</th>
              <th>Vendor ID</th>
              <th>Owner Mobile No</th>
              <th>ALert Count</th>

            </tr>
            <tr>

              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>



            </tr>
            <tr>

              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
            <tr>
              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>

              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
            <tr>

              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
            <tr>

              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
            <tr>

              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
            <tr>

              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
            <tr>

              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
            <tr>
              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
            <tr>

              <Link to={'/vehicle-track'}><td>GFT646466d</td></Link>
              <td>174748857</td>
              <td>PNVE</td>
              <td>7678745534</td>
              <td>10</td>

            </tr>
          </table>
          <div className="combined-container">
       
        <div className="entries-info">
          Showing {indexOfFirstItem + 1} to{' '}
          {Math.min(indexOfLastItem, filteredData.length)} out of{' '}
          {filteredData.length} entries
        </div>
        <div className="pagination">
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
       </div>
        </div>
      </div>
      <MAPLayout />
    </div>
  );
}

export default SubDashEmergencyAlert