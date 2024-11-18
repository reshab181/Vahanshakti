import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom";
import BackButton from "../../components/Common/BackButton";

 function DeviceInventory() {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [mappedRoles, setMappedRoles] = useState(null)
  
  const userType = sessionStorage.getItem("userType");


  useEffect(() => {
    const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["deviceInventory"]
    setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesRFC")
  
  return (
    <>
      {mappedRoles && <nav className="sub-nav">

      <BackButton />
          
            <ul className="sub-nav-item">
            {<li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`deviceInventory/deviceInventoryList`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceInventory/deviceInventoryList`}
              >
                All Devices
              </Link>
            </li>}
              
            {userType==="MNF" && <><li className="nav-item">
            <Link
              className={` ${
                matchRoute(`deviceInventory/addDeviceInventory`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/deviceInventory/addDeviceInventory`}
            >
              Add Inventory
            </Link>
            
          </li>
          <li className="nav-item">
          <Link
            className={` ${
              matchRoute(`deviceInventory/manfDeviceNotSendingData`)
                ? "sub-nav-text-active"
                : "sub-nav-text"
            }`}
            to={`/deviceInventory/manfDeviceNotSendingData`}
          >
            Not Sending Data
          </Link>
          
        </li>
        <li className="nav-item">
          <Link
            className={` ${
              matchRoute(`deviceInventory/manfActivatedDevice`)
                ? "sub-nav-text-active"
                : "sub-nav-text"
            }`}
            to={`/deviceInventory/manfActivatedDevice`}
          >
            Activated Devices
          </Link>
          
        </li></>}

            {console.log(sessionStorage.getItem("designation").toLowerCase, "getDesignationDistributor")}
            {userType === "DST" &&
            <>
            <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`/deviceInventory/rfcAssign`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceInventory/rfcAssign`}
              >
                RFC Assign Inventory
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`/deviceInventory/rfcReassign`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceInventory/rfcReassign`}
              >
                RFC Reassign Inventory
              </Link>
            </li>
            </>
            }  
            {userType === "DST" && sessionStorage.getItem("designation").toLowerCase() === "admin" &&
            
            <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`/deviceInventory/dstUserAssign`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceInventory/dstUserAssign`}
              >
                Assign Inventory DST User
              </Link>
            </li>
            }
            {userType === "RFC"  && mappedRoles.includes("map_device_to_vehicle") &&
            <>
            
              {/* <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`deviceInventory/reactivation`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceInventory/reactivation`}
              >
                Reactivation
              </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={` ${
                      matchRoute(`deviceInventory/activateDevice`)
                        ? "sub-nav-text-active"
                        : "sub-nav-text"
                    }`}
                    to={`/deviceInventory/activateDevice`}
                  >
                    Activate New Device
                  </Link>
                </li> */}
                <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`deviceInventory/activateDeviceVahan`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/deviceInventory/activateDeviceVahan`}
                >
                  Activate Vahan
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`/deviceInventory/reactivationVahan`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/deviceInventory/reactivationVahan`}
                >
                  Reactivate Vahan
                </Link>
              </li>
              {sessionStorage.getItem("designation").toLowerCase() === "admin" &&  <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`/deviceInventory/rfcUserAssign`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/deviceInventory/rfcUserAssign`}
                >
                  Assign to RFC User
                </Link>
              </li>}
              
            </>}
          
          
          
        
                     
              <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`deviceInventory/liveMap`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/deviceInventory/liveMap`}
                >
                  Live Map
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`deviceInventory/trails`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/deviceInventory/trails`}
                >
                  Trails
                </Link>
              </li>
              {userType === "SBU" && mappedRoles.includes("replace_vltd") && <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`/deviceInventory/deactivation`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/deviceInventory/deactivation/`}
                >
                  Deactivate Device
                </Link>
              </li>}
              {userType === "SBU" && mappedRoles.includes("approve_inv_uploadedby_mnf") && <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`deviceInventory/ctApprovalInventory`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/deviceInventory/ctApprovalInventory`}
                >
                  Device Approval
                </Link>
              </li>}
              {userType === "SBU" && mappedRoles.includes("approve_inv_uploadedby_mnf") && <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`/deviceInventory/ctApproved`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/deviceInventory/ctApproved`}
                >
                  CT Approved Devices
                </Link>
              </li>}
          </ul>
      </nav>
      }
      
      <div className="sub-nav-outlet">
        <Outlet />
      </div>

    </>
  );
}

export default DeviceInventory;