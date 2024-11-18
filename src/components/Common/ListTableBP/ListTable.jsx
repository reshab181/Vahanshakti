
import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { CSVLink } from "react-csv";
import GlobalFilter from './GlobalFilter'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import blank from '../../../assets/blankTable.png'
import '../Listtable/style.css'
import { generatePDF } from '../../../helpers/pdf';

function ListTable(props) {

    const [bounce, setbounce] = useState('hidden')
    const columns = useMemo(() => props.columns, [props.columns])
    const data = useMemo(() => props.dataList, [props.dataList])
    
    useEffect(() => {
        setPageSize(parseInt(props?.perPageCount) || 10)
    }, [])

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setPageSize,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    const handleChange = (type, value) => {
        switch (type) {
            case "pageSize": {
                setPageSize(parseInt(value))
                props.perPageC(parseInt(value))
            } break;
            default:
                return null
        }
    }

    const nextPageFun = () => {

        if (props?.lastPage != props?.currentPage) {
            props.nextPage()
        }

    }

    const prevPageFun = () => {

        if (props?.currentPage != 1) {
            props.prevPage()
        }

    }

    const makeExportFun = () => {
        let data = props?.dataList?.map((elem, index) => {
            // Map over the columns for each element in dataList
            const rowDataProcessed = []
            const rowData = props?.columns?.forEach((col, columnIndex) => {

                var value = elem[col?.accessor];

                if (col?.option && col?.option?.length > 0) {
                    const matchingOption = col?.option?.find(option => option.hasOwnProperty(elem[col?.accessor]));

                    // console.log('matching option ', matchingOption)

                    if (matchingOption) {
                        value = matchingOption[elem[col?.accessor]];
                    } else {
                        value = elem[col?.accessor]
                    }
                } else {
                    value = elem[col?.accessor]
                }
                
                "accessor" in col && rowDataProcessed.push({[col?.Header]: value})
                // return props?.columns?.filter(item => "accessor" in item)?.map((elem) => elem?.Header)
            });

            // Combine rowData for each element into a single object
            return Object.assign({}, ...rowDataProcessed);
        });

        return data;
    };

    const exportToExcel = (data) => {
        console.log(data, "exportToExcel")
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, props?.heading ? `${props?.heading}.xlsx` : 'DataList.xlsx');
    }

    const exportToPdf = () => {
        
        const data = props?.dataList?.map(elem => {
            return props?.columns?.filter(item => "accessor" in item)?.map((col) => {

                let value;

                if (col?.option && col?.option?.length > 0) {

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
        const headers = props?.columns?.filter(item => "accessor" in item)?.map((elem) => elem?.Header)
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
                                        <button className="export-button-table" onMouseEnter={() => setbounce('')} onMouseLeave={() => setbounce('hidden')} >
                                            <CSVLink data={() => makeExportFun()} filename={props?.heading ? `${props?.heading}.csv` : 'DataList.csv'}>CSV</CSVLink>
                                        </button>
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
                            Array.isArray(props?.dataList) && props?.dataList?.length > 0 &&
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
                                                    <div className='col-span-2'>  <select className="page-size " value={pageSize} onChange={(e) => handleChange('pageSize', e.target?.value)}>
                                                        {[10, 20, 50, 100].map((pageSize) => (
                                                            <option key={pageSize} value={pageSize}>
                                                                show {pageSize}
                                                            </option>
                                                        ))}

                                                    </select></div>
                                                    <div className='pagination-info'>   <span >
                                                        page {''}
                                                        <strong>
                                                            {props?.currentPage} of {props?.lastPage}
                                                        </strong>{''}
                                                    </span></div>

                                                    <div className='pagination-buttons'>
                                                        <abbr title="First Page">
                                                            <button className='pagination-button' onClick={() => props?.goFirst()} disabled={props?.currentPage == 1 && true} ><AiOutlineDoubleLeft /> </button>
                                                        </abbr>
                                                        <abbr title="Previous Page">
                                                            <button style={{ opacity: props?.currentPage == 1 ? '.5' : '1' }} className='pagination-button' onClick={() => prevPageFun()} disabled={props?.currentPage == 1 && true}>⬅️</button>
                                                        </abbr>
                                                        <abbr title="Next Page">
                                                            <button style={{ opacity: props?.currentPage == props?.lastPage ? '.5' : '1' }} className='pagination-button' onClick={() => nextPageFun()} disabled={props?.currentPage == props?.lastPage && true}>➡️</button>
                                                        </abbr>
                                                        <abbr title="Last Page">
                                                            <button className='pagination-button' onClick={() => props?.goLast()} disabled={props?.currentPage == props?.lastPage && true} >  <AiOutlineDoubleRight /></button>
                                                        </abbr>
                                                    </div>
                                                </div>}
                                        </>
                                        :
                                        <>
                                            <div className='card_pagination'>
                                                <div className='col-span-2'>  <select className="page-size " value={pageSize} onChange={(e) => handleChange('pageSize', e.target?.value)}>
                                                    {[10, 20, 50, 100].map((pageSize) => (
                                                        <option key={pageSize} value={pageSize}>
                                                            show {pageSize}
                                                        </option>
                                                    ))}

                                                </select></div>
                                                <div className='pagination-info'>   <span >
                                                    page {''}
                                                    <strong>
                                                        {props?.currentPage} of {props?.lastPage}
                                                    </strong>{''}
                                                </span></div>

                                                <div className='pagination-buttons'>
                                                    <abbr title="First Page">
                                                        <button className='pagination-button' onClick={() => props?.goFirst()} disabled={props?.currentPage == 1 && true} ><AiOutlineDoubleLeft /> </button>
                                                    </abbr>
                                                    <abbr title="Previous Page">
                                                        <button style={{ opacity: props?.currentPage == 1 ? '.5' : '1' }} className='pagination-button' onClick={() => prevPageFun()} disabled={props?.currentPage == 1 && true}>⬅️</button>
                                                    </abbr>
                                                    <abbr title="Next Page">
                                                        <button style={{ opacity: props?.currentPage == props?.lastPage ? '.5' : '1' }} className='pagination-button' onClick={() => nextPageFun()} disabled={props?.currentPage == props?.lastPage && true}>➡️</button>
                                                    </abbr>
                                                    <abbr title="Last Page">
                                                        <button className='pagination-button' onClick={() => props?.goLast()} disabled={props?.currentPage == props?.lastPage && true} >  <AiOutlineDoubleRight /></button>
                                                    </abbr>
                                                </div>
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
                                        <img src={blank} alt="" />
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
                                                <div className='col-span-2'>  <select className="page-size " value={pageSize} onChange={(e) => handleChange('pageSize', e.target?.value)}>
                                                    {[10, 20, 50, 100].map((pageSize) => (
                                                        <option key={pageSize} value={pageSize}>
                                                            show {pageSize}
                                                        </option>
                                                    ))}

                                                </select></div>
                                                <div className='pagination-info'>   <span >
                                                    page {''}
                                                    <strong>
                                                        {props?.currentPage} of {props?.lastPage}
                                                    </strong>{''}
                                                </span></div>

                                                <div className='pagination-buttons'>
                                                    <abbr title="First Page">
                                                        <button className='pagination-button' onClick={() => props?.goFirst()} disabled={props?.currentPage == 1 && true} ><AiOutlineDoubleLeft /> </button>
                                                    </abbr>
                                                    <abbr title="Previous Page">
                                                        <button style={{ opacity: props?.currentPage == 1 ? '.5' : '1' }} className='pagination-button' onClick={() => prevPageFun()} disabled={props?.currentPage == 1 && true}>⬅️</button>
                                                    </abbr>
                                                    <abbr title="Next Page">
                                                        <button style={{ opacity: props?.currentPage == props?.lastPage ? '.5' : '1' }} className='pagination-button' onClick={() => nextPageFun()} disabled={props?.currentPage == props?.lastPage && true}>➡️</button>
                                                    </abbr>
                                                    <abbr title="Last Page">
                                                        <button className='pagination-button' onClick={() => props?.goLast()} disabled={props?.currentPage == props?.lastPage && true} >  <AiOutlineDoubleRight /></button>
                                                    </abbr>
                                                </div>
                                            </div>
                                        }
                                    </>
                                    :
                                    <>
                                        <div className='pagination'>
                                            <div className='col-span-2'>  <select className="page-size " value={pageSize} onChange={(e) => handleChange('pageSize', e.target?.value)}>
                                                {[10, 20, 50, 100].map((pageSize) => (
                                                    <option key={pageSize} value={pageSize}>
                                                        show {pageSize}
                                                    </option>
                                                ))}

                                            </select></div>
                                            <div className='pagination-info'>   <span >
                                                page {''}
                                                <strong>
                                                    {props?.currentPage} of {props?.lastPage}
                                                </strong>{''}
                                            </span></div>

                                            <div className='pagination-buttons'>
                                                <abbr title="First Page">
                                                    <button className='pagination-button' onClick={() => props?.goFirst()} disabled={props?.currentPage == 1 && true} ><AiOutlineDoubleLeft /> </button>
                                                </abbr>
                                                <abbr title="Previous Page">
                                                    <button style={{ opacity: props?.currentPage == 1 ? '.5' : '1' }} className='pagination-button' onClick={() => prevPageFun()} disabled={props?.currentPage == 1 && true}>⬅️</button>
                                                </abbr>
                                                <abbr title="Next Page">
                                                    <button style={{ opacity: props?.currentPage == props?.lastPage ? '.5' : '1' }} className='pagination-button' onClick={() => nextPageFun()} disabled={props?.currentPage == props?.lastPage && true}>➡️</button>
                                                </abbr>
                                                <abbr title="Last Page">
                                                    <button className='pagination-button' onClick={() => props?.goLast()} disabled={props?.currentPage == props?.lastPage && true} >  <AiOutlineDoubleRight /></button>
                                                </abbr>
                                            </div>
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

export default ListTable