import React, { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa6'
import { useParams } from 'react-router-dom';
import './multipleSelection.css'

export const MultipleSelection = ({ fetchedRoles, selectedRoles, setSelectedRoles, isEditable = true }) => {

  console.log(fetchedRoles, isEditable, "fetched roles in Multiple Selection")

  const { id } = useParams()

  const handleRoleSelection = (e) => {
    const roleName = e.target.name;
    const isChecked = e.target.checked;
    fetchedRoles.forEach(item => {
      if (roleName === item.code) {
        item.value = isChecked ? 1 : 0
      }
      return item
    })
    console.log(fetchedRoles, "new updated selection")
    const newSelection = fetchedRoles.filter(item => item.value === 1)
    console.log(newSelection, "new updated selection")
    setSelectedRoles(newSelection);
  };

  const checkValue = (arg) => {
    if (id) {
      return selectedRoles.some((item) => item.code === arg && item.value === 1);
    } else {
      return selectedRoles.some((item) => item.code === arg);
    }
  };
  

  return (
    <>
      {fetchedRoles?.map((role) => (
        <div key={role.id} className={`field_wrapper field_wrapper_row checkbox_container ${checkValue(role?.code) ? 'green_checkbox' : 'gray_checkbox'}`}>
          <div className="checkbox-wrapper-26">
            <input type="checkbox" id={`_checkbox-${role.id}`} name={role.code} checked={checkValue(role?.code)} onChange={isEditable ? handleRoleSelection : null} />
            <label htmlFor={`_checkbox-${role.id}`}>
              <div className="tick_mark"></div>
            </label>
          </div>
          <label htmlFor={`_checkbox-${role.id}`} className='' style={{ cursor: 'pointer',fontSize:"13px" }} >
            {role.name}
          </label>
        </div>
      ))}
    </>
  );
};
