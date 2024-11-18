/*
==================================================================
# Component: SosInfoList.jsx
# Status: Closed
# Description: Report for Sos Info Form.
==================================================================
*/

import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa6";
import { useFormik } from "formik";
import * as yup from 'yup'
import { getBeforeDate, getCurrentDate } from "../../../components/Common/PowerUpFunctions";
import ListTable from "../../../components/Common/Listtable/ListTable";
// import '../DeviceReports/DeviceReportIndex.css'
import ShimmerLoader from "../../../components/Common/Listtable/ShimmerLoader";
import React from 'react'
import { getSosInfo } from "../../../apis/accidentApi";
import SosInfo from "./SosInfo";

const SosInfoList = () => {

  const [sosInfoList, setSosInfoList] = useState([])

  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false)
  const [currentData, setCurrentData] = useState(null)

  const initialValues = {
    fromDate: getBeforeDate(90),
    uptoDate: getCurrentDate(),
  }

  const validationSchema = yup.object().shape({
    fromDate: yup.date().required('From Date is required').max(yup.ref('uptoDate'), "From Date can't be greater than Upto Date"),
    uptoDate: yup.date().required('Upto Date is required').max(getCurrentDate(), 'Upto Date must be before or equal to current date').min(yup.ref('fromDate'), 'Upto Date must be after or equal to From Date'),
  })

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetchData(values)
    }
  })

  const fetchData = async (values) => {

    setLoading(true)

    let body = {
      fromDate: values?.fromDate,
      toDate: values?.uptoDate,
      entityId: sessionStorage.getItem('entityId') || -1,
    }

    let response = await getSosInfo(body)

    if (response?.status == true) {
      setSosInfoList(response?.result)
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(formik.values);
  }, []);

  const toggleList = (obj) => {
    setCurrentData(obj)
    setToggle(true)
  }

  const column = [
    {
      Header: '#',
      Cell: ({ cell }) => <>{cell?.row?.index + 1}</>
    },
    {
      Header: "Creation Date",
      accessor: "creationDt",
      Cell: ({ cell }) => (cell?.row?.original?.creationDt || "N/A")
    },
    {
      Header: "SOS Date",
      accessor: "sosDate",
      Cell: ({ cell }) => (cell?.row?.original?.sosDate || "N/A")
    },
    {
      Header: "Vehicle No.",
      accessor: "vehicleNo",
      Cell: ({ cell }) => (cell?.row?.original?.vehicleNo || "N/A"),
    },
    {
      Header: "Owner Name",
      accessor: "ownerDet",
      Cell: ({ cell }) => (cell?.row?.original?.ownerDet || "N/A"),
    },
    {
      Header: "Owner Mobile No.",
      accessor: "ownerPhone",
      Cell: ({ cell }) => (cell?.row?.original?.ownerPhone || "N/A")
    },
    {
      Header: "Person Name",
      accessor: "personName",
      Cell: ({ cell }) => (cell?.row?.original?.personName || "N/A")
    },
    {
      Header: "Person Gender",
      accessor: "gender",
      Cell: ({ cell }) => (cell?.row?.original?.gender || "N/A")
    },
    {
      Header: "Person Mobile No.",
      accessor: "mobileNo",
      Cell: ({ cell }) => (cell?.row?.original?.mobileNo || "N/A")
    },
    {
      Header: "Action",
      Cell: ({ cell }) => <>
        <button style={{ backgroundColor: '#3838b3', border: '1px solid #1a37c8', color: 'white', cursor: 'pointer', padding: '3px 7px' }} onClick={() => toggleList(cell?.row?.original)}>View</button>
      </>
    }
  ]

  return (
    <>
      {!toggle && <p className="table-listp" style={{ fontSize: '15px' }}>SOS Info List</p>}

      {!toggle && <form className="filter_container" onChange={formik.handleChange} onSubmit={formik.handleSubmit}>

        <div className="field_wrapper deviceReportFieldWrapper">
          <label htmlFor="fromDate">From Date <span className="validation_mark">*</span></label>
          <input type="date" disabled={loading} name="fromDate" className={(formik.touched.fromDate && formik.errors.fromDate) ? 'errorStyle' : ''} value={formik.values.fromDate} max={formik.values.uptoDate} id="" />
        </div>

        <div className="field_wrapper deviceReportFieldWrapper">
          <label htmlFor="uptoDate">Upto Date <span className="validation_mark">*</span></label>
          <input type="date" disabled={loading} name="uptoDate" className={(formik.touched.uptoDate && formik.errors.uptoDate) ? 'errorStyle' : ''} value={formik.values.uptoDate} min={formik.values.fromDate} max={getCurrentDate()} id="" />
        </div>

        <button disabled={loading} type="submit" className="filter_button"> <span><FaFilter size={18} fill="#fff" /></span><span>Search</span></button>

      </form>}

      {
        toggle ?
          <SosInfo data={currentData} back={() => setToggle(false)} />
          :
          <>
            {
              loading ?
                <div style={{ margin: '10px', padding: '15px', border: '1px solid gainsboro', backgroundColor: 'white' }}>
                  <ShimmerLoader />
                </div>
                :
                <ListTable dataList={sosInfoList} columns={column} heading={`Accident Info List`} />
            }
          </>
      }

    </>
  )
}

export default SosInfoList