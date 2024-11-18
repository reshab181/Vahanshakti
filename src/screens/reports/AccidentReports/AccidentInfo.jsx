
import React, { useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import { getDocumentFullUrl } from '../../../apis/accidentApi'
import { Puff } from 'react-loader-spinner'
import './InfoStyle.css'
import { RxCross2 } from 'react-icons/rx'

const AccidentInfo = (props) => {

  const [loader, setLoader] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const dialogRef = useRef()

  let data1 = [
    { name: 'Created Date', value: props?.data?.createdDt },
    { name: 'Created By', value: props?.data?.createdBy },
    { name: 'Accident Date Time', value: props?.data?.accidentDt },
    { name: 'Latitude', value: props?.data?.lat },
    { name: 'Longitude', value: props?.data?.lng },
    { name: 'Address', value: props?.data?.address },
    { name: 'Accident Info', value: props?.data?.accidentInfo },
  ]

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

        <h1 className='info_main_heading'>Accident Info</h1>

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

          <i className='info_heading'>Involved Parties Details</i>

          <div className="detail_card">
            {
              props?.data?.partiesDetails?.map((elem, index) =>
                <>
                  <div key={index} className="detail_wrap">
                    <div className="key">Sl.No.</div>
                    <div className="value">{index + 1}</div>
                  </div>

                  <div key={index} className="detail_wrap">
                    <div className="key">Name</div>
                    <div className="value">{elem?.name || "N/A"}</div>
                  </div>

                  <div key={index} className="detail_wrap">
                    <div className="key">Mobile No.</div>
                    <div className="value">{elem?.phone || "N/A"}</div>
                  </div>

                  <div key={index} className="detail_wrap">
                    <div className="key">Vehicle No.</div>
                    <div className="value">{elem?.vehNumber || "N/A"}</div>
                  </div>

                  {index !== props?.data?.partiesDetails?.length - 1 && <>
                    <div style={{ width: '100%', height: '0.1vh', backgroundColor: 'gainsboro' }}></div>
                  </>}

                </>
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

export default AccidentInfo