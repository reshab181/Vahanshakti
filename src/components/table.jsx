import { useState, useEffect } from "react";
import { BiDetail } from "react-icons/bi";
import { AiOutlineFilePdf } from 'react-icons/ai';
import { SiMicrosoftexcel } from 'react-icons/si';
import downloadExcel from '../helpers/excel';
import "./common.css";
import { AddUser } from "../screens/userManagement/userAdd";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const DynamicTable = (params) => {
  const userTypes = localStorage.getItem("userType")
  const data_table = params.data;
  const column = userTypes === "MNF" ? [...params.sequence, "Actions"] : [...params.sequence];
  const filter_required = params.filter_required || false;
  const isPdfDownloadBtnVisible = params.isPdfDownloadBtnVisible
  const isExcelDownloadBtnVisible = params.isExcelDownloadBtnVisible
  const onPDFDownload = params.onPDFDownload
  const list = params.datas
  const userType = params.userType
  const navigateto = params.navigateto
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [filteredArray, setFilteredArray] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const startIndex = pageCount * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (filter_required && searchField.length >= 20) {
      const filteredData = data_table.filter(item =>
        item["iccid"].includes(searchField)
      ).slice(startIndex, endIndex);
      setFilteredArray(filteredData);
    } else {
      setFilteredArray(data_table.slice(startIndex, endIndex));
    }
  }, [data_table, pageCount, searchField, itemsPerPage]);

  const ThData = () => {
    return column.map((data) => {
      return <th key={data}>{data}</th>;
    });
  };
  // const [parentPath, setParentPath] = useState('');
  // const location = useLocation();
  // useEffect(() => {
  //   const pathName = location.pathname
  //   const paths = pathName.split("/");
  //   paths.pop();
  //   const path = paths.join("/");
  //   setParentPath(path)
  // }, [])

  // const navigateToDetails = (data) =>{
  //   navigate(`/manufacturers/details/${data.id}`,{state:data})
  //   console.log(data);
  // }

  const tdData = () => {
    if (filteredArray && filteredArray.length > 0) {
      return filteredArray.map((data) => {
        return (
          <tr key={data.id}>
            {column.map((v, index) => {
              if (index === column.length - 1 && userTypes === "MNF") {
                return (
                  <td key={index}>
                    <button onClick={() => setSelectedUserId(data.id)} className="user-create-btn">Create User</button>
                  </td>
                );
              } else if (index === 0) {
                return (
                  <td key={index} className="table-view-cell" 
                  onClick={() => params.onDetailClick(data)}
                  >
                    <span>{data[v]}</span>
                    {/* <Link to={`${parentPath}/details/${data.id}`} state={data}> */}
                    <attr className="table-view-icon" title="View">

                      <BiDetail
                        size="1.1rem"
                        className=""
                      />
                    </attr>
                    {/* </Link> */}
                  </td>
                );
              } else {
                return <td key={index}>{data[v] ? data[v].toString() : 'N/A'}</td>;
              }
            })}
          </tr>
        );
      });
    }
  };

  const tableCard = () => {

    if (filteredArray && filteredArray.length > 0) {
      return filteredArray.map((data) => {
        return (
          <div key={data.id} className="table-card-items">
            {column.map((v, index) => {
              if (index === column.length - 1) {
                return (
                  <div key={index} className="table-card-cell">
                    <span className="table-card-key sub-heading">Action: </span>
                    <button onClick={() => setSelectedUserId(data.id)} className="table-card-value table-card-button">Create User</button>
                  </div>
                );
              } else if (index === 0) {
                return (
                  <div key={index} className="table-card-cell" onClick={() => params.onDetailClick(data)}>
                    <span className="table-card-key sub-heading">{column[index]}: </span>
                    <div className="table-card-value text table-view-cell">
                      <span>{data[v]}</span>
                      <attr className="table-view-icon" title="View">
                        <BiDetail
                          size="1.1rem"
                          className=""
                        />
                      </attr>
                    </div>
                  </div>
                );
              } else {
                return <div key={index} className="table-card-cell">
                  <span className="table-card-key sub-heading">{column[index]}: </span>
                  <div className="table-card-value text" key={index}>{data[v] ? data[v].toString() : 'N/A'}</div>
                </div>
              }
            })}
          </div>
        );
      });
    }

  }

  const handlePageChange = (newPage) => {
    setPageCount(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setPageCount(0);
  };

  const calculateTotalPages = () => {
    if (filteredArray) {
      console.log(list);
      return Math.ceil(list.length / itemsPerPage);
    }
    return 0;
  };

  const Paginator = () => {
    const totalPages = calculateTotalPages();

    return (
      <div className="paginators">
        <span>
          Page {pageCount + 1} of {totalPages}
        </span>
        {pageCount > 0 && (
          <button onClick={() => handlePageChange(pageCount - 1)}>Previous</button>
        )}
        {filteredArray && filteredArray.length >= itemsPerPage && (
          <button onClick={() => handlePageChange(pageCount + 1)}>Next</button>
        )}
        {/* Add the select field for items per page */}
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    );
  };

  return (
    <div className="Table-content">
      {selectedUserId !== null ? (
        <AddUser userId={selectedUserId} userType={userType} navigateto={navigateto} />
      ) : (
        <div className="table-control">

          {filter_required ? (
            <div className="search-bar">
              <input
                placeholder="search..."
                className=""
                type="text"
                value={searchField}
                onChange={(e) => {
                  setSearchField(e.target.value);
                  params.onSearchChange && params.onSearchChange(e.target.value);
                }}
              />
              {/* <button className="" onClick={(e) => searchESIM(e)}>
              <b>search</b>
            </button> */}
            </div>
          ) : null}
          <div className="paginator">
            <Paginator />
            {
              isPdfDownloadBtnVisible ? (
                  <button className="export-button" onClick={() => downloadExcel(list, 'imp')}><SiMicrosoftexcel /> Export as Excel</button>
              ) : null
            }
            {
              isExcelDownloadBtnVisible ? (
                  <button className="export-button" onClick={onPDFDownload}><AiOutlineFilePdf /> Export as PDF</button>
              ) : null
            }
          </div>

        </div>
      )}
      {!selectedUserId && (
        <div className="scroll_table">
          <table className="table-striped">
            <thead>
              <tr>{ThData()}</tr>
            </thead>
            <tbody>{tdData()}</tbody>
          </table>

          {/* Table Card */}
          <div className="table-card">
            {tableCard()}
          </div>

        </div>
      )}
    </div>
  );
};