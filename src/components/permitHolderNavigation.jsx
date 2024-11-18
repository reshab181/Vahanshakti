import { useDispatch } from 'react-redux'; // Import useDispatch
import { logout } from "../apis/authentication";
import { useState, useRef } from "react";
import { AiFillDashboard } from 'react-icons/ai';
import { MdOutlineInventory2 } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { NavLink } from "react-router-dom";
import './navigation.css';
import { FiAlertCircle } from 'react-icons/fi';
import { RxCross2 } from "react-icons/rx";
import { setNavigationOpen } from "../reducer/slice/commonSlice";
import logo from '../assets/logo4.png';
import { GiWoodenFence } from "react-icons/gi";
import { TbRouteScan } from "react-icons/tb";
import { CiRoute } from "react-icons/ci";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { useTranslation } from "react-i18next";

const SidebarPermitHolder = ({ navigationOpen }) => {
  const dispatch = useDispatch(); // Get dispatch function
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);

  const user = sessionStorage.getItem('userType');
  const userOrg = sessionStorage.getItem('user_type');
  let staticToggle = sessionStorage.getItem('staticToggle');
  const dialogRef = useRef(null);

  const navigation_panel = userOrg === "SCHOOL" ? [
    { baseRoute: "dashboard", label: "Dashboard", icon: <AiFillDashboard /> },
    { baseRoute: "permitHolder/liveMap", label: "Fleet Tracking", icon: <MdOutlineInventory2 /> },
    { baseRoute: "permitHolder/schoolManagement", label: "School Bus", icon: <GiWoodenFence /> },
    { baseRoute: "permitHolder/routeConfigure", label: "Create Routes", icon: <TbRouteScan /> },
    { baseRoute: "permitHolder/routeAssign", label: "Assign Routes", icon: <CiRoute /> },
    { baseRoute: "permitHolder/alarms", label: "Alarms Configure", icon: <MdOutlineSettingsInputComponent /> },
    { baseRoute: "permitHolder/geoFence", label: "Geofence Configure", icon: <GiWoodenFence /> },
  ] : [
    { baseRoute: "dashboard", label: "Dashboard", icon: <AiFillDashboard /> },
    { baseRoute: "permitHolder/liveMap", label: "Fleet Tracking", icon: <MdOutlineInventory2 /> },
    { baseRoute: "permitHolder/routeConfigure", label: "Create Routes", icon: <TbRouteScan /> },
    { baseRoute: "permitHolder/routeAssign", label: "Assign Routes", icon: <CiRoute /> },
    { baseRoute: "permitHolder/alarms", label: "Alarms Configure", icon: <MdOutlineSettingsInputComponent /> },
    { baseRoute: "permitHolder/geoFence", label: "Geofence Configure", icon: <GiWoodenFence /> },
  ];

  const menuToggleFun = () => {
    dispatch(setNavigationOpen(!navigationOpen));
  };

  const checkToggle = (data, type = 'close') => {
    window.innerWidth <= 763 && dispatch(setNavigationOpen(false));

    if (type == 'open') {
      return;
    }

    if (data?.subMenuItems) {
      setToggle(!toggle);
    } else {
      setToggle(false);
    }
  };

  const checkRoute = (data) => {
    const route = data?.default ? `${data?.baseRoute}${data?.default}` : data?.baseRoute;
    return route;
  };

  const navigationMAPUI = () => {
    const navigationUIMap = [];
    navigation_panel?.forEach((item) => {
      navigationUIMap.push(
        <li className='navigation-content' key={item.baseRoute}>
          <NavLink onClick={() => checkToggle(item)} to={item?.subMenuItems ? null : checkRoute(item)} className={({ isActive }) => ((navigationOpen) ? `menu ${isActive && !item?.subMenuItems ? 'menu-active' : 'menu-deactive'}` : `dmenu ${isActive && !item?.subMenuItems ? 'menu-active' : 'menu-deactive'}`)}>
            <div title={item?.label} className="menu-icon">{item?.icon}</div>
            {navigationOpen && <div className="menu-label">{item?.label}</div>}
          </NavLink>
        </li>
      );
    });

    return navigationUIMap;
  };

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
                  <h3 className="menu-role">{user}</h3>
                  <h3 className="menu-role-mini" style={{ visibility: navigationOpen ? 'visible' : "hidden" }}>{sessionStorage.getItem("user_type")}</h3>
                </div>
                {window.innerWidth <= 763 && <span className="cross" onClick={() => menuToggleFun()}><RxCross2 size={25} /></span>}
              </div>

              <div className=" navigation-container">
                <nav className="">
                  <ul className="navigations">
                    {navigationMAPUI()}
                    <hr />
                    <li className='navigation-content'>
                      <div className={'menu-logout'} onClick={() => dialogRef.current.showModal()}>
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
        <div className='modal-background' onClick={() => dialogRef.current.close()}></div>
        <div className="contain_modal">
          <div className='modal-sub-container animate__animated animate__slideInLeft animate__faster'>
            <div className='modal-message'>
              <span className='modal-icon'><FiAlertCircle size={25} /></span>
              <div className='modal-contents'>
                <span className='modal-content-first'>{t("navigation.logoutHeading")}</span>
                <span className='modal-content-second'>{t("navigation.logoutSubHeading")}</span>
              </div>
            </div>
            <div className='modal-buttons'>
              <button className='modal-cancel-button' onClick={() => dialogRef.current.close()}>{t("basicWord.NoText")}</button>
              <button className='modal-confirm-button' onClick={() => logout()}>{t("basicWord.YesText")}</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SidebarPermitHolder;
