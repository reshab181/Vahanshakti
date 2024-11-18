
import React, { useEffect, useState } from 'react'
import { getApprovalDevice } from '../../../apis/deviceInventory';
import { getTestingDeviceList } from '../../../apis/dashboardApi';
import DeviceDetailsTableEmplanment from '../../dashboard/Components/DeviceTableEmplanlment';
import ListTable from '../../../components/Common/Listtable/ListTable';
import { useNavigate } from 'react-router-dom';

const TestingStatusApproval = ({uploadedDeviceDetail=null,refreshDeviceDetail,setColor5}) => {
  
  const userType = sessionStorage.getItem("userType")
  const [topTableData, setTopTableData] = useState([])
  const [uploadedDevice, setUploadedDevice] = useState(null)
  const [loader, setLoader] = useState(false)
  const [bottomTableData, setBottomTableData] = useState('')
  const navigate = useNavigate()

  console.log(TestingStatusApproval);
  let model_code = sessionStorage.getItem("model_code")
  console.log(model_code);

  useEffect(()=>{
    topTableData.length>0 && setColor5("enabledd")
  },[])

  useEffect(()=>{
    const fetchDevice = async() => {
      const res = await getApprovalDevice(uploadedDeviceDetail["modelCode"])
      console.log(res);
      setUploadedDevice(res)
      refreshDeviceDetail(uploadedDeviceDetail["modelCode"])
      // sessionStorage.setItem("model_code",'')
    }
    fetchDevice();
  },[])

  const fetchDeviceTestingData = async () => {
    setLoader(true)
    
    const data = await getTestingDeviceList(uploadedDeviceDetail["modelCode"])
    console.log('fetch device details: ', data)
    if (data?.status) {
      setLoader(false)
      setTopTableData(data?.result)
    } else {
      setLoader(false)
    }
  }
  useEffect(() => {
    uploadedDevice && uploadedDevice?.modelCode && fetchDeviceTestingData()
  }, [uploadedDevice])

  const topTableColumn = [
    {
      Header: '#',
      Cell: ({ row }) => <span>{row?.index + 1}</span>
    },
    {
      Header: 'Device Serial No.',
      accessor: 'deviceSerialNo',
      Cell: ({ cell }) => (<>
        <span>{cell?.row?.original?.deviceSerialNo || 'N/A'}</span>
      </>)
    },
    {
      Header: 'ICCID',
      accessor: 'iccid',
      Cell: ({ cell }) => (<>
        <span>{cell?.row?.original?.iccid || 'N/A'}</span>
      </>)
    },
    {
      Header: 'IMEI',
      accessor: 'imei',
      Cell: ({ cell }) => (<>
        <span>{cell?.row?.original?.imei || 'N/A'}</span>
      </>)
    },
    {
      Header: 'Model Code',
      accessor: 'modelCode',
      Cell: ({ cell }) => (<>
        <span> {cell?.row?.original?.modelCode || 'N/A'}</span>
      </>)
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ cell }) => (<>
        {
          cell?.row?.original?.status == '1' &&
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'green' }}>Approved</span>
        }

        {
          cell?.row?.original?.status == '2' &&
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'rgba(255, 0, 0, 0.8)' }}>Rejected</span>
        }

        {
          cell?.row?.original?.status == '0' &&
          <span style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: '#cccc00' }}>Not Received</span>
        }
      </>)
    },
    {
      Header: 'Action',
      Cell: ({ cell }) => <>
        <span className='' style={{ color: 'white', padding: '5px 7px', display: 'flex', justifyContent: 'center', width: 'max-content', alignItems: 'center', backgroundColor: 'rgba(0, 170, 0, 0.848)', cursor: 'pointer' }} onClick={() => setBottomTableData(cell?.row?.original)}>Log Details</span>
      </>
    }
  ]

  return (
    <>
      <p className='emplament-heading'>Testing Status</p>
      <div className="testing_container">

        {/* Table */}
        {topTableData && <ListTable viewStatus={true} dataList={topTableData} columns={topTableColumn} />}

        {bottomTableData && <div className="testing_details">
          <div className="bottom_table_container">
            <DeviceDetailsTableEmplanment
              dataList={bottomTableData}
            />
          </div>          
        </div>}
      </div>
      {console.log(userType === "SBU" , userType === "SUA" , uploadedDevice?.approvedbysb)}
      {(userType === "SBU" || userType === "SUA") && uploadedDevice?.approvalstatusbysb == 1 ?
      <div className="saveNextEmplamentButtonDevice">
          
      </div> : null}

      {topTableData.length>0 && <div style={{textAlign:"center"}}>
        <p style={{fontSize:"18px",color:"green"}}>Your Device is Successfully Added! Please wait for Approval</p>
      </div>}
    </>
  )
}

export default TestingStatusApproval

