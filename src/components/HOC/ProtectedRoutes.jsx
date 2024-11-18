import { Navigate } from "react-router-dom";
import './layout.css'
import { useEffect, useState } from "react";
import './notification.css'
import { Route, Routes } from 'react-router-dom';


import { DashBoard } from '../../screens/dashboard/dashBoard.jsx';
import Reports from '../../screens/reports/reports.jsx';
import { NotFound } from './NotFound.jsx';


import RTO from '../../screens/rto/rto.jsx';
import { RTOList } from '../../screens/rto/rtoList.jsx';
import { AddRTO } from '../../screens/rto/rtoAdd.jsx';
import { ViewRTODetails } from '../../screens/rto/viewRTODetail.jsx';


import Police from '../../screens/Police/Police.jsx'
import { ListPolice } from '../../screens/Police/ListPolice.jsx';
import { CreatePoliceLog } from '../../screens/Police/createPoliceLog.jsx';
import { PoliceDetails } from '../../screens/Police/PoliceDetails.jsx';


import Masters from '../../screens/masters/masters.jsx';
import { AddESIMProviders } from '../../screens/masters/addESIMproviders.jsx';
import { ESIMProviderList } from '../../screens/masters/listESIMproviders.jsx';
import { AddApprovingAuthority } from '../../screens/masters/addApprovingAuthority.jsx';
import { ApprovingAuthorityList } from '../../screens/masters/listApprovingAuthority.jsx';
import { ViewDeviceAuthority } from '../../screens/masters/viewDeviceAuthority.jsx';
import { ViewEsimProviderDetails } from '../../screens/masters/viewEsimProviderDetails.jsx';


import Manufacturer from '../../screens/manufacturers/manufacturer.jsx';
import { AddManufacturer } from '../../screens/manufacturers/manufacturerAdd.jsx';
import { ManufacturerList } from '../../screens/manufacturers/manufacturersList.jsx';
import Empanelment from '../../screens/manufacturers/Empanelment.jsx';
import { ManufactureOnboarding } from '../../screens/dashboard/manfOnboarding.jsx';
import {ViewManufacturerDetail} from '../../screens/manufacturers/viewManufactureDetails.jsx';


import Distributor from '../../screens/distributors/distributor.jsx';
import { AddDistributor } from '../../screens/distributors/distributorAdd.jsx';
import { DistributorList } from '../../screens/distributors/distributorsList.jsx';
import {ViewDistributorDetail} from '../../screens/distributors/viewDistributorDetail.jsx';


import User from '../../screens/userManagement/user.jsx';
import { AddUser } from '../../screens/userManagement/userAdd.jsx';
import { ModifyUser } from "../../screens/userManagement/userModify.jsx";
import { UserList } from '../../screens/userManagement/userList.jsx';
import UserDetails from '../../screens/userManagement/userDetails.jsx';
import AddRoles from "../../screens/userManagement/AddRoles.jsx";
import Responsibility from "../../screens/responsibility/Responsibility.jsx";


import DeviceApproval from '../../screens/deviceApproval/deviceApproval.jsx';
import { DeviceApprovalList } from '../../screens/deviceApproval/deviceApprovalList.jsx';
import { AddDeviceApproval } from '../../screens/deviceApproval/deviceApprovalAdd.jsx';
import { DeviceApprovedStatus } from '../../screens/deviceApproval/DeviceApprovedStatus.jsx';
import { DeviceDetailsTesting } from '../../screens/deviceApproval/DeviceDetailsTesting.jsx';
//import DeviceTest from '../../screens/deviceApproval/DeviceTest.jsx';
import { ViewDeviceApprovalDetail } from '../../screens/deviceApproval/viewDeviceApprovalDetail.jsx';


