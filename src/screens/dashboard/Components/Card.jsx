import React, { useEffect, useState } from 'react'
import './Card.css'

const Card = ({ title = '', count = 0, loading=false }) => {

  
  return (
    <>
      <div className='card_container'>
        <div>{count}</div>
        <div>{title}</div>
      </div>
    </>
  )
}

export default Card