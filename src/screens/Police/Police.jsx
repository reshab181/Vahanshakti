import { useState, useEffect } from "react";
import { matchPath, useLocation, Outlet, Link } from "react-router-dom"
import BackButton from "../../components/Common/BackButton";

const Police = () => {
    const location = useLocation()
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const [mappedRoles, setMappedRoles] = useState(null)

    useEffect(() => {
    const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["Police"]
    setMappedRoles(allowedNavigationMap.map(item=>item.code))
    }, []);

    console.log(mappedRoles, "mappedRolesRTO")
    

    return (
        <>
            {/* <div className="sub-nav-container"> */}
            {mappedRoles && <nav className="sub-nav">

            <BackButton />

                <ul className="sub-nav-item">
                    <li>
                        <Link className = {` ${matchRoute(`Police/listPoliceLog`)?"sub-nav-text-active":"sub-nav-text"}`} to={`/Police/listPoliceLog`}>List Police Accounts</Link>
                    </li>
                    {mappedRoles.includes("add_police") && <li>
                        <Link className={` ${matchRoute(`Police/addPolice`) ? "sub-nav-text-active" : "sub-nav-text"}`} to={`/Police/addPolice`}>Create Police Account</Link>
                    </li>}
                </ul>
            </nav>}
            {/* </div> */}

            <div className="sub-nav-outlet">
                <Outlet />
            </div>
        </>
    )

}
export default Police;
















