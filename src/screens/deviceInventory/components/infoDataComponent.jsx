import React,  { useEffect, useState } from "react";
import { getRTOListIDName } from "../../../apis/rto";
import { activeDevice } from "../../../apis/deviceInventory";

export const InfoDataComponent = (props) => {
    console.log(props?.data, "props?.data")
    const onIntouch = props?.data?.intuchEntityId ? true : false

    const [rtoCode, setRTOCode] = useState("");
    const [entityType, setEntityType] = useState("");
    const [rtoDetailData, setRTODetailsData] = useState([])
  
    const entityTypeData = [
        { entitycode: 0, entityName: 'Car/Taxi' },
        { entitycode: 4, entityName: 'Bus' },
        { entitycode: 5, entityName: 'Truck' },
      ];

      useEffect(()=>{
        const getRTO = async () => {
          const result = await getRTOListIDName()
          console.log(result);
          setRTODetailsData(result)
        }
        getRTO()
      },[])

      const mapOnIntouch = async () => {
        console.log(props.data, "props.data")
        const result_intouch_map = await activeDevice(String(props.data.id), String(props.data.imei), entityType, rtoCode);
        console.log(result_intouch_map, "result_intouch_map")
      }
    
    const getInfo = async () => {
      props.setLoading(true)
        if(!onIntouch && rtoCode !== "" && entityType !== ""){
            await props.getInfo()
            await mapOnIntouch()  
        } else {
            await props.getInfo()
        } 
      props.setLoading(false)
    }
      
    const selectField = (label, star, options, setState) => {
        return (
          <div className="form-groups">
            <label className="form-labels">
              {label}
              <span className="vaglidation_mark">{star}</span>
            </label>
            <select
              required
              className="form-inputs"
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select</option>
              {options.map((option, index) => (
                <option key={index} value={option?.entitycode}>
                  {option?.entityName}
                </option>
              ))}
            </select>
          </div>
        );
      };
    
    const contentView = (name = '', value = '', type = '') => {
    return (
    <>
        <div className={`table-card-cell ${type == 'full' && ' full_width'}`}>
        <span className="table-card-key sub-heading">{name} </span>
        <div className="table-card-value text">{value || "N/A"}</div>
        </div>
    </>
    )
    }

  return (
    <>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", backgroundColor:"white", padding:"10px", margin:"10px"}} >
            {contentView("Device SerialNo", props.data.deviceSerialNo)}
            {contentView("ICCID Number", props.data.iccidNumber)}
            {contentView("IMEI No", props.data.imeiNo)}
            {contentView("ESIM Provider", props.data.esimProvider)}
            {contentView("VLTD Model", props.data.vltdModelCode)}
        </div>
        {!onIntouch && <div className="form-rows" style={{backgroundColor:"white", padding:"10px", margin:"10px"}}>
                  {selectField("Vehicle Type","*",entityTypeData, setEntityType)}
                  {selectField("RTO","*",rtoDetailData, setRTOCode)}
        </div>}
        <div style={{textAlign:"center"}}>
          <button onClick={getInfo} className="form_button button_reset" style={{margin:"10px"}}>
            Get Details
          </button>
        </div>

  </>
    );
};
