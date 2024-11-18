import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { BaseURLInTouch } from '../../constants/baseURL';

const LongTrails = () => {
    let { navigationOpen } = useSelector((state) => state.common);
    console.log(navigationOpen);
    const [loading, setLoading] = useState(true);
    let accessToken = sessionStorage.getItem('access_token')
    const [iframeRef, setIframeUrl] = useState(`${BaseURLInTouch}/nextgen/#/login?access_token=${accessToken}&landingPage=trails/longtrails`);
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
export default LongTrails;