import DeviceInventory from '../../screens/deviceInventory/deviceInventory.jsx';
import { AddDeviceInventory } from '../../screens/deviceInventory/addDeviceInventory.jsx';
import { DeviceActivation } from '../../screens/deviceInventory/activateDevice.jsx';
import { DeviceActivationVahan } from '../../screens/deviceInventory/ActivateVahan.jsx';
import { CTDeviceInventory } from '../../screens/deviceInventory/CTDeviceInventory.jsx';
import { DeviceInventoryListRfcAssign } from '../../screens/deviceInventory/DeviceInventoryListRfcAssign.jsx';
import { DeviceInventoryList } from '../../screens/deviceInventory/DeviceInventoryList.jsx';
import { DeviceDetails } from '../../screens/deviceInventory/viewDeviceDetails.jsx';
import {VLTDDeactivation} from '../../screens/deviceInventory/VLTDDeactivation.jsx';
import { DeviceNMRDetails } from "../../screens/deviceInventory/deviceNMRDetails.jsx";


import WhiteListedIMEI from '../../screens/RFC/WhiteListedIMEI.jsx';
import ActivatedVLTDLIST from '../../screens/RFC/ActivatedVLTDList.jsx';
import DeviceDetailsPdf from '../../screens/RFC/DeviceDetailsPdf.jsx';

import DeactivateVLTDList from '../../screens/RFC/DeactivateVLTDList.jsx';
import { CommonLayout } from "./commonLayout.jsx";
import DeviceConfigure from "../../screens/deviceConfiguration/DeviceConfigure.jsx";
import Trails from "../../screens/deviceConfiguration/Trails.jsx";

import PermitHolderDetailLive from "../../screens/permitHolder/permitHolderDetailLive.jsx";
import AlertSubDash from "../AlertSubDash.jsx";
import ViewDeviceDetailAuth from "../../screens/deviceApproval/viewDeviceDetailAuth.jsx";
import AlarmIndex from "../../screens/Alarm/AlarmIndex.jsx";
import AlarmReports from "../../screens/reports/AlarmReports.jsx";
import ViewReportAlarmDetails from "../../screens/reports/ViewReportAlarmDetails.jsx";
import LogsIndex from "../../screens/reports/LogsIndex.jsx"; 
import ViewAlertSubDashDetail from "../../screens/dashboard/Components/viewAlertSubDashDetail.jsx";
import { getUserRoles } from "../../apis/users.js";
import {Reactivation} from "../../screens/deviceInventory/Reactivation.jsx";
import Deactivation from "../../screens/deviceInventory/Deactivation.jsx";
import LiveMap from "../../screens/deviceConfiguration/LiveMaps.jsx";
import { ReactivationVahan } from "../../screens/deviceInventory/ReactivationVahan.jsx";
import LongTrails from "../../screens/deviceConfiguration/LongTrail.jsx";
import RouteAssign from "../../screens/deviceConfiguration/RouteAssign.jsx";
import RouteConfigure from "../../screens/deviceConfiguration/RouteConfigure.jsx";
import AccidentInfoList from "../../screens/reports/AccidentReports/AccidentInfoList.jsx";
import SosInfoList from "../../screens/reports/AccidentReports/SosInfoList.jsx";
import DodList from "../../screens/reports/AccidentReports/DodList.jsx";
import AccidentInfo from "../../screens/reports/AccidentReports/AccidentInfo.jsx";
import SosInfo from "../../screens/reports/AccidentReports/SosInfo.jsx";
import AccidentInfoForm from "../../screens/Mobile/AccidentInfoForm.jsx";
import DodForm from "../../screens/Mobile/DodForm.jsx";
import DeviceReports from "../../screens/reports/DeviceReports.jsx";
import VehicleReports from "../../screens/reports/VehicleReports.jsx";
import ScheduledReports from "../../screens/reports/scheduledReports.jsx";
import DeviceDashboard from "../../screens/reports/DeviceDashboard.jsx";
import { ViewStateCityMaster } from "../../screens/masters/viewStateCityMaster.jsx";
import SosInfoForm from "../../screens/Mobile/SosInfoForm.jsx";
import { ManufacturerActivatedDevice } from "../../screens/deviceInventory/deviceInventoryPaages/ManfActivatedDevices.jsx";
import { ManufacturerDeviceNotSendingData } from "../../screens/deviceInventory/deviceInventoryPaages/ManfDevicesNotSendingData.jsx";
import ReportedViolations from "../../screens/reports/AccidentReports/ReportedViolations.jsx";
import SchoolBusManagement from "../../screens/deviceConfiguration/SchoolBusManagement.jsx";
import { DeviceRTOApproval } from "../../screens/deviceInventory/rtoApproval.jsx";
import RFCMaster from "../../screens/rfcMaster/rfcs.jsx";
import { AddRFC } from "../../screens/rfcMaster/rfcAdd.jsx";
import { RFCList } from "../../screens/rfcMaster/rfcList.jsx";
import { ViewRFCDetail } from "../../screens/rfcMaster/viewRFCDetail.jsx";
import GetRFCList from "../../screens/manufacturers/components/getRFCList.jsx";
import { CTDeviceInventoryApproved } from "../../screens/deviceInventory/CTDeviceInventoryApproved.jsx";
import { DeviceInventoryListRfcUserAssign } from "../../screens/deviceInventory/DeviceInventoryListRfcUserAssign.jsx";
import { DeviceInventoryListDSTUserAssign } from "../../screens/deviceInventory/DeviceInventoryListDSTUserAssign.jsx";
import ETS360Report from "../../screens/reports/AccidentReports/ets360Data.jsx";
import { DeviceInventoryListRfcReassign } from "../../screens/deviceInventory/DeviceInventoryListRfcReassign.jsx";

