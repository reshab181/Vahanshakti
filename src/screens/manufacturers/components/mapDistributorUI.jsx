import React, { useState, useEffect } from "react";
import { getAllDistributor } from "../../../apis/distributor";
import { mapDistributorsToManufacturers } from "../../../apis/manufacture";

export const MapDistributorToMNF = ({ manfId,setDistributorMappingUI,allDistributorFilteredData }) => {
  const [searchDstText, setSearchDstText] = useState(null);
  const [selectedDistributors, setSelectedDistributors] = useState([]);
  const [allDistributors, setAllDistributors] = useState(allDistributorFilteredData);
  const [filteredDistributors, setFilteredDistributors] = useState(allDistributorFilteredData);
  console.log(allDistributorFilteredData);

  const searchDistributors = (e) => {
    setSearchDstText(e.target.value);
    if (e.target.value.length > 0) {
      let regex = new RegExp(e.target.value, "i");

      const matchedDistributors = allDistributors.filter(
        (item) => regex.test(item?.entityName) || regex.test(item?.entitycode)
      );
      setFilteredDistributors(matchedDistributors);
    } else {
      setFilteredDistributors(allDistributors);
    }
  };

  const mapDistributorsToMNF = async () => {
    console.log(selectedDistributors, "selectedDistributors");
    const data = JSON.stringify({
      entity_id: parseInt(manfId),
      mapping_entids: selectedDistributors.map((item) => {
        return { entity_id: parseInt(item?.id) };
      }),
    });
    const response = await mapDistributorsToManufacturers(data);
    if(response.status == true){
        window.location.reload();
    }
    console.log(response, "mapDistributorsToManufacturers");
  };

  const selectDistributor = (item) => {
    setSelectedDistributors((prev) => [...prev, item]);
    setFilteredDistributors((prev) =>
      prev.filter((filterItem) => filterItem?.id !== item?.id)
    );
  };

  const removeDistributor = (item) => {
    setSelectedDistributors((prev) =>
      prev.filter((filterItem) => filterItem?.id !== item?.id)
    );
    setFilteredDistributors((prev) => [...prev, item]);
    
  };

  console.log(filteredDistributors);
  return (
    <div style={{ backgroundColor: "white", margin: "10px", padding: "10px" }}>
      {selectedDistributors.length > 0 && (
        <p>Selected Distributors</p>
      )}
      {selectedDistributors.length > 0 &&
        selectedDistributors.map((item) => {
          return (
            <div key={item}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 3fr 1fr",
                margin: "5px",
                padding: "5px 3px",
                gap: "4px",
                backgroundColor: "#DEEFF5",
                borderRadius: "3px",
              }}
            >
              <p>{item?.entitycode}</p>
              <p>{item?.entityName}</p>
              <p>{item?.address}</p>
              <button
                style={{ maxWidth: "80px" }}
                onClick={(e) => removeDistributor(item)}
              >
                Remove
              </button>
            </div>
          );
        })}
      {selectedDistributors.length > 0 && (
        <button
          style={{
            margin: "5px 0",
            padding: "5px 20px",
            backgroundColor: "blue",
            color: "white",
            borderColor: "blue",
            display: "block",
          }}
          onClick={() => mapDistributorsToMNF()}
        >
          Save
        </button>
      )}

    <div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* <p>Search</p> */}
          <input
            placeholder="search for distributor"
            name="search"
            onChange={(e) => searchDistributors(e)}
            value={searchDstText}
          />
          <button style={{border:"none",outline:"none",background:"none", backgroundColor:"red",color:"white",padding:"3px 10px",cursor:"pointer"}} onClick={()=>setDistributorMappingUI(false)}>cancel</button>
        </div>

        {filteredDistributors.length > 0 ? (
            <>
            <div>
                {
                    filteredDistributors.map((item) => {
                    return (
                    <>
                        <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 2fr 3fr 1fr",
                            margin: "5px",
                            padding: "5px 3px",
                            gap: "4px",
                            border: "solid 2px #DEEFF5",
                            borderRadius: "3px",
                        }}
                        >
                        <p style={{ textAlign: "left" }}>{item?.entitycode}</p>
                        <p style={{ textAlign: "left" }}>{item?.entityName}</p>
                        <p style={{ textAlign: "left" }}>{item?.address}</p>
                        <button
                            style={{ maxWidth: "80px" }}
                            onClick={(e) => selectDistributor(item)}
                        >
                            Select
                        </button>
                        </div>
                    </>
                    );
                    }) 
                }
            </div>
            </>
        ) : (
        <div>
            {/* <button style={{border:"none",outline:"none",background:"none", backgroundColor:"red",color:"white",padding:"3px 10px",cursor:"pointer"}} onClick={()=>setDistributorMappingUI(false)}>cancel</button> */}
            <p style={{textAlign:"center"}}>No Distributor to Map</p>
        </div>
        )}
        </div>
    </div>
  );
};



