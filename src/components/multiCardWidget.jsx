import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";




export const MultiCardWidgets = ({alarmsData,loading, alertData}) => {
  
  const navigate = useNavigate();
  const {t} = useTranslation()

  const tiles = [
    {
      count: alarmsData?.emergencyAlertON?.length || 0,
      key: alarmsData?.emergencyAlertON,     
      id: "emergencyAlertON",
      code: 24,
      subCode: 1,
      description: t('mainDashboard.EmergencyAlertOnText'),
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7.5" fill="red"/>
      <path d="M16 13V16.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 21.2733H11.96C9.6467 21.2733 8.68004 19.62 9.80004 17.6L11.88 13.8533L13.84 10.3333C15.0267 8.19333 16.9734 8.19333 18.16 10.3333L20.12 13.86L22.2 17.6067C23.32 19.6267 22.3467 21.28 20.04 21.28H16V21.2733Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.9963 18.3333H16.0023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    {
      count: alarmsData?.sosTamper?.length || 0,
      key: alarmsData?.sosTamper,
      id: "sosTamper",
      code:1122,
      subCode: 1,
      description: t('mainDashboard.SOSWireTemperText'),
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="-0.000183105" width="32" height="32" rx="7.5" fill="#8A7171"/>
      <path d="M11 11.3333L11 19.3333C11.0011 20.2171 11.3526 21.0643 11.9775 21.6892C12.6024 22.3141 13.4496 22.6656 14.3333 22.6667L15.6667 22.6667L15.6667 23.3333C15.6667 23.5101 15.7369 23.6797 15.8619 23.8047C15.987 23.9298 16.1565 24 16.3333 24C16.5101 24 16.6797 23.9298 16.8047 23.8047C16.9298 23.6797 17 23.5101 17 23.3333L17 22.6667L18.3333 22.6667C19.2171 22.6656 20.0643 22.3141 20.6892 21.6892C21.3141 21.0643 21.6656 20.2171 21.6667 19.3333L21.6667 11.3333C21.6656 10.4496 21.3141 9.60237 20.6892 8.97748C20.0643 8.35259 19.2171 8.00106 18.3333 8L14.3333 8C13.4496 8.00106 12.6024 8.35259 11.9775 8.97748C11.3526 9.60237 11.0011 10.4496 11 11.3333ZM18.3333 21.3333L17 21.3333C17 21.1565 16.9298 20.987 16.8047 20.8619C16.6797 20.7369 16.5101 20.6667 16.3333 20.6667C16.1565 20.6667 15.987 20.7369 15.8619 20.8619C15.7369 20.987 15.6667 21.1565 15.6667 21.3333L14.3333 21.3333C13.8029 21.3333 13.2942 21.1226 12.9191 20.7475C12.544 20.3725 12.3333 19.8638 12.3333 19.3333L20.3333 19.3333C20.3333 19.8638 20.1226 20.3725 19.7475 20.7475C19.3725 21.1226 18.8638 21.3333 18.3333 21.3333ZM18.3333 9.33333C18.8638 9.33333 19.3725 9.54405 19.7475 9.91912C20.1226 10.2942 20.3333 10.8029 20.3333 11.3333L20.3333 18L12.3333 18L12.3333 11.3333C12.3333 10.8029 12.544 10.2942 12.9191 9.91912C13.2942 9.54405 13.8029 9.33333 14.3333 9.33333L18.3333 9.33333Z" fill="white"/>
      </svg> 
    },
    {
      count: alarmsData?.overSpeeding?.length || 0,
      key: alarmsData?.overSpeeding,
      id: "overSpeeding",
      code:22,
      subCode: 0,
      description: t('mainDashboard.OverSpeedingAlertText'),
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7.5" fill="#DE3015"/>
      <path d="M11.8031 21.2838C11.9928 21.4695 12.1009 21.7228 12.1038 21.9882C12.1066 22.2535 12.0038 22.5091 11.8181 22.6987C11.6324 22.8883 11.3789 22.9964 11.1135 22.9992C10.848 23.002 10.5924 22.8993 10.4027 22.7137C9.26726 21.602 8.48875 20.1775 8.16636 18.6218C7.84398 17.0661 7.99231 15.4497 8.59247 13.9787C9.19263 12.5076 10.2174 11.2484 11.5362 10.3618C12.855 9.47508 14.4081 9.00102 15.9974 9.00001C16.38 8.9999 16.7621 9.02696 17.1408 9.081C17.2709 9.09974 17.396 9.14392 17.5089 9.211C17.6219 9.27809 17.7206 9.36677 17.7992 9.47198C17.8779 9.57718 17.9351 9.69686 17.9675 9.82416C17.9999 9.95146 18.0069 10.0839 17.9881 10.2139C17.9708 10.3446 17.9276 10.4706 17.861 10.5843C17.7944 10.6981 17.7056 10.7974 17.6 10.8764C17.4944 10.9554 17.3741 11.0125 17.2461 11.0444C17.1181 11.0762 16.985 11.0821 16.8547 11.0618C15.6028 10.8831 14.3264 11.1042 13.2076 11.6936C12.0889 12.2829 11.185 13.2105 10.6249 14.3439C10.0648 15.4772 9.87716 16.7585 10.0887 18.0047C10.3003 19.251 10.9003 20.3986 11.8031 21.2838ZM23.9189 15.8564C23.973 16.2349 24.0001 16.6168 24 16.9993C24.0032 18.0648 23.7916 19.1201 23.3777 20.1021C22.9639 21.0841 22.3563 21.9727 21.5912 22.7147C21.4012 22.9003 21.1453 23.0029 20.8797 22.9999C20.614 22.9969 20.3605 22.8886 20.1748 22.6987C19.989 22.5088 19.8864 22.253 19.8894 21.9875C19.8924 21.7219 20.0008 21.4685 20.1908 21.2828C20.8666 20.6243 21.377 19.8153 21.6802 18.9219C21.9834 18.0285 22.0708 17.076 21.9353 16.1423C21.8974 15.8797 21.9654 15.6127 22.1244 15.4001C22.2834 15.1876 22.5203 15.0469 22.7831 15.0089C23.0459 14.971 23.3129 15.039 23.5256 15.1979C23.7382 15.3568 23.879 15.5937 23.9169 15.8564H23.9189ZM17.924 16.4873C18.0444 16.92 18.018 17.3804 17.849 17.7965C17.68 18.2127 17.3779 18.5612 16.9899 18.7876C16.6018 19.014 16.1497 19.1055 15.7041 19.048C15.2584 18.9904 14.8445 18.7869 14.5267 18.4693C14.209 18.1518 14.0055 17.7379 13.9479 17.2925C13.8903 16.8471 13.9819 16.3951 14.2084 16.0072C14.4349 15.6193 14.7835 15.3173 15.1998 15.1484C15.6161 14.9795 16.0767 14.9531 16.5096 15.0734L20.2918 11.2928C20.3841 11.1973 20.4944 11.1211 20.6165 11.0687C20.7385 11.0163 20.8698 10.9887 21.0026 10.9876C21.1354 10.9864 21.2672 11.0117 21.3901 11.062C21.513 11.1123 21.6247 11.1865 21.7186 11.2804C21.8126 11.3743 21.8868 11.4859 21.9371 11.6088C21.9874 11.7317 22.0127 11.8634 22.0116 11.9961C22.0104 12.1289 21.9828 12.2601 21.9304 12.3821C21.878 12.5041 21.8018 12.6144 21.7062 12.7067L17.924 16.4873Z" fill="white"/>
      </svg>
    },
    {
      count: alarmsData?.deviceOpen?.length || 0,
      key: alarmsData?.deviceOpen,
      id: "deviceOpen",
      code: 369,
      description: t('mainDashboard.DeviceTamperedText'),
      subCode: 1,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="-0.000183105" width="32" height="32" rx="7.5" fill="#8A7171"/>
      <path d="M11 11.3333L11 19.3333C11.0011 20.2171 11.3526 21.0643 11.9775 21.6892C12.6024 22.3141 13.4496 22.6656 14.3333 22.6667L15.6667 22.6667L15.6667 23.3333C15.6667 23.5101 15.7369 23.6797 15.8619 23.8047C15.987 23.9298 16.1565 24 16.3333 24C16.5101 24 16.6797 23.9298 16.8047 23.8047C16.9298 23.6797 17 23.5101 17 23.3333L17 22.6667L18.3333 22.6667C19.2171 22.6656 20.0643 22.3141 20.6892 21.6892C21.3141 21.0643 21.6656 20.2171 21.6667 19.3333L21.6667 11.3333C21.6656 10.4496 21.3141 9.60237 20.6892 8.97748C20.0643 8.35259 19.2171 8.00106 18.3333 8L14.3333 8C13.4496 8.00106 12.6024 8.35259 11.9775 8.97748C11.3526 9.60237 11.0011 10.4496 11 11.3333ZM18.3333 21.3333L17 21.3333C17 21.1565 16.9298 20.987 16.8047 20.8619C16.6797 20.7369 16.5101 20.6667 16.3333 20.6667C16.1565 20.6667 15.987 20.7369 15.8619 20.8619C15.7369 20.987 15.6667 21.1565 15.6667 21.3333L14.3333 21.3333C13.8029 21.3333 13.2942 21.1226 12.9191 20.7475C12.544 20.3725 12.3333 19.8638 12.3333 19.3333L20.3333 19.3333C20.3333 19.8638 20.1226 20.3725 19.7475 20.7475C19.3725 21.1226 18.8638 21.3333 18.3333 21.3333ZM18.3333 9.33333C18.8638 9.33333 19.3725 9.54405 19.7475 9.91912C20.1226 10.2942 20.3333 10.8029 20.3333 11.3333L20.3333 18L12.3333 18L12.3333 11.3333C12.3333 10.8029 12.544 10.2942 12.9191 9.91912C13.2942 9.54405 13.8029 9.33333 14.3333 9.33333L18.3333 9.33333Z" fill="white"/>
      </svg>
    },
    {
      count: alarmsData?.harshAcceleration?.length || 0,
      key: alarmsData?.harshAcceleration,
      id: "harshAcceleration",
      code:127,
      subCode: 1,
      description: t('mainDashboard.HarshAccelerationText'),
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7.5" fill="#333333"/>
      <path d="M12.1599 20.6125V19.06" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M16 20.6125V17.5075" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M19.8401 20.6125V15.9475" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M19.8399 11.3875L19.4949 11.7925C17.5824 14.0275 15.0174 15.61 12.1599 16.3225" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M17.6426 11.3875H19.8401V13.5775" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.75 23.5H18.25C22 23.5 23.5 22 23.5 18.25V13.75C23.5 10 22 8.5 18.25 8.5H13.75C10 8.5 8.5 10 8.5 13.75V18.25C8.5 22 10 23.5 13.75 23.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    {
      count: alarmsData?.harshBreaking?.length || 0,
      key: alarmsData?.harshBreaking,
      id: "harshBreaking",
      code:127,
      subCode: 1,
      description: t('mainDashboard.HarshBreakingText'),
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="-0.000183105" width="32" height="32" rx="7.5" fill="#8A7171"/>
      <path d="M11 11.3333L11 19.3333C11.0011 20.2171 11.3526 21.0643 11.9775 21.6892C12.6024 22.3141 13.4496 22.6656 14.3333 22.6667L15.6667 22.6667L15.6667 23.3333C15.6667 23.5102 15.7369 23.6797 15.8619 23.8047C15.987 23.9298 16.1565 24 16.3333 24C16.5101 24 16.6797 23.9298 16.8047 23.8047C16.9298 23.6797 17 23.5102 17 23.3333L17 22.6667L18.3333 22.6667C19.2171 22.6656 20.0643 22.3141 20.6892 21.6892C21.3141 21.0643 21.6656 20.2171 21.6667 19.3333L21.6667 11.3333C21.6656 10.4496 21.3141 9.60238 20.6892 8.97749C20.0643 8.35259 19.2171 8.00106 18.3333 8.00001L14.3333 8.00001C13.4496 8.00107 12.6024 8.35259 11.9775 8.97749C11.3526 9.60238 11.0011 10.4496 11 11.3333ZM18.3333 21.3333L17 21.3333C17 21.1565 16.9298 20.987 16.8047 20.8619C16.6797 20.7369 16.5101 20.6667 16.3333 20.6667C16.1565 20.6667 15.987 20.7369 15.8619 20.8619C15.7369 20.987 15.6667 21.1565 15.6667 21.3333L14.3333 21.3333C13.8029 21.3333 13.2942 21.1226 12.9191 20.7476C12.544 20.3725 12.3333 19.8638 12.3333 19.3333L20.3333 19.3333C20.3333 19.8638 20.1226 20.3725 19.7475 20.7476C19.3725 21.1226 18.8638 21.3333 18.3333 21.3333ZM18.3333 9.33334C18.8638 9.33334 19.3725 9.54405 19.7475 9.91913C20.1226 10.2942 20.3333 10.8029 20.3333 11.3333L20.3333 18L12.3333 18L12.3333 11.3333C12.3333 10.8029 12.544 10.2942 12.9191 9.91913C13.2942 9.54405 13.8029 9.33334 14.3333 9.33334L18.3333 9.33334Z" fill="white"/>
      </svg>
    },
    
  ];

  const handleSubmit = async(e, description, code, subcode, uiLabel) => {
    
    e.preventDefault();
    
    let result;
    
    if (description === "deviceOpen") {
      result = alarmsData?.deviceOpen||[]
    } else if (description === "overSpeeding") {
      result = alarmsData?.overSpeeding||[]
    } else if (description === "harshBreaking") {
      result = alarmsData?.harshBreaking||[]
    } else if (description === "harshAcceleration") {
      result = alarmsData?.harshAcceleration||[]
    } else if (description === "sosTamper") {
      result = alarmsData?.sosTamper||[]
    } else if (description === "emergencyAlertON") {
      result = alarmsData?.emergencyAlertON||[]
    }
    console.log(result, "result")
    if(result.length > 0){
      navigate(`/subDashboard/${uiLabel}`, { state: {data: result, code:code, subcode:subcode} });
    }else{
      navigate(`/dashboard`, );    
    }
  };
  
  

  const cardView = (data, index) => {
    console.log(data, index, "DataPassedCard");

    const shouldDisplaySkeleton = !loading && (data?.count === 0 || !data?.count);

    return (
      <div
        key={data?.id || index} // Using unique 'id' if available, fallback to 'index'
        className="detail-card animate__animated animate__zoomIn animate__faster"
      >
        <div className="icon-count" onClick={() => alertData(data?.key)}>
          <div className="count_wrap">
            <span className="card-label">{data?.description || "No Description"}</span>
            {shouldDisplaySkeleton ? (
             
              <div className='sanimate' style={{height: '100px', width: "250px"}}/>
            ) : (
              <span className="card-count">{data?.count || "0"}</span>
            )}
          </div>
          <span className="card-icon">{data?.icon || "🔔"}</span>
        </div>
        <div className="card-desc">
          <span
            className="card-button"
            onClick={(e) =>
              handleSubmit(
                e,
                data?.id,
                data?.code,
                data?.subCode,
                data?.description
              )
            }
          >
            More Info
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="multi-card-container">
      {tiles.length === 0 || tiles.every(item => item.count === 0 || !item.count) ? (
        // If all data items have count 0 or no count, display skeleton cards
        Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="detail-card animate__animated animate__zoomIn animate__faster">
            {/* <Skeleton width="100%" height={150} /> */}
            <div className='sanimate' style={{height: '100px', width: "250px"}}/>
          </div>
        ))
      ) : (
        tiles.map((item, index) => cardView(item, index))
      )}
    </div>
  );
  
};
