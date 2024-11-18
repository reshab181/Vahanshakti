import Swal from "sweetalert2"

export const getBeforeminutesAgoEpoch = (min) => {
    const currentDate = new Date();
    const minutesAgoEpoch = currentDate.getTime() - parseInt(min) * 60 * 1000;
    return Math.floor(minutesAgoEpoch / 1000);
};

// Epoch of current date time
export const getCurrentDateEpoch = () => {
    const currentDate = new Date();
    const epochTimeInSeconds = Math.floor(currentDate.getTime() / 1000);
    return epochTimeInSeconds;
};


// Epoch to Date and time Stamp
export const convertEpochToDateAndTime = (epochTimestamp) => {
    console.log(epochTimestamp, "epochTimestamp")
    const date = new Date(epochTimestamp * 1000);
    const dateString = date.toLocaleString();
    return dateString;
}


//function to get current date
export const getCurrentDate = () => {
    let cDate = new Date()
    let year = cDate.getFullYear()
    let month = String(cDate.getMonth() + 1)
    let day = String(cDate.getDate())

    { month.length < 2 && (month = `0${month}`) }
    { day.length < 2 && (day = `0${day}`) }

    let fullDate = `${year}-${month}-${day}`
    return fullDate
}

export const getBeforeDate = (daysDifference) => {
    // Create a new Date object for the current date
  const currentDate = new Date();

  // Subtract the specified number of days from the current date
  const earlierDate = new Date(currentDate);
  earlierDate.setDate(currentDate.getDate() - daysDifference);

  // Get the year, month, and day parts of the earlier date
  const year = earlierDate.getFullYear();
  const month = String(earlierDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
  const day = String(earlierDate.getDate()).padStart(2, '0');

  // Format the date in the specific format (YYYY-MM-DD)
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export const returnCapitalize = (currentValue) => {
    let capitalizeValue = currentValue.toUpperCase()
    return capitalizeValue
}


export const nullToNA = (value) => {

    if (value === undefined || value === null || typeof value === "undefined" || value === "") {
        return "NA";
    } else if (value === true) {
        return 'Yes';
    } else if (value === false) {
        return 'No'
    } else {
        return value
    }

}

export const indianDate = (value) => {

    if (value === undefined || value === null || typeof value === "undefined" || value === "") {
        return "NA";
    } else if (value === true) {
        return 'Yes';
    } else if (value === false) {
        return 'No'
    } else {

        const date = new Date(value);
        let formattedDate;

        const hasTime = value.includes(':');
        const isEncoded = value.includes('T')

        // console.log('date is => ', value)

        if (!isEncoded) {
            const dateTimeParts = value.split(' ');
            const dateParts = dateTimeParts[0].split('-');
            const timeParts = hasTime ? dateTimeParts[1].split(':') : [];

            const day = dateParts[2];
            const month = dateParts[1];
            const year = dateParts[0];


            if (hasTime) {
                const hours = timeParts[0];
                const minutes = timeParts[1];
                const seconds = timeParts[2];

                if (year?.length > 2) {
                    formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
                    // console.log("date is formatted 1=> ", value,isEncoded, isNaN(date), hasTime, formattedDate)
                    return formattedDate
                } else {
                    formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
                    // console.log("date is formatted 2=> ", value,isEncoded, isNaN(date), hasTime, formattedDate)
                    return formattedDate
                }

            } else {

                if (year?.length > 2) {
                    formattedDate = `${day}-${month}-${year}`;
                    // console.log("date is formatted 3=> ", value, isEncoded, isNaN(date), hasTime, formattedDate)
                    return formattedDate
                } else {
                    formattedDate = `${year}-${month}-${day}`;
                    // console.log("date is formatted 4=> ", value, isEncoded, isNaN(date), hasTime, formattedDate)
                    return formattedDate
                }
            }

        } else {

            const dateParts = value.split('T');
            const date = dateParts[0];
            // const time = dateParts[1].split('.')[0];

            const year = date.substring(0, 4);
            const month = date.substring(5, 7);
            const day = date.substring(8, 10);

            const formattedDate = `${day}-${month}-${year}`;

            // console.log("date is formatted 5=> ", year.length, value,isEncoded, isNaN(date), hasTime, formattedDate)
            return formattedDate;
        }


    }

}


const matchFiles = (fileType, typeDocument)=>{
    switch (typeDocument?.toLowerCase()) {
        case 'image': {
            if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
                return true;
            } else {
                return false;
            }
        } break;

        case 'pdf': {
            if (fileType === 'pdf') {
                return true;
            } else {
                
                return false;
            }
        } break;

        case 'excel': {
            if (fileType === 'xlsx' || fileType === 'xls') {
                return true;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: 'Must be excel format (.xlsx/.xls)'
                })
                return false;
            }
        } break;

        default: {
            return true;
        }
    }

}

export const checkFile = (file, type) => {

    let fileType = file?.name.split('.').pop();
    let size = file?.size / (1024 * 1024)

    if (size > 5) {
        Swal.fire({
            icon: 'error',
            title: '',
            text: 'File must be less than 5Mb'
        })
        return false;
    }

    if(Array.isArray(type)){
        for(let item of type){
            if(matchFiles(fileType, item)){
                return true
            } 
        }
    } else {
        return matchFiles(fileType, type)
    } 
}

