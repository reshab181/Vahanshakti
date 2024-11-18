import React from 'react'
import './notFound.css'
import { useNavigate } from 'react-router-dom'
import errorImage from '../../assets/errorImage.svg'

export const NotFound = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="wrap-error">
        <div className="container1">
              <div className="image-wrap">
                <img src={errorImage} height={'50%'} width={'100%'} alt="" />
                <p style={{marginBottom: '3rem'}}>We are sorry, but the page you requested is not found.</p>
                <button onClick={() => navigate('/dashboard')} className="button-home" href="#" title="">
                  Go to Dashboard
                </button>
              </div>
        </div>
      </div>
    </>
  )
}

