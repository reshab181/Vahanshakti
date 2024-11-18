import React, { useState, useEffect } from "react";
import { AddUser } from "../userManagement/userAdd";
import { LoadingWidget } from "../../components/loading";
import { createPoliceEntity, getPoliceDetailsById, updatePoliceEntity } from "../../apis/police";
import { getAllRTOList } from "../../apis/police";
import Swal from "sweetalert2";
import { FormFieldValidation } from "../../components/fieldErrorValidation";
import { useNavigate, useParams } from "react-router-dom";

export const CreatePoliceLog = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [policeAccount, setPoliceAccount] = useState({})
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [userAddition, setUserAddition] = useState(false);
    const [entityid, setEntityId] = useState(0);
    const [fieldValidationErrors, setFieldValidationErrors] = useState({})
    const [apiResponseError, setApiResponseError] = useState(null)
    const [policeDetails, setPoliceDetails] = useState(null)

    
    useEffect(() => {
        const fetchRTOData = async () => {
            const result = await getAllRTOList()
            console.log(result, "RTO")
            setLists(result)
        }
        fetchRTOData()
    }, [])

    useEffect(() => {
        const fetchPoliceData = async () => {
            setIsLoading(true)
            const response = await getPoliceDetailsById(id)
            let details = response?.result[0]
            setPoliceDetails(response?.result[0])
            setPoliceAccount({
                rtoCode: details?.rtoCode,
                name: details?.entityName,
                address: details?.address,
                district: details?.district,
                state: details?.state,
                pinCode: details?.pinCode,
                code: details?.entitycode,
            })
    
            setIsLoading(false)
        }
    
        if (id) {
            fetchPoliceData()
        }

    }, [id])




    const onChange = (e) => {
        setPoliceAccount({
            ...policeAccount, [e.target.name]: e.target.value
        })
    }


    // handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredVariables = ["rtoCode", "name", "code", "address", "pinCode", "district", "state"]

        const checkSubmitError = { ...fieldValidationErrors }
        for (let item of requiredVariables) {
            if (!(item in policeAccount)) {
                const errorItem = item + " value is required"
                checkSubmitError[item] = errorItem
            }
        }

        setFieldValidationErrors({ ...checkSubmitError })
        if (Object.values(checkSubmitError).filter(item => item !== undefined).length == 0) {

            let parentId = sessionStorage.getItem('entityId')
            setIsLoading(true);

            const uploadData = {
                rtoCode: policeAccount.rtoCode,
                name: policeAccount.name,
                address: policeAccount.address,
                district: policeAccount.district,
                state: policeAccount.state,
                pinCode: parseInt(policeAccount.pinCode),
                parentId: parseInt(parentId),
                code: policeAccount.code,
            };

            let response;

            if(id){
                response = await updatePoliceEntity({id: parseInt(id), ...uploadData});
            } else {
                response = await createPoliceEntity(uploadData);
            }
            
            if (response?.status) {
                setEntityId(response.pid)
                Swal.fire({
                    icon: "success",
                    title: '',
                    text: response?.message,
                });

                if (id) {
                    navigate('/Police/listPoliceLog')
                } else {
                    setUserAddition(true);
                }

                setIsLoading(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: '',
                    text: response?.message,
                });
                setApiResponseError(response?.message)
                setTimeout(() => setApiResponseError(null), 30000);
                setIsLoading(false);
            }
        }
    };


    const formFieldUI = (label, name, type, star = "", validation = "text", disabled = false) => {

        const validateData = () => {
            console.log(FormFieldValidation(validation, policeAccount[name], label), "return from Field Validation")
            const formValidationValue = FormFieldValidation(validation, policeAccount[name], label)
            if (formValidationValue !== 0 && formValidationValue !== undefined) {
                setFieldValidationErrors({ ...fieldValidationErrors, [name]: formValidationValue })
            } else {
                const newState = { ...fieldValidationErrors };
                delete newState[name];
                setFieldValidationErrors(newState);
            }

        }

        return (
            <div key={name} className="form-groups">
                {!fieldValidationErrors?.[name] ? <label className="form-labels">
                    {label}<sup>{star}</sup>
                </label> : <label style={{ color: "red", fontSize: "9px" }}><b>{fieldValidationErrors[name]}</b></label>}
                <input
                    required
                    style={{ backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : '' }}
                    disabled={disabled}
                    className="form-inputs"
                    name={name}
                    value={policeAccount[name]}
                    type={type}
                    onChange={(e) => onChange(e)}
                    onBlur={() => validateData()}
                />

            </div>
        );
    };
    const selectFormField = (label, name, star, options = [], disabled = false) => {
        return (
            <div key={name} className="form-groups">
                {!fieldValidationErrors?.[name] ? <label className="form-labels">
                    {label}<sup>{star}</sup>
                </label> : <label style={{ color: "red", fontSize: "9px" }}><b>{fieldValidationErrors[name]}</b></label>}
                <select style={{ backgroundColor: disabled ? 'rgba(0,0,0,0.1)' : '' }} disabled={disabled} required className="form-inputs" name={name} onChange={e => onChange(e)} value={policeAccount["rtoCode"]}>
                    <option value="">Select</option>
                    {Array.isArray(options) &&
                        options.map(option => (
                            <option key={option.entitycode} value={option.entitycode}>
                                {option.entitycode}
                            </option>
                        ))}
                </select>

            </div>
        );
    };

    return (
        <>
            <p className="form-heading-para">{id ? "UPDATE" : "ADD"} POLICE ACCOUNT</p>
            <div className="form-container">
                {userAddition ? (
                    <AddUser userType="POLICE" entityId={entityid} navigateto={"/Police/listPoliceLog"} />
                ) : isLoading ? (
                    <LoadingWidget />
                ) : (
                    <div>
                        <div className="form-tag">
                            {apiResponseError ? <p style={{ padding: "10px", backgroundColor: "red", color: "white", marginBottom: "5px", borderRadius: "5px" }}><b>{apiResponseError}</b></p> : null}
                            <p className="form-identifire-para">Police identifiers</p>
                            <div className="form-rows">
                                {selectFormField("Attached RTO Code", "rtoCode", "*", lists, id ? true : false)}
                                {formFieldUI("Station Name", "name", "text", "*", "entity_name")}
                                {formFieldUI("Station Code", "code", "text", "*", "entity_code", id ? true : false)}
                            </div>
                            <p className="form-identifire-para">Address Details</p>
                            <div className="form-rows">
                                {formFieldUI("Address", "address", "text", "*", "text")}
                                {formFieldUI("Pin Code", "pinCode", "text", "*", "pincode")}
                            </div>
                            <div className="form-rows">
                                {formFieldUI("District", "district", "text", "*", "entity_name")}
                                {formFieldUI("State", "state", "text", "*", "entity_name")}
                            </div>

                        </div>
                        <div className="form-submit-btn">
                            <button onClick={(e) => handleSubmit(e)}>{id ? "Update" : "Save"}</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};


