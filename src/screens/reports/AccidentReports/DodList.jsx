/*
==================================================================
# Component: DodInfoList.jsx
# Status: Closed
# Description: Report for Drivers on Duty Form.
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
import { getDodList } from "../../../apis/accidentApi";

const DodList = () => {

  const [dodList, setDodList] = useState([])

  const [loading, setLoading] = useState(false);

  const initialValues = {
    fromDate: getBeforeDate(90),
    uptoDate: getCurrentDate(),
  }

  const validationSchema = yup.object().shape({
    fromDate: yup.date().required('From Date is required').max(yup.ref('uptoDate'), "From Date can't be greater than Upto Date"),
    uptoDate: yup.date().required('Upto Date is required').min(yup.ref('fromDate'), 'Upto Date must be after or equal to From Date'),
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
      userId: sessionStorage.getItem('userid') || -1,
    }

    let response = await getDodList(body)

    if (response?.status == true) {
      setDodList(response?.result)
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(formik.values);
  }, []);

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
      Header: "Created By",
      accessor: "createdBy",
      Cell: ({ cell }) => (cell?.row?.original?.createdBy || "N/A"),
    },
    {
      Header: "Vehicle No.",
      accessor: "vehicleNumber",
      Cell: ({ cell }) => (cell?.row?.original?.vehicleNumber || "N/A"),
    },
    {
      Header: "IMEI",
      accessor: "imei",
      Cell: ({ cell }) => (cell?.row?.original?.imei || "N/A")
    },
    {
      Header: "Origin",
      accessor: "origin",
      Cell: ({ cell }) => (cell?.row?.original?.origin || "N/A")
    },
    {
      Header: "Trip Start",
      accessor: "tripStart",
      Cell: ({ cell }) => (cell?.row?.original?.tripStart || "N/A")
    },
    {
      Header: "Destination",
      accessor: "destination",
      Cell: ({ cell }) => (cell?.row?.original?.destination || "N/A")
    },
    {
      Header: "Trip End",
      accessor: "tripClosed",
      Cell: ({ cell }) => (cell?.row?.original?.tripClosed || "N/A")
    },
    {
      Header: "Driver Name",
      accessor: "driverName",
      Cell: ({ cell }) => (cell?.row?.original?.driverName || "N/A")
    },
    {
      Header: "Driver License No.",
      accessor: "driverLicence",
      Cell: ({ cell }) => (cell?.row?.original?.driverLicence || "N/A")
    },
    {
      Header: "Driver Phone No.",
      accessor: "driverPhone",
      Cell: ({ cell }) => (cell?.row?.original?.driverPhone || "N/A")
    },
    {
      Header: "Driver Address",
      accessor: "driverAddress",
      Cell: ({ cell }) => (cell?.row?.original?.driverAddress || "N/A")
    }
  ]

  return (
    <>
      <p className="table-listp" style={{ fontSize: '15px' }}>Drivers on Duty List</p>

      <form className="filter_container" onChange={formik.handleChange} onSubmit={formik.handleSubmit}>

        <div className="field_wrapper deviceReportFieldWrapper">
          <label htmlFor="fromDate">From Date <span className="validation_mark">*</span></label>
          <input type="date" disabled={loading} name="fromDate" className={(formik.touched.fromDate && formik.errors.fromDate) ? 'errorStyle' : ''} value={formik.values.fromDate} max={formik.values.uptoDate} id="" />
        </div>

        <div className="field_wrapper deviceReportFieldWrapper">
          <label htmlFor="uptoDate">Upto Date <span className="validation_mark">*</span></label>
          <input type="date" disabled={loading} name="uptoDate" className={(formik.touched.uptoDate && formik.errors.uptoDate) ? 'errorStyle' : ''} value={formik.values.uptoDate} min={formik.values.fromDate} id="" />
        </div>

        <button disabled={loading} type="submit" className="filter_button"> <span><FaFilter size={18} fill="#fff" /></span><span>Search</span></button>

      </form>

      {
        loading ?
          <div style={{ margin: '10px', padding: '15px', border: '1px solid gainsboro', backgroundColor: 'white' }}>
            <ShimmerLoader />
          </div>
          :
          <ListTable dataList={dodList} columns={column} heading={`Accident Info List`} />
      }
    </>
  )
}

export default DodList