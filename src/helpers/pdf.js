import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../assets/logo4.png";

const getImageDataURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (error) => reject(error);
    img.src = url;
  });
};

export const generatePDF = async (
  headers,
  data,
  text = "text",
  declarationContent
) => {
  console.log(headers, data, text, declarationContent, "generatePDF");

  const doc = new jsPDF("landscape");

  const pageWidth = doc.internal.pageSize.width;

  const imageURL = await getImageDataURL(logo);
  console.log(imageURL, "imageURLData");
  doc.addImage(imageURL, "PNG", 10, 10, 50, 15);
  doc.setFontSize(15);
  doc.text(text, 70, 20);

  doc.setFontSize(8);
  const date = new Date();
  const dateString = date.toLocaleString(); // Example: "7/28/2024" in US locale

  doc.text(dateString, pageWidth - 45, 20);
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 30,
    styles: {
      cellPadding: 3,
      fontSize: 9,
      overflow: "linebreak",
      minCellWidth: 20, // Set a minimum cell width to ensure wrapping
    },

    didDrawCell: (data) => {
      // Ensure minimum width for all columns
      if (data.column.dataKey !== undefined) {
        // Make sure dataKey is available
        if (data.cell.width < 10) {
          // Adjust this value based on your requirements
          data.cell.width = 10;
        }
      }
    },
  });

  doc.save(`${text}.pdf`);
};

export const generateDeviceTestingPDF = async (
  deviceTypeDetail,
  deviceTables,
  text = "Device Testing Report"
) => {
  let deviceTestingColumns = ["IMEI", "Device Serial No", "ICCID"];
  let deviceRawPackets = ["Packet Code", "Packet Name", "Packet"];

  let deviceTypeDetailData = [
    ["Model Code", deviceTypeDetail["modelCode"]],
    ["Model Name", deviceTypeDetail["modelName"]],
    ["Certifying Authority", deviceTypeDetail["certifyingAuthority"]],
  ];

  let deviceTestingColumnsData = deviceTables.map((item) => {
    return [item["imei"], item["deviceSerialNo"], item["iccid"]];
  });

  let deviceTestingpacketsData = deviceTables.map((item) =>
    JSON.parse(item["testingStatus"])
  );

  let deviceRawPacketsData = deviceTestingpacketsData.map((item) => {
    return item.map((innerItem) => {
      return [innerItem["code"], innerItem["name"], innerItem["action"]];
    });
  });

  console.log(
    deviceTypeDetailData,
    deviceTestingColumnsData,
    deviceTestingpacketsData,
    deviceRawPacketsData,
    "generateDeviceTestingPDF"
  );

  const doc = new jsPDF("landscape");

  const pageWidth = doc.internal.pageSize.width;

  const imageURL = await getImageDataURL(logo);
  console.log(imageURL, "imageURLData");
  doc.addImage(imageURL, "PNG", 10, 10, 50, 15);
  doc.setFontSize(15);
  doc.text(text, 70, 20);

  doc.setFontSize(8);
  const date = new Date();
  const dateString = date.toLocaleString(); // Example: "7/28/2024" in US locale

  doc.text(dateString, pageWidth - 45, 20);

  doc.autoTable({
    body: deviceTypeDetailData,
    startY: 30,
    styles: {
      cellPadding: 3,
      fontSize: 12,
      overflow: "linebreak",
      minCellWidth: 20, // Set a minimum cell width to ensure wrapping
    },
  });

  doc.autoTable({
    head: [deviceTestingColumns],
    body: deviceTestingColumnsData,
    startY: 90,
    styles: {
      cellPadding: 3,
      fontSize: 10,
      overflow: "linebreak",
      minCellWidth: 20, // Set a minimum cell width to ensure wrapping
    },
  });

  deviceRawPacketsData.forEach((item) => {
    doc.addPage();
    doc.autoTable({
      head: [deviceRawPackets],
      body: item,
      startY: 10,
      styles: {
        cellPadding: 3,
        fontSize: 10,
        overflow: "linebreak",
        minCellWidth: 20, // Set a minimum cell width to ensure wrapping
      },
    });
  });

  doc.save(`${text}.pdf`);
};