const dashboardReports = [
    { path: '/dashboard', element: <DashBoard />, users:["SUA", "SBU", "POLICE", "RTO", "MNF", "DST", "RFC"] },
    { path: '/subDashboard/:alertType', element: <AlertSubDash />, users:["SUA", "SBU", "POLICE", "RTO", "MNF", "DST", "RFC"] },
    { path: '/subDashboard/details/:ID', element: <ViewAlertSubDashDetail />, users:["SUA", "SBU", "POLICE", "RTO", "MNF", "DST"] },
    { path: "/configuration/geofence", element: <DeviceConfigure /> , users:["SUA", "SBU", "RTO", "POLICE"] },
    { path: "/configuration/trails", element: <Trails /> , users:["SUA", "SBU", "RTO", "POLICE"] },
    { path: "/configuration/longTrails", element: <LongTrails /> , users:["SUA", "SBU", "RTO", "POLICE"] },
    { path: "/configuration/alarms", element: <AlarmIndex /> , users:["SUA", "SBU", "RTO", "POLICE"] },
    { path: "/configuration/routeconfigure", element: <RouteConfigure /> , users:["SUA", "SBU", "RTO", "POLICE"] },
    { path: "/configuration/routeassign", element: <RouteAssign /> , users:["SUA", "SBU", "RTO", "POLICE"] },
    { path: "/permitHolder/details", element: <PermitHolderDetailLive/>, users:["SUA", "SBU", "RTO", "POLICE"]},
    { path: "/police/accidentInfoForm", element: <AccidentInfoForm />, users:["POLICE"] },
    { path: "/police/sosInfoForm", element: <SosInfoForm />, users:["SUA", "SBU", "POLICE"] },
    
  ]

  const permitHolderRoutes = [
    { path: '/dashboard', element: <DashBoard />, users:["PHOLDER"] },
    { path: "/permitHolder/dodForm", element: <DodForm />, users:["PHOLDER"]},
    { path: "/permitHolder/liveMap", element: <LiveMap />, users:["PHOLDER"]},
    { path: "/permitHolder/routeConfigure", element: <RouteConfigure />, users:["PHOLDER"]},
    { path: "/permitHolder/routeAssign", element: <RouteAssign />, users:["PHOLDER"]},
    { path: "/permitHolder/alarms", element: <AlarmIndex />, users:["PHOLDER"]},
    { path: "/permitHolder/geoFence", element: <DeviceConfigure />, users:["PHOLDER"]},
    { path: "/permitHolder/schoolManagement", element: <SchoolBusManagement />, users:["PHOLDER"]},
  ]


  const rtoRoutes = [
    { path: "/rtos/listRTO", element: <RTOList /> , users:["SUA", "SBU__rto_details", "POLICE__rto_details"]},
    { path: "/rtos/addRTO", element: <AddRTO /> , users:["SUA", "SBU__add_rto"] },
    { path: "/rtos/updateRTO/:id", element: <AddRTO />, users:["SUA", "SBU__update_rto"] },
    { path: "/rtos/details/:entityID", element: <ViewRTODetails /> , users:["SUA", "SBU__rto_details", "POLICE__rto_details"]},
  ]

  const mnfRoutes = [
    { path: "/manufacturers/listManufacturer", element: <ManufacturerList /> , users:["SUA", "SBU__manufacturer_details", "POLICE__manufacturer_details", "RTO__manufacturer_details"]},
    { path: "/manufacturers/listRFCs", element: <GetRFCList/> , users:["SUA", "SBU__manufacturer_details", "POLICE__manufacturer_details", "RTO__manufacturer_details","MNF__manufacturer_user_management"]},
    { path: "/manufacturers/addManufacturer", element: <AddManufacturer />, users:["SUA", "SBU__add_manufacturer", "MNF__add_manufacturer"] },
    { path: "/manufacturers/updateManufacturer/:id", element: <AddManufacturer />, users:["SUA", "SBU__update_manufacturer"] },
    { path: "/manufacturers/empanelment", element: <Empanelment />, users:["SUA", "SBU__update_manufacturer"] },
    { path: "/manufacturers/manufacturerDetails", element: <ViewManufacturerDetail />, users:["SUA","MNF__manufacturer_details", "SBU__manufacturer_details", "POLICE__manufacturer_details", "RTO__manufacturer_details"]},
    { path: "/manufacturers/empanelmentDetails", element: <ManufactureOnboarding /> , users:["SUA", "SBU__update_manufacturer"]},
  ]

  const policeRoutes = [
    { path: "/Police/addPolice", element: <CreatePoliceLog />, users:["SUA", "SBU__add_police"]},
    { path: "/Police/updatePolice/:id", element: <CreatePoliceLog />, users:["SUA", "SBU__add_police"] },
    { path: "/Police/listPoliceLog", element: <ListPolice /> , users:["SUA", "SBU__police_account_details", "RTO__police_account_details"]},
    { path: "/Police/details/:entityID", element: <PoliceDetails />, users:["SUA", "SBU__police_account_details", "RTO__police_account_details"]},
    
  ]

  const distributorRoutes = [
    { path: "/distributors/listDistributor", element: <DistributorList />, users:["SUA", "SBU__distributor_details", "POLICE__distributor_details", "RTO__distributor_details", "MNF__distributor_details"]},
    { path: "/distributors/addDistributor", element: <AddDistributor />, users:["SUA", "SBU__add_distributor"] },
    { path: "/distributors/updateDistributor/:id", element: <AddDistributor />, users:["SUA", "SBU__update_distributor"] },
    { path: "/distributors/distributorDetails", element: <ViewDistributorDetail />, users:["SUA", "SBU__distributor_details", "POLICE__distributor_details", "RTO__distributor_details", "MNF__distributor_details"] },
  ]

  const rfcRoutes = [
    { path: "/rfcMaster/listRFC", element: <RFCList />, users:["SUA", "SBU", "POLICE", "RTO", "MNF", "SBU__distributor_details", "POLICE__distributor_details", "RTO__distributor_details", "MNF__distributor_details"]},
    { path: "/rfcMaster/addRFC", element: <AddRFC />, users:["SUA", "SBU", "SBU__add_rfc"] },
    { path: "/rfcMaster/updateRFC/:id", element: <AddRFC />, users:["SUA", "SBU", "SBU__update_distributor"] },
    { path: "/rfcMaster/rfcDetails", element: <ViewRFCDetail />, users:["SUA", "SBU", "SBU__distributor_details", "POLICE__distributor_details", "RTO__distributor_details", "MNF__distributor_details"] },
  ]

  const masterRoutes = [
    
    { path: "/masters/listESIMProviders", element: <ESIMProviderList />, users:["SUA", "SBU__esim_provider_detail", "POLICE__esim_provider_detail", "RTO__esim_provider_detail", "AUTH__esim_provider_detail"] },
    { path: "/masters/addESIMProviders", element: <AddESIMProviders />, users:["SUA", "SBU__add_esim_provider"] },
    { path: "/masters/updateESIMProviders/:id", element: <AddESIMProviders /> , users:["SUA", "SBU__update_esim_provider"] },
    { path: "/masters/listApprovingAuthority", element: <ApprovingAuthorityList />, users:["SUA", "SBU__autority_details", "POLICE__autority_details", "RTO__autority_details"]  },
    { path: "/masters/addApprovingAuthority", element: <AddApprovingAuthority /> , users:["SUA", "SBU__add_autority"] },
    { path: "/masters/updateApprovingAuthority/:id", element: <AddApprovingAuthority /> , users:["SUA", "SBU__update_autority"] },
    { path: "/masters/viewDeviceAuthority/:authID", element: <ViewDeviceAuthority />, users:["SUA", "SBU__autority_details", "POLICE__autority_details", "RTO__autority_details", "AUTH__autority_details"]  },
    { path: "/masters/viewEsimDetails", element: <ViewEsimProviderDetails />, users:["SUA", "SBU__esim_provider_detail", "POLICE__esim_provider_detail", "RTO__esim_provider_detail", "AUTH__esim_provider_detail"]},
    { path: "/masters/stateCityMaster", element: <ViewStateCityMaster />, users:["SUA", "SBU", "POLICE", "RTO", "AUTH", "MNF", "DST"]},
  ]

  const deviceApprovalRoutes = [
    { path: "/deviceApproval/addDeviceType", element: <AddDeviceApproval />, users:["MNF__add_device_type"] },
    { path: "/deviceApproval/deviceTest/:mCode", element: <DeviceDetailsTesting />, users:["SUA","SBU__device_approval", "SBU__device_testing","MNF"] },
    { path: "/deviceApproval/deviceApprovalAllList", element: <DeviceApprovalList />, users:["SUA","SBU__device_approval", "SBU__device_testing", "MNF__approved_device_details","AUTH__device_approval","DST__approved_device_details", "RFC__approved_device_details"]  },
    { path: "/deviceApproval/controlTowerTesting", element: <DeviceApprovedStatus />, users:["SUA","SBU__device_approval", "SBU__device_testing", "MNF", "AUTH"]  },
    { path: "/deviceApproval/listDeviceApproval", element: <DeviceApprovedStatus />, users:["SUA","SBU__approved_device_details","SBU__approved_device_details", "MNF__approved_device_details","AUTH__device_approval"] },
    { path: "/deviceApproval/deviceApprovaldetails", element: <ViewDeviceApprovalDetail />, users:["SUA","SBU__device_approval","SBU__device_testing", "MNF","AUTH"] },    
    { path: "/deviceApproval/deviceApprovaldetailsAuth", element: <ViewDeviceDetailAuth />, users:["AUTH__approved_device_details"] },    
  ]


  const deviceInventoryRoutes = [
    { path: "/deviceInventory/addDeviceInventory", element: <AddDeviceInventory />, users:["MNF__add_device"]  },
    { path: "/deviceInventory/deviceInventoryList", element: <DeviceInventoryList />, users:["SUA", "SBU__view_list_of_devices", "POLICE__view_list_of_devices", "RTO__view_list_of_devices", "MNF__view_list_of_devices", "DST__view_list_of_devices", "RFC__view_list_of_devices"] },    
    { path: "/deviceInventory/ctApprovalInventory", element: <CTDeviceInventory />, users:["SBU__update_device_detail"] },
    { path: "/deviceInventory/ctApproved", element: <CTDeviceInventoryApproved />, users:["SBU__update_device_detail"] },
    { path: "/deviceInventory/details/:ID", element: <DeviceDetails />, users:["SUA", "SBU__device_detail", "POLICE__device_detail", "RTO__device_detail", "MNF__device_detail", "DST__device_detail", "RFC__device_detail"] },
    { path: "/deviceInventory/activateDevice", element: <DeviceActivation /> , users:["RFC__map_device_to_vehicle"]},
    { path: "/deviceInventory/activateDeviceVahan", element: <DeviceActivationVahan/>, users:["RFC__map_device_to_vehicle"] },
    { path: "/deviceInventory/rfcAssign", element: <DeviceInventoryListRfcAssign />, users:["DST__device_detail"] },
    { path: "/deviceInventory/rfcReassign", element: <DeviceInventoryListRfcReassign />, users:["DST__device_detail"] },
    { path: "/deviceInventory/reactivation", element: <Reactivation />, users:["RFC__device_detail"] },
    { path: "/deviceInventory/reactivationVahan", element: <ReactivationVahan />, users:["RFC__device_detail"] },
    { path: "/deviceInventory/deactivation", element: <VLTDDeactivation/>, users:["SBU__update_device_detail"] },
    { path: "/deviceInventory/liveMap", element: <LiveMap/>, users:["SUA", "SBU__device_detail", "POLICE__device_detail", "RTO__device_detail", "MNF__device_detail", "DST__device_detail", "RFC__device_detail"] },
    { path: "/deviceInventory/trails", element: <Trails /> , users:["SUA", "SBU__device_detail", "POLICE__device_detail", "RTO__device_detail", "MNF__device_detail", "DST__device_detail", "RFC__device_detail"] },
    { path: "/deviceInventory/whiteListedIMEI", element: <WhiteListedIMEI />, users:["RFC__map_device_to_vehicle"] },
    { path: "/deviceInventory/activatedVLTD", element: <ActivatedVLTDLIST />, users:["RFC__map_device_to_vehicle"] },
    { path: "/deviceInventory/printVltdList/:imei", element: <DeviceDetailsPdf />, users:["SUA", "SBU__device_detail", "POLICE__device_detail", "RTO__device_detail", "MNF__device_detail", "DST__device_detail", "RFC__device_detail"] },
    { path: "/deviceInventory/rtoApproval/:imei", element: <DeviceRTOApproval />, users:["RTO__device_detail"] },
    { path: "/deviceInventory/nmrDetails/", element: <DeviceNMRDetails />, users:["SUA", "SBU__device_detail", "POLICE__device_detail", "RTO__device_detail", "MNF__device_detail", "DST__device_detail", "RFC__device_detail"] },
    { path: "/deviceInventory/manfActivatedDevice/", element: <ManufacturerActivatedDevice />, users:["MNF__device_detail", "DST__device_detail", "RFC__device_detail"] },
    { path: "/deviceInventory/manfDeviceNotSendingData/", element: <ManufacturerDeviceNotSendingData />, users:["MNF__device_detail", "DST__device_detail", "RFC__device_detail"] },
    { path: "/deviceInventory/rfcUserAssign/", element: <DeviceInventoryListRfcUserAssign />, users:["RFC__device_detail"] },
    { path: "/deviceInventory/dstUserAssign/", element: <DeviceInventoryListDSTUserAssign />, users:["DST__device_detail"] },
    
    // { path: "/deviceInventory/printVltdList/:imei", element: <DeviceDetailsPdf />, users:["DST__device_detail"]},
    // { path: "/deviceInventory/deactivateVLTD", element: <DeactivateVLTDList />, users:["DST"] },
  ]
  
  
  const userRoutes = [
    { path: "/userManagement/listUser", element: <UserList />, users:["SUA", "SBU", "POLICE__police_user_management", "RTO__rto_user_management", "MNF__manufacturer_user_management", "DST__distributor_user_management", "AUTH__autority_user_management", "RFC__rfc_user_management"]},
    { path: "/userManagement/addUser", element: <AddUser />, users:["SUA", "SBU", "POLICE__police_user_management", "RTO__rto_user_management", "MNF__manufacturer_user_management", "DST__distributor_user_management", "AUTH__autority_user_management", "RFC__rfc_user_management"]},
    { path: "/userManagement/updateUser/:id", element: <ModifyUser /> , users:["SUA", "SBU", "POLICE__police_user_management", "RTO__rto_user_management", "MNF__manufacturer_user_management", "DST__distributor_user_management", "AUTH__autority_user_management", "RFC__rfc_user_management"]},
    { path: "/userManagement/userDetails/:ID", element: <UserDetails /> , users:["SUA", "SBU", "POLICE__police_user_management", "RTO__rto_user_management", "MNF__manufacturer_user_management", "DST__distributor_user_management", "AUTH__autority_user_management", "RFC__rfc_user_management"]},
    { path: "/userManagement/addRoles", element: <AddRoles />, users:["SBU__add_responsibility", "POLICE__police_user_management", "RTO__rto_user_management", "MNF__manufacturer_user_management", "DST__distributor_user_management", "AUTH__autority_user_management", "RFC__rfc_user_management"]},
  ]

  const reportRoutes = [
    { path: "/reports/alarmReports", element: <AlarmReports />, users:["SUA", "SBU", "RTO", "POLICE"] },
    { path: "/reports/alarmReportsDetails/:ID", element: <ViewReportAlarmDetails />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/vehicleReports", element: <VehicleReports />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/scheduleReports", element: <ScheduledReports />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/deviceDashboard", element: <DeviceDashboard />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/deviceReports", element: <DeviceReports />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/deviceReportsDetails/:ID", element: <ViewReportAlarmDetails />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/logs", element: <LogsIndex />, users:["SUA", "SBU"]  },
    { path: "/reports/accidentInfoList", element: <AccidentInfoList />, users:["SUA", "SBU", "RTO", "POLICE"] },
    { path: "/reports/sosInfoList", element: <SosInfoList />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/driversOnDutyList", element: <DodList />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/reportedViolations", element: <ReportedViolations />, users:["SUA", "SBU", "RTO", "POLICE"]  },
    { path: "/reports/ets360", element: <ETS360Report />, users:["SUA", "SBU", "POLICE"]  },
  ]

