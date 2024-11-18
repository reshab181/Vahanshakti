import React, { useEffect, useState } from 'react';
import { getAllStates, getAllCitiesForState } from "../../apis/masters";
import { useNavigate } from 'react-router-dom';
import ListTable from "../../components/Common/Listtable/ListTable";
import { BiDetail } from "react-icons/bi";
import { LoadingWidget } from "../../components/loading";
import { useLocation } from 'react-router-dom';

export const ViewStateCityMaster = () => {

    const [statesList, setStatesList] = useState([]);
    const [citiesOfSelectedState, setCitiesOfSelectedState] = useState([]);

    useEffect(() => {        
        const fetchData = async () => {
            const result = await getAllStates();
            console.log(result, "getAllStates");
            setStatesList(result);
            await getCitiesforState(27);
        };        
        fetchData();
    }, []);


    const getCitiesforState = async (statecode) => {
        const result = await getAllCitiesForState(statecode);
        console.log(result, "getAllCities");
        setCitiesOfSelectedState(result);
    };
    
    return (
        <>
            <div className="table-header-section">
                <p className="table-listp">States List</p>
                <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", backgroundColor:"white", margin:"2px auto", maxWidth:"800px", gap:"3px"}}>
                    <div style={{padding:"2px"}}>
                        <h4>States</h4>
                        {statesList.map(item => {
                            return (
                                <p 
                                    key={item?.stateCode}  // Add key prop here
                                    style={{margin:"2px 2px", padding:"2px 3px", border:"1px solid grey"}} 
                                    onClick={() => getCitiesforState(item?.stateCode)}
                                >
                                    {item?.stateName}
                                </p>
                            );
                        })}
                    </div>
                    <div style={{padding:"2px"}}>
                        <h4>Cities</h4>
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                            {citiesOfSelectedState.map(item => {
                                return (
                                    <p 
                                        key={item?.cityCode}  // Add key prop here
                                        style={{margin:"3px 3px", padding:"4px 4px", border:"1px solid grey"}}
                                    >
                                        {item?.cityName}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
