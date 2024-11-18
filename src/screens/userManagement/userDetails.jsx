import  { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

const UserDetails = () => {

    const location = useLocation();
    const params = useParams();
    const [data, setData] = useState({})

    useEffect(() => {
        console.log(location.state);
    
        if (location.state === null || location.state === undefined) {
          const id = params.ID;
          console.log(id);
        } else {
          setData(location.state);
        }
      }, [location, params]);
      console.log(data);

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
    <div style={{margin:"10px",marginTop:"30px"}}>
        <div className="id_bottom_container">
          {contentView("Full Name", data.fullname)}
          {contentView("Contact No", data.contactNo)}
          {contentView("Designation", data.designation)}
          {contentView("EmailID", data.emailid)}
          {contentView("Role", data.role)}
          {contentView("Role Type", data.roletype)}
          {contentView("User Id Intuch", data.useridIntuch)}
          {contentView("UserName", data.username)}
          {contentView("User Type", data.usertype)}
        </div>
    </div>
  )
}

export default UserDetails