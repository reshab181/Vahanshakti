/* eslint-disable react/prop-types */
import { logout } from "../apis/authentication";
import { useState, useEffect, useRef } from "react"
import { AiFillDashboard } from 'react-icons/ai'
import { MdOutlineInventory2 } from 'react-icons/md'
import { TbReportSearch } from 'react-icons/tb'
import { BiUser } from 'react-icons/bi'
import { BsDistributeVertical } from 'react-icons/bs'
import { MdPrecisionManufacturing } from 'react-icons/md'
import { DiHtml5DeviceAccess } from 'react-icons/di'
import { SiMastercomfig } from 'react-icons/si'
import { MdOutlineCountertops } from 'react-icons/md'
import { MdDeviceHub } from "react-icons/md";
import { BiLogOut } from 'react-icons/bi'
import { NavLink } from "react-router-dom";
import './navigation.css'
import { FiAlertCircle } from 'react-icons/fi'
import { GiPoliceBadge } from 'react-icons/gi'
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setNavigationOpen } from "../reducer/slice/commonSlice";

import logo from '../assets/logo4.png'
import { GiWoodenFence } from "react-icons/gi";
import { TbRoute2 } from "react-icons/tb";
import { FaRoute } from "react-icons/fa";
import { TbRouteScan } from "react-icons/tb";
import { CiRoute } from "react-icons/ci";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { GiPoliceCar } from "react-icons/gi";
import { BiSolidCarMechanic } from "react-icons/bi";

import { useTranslation } from "react-i18next";
import { ResponsibilityMap } from "../screens/userManagement/responsibilitiesMap";


