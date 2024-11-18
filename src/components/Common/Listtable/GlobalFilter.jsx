import React from 'react'
import './style.css'
import { useTranslation } from "react-i18next";

function GlobalFilter({ filter, setFilter }) {

  const {t}=useTranslation()

  return (
    <div className='search_container'>
      <span>{t('basicWord.SearchText')}</span>
      <input className='search border-2 border-gray-600 px-2 bg-gray-200' type="text" value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </div>
  )
}

export default GlobalFilter
