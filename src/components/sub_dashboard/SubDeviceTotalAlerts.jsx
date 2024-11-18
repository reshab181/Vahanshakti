import React, { useState } from 'react';
import {MdOutlineGpsFixed} from 'react-icons/md'
import {GiNetworkBars} from 'react-icons/gi'
import {PiEngine} from 'react-icons/pi'
import {BsBatteryFull} from 'react-icons/bs'
import {ImLocation} from 'react-icons/im'
import {MdOutlineSpatialTracking} from 'react-icons/md'
import './CSS/SubDash.css';

const SubDeviceTotalAlerts = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const data = [
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
    {VehicleRegNo: 'UK01TA4240', IMEINo: '865006046588162', DeviceSrNo:"ITR1B1048756657483",ChassisNo:"MAT474757858H847",OwnerName:"Chandan",OwnerMobileNo:"7645342335",TotalAlerts:"5",VendorID:"ITRIANGLE",ManufacturerName:"ITRIANGLE PVT LTD",RegistrationOffice:"RTO Office, Dehradun"},
  ];

  // Filter the data based on the search term
  const filteredData = data.filter(item =>
    item.VehicleRegNo.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className='device-TotalAlert-container'>
      <div className='device-TotalAlert-container-nav'>
        <div>
          <div className='select-label-bottom-margin'><label htmlFor="alerts">Select Alert Types</label></div>
          <select id='alerts'>
            <option value="">Device Tempered</option>
          </select>
        </div>
        <div>
          <div className='select-label-bottom-margin'><label htmlFor="search">(Date & Time) From</label></div>
          <select id="search">
            <option value="">All</option>
          </select>
        </div>
        <div>
          <div className='select-label-bottom-margin'><label htmlFor="search">(Date & Time) To</label></div>
          <select id="search">
            <option value="">All</option>
          </select>
        </div>
      </div>
      <div className='table-content-alert-container'>
        <div className='table-content-header-section'>
          <h3>Vehicle Wise Total Alerts</h3>
          <button className='excel-export-button'>Export as Excel</button>
        </div>
        <div className="table-content-table-header">
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
        <div  className="table-content-data-table">
        <table >
          <thead>
            <tr>
              <th>S. No</th>
              <th>Vehicle Reg No</th>
              <th>IMEI No</th>
              <th>Device Sr No</th>
              <th>Chassis No</th>
              <th>Owner Name</th>
              <th>Owner Mobile No</th>
              <th>Total Alerts</th>
              <th>Vendor ID</th>
              <th>Manufacturer Name</th>
              <th>Registration Office</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.VehicleRegNo}</td>
                <td>{item.IMEINo}</td>
                <td>{item.DeviceSrNo}</td>
                <td>{item.ChassisNo}</td>
                <td>{item.OwnerName}</td>
                <td>{item.OwnerMobileNo}</td>
                <td>{item.TotalAlerts}</td>
                <td>{item.VendorID}</td>
                <td>{item.ManufacturerName}</td>
                <td>{item.RegistrationOffice}</td>
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
    </div>
  );
};

export default SubDeviceTotalAlerts;