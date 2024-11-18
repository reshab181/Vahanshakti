import { useSelector } from "react-redux"; 
import MainDashboard from "./MainDashboard.jsx";
import MnfDashboard from "./MnfDashboard.jsx";
import DstDashboard from "./DstDashboard.jsx";
import { useEffect, useState } from "react";
import { getDashboarData } from "../../apis/dashboardApi.jsx";
import PermitDashboard from "./PermitDashboard.jsx";
import RfcDashboard from "./RfcDashboard.jsx";

export const DashBoard = () => {

  let { navigationOpen } = useSelector((state) => state.common);
  const userType = sessionStorage.getItem('userType')
  const [dashboardData, setDashboardData] = useState(null)
  const [loader, setLoader] = useState(false)

  const getDashboardDetails = async () => {
    setLoader(true)
    const data = await getDashboarData()
    setDashboardData(data?.result)
    setLoader(false)
  }

  useEffect(() => {
    if(userType.toUpperCase() === 'MNF' || userType.toUpperCase() === 'DST' || userType.toUpperCase() === 'RFC'){
      getDashboardDetails()
    }
  },[])

  // Remove 'break' statements after 'return'
  switch (userType.toUpperCase()) {
    case 'MNF': 
      return <MnfDashboard loader={loader} data={dashboardData} navigationOpen={navigationOpen} />

    case 'RFC': 
      return <RfcDashboard loader={loader} data={dashboardData} navigationOpen={navigationOpen} />

    case 'DST': 
      return <DstDashboard loader={loader} data={dashboardData} navigationOpen={navigationOpen} />

    case 'PHOLDER': 
      return <PermitDashboard loader={loader} data={dashboardData} navigationOpen={navigationOpen} />

    default: 
      return <MainDashboard navigationOpen={navigationOpen} />
  }

};
