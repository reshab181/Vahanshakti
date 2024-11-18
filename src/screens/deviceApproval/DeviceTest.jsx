import { Outlet, Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom"
import BackButton from "../../components/Common/BackButton";

const DeviceTest = () => {
    const location = useLocation()
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
      }
    return (
        <>

                <nav className="sub-nav">
                    <BackButton />
                    <ul className ="sub-nav-item">
                        <li>
                            <Link className = {` ${matchRoute(`DeviceTesting/deviceTest/:id?`)?"sub-nav-text-active":"sub-nav-text"}`} to={`/DeviceTesting/deviceTest`}>Control Tower</Link>
                        </li>
                      
                    </ul>
                </nav>      
            

            <div className="sub-nav-outlet">
                <Outlet />
            </div>
        </>
    )
}

export default DeviceTest