import React, { useEffect, useState } from 'react';
import './DeviceTesting.css';
import ListTable from '../../../components/Common/Listtable/ListTable';
import Swal from "sweetalert2";
import { addDeviceTesting, getAddTestingBylist, getApprovalDevice } from '../../../apis/deviceInventory';
import {FormFieldValidation} from "../../../components/fieldErrorValidation";

export const DeviceTesting = ({uploadedDeviceDetail=null, refreshDeviceDetail,setCurrentPanel,setColor3 }) => {

  const [inventoryData, setInventoryData] = useState({});
  const [fieldValidationErrors, setFieldValidationErrors] = useState({});
  const [topTableData, setTopTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [esim, setEsim] = useState(null)
  const [addDeviceUI, setAddDeviceUI] = useState(false)
  
  let model_code = sessionStorage.getItem("model_code")
  
  useEffect(()=>{
    const fetchDevice = async() => {
      const res = await getApprovalDevice(model_code)
      console.log(res);
      // setUploadedDevice(res)
    }
    fetchDevice();
  },[])

  useEffect(() => {
    console.log("uploadedDeviceDetail",uploadedDeviceDetail);
    uploadedDeviceDetail && setEsim(uploadedDeviceDetail["esimAlloweds"])
  }, [uploadedDeviceDetail])

  const fetchDeviceTestingDevices = async () => {
    const updatedTopTableData = await getAddTestingBylist(uploadedDeviceDetail["modelCode"]);
    setTopTableData(updatedTopTableData);
  }

  useEffect(() => {
    fetchDeviceTestingDevices()
  }, [uploadedDeviceDetail])


  const onChange = async (e) => {
    setInventoryData({ ...inventoryData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredVariables = ["imei", "deviceSerialNo",  "iccid", "esimProvider", "primaryMsisdn", "primaryOptr", "fallbackMsisdn", "secondryOptr"];
    const checkSubmitError = { ...fieldValidationErrors };
    for (let item of requiredVariables) {
      if (!(item in inventoryData) || inventoryData[item] === "") {
        console.log(item, inventoryData[item], "checking erro");
        const errorItem = item + " value is required";
        checkSubmitError[item] = errorItem;
      }
    }
  
    setFieldValidationErrors({ ...checkSubmitError });
    console.log(checkSubmitError, "checkSubmitError");

    const data = inventoryData
    if (Object.values(checkSubmitError).filter(item=>item !== undefined).length == 0){
    setIsLoading(true);

    const uploadData = {
      imei: data.imei,
      deviceSerialNo: data.deviceSerialNo,
      model_code: uploadedDeviceDetail["modelCode"],
      iccid: data.iccid,
      esimProvider: data.esimProvider,
      primaryMsisdn:data.primaryMsisdn,
      primaryOptr:data.primaryOptr,
      fallbackMsisdn:data.fallbackMsisdn,
      secondryOptr:data.secondryOptr
    };
console.log("uploadData",uploadData);
    try {
      const response = await addDeviceTesting(uploadData);
      console.log(response, "response of add device")
      if (response && response.status == true) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Device Inventory Created Successfully`,
        });

        const updatedTopTableData = await getAddTestingBylist(uploadedDeviceDetail["modelCode"]);
        setTopTableData(updatedTopTableData);

      } else if (response && !response.status && response.message) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Some error happened !!",
          text: "Failed to add device. Please try again!",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  }
  };
  
  const topTableColumn = [
    {
      Header: '#',
      accessor: 'esimProvider',
      Cell: ({ cell }) => (
        <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.esimProvider || 'N/A'}</span>
      ),
    },
    {
      Header: 'deviceSerialNo',
      accessor: 'deviceSerialNo',
      Cell: ({ cell }) => (
        <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.deviceSerialNo || 'N/A'}</span>
      ),
    },
    {
      Header: 'imei',
      accessor: 'imei',
      Cell: ({ cell }) => (
        <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.imei || 'N/A'}</span>
      ),
    },
    {
      Header: 'iccid',
      accessor: 'iccid',
      Cell: ({ cell }) => (
        <span style={{ color: '#42a4f5' }}>{cell?.row?.original?.iccid || 'N/A'}</span>
      ),
    },
    {
      Header: 'Primary Msisdn',
      accessor: 'primaryMsisdn',
      Cell: ({ cell }) => (
        <span>{cell?.row?.original?.primaryMsisdn || 'N/A'}</span>
      ),
      
    },
    {
      Header: 'Primary Optr',
      accessor: 'primaryOptr',
      Cell: ({ cell }) => (
        <span>{cell?.row?.original?.primaryOptr || 'N/A'}</span>
      ),
      
    },
    {
      Header: 'Fallback Msisdn',
      accessor: 'fallbackMsisdn',
      Cell: ({ cell }) => (
        <span>{cell?.row?.original?.fallbackMsisdn || 'N/A'}</span>
      ),
      
    },
    {
      Header: 'Secondry Optr',
      accessor: 'secondryOptr',
      Cell: ({ cell }) => (
        <span>{cell?.row?.original?.secondryOptr || 'N/A'}</span>
      ),
      
    },
    {
      Header: 'model_code',
      accessor: 'modelCode',
      Cell: ({ cell }) => (
        <span>{cell?.row?.original?.modelCode || 'N/A'}</span>
      ),
      
    },
  ];


  const formFieldUI = (label, name, type, star) => {
    const validateData = () => {
      const formFieldvalidate = FormFieldValidation(
        inventoryData, // Use inventoryData here
        inventoryData[name], // Correct data reference
        label
      );
      if (formFieldvalidate !== 0 && formFieldvalidate !== undefined) {
        setFieldValidationErrors({
          ...fieldValidationErrors,
          [name]: formFieldvalidate,
        });
      } else {
        const newState = { ...fieldValidationErrors };
        delete newState[name];
        setFieldValidationErrors(newState);
      }
    };
  
    return (
      <div key={name} className="form-groups">
        {!fieldValidationErrors?.[name] ? (
          <label className="form-labels">
            {label}
            <sup>{star}</sup>
          </label>
        ) : (
          <label style={{ color: "red", fontSize: "9px" }}>
            <b>{fieldValidationErrors[name]}</b>
          </label>
        )}
        <input
          required
          className="form-inputs"
          name={name}
          type={type}
          onChange={(e) => onChange(e)}
          onBlur={() => validateData()}
        ></input>
      </div>
    );
  };
  

  const selectFormField = (label, name, star, options = []) => {
    return (
      <div key={name} className="form-groups">
        <label className="tesing-form-labels">
          {label}
          <sup>{star}</sup>
        </label>
        <select required className="form-inputs" name={name} onChange={e => onChange(e)} value={setInventoryData[name]}>
          <option value="">Select</option>
          {Array.isArray(options) &&
            options.map(option => (
              <option key={option.esimName} value={option.esimName}>
                {option.esimName}
              </option>
            ))}
        </select>

      </div>
    );
  };

  const selectOperatorFormField = (label, name, star, options = []) => {
    return (
      <div key={name} className="form-groups">
        <label className="tesing-form-labels">
          {label}
          <sup>{star}</sup>
        </label>
        <select required className="form-inputs" name={name} onChange={e => onChange(e)} value={setInventoryData[name]}>
          <option value="">Select</option>
          {Array.isArray(options) &&
            options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>

      </div>
    );
  };



  return (
    <>
      <p className="emplament-heading">Testing Devices</p>
      <div>
        <ListTable viewStatus={true} dataList={topTableData} columns={topTableColumn} />
      </div>
      <div className="testings-form-containers">
        <div>
          <div className="form-tag">
            <div className="form-rows">
              {formFieldUI("Device IMEI", "imei", "text", "*")}
              {formFieldUI("Device Serial No", "deviceSerialNo", "text", "*")}
            </div>
            <div className="form-rows">
              {selectFormField("ESIM Allowed", "esimProvider", "*", esim)}
              {formFieldUI("ICCID", "iccid", "text", "*")}
            </div>
            <div className="form-rows">
              {formFieldUI("Primary Msisdn", "primaryMsisdn", "text", "*")}
              {selectOperatorFormField("Primary Operator", "primaryOptr", "*", ["Airtel", "BSNL", "VI", "JIO"])}
            </div>
            <div className="form-rows">
              {formFieldUI("Fallback Msisdn", "fallbackMsisdn", "text", "*")}
              {selectOperatorFormField("Secondry Operator", "secondryOptr", "*", ["Airtel", "BSNL", "VI", "JIO"])}
            </div>
          </div>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"end"}}>
        <div style={{display:"flex",gap:"10px",justifyContent:"end",marginRight:"10px"}}>
          <div className="saveNextEmplamentButtonDevice">
            <button onClick={(e) => handleSubmit(e)}>Upload</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "end", marginRight: "10px" }}>
          <div className="saveNextEmplamentButtonDevice">
            <button onClick={(e) => {
              setCurrentPanel("device_images");
              setColor3("enabledd");
            }}>Save & Next</button>
          </div>
        </div>

      </div>
     
    </>
  );};

export default DeviceTesting;

