import React, { useEffect, useState } from 'react'
import ListTable from './ListTable'
import fetchInterceptor from '../../../apis/fetchInterceptor'
import { LoadingWidget } from '../../loading'
import { getAlarmDetailsByIntouchID } from '../../../apis/dashboard'
import { alarmsMap } from '../../../constants/alarmMap'

const ListTableAlarms = (props) => {

    // 👉 State constants 👈
    const [perPageCount, setperPageCount] = useState(10)
    const [pageCount, setpageCount] = useState(1)
    const [currentPage, setcurrentPage] = useState(1)
    const [lastPage, setlastPage] = useState(1)
    const [totalCount, settotalCount] = useState(0)
    const [errorState, seterrorState] = useState(false)
    const [dataList, setdataList] = useState([])
    const [loader, setloader] = useState(false)

    // 👉 Function 1 👈
    const searchOldFun = async () => {
        seterrorState(false)
        setloader(true)

        try {
            let token = sessionStorage.getItem("token")
            let url = `${props?.api}page=${pageCount}&pageSize=${perPageCount}`;

            let header = {
                    method: "GET",
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + token,
                    },
            }

            const response = await fetchInterceptor(url, header);
            
            if (!response.ok) {
                setdataList([])
                settotalCount(0)
            }

            const data = await response.json();
            console.log(data?.result?.devicelist, "getVehicleList")    
            seterrorState(false)
            console.log(`response success ${url} \n`, data?.result);
            
            const vehicleList = data?.result?.devicelist
            const inTOuchEntityIds = vehicleList.map(item=>item?.intuchEntityId)
            
            
            //console.log(alarmsData?.data, "alarmsDataFetched")
            const finalList = []
            console.log(vehicleList, "alarmsDataFetched")
            for (let itemVehicle of vehicleList){
                const itemFinal = {}
                itemFinal["deviceSerialNo"] = itemVehicle["deviceSerialNo"]
                itemFinal["imeiNo"] = itemVehicle["imeiNo"]
                itemFinal["vehicleRegistrationNumber"] = itemVehicle["vehicleRegistrationNumber"]
                itemFinal["intuchEntityId"] = itemVehicle["intuchEntityId"]
                if(itemVehicle["intuchEntityId"] > 60){
                    const alarmsData = await getAlarmDetailsByIntouchID(itemVehicle["intuchEntityId"])
                    itemFinal["emergencyAlertON"] = alarmsData?.data.filter(item=>item?.type == 24).length || 0
                    itemFinal["sosTamper"] = alarmsData?.data.filter(item=>item?.type == 1122).length || 0
                    itemFinal["deviceOpen"] = alarmsData?.data.filter(item=>item?.type == 369).length || 0
                    itemFinal["overSpeeding"] = alarmsData?.data.filter(item=>item?.type == 22).length || 0
                } else {
                    itemFinal["emergencyAlertON"] =  0
                    itemFinal["sosTamper"] =  0
                    itemFinal["deviceOpen"] = 0
                    itemFinal["overSpeeding"] = 0
                }
                
                finalList.push(itemFinal)
                console.log("itemFinal",itemFinal);
            }


            setdataList(finalList ?? [])
            settotalCount(data?.result?.totalrecords ?? 0)
            setlastPage(() => {
                if (data?.result?.totalrecords % perPageCount == 0) {
                    return Math.ceil(data?.result?.totalrecords / perPageCount) - 1
                } else {
                    return Math.ceil(data?.result?.totalrecords / perPageCount)
                }
            })
        } catch (error) {
            console.error('Error fetching data:', error);
            setdataList([])
            settotalCount(0)
        }
        finally {
            setloader(false)
            seterrorState(false)
        }

    }

    // 👉 Function 2 👈
    const nextPageFun = () => {
        setpageCount(currentPage + 1)
        setcurrentPage(currentPage + 1)
    }

    // 👉 Function 3 👈
    const prevPageFun = () => {
        setpageCount(currentPage - 1)
        setcurrentPage(currentPage - 1)
    }

    // 👉 Function 4 👈
    const perPageFun = (val) => {

        console.log('incoming per page: ', val)

        let checkPage = parseInt(totalCount / val)
        let checkPageRemainder = parseInt(totalCount % val)

        if (checkPageRemainder == 0) {
            checkPage < currentPage && setpageCount(checkPage)
            setperPageCount(val)
            return
        }

        if (checkPageRemainder != 0) {
            (checkPage + 1) < currentPage && setpageCount(checkPage + 1)
            setperPageCount(val)
            return
        }

    }

    // 👉 Function 5 👈
    const firstPageFun = () => {
        setpageCount(1)
        setcurrentPage(1)
    }

    // 👉 Function 6 👈
    const lastPageFun = () => {
        setpageCount(lastPage)
        setcurrentPage(lastPage)
    }

    // 👉 Calling Function 1 on Data change 👈
    useEffect(() => {

        if (props?.changeData > 0) {
            setpageCount(1)
            setperPageCount(10)
            searchOldFun()
        }

    }, [props?.changeData])

    // 👉 Calling Function 1 when page no. or data per page change 👈
    useEffect(() => {
        setloader(true)
        searchOldFun()
    }, [pageCount, perPageCount, currentPage])

    return (
        <>

            {/* 👉 When error occured 👈 */}
            {errorState &&
                <div className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center" role="alert">
                    <strong className="font-bold">Sorry! </strong>
                    <span className="block sm:inline">Some error occured while fetching list. Please try again later.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                </div>
            }

            {/* 👉 Loader 👈 */}
            {
                loader && <LoadingWidget />
            }

            {/* 👉 Listtable Components 👈 */}
            {
                (!loader) &&

                <>
                    {/* 👉 Listtable 👈 */}
                    <ListTable
                        dataList={dataList}
                        columns={props?.columns}
                        totalCount={totalCount}
                        lastPage={lastPage}
                        currentPage={currentPage}
                        goFirst={firstPageFun}
                        goLast={lastPageFun}
                        nextPage={nextPageFun}
                        prevPage={prevPageFun}
                        perPageC={perPageFun}
                        perPageCount={perPageCount}
                        heading={"Critical Alarms Summary"}
                    />
                </>

            }

        </>
    )
}

export default ListTableAlarms