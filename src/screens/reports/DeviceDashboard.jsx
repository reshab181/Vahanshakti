import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { BaseURLInTouch } from '../../constants/baseURL';
// import { Link } from "react-router-dom"
const DeviceDashboard = () => {
    let { navigationOpen } = useSelector((state) => state.common);
    console.log(navigationOpen);
    const [loading, setLoading] = useState(true);
    let accessToken = sessionStorage.getItem('access_token')
    const iframeRef = `${BaseURLInTouch}/nextgen/#/login?access_token=${accessToken}&landingPage=dashboard/main`;
    return (
        <>
        <div className={navigationOpen ? "iframe-expand" : "iframe-shrink"}>
        { loading ? <div className="loader-container-expand loader-center"><div className="loader"></div></div> : <></> }
        <iframe
            id="iframe-id"
            src={iframeRef}
            onLoad={() => setLoading(false)}
            style={{ 'display': loading ? 'none' : 'block' }}
        />
        </div>
        </>
        )   
}
export default DeviceDashboard;