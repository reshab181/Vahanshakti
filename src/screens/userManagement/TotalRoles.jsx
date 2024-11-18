import  { useEffect, useState } from 'react'
import ListTable from '../../components/Common/Listtable/ListTable'
import { getResponsibilityList } from '../../apis/responsibility'
import ShimmerLoader from '../../components/Common/Listtable/ShimmerLoader'


const TotalRoles = () => {
    const[data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    
    
    const loggedInUserType = sessionStorage.getItem('userType')
    const eid = sessionStorage.getItem('entityId')
    
    useEffect(()=>{
        const fetchedRole = async() => {
        const body = {
          entityid : eid,
          role_type:loggedInUserType
        }
        setLoading(true)
        const res = await getResponsibilityList(body)
        console.log(res?.result);
        setData(res?.result)
        setLoading(false)
    }
    fetchedRole()
},[])


  const column = [
      {
        Header: "Responsibility Code",
        accessor: "resp_code",
        width: '15%',
        Cell: ({cell}) => <>
        <div className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{color: '#42a4f5'}}>{cell?.row?.original?.resp_code}</span>
        </div>
        </>
      },
      {
        Header: "Responsibility Name",
        accessor: "resp_name",
        Cell: ({ cell }) => (cell.row.original?.resp_name || "N/A")
      },
      {
        Header: "Role Type",
        accessor: "role_type",
        Cell: ({ cell }) => (cell.row.original?.role_type || "N/A")
      },

     {
  Header: "Access Map",
  Cell: ({ cell }) =>
    cell.row.original?.roleLists?.map((item, index) => (
      <p
        key={item?.id || index}
        style={{
          display: "inline-block",
          margin: "5px",
          padding: "2px",
          backgroundColor: "#90EE90",
        }}
      >
        {item?.name}
      </p>
    ))
}

    ]
  return (
    <div>
        {
            loading ?
                <div style={{ margin: '10px', padding: '15px', border: '1px solid gainsboro', backgroundColor: 'white' }}>
                    <ShimmerLoader />
                </div>
                :
                <ListTable dataList={data} columns={column}/>  
        }

    </div>
  )
}

export default TotalRoles

