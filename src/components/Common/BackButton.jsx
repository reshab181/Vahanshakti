import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import './BackButton.css'

import { useTranslation } from 'react-i18next'

const BackButton = () => {

  const {t} = useTranslation()

  return (
    <>
      <div
        className='common_top_back_button'
        onClick={() => window.history.back()}>
        <span style={{marginTop: '4px'}}><FaArrowLeftLong /></span>
        <span>{t("basicWord.BackText")}</span>
      </div>
    </>
  )
}

export default BackButton