import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom";
import BackButton from "../../components/Common/BackButton";

const RFCMaster = () => {
  
  const location = useLocation();
  const userType = sessionStorage.getItem("userType");
  
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
  const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["rfcs"]
  setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesManufacturer")
  

  return (
    <>
      {mappedRoles && <nav className="sub-nav">
      <BackButton />
        
          <ul className="sub-nav-item">
            
              <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`/rfcMaster/listRFC`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/rfcMaster/listRFC`}
                >
                  RFCs
                </Link>
              </li>
              
              {(userType === "SBU" || userType === "SUA") && mappedRoles.includes("add_rfc") &&  <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`/rfcMaster/addRFC`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/rfcMaster/addRFC`}
                >
                  Add RFC
                </Link>
              </li>}

              
          </ul>
        
      </nav>}

      <div className="sub-nav-outlet">
        <Outlet />
      </div>
    </>
  );
};

export default RFCMaster;