

import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa6";
import { useFormik } from "formik";
import * as yup from 'yup'
import { getBeforeDate, getCurrentDate } from "../../components/Common/PowerUpFunctions";
import ListTable from "../../components/Common/Listtable/ListTable";
import './reports.css'


import { getLoginLogs, getSystemLogs } from "../../apis/logsApi";

const LogsIndex = () => {

    const [logsList, setLogsList] = useState([])

    const [loading, setLoading] = useState(false);

    const [reportType, setReportType] = useState('0')

    const initialValues = {
        reportType: '0',
        fromDate: getBeforeDate(3),
        uptoDate: getCurrentDate(),
    }

    const validationSchema = yup.object().shape({
        reportType: yup.string().required('Report Type is required'),
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

        setLoading(true);
        setLogsList([])

        setReportType(values?.reportType)

        let body = {
            fromDt: values?.fromDate,
            toD: values?.uptoDate,
            deviceType: values?.deviceType,
            manufactureid: values?.mnfId,
            rtocode: values?.rtoId,
            distributorid: values?.distributorId,
        }

        let response;

        if (values?.reportType == '0') {
            response = await getLoginLogs(body)
        }

        if (values?.reportType == '1') {
            response = await getSystemLogs(body)
        }
        
        if (response?.status == true) {
            setLogsList(response?.result)
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData(formik.values);
    }, []);

    const loginColumn = [
        {
            Header: '#',
            Cell: ({ cell }) => <>{cell?.row?.index + 1}</>
        },
        {
            Header: "Login ID",
            accessor: "loginId",
            Cell: ({ cell }) => (cell?.row?.original?.loginId || "N/A")
        },
        {
            Header: "IP",
            accessor: "ip",
            Cell: ({ cell }) => (cell?.row?.original?.ip || "N/A"),
            widt: '12%'
        },
        {
            Header: "Log Date",
            accessor: "logDt",
            Cell: ({ cell }) => (cell?.row?.original?.logDt || "N/A"),
            width: '12%'
        },
        {
            Header: "Lat. Long.",
            accessor: "latLag",
            Cell: ({ cell }) => (cell?.row?.original?.latLag || "N/A")
        },
        {
            Header: "Types",
            accessor: "types",
            Cell: ({ cell }) => (cell?.row?.original?.types || "N/A")
        }
    ]

    const systemColumn = [
        {
            Header: '#',
            Cell: ({ cell }) => <>{cell?.row?.index + 1}</>
        },
        {
            Header: "Tag",
            accessor: "tag",
            Cell: ({ cell }) => (cell?.row?.original?.tag || "N/A")
        },
        {
            Header: "User ID",
            accessor: "userId",
            Cell: ({ cell }) => (cell?.row?.original?.userId || "N/A")
        },
        {
            Header: "Log Date",
            accessor: "logDt",
            Cell: ({ cell }) => (cell?.row?.original?.logDt || "N/A"),
            width: '12%'
        },
        {
            Header: "IP",
            accessor: "ip",
            Cell: ({ cell }) => (cell?.row?.original?.ip || "N/A"),
            widt: '12%'
        },
        {
            Header: "Old Log",
            accessor: "oldLog",
            Cell: ({ cell }) => (cell?.row?.original?.oldLog || "N/A"),
            width: '7%'
        },
        {
            Header: "Log Desc.",
            accessor: "logDesc",
            Cell: ({ cell }) => (cell?.row?.original?.logDesc || "N/A")
        }
    ]

    return (
        <>
            <p className="table-listp" style={{ fontSize: '15px' }}>All Logs {reportType && <span style={{ fontStyle: 'italic', fontSize: '11px', fontWeight: 500 }}>
                (Showing&nbsp;
                {reportType == '0' && "Login Logs"}
                {reportType == '1' && "System Logs"}
                )
            </span>}</p>

            <form className="filter_container" onChange={formik.handleChange} onSubmit={formik.handleSubmit}>

                <div className="field_wrapper deviceReportFieldWrapper">
                    <label htmlFor="reportType">Select Log<span className="validation_mark">*</span></label>
                    <select name="reportType" disabled={loading} className={(formik.touched.reportType && formik.errors.reportType) ? 'errorStyle' : ''} value={formik.values.reportType} id="">
                        <option value="0">Login Logs</option>
                        <option value="1">System Logs</option>
                    </select>
                </div>

                <div className="field_wrapper deviceReportFieldWrapper">
                    <label htmlFor="fromDate">From Date <span className="validation_mark">*</span></label>
                    <input type="date" disabled={loading} name="fromDate" className={(formik.touched.fromDate && formik.errors.fromDate) ? 'errorStyle' : ''} value={formik.values.fromDate} max={formik.values.uptoDate} id="" />
                </div>

                <div className="field_wrapper deviceReportFieldWrapper">
                    <label htmlFor="uptoDate">Upto Date <span className="validation_mark">*</span></label>
                    <input type="date" disabled={loading} name="uptoDate" className={(formik.touched.uptoDate && formik.errors.uptoDate) ? 'errorStyle' : ''} value={formik.values.uptoDate} min={formik.values.fromDate} max={getCurrentDate()} id="" />
                </div>

                <button disabled={loading} type="submit" className="filter_button"> <span><FaFilter size={18} fill="#fff" /></span><span>Search</span></button>

            </form>

            <ListTable dataList={logsList} columns={reportType == 0 ? loginColumn : systemColumn} heading={`${reportType == '0' ? 'Login' : ''}${reportType == '1' ? 'System' : ''} Logs`} />
            
        </>
    );
};

export default LogsIndex