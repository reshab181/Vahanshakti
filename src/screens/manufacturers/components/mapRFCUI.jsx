import React, { useState, useEffect } from "react";
import { getAllRFCs } from "../../../apis/rfcMaster";
import { mapRFCsToManufacturer } from "../../../apis/manufacture";

export const MapRFCToMNF = ({
  manfId,
  setDistributorMappingUI,
  allRFCFilteredData,
}) => {
  const [searchRFCText, setSearchRFCText] = useState(null);
  const [selectedRFC, setSelectedRFC] = useState([]);
  const [allRFC, setAllRFC] = useState(allRFCFilteredData);
  const [filteredRFC, setFilteredRFC] = useState(allRFCFilteredData);

  console.log(allRFCFilteredData, "allRFCFilteredData");
  const fetchAllRFCData = async () => {
    let result = await getAllRFCs();
    // setAllRFC(result);
    // setFilteredRFC(result);
    // setLoading(false);
  };

  useEffect(() => {
    fetchAllRFCData();
  }, []);

  const searchRFC = (e) => {
    setSearchRFCText(e.target.value);
    if (e.target.value?.length > 3) {
      let regex = new RegExp(e.target.value, "i");

      const matchedRFC = allRFC.filter(
        (item) => regex.test(item?.entityName) || regex.test(item?.entitycode)
      );
      setFilteredRFC(matchedRFC);
    } else {
        setFilteredRFC(allRFC);
      }
  };

  const mapRFCToMNF = async () => {
    console.log(selectedRFC, "selectedRFC");
    const data = JSON.stringify({
      entity_id: parseInt(manfId),
      mapping_entids: selectedRFC.map((item) => {
        return { entity_id: parseInt(item?.id) };
      }),
    });
    const response = await mapRFCsToManufacturer(data);
    if(response.status == true){
        window.location.reload();
    }
    console.log(response, "mapRFCToManufacturers");
  };

  const selectRFC = (item) => {
    setSelectedRFC((prev) => [...prev, item]);
    setFilteredRFC((prev) =>
      prev.filter((filterItem) => filterItem?.id !== item?.id)
    );
  };

  const removeRFC = (item) => {
    setSelectedRFC((prev) =>
      prev.filter((filterItem) => filterItem?.id !== item?.id)
    );
    setFilteredRFC((prev) => [...prev, item]);
  };

  return (
    <div style={{ backgroundColor: "white", margin: "10px", padding: "10px" }}>
      {selectedRFC.length > 0 && <p>Selected RFC for Mapping</p>}
      {selectedRFC.length > 0 &&
        selectedRFC.map((item) => {
          return (
            <div
              key={item.id}
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
                onClick={() => removeRFC(item)}
              >
                Remove
              </button>
            </div>
          );
        })}
      {selectedRFC.length > 0 && (
        <button
          style={{
            margin: "5px 0",
            padding: "5px 20px",
            backgroundColor: "blue",
            color: "white",
            borderColor: "blue",
            display: "block",
          }}
          onClick={mapRFCToMNF}
        >
          Save
        </button>
      )}

      <div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* <p>Search</p> */}
          <input
            placeholder="search for RFC"
            name="search"
            onChange={searchRFC}
            value={searchRFCText}
          />
          <button
            style={{
              border: "none",
              outline: "none",
              background: "none",
              backgroundColor: "red",
              color: "white",
              padding: "3px 10px",
              cursor: "pointer",
            }}
            onClick={() => setDistributorMappingUI(false)}
          >
            Cancel
          </button>
        </div>
        {filteredRFC.length > 0 ? (
          filteredRFC.map((item) => {
            return (
              <div
                key={item.id}
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
                  onClick={() => selectRFC(item)}
                >
                  Select
                </button>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{ textAlign: "center" }}>No RFC to Map</p>
          </div>
        )}
      </div>
    </div>
  );
};
