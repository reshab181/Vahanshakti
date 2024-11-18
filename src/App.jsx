import React, { Suspense, lazy } from 'react'
import 'animate.css'
import { Route, Routes } from 'react-router-dom';

import { PublicPage } from './screens/publicScreens/publicPage.jsx';
// import { ProtectedRoutes } from './components/HOC/ProtectedRoutes.jsx';
import ForgetPassword from './components/ForgetPassword.jsx';
import ForgetPasswordPermit from './components/ForgetPasswordPermit.jsx';
import PublicDashboard from './screens/publicScreens/PublicDashboard.jsx';
import ReportViolation from './screens/Mobile/ReportViolation.jsx';
import { PrivacyPolicy } from './screens/publicScreens/privacyPolicy.jsx';
import RegisterMNF from './screens/manufacturers/components/RegisterMNF.jsx';
import StopMNFRegisteration from './screens/manufacturers/components/registrationSuspension.jsx';


const ProtectedRoutes = lazy(()=>import('./components/HOC/ProtectedRoutes.jsx'))

const App = () => {
  console.log("App rendered")
  return (
    <>
      <Suspense fallback={<div className="loader-wrap"><div className="loader-comp"></div></div>}>
        <Routes>
          <Route path='/' index element={<PublicPage />} />
          {/* <Route path='/publicCharts' index element={<PublicPage />} /> */}
          <Route path='forgetPassword' element={<ForgetPassword />} />
          <Route path='forgetPasswordPermit' element={<ForgetPasswordPermit />} />
          <Route path='publicDashboard' element={<PublicDashboard />} />
          <Route path='reportPermitViolation' element={<ReportViolation />} />
          <Route path='privacyLink' element={<PrivacyPolicy />} />
          {/* <Route path='manufacturerSignUp' element={<RegisterMNF />} /> */}
          <Route path='manufacturerSignUp' element={<StopMNFRegisteration />} />
          
          <Route path= '/*' element={<ProtectedRoutes />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App