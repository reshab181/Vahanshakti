import React, { useEffect, useState } from 'react';
import { getAllDeviceApproval, getESIMDetailsById } from "../../apis/masters";
import { useNavigate } from 'react-router-dom';
import ListTable from "../../components/Common/Listtable/ListTable";
import { BiDetail } from "react-icons/bi";
import { LoadingWidget } from "../../components/loading";
import { useLocation } from 'react-router-dom';

export const ViewEsimProviderDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const providerCode = location.state?.esimProviderName
    // console.log(providerCode, "abc");
    console.log(location.state, "123");
    const [deviceApproval, setDeviceApproval] = useState([])
    const [loading, setLoading] = useState(false);
    const [esimData, setEsimData] = useState([]);

    

    useEffect(() => {
        console.log(location.state, "123");
        setEsimData(location.state);
        console.log(esimData);

        const fetchData = async () => {
            setLoading(true);
            const result = await getAllDeviceApproval(1);
            console.log(result, "ESM");


            const filteredDevices = result.filter(device => device.esimAlloweds.some(esim => esim.esimName === result[0].esimAlloweds[0].esimName));

            if (filteredDevices.length > 0) {
                setDeviceApproval(filteredDevices);
            }

            setLoading(false);
        };

        // const getEsimData = async () => {
        //     try {
        //         const esimDetailsResponse = await getESIMDetailsById(location.state.id);
        //         console.log("esimDetailsResponse",location.state.id);

        //         if (esimDetailsResponse && esimDetailsResponse.result) {
        //             console.log(esimDetailsResponse.result);
        //             setEsimData([esimDetailsResponse.result]);
        //         } else {
        //             console.error("Invalid esimDetailsResponse:", esimDetailsResponse);

        //         }
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //         setError("Error fetching data. Please try again.");
        //         setLoading(false);
        //     }
        // }
        // getEsimData();

        fetchData();
    }, [location]);

    // useEffect(() => {
    //     const getEsimData = async () => {
    //         try {
    //             const esimDetailsResponse = await getESIMDetailsById(location.state.id);

    //             if (esimDetailsResponse && esimDetailsResponse.result) {
    //                 console.log(esimDetailsResponse.result);
    //                 setEsimData([esimDetailsResponse.result]);
    //             } else {
    //                 console.error("Invalid esimDetailsResponse:", esimDetailsResponse);

    //             }
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             setError("Error fetching data. Please try again.");
    //             setLoading(false);
    //         }
    //     }
    //     getEsimData();
    // }, [])
    console.log(esimData, "abc");

    const column = [
        {
            Header: "modelCode ",
            accessor: "modelCode",
            Cell: ({ cell }) => <>
                <div className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center' }}>
                    <span>{cell?.row?.original?.modelCode}</span>
                </div>
            </>
        },
        {
            Header: "modelName",
            accessor: "modelName",
            Cell: ({ cell }) => (cell.row.original?.modelName || "N/A")
        },
        {
            Header: "certifyingAuthority",
            accessor: "certifyingAuthority",
            Cell: ({ cell }) => (cell.row.original?.certifyingAuthority || "N/A")
        },
        {
            Header: "tacCertificateNo",
            accessor: "tacCertificateNo",
            Cell: ({ cell }) => (cell.row.original?.tacCertificateNo || "N/A")
        },
        {
            Header: "copCertificateNo",
            accessor: "copCertificateNo",
            Cell: ({ cell }) => (cell.row.original?.copCertificateNo || "N/A")
        }
    ]

    const column2 = [
        {
            Header: "providerCode",
            accessor: "providerCode",
            Cell: ({ cell }) => <>
                <div className="" style={{ display: 'flex', gap: '5px', alignContent: 'center', alignItems: 'center' }}>
                    <span>{cell?.row?.original?.providerCode}</span>
                </div>
            </>
        },
        {
            Header: "providerName",
            accessor: "providerName",
      width: '15%',
            Cell: ({ cell }) => (cell.row.original?.providerName || "N/A")
        },
        {
            Header: "address",
            accessor: "address",
            Cell: ({ cell }) => (cell.row.original?.address || "N/A")
        },
        {
            Header: "pincode",
            accessor: "pincode",
            Cell: ({ cell }) => (cell.row.original?.pincode || "N/A")
        },
        {
            Header: "pocPhone",
            accessor: "pocPhone",
            Cell: ({ cell }) => (cell.row.original?.pocPhone || "N/A")
        }
    ]

    const verticalCombinedUI = (label, value) => {
        return (
          <div className="col my-auto">
            <p style={{ fontSize: "1rem", margin: "0", fontWeight: "bold", color: "#555" }}>{label}</p>
            <p style={{ fontSize: "1rem", margin: "0", padding: "2px 0", color: "#333" }}>{value || "N/A"}</p>
          </div>
        );
    };

    return (
        <>
            <div>
                <div className="table-header-section">
                    <p className="table-listp">Esim Details</p>
                </div>
                {esimData ? (
                    // <ListTable viewStatus={true} dataList={esimData} columns={column2} />
                    <div className="manufacturer-details-container">
                    <div className="manufacturer-details">
                        <div className="detail-row">
                            {verticalCombinedUI("Poc Name", esimData["pocName"])}
                            {verticalCombinedUI("Poc Phone", esimData["pocPhone"])}
                            {verticalCombinedUI("Provider Name", esimData["providerName"])}
                            {verticalCombinedUI("Poc Email", esimData["pocEmail"])}
                            {verticalCombinedUI("District", esimData["district"])}
                            {verticalCombinedUI("State", esimData["state"])}
                            {verticalCombinedUI("Pin Code", esimData["pincode"])}
                        </div>
                    </div>
                </div>
                ) : (
                    <LoadingWidget />  
                )}
            </div>

            <div>
                <div className="table-header-section">
                    <p className="table-listp">Approval Details</p>
                </div>
                {deviceApproval ? (

                    <ListTable viewStatus={true} dataList={deviceApproval} columns={column} />
                    ) : <>
                    <LoadingWidget />
                </>}
            </div>
        </>
    );
}
