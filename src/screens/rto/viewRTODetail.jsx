import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getRTODetailsById, getUsersInRTO } from '../../apis/rto';
import ListTable from '../../components/Common/Listtable/ListTable';
import { AddUser } from '../userManagement/userAdd';
import { LoadingWidget } from '../../components/loading';

export const ViewRTODetails = () => {
    const location = useLocation();
   
    const params = useParams();
    const [rtoID, setRTOID] = useState(null);
    const [RTODetails, setRTODetails] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUserCreateUIopen, setIsUserCreateUIopen] = useState(false);

    useEffect(() => {
        const entityId = params.entityID;
        setRTOID(entityId);
        
        const geRTOData = async () => {
            try {
                setLoading(true);
                const response = await getRTODetailsById(entityId);
                if (response && response.result.length > 0) {
                    setRTODetails(response.result[0]);
                }

                const usersListResponse = await getUsersInRTO(entityId);
                if (usersListResponse.status) {
                    setUsersList(usersListResponse.result);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again.');
                setLoading(false);
            }
        };

        geRTOData();
    }, [location, params]);

    const column = [
        {
            Header: "Full Name",
            accessor: "fullname",
            width: '15%',
            Cell: ({ cell }) => (
                <div
                    onClick={() => navigate(`/rtos/details/${cell.row.original.id}`)}
                    className="cursor-pointer"
                    style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center' }}
                >
                    <span style={{ color: '#42a4f5' }}>{cell.row.original.fullname}</span>
                </div>
            ),
        },
        {
            Header: "User Name",
            accessor: "username",
            Cell: ({ cell }) => (cell.row.original?.username || "N/A"),
        },
        {
            Header: "Designation",
            accessor: "designation",
            Cell: ({ cell }) => (cell.row.original?.designation || "N/A"),
        },
        {
            Header: "Email ID",
            accessor: "emailid",
            Cell: ({ cell }) => (cell.row.original?.emailid || "N/A"),
        },
        {
            Header: "Contact No",
            accessor: "contactNo",
            Cell: ({ cell }) => (cell.row.original?.contactNo || "N/A"),
        },
    ];

    const verticalCombinedUI = (label, value) => (
        <div className="col my-auto">
            <p style={{ fontSize: "1rem", margin: "0", fontWeight: "bold", color: "#555" }}>{label}</p>
            <p style={{ fontSize: "1rem", margin: "0", padding: "2px 0", color: "#333" }}>{value || "N/A"}</p>
        </div>
    );

    return (
        <>
            <div style={{ textAlign: 'left', margin: "20px", fontWeight: "600" }}>
                <h3>RTO Details</h3>
            </div>

            {loading ? (
                <LoadingWidget />
            ) : error ? (
                <p>{error}</p>
            ) : RTODetails ? (
                <div className="manufacturer-details-container">
                    <div className="manufacturer-details">
                        <div className="detail-row">
                            {verticalCombinedUI("Entity Code", RTODetails["entitycode"])}
                            {verticalCombinedUI("Entity Name", RTODetails["entityName"])}
                            {verticalCombinedUI("GST/PAN", RTODetails["kycgstpan"])}
                            {verticalCombinedUI("Location", RTODetails["address"])}
                            {verticalCombinedUI("District", RTODetails["district"])}
                            {verticalCombinedUI("State", RTODetails["state"])}
                            {verticalCombinedUI("Pin Code", RTODetails["pinCode"])}
                        </div>
                    </div>
                </div>
            ) : null}

            <div style={{ textAlign: 'left', margin: "20px", fontWeight: "600" }}>
                <h3>RTO User Details</h3>
            </div>

            <div>
                {loading ? (
                    <LoadingWidget />
                ) : (
                    <>
                        {usersList.length > 0 ? (
                            <div className="table-list">
                                <ListTable dataList={usersList} columns={column} viewStatus={true} />
                            </div>
                        ) : (
                            <div style={{ margin: "10px", fontWeight: "600", textAlign: "center" }}>
                                <p>No User Created</p>
                                <button className="user-button-mnf" style={{ textAlign: "center" }} onClick={() => setIsUserCreateUIopen(true)}>
                                    Create User
                                </button>
                            </div>
                        )}
                        {isUserCreateUIopen && <AddUser userType="RTO" entityId={rtoID} navigateto="/rtos/listRTO" />}
                    </>
                )}
            </div>
        </>
    );
};
