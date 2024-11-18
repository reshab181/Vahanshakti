import React, { useEffect, useState } from "react";
import './Table.css'
import '../../manufacturers/components/UploadDetaisMNF.css'
import ListTable from '../../../components/Common/Listtable/ListTable.jsx';
import '../../../components/common.css'
import { AddUser } from "../../userManagement/userAdd.jsx";

export const BasicDetails = ({manufacturerData, usersList, setCurrentPanel, setStages}) => {
  console.log(manufacturerData, usersList, "Hello World")  
  const [loading, setLoading] = useState(true);
  const [adduserUI, setAddUserUI] = useState(false)
  


  const verticalCombinedUI = (label, value) => {
    return (
      <div className="col my-auto">
        <p
          style={{
            fontSize: "1rem",
            margin: "0",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: "1rem",
            margin: "0",
            padding: "2px 0",
            color: "#333",
          }}
        >
          {value || "N/A"}
        </p>
      </div>
    );
  };

  const column = [
    {
      Header: 'Full Name',
      accessor: "fullname",
          width: '15%',
      Cell: ({ cell }) => <>
        <div className="">
          <span>{cell?.row?.original?.fullname}</span>
        </div>
      </>
    },
    {
      Header: "User Name",
      accessor: 'username',
      Cell: ({ cell }) => (cell?.row?.original?.username || 'N/A')
    },
    {
      Header: "Designation",
      accessor: 'designation',
      Cell: ({ cell }) => (cell?.row?.original?.designation || 'N/A')
    },
    {
      Header: "Email Id",
      accessor: 'emailid',
      Cell: ({ cell }) => (cell?.row?.original?.emailid || 'N/A')
    },
    {
      Header: "Contact No",
      accessor: 'contactNo',
      Cell: ({ cell }) => (cell?.row?.original?.contactNo || 'N/A')
    },

  ];
    
    return (
        <div className='upload-details-container'>
          <p className="emplament-heading">Manufacture Details</p>
            <div>
              {manufacturerData ? (
                <div className="manufacturer-details-container">
                  <div className="manufacturer-details">
                    <div className="detail-row">
                      {verticalCombinedUI("Entity Code", manufacturerData.entitycode)}
                      {verticalCombinedUI("Entity Name", manufacturerData.entityName)}
                      {verticalCombinedUI("GST/PAN", manufacturerData.gstNo)}
                      {verticalCombinedUI("Location", manufacturerData.address)}
                      {verticalCombinedUI("District", manufacturerData.district)}
                      {verticalCombinedUI("State", manufacturerData.state)}
                      {verticalCombinedUI("Pin Code", manufacturerData.pinCode)}
                    </div>
                  </div>
                </div>
              ) : null}

              <div>
                <div style={{ margin: "10px", fontWeight: "600", display:"flex", justifyContent:"space-between"}}>
                  <p>Manufacturer User Details</p>
                  {adduserUI ? <button style={{background:"red", border:0, color:"white", padding:"3px 7px", borderRadius:"3px"}} onClick={()=>setAddUserUI(false)}>Cancel</button> : null}
                </div>
                {usersList && usersList.length>0 ? <ListTable viewStatus={true}
                  dataList={usersList} columns={column} /> : !adduserUI ? <div className="form-submit-btn" style={{}}><p>No User Mapped Yet!!</p><button  onClick={()=>setAddUserUI(true)}>Add User</button></div>:null}
                {adduserUI ? <AddUser entityName = {manufacturerData?.entityName}  userType="MNF" entityId = {manufacturerData?.id} navigateto={"/manufacturers/empanelment"}  /> : null}
              </div>
            </div>
          </div>
    )

};
