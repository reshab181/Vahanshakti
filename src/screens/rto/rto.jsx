import { Outlet, Link,  matchPath, useLocation  } from "react-router-dom";
import { useState, useEffect } from "react"
import BackButton from "../../components/Common/BackButton";

const RTO = () => {
    const location = useLocation()
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
      }

    const [mappedRoles, setMappedRoles] = useState(null)

    useEffect(() => {
    const allowedNavigationMap = JSON.parse(sessionStorage.getItem("allowedNavigationMap"))["rtos"]
    setMappedRoles(allowedNavigationMap.map(item=>item.code))
    }, []);

    console.log(mappedRoles, "mappedRolesRTO")
    
    return (
        <>
            {mappedRoles && <nav className="sub-nav">
                <BackButton />
                <ul className ="sub-nav-item">
                    <li>
                        <Link className = {` ${matchRoute(`rtos/listRTO`)?"sub-nav-text-active":"sub-nav-text"}`} to={`/rtos/listRTO`}>All RTO</Link>
                    </li>
                    {mappedRoles.includes("add_rto") && <li>
                        <Link className = {` ${matchRoute(`rtos/addRTO`)?"sub-nav-text-active":"sub-nav-text"}`} to={`/rtos/addRTO`}>Add RTO</Link>
                    </li>}
                </ul>
            </nav>}      

            <div className="sub-nav-outlet">
                <Outlet />
            </div>
        </>
    )
}

export default RTO