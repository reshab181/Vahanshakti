import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom";
import BackButton from "../../components/Common/BackButton";

const Distributor = () => {
  const location = useLocation();
  const userType = sessionStorage.getItem("userType");
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [mappedRoles, setMappedRoles] = useState(null)

  useEffect(() => {
    const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["distributors"]
    setMappedRoles(allowedNavigationMap.map(item=>item.code))
  }, []);

  console.log(mappedRoles, "mappedRolesDistributor")
  

  return (
    <>
      {mappedRoles && <nav className="sub-nav">
      <BackButton />
        
          <ul className="sub-nav-item">
            
              <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`/distributors/listDistributor`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/distributors/listDistributor`}
                >
                  Distributors
                </Link>
              </li>
              
              {(userType === "SBU" || userType === "SUA") && mappedRoles.includes("add_distributor") && <li className="nav-item">
                <Link
                  className={` ${
                    matchRoute(`/distributors/addDistributor`)
                      ? "sub-nav-text-active"
                      : "sub-nav-text"
                  }`}
                  to={`/distributors/addDistributor`}
                >
                  Add Distributor
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

export default Distributor;