import { useState, useEffect } from "react";
import { BiDetail } from "react-icons/bi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { SiMicrosoftexcel } from "react-icons/si";
import downloadExcel from "../helpers/excel";
import "./common.css";

import { deviceApprovedBySB } from "../apis/masters";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const Table = (params) => {
  const data_table = Array.isArray(params.data) ? params.data : []
  const column = params.sequence;
  const filter_required = params.filter_required || false;
  const isPdfDownloadBtnVisible = params.isPdfDownloadBtnVisible;
  const isExcelDownloadBtnVisible = params.isExcelDownloadBtnVisible;
  const onPDFDownload = params.onPDFDownload;
  const list = params.datas;
  const links = params.links

  const [searchField, setSearchField] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [filteredArray, setFilteredArray] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const userType = localStorage.getItem("userType");


  useEffect(() => {
    const startIndex = pageCount * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (filter_required && searchField.length >= 20) {
      const filteredData = data_table
        .filter((item) => item["iccid"].includes(searchField))
        .slice(startIndex, endIndex);
      setFilteredArray(filteredData);
    } else {
      setFilteredArray(data_table.slice(startIndex, endIndex));
    }
  }, [data_table, pageCount, searchField, itemsPerPage]);
  

  const handleDeviceApproval = async (e, data) => {
    e.preventDefault();
  
    const confirmResult = await Swal.fire({
      title: "Confirm Approval",
      text: "Are you sure you want to approve this device?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });
  
    if (confirmResult.isConfirmed) {
      confirmDeviceApproval(data);
    } else {
      console.log("Device approval canceled");
    }
  };

  const confirmDeviceApproval = async (data) => {
    try {
      const result = await deviceApprovedBySB(data);
      console.log("Device approved successfully:", result);
    } catch (error) {
      console.error("Error handling device approval:", error.message);
    }
  };


  const ThData = () => {
    return column.map((data) => {
      return <th key={data}>{data}</th>;
    });
  };

  const tdData = () => {
    if (filteredArray && filteredArray.length > 0) {
      return filteredArray.map((data) => {
        return (
          <tr key={data.id}>
            {column.map((v, index) => {
              if (v === "approvalStatus") {
                if(userType==="MNF"){
                  return (
                    <td key={index} className="">
                      {data.createdbyRemarks === null ? (
                        <button>Pending</button>
                      ) : (
                        data[v] ? data[v].toString() : 'N/A'
                      )}
                    </td>
                  ); 
                }else{
                return (
                  <td key={index} className="">
                    {data.createdbyRemarks === null ? (
                      <button onClick={(e)=>handleDeviceApproval(e,data)}>Pending</button>
                    ) : (
                      data[v] ? data[v].toString() : 'N/A'
                    )}
                  </td>
                );                  
              }
              } else if (index === 0) {
                return (
                  <td key={index} className="table-view-cell">
                    <span>{data[v]}</span>
                    <attr className="table-view-icon" title="View">
                      <Link to={`${links}`} state={data.id}>
                    <BiDetail
                      size="1rem"
                      className=""
                      onClick={() => params.onDetailClick(data)}
                    />
                    </Link>
                    </attr>
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
  const handlePageChange = (newPage) => {
    setPageCount(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setPageCount(0);
  };

  // const calculateTotalPages = () => {
  //   if (filteredArray) {
  //     console.log(list);
  //     return Math.ceil(list.length / itemsPerPage);
  //   }
  //   return 0;
  // };
  const calculateTotalPages = () => {
    if (list && Array.isArray(list)) {
      return Math.ceil(list.length / itemsPerPage);
    }
    return 0; // or any default value you prefer
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
                  <div key={index} className="table-card-cell"  onClick={() => params.onDetailClick(data.id)}>
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

  const Paginator = () => {
    const totalPages = calculateTotalPages();

    return (
      <>
      { data_table.length>10 &&<div className="paginators">
        <span>
          Page {pageCount + 1} of {totalPages}
        </span>
        {pageCount > 0 && (
          <button onClick={() => handlePageChange(pageCount - 1)}>
            Previous
          </button>
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
      </div>}
      </>
    );
  };

  return (
    <div className="Table-content">
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
          {isPdfDownloadBtnVisible ? (
              <button className="export-button" onClick={() => downloadExcel(list, "imp")}>
                <SiMicrosoftexcel /> Export as Excel
              </button>
          ) : null}
          {isExcelDownloadBtnVisible ? (
              <button className="export-button" onClick={onPDFDownload}>
                <AiOutlineFilePdf /> Export as PDF
              </button>
          ) : null}
        </div>
      </div>
      {/* {!selectedUserId && ( */}
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
    </div>
  );
};












// const handleDeviceApproval = async (e, data) => {
//   e.preventDefault();

//   const confirmResult = await Swal.fire({
//     title: "Confirm Approval",
//     text: "Are you sure you want to approve this device?",
//     icon: "question",
//     showCancelButton: true,
//     confirmButtonText: "Confirm",
//     cancelButtonText: "Cancel",
//     reverseButtons: true,
//     focusCancel: true,
//   });

//   if (confirmResult.isConfirmed) {
//     try {
//       const result = await deviceApprovedBySB(data);
//       const updatedData = data_table.map((item) => {
//         if (item.id === data.id) {
//           return { ...item, createdbyRemarks: "Approved" };
//         }
//         return item;
//       });
//       setDataTable(updatedData);
//       Swal.fire("Success", "Device approved successfully!", "success");
//     } catch (error) {
//       console.error("Error handling device approval:", error.message);
//       Swal.fire("Error", "Failed to approve device", "error");
//     }
//   } else {
//     console.log("Device approval canceled");
//   }
// };