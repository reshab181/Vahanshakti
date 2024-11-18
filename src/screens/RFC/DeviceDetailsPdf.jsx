import React, { useEffect, useState } from 'react'
import '../deviceApproval/DeviceDetailsPdfStyle.css'
import { QRCodeSVG } from 'qrcode.react';
import { useParams } from 'react-router-dom';
import { LoadingWidget } from '../../components/loading';
import { searchEMEIDevice } from '../../apis/deviceInventory';
import { getCurrentDate, indianDate } from '../../components/Common/PowerUpFunctions';
import Swal from 'sweetalert2';

const DeviceDetailsPdf = () => {

    const { imei } = useParams()

    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)

    const getOneDayBeforeDate = (date) => {

        const [day, month, year] = date.split('-');
        const currentDate = new Date(`${year}-${month}-${day}T00:00:00`);

        const oneDayBeforeDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000));

        const formattedDate = oneDayBeforeDate.toLocaleDateString('en-GB');

        return (formattedDate.replaceAll('/', '-'));

    }

    const fetchData = async (userImei) => {

        setLoader(true)

        const response = await searchEMEIDevice(imei ? imei : userImei)

        console.log('vltd certificate response: ', response)

        if (response?.status) {

            if (response?.result?.length === 0) {

                const messageResp = await Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: "No Data Found!"
                })

                if (data === null && messageResp) {
                    userInputImei()
                }

            } else {

                let details = response?.result[0]

                setData({
                    "Activation No.": details?.reciptNo,
                    "Activation Date ": indianDate(details?.deviceactivatedon),
                    "Next Renewal Date": getOneDayBeforeDate(indianDate(details?.iccidValidUpto)),
                    "Renew Date": indianDate(getCurrentDate()),
                    "Vehicle No.": details?.vehicleRegistrationNumber || "N/A",
                    "Chassis No.": details?.chassisNo || "N/A",
                    "Permit Holder Name": details?.ownerName || "N/A",
                    "Permit Holder No.": details?.ownerPhoneNumber || "N/A",
                    "Manufacturer Name": details?.mnfName || "N/A",
                    // "ManufacturerCode": "N/A",
                    "Model Name": details?.vltdModelCode || "N/A",
                    "Device Sr. No.": details?.deviceSerialNo || "N/A",
                    "IMEI No.": details?.imeiNo || "N/A",
                    "ICCID No.": details?.iccidNumber || "N/A",
                    "Sim Validity": indianDate(details?.iccidValidUpto),
                    "VLTD Backend System Validity": indianDate(details?.iccidValidUpto),
                    "Owner Name":details?.ownerName,
                    "Owner Email":details?.ownemail,
                    "Owner Phone":details?.ownerPhoneNumber,
                    "Owner Address":details?.ownerAddress
                })

            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: response?.message
            })
        }

        setLoader(false)

    }

    const userInputImei = async (type) => {
        const { value: imeino } = await Swal.fire({
            title: "Enter IMEI No.",
            input: "text",
            inputLabel: "",
            inputValue: '',
            showCancelButton: true,
            allowEscapeKey: false,
            // backdrop: false,
            inputValidator: (value) => {
                if (!value) {
                    return "Enter IMEI No.!";
                }
            }
        });
        if (imeino) {
            fetchData(imeino)
        }
    }

    useEffect(() => {
        imei &&  fetchData() 
        // : userInputImei()
    }, [imei])

    if (loader) {
        return 
    }

    return (
        <>
            {!imei && data !== null && <button className='print_button' style={{ margin: '10px' }} onClick={() => userInputImei('close')}>Change IMEI</button>}
            {!imei && data === null && <button className='print_button' style={{ margin: '10px' }} onClick={() => userInputImei()}>Enter IMEI</button>}

            <div id='printable' className='print_container' style={{ filter: data === null ? 'blur(5px)' : '' }}>

                <div className="template_heading_container">

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <h1>Maharashtra State Backend System.</h1>
                            <p style={{ marginTop: '-20px' }}>AIS-140 Device Activation Slip <br />
                                (In Compliance to CMVR 125 H)
                            </p>
                        </div>

                        <QRCodeSVG fgColor="#232222" value={JSON.stringify(data)} size={150} />
                    </div>

                </div>

                {
                    data != null &&
                    <div className="template_table_container">

                        <div className="template_table_heading" style={{ borderTop: 'none' }}>
                            <svg width="12" height="20" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="12" height="20" rx="3" fill="#a1c7fc" />
                            </svg>
                            <span>Activation Details</span>
                        </div>

                        <div className="template_table_cell">

                            <div className="br bb">Activation No. - {data["Activation No."] || 'N/A'} </div>
                            <div className="bb">Activation Date - {data["Activation Date "] || 'N/A'}</div>
                            <div className="br">Next Renewal Date - {data["Next Renewal Date"] || 'N/A'}</div>
                            <div className="">Renew Date - {data["Renew Date"] || 'N/A'}</div>

                        </div>

                        <div className="template_table_heading">
                            <svg width="12" height="20" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="12" height="20" rx="3" fill="#a1c7fc" />
                            </svg>
                            <span>Vehicle Details</span>
                        </div>

                        <div className="template_table_cell">

                            <div className="br bb">Vehicle No. - {data["Vehicle No."] || 'N/A'} </div>
                            <div className="bb">Chassis No. - {data["Chassis No."] || 'N/A'}</div>
                            <div className="br">Permit Holder Name - {data["Permit Holder Name"] || 'N/A'} </div>
                            <div className="">Permit Holder No. - {data["Permit Holder No."] || 'N/A'}</div>

                        </div>

                        <div className="template_table_heading">
                            <svg width="12" height="20" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="12" height="20" rx="3" fill="#a1c7fc" />
                            </svg>
                            <span>VLT Device Details</span>
                        </div>

                        <div className="template_table_cell">

                            <div className="bb br">Manufacturer Name - {data["Manufacturer Name"] || 'N/A'} </div>
                            {/* <div className="bb">ManufacturerCode - {data["ManufacturerCode"] || 'N/A'}</div> */}
                            <div className="bb br">Model Name - {data["Model Name"] || 'N/A'} </div>
                            <div className="bb br">Device Sr. No. - {data["Device Sr. No."] || 'N/A'}</div>
                            <div className="br br">IMEI No. - {data["IMEI No."] || 'N/A'} </div>
                            <div className="">ICCID No. - {data["ICCID No."] || 'N/A'}</div>

                        </div>

                        <div className="template_table_heading">
                            <svg width="12" height="20" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="12" height="20" rx="3" fill="#a1c7fc" />
                            </svg>
                            <span>Validity Details</span>
                        </div>

                        <div className="template_table_cell">

                            <div className="br">Sim Validity - {data["Sim Validity"] || 'N/A'}</div>
                            <div className="">VLTD Backend System Validity - {data["VLTD Backend System Validity"] || 'N/A'}</div>

                        </div>

                        <div className="template_table_heading">
                            <svg width="12" height="20" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="12" height="20" rx="3" fill="#a1c7fc" />
                            </svg>
                            <span>Address Details</span>
                        </div>

                        <div className="template_table_cell">

                            <div className="br bb">Owner Name - {data["Owner Name"] || 'N/A'}</div>
                            <div className="bb">Owner Phone - {data["Owner Phone"] || 'N/A'}</div>
                            <div className="br">Owner Email - {data["Owner Email"] || 'N/A'}</div>
                            <div className="">Owner Address - {data["Owner Address"] || 'N/A'}</div>

                        </div>

                    </div>
                }

                <div className="template_bottom_note">
                    <div className="template_note">NOTE</div>
                    <p>
                        It is a system generated receipt does not require any signature. The activation receipt is only valid for the permit holder, device.
                    </p>
                </div>

                <button className='print_button' onClick={() => window.print()}>Print</button>
            </div>
        </>
    )
}

export default DeviceDetailsPdf