const Sidebar = ({ navigationOpen }) => {
  
  const {t} = useTranslation()
  const [toggle, setToggle] = useState(false)
  const [mappedNavigation, setMappedNavigation] = useState(null)

  const user = sessionStorage.getItem('userType')
  // const userRoles = JSON.parse(sessionStorage.getItem('allowedNavigationMap'))
  
  useEffect(()=>{
    const assignedResponsibilities = JSON.parse(sessionStorage.getItem('userRolesData'))
    console.log(user, assignedResponsibilities, "assignedResponsibilities")
    const updatedRole = assignedResponsibilities.filter(role=>ResponsibilityMap?.[role?.code]?.["userTypes"]?.[user]).map(role => {return { ...role,  ...ResponsibilityMap?.[role?.code], ...ResponsibilityMap?.[role?.code]?.["userTypes"]?.[user]}});
    const mapLayout = {}
    updatedRole.forEach(item=>{
      if(item?.tag in mapLayout){
        mapLayout[item.tag] = [...mapLayout[item.tag], item]
      } else {
        mapLayout[item.tag] = [item]
      }
    })



    sessionStorage.setItem("allowedNavigationMap",  JSON.stringify(mapLayout))
    setMappedNavigation(Object.keys(mapLayout))

  },[])


  console.log(sessionStorage.getItem("userType") === "PHOLDER" ? sessionStorage.getItem("user_type") : sessionStorage.getItem("designation"), "pholderCheck")
  console.log("Hello World", "pholderCheck")
  let staticToggle = sessionStorage.getItem('staticToggle')
  let docStatus = sessionStorage.getItem("docStatus")

  let navigation_panel = [];
  const dispatch = useDispatch()
  const dialogRef = useRef(null)
  
  const designation = sessionStorage.getItem('designation')

  if (user === "DST") {    
      navigation_panel = [
        { tag: "true", baseRoute: "dashboard", label: t("navigation.DashboardText"), icon: <AiFillDashboard />, default: "/"},
        { tag: "deviceInventory", baseRoute: "deviceInventory", label: t("navigation.DeviceInventoryText"), icon: <MdOutlineInventory2 />, default: "/deviceInventoryList" },
        { tag: "deviceApproval", baseRoute: "deviceApproval", label: t("navigation.ApprovedDeviceText"), icon: <DiHtml5DeviceAccess />, default: "/deviceApprovalAllList" },
        { tag: "userManagement", baseRoute: "userManagement", label: t("navigation.UserManagementText"), icon: <BiUser />, default: "/listUser" },
      ]
  }

  if (user === "RFC") {    
    navigation_panel = [
      { tag: "true", baseRoute: "dashboard", label: t("navigation.DashboardText"), icon: <AiFillDashboard />, default: "/" },
      { tag: "deviceInventory", baseRoute: "deviceInventory", label: t("navigation.DeviceInventoryText"), icon: <MdOutlineInventory2 />, default: "/deviceInventoryList" },
      // { tag: "deviceApproval", baseRoute: "deviceApproval", label: t("navigation.ApprovedDeviceText"), icon: <DiHtml5DeviceAccess />, default: "/deviceApprovalAllList" },
      { tag: "userManagement", baseRoute: "userManagement", label: t("navigation.UserManagementText"), icon: <BiUser />, default: "/listUser" },
    ]
}


  else if (user === "RTO") {
    navigation_panel = [
      { tag: "true", baseRoute: "dashboard", label: t("navigation.DashboardText"), icon: <AiFillDashboard />, default: "/" },
      { tag: "deviceInventory", baseRoute: "deviceInventory", label: t("navigation.DevicesText"), icon: <MdOutlineInventory2 />, default: "/deviceInventoryList" },
      { tag: "userManagement", baseRoute: "userManagement", label: t("navigation.UserManagementText"), icon: <BiUser />, default: "/listUser" },
      {
        tag: "configuration", baseRoute: '', label: t("navigation.ConfigurationText"), icon: <MdDeviceHub />, default: "/deviceConfigure", subMenuItems: [
        
          { baseRoute: 'configuration', label: "Geofence", icon: <GiWoodenFence />, default: "/geofence" },
          { baseRoute: 'configuration', label: "Trails", icon: <TbRoute2 />, default: "/trails" },
          { baseRoute: 'configuration', label: "Alarms Config", icon: <MdOutlineSettingsInputComponent />, default: "/alarms" }, 
          { baseRoute: 'configuration', label: "Long Trails", icon: <FaRoute />, default: "/longTrails" },
          { baseRoute: 'configuration', label: "Routes", icon: <TbRouteScan />, default: "/routeconfigure" },
          { baseRoute: 'configuration', label: "Assign Route", icon: <CiRoute />, default: "/routeassign" },
        ]
      },
    ];
  }

  else if (user === "POLICE") {
    navigation_panel = [
      { tag: "true", baseRoute: "dashboard", label: t("navigation.DashboardText"), icon: <AiFillDashboard />, default: "/" },
      { tag: "deviceInventory", baseRoute: "deviceInventory", label: t("navigation.DevicesText"), icon: <MdOutlineInventory2 />, default: "/deviceInventoryList" },
      { tag: "userManagement", baseRoute: "userManagement", label: t("navigation.UserManagementText"), icon: <BiUser />, default: "/listUser" },
      { tag: "true", baseRoute: "/police/accidentInfoForm", label: "Accident Report", icon: <GiPoliceCar />, default: "" },
      {
        tag: "configuration", baseRoute: '', label: t("navigation.ConfigurationText"), icon: <MdDeviceHub />, default: "/deviceConfigure", subMenuItems: [
        
          { baseRoute: 'configuration', label: "Geofence", icon: <GiWoodenFence />, default: "/geofence" },
          { baseRoute: 'configuration', label: "Trails", icon: <TbRoute2 />, default: "/trails" },
          { baseRoute: 'configuration', label: "Alarms Config", icon: <MdOutlineSettingsInputComponent />, default: "/alarms" }, 
          { baseRoute: 'configuration', label: "Long Trails", icon: <FaRoute />, default: "/longTrails" },
          { baseRoute: 'configuration', label: "Routes", icon: <TbRouteScan />, default: "/routeconfigure" },
          { baseRoute: 'configuration', label: "Assign Route", icon: <CiRoute />, default: "/routeassign" },
        ]
      },
    ]
  }

  else if (user === "AUTH") {
    navigation_panel = [
      { tag: "deviceApproval", baseRoute: "deviceApproval", label: t("navigation.DevicesText"), icon: <MdOutlineInventory2 />, default: "/listDeviceApproval" },
      { tag: "userManagement", baseRoute: "userManagement", label: t("navigation.UserManagementText"), icon: <BiUser />, default: "/listUser" },
    ]
  }  

  else if (user === "MNF") {
    {docStatus === "1" && (navigation_panel = [
      { tag: "true", baseRoute: "dashboard", label: t("navigation.DashboardText"), icon: <AiFillDashboard />, default: "/" },
      { tag: "deviceInventory", baseRoute: "deviceInventory", label: t("navigation.DeviceInventoryText"), icon: <MdOutlineInventory2 />, default: "/addDeviceInventory" },
      { tag: "distributors", baseRoute: "distributors", label: t("navigation.DistributorsText"), icon: <BsDistributeVertical />, default: "/listDistributor" },
      { tag: "rfcs", baseRoute: "manufacturers", label: "RFC", icon: <BiSolidCarMechanic />, default: "/listRFCs" },
      { tag: "deviceApproval", baseRoute: "deviceApproval", label: t("navigation.DeviceText"), icon: <DiHtml5DeviceAccess />, default: "/addDeviceType" },
      { tag: "userManagement", baseRoute: "userManagement", label: t("navigation.UserManagementText"), icon: <BiUser />, default: "/listUser" },
      
    ])}
  }

  else if(user === "SBU" || user === "SUA") {
    
      navigation_panel = [
        { tag: "true", baseRoute: "dashboard", label: t("navigation.DashboardText"), icon: <AiFillDashboard />, default: "/" },
        { tag: "deviceInventory", baseRoute: "deviceInventory", label: t("navigation.DevicesText"), icon: <MdOutlineInventory2 />, default: "/deviceInventoryList" },
        { tag: "rtos", baseRoute: "rtos", label: t("navigation.RTOsText"), icon: <MdOutlineCountertops />, default: "/listRTO" },
        { tag: "Police", baseRoute: "Police", label: t("navigation.PoliceText"), icon: <GiPoliceBadge />, default: "/listPoliceLog" },
        { tag: "manufacturers", baseRoute: "manufacturers", label: t("navigation.ManufacturersText"), icon: <MdPrecisionManufacturing />, default: "/listManufacturer" },
        { tag: "distributors", baseRoute: "distributors", label: t("navigation.DistributorsText"), icon: <BsDistributeVertical />, default: "/listDistributor" },
        { tag: "rfcs", baseRoute: "rfcMaster", label: "RFC", icon: <BiSolidCarMechanic />, default: "/listRFC" },
        { tag: "deviceApproval", baseRoute: "deviceApproval", label: t("navigation.DeviceTypesText"), icon: <DiHtml5DeviceAccess />, default: designation !== "ctower" ? "/listDeviceApproval" : "/controlTowerTesting" },
        {
          tag: "configuration", baseRoute: '', label: t("navigation.ConfigurationText"), icon: <MdDeviceHub />, default: "/deviceConfigure", subMenuItems: [        
            { baseRoute: 'configuration', label: "Geofence", icon: <GiWoodenFence />, default: "/geofence" },
            { baseRoute: 'configuration', label: "Trails", icon: <TbRoute2 />, default: "/trails" },
            { baseRoute: 'configuration', label: "Alarms Config", icon: <MdOutlineSettingsInputComponent />, default: "/alarms" }, 
            { baseRoute: 'configuration', label: "Long Trails", icon: <FaRoute />, default: "/longTrails" },
            { baseRoute: 'configuration', label: "Routes", icon: <TbRouteScan />, default: "/routeconfigure" },
            { baseRoute: 'configuration', label: "Assign Route", icon: <CiRoute />, default: "/routeassign" },
          ]
        },
        { tag: "masters", baseRoute: "masters", label: t("navigation.MastersText"), icon: <SiMastercomfig />, default: "/listESIMProviders" },
        { tag: "userManagement", baseRoute: "userManagement", label: t("navigation.UserManagementText"), icon: <BiUser />, default: "/listUser" },
        { tag: "true", baseRoute: 'reports', label: t("navigation.ReportsText"), icon: <TbReportSearch />, default: "/alarmReports" },      
      ]
    }

  const menuToggleFun = () => {
    dispatch(setNavigationOpen(!navigationOpen))
  }

  const checkToggle = (data, type='close') => {
    window.innerWidth <= 763 && dispatch(setNavigationOpen(false))
    
    if(type == 'open'){
      return
    }
    
    if (data?.subMenuItems) {
      setToggle(!toggle)
    } else {
      setToggle(false)
    }
  }

  const checkRoute = (data) => {

    const route = data?.default ? `${data?.baseRoute}${data?.default}` : data?.baseRoute
    return route;

  }

  const navigationMAPUI = () => {
      console.log(mappedNavigation, "mappedNavigationUU")
      const navigationUIMap = []
      navigation_panel?.forEach((item) =>{
            if(item.tag==="true" || mappedNavigation.includes(item.tag)){
            // if(item.tag){  
              navigationUIMap.push(
              <li className='navigation-content'>
                <NavLink onClick={() => checkToggle(item)} to={item?.subMenuItems ? null : checkRoute(item)} className={({ isActive }) => ((navigationOpen ) ? `menu ${isActive && !item?.subMenuItems ? 'menu-active' : 'menu-deactive'}` : `dmenu ${isActive && !item?.subMenuItems ? 'menu-active' : 'menu-deactive'}`)}>
                  <div title={item?.label} className="menu-icon">{item?.icon}</div>
                  {navigationOpen && <div className="menu-label">{item?.label}</div>}
                </NavLink>

              {toggle && item?.subMenuItems &&

                item?.subMenuItems?.map((elem, index) => <>
                  <ul className="navigations">
                    <li className='navigation-content'>
                      <NavLink onClick={() => checkToggle(item, 'open')} to={checkRoute(elem)} className={({ isActive }) => (navigationOpen ? `smenu ${isActive ? 'smenu-active' : 'smenu-deactive'}` : `dsmenu ${isActive ? 'smenu-active' : 'smenu-deactive'}`)}>
                        <attr title={elem?.label} className="smenu-icon">{elem?.icon}</attr>
                        {navigationOpen && <div className="smenu-label">{elem?.label}</div>}
                      </NavLink>
                    </li>
                  </ul>
                </>)
              }
            </li>)
            
      }})
      console.log(navigationUIMap, "navigationUIMap")
      return navigationUIMap
  }

  return (
    <>

      <header onMouseEnter={() => staticToggle == 'true' && dispatch(setNavigationOpen(true))} onMouseLeave={() => staticToggle == 'true' && dispatch(setNavigationOpen(false))} className={(navigationOpen ? 'open' : 'close') + ' main-header animate__animated animate__slideInLeft animate__faster ' + (window.innerWidth <= 763 && ' sidebar_absolute')}>
        <div className={" top-nav-container "} >
          <nav className="nav-container">
            <div className="menu-container">

              <div className="logo-top-container" style={{ position: 'relative' }}>
                <div className="logo-container">
                  <span className='logo'>
                    <img className={`menu-logo ${navigationOpen ? 'open-logo' : 'close-logo'}`} src={logo} alt="" />
                  </span>
                  <h3 className="menu-role" >{user} </h3>
                  <h3 className="menu-role-mini" style={{ visibility: navigationOpen ? 'visible' : "hidden" }}>{sessionStorage.getItem("userType") === "PHOLDER" ? sessionStorage.getItem("user_type") : sessionStorage.getItem("designation") } </h3>
                </div>

                {window.innerWidth <= 763 && <span className="cross" onClick={() => menuToggleFun()}><RxCross2 size={25} /></span>}

              </div>

              <div className=" navigation-container">
                <nav className="">
                  <ul className="navigations">
                    {
                      mappedNavigation && navigationMAPUI()
                    }
                    <hr />
                    <li className='navigation-content'>
                      <div className={'menu-logout'}
                        onClick={() => dialogRef.current.showModal()}
                      >
                        <attr title={t("navigation.LogoutText")} className="menu-icon"><BiLogOut fill="white" /></attr>
                        {navigationOpen && <span className="menu-label">{t("navigation.LogoutText")}</span>}
                      </div>
                    </li>

                  </ul>
                </nav>
              </div>

            </div>

          </nav>
        </div>
      </header>

      
      <dialog ref={dialogRef} className="modal-container">
        <div className='modal-background  ' onClick={() => dialogRef.current.close()}></div>
        <div className="contain_modal">
        <div className='modal-sub-container  animate__animated animate__slideInLeft animate__faster'>
          <div className='modal-message'>
            <span className='modal-icon '><FiAlertCircle size={25} /></span>
            <div className='modal-contents'>
              <span className='modal-content-first '>{t("navigation.logoutHeading")}</span>
              <span className='modal-content-second'>{t("navigation.logoutSubHeading")}</span>
            </div>
          </div>
          <div className='modal-buttons'>
            <button className='modal-cancel-button ' onClick={() => dialogRef.current.close()}>{t("basicWord.NoText")}</button>
            <button className='modal-confirm-button ' onClick={() => logout()}>{t("basicWord.YesText")}</button>
          </div>
        </div>
        </div>
      </dialog>

    </>
  );
};

export default Sidebar;