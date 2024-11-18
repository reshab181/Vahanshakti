import React from "react";
import { DeviceInventoryListSBU } from "./deviceInventoryPaages/DeviceInventoryListSBU";
import { DeviceInventoryListMNFDST } from "./deviceInventoryPaages/DeviceInventoryListMNFDST";

export const DeviceInventoryList = () => {

  let userType = sessionStorage.getItem("userType");

  return (
    <>
      {['POLICE', 'RTO', 'SUA', 'SBU'].includes(userType) && <DeviceInventoryListSBU/>}
      {['MNF', 'DST', 'RFC'].includes(userType) && <DeviceInventoryListMNFDST/>}
    </>
  );
};

