import Swal from "sweetalert2";
import readXlsxFile from "read-excel-file";

import { useState, useEffect, useRef } from "react";
import useFormValidation from "../../constants/Validation";
import {
  createDeviceInventory,
  getApprovalDeviceByID,
  uploadBulkInventory,
} from "../../apis/deviceInventory";
import ExcelDownloadButton from "../../components/ExcelButton";
import ListTable from "../../components/Common/Listtable/ListTable";
import { getEsimAllProviderIdCodeName } from "../../apis/masters";
import { LoadingWidget } from "../../components/loading";

export const AddDeviceInventory = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [bulkUpload, setBulkUpload] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [ESIMList, setESIMList] = useState([]);
  const [mCode, setMCode] = useState('')
  const [esim, setEsim] = useState('')

  useEffect(() => {
    const fetchApprovedList = async () => {
      try {
        let status = 1;
        const result = await getApprovalDeviceByID(status);
        console.log(result);
        setApprovedList(result);
      } catch (error) {
        console.error("Error fetching approving authorities:", error);
      }
    };

    const fetchESIMProviderList = async () => {
      try {

        const result = await getEsimAllProviderIdCodeName();
        console.log(result);
        setESIMList(result);
      } catch (error) {
        console.error("Error fetching approving authorities:", error);
      }
    };

    fetchApprovedList();
    fetchESIMProviderList();
  }, []);

  const initialData = {
    imeiNo: "",
    deviceSerialNo: "",
    vltdModelCode: "",
    iccidNumber: "",
    esim_provider: "",
  };
  const validationRules = {
    imeiNo: {
      required: true,
      minLength: 10,
      maxLength: 20,
      pattern: /^[A-Za-z0-9]+$/,
    },
    deviceSerialNo: {
      required: true,
      minLength: 11,
      maxLength: 20,
      pattern: /^[A-Za-z0-9]+$/,
    },
    vltdModelCode: {
      required: true,
      minLength: 2,
      maxLength: 16,
      pattern: /^[A-Za-z0-9]+$/,
    },
    iccidNumber: {
      required: true,
      minLength: 10,
      maxLength: 20,
      pattern: /^[A-Za-z0-9]+$/,
    },
    esim_provider: {
      required: true,
    },
  };

  const { data, errors, setErrors, onChange, validateForm } = useFormValidation(
    initialData,
    validationRules
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      const uploadData = {
        imeiNo: data.imeiNo,
        deviceSerialNo: data.deviceSerialNo,
        vltdModelCode: data.vltdModelCode,
        iccidNumber: data.iccidNumber,
        esim_provider: data.esim_provider,
      };

      console.log(uploadData);
      let response = await createDeviceInventory(uploadData);

      console.log('Single inventory add response: ', response)

      setIsLoading(false);
      if (response && response.status) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Device Inventory Created Successfully`,
        });
        // navigate(trasfers);
      } else if (response && !response.status && response.message) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
      } else {
        console.error("Failed to create user");
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to create user. Please try again!",
        });
      }
    } else {
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await uploadBulkInventory(bulkUpload);
      // if (response && response.status) {
      //   await Swal.fire({
      //     icon: "success",
      //     title: "Success!",
      //     text: `Device Inventory Bulk Uploded Successfully`,
      //   });
      //   // navigate(trasfers);
      // } else if (response && !response.status && response.message) {
      //   await Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: response.message,
      //   });
      // } else {
      //   console.error("Failed to create user");
      //   await Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "Failed to create user. Please try again!",
      //   });
      // }
      setIsLoading(false);

      let allStatus = response?.some(item => item?.status == true)
      let data = response?.filter(item => item?.status == false)

      if (allStatus) {
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'All inventories added successfully.'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: '',
          text: `${data?.map((elem) => elem?.message)} \n`
        })
      }

      console.log("Bulk Upload Response: ", response);

      setBulkUpload([])

    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  };

  const onBulkUpload = async (e) => {

    if (mCode == '') {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Select Model Name'
      })
      return;
    }

    if (esim == '') {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Select ESIM Allowed'
      })
      return;
    }

    e.preventDefault();
    setIsLoading(true);

    try {
      const file = e.target.files[0];

      if (!file) {
        setIsLoading(false);
        console.error("No file selected");
        return;
      }

      console.log("File selected:", file.name);

      const rows = await readXlsxFile(file);
      console.log("Rows read from file:", rows[0]);

      if (rows.length === 0 || rows[0].length === 0) {
        setIsLoading(false);
        console.error("Empty file or invalid format");
        return;
      }

      const headerRow = rows[0];
      const requiredHeaders = [
        "deviceSerialNo",
        "imeiNo",
        "iccidNumber",
        // "vltdModelCode",
        // "esim_provider",
      ];

      const missingHeaders = requiredHeaders.filter(
        (header) => !headerRow.includes(header)
      );
      if (missingHeaders.length > 0) {
        setErrorArray([
          ...missingHeaders.map((header, index) => `${header}, `),
        ]);
        setIsLoading(false);
        console.error("Missing headers:", missingHeaders);
        return;
      }
      
      setErrorArray([]);

      const bulkData = rows.slice(1).map((row) => {
        // return {
        //   deviceSerialNo: String(row[0] || ""),
        //   imeiNo: String(row[1] || ""),
        //   iccidNumber: String(row[2] || ""),
        //   vltdModelCode: mCode,
        //   esim_provider: esim,
        // };
        return {
          [rows[0][0]]: String(row[0] || ""),
          [rows[0][1]]: String(row[1] || ""),
          [rows[0][2]]: String(row[2] || ""),
          vltdModelCode: mCode,
          esim_provider: esim,
        };
      });

      console.log("Bulk data extracted:", bulkData);

      setBulkUpload(bulkData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error processing file:", error.message);
    }
  };

  const handleBulkChange = (e, type) => {

    if (type != 'bulk') {
      return;
    }

    const { name, value } = e.target;

    switch (name) {

      case "vltdModelCode": {
        setMCode(value)
      } break;

      case "esim_provider": {
        setEsim(value)
      } break;

    }

  }

  const formFieldUI = (label, name, type, star) => {
    return (
      <div key={name} className="form-groups">
        <label className="form-labels">
          {label}
          <sup>{star}</sup>
        </label>
        <input
          required
          className="form-inputs"
          name={name}
          type={type}
          onChange={(e) => onChange(e)}
        ></input>
        {errors[name] && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "9px",fontWeight:"bold" }}
          >
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  const selectFormField = (label, name, star, options = [], defaultValue, type = '') => {
    return (
      <div key={name} className="form-groups">
        <label className="form-labels">
          {label}
          <sup>{star}</sup>
        </label>
        <select
          required
          className="form-inputs"
          name={name}
          onChange={(e) => (onChange(e), handleBulkChange(e, type))}
          value={type == 'bulk' ? mCode : defaultValue}
        >
          <option value="">Select</option>
          {Array.isArray(options) &&
            options.map((option) => (
              <option key={option.modelCode} value={option.modelCode}>
                {option.modelCode}
              </option>
            ))}
        </select>
        {errors[name] && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "9px",fontWeight:"bold" }}
          >
            {errors[name]}
          </div>
        )}
      </div>
    );
  };
  const selectFormFieldESIM = (label, name, star, options = [], defaultValue, type = '') => {
    return (
      <div key={name} className="form-groups">
        <label className="form-labels">
          {label}
          <sup>{star}</sup>
        </label>
        <select
          required
          className="form-inputs"
          name={name}
          onChange={(e) => (onChange(e), handleBulkChange(e, type))}
          value={type == 'bulk' ? esim : defaultValue}
        >
          <option value="">Select</option>
          {Array.isArray(options) &&
            options.map(option => (
              <option key={option.providerCode} value={option.providerCode}>
                {option.providerCode}
              </option>
            ))}
        </select>
        {errors[name] && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "9px" ,fontWeight:"bold"}}
          >
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  const column = [
    {
      Header: 'Device Serial No',
      accessor: "deviceSerialNo",
      Cell: ({ cell }) => (cell?.row?.original?.deviceSerialNo || 'N/A')
    },
    {
      Header: "IMEI No",
      accessor: 'imeiNo',
      Cell: ({ cell }) => (cell?.row?.original?.imeiNo || 'N/A')
    },
    {
      Header: "ICCID Number",
      accessor: 'iccidNumber',
      Cell: ({ cell }) => (cell?.row?.original?.iccidNumber || 'N/A')
    },
    {
      Header: "VLTD Model Code",
      accessor: 'vltdModelCode',
      Cell: ({ cell }) => (cell?.row?.original?.vltdModelCode || 'N/A')
    },
    {
      Header: "ESIM Provider",
      accessor: 'esim_provider',
      Cell: ({ cell }) => (cell?.row?.original?.esim_provider || 'N/A')
    }
  ]

  return (
    <>
      {
        isLoading && <LoadingWidget />
      }

      <div className="form-container">


        {/* <hr></hr> */}

        <div className="form-containers" style={{ marginBottom: "10px", backgroundColor: "#F6F7FB" }}>
          <div>
            <div className="form-tag">
              <p className="form-heading-para" style={{ marginBottom: "10px", marginLeft: "0px" }}>Add Inventory</p>
              <div className="form-row">

                <div className="" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {selectFormField("Model Name", "vltdModelCode", "*", approvedList, '', 'bulk')}
                  {selectFormFieldESIM("ESIM Allowed", "esim_provider", "*", ESIMList, '', 'bulk')}
                </div>

                <div className="form-group">
                  <label className="form-labels">Bulk Upload</label>
                  <input
                    className="form-input"
                    name="bulkUpload"
                    type="file"
                    onChange={(e) => onBulkUpload(e)}
                  />
                </div>

                <div className="" style={{ marginTop: "17px" }}>
                  <ExcelDownloadButton
                    headerData={[
                      {
                        deviceSerialNo: "126756",
                        imeiNo: "987654333422",
                        iccidNumber: "987654321455",
                        // vltdModelCode:"MODEL664",
                        // esim_provider:"Chandan"
                      },
                    ]}
                    fileName="Inventory Buk Upload Sample"
                  // iccidNumber={"73646646464"}
                  />
                </div>

                {errorArray?.length > 0 && <span style={{ fontWeight: '600', color: 'red' }}>Missing Headers: {errorArray}</span>}

              </div>
            </div>
          </div>
        </div>
        {bulkUpload.length === 0 ? (
          <div className="form-containers">
            <div>
              <div className="form-tag">
                <div className="form-rows">
                  {formFieldUI("Device IMEI", "imeiNo", "text", "*")}
                  {formFieldUI("Device Serial No", "deviceSerialNo", "text", "*")}
                  {selectFormField("Model Name", "vltdModelCode", "*", approvedList)}
                </div>
                <div className="form-rows">
                  {selectFormFieldESIM("ESIM Allowed", "esim_provider", "*", ESIMList)}

                  {formFieldUI("ICCID", "iccidNumber", "text", "*")}
                </div>
              </div>
              <div className="form-submit-btn">
                <button onClick={(e) => handleSubmit(e)}>Save</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bulk-upload-container">
            <div className="table-list">
              {Array.isArray(bulkUpload) && bulkUpload?.length > 0 && <ListTable
                dataList={bulkUpload}
                columns={column}
              />}
            </div>
            <div className="bulk-upload-btn-container">
              <button
                className="bulk-upload-btn"
                onClick={(e) => handleBulkUpload(e)}
              >
                Save
              </button>
              <button
                className="bulk-upload-btn bulk-upload-btn-refresh"
                onClick={(e) => {
                  setBulkUpload([]);
                  setErrorArray([]);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};



