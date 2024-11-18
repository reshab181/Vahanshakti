import { FaInfoCircle } from "react-icons/fa";


const StopMNFRegisteration = (props) => {
    return <div><div style={{display:"flex", margin:"10rem 2rem", justifyContent: "center", alignItems: "center"}}>
            <FaInfoCircle size={"7rem"} color="orange"/>
            <div style={{margin:"0 2rem"}}>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "darkred"}}>Manufacturer Registration has been closed</p>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "gray" }}>Please contact Maharashtra State Transport Department for further information</p>
            </div>
           </div>
           <p style={{margin:"15rem auto 0rem", textAlign:"center"}}>For any information or query regarding Vahan Shakti portal you may reach us at <b>info@vahanshakti.in</b></p>
           </div>
}

export default StopMNFRegisteration