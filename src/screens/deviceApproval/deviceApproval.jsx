import { Outlet, Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom";
import { getUserRoles } from "../../apis/users";
import { useEffect, useState } from "react";
import BackButton from "../../components/Common/BackButton";
import { json } from "d3";

const DeviceApproval = () => {
  const location = useLocation();
  const userType = sessionStorage.getItem("userType");
  const [userData, setUserData] = useState(null);
  const [mappedRoles, setMappedRoles] = useState(null)
  
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  useEffect(() => {
    const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["deviceApproval"]
    setUserData(allowedNavigationMap);
    setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesDeviceApproval")
  
  return (
    <div>
      {userData && mappedRoles && <nav className="sub-nav">

      <BackButton />

        {userType === "RTO" ? (
          <ul className="sub-nav-item">
            { userData.map((item) => (
              <li className="nav-item" key={item}>
                <Link 
                  className={` ${
                    matchRoute(`deviceApprovals/${item.code}`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`} 
                  to={`/deviceApprovals/${item.code}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="sub-nav-item">
            {userType === 'MNF' && <>
            <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`deviceApproval/addDeviceType`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceApproval/addDeviceType`}
              >
                Pending Approval
              </Link>
            </li> 
            <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`deviceApproval/deviceApprovalAllList`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceApproval/deviceApprovalAllList`}
              >
                Approved Device
              </Link>
            </li> 
            </>
            }
            {userType !== "MNF" && userType !== "DST" && mappedRoles.some(item => ["update_device_type", "device_approval", "device_testing_approval"].includes(item))? <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`deviceApproval/listDeviceApproval`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceApproval/listDeviceApproval`}
              >
                Pending Approval
              </Link>
            </li> : null}
            
            {mappedRoles.includes("device_testing")  ? <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`deviceApproval/controlTowerTesting`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceApproval/controlTowerTesting`}
              >
                Device Testing
              </Link>
            </li> : null}
            {userType !== "MNF" && userType !== "DST"  ? <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`deviceApproval/deviceApprovalAllList`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/deviceApproval/deviceApprovalAllList`}
              >
                Approved Devices
              </Link>
            </li> : null}
          </ul>
        )}

      </nav>}

      <div className="sub-nav-outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default DeviceApproval;