import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { CSVLink } from "react-csv";
import GlobalFilter from './GlobalFilter'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import blank from '../../../assets/blankTable.png'
import './style.css'
import { generatePDF } from '../../../helpers/pdf';
import { getBeforeminutesAgoEpoch, getCurrentDateEpoch } from '../PowerUpFunctions';
import { getDeviceAlarmWithList, getSpecificAlarm } from '../../../apis/dashboard';

function ListTableAlarmsDashboard(props) {

    const [bounce, setbounce] = useState('hidden')
    const columns = useMemo(() => props.columns, [props?.columns])
    const data = useMemo(() => props.dataList, [props.dataList])

    const {
        getTableBodyProps,
        headerGroups,
        // rows,//since used pagination
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    
    

    console.log(data, "empanelmentManf")

    useEffect(() => {
        setPageSize(10)
    }, [])

    
    

    const makeExportFun = () => {
        
        let data = props?.dataList?.map((elem, index) => {
            // Map over the columns for each element in dataList
            const rowData = props?.columns?.map((col, columnIndex) => {

                var value;
  
                if (col?.option && col?.option?.length > 0) {
                    // console.log('tables data column data: ', col?.option, elem[col?.accessor])
                    
                    const matchingOption = col?.option?.find(option => option.hasOwnProperty(elem[col?.accessor]));


                    if (matchingOption) {
                        value = matchingOption[elem[col?.accessor]];
                    } else {
                        value = elem[col?.accessor]
                    }
                } else {
                    value = elem[col?.accessor]
                }

                // console.log('making values: ', value)

                return col?.Header.toLowerCase() != "action" && { [col?.Header]: col?.accessor ? value : index + 1 };
            });

            return Object.assign({}, ...rowData);
        });

        return data;
    };

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, props?.heading ? `${props?.heading}.xlsx` : 'DataList.xlsx');
    }

    const exportToPdf = () => {
        const headers = props?.columns?.filter(item => item?.Header.toLowerCase() != "action")?.map((elem) => elem?.Header)
        const data = props?.dataList?.map(elem => {
            return props?.columns?.filter(item => item?.Header.toLowerCase() != "action")?.map((col) => {
                // return ad[elem?.accessor];

                var value;
  
                if (col?.option && col?.option?.length > 0) {
                    // console.log('tables data column data: ', col?.option, elem[col?.accessor])
                    
                    const matchingOption = col?.option?.find(option => option.hasOwnProperty(elem[col?.accessor]));

                    // console.log('tables data matching option ', matchingOption)

                    if (matchingOption) {
                        value = matchingOption[elem[col?.accessor]];
                    } else {
                        value = elem[col?.accessor]
                    }
                } else {
                    value = elem[col?.accessor]
                }

                return value;
            })
        });

        generatePDF(headers, data, props?.heading || 'Data List');
    }

    return (
        <>

            {
                props?.viewStatus ?
                    <>
                        {
                            Array.isArray(props?.dataList) && props?.dataList?.length > 10 &&
                            <div className="flex-container">
                                <div className="total">
                                    Total Count: <span className="total_value">{props?.totalCount ?? 0}</span>
                                </div>
                                <div className="actions">
                                    <div className="button-container">
                                        {/* <button className="export-button-table" onMouseEnter={() => setbounce('')} onMouseLeave={() => setbounce('hidden')} >
                                            <CSVLink className='export-button-inside' data={() => makeExportFun()} filename={props?.heading ? `${props?.heading}.csv` : 'DataList.csv'}>CSV</CSVLink>
                                        </button> */}
                                        <button className='export-button-table' onClick={() => exportToExcel(makeExportFun())}>Excel</button>
                                        <button className='export-button-table' onClick={() => exportToPdf()}>PDF</button>
                                    </div>
                                    <div className="filter-container">
                                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                    :
                    <div className="flex-container">
                        <div className="total">
                            Total Count: <span className="total_value">{props?.totalCount ?? 0}</span>
                        </div>
                        {
                            Array.isArray(props?.dataList) && props?.totalCount > 0 &&
                            <div className="actions">
                                <div className="button-container">
                                    <button className="export-button-table" onMouseEnter={() => setbounce('')} onMouseLeave={() => setbounce('hidden')} >
                                        <CSVLink className='export-button-inside' data={makeExportFun()}>CSV</CSVLink>
                                    </button>
                                    <button className='export-button-table' onClick={() => exportToExcel(makeExportFun())}>Excel</button>
                                    <button className='export-button-table' onClick={() => exportToPdf()}>PDF</button>
                                </div>
                                <div className="filter-container">
                                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                                </div>
                            </div>
                        }
                    </div>
            }
            <div className={`table-container ${props?.viewStatus && props?.dataList?.length <= 10 && ' border_top'}`}>
                <div className="">

                    <table {...getTableBodyProps} className="table table_main_container" style={{ overflowX: 'auto' }}>
                        <thead className='table-header' style={{ width: '100%' }}>
                            {
                                headerGroups?.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} style={{ width: '100%' }}>
                                        {
                                            headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ width: `${column?.render('width')}`, cursor: 'pointer' }} >{column.render('Header')}
                                                    <span>{column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️') : ''}</span></th>

                                            ))
                                        }
                                    </tr>
                                ))
                            }

                        </thead>
                        <tbody {...getTableBodyProps()} className="table-body">
                            {
                                Array.isArray(props?.dataList) && props?.dataList?.length > 0 ?
                                    <>
                                        {page?.map((row) => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()} className="table-row">
                                                    {row?.cells?.map((cell) => {
                                                        return <td {...cell.getCellProps()} className="table-cell">
                                                            {cell.render('Cell')}
                                                        </td>
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </>

                                    :

                                    <tr className="no_data">
                                        <td className='no_data' colSpan={props?.columns?.length}>
                                            <img src={blank} alt="" />
                                            <div className="blank_text">No Data Available</div>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>

                    {
                        Array.isArray(props?.dataList) && props?.dataList?.length > 0 ?
                            <>
                                {
                                    props?.viewStatus ?
                                        <>
                                            {props?.dataList?.length > 10 &&
                                                <div className='card_pagination'>
                                                    
                                                    <div className='pagination-info'>   <span >
                                                        page {''}
                                                        <strong>
                                                            {pageIndex + 1} of {pageOptions.length}
                                                        </strong>{''}
                                                    </span></div>

                                                    <div className='pagination-buttons'>
                                                        <button className='pagination-button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}><AiOutlineDoubleLeft /> </button>
                                                        <button style={{ opacity: !canPreviousPage ? '.5' : '1' }} className={' pagination-button'} onClick={() => previousPage()} disabled={!canPreviousPage}>⬅️</button>
                                                        <button style={{ opacity: !canNextPage ? '.5' : '1' }} className={' pagination-button'} onClick={() => nextPage()} disabled={!canNextPage}>➡️</button>
                                                        <button className='pagination-button' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>  <AiOutlineDoubleRight /></button></div>
                                                </div>}
                                        </>
                                        :
                                        <>
                                            <div className='card_pagination'>
                                                <div className='col-span-2'>  
                                                    {/* <select className="page-size " value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                                                        {[5, 10, 25, 50].map((pageSize) => (
                                                            <option key={pageSize} value={pageSize}>
                                                                show {pageSize}
                                                            </option>
                                                        ))}
                                                    </select> */}
                                                </div>
                                                <div className='pagination-info'>   <span >
                                                    page {''}
                                                    <strong>
                                                        {pageIndex + 1} of {pageOptions.length}
                                                    </strong>{''}
                                                </span></div>

                                                <div className='pagination-buttons'>
                                                    <button className='pagination-button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}><AiOutlineDoubleLeft /> </button>
                                                    <button style={{ opacity: !canPreviousPage ? '.5' : '1' }} className={' pagination-button'} onClick={() => previousPage()} disabled={!canPreviousPage}>⬅️</button>
                                                    <button style={{ opacity: !canNextPage ? '.5' : '1' }} className={' pagination-button'} onClick={() => nextPage()} disabled={!canNextPage}>➡️</button>
                                                    <button className='pagination-button' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>  <AiOutlineDoubleRight /></button></div>
                                            </div>
                                        </>
                                }

                                <div className='table-card'>
                                    {
                                        page?.map((row, index) => {
                                            return (
                                                <div key={index} className="table-card-items">
                                                    {props?.columns?.map((column, index) => <div key={index} className="table-card-cell">
                                                        <span className="table-card-key sub-heading">{column?.Header}: </span>
                                                        <div className="table-card-value text">
                                                            {row?.cells[index].render('Cell')}
                                                        </div>
                                                    </div>
                                                    )}
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            </>
                            :
                            <>
                                <div className="card_no_data">
                                    <div className='no_data' >
                                        <img src={blank} alt=""  />
                                        <div className="blank_text">No Data Available</div>
                                    </div>
                                </div>
                            </>
                    }

                    {Array.isArray(props?.dataList) && props?.dataList?.length > 0 &&
                        <>
                            {
                                props?.viewStatus ?
                                    <>
                                        {
                                            props?.dataList?.length > 10 &&
                                            <div className='pagination'>
                                                <div className='col-span-2'>  <select className="page-size " value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                                                    {[5, 10, 25, 50].map((pageSize) => (
                                                        <option key={pageSize} value={pageSize}>
                                                            show {pageSize}
                                                        </option>
                                                    ))}

                                                </select></div>
                                                <div className='pagination-info'>   <span >
                                                    page {''}
                                                    <strong>
                                                        {pageIndex + 1} of {pageOptions.length}
                                                    </strong>{''}
                                                </span></div>

                                                <div className='pagination-buttons'>
                                                    <button className='pagination-button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}><AiOutlineDoubleLeft /> </button>
                                                    <button style={{ opacity: !canPreviousPage ? '.5' : '1' }} className={' pagination-button'} onClick={() => previousPage()} disabled={!canPreviousPage}>⬅️</button>
                                                    <button style={{ opacity: !canNextPage ? '.5' : '1' }} className={' pagination-button'} onClick={() => nextPage()} disabled={!canNextPage}>➡️</button>
                                                    <button className='pagination-button' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>  <AiOutlineDoubleRight /></button></div>
                                            </div>
                                        }
                                    </>
                                    :
                                    <>
                                        <div className='pagination'>
                                            <div className='col-span-2'>  <select className="page-size " value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                                                {[5, 10, 25, 50].map((pageSize) => (
                                                    <option key={pageSize} value={pageSize}>
                                                        show {pageSize}
                                                    </option>
                                                ))}

                                            </select></div>
                                            <div className='pagination-info'>   <span >
                                                page {''}
                                                <strong>
                                                    {pageIndex + 1} of {pageOptions.length}
                                                </strong>{''}
                                            </span></div>

                                            <div className='pagination-buttons'>
                                                <button className='pagination-button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}><AiOutlineDoubleLeft /> </button>
                                                <button style={{ opacity: !canPreviousPage ? '.5' : '1' }} className={' pagination-button'} onClick={() => previousPage()} disabled={!canPreviousPage}>⬅️</button>
                                                <button style={{ opacity: !canNextPage ? '.5' : '1' }} className={' pagination-button'} onClick={() => nextPage()} disabled={!canNextPage}>➡️</button>
                                                <button className='pagination-button' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>  <AiOutlineDoubleRight /></button></div>
                                        </div>
                                    </>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default ListTableAlarmsDashboard