const ProtectedRoutes = () => {
    
    let token = sessionStorage.getItem("token")
    let userType = sessionStorage.getItem("userType") || null;
    let userDesignation = sessionStorage.getItem("designation")
    let userRoles = JSON.parse(sessionStorage.getItem("userRolesData")) || [0,1]
    let userTypeRoles = userRoles.map(item=>userType+"__"+item["code"])
    
    console.log(userRoles, "userTypeRoles")

    const checkPermissions = (itemList) => {
        let isPermssion = false
        
        for(let item of userTypeRoles){
      
            if(userType==="SUA" || (userType==="SBU" && userDesignation?.toLowerCase() === "admin") || (itemList.includes(item) && item !==userType)){
                isPermssion = true
                break
            }
        }

        return isPermssion        
    }
    

    useEffect(() => {
        sessionStorage.setItem('staticToggle', true)
    }, [])


    return (
        <>
            {token && userType && userTypeRoles?.length > 0 ? <Routes >

                        <Route element={<CommonLayout/>}>
                            {
                            dashboardReports?.map((elem, index) =>
                                <Route key={index+"_dashboardReports"} path={elem?.path} element={elem?.element} />
                            )
                            }
      
                            { (userType === "SBU" || userType === "SUA" || userType === "POLICE") && <Route element={<RTO />}>
                            
                            {       
                                rtoRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                        <Route key={index+"_rtoRoutes"} path={elem?.path} element={elem?.element} />
                                )
                            }
                                </Route>
                            }

                            {(userType === "SBU" || userType === "SUA" || userType === "RTO") && <Route element={<Police />}>
                            {
                                policeRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                    <Route key={index+"_policeRoutes"} path={elem?.path} element={elem?.element} />
                                )
                            }
                            </Route>
                            }

                            {(userType === "SBU" || userType === "SUA" || userType === "RTO" || userType === "POLICE") && <Route element={<Masters />}>
                            {
                                masterRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                <Route key={index+"_masterRoutes"} path={elem?.path} element={elem?.element} />
                                
                                )
                            }
                            </Route>}

                            {(userType === "SBU" || userType === "SUA" || userType === "RTO" || userType === "POLICE" || userType === "MNF") && <Route element={<Manufacturer />}>
                            {
                                mnfRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                <Route key={index+"_mnfRoutes"} path={elem?.path} element={elem?.element} />
                                
                                )
                            }
                            </Route>}

                            {(userType === "SBU" || userType === "SUA" || userType === "RTO" || userType === "POLICE" || userType === "MNF" || userType === "AUTH" || userType === "DST" || userType === "RFC") &&<Route element={<DeviceApproval />}>
                            {
                                deviceApprovalRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                
                                 <Route key={index+"_deviceApprovalRoutes"} path={elem?.path} element={elem?.element} />
                                
                                )
                            }
                            </Route>}

                            {(userType === "SBU" || userType === "SUA" || userType === "RTO" || userType === "POLICE" || userType === "MNF") &&<Route element={<Distributor />}>
                            {
                                distributorRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                
                                 <Route key={index+"_distributorRoutes"} path={elem?.path} element={elem?.element} />
                                
                                )
                            }
                            </Route>}

                            
                            {(userType === "SBU" || userType === "SUA" || userType === "RTO" || userType === "POLICE" || userType === "MNF") && <Route element={<RFCMaster />}>
                            {
                                rfcRoutes?.map((elem, index) =>
                                
                                 <Route key={index+"_distributorRoutes"} path={elem?.path} element={elem?.element} />
                                
                                )
                            }
                            {
                                // rfcRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                
                                //  <Route key={index+"_distributorRoutes"} path={elem?.path} element={elem?.element} />
                                
                                // )
                            }
                            
                            </Route>}

                            
                            {
                            (userType === "SBU" || userType === "SUA" || userType === "RTO" || userType === "POLICE" || userType === "MNF" || userType === "DST" || userType === "RFC") && <Route element={<DeviceInventory />}>
                            {   
                                deviceInventoryRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                
                                <Route key={index+"_deviceInventoryRoutes"} path={elem?.path} element={elem?.element} />
                                )
                            }
                            </Route>
                            }

                            {userType !== "PHOLDER" && <Route element={<User />}>
                            {
                                userRoutes?.filter(item=>checkPermissions(item.users)).map((elem, index) =>
                                
                                <Route key={index+"_userRoutes"} path={elem?.path} element={elem?.element} />
                                
                                )
                            }
                            </Route>}
                            
                            {userType !== "PHOLDER" && <Route element={<Reports />}>
                            {
                                reportRoutes?.map((elem, index) =>
                                <Route key={index} path={elem?.path} element={elem?.element} />
                                )
                            }
                            </Route>}

                            {userType === "PHOLDER" && 
                                permitHolderRoutes?.map((elem, index) =>
                                <Route key={index} path={elem?.path} element={elem?.element} />
                                )
                            }


                            <Route path='*' element={<NotFound />} />
                        </Route>
                        </Routes> : <Navigate to='/' />}


        </>
    );
}

export default ProtectedRoutes