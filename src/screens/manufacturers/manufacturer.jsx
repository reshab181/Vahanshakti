import { useState, useEffect } from "react";
import { matchPath, useLocation, Outlet, Link } from "react-router-dom";
import BackButton from "../../components/Common/BackButton";

const Manufacturer = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  
  const userType = sessionStorage.getItem('userType')

  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
  const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["manufacturers"]
  setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesManufacturer")
  

  return (
    <>
      {mappedRoles && <nav className="sub-nav">
      <BackButton />          
          <ul className="sub-nav-item">
            {userType !== "MNF" && userType !== "DST" &&  userType !== "RFC" && mappedRoles.includes("manufacturer_details") && <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`manufacturers/listManufacturer`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/manufacturers/listManufacturer`}
              >
                All Manufacturers
              </Link>
            </li>}
            {userType !== "MNF" && userType !== "DST" &&  userType !== "RFC" && (mappedRoles.includes("add_manufacturer") || mappedRoles.includes("update_manufacturer"))&& <li className="nav-item">
              <Link
                className={` ${
                  matchRoute(`manufacturers/empanelment`)
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to={`/manufacturers/empanelment`}
              >
                Empanelment
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

export default Manufacturer;