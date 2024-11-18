
import React from 'react'
import './Table.css'

const Table = ({ data }) => {
  return (
    <>
      <div className="dash_table_container animate__animated animate__slideInRight animate__faster">

        <div className="dash_table_title">
          {data?.title ?? ''}
        </div>

        <div className="dash_table_header">
          {
            Array.isArray(data?.header) && data?.header?.map((elem, index) =>
              <div className="dash_table_header_cell" key={index}>
                {elem}
              </div>
            )
          }
        </div>

        {
          Array.isArray(data?.column) && data?.column?.map((elem, index) =>
            <div className={(index % 2 != 0 ? 'dash_table_column_color' : '') + ' dash_table_column'} key={index}>
              {elem?.map((val, index) =>
                <div className="dash_table_column_cell" key={index}>
                  {val}
                </div>
              )}
            </div>
          )
        }

      </div>

      <div className="dash_table_card_container animate__animated animated__fadeIn animate__faster">

        <div className="dash_table_card_title">
          {data?.title ?? ''}
        </div>

        {
          Array.isArray(data?.column) && data?.column?.map((elem, index) =>
            <div className={' dash_table_card_column_container'} key={index}>
              <div className="dash_table_card_column">
                {elem?.map((val, index) =>
                  <>
                    <span className="dash_table_card_header_cell" key={index}>{data?.header[index]}</span> <span className="dash_table_card_column_cell">: {val}</span>
                  </>
                )}
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Table