import React, { useState, useEffect } from 'react';
import { IoIosCheckmarkCircle } from "react-icons/io";

import { BiRadioCircleMarked } from "react-icons/bi";

import './multipleSelection.css'

export const MultipleSelectionRes = ({ fetchedRoles, setSelectedRoles, responsibilityMap, isEditable = true }) => {

  const [fetchedDataRole, setFetchedDataRole] = useState(null)

  useEffect(()=>{
    const userType = sessionStorage.getItem("userType")
    const updatedRole = fetchedRoles.filter(role=>responsibilityMap?.[role?.code]?.["userTypes"]?.[userType]).map(role => {return { ...role,  ...responsibilityMap?.[role?.code], ...responsibilityMap?.[role?.code]?.["userTypes"]?.[userType], value:0}});
    const mapLayout = {}
    updatedRole.forEach(item=>{
      if(item?.tag in mapLayout){
        mapLayout[item.tag] = [...mapLayout[item.tag], item]
      } else {
        mapLayout[item.tag] = [item]
      }
    })
    setFetchedDataRole(mapLayout)
  },[])
  

  const handleRoleSelection = (e, sectionHeader, roleName) => {
    e.preventDefault()
    
    const originalMap = {...fetchedDataRole}
  
    originalMap[sectionHeader] = originalMap[sectionHeader].map(item=>{
      
      if (roleName === item.code) {
        item.value = !item.value ? 1 : 0
      }
      return item
    })
    
    setFetchedDataRole(originalMap)
    
    const selectedArray = [].concat.apply([], Object.values(originalMap)).filter(item=>item.value===1)
    setSelectedRoles(selectedArray);
  };

  return (
    <>
      {fetchedDataRole && console.log(Object.keys(fetchedDataRole), fetchedDataRole, isEditable , "fetchedDataRole")}
      {fetchedDataRole && Object.keys(fetchedDataRole)?.map(itemType=>{
        
        return  <div style={{marginTop:"20px"}}>
                    <p><b>{fetchedDataRole[itemType][0]["label"]}</b></p>
                   
                    <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row" , margin:"5px"}}>
                   
                    {fetchedDataRole[itemType]?.map((role) => (
                    <div key={role.id} className={`${role?.value ? 'green_checkbox' : 'gray_checkbox'}`} onClick={isEditable ? (e)=>handleRoleSelection(e,itemType, role.code) : null} style={{display:"flex", margin:"2px 5px", padding:"4px", alignItems:"center"}}>
                      {/* <div className="checkbox-wrapper-26">
                        <input type="checkbox" id={`_checkbox-${role.code}`} name={role.code} checked={role?.value}  />
                        <label htmlFor={`_checkbox-${role.code}`}>
                          <div className="tick_mark"></div>
                        </label>
                      </div> */}
                      {role?.value ? <IoIosCheckmarkCircle size={"1.2rem"}/> : <BiRadioCircleMarked size={"1.2rem"}/>}
                      <label htmlFor={`_checkbox-${role.id}`} className='' style={{ cursor: 'pointer',fontSize:"12px", margin:"auto 5px" }} >
                        {role.name}
                      </label>
                    </div>
                  ))  
                  }
                </div>
            </div>})}
    </>
  );
};
