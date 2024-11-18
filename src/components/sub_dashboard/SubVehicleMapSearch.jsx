import React from 'react'
import MAPLayout  from '../map'
import {IoIosArrowDown} from 'react-icons/io'
import {BsSearch} from 'react-icons/bs'

const SubVehicleMapSearch = () => {
  return (
    <div>
      <div className='sub-vehicle-map-container'>
        <MAPLayout/>
      </div>
      <div className='sub-vehicle-search-content'>
        <h3><IoIosArrowDown/>Search Option</h3>
        <input type="text" placeholder='Enter Min Six digit of Vehivle No'/><BsSearch/>
      </div>
    </div>
  )
}

export default SubVehicleMapSearch