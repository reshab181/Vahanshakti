import React from 'react';

const FileUploadLoading = () => {
  return (
    <div className="file-upload-loading">
      <div className="loader"></div>
      <p style={{color:"#fc4e03"}}>Uploading...</p>
    </div>
  );
};

export default FileUploadLoading;