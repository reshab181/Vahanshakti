import React from 'react'
import MAPLayout  from './map'

const VehicleReg = () => {
  return (
    <div style={{display:"flex",marginLeft:"20px",marginRight:"30px",marginTop:"20px"}}>
        <div style={{width:"25%"}}>
            <p>VLTD IMEI : 747647448</p>
            <p>Vehicle Reg No : hee37773</p>
            <p>Vehicle Class : Motor CAb</p>
            <p>Permit Holder : Chandan</p>
            <p>Engine Status : on</p>
            <p>Emergency status : off</p>
            <p>GPS SIgnal Available : right</p>
            <p>Direction : N/A</p>
            <p>Latitudes And Longitudes : 24.448,80.6464</p>
            <p>Last Alerts : Device Tempered</p>
            <p>DAte and Time : 21/08/2023</p>
        </div>
        <div style={{width:"75%"}}>
            <MAPLayout/>
        </div>
    </div>
  )
}

export default VehicleReg