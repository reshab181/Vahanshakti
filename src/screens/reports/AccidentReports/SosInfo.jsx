/*
==================================================================
# Component: SosInfo.jsx
# Status: Closed
# Description: Info card for SosInfoList.jsx
==================================================================
*/

import React, { useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import { getDocumentFullUrl } from '../../../apis/accidentApi'
import { Puff } from 'react-loader-spinner'
import { RxCross2 } from 'react-icons/rx'
import './InfoStyle.css'

const SosInfo = (props) => {
  console.log(props?.data, "SosInfoHDH82738")
  const [loader, setLoader] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const dialogRef = useRef()

  let data1 = [
    { name: 'Created Date', value: props?.data?.creationDt },
    { name: 'Created By', value: props?.data?.createdBy },
    { name: 'SOS Date Time', value: props?.data?.sosDate },
    { name: 'Owner Name', value: props?.data?.ownerDet },
    { name: 'Owner Mobile No.', value: props?.data?.ownerPhone },
  ]

  let data2 = [
    { name: 'Person Name', value: props?.data?.personName },
    { name: 'Person Gender', value: props?.data?.gender },
    { name: 'Person Mobile No.', value: props?.data?.mobileNo },
  ]

  let data3 = props?.data?.sosInfoNoteDatas

  const viewDocument = async (file) => {
    setLoader(file)
    const fileUrl = await getDocumentFullUrl(file);
    setImageUrl(fileUrl)
    dialogRef.current.showModal()
    setLoader('')
  }

  const closeDialog = () => {
    dialogRef.current.close()
    setImageUrl('')
  }

  return (
    <>
      <div className='info_container'>

        <button onClick={() => props?.back()} style={{ position: 'absolute', left: '5px', top: '5px', color: 'rgba(0,0,0,0.8)', outline: 'none', border: '1px solid gainsboro', padding: '4px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Back To List</button>

        <h1 className='info_main_heading'>SOS Info</h1>

        <section className='info_section'>

          <i className='info_heading'>Basic Details</i>

          <div className="detail_card">
            {
              data1?.map((elem, index) =>
                <div key={index} className="detail_wrap">
                  <div className="key">{elem?.name}</div>
                  <div className="value">{elem?.value || "N/A"}</div>
                </div>
              )
            }
          </div>

        </section>

        <section className='info_section'>

          <i className='info_heading'>SOS Triggered Person Details</i>

          <div className="detail_card">
            {
              data2?.map((elem, index) =>
                <div key={index} className="detail_wrap">
                  <div className="key">{elem?.name}</div>
                  <div className="value">{elem?.value || "N/A"}</div>
                </div>
              )
            }
          </div>

        </section>

        <section className='info_section'>
          <i className='info_heading'>Actions Report</i>
          <div className="detail_card">
            {
              data3?.map((elem, index) =>
                <div key={index}>
                  <p className="key">{`${elem?.remarks} as reported by ${elem?.createdBy} on ${elem?.creationDt.split("T")[0]}`}</p>
                </div>
              )
            }
          </div>
        </section>

        <section className='info_section'>

          <i className='info_heading'>Uploaded Images</i>

          <div className="detail_card">
            {
              props?.data?.imgInfo?.map((elem, index) =>
                <>

                  <div key={index} className="detail_wrap">
                    <div className="key view_line">
                      <span>{elem?.doctype || "N/A"}</span>
                      {
                        loader !== elem?.docName ?
                          <span style={{ cursor: 'pointer' }} onClick={() => viewDocument(elem?.docName)}><FaEye size={16} color='#066e1d' /></span>
                          :
                          <>
                            <Puff
                              visible={true}
                              height="20"
                              width="20"
                              color="#4fa94d"
                              ariaLabel="puff-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                            />
                          </>
                      }
                    </div>
                    <div className="value">{elem?.docName || "N/A"}</div>
                  </div>

                </>
              )
            }
          </div>

        </section>

        <div style={{ height: '5vh' }}></div>

      </div>

      <dialog ref={dialogRef} style={{ padding: '20px', boxShadow: '0px 0px 20px #a7a7a7' }} className='animate__animated animate__zoomIn animate__faster'>
        <span onClick={() => closeDialog()} style={{ cursor: 'pointer', backgroundColor: 'red', color: 'white', position: 'absolute', right: '2px', top: '2px' }}><RxCross2 size={20} /></span>
        <div className='image_contain' style={{ position: 'relative' }}>
          {
            imageUrl &&
            <img src={imageUrl} style={{ objectFit: 'contain' }} alt="" srcSet="" />
          }
        </div>
      </dialog>

    </>
  )
}

export default SosInfo