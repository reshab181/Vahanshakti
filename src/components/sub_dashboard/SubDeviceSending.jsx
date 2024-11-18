import React, { useState } from 'react';
import {MdOutlineGpsFixed} from 'react-icons/md'
import {GiNetworkBars} from 'react-icons/gi'
import {PiEngine} from 'react-icons/pi'
import {BsBatteryFull} from 'react-icons/bs'
import {ImLocation} from 'react-icons/im'
import {MdOutlineSpatialTracking} from 'react-icons/md'
import './CSS/SubDash.css';

const SubDeviceSending = () => {

  const [activeTab, setActiveTab] = useState('Tabular View');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='device-sending-container'>
      <div className='device-sending-container-nav'>
        <div>
          <div className='select-label-bottom-margin'><label htmlFor="alerts">Alerts</label></div>
          <select id='alerts'>
            <option value="">Select Alert</option>
          </select>
        </div>
        <div>
          <div className='select-label-bottom-margin'><label htmlFor="search">Geographical Search</label></div>
          <select id="search">
            <option value="">All</option>
          </select>
        </div>
      </div>

      <div className="tab-buttons">
        <button
          onClick={() => handleTabClick('Tabular View')}
          className={activeTab === 'Tabular View' ? 'active' : ''}
        >
          Tabular View
        </button>
        <button
          onClick={() => handleTabClick('Chart View')}
          className={activeTab === 'Chart View' ? 'active' : ''}
        >
          Chart View
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'Tabular View' && <TabularForm />}
        {activeTab === 'Chart View' && <ChartForm />}
      </div>
    </div>
  );
};

const TabularForm = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const data = [
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
    { IMEINo: '865006046588162', VehicleNo: 'UK01TA4240', OwnerMobileNo:"7645342335",DateAndTime:"12/01/2023 01:20:32 PM",ServerDateAndTime:"22/04/2023 04:20:32 PM",Speed:"0",LastAlert:"Location Update",GSM:<GiNetworkBars fill='#3eaff0'/>,GPS:<MdOutlineGpsFixed fill='#3ef0d5'/>,Engine:<PiEngine fill='yellowgreen'/>,Battery:<BsBatteryFull fill='green'/>,CurrentLocation:<ImLocation fill='green'/>,HistoryTracking:<MdOutlineSpatialTracking fill='red'/>},
  ];

  // Filter the data based on the search term
  const filteredData = data.filter(item =>
    item.VehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to change the number of items per page
    const changeItemsPerPage = (newItemsPerPage) => {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Reset to the first page when changing items per page
    };

     // Function to generate an array of page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const maxPageNumbers = 5; // Change this to adjust the number of page numbers displayed

    if (totalPages <= maxPageNumbers) {
      // If there are fewer pages than maxPageNumbers, display all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Display a subset of page numbers with ellipsis
      const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
      const leftOffset = currentPage - halfMaxPageNumbers;
      const rightOffset = currentPage + halfMaxPageNumbers;

      if (currentPage <= halfMaxPageNumbers) {
        // Display page numbers from 1 to maxPageNumbers with ellipsis at the end
        for (let i = 1; i <= maxPageNumbers - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - halfMaxPageNumbers) {
        // Display page numbers with ellipsis at the beginning and from totalPages - maxPageNumbers + 3 to totalPages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - maxPageNumbers + 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Display page numbers with ellipsis on both sides
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = leftOffset; i <= rightOffset; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className='tabular-content-container'>
    <div className='tabular-content-header-section'>
      <h3>Device Sending Data Status</h3>
      <button className='excel-export-button'>Export as Excel</button>
    </div>
    <div className="tabular-content-table-header">
      <div className="items-per-page">
          Show:
          <select
            value={itemsPerPage}
            onChange={(e) => changeItemsPerPage(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          entries
      </div>
      <input
        type="text"
        placeholder="Search by Vehicle No"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div  className="tabular-content-data-table">
    <table >
      <thead>
        <tr>
          <th>S. No</th>
          <th>IMEI No</th>
          <th>Vehicle No</th>
          <th>Owner Mobile No</th>
          <th>Date & Time</th>
          <th>Server Date & Time</th>
          <th>Speed(KM/H)</th>
          <th>Last Alert</th>
          <th>GSM</th>
          <th>GPS</th>
          <th>Engine  </th>
          <th>Battery</th>
          <th>Current Location</th>
          <th>History Tracking</th>
        </tr>
      </thead>
      <tbody>
      {/* { IMEINo: 'ABC123', VehicleNo: '1234567890', OwnerMobileNo:"HGYET763h",DateAndTime:"Chandan",ServerDateAndTime:"Motor CAB",Speed:"2",LastAlert:"",GSM:"",GPS:"",Engine:"",Battery:"",CurrentLocation:"",HistoryTracking:""}, */}
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td>{indexOfFirstItem + index + 1}</td>
            <td>{item.IMEINo}</td>
            <td>{item.VehicleNo}</td>
            <td>{item.OwnerMobileNo}</td>
            <td>{item.DateAndTime}</td>
            <td>{item.ServerDateAndTime}</td>
            <td>{item.Speed}</td>
            <td>{item.LastAlert}</td>
            <td>{item.GSM}</td>
            <td>{item.GPS}</td>
            <td>{item.Engine}</td>
            <td>{item.Battery}</td>
            <td>{item.CurrentLocation}</td>
            <td>{item.HistoryTracking}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

    <div className="pagination">
      <div className="page-info">
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
      </div>
      <ul className="page-numbers"> 
      <li>
        <button
          onClick={() => paginate(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
      {getPageNumbers().map((pageNumber, index) => (
        <li key={index}>
          {pageNumber === '...' ? (
            <span>{pageNumber}</span>
          ) : (
            <button
              onClick={() => paginate(pageNumber)}
              className={currentPage === pageNumber ? 'active-page' : ''}
            >
              {pageNumber}
            </button>
          )}
        </li>
      ))}
      <li>
        <button
          onClick={() =>
            paginate(Math.min(currentPage + 1, Math.ceil(filteredData.length / itemsPerPage)))
          }
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
        >
          Next
        </button>
      </li>
    </ul>
    </div>
  </div>
  );
};

const ChartForm = () => {
  return <div>Chart Form Content</div>;
};

export default SubDeviceSending;