import React, { useState } from 'react'
import './OtaCommandScreen.css'
import { BaseURL } from '../../constants/baseURL'

const OtaCommandScreenUI = (props) => {
    console.log(props, "devoceData")
    const [commandType, setCommandType] = useState(null)
    const [commandSubType, setCommandSubType] = useState(null)
    const [commandVariables, setCommandVariables] = useState({})
    const [getRawPackets, setGetRawPackets] = useState(false)
    const [fetchedRawPacket, setFetchedRawPacket] = useState(null)

    let infoList = [
        { name: "Device Serial No", key: "deviceSerialNo", },
        { name: "Manufacturer Name", key: "mnfName", },
        { name: "Distributor Name", key: "distName", },
        { name: "IMEI No", key: "imeiNo", },
        { name: "ICCID Number", key: "iccidNumber" },
        { name: "VLTD Model Code", key: "vltdModelCode", },
    ]

    // Command Type List
    let commandTypeList = [
        { name: "IP and PORT for backend govt. server for VLT data", value: "gipIpPort", search:"GIP", commands:{ get: "+S*R:GET:GIP#;", clr: "+S*R:CLR:GIP#;", set:{command:"+S*R:SET:GIP#<ipaddress>,<port>;", fields:{ipaddress:"Enter IP Address", port:"Enter Port"}}}},
        { name: "Access point name for provided network", value: "apnApn", search:"APN",  commands:{ get: "+S*R:GET:APN#;", clr: "+S*R:CLR:APN#;", set:{command:"+S*R:SET:APN#<apn>;", fields:{apn:"Enter service Provider"}}}},
        { name: "Backend emergency control centre mobile number", value: "sosMobileNo", search:"SOS",  commands:{ get: "+S*R:GET:SOS#;", clr: "+S*R:CLR:SOS#;", set:{command:"+S*R:SET:SOS#<number>;", fields:{number:"Enter Mobile Number"}}}},
        { name: "IP and PORT for backend Emergency control centre", value: "eipIpPort",search:"EIP",  commands:{ get: "+S*R:GET:EIP#;", clr: "+S*R:CLR:EIP#;", set:{command:"+S*R:SET:EIP#<ipaddress>,<port>;", fields:{ipaddress:"Enter IP Address", port:"Enter Port"}}}},
        { name: "Vehicle registration number", value: "vrnVehicleNo",search:"VRN",  commands:{ get: "+S*R:GET:VRN#;", clr: "+S*R:CLR:VRN#;", set:{command:"+S*R:SET:VRN#<vrn>;", fields:{vrn:"Enter Vehicle Registration Number"}}}},
        { name: "Logs interval in sec when ignition ON", value: "logsInterval",search:"LOGS",  commands:{ get: "+S*R:GET:LOGS#;", clr: "+S*R:CLR:LOGS#;", set:{command:"+S*R:SET:LOGS#<interval>;", fields:{interval:"Enter Intervals Required in Seconds"}}}},
        { name: "Logs interval in sec when ignition OFF", value: "log2Interval",search:"LOG2",  commands:{ get: "+S*R:GET:LOG2#;", clr: "+S*R:CLR:LOG2#;", set:{command:"+S*R:SET:LOG2#<interval>;", fields:{interval:"Enter Intervals Required in Seconds"}}}},
        { name: "Health packet transmission interval in sec", value: "hptiInterval",search:"HPTI", commands:{ get: "+S*R:GET:HPTI#;", clr: "+S*R:CLR:HPTI#;", set:{command:"+S*R:SET:HPTI#<interval>;", fields:{interval:"Enter Intervals Required in Seconds"}}}},
        { name: "Emergency packet transmission interval in sec", value: "eptiInterval",search:"EPTI",  commands:{ get: "+S*R:GET:EPTI#;", clr: "+S*R:CLR:EPTI#;", set:{command:"+S*R:SET:EPTI#<interval>;", fields:{interval:"Enter Intervals Required in Seconds"}}}},
        { name: "Emergency mode timeout durationin sec", value: "emtdInterval",search:"EMTD",  commands:{ get: "+S*R:GET:EMTD#;", clr: "+S*R:CLR:EMTD#;", set:{command:"+S*R:SET:EMTD#<interval>;", fields:{interval:"Enter Intervals Required in Seconds"}}}},
        { name: "IP and PORT for private server for VLT data", value: "pipIpPort", search:"PIP",  commands:{ get: "+S*R:GET:PIP#;", clr: "+S*R:CLR:PIP#;", set:{command:"+S*R:SET:PIP#<ipaddress>,<port>;", fields:{ipaddress:"Enter IP Address", port:"Enter Port"}}}},
        { name: "To switch ON Relay connected to device", value: "imON", search:"IMON",  commands:{set:{command:"+S*R:IMON#;"}}},
        { name: "To switch OFF Relay connected to device", value: "imOFF", search:"IMOFF", commands:{set:{command:"+S*R:IMOFF#;"}}},
        { name: "To restart device without erasing logs", value: "rstWOLogsErase",search:"RST",  commands:{set:{command:"+S*R:RST#0;"}}},
        //{ name: "To restart device and erase logs", value: "rstLogsErase",search:"RST",  commands:{set:{command:"+S*R:RST#1;"}}},
        { name: "To set Over Speed", value: "slSpeed",search:"OSL",  commands:{get: "+S*R:GET:OSL#;", set:{command:"+S*R:SET:OSL#<speed>;", fields:{speed:"Enter cutoff speed"}}}},
        { name: "To release emergency", value: "sosOFF",search:"SOSOFF",  commands:{set:{command:"+##STOP_MSG"}}},
        // { name: "To set Geo-Fence In and Exit", value: "setGeo", commands:{get:"GETGEO 0,0", set:{command:"SETGEO 0,0,12.958575,77.568595,1,1,12.958575,77.85976"}}},
        { name: "Update firmware in device", value: "fotaFile",search:"FOTA",  commands:{set:{command:"+S*R:FOTA#<fileName>;", fields:{fileName:"Enter file Name"}}}},
        { name: "Send ACTV Command", value: "actvSend", commands:{set:{command:"ACTV,123456,9125436918"}}},
        { name: "Send HCHK Command", value: "hchkSend", commands:{set:{command:"HCHK,123456,9125436918"}}},
    ]

    
    const commandsType = () => {
        const commandTypesList = commandTypeList.filter(item=>item.value === commandType)
        const allowedCommands = commandTypesList[0]["commands"]
        return <div className="ota_form_wrapper ota_form_wrapper_row">
                <label htmlFor="type">Select Action</label>
                {"set" in allowedCommands && <>
                    <input type="radio" name="action" id="set" value='SET' onChange={()=>setCommandSubType('set')}/>
                    <label htmlFor="set" style={{ fontWeight: 600, marginLeft: '-10px' }}>Set</label>
                </>}

                {"get" in allowedCommands && <>
                <input type="radio" name="action" id="get" value='GET' onChange={()=>setCommandSubType('get')}/>
                <label htmlFor="get" style={{ fontWeight: 600, marginLeft: '-10px' }}>Get</label>
                </>
                }

                {"clr" in allowedCommands && <>
                <input type="radio" name="action" id="clr" value='CLR' onChange={()=>setCommandSubType('clr')}/>
                <label htmlFor="clr" style={{ fontWeight: 600, marginLeft: '-10px' }}>Clear</label>
                </>
                }
            </div>
        }
        
        const commandsSubType = () => {
            if(commandSubType === "set"){
                const commandTypesList = commandTypeList.filter(item=>item.value === commandType)
                if("fields" in commandTypesList[0]["commands"]["set"]){
                    const setCommandData = commandTypesList[0]["commands"]["set"]["fields"]
                    console.log(setCommandData, "setCommandData")
                    return <>{
                        Object.keys(setCommandData).map(item => <input key ={item} type='text' placeholder={setCommandData[item]} onChange={(e)=>{setCommandVariables({...commandVariables, [item]:e.target.value})}}/>)
                    }</>
                }
            }
        }

        

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commandTypesList = commandTypeList.filter(item=>item.value === commandType)
        if(commandSubType === "get" || commandSubType === "clr"){
            const datapacket = commandTypesList[0]["commands"][commandSubType];
            
            const encodedData = encodeURIComponent(datapacket);
            
            const url = `${BaseURL}/Intuchproxy/devices/${props?.inventory?.intuchEntityId}/command?type=34&val1=${encodedData}`;
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow"
              };


            const response = await fetch(url,requestOptions)
            const response_parsed = await response.json()
            setGetRawPackets(true)
            console.log(response_parsed, "getclearcommandsSent")

        } else if (commandSubType === "set") {
            let datapacket = ""
            let check = 1
            if("fields" in commandTypesList[0]["commands"]["set"]){
                let datapacketVariable = commandTypesList[0]["commands"]["set"]["command"]
                const fieldsRequired = Object.keys(commandTypesList[0]["commands"]["set"]["fields"])   
                if(fieldsRequired?.length > 0){
                    
                    for(let i=0; i < fieldsRequired?.length; i++){
                        if(Object.keys(commandVariables).includes(fieldsRequired[i])){
                            
                            datapacketVariable = datapacketVariable.replace(`<${fieldsRequired[i]}>`, commandVariables[fieldsRequired[i]])
                            console.log(1234, commandVariables, `<${fieldsRequired[i]}>`,commandVariables[fieldsRequired[i]], datapacketVariable,  "datapacketVariable")
                            
                        } else {
                            check = 0
                        }
                        
                    }
                }
                console.log(datapacketVariable, "datapacketVariable")
                datapacket = datapacketVariable
            } else {
                datapacket = commandTypesList[0]["commands"]["set"]["command"]
            }

            if(check === 1){
                const encodedData = encodeURIComponent(datapacket);
                const url = `${BaseURL}/Intuchproxy/devices/${props?.inventory?.intuchEntityId}/command?type=34&val1=${encodedData}`;
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
    
                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    redirect: "follow"
                  };
    
                const response = await fetch(url,requestOptions)
                const response_parsed = await response.json()
                console.log(response_parsed, "setcommandsSent")
                setGetRawPackets(true)  
            }
            

        }
    }


    const getRawPacketData = async (time) => {
        //const commandTypesList = commandTypeList.filter(item=>item.value === commandType)
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        if(commandType !=="actvSend" && commandType !=="hchkSend" && commandType !== "sosOFF"){
            const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${props?.inventory?.imeiNo}&startTime=${time}&endTime=${time+10*60}&type=3&alertId=12`, requestOptions)
            const response_parsed = await response.json()
            console.log(response_parsed, "commandTypesList")
            if(response_parsed?.data?.length > 0){
                setFetchedRawPacket(response_parsed["data"][0])
            }
        }
        
        if(commandType ==="actvSend"){
            const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${props?.inventory?.imeiNo}&startTime=${time}&endTime=${time+10*60}`, requestOptions)
            const response_parsed = await response.json()
            console.log(response_parsed, "response_parsed?.data")
            if(response_parsed?.data?.length > 0){
                const packetData=response_parsed?.data.filter(item=>item?.raw.includes("ACTVR"))
                console.log(packetData, "response_parsed?.data")
                setFetchedRawPacket(packetData[0]["raw"])
            }
        }
        
        if(commandType ==="hchkSend"){
            const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${props?.inventory?.imeiNo}&startTime=${time}&endTime=${time+10*60}&type=2`, requestOptions)
            const response_parsed = await response.json()
            if(response_parsed?.data?.length > 0){
                const packetData=response_parsed?.data.filter(item=>item?.raw.includes("HCHKR"))
                console.log(packetData, "response_parsed?.data")
                
                setFetchedRawPacket(packetData[0]["raw"])
            }
        }

        if(commandType ==="sosOFF"){
            const response = await fetch(`${BaseURL}/Intuchproxy/GetDeviceRaw?imei=${props?.inventory?.imeiNo}&startTime=${time}&endTime=${time+10*60}&type=3`, requestOptions)
            const response_parsed = await response.json()
            if(response_parsed?.data?.length > 0){
                const packetData=response_parsed?.data.filter(item=>item?.raw.includes("EA,11"))
                console.log(packetData,packetData[0]["raw"], "sosOFFHHDG")
                setFetchedRawPacket(packetData[0]["raw"])
            }
        }
        
    }

    const getRawDataFeed = () => {
        let dateTime = new Date();
        let epochTime = dateTime.getTime();
        let epochTimeInSeconds = Math.floor(epochTime/1000)-10

        const intervalOTAWarPacketId = setInterval(()=>getRawPacketData(epochTimeInSeconds), 5000);

        const checkOTADataReceived = setInterval(() => {
            if (fetchedRawPacket) {
                clearInterval(intervalOTAWarPacketId); 
                clearInterval(checkOTADataReceived); 
            }
        }, 5000);

        setTimeout(() => {
            clearInterval(intervalOTAWarPacketId);
            clearInterval(checkOTADataReceived);
        }, 120000); 
    }

    const clearData = () => {
        setCommandType(null)
        setCommandSubType(null)
        setCommandVariables({})
        setGetRawPackets(false)
        setFetchedRawPacket(null)
    }

    const extractOTAText = () => {
        const fetchedText = fetchedRawPacket?.raw

        let regex = /\((.*?)\)/;
        console.log(regex,fetchedText, "extractOTAText")
        let matches = fetchedText.match(regex);
        if (matches) {
            let extractedText = matches[1];
            
            let parts = extractedText.split(',');

            return <>
                    <p>Command sent from {parts[0]}</p>
                    <p>Command Type : {parts[1]}</p>
                    <p>Command Reponse : {parts[2]}</p>
                    <button className='card-button' onClick={()=>clearData()}>Reset</button>
                   </>
        } else {
            return <p>No Packet Found</p>
        }
    }

    return (
        <>

            <main className='ota_main_container' style={{width:"80%", margin:"auto"}}>
                <button onClick={() => props?.setCommandView(false)} style={{ position: 'absolute', left: '5px', top: '5px', color: 'rgba(0,0,0,0.8)', outline: 'none', border: '1px solid gainsboro', padding: '4px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Back To List</button>
                <section className='ota_section'>
                    <header>OTA COMMAND ACTION</header>
                    <section className="ota_info_section">
                        {
                            infoList?.map((elem, index) =>
                                <>
                                    <div className="ota_info_wrapper">
                                        <span className="ota_name">{elem?.name}</span>
                                        <span className="ota_value">{props?.inventory[elem?.key]}</span>
                                    </div>
                                </>)
                        }

                    </section>
                    <form style={{width:"80%", margin:"auto"}}>
                        <div className="ota_form_wrapper ota_form_wrapper_row">
                            <label htmlFor="cType">Select Purpose</label>
                            <select name="cType" id="cType" value={commandType} onChange={e => setCommandType(e.target.value)}>
                                <option value="" selected disabled>Select</option>
                                {
                                    commandTypeList?.map((elem, index) =>
                                        <option key={index} value={elem.value}>{elem?.name}</option>
                                    )
                                }
                            </select>
                        </div>

                        {commandType && commandsType()}
                        {commandSubType && commandsSubType()}
                        {getRawPackets ? null :<button className='ota_submit_btn' onClick={(e)=>handleSubmit(e)}>Send Command</button>}
                    </form>    
                        
                    {getRawPackets &&  getRawDataFeed()}
                    <div style={{margin:"10px auto"}}>
                        {fetchedRawPacket && commandType !=="actvSend" && commandType !=="hchkSend"  && commandType !== "sosOFF"  ? 
                        <>
                            {extractOTAText()}
                        </>
                        : fetchedRawPacket && (commandType ==="actvSend" || commandType ==="hchkSend"  || commandType === "sosOFF") ? <p style={{wordWrap:"break-word", maxWidth:"600px", margin:"auto"}}>{fetchedRawPacket}</p> : getRawPackets ? <p>Waiting for the response from Device!!</p> : null
                        }
                    </div>

                </section>

                                
            </main>
        </>
    )
}

export default OtaCommandScreenUI