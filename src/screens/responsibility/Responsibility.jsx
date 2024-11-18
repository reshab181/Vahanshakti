import React, { useState } from 'react';
import './responsibility.css'

const Responsibility = () => {
  const [selectedOption, setSelectedOption] = useState("RTO");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div>
        <select value={selectedOption} onChange={handleSelectChange}>
        <option value="RTO">RTO</option>
          <option value="POLICE">Police</option>
          <option value="DST">Distributor</option>
          <option value="MNF">Manufacture</option>
          <option value="SBU">SBU</option>
        </select>
      </div>
      <div>
        {selectedOption === "RTO" && (
          <div>
            <h2>RTO Tab</h2>
          </div>
        )}
        {selectedOption === "POLICE" && (
          <div>
            <h2>Police Tab</h2>
          </div>
        )}
        {selectedOption === "DST" && (
          <div>
            <h2>DST Tab</h2>
          </div>
        )}
        {selectedOption === "MNF" && (
          <div>
            <h2>MNF Tab</h2>
          </div>
        )} 
        {selectedOption === "SBU" && (
          <div>
            <h2>SBU Tab</h2> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Responsibility;