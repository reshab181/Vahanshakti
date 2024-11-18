import { Outlet, Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom";
import BackButton from "../../components/Common/BackButton";

const User = () => {
  const location = useLocation();
  const userType = sessionStorage.getItem("userType");

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <>
      <nav className="sub-nav">
        <BackButton />
        <ul className="sub-nav-item">
          <li>
            <Link
              className={`${
                matchRoute("userManagement/listUser")
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to="/userManagement/listUser"
            >
              All Users
            </Link>
          </li>
          <li>
            <Link
              className={`${
                matchRoute("userManagement/AddUser")
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to="/userManagement/AddUser"
            >
              Add User
            </Link>
          </li>
          {userType !== "SUA" && (
            <li>
              <Link
                className={`${
                  matchRoute("userManagement/addRoles")
                    ? "sub-nav-text-active"
                    : "sub-nav-text"
                }`}
                to="/userManagement/addRoles"
              >
                Manage Roles
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="sub-nav-outlet">
        <Outlet />
      </div>
    </>
  );
};

export default User;
