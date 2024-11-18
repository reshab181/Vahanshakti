import React, { useEffect, useState } from 'react'
import MAPLayout from '../../components/map'
import { useLocation, useParams } from 'react-router-dom'
import { indianDate, nullToNA } from '../../components/Common/PowerUpFunctions'
import { fetchLiveData } from '../../apis/permit'

const PermitHolderDetailLive = () => {
  const [dataList, setDataList] = useState(null)
  const [coordinates, setCoordinates] = useState([])
  const [htmlData, setHtmlData] = useState('')
  const location = useLocation();

  const epochToDateTime = (stamp) => {
    let date = new Date(stamp * 1000);
    
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
  
    let dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    let dt = `${day}-${month}-${year}`

    return dt;
  };

  useEffect(()=>{
    console.log(location.state);
    setDataList(location.state)

  },[location.state])

  useEffect(()=>{

    const fetchLiveLocation = async() => {
      const res = await fetchLiveData()
      console.log(res, "permitfetchLiveLocation");
      setHtmlData(`<div style='background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 10px; max-width: 500px; margin: 0;'><h2 style='border-bottom: 1px solid gainsboro; padding-bottom: 5px;'>Vehicle Details</h2><div style='margin: 0px 0;'><p><strong>Registration Number:</strong> ${res[0]?.registrationNumber}</p><p><strong>latitude:</strong> ${res[0]?.latitude}</p><p><strong>Longitude:</strong> ${res[0]?.longitude}%</p><p><strong>Address:</strong> ${res[0]?.address}</p></div></div>`);
      let data = res?.map((item) => [item?.latitude, item?.longitude])
      console.log(data);
      setCoordinates(data)
    }

    fetchLiveLocation()
    
  },[])

  const contentView = (name = '', value = '', file = false, isDate = false, type = '') => {

      return (
        <>
          {!Array.isArray(value) && <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
            <span className="table-card-key sub-heading">{name} </span>
            <div className="table-card-value text">{isDate ? indianDate(value) : nullToNA(value)}</div>
          </div>}
        </>
      )
  }

  return (
    <div>
      <div >
        <div>
        <div className="" style={{display:"flex",gap:"10px"}}>

          <div className="id_top_content_container" style={{width:"60%"}}>
            {dataList &&
              Object?.keys(dataList)?.map((key, index) =>
                contentView(
                  key, 
                  dataList[key], 
                  ['copCertificate', 'fileUploadProtocolSpec', 'fileUploadTechnicalSpec', 'tacCertificate', 'ddDet'].includes(key),
                  ['copCertificateExpiry', 'copApprovalDate', 'approvedon', 'uploadedon', 'createdOn', 'tacApprovalDate', 'tacCertificateExpiry'].includes(key),
                  )
              )
            }
          </div>

          <div className="map-new-container" style={{marginTop:"5px"}}>
            <MAPLayout heights={"90vh"} data={coordinates} htmlData={htmlData}/>
            </div>

        </div>
        </div>
    </div>

    </div>
  )
}

export default PermitHolderDetailLive