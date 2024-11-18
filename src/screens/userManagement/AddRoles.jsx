import { useState, useEffect } from "react";
import { addResponsibility } from "../../apis/responsibility";
import { getAllowedUserRoles, getRoleType } from "../../apis/users";
import "./userAdd.css";
import { MultipleSelectionRes } from "../../components/MultipleSelectionRes";
import { ResponsibilityMap } from "./responsibilitiesMap"
import Swal from 'sweetalert2';
import TotalRoles from "./TotalRoles";

const AddRoles = (props) => { 
    const [roleLoader, setRoleLoader] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);
    // const [fetchedRoles, setFetchedRoles] = useState([]);
    const [userAccountConfig, setUserAccountConfig] = useState(null)
    const [visibleRoles, setVisibleRoles] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [roleType, setRoleTypes] = useState([]);
    const [activeTab, setActiveTab] = useState('AddRoles');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    
    const loggedInUserType = sessionStorage.getItem("userType");
    
    useEffect(()=>{
        const fetchedRolesType = async()=>{
            const res = await getRoleType()
            console.log(res?.result);
            setRoleTypes(res?.result)
        }
        fetchedRolesType()
    },[])

    useEffect(() => {
        let configData = {}
        if (props.userType && props.entityId) {
          configData["parentId"] = sessionStorage.getItem("entityId");
          configData["entityID"] = props.entityId
          configData["typeUser"] = props.userType
        } else if (loggedInUserType !== "SUA") {
          configData["parentId"] = sessionStorage.getItem("parentId");
          configData["entityID"] = sessionStorage.getItem("entityId");
          configData["typeUser"] = sessionStorage.getItem("userType");
        } else if (loggedInUserType === "SUA") {
          configData["parentId"] = sessionStorage.getItem("parentId");
          configData["entityID"] = sessionStorage.getItem("entityId");
          configData["typeUser"] = "SBU"
        }
        setUserAccountConfig(configData)
      }, [props]);

    const getRoles = async (user_type) => {
        setRoleLoader(true);
        const response = await getAllowedUserRoles(user_type);
        console.log(response?.result, "getAllowedUserRolesAuthority");
        if (response?.status) {
            // setFetchedRoles(response?.result);
            setVisibleRoles(response?.result);
            //setSelectedRoles(response?.result.filter((item) => item.value === 1));
            console.log(response, "allowed fetched roles");
        }
        setRoleLoader(false);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        let userType = null;
        if (props.userType && props.entityId) {
            userType = props.userType;
        } else {
            userType = loggedInUserType;
        }
        console.log(userType, props.entityId, "userTypeAuthority");
        await getRoles(userType);
    };

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const uploadData = { ...userData };
            uploadData["entityId"] = parseInt(userAccountConfig["entityID"]);
            uploadData["role_type"] = loggedInUserType;
            uploadData["roleLists"] = selectedRoles.map((item) => ({
                id: item.id,
                code: item.code,
                name: item.name,
                value: item.value,
              }));
            // setIsLoading(true);
            console.log(uploadData);
            let response = await addResponsibility(uploadData);
            if(response.status == true){
                Swal.fire({
                    icon: 'success',
                    title: '',
                    text: `${response.message}`
                    })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: `${response.message}`
                  })
            }
            console.log(response);
            // setIsLoading(false);
        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: `${err}`
              })
        }
    };

    const formFields = (label, name, type, star = "",disabled = false) => {
    return (
        <div style={{ width: "100%" }}>
        <div key={name} className="field_wrapper">
            <label className="form-labels">{label}<sup>{star}</sup> </label>
            <input
            disabled={disabled}
            required
            className=""
            name={name}
            type={type}
            value={name === "role_type" ? (loggedInUserType) : userData[name] || ''}
            onChange={(e) => onChange(e)}
            />
        </div>
        </div>
    );
    };

console.log(visibleRoles, ResponsibilityMap, "ResponsibilityMap")
    return (
    <>  
        <div className="user_roles_subhead">
            <p className={`${activeTab === 'AddRoles' ? 'activeRoles' : 'not_activeRoles'}`} onClick={() => handleTabClick('AddRoles')}>
                Add Roles
            </p>
            <p className={`${activeTab === 'TotalRoles' ? 'activeRoles' : 'not_activeRoles'}`} onClick={() => handleTabClick('TotalRoles')}>
                Total Roles
            </p>
        </div>
        {activeTab === 'AddRoles' && (<div style={{display:"grid", gridTemplateColumns:"2fr 4fr", gap:"8px"}}>
        <div style={{backgroundColor:"white", padding:"10px", margin:"0 5px"}}>
            <p className="form_subheading">Role identifiers</p>
            {formFields("User Type", "role_type", "text", "*",true)}
            {formFields("Role Code", "resp_code", "text", "*")}
            {formFields("Role Name", "resp_name", "text", "*")}
        </div>

        <div className="form_right_resp">
            <p className="form_subheading_add">Map Responsibilites</p>
            {!roleLoader && visibleRoles?.length > 0 && (
            <MultipleSelectionRes
                fetchedRoles={visibleRoles}
                setSelectedRoles={setSelectedRoles}
                responsibilityMap = {ResponsibilityMap}
            />
            )}
            {roleLoader && <i>Fetching Menu Roles...</i>}
        </div>

        <div className="button_wrapper">
            <button className="form_button button_submit" style={{ padding: "5px 20px" }} onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
        </div>)}

        {activeTab === 'TotalRoles' && (
            <TotalRoles data = {roleType}/>
        )}
    </>
    );
};

export default AddRoles;
