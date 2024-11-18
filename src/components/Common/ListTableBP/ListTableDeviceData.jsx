import React, { useEffect, useState } from 'react'
import ListTable from './ListTable'
import fetchInterceptor from '../../../apis/fetchInterceptor'
import { LoadingWidget } from '../../loading'
import { deviceDetailLiveByID } from '../../../apis/deviceInventory'
import { convertEpochToDateAndTime } from '../PowerUpFunctions'


const ListTableActivatedDeviceData = (props) => {

    const [perPageCount, setperPageCount] = useState(10)
    const [pageCount, setpageCount] = useState(1)
    const [currentPage, setcurrentPage] = useState(1)
    const [lastPage, setlastPage] = useState(1)
    const [totalCount, settotalCount] = useState(0)
    const [errorState, seterrorState] = useState(false)
    const [dataList, setdataList] = useState([])
    const [loader, setloader] = useState(false)

    console.log(dataList, "DevicesData")

    const getCurrentLocation = async (id) => {
        try{
            const response = await deviceDetailLiveByID(id);
            console.log(response?.data, "response.data[0]")
            // if(response?.data?.length === 0){
            //     dataParsed = {}
            //     for (let i = 0; i < response?.data?.length; i++) {
            //         dataParsed[id] = {location: response?.data[i]["address"], timestamp: convertEpochToDateAndTime(response?.data[i]["gps_ts"]), speed: response?.data[i]["gps_speedKph"]}
            //     }
            //     return dataParsed
            // }
            return {location: response.data[0]["address"], timestamp: convertEpochToDateAndTime(response.data[0]["gps_ts"]), speed: response.data[0]["gps_speedKph"]}
        } catch{
            return {location: "", timestamp: "", speed: ""}
        }
      }
    

    const searchOldFun = async () => {
        seterrorState(false)
        setloader(true)

        try {
            let token = sessionStorage.getItem("token")
            let url = `${props?.api}page=${currentPage}&pageSize=${perPageCount}`;

            let header;

            if (props?.method == 'POST') {
                header = {
                    method: props?.method,
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: props?.body ?? {}
                }
            } else {
                header = {
                    method: props?.method,
                    headers: {
                        'Accept': '*/*',
                        'Authorization': 'Bearer ' + token,
                    },
                }
            }
            const response = await fetchInterceptor(url, header);
            if (!response.ok) {
                setdataList([])
                settotalCount(0)
                throw new Error('Network response was not ok', response);
            }

            const data = await response.json();
            const devicesData = data?.result?.devicelist?.map(item=>{return {...item, iccidValidUpto:item["iccidValidUpto"].split("T")[0]}})
            console.log(devicesData, "devicesDataFull")
            const devicesDataWithLocation = []
            // const intouchIds = devicesData.map(item=>item["intuchEntityId"])
            // const instouchIdString = intouchIds.join(",")
            // const getLocation = await getCurrentLocation(instouchIdString)
            // console.log(getLocation, "getLocation24435")
            
            if(devicesData?.length > 0){
                for (let i = 0; i < devicesData.length; i++) {
                    const getLocation = await getCurrentLocation(devicesData[i]["intuchEntityId"])
                    devicesDataWithLocation.push({...devicesData[i], location: getLocation["location"], timestamp: getLocation["timestamp"], speed: getLocation["speed"]})
                }
            }

            seterrorState(false)
            setdataList(devicesDataWithLocation ?? [])
            settotalCount(data?.result?.totalrecords ?? 0)
            setlastPage(() => {
                if (data?.result?.totalrecords % perPageCount == 0) {
                    return Math.ceil(data?.result?.totalrecords / perPageCount) - 1
                } else {
                    return Math.ceil(data?.result?.totalrecords / perPageCount)
                }
            })

            if (typeof (props.getData) == 'function') {
                props.getData(data?.result)
            }
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
        setcurrentPage(prev=>prev+1)
    }

    // 👉 Function 3 👈
    const prevPageFun = () => {
        setcurrentPage(prev=>prev-1)
    }

    // 👉 Function 4 👈
    const perPageFun = (val) => {

        console.log('incoming per page: ', val)

        let checkPage = parseInt(totalCount / val)
        let checkPageRemainder = parseInt(totalCount % val)

        if (checkPageRemainder == 0) {
            setpageCount(checkPage)
            setperPageCount(val)
            return
        }

        if (checkPageRemainder != 0) {
            setpageCount(checkPage + 1)
            setperPageCount(val)
            return
        }

    }

    // 👉 Function 5 👈
    const firstPageFun = () => {
        setcurrentPage(1)
    }

    // 👉 Function 6 👈
    const lastPageFun = () => {
        setcurrentPage(lastPage)
    }

    // 👉 Calling Function 1 on Data change 👈
    useEffect(() => {

        if (props?.changeData > 0) {
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
                        heading="Activated Device Summary"
                    />
                </>

            }

        </>
    )
}

export default ListTableActivatedDeviceData