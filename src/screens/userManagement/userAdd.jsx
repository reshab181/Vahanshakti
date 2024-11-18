import "./userAdd.css";
import { useState, useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllowedUserRoles } from "../../apis/users";
import { addUserRTO } from "../../apis/rto";
import { addUserManufacture } from "../../apis/manufacture";
import { addUserDistributor } from "../../apis/distributor";
import { addUserPolice } from "../../apis/police";
import { addUserAuthority, addUserRFC, addUserSBU } from "../../apis/useradd";
import { FormFieldValidation } from "../../components/fieldErrorValidation";
import Swal from "sweetalert2";
import { LoadingWidget } from "../../components/loading";
import { getResponsibilityList } from "../../apis/responsibility";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";

export const AddUser = ({
  userType = sessionStorage.getItem("userType"),
  entityId = sessionStorage.getItem("entityId"),
  navigateto = "/userManagement/listUser",
  entityName = null,
  userDetails = {},
}) => {
  const loggedInUserType = sessionStorage.getItem("userType");
  const eid = sessionStorage.getItem("entityId");
  const userCreationType =
    userType === loggedInUserType && loggedInUserType !== "SUA"
      ? "self"
      : "other";

  const navigate = useNavigate();
  const [userData, setUserData] = useState({ designation: "custom" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [fieldValidationErrors, setFieldValidationErrors] = useState({});
  const [apiResponseError, setApiResponseError] = useState(null);
  const [fetchedResponsilityRoles, setFetchedResponsilityRoles] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      setUserData((prevData) => {
        return { ...prevData, ...userDetails };
      });
    }
  }, [userDetails]);

  console.log(userData, "userDataPassed");

  const fetchedRole = useCallback(async () => {
    const body = {
      entityid: eid,
      role_type: loggedInUserType,
    };
    const res = await getResponsibilityList(body);
    setFetchedResponsilityRoles(res?.result);
  }, [eid, loggedInUserType]);

  useEffect(() => {
    if (userCreationType === "self") {
        fetchedRole();
    } else {
        getRoles(userType);
    }
}, [userCreationType,userType]);


  const getRoles = async (user_type) => {
    const response = await getAllowedUserRoles(user_type);
    if (response?.status) {
      setSelectedRoles(response?.result);
    }
  };

  const onChange = async (e) => {
    if (e.target.name === "designation") {
      const selectedRoleList = fetchedResponsilityRoles.find(
        (item) => item.resp_code === e.target.value
      )?.roleLists;
      setSelectedRoles(selectedRoleList || []);
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = { ...userData };
    if (userCreationType !== "self") {
      uploadData["designation"] = "Admin";
    }

    let requiredVariables = [
      "designation",
      "emailId",
      "fullname",
      "userName",
      "contactNo",
      "password",
    ];

    const checkSubmitError = {};
    for (let item of requiredVariables) {
      if (!(item in uploadData)) {
        const errorItem = item + " value is required";
        checkSubmitError[item] = errorItem;
      }
    }

    setFieldValidationErrors({ ...fieldValidationErrors, ...checkSubmitError });
    if (
      Object.values(fieldValidationErrors).filter((item) => item !== undefined)
        .length == 0
    ) {
      uploadData["entityId"] = parseInt(entityId);
      uploadData["parentId"] = parseInt(eid);
      uploadData["status"] = 1;

      uploadData["roleLists"] = selectedRoles.map((item) => ({
        id: item.id,
        code: item.code,
        name: item.name,
        value: uploadData["designation"] === "Admin" ? 1 : item.value,
      }));

      setIsLoading(true);
      console.log(uploadData, "addUserEntityID");
      let response;
      console.log(uploadData, "navigateto");
      if (userType === "RTO") {
        response = await addUserRTO(uploadData);
      } else if (userType === "MNF") {
        response = await addUserManufacture(uploadData);
      } else if (userType === "DST") {
        response = await addUserDistributor(uploadData);
      } else if (userType === "POLICE") {
        response = await addUserPolice(uploadData);
      } else if (userType === "SUA" || userType === "SBU") {
        response = await addUserSBU(uploadData);
      } else if (userType === "AUTH") {
        response = await addUserAuthority(uploadData);
      } else if (userType === "RFC") {
        response = await addUserRFC(uploadData);
      }
      console.log(response, "navigateto");
      if (response?.status == true) {
        console.log(navigateto, "navigateto");
        navigate(navigateto);
        Swal.fire({
          icon: "success",
          title: "",
          text: "Created Successfully",
        });
      } else {
        setApiResponseError(response?.message);
        setTimeout(() => setApiResponseError(null), 30000);
      }
      setIsLoading(false);
    }
  };

  const formFields = (
    label,
    name,
    type,
    star = "",
    validation = "text",
    disabled = false
  ) => {
    const validateData = () => {
      const formFieldvalidate = FormFieldValidation(
        validation,
        userData[name],
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
      <div style={{ width: "100%" }}>
        <div key={name} className="field_wrapper">
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              width: "100%",
            }}
          >
            <input
              style={{
                backgroundColor: disabled ? "rgba(0,0,0,0.1)" : "",
                width: "100%",
              }}
              required
              className=""
              name={name}
              type={
                type !== "password" ? type : showPassword ? "text" : "password"
              }
              disabled={disabled}
              value={userData[name] || userDetails[name]}
              onChange={(e) => {
                onChange(e);
              }}
              onBlur={() => validateData()}
            />
            {type === "password"
              ? userData?.password?.length > 5 && (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    size="1.5rem"
                    color="gray"
                  />
                )
              : null}
          </div>
        </div>
      </div>
    );
  };

  const selectField = (name, disabled = false) => {
    return (
      <select
        required
        disabled={disabled}
        style={{
          border: "1px solid gainsboro",
          padding: "10px",
          fontSize: "14px",
          backgroundColor: "white",
          outline: "none",
          fontWeight: "600",
        }}
        name={name}
        onChange={(e) => onChange(e)}
      >
        {console.log(fetchedResponsilityRoles, "fetchedResponsilityRoles")}
        {fetchedResponsilityRoles && fetchedResponsilityRoles.length > 0 ? (
          <option value="">Select</option>
        ) : (
          <option value="">No Data</option>
        )}
        {fetchedResponsilityRoles &&
          fetchedResponsilityRoles.map((item) => {
            return (
              <option key={item.resp_code} value={item.resp_code}>
                {item.resp_name}
              </option>
            );
          })}
      </select>
    );
  };

  return (
    <>
      {isLoading && <LoadingWidget />}

      {!isLoading && (
        <>
          <p className="form_header">Add User</p>
          <div className="form_container">
            <div className="form_left">
              {entityName && (
                <p>
                  <b>Creating user for {entityName}</b>
                </p>
              )}
              {apiResponseError ? (
                <p
                  style={{
                    padding: "10px",
                    backgroundColor: "red",
                    color: "white",
                    marginBottom: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <b>{apiResponseError}</b>
                </p>
              ) : null}

              {userCreationType !== "self" ? (
                <div>
                  <p>Entity User Role</p>
                  <p>
                    <b>Admin</b>
                  </p>
                </div>
              ) : (
                selectField("designation")
              )}
              {formFields("Email ID", "emailId", "text", "*", "email")}
              {formFields("Full Name", "fullname", "text", "*", "entity_name")}
              {formFields("User Name", "userName", "text", "*", "user_name")}
              {formFields("Contact No", "contactNo", "text", "*", "phone")}
              {formFields("Password", "password", "password", "*", "password")}
            </div>

            <div className="form_right">
              <p className="form_subheading">Map Roles</p>
              {selectedRoles && selectedRoles?.length > 0 && (
                <p className="form_subheading_note">
                  Note : This is not Editable Roles.
                </p>
              )}
              {selectedRoles && selectedRoles?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {selectedRoles?.map((role) => (
                    <div
                      key={role.id}
                      style={{
                        margin: "5px 10px",
                        padding: "5px 10px",
                        backgroundColor: "#00FF001A",
                        display: "flex",
                      }}
                    >
                      <IoIosCheckmarkCircle size={"1.2rem"} />
                      <label
                        htmlFor={`_checkbox-${role.id}`}
                        className=""
                        style={{
                          cursor: "pointer",
                          fontSize: "13px",
                          marginLeft: "10px",
                        }}
                      >
                        {role.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="button_wrapper">
                <button
                  className="form_button button_submit"
                  style={{ padding: "5px 20px" }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
