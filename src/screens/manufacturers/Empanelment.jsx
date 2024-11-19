import React, { useEffect, useState } from 'react'
import { confirmPendingData, getAllManufacturer, getAllPendingData } from '../../apis/manufacture';
import ListTable from '../../components/Common/Listtable/ListTable';
import { LoadingWidget } from '../../components/loading';
import { BiDetail } from "react-icons/bi";
import { IoIosRefreshCircle } from "react-icons/io";

import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { AddUser } from '../userManagement/userAdd';
import { BsXLg } from "react-icons/bs";
import './../deviceApproval/style.css'

const Empanelment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allPendingData, setAllPendingData] = useState([]);
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState({});
  const [entityCodeInput, setEntityCodeInput] = useState('');
  const [remarks, setRemarks] = useState('');
  const [showEntityCodeInput, setShowEntityCodeInput] = useState(false);
  const [MNFId, setMNFID] = useState(null)
  const [userAddition, setUserAddition] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [pendingMNFData, setPendingMNFData] = useState([])
  
  console.log(allPendingData, "allPendingData")

  const approvalSequence = e => {
    setSelectedValue(e.target.value)
    const code = filteredData.entityName.substring(0, 4).toUpperCase() + (Math.floor(1000 + Math.random() * 9000));
    setEntityCodeInput(code)
  }

  const refreshEntityCodeInput = e => {
    const code = filteredData.entityName.substring(0, 4).toUpperCase() + (Math.floor(1000 + Math.random() * 9000));
    setEntityCodeInput(code)
  }

  const closeRegisterForm = (e) => {
    e.preventDefault();
    setShowEntityCodeInput(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getAllPendingData();
      console.log(result.result, "MNF");
      const filteredManufactures = result.result.filter(mnf => mnf.status === 0);
      console.log(filteredManufactures, "filteredManufactures")
      setAllPendingData(filteredManufactures);
      setLoading(false);
    };

    fetchData();

  }, []);

  useEffect(() => {

    const fetchPendingMNFData = async() => {
      setLoading(true);
      const result = await getAllManufacturer();
      const filteredManufactures = result.filter(mnf => mnf.status === 2);
      setPendingMNFData(filteredManufactures);
      setLoading(false);
    }

    fetchPendingMNFData();
  }, []);


  const handleActivateMNF = async (e, data) => {
    e.preventDefault();
    
    setData(data)
    const filterKeys = [
      "id","firstName","lastName","email","phoneNo","entityName","addressType","address","district","areas","state","country","pinCode","kycgstpan","gstNo", "createdDt"
    ] 

    const filterdData = {}
    filterKeys.forEach((key)=>{
      if(key in data){
        filterdData[key] = data[key]
      }
    })
    
    setFilteredData(filterdData)
    console.log(filterdData, "filterdData")

      setShowEntityCodeInput(true);
      setEntityCodeInput('')
      setRemarks('')
    }

  const handleEntityCodeSubmit = () => {
    setShowEntityCodeInput(false);
    const updatedFilterdsData = { ...filteredData};
    confirmDeviceApproval(updatedFilterdsData);
  };
  
  const confirmDeviceApproval = async (data) => {
    
    try {
      console.log(data);
      {selectedValue === "1" ? data["status"] = 1 : data["status"] = 2}
      {selectedValue === "1" && (data["entityCode"] = entityCodeInput)}
      {selectedValue === "2" ? data["remarks"] = remarks : data["remarks"] = "Approved"}
      try{
        const result = await confirmPendingData(data);
        console.log("Manufacture approved successfully:", result);
        if (result.mnfid) {
          Swal.fire({
            title: 'Manufacture Approved!',
            text: result.message,
            icon: 'success',
          });
          setMNFID(result.mnfid)
          setUserAddition(true)
          // navigate('/userManagement/AddUser',)
          setEntityCodeInput('')
          setRemarks('')
        } else {
          Swal.fire({
            title: 'Manufacturer Rejected!',
            text: "Rejected Successfully",
            icon: 'error',
          });
        }
      }catch(err){
        Swal.fire({
          title: 'Error!',
          text: "Something Else",
          icon: 'error',
        });
      }
 
      // setUserAddition(true);
     
      const results = await getAllPendingData();
      setAllPendingData(results.result)
    } catch (error) {
      console.error("Error handling Manufacture approval:", error.message);
    }
  };

    const column = [
      {
        Header: 'Entity Name',
        accessor: "entityName",
        width:'15%',
        Cell: ({cell}) => <>
        {/* <div onClick={() => navigate("/manufacturers/empanelmentDetails", {state: cell?.row?.original})} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center',cursor:"pointer" }}>
          <span style={{color: '#42a4f5'}}>{cell?.row?.original?.entityName}</span>
        </div> */}
        <div className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center',cursor:"pointer" }}>
          <span style={{color: '#42a4f5'}}>{cell?.row?.original?.entityName}</span>
        </div>
        </>
      },
      {
        Header: "Phone No",
        accessor: 'phoneNo',
        Cell: ({cell}) => (cell?.row?.original?.phoneNo || 'N/A')
      },
      {
        Header: "Email",
        accessor: 'email',
        width:'10%',
        Cell: ({cell}) => (cell?.row?.original?.email || 'N/A')
      },
      {
        Header: "Address",
        accessor: 'state',
        width:'25%',
        Cell: ({cell}) => (`${cell?.row?.original?.address},  ${cell?.row?.original?.district},  ${cell?.row?.original?.state},  ${cell?.row?.original?.pinCode} ` || 'N/A')
      },
      {
        Header: "User",
        accessor: 'firstName',
        width:'10%',
        Cell: ({cell}) => (`${cell?.row?.original?.firstName}  ${cell?.row?.original?.lastName}` || 'N/A')
      },
      {
        Header: "Date",
        width:'10%',
        Cell: ({cell}) => (cell?.row?.original?.createdDt.replace("T", " ") || 'N/A')
      },

      {
        Header: "Action",
        Cell: ({ cell }) => {
          const status = cell?.row?.original?.status;
      
          if (status === 0) {
            return <p style={{padding:"7px", textAlign:"center",fontSize: '12px', fontWeight: '600', backgroundColor: 'rgba(255, 0, 0, 0.8)', color: 'white', cursor: 'pointer' }} onClick={(e)=>handleActivateMNF(e,cell?.row?.original)}>Activate</p>
            ;
          } else if (status === 1) {
            return <p style={{fontSize: '16px', fontWeight: '500', color: 'green' }} >Activated</p>
            ;
          } else if (status === 2) {
            return <p style={{ fontSize: '16px', fontWeight: '500', color: '#eb5e34' }}>Not Activated</p>;
          } else {
            return <p style={{ fontSize: '16px', fontWeight: '500', color: 'black' }}>Unknown Status</p>;
          }
        },
      },
    ]

    const column2 = [
      {
      Header: 'Entity Name',
      accessor: "entityName",
          width: '15%',
      Cell: ({ cell }) => <>
        <div onClick={() => navigate("/manufacturers/empanelmentDetails", {state: cell?.row?.original})} className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}  >
          <span style={{color: '#42a4f5'}}>{cell?.row?.original?.entityName}</span>
          </div>
        
      </>
    },
    {
      Header: "Entity Code",
      accessor: 'entitycode',
      Cell: ({cell}) => (cell?.row?.original?.entitycode || 'N/A')
    },
    {
      Header: "Address",
      accessor: 'address',
      Cell: ({cell}) => (cell?.row?.original?.address || 'N/A')
    },
    {
      Header: "District",
      accessor: 'district',
      Cell: ({cell}) => (cell?.row?.original?.district || 'N/A')
    },
    {
      Header: "Pin Code",
      accessor: 'pinCode',
      Cell: ({cell}) => (cell?.row?.original?.pinCode || 'N/A')
    },
    {
      Header: "Document",
      accessor: 'status',
      Cell: ({ cell }) => <>
        {
          cell?.row?.original?.status == 1 ?
            <p style={{  padding: '5px 7px', fontSize: '12px', fontWeight: '600', color: 'green', cursor: 'pointer',textAlign:"center" }}>Uploaded</p>
            :
            <p style={{  padding: '5px', fontSize: '12px', fontWeight: '600', color: 'black',textAlign:"center" }} >Pending</p>
        }
      </>}
  ]

  const contentView = (name = '', value = '') => {
    return (
    
        <div className={`table-card-cell`}>
        <span className="table-card-key sub-heading">{name} </span>
        <div className="table-card-value text">{value || "N/A"}</div>
        </div>
    
    )
}

  
  return (
    <>
    <div>
      <div className="table-header-section">
        <p className="table-listp" style={{marginTop:"10px",marginBottom:"10px"}}>Empanelment Requests Pending</p>
      </div>
      {userAddition ? (
          <AddUser entityName = {filteredData?.entityName}  userType="MNF" entityId = {MNFId}  navigateto={"/manufacturers/listManufacturer"} userDetails={{emailId:filteredData?.email, fullname:filteredData?.firstName + " " + filteredData?.lastName, contactNo:filteredData?.phoneNo, userName:entityCodeInput}}/>
        ) : loading ? (
        // Display a loading component while fetching data
        <div className="shimmer-container">
          {/* Render shimmer rows */}
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className="shimmer-row">
              {Array.from({ length: 6 }).map((_, cellIndex) => (
                <div key={cellIndex} className="shimmer-cell"></div>
              ))}
            </div>
          ))}
        </div>)
       : <>
        <ListTable dataList={allPendingData} columns={column}  heading="Manufacturer Onboarding Requests"/>
      </>}
      {showEntityCodeInput && (
        <div className="modal">
        <div className="modal-content">
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:"15px"}}>
            <p><b>Approve Manufacture Registration</b></p>
            <BsXLg onClick={closeRegisterForm} style={{ marginRight: "10px", fontSize: "18px", fontWeight: "bolder", cursor: "pointer" }} />
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
            {contentView("Entity Name", filteredData?.entityName)}
            {contentView("GST Number", filteredData?.gstNo)}
            {contentView("Email ID", filteredData?.email)}
            {contentView("Phone No", filteredData?.phoneNo)}
            {contentView("POC Name", filteredData?.firstName + " " + filteredData?.lastName)}
            {contentView("Address", filteredData?.address)}
            {contentView("District", filteredData?.district)}
            {contentView("State", filteredData?.state)}
            {contentView("Pin Code", filteredData?.pinCode)}
            {contentView("Date", filteredData?.createdDt.replace("T", " "))}
            
          </div>
          <div>
          
          <div>
              <select className="select-groups" onChange={(e) => approvalSequence(e)}>
                <option value="">select</option>
                <option value="1">Accept</option>
                <option value="2">Reject</option>
              </select>
            </div>
            {selectedValue === "1" && <><label htmlFor="entityCodeInput">Entity Code:</label>
            <div style={{display:"flex", gap:"2px", justifyContent:"space-between", alignItems:"center"}}>
              <input
                className="select-groups"
                disabled
                style={{padding:"5px 10px"}}
                type="text"
                id="entityCodeInput"
                value={entityCodeInput}
              />
              <IoIosRefreshCircle size="2rem" color="blue" onClick={()=>refreshEntityCodeInput()}/>
            </div></>}

            {selectedValue === "2" &&<><label htmlFor="">Remarks</label>
            <div style={{width:"95%"}}>
              <input type="text" 
              className="select-groups"
              style={{padding:"5px 10px"}}
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              />
            </div></>}

           <div className="form-submit-btn">
              <button onClick={handleEntityCodeSubmit}>Submit</button>
           </div> 
          </div>

        </div>
        </div>
      )}
    </div>
    
    {!userAddition ? <div>
      <div style={{marginTop:"20px",marginBottom:"10px"}}>
        <p className="table-listp">Manufacturers with Pending Document</p>
      </div>
      { loading ? <LoadingWidget/> : <>
        <ListTable dataList={pendingMNFData} userType="Manufacturer" columns={column2} heading="Manufacturer in Testing stage"/>
      </>}
    </div> : null}
    </>
  )
}

export default Empanelment