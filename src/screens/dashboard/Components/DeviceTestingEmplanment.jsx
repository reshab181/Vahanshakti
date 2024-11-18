import React, { useEffect, useState } from 'react';
import '../../deviceApproval/components/DeviceTesting.css'
import Swal from "sweetalert2";
import { addDeviceTesting, getAddTestingBylist, getApprovalDevice } from '../../../apis/deviceInventory';
import ListTable from '../../../components/Common/Listtable/ListTable';
import { getAllApprovedDeviceUser, getDeviceApprovalByEID, uploadDocDeviceApproval } from '../../../apis/masters';
import { FormFieldValidation } from "../../../components/fieldErrorValidation";

export const DeviceTestingEmplanment = ({uploadedDevice, setStage}) => {

  const userType = sessionStorage.getItem("userType")

  const [inventoryData, setInventoryData] = useState({})
  const [topTableData, setTopTableData] = useState([]);
  // const [uploadedDevice, setUploadedDevice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeviceForm, setOpenDeviceForm] = useState(false)
  const [esim, setEsim] = useState(null)
  const [fieldValidationErrors, setFieldValidationErrors] = useState({});
  const modelCode = sessionStorage.getItem("modelCodeEmplanment")

  
  useEffect(() => {
    uploadedDevice && setEsim(uploadedDevice["esimAlloweds"])
    
    const fetchTestingList = async (e) => {
      const updatedTopTableData = await getAddTestingBylist(uploadedDevice["modelCode"]);
      console.log("updatedTopTableData",updatedTopTableData);
      setTopTableData(updatedTopTableData);
    }
    fetchTestingList();
  }, [uploadedDevice])




  const onChange = (e) => {
    const { name, value } = e.target;
    // Update the inventoryData state with the new value
    setInventoryData({ ...inventoryData, [name]: value });
  
    // Remove the error message for the field from fieldValidationErrors
    setFieldValidationErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name]; // Remove error message for this field
      return updatedErrors;
    });
  };
  

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
      model_code:uploadedDevice["modelCode"],
      iccid: data.iccid,
      esimProvider: data.esimProvider,
      primaryMsisdn:data.primaryMsisdn,
      primaryOptr:data.primaryOptr,
      fallbackMsisdn:data.fallbackMsisdn,
      secondryOptr:data.secondryOptr
    };

    try {
      const response = await addDeviceTesting(uploadData);
      console.log(response, "responseAddDevice")
      if (response && response.status) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Device Inventory Created Successfully`,
        });

        const updatedTopTableData = await getAddTestingBylist(uploadedDevice["modelCode"]);
        console.log("updatedTopTableData",updatedTopTableData);
        setTopTableData(updatedTopTableData);

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
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
      setOpenDeviceForm(false);
    }
  }
  };

  const handleNextStage = () => {

    setStage(3);
    Swal.fire({
      icon: 'success',
      title: '',
      text: 'Approved!',
    })
  }
  
  const topTableColumn = [
 
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
        validation,
        [name],
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

  console.log(esim,"dwfwjd");
  const selectFormField = (label, name, star, options = []) => {
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
        <select required className="form-inputs" name={name} onChange={e => onChange(e)} value={inventoryData[name]}>
          <option value="">Select</option>
          {Array.isArray(options) &&
            options.map(option => (
              <option key={option.esimName} value={option.esimName}>
                {option.esimId}
              </option>
            ))}
        </select>

      </div>
    );
  };

  const selectFormFieldOperator = (label, name, star, options = []) => {
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
        <select required className="form-inputs" name={name} onChange={e => onChange(e)} value={inventoryData[name]}>
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
      
      {userType === "MNF" ? 
      <div>
        <p style={{margin:"10px"}}>Note : <span>Minimum Two Device Add for testing.</span></p>
        <button className='buttonAddDevice' onClick={()=>setOpenDeviceForm(!openDeviceForm)}>{openDeviceForm ? "Close Form" : "Add Device"}</button>
        {openDeviceForm ? <div className="testings-form-containers">
          <div>
            <div className="form-tag">
              <div className="form-rows">
                {formFieldUI("Device IMEI", "imei", "number", "*")}
                {formFieldUI("Device Serial No", "deviceSerialNo", "text", "*")}
              </div>
              <div className="form-rows">
                {selectFormField("ESIM Allowed", "esimProvider", "*", esim)}
                {formFieldUI("ICCID", "iccid", "number", "*")}
              </div>
              <div className="form-rows">
                {formFieldUI("Primary MSISDN", "primaryMsisdn", "number", "*")}
                {selectFormFieldOperator("Primary Operator", "primaryOptr", "*", ["AIRTEL", "JIO", "VI", "BSNL"])}
              </div>
              <div className="form-rows">
                {formFieldUI("Fallback MSISDN", "fallbackMsisdn", "number", "*")}
                {selectFormFieldOperator("Secondary Operator", "secondryOptr", "*", ["AIRTEL", "JIO", "VI", "BSNL"])}
              </div>
            </div>
          </div>
          <button className='buttonAddDevice' onClick={(e) => handleSubmit(e)}>Upload</button>
      
        </div>: null}
      </div>
        : <div className='saveNextEmplamentButton'>
          <button  onClick={handleNextStage}>Approve for next stage</button>
      </div>
        }

    </>
  );
};

export default DeviceTestingEmplanment