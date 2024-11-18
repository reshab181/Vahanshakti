import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom";
import BackButton from "../../components/Common/BackButton";

const Reports = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const userType = sessionStorage.getItem("userType")
  const designation = sessionStorage.getItem("designation").toLowerCase()

  return (
    <>
      <nav className="sub-nav">
        <BackButton/>
        <ul className="sub-nav-item">
        
          {/* <li>
            <Link
              className={` ${
                matchRoute(`/reports/vehicleReports`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/vehicleReports`}
            >
              Vehicle Reports
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                matchRoute(`/reports/deviceDashboard`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/deviceDashboard`}
            >
              Device Dashboard
            </Link>
          </li> */}
          <li>
            <Link
              className={` ${
                matchRoute(`/reports/deviceReports`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/deviceReports`}
            >
              Device Reports
            </Link>
          </li>
          <li>
            <Link
              className={` ${
                matchRoute(`/reports/alarmReports`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/alarmReports`}
            >
              Alarm Reports
            </Link>
          </li>
          {["SBU", "SUA"].includes(userType) && designation === "admin" && <li>
            <Link
              className={` ${matchRoute(`/reports/logs`)
                ? "sub-nav-text-active"
                : "sub-nav-text"
                }`}
              to={`/reports/logs`}
            >
             All Logs
            </Link>
          </li>}
          <li>
            <Link
              className={` ${
                matchRoute(`/reports/scheduleReports`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/scheduleReports`}
            >
              Schedule Report
            </Link>
        </li>
        <li>
            <Link
              className={` ${
                matchRoute(`/reports/sosInfoList`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/sosInfoList`}
            >
              SOS Actions
            </Link>
        </li>
        <li>
            <Link
              className={` ${
                matchRoute(`/reports/accidentInfoList`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/accidentInfoList`}
            >
              Accident Reports
            </Link>
        </li>
        <li>
            <Link
              className={` ${
                matchRoute(`/reports/reportedViolations`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/reportedViolations`}
            >
              Reported Violations
            </Link>
        </li>
        <li>
            <Link
              className={` ${
                matchRoute(`/reports/ets360`)
                  ? "sub-nav-text-active"
                  : "sub-nav-text"
              }`}
              to={`/reports/ets360`}
            >
              ETS 360
            </Link>
        </li>
        </ul>
      </nav>
      {/* </div> */}
      <div className="sub-nav-outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Reports;