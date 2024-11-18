
import * as XLSX from 'xlsx';


const ExcelDownloadButton = (params) => {

  // console.log(params)

  const headerData = params?.headerData
  const fileName = params?.fileName

  const handleDownload = (e) => {
    e.preventDefault();
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(headerData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelData = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
    const blob = new Blob([s2ab(excelData)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  return (
    <button onClick={handleDownload} className='common_download_button' style={{color:"white",backgroundColor:"black",padding:"5px 10px",borderRadius:"6px",alignItems:"center",cursor:"pointer"}}>
      <span>Download Format</span>
      <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5854 10.7956C7.77114 10.9815 7.99167 11.1289 8.23441 11.2295C8.47714 11.3301 8.73732 11.3819 9.00007 11.3819C9.26282 11.3819 9.523 11.3301 9.76573 11.2295C10.0085 11.1289 10.229 10.9815 10.4147 10.7956L12.5554 8.65497C12.6702 8.52803 12.7317 8.36182 12.7273 8.19074C12.723 8.01966 12.6529 7.85683 12.5318 7.73595C12.4107 7.61507 12.2477 7.5454 12.0766 7.54137C11.9055 7.53734 11.7394 7.59926 11.6127 7.7143L9.66207 9.66564L9.66674 1.66667C9.66674 1.48986 9.5965 1.32029 9.47147 1.19526C9.34645 1.07024 9.17688 1 9.00007 1C8.82326 1 8.65369 1.07024 8.52866 1.19526C8.40364 1.32029 8.3334 1.48986 8.3334 1.66667L8.3274 9.65297L6.3874 7.7143C6.26231 7.5893 6.09268 7.5191 5.91583 7.51917C5.73899 7.51923 5.56941 7.58954 5.4444 7.71463C5.3194 7.83973 5.24921 8.00936 5.24927 8.1862C5.24933 8.36305 5.31964 8.53263 5.44474 8.65763L7.5854 10.7956Z" fill="white" stroke="white" strokeWidth="0.4" />
        <path d="M16.3333 10.5237C16.1565 10.5237 15.987 10.5939 15.8619 10.7189C15.7369 10.844 15.6667 11.0135 15.6667 11.1903V13.857C15.6667 14.0338 15.5964 14.2034 15.4714 14.3284C15.3464 14.4534 15.1768 14.5237 15 14.5237H3C2.82319 14.5237 2.65362 14.4534 2.5286 14.3284C2.40357 14.2034 2.33333 14.0338 2.33333 13.857V11.1903C2.33333 11.0135 2.2631 10.844 2.13807 10.7189C2.01305 10.5939 1.84348 10.5237 1.66667 10.5237C1.48986 10.5237 1.32029 10.5939 1.19526 10.7189C1.07024 10.844 1 11.0135 1 11.1903L1 13.857C1 14.3874 1.21071 14.8961 1.58579 15.2712C1.96086 15.6463 2.46957 15.857 3 15.857H15C15.5304 15.857 16.0391 15.6463 16.4142 15.2712C16.7893 14.8961 17 14.3874 17 13.857V11.1903C17 11.0135 16.9298 10.844 16.8047 10.7189C16.6797 10.5939 16.5101 10.5237 16.3333 10.5237Z" fill="white" stroke="white" strokeWidth="0.4" />
      </svg>

    </button>
  );
};

export default ExcelDownloadButton;