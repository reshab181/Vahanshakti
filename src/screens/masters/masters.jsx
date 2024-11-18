import { useState, useEffect } from "react";
import { matchPath, useLocation, Outlet, Link } from "react-router-dom";
import BackButton from "../../components/Common/BackButton";

const Masters = () => {
  
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const userType = localStorage.getItem("userType");
  
  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
  const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["masters"]
  setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesManufacturer")
  
  
  return (
    <>
      {mappedRoles && <nav className="sub-nav">

      <BackButton />
  
      <ul className="sub-nav-item">
        <li>
          <Link
            className={` ${
              matchRoute(`masters/listESIMProviders`)
                ? "sub-nav-text-active"
                : "sub-nav-text"
            }`}
            to={`/masters/listESIMProviders`}
          >
            ESIM Providers
          </Link>
        </li>
        {mappedRoles.includes("add_esim_provider") && <li>
          <Link
            className={` ${
              matchRoute(`masters/addESIMProviders`)
                ? "sub-nav-text-active"
                : "sub-nav-text"
            }`}
            to={`/masters/addESIMProviders`}
          >
            Add ESIM Provider
          </Link>
        </li>}
        <li>
          <Link
            className={` ${
              matchRoute(`masters/listApprovingAuthority`)
                ? "sub-nav-text-active"
                : "sub-nav-text"
            }`}
            to={`/masters/listApprovingAuthority`}
          >
            Device Authorities
          </Link>
        </li>
        {mappedRoles.includes("add_autority") && <li>
          <Link
            className={` ${
              matchRoute(`masters/addApprovingAuthority`)
                ? "sub-nav-text-active"
                : "sub-nav-text"
            }`}
            to={`/masters/addApprovingAuthority`}
          >
            Add Device Authority
          </Link>
        </li>}
        <li>
          <Link
            className={` ${
              matchRoute(`masters/stateCityMaster`)
                ? "sub-nav-text-active"
                : "sub-nav-text"
            }`}
            to={`/masters/stateCityMaster`}
          >
            State & Cities
          </Link>
        </li>
      </ul>
      
      </nav>}

      <div className="sub-nav-outlet">
        <Outlet />
      </div>
    </>
  );
};


export default Masters;