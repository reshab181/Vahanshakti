import React from 'react'

const DeviceDetailsTableEmplanment = (props) => {
    
    const deviceTestingStatus = JSON.parse(props.dataList.testingStatus) || [
        { "id": "login_packet", "name": "Login Packet", 'status': '-1'},
        { "id": "actv_packet", "name": "ACTV Packet", 'status': '-1'},
        { "id": "hchk_packet", "name": "HCHK Packet", 'status': '-1'},
        { "id": "pvt_packet", "name": "PVT Packet", 'status': '-1'},
        { "id": "ignition_on_alert", "name": "IGNITION ON Alert", 'status': '-1'},
        { "id": "ignition_off_alert", "name": "IGNITION OFF Alert", 'status': '-1'},
        { "id": "emergency_on_primary", "name": "EMERGENCY ON Primary", 'status': '-1'},
        { "id": "emergency_off_primary", "name": "EMERGENCY OFF Primary", 'status': '-1'},
        { "id": "emergency_on_secondary", "name": "EMERGENCY ON Secondary", 'status': '-1'},
        { "id": "emergency_off_secondary", "name": "EMERGENCY OFF Secondary", 'status': '-1'},
        { "id": "battery_disconnect_alert", "name": "BATTERY DISCONNECT Alert", 'status': '-1'},
        { "id": "battery_connect_alert", "name": "BATTERY CONNECT Alert", 'status': '-1'},
        { "id": "device_tamper_alert", "name": "DEVICE TAMPER Alert", 'status': '-1'},
        { "id": "overspeed_alert", "name": "OVERSPEED Alert", 'status': '-1'},
      ]

    console.log(deviceTestingStatus, "Device testing Status Passed")


    return (
        <>
            <div className={`table-container border_top`}>

                <table className="table table_main_container" style={{ overflowX: 'auto' }}>
                    <thead className='table-header' style={{ width: '100%' }}>
                        <tr style={{ width: '100%' }}>
                            <th>Sl.No.</th>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>

                    </thead>
                    <tbody className="table-body">
                        
                            {deviceTestingStatus && deviceTestingStatus.length > 0 &&
                            <>
                                {deviceTestingStatus.map((row, index) =>
                                    <tr key={index} className="table-row">
                                        <td key={index} className="table-cell">{index + 1}</td>
                                        <td key={index} className="table-cell">{row?.name}</td>
                                        <td key={index} className="table-cell">{row?.status == 1 ? "OK" :row?.status == 0 ? "Not Recieved" : row?.status == 2 ? "Rejected" :"Pending"}</td>
                                    </tr>
                                )}
                            </>}
                    </tbody>
                </table>

                <div className='table-card'>
                    {
                        deviceTestingStatus && deviceTestingStatus.length > 0 && deviceTestingStatus.map((row, index) => {
                            return (
                                <div key={index} className="table-card-items">
                                    <div key={index} className="table-card-cell">
                                        <span className="table-card-key sub-heading">Sl.No.: </span>
                                        <div className="table-card-value text">{index + 1}</div>
                                    </div>
                                    <div key={index} className="table-card-cell">
                                        <span className="table-card-key sub-heading">Title: </span>
                                        <div className="table-card-value text">{row?.name}</div>
                                    </div>
                                    <div key={index} className="table-card-cell">
                                        <span className="table-card-key sub-heading">Status: </span>
                                        <div className="table-card-value text">
                                        
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        }
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default DeviceDetailsTableEmplanment