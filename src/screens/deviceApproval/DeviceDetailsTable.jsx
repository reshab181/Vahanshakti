import React, { useEffect, useState } from "react";
import { getRawPackets } from "../../apis/devicetesting";
import "./DeviceDetailsTable.css";

const DeviceDetailsTable = (props) => {
  
  console.log(props.currentId, props.dataList, "propsCurrentId")
  
  
  const getRawPacketData = async (rowPassed) => {

    const response = await getRawPackets(props.currentId);
    
    const latestPacket = response?.data && response?.data.length > 0 &&
                          response?.data.filter(item=>item?.raw?.includes(rowPassed?.matchText)).sort((a, b) => {
                            b.timestamp > a.timestamp;
                          })[0];
    
    console.log(response, rowPassed, latestPacket, "PacketsData")                      
    latestPacket && props.handleActionChange(rowPassed, latestPacket);
  };

  return (
    <>
      <div className={`table-container border_top`}>
        <table
          className="table table_main_container"
          style={{ overflowX: "auto" }}
        >
          <thead className="table-header" style={{ width: "100%" }}>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "3%" }}>Sl.No.</th>
              <th style={{ width: "5%" }}>Title</th>
              <th style={{ width: "7%" }}>Status</th>
              <th style={{ width: "75%" }}>String</th>
              <th style={{ width: "5%" }}>Fetch</th>
              <th style={{ width: "5%" }}>Save</th>
            </tr>
          </thead>
          <tbody className="table-body2">
            {Array.isArray(props?.dataList) && props?.dataList?.length > 0 && (
              <>
                {props?.dataList?.map((row, index) => (
                  <tr key ={index} className="table-row">
                    <td key={index+"_"+props.currentId+"_index"} className="table-cell" style={{ width: "3%", fontSize:"12px" }}>
                      {index + 1}
                    </td>
                    <td key={index+"_"+props.currentId+"_name"} className="table-cell" style={{ width: "5%", fontSize:"12px" }}>
                      {row?.name}
                    </td>
                    <td key={index+"_"+props.currentId+"_status"} className="table-cell" style={{ width: "7%", fontSize:"12px" }}>
                      <>
                        {row.status === "" ? (
                          <select
                            onChange={(e) =>
                              props.handleStatusChange(row, e.target.value)
                            }
                            style={{
                              width: "100%",
                              padding: "5px",
                              border: "1px solid gainsboro",
                              color: "rgba(0,0,0,0.8)",
                              outline: "none",
                              fontWeight: "600",
                              fontSize:"12px"
                            }}
                          >
                            <option value="" disabled selected>
                              Select
                            </option>
                            <option value="1">OK</option>
                            <option value="2">Reject</option>
                            <option value="0">Not Received</option>
                          </select>
                        ) : (
                          <p>
                            {row.status == 1
                              ? "OK"
                              : row.status == 2
                              ? "Rejected"
                              : "Not Recieved"}
                          </p>
                        )}
                      </>
                    </td>
                    <td key={index+"_"+props.currentId+"_response"} className="table-cell table-cell-action" style={{ width: "80%" , fontSize:"12px"}}>
                      {row.action === "" ? <p style={{padding:"2px"}}>Pending</p> : <p style={{padding:"2px", wordBreak: "break-all", overflowWrap: "break-word", whiteSpace: "normal"}}>{row.action}</p>}
                    </td>
                    <td key={index+"_"+props.currentId+"_fetch"} className="table-cell" style={{ width: "5%", fontSize:"12px" }}>
                      <button className="fetch-button" onClick={() => getRawPacketData(row)}>Fetch</button>
                    </td>
                    <td key={index+"_"+props.currentId+"_save"}  className="table-cell" style={{ width: "5%", fontSize:"12px" }}>
                      <button className="saves-button" onClick={props.saveTestEvent}>Save</button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>

        
      </div>
    </>
  );
};

export default DeviceDetailsTable;
