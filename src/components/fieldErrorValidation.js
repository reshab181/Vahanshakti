export const FormFieldValidation = (type, data, label) => {
    console.log(type, label, "check form validation")
    console.log(data, "formvalidationdata")
    if (data) {
        if (type === "text") {
            if (data.trim().length < 3) {
                return `${label} must be atleast 3 characters`
            }
        }
        if (type === "text_wos") {
            if (data.trim().length < 3) {
                return `${label} must be atleast 3 characters`
            }
            const withoutSpecialCharacterRegex = /^[a-zA-Z0-9]+$/;
            console.log(withoutSpecialCharacterRegex.test(data), "withoutSpecialCharacterRegex")
            if (!withoutSpecialCharacterRegex.test(data)) {
                return `${label} cannot contain special characters`
            }
        }
        if (label === "First Name" || label === "Last Name" || label === "District" || label === "State") {
            const numberRegex = /\d/;
            if (numberRegex.test(data)) {
                return `${label} cannot contain numbers`
            }
        }

        if (type === "entity_code") {
            if (data.trim().length < 3 || data.trim().length > 30) {
                return `${label} must be more than 3 characters`
            }
        }

        if (type === "model_code") {
            const modelNameRegex = /^[a-zA-Z]{1}[a-zA-Z0-9]*$/;
            if (!modelNameRegex.test(data)) {
                return 'Invalid Model Code Format'
            }
        }
        

        if (type === "entity_name") {
            if (data.trim().length < 3) {
                return `${label} must be atleast 3 characters`
            }
        }

        if (type === "password") {
            if (data.trim().length < 6) {
                return `${label} must be atleast 6 characters`
            }
        }

        
        if (type === "user_name") {
            const userNameRegex = /^[a-zA-Z]{5}[a-zA-Z0-9]*$/;
            if (!userNameRegex.test(data)) {
                return 'Invalid User Name Format'
            }
        }

        if (type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data)) {
                return 'Invalid email address'
            }
        }

        if (type === 'phone') {
            const mobileNumberRegex = /^\d{10}$/;
            if (!mobileNumberRegex.test(data)) {
                return 'Invalid Phone Number'
            }
        }

        if (type === 'mobile') {
            const mobileNumberRegex = /^\d{10}$/;
            if (!mobileNumberRegex.test(data)) {
                return 'Invalid Phone Number'
            }
        }

        if (type === 'IMEI') {
            const IMEIRegex = /^\d{15}$/;
            if (!IMEIRegex.test(data)) {
                return 'Invalid IMEI Number'
            }
        }

        if (type === 'pincode') {
            const mobileNumberRegex = /^\d{6}$/;
            if (!mobileNumberRegex.test(data)) {
                return 'Invalid Pin Code'
            }
        }


        if (type === 'gstn') {
            const gstnRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{2}[0-9A-Z]{1}$/;
            if (!gstnRegex.test(data)) {
                return 'Invalid GSTN Number'
            }
        }

        if (type === 'pan') {
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
            if (!panRegex.test(data)) {
                return 'Invalid Pan Number'
            }
        }

        if (type === 'date_lt') {
            let date_passed = new Date(data)
            let date_now = new Date()
            if (date_passed > date_now) {
                return `${label} passed has to be earlier than today`
            }
        }


        if (type === 'date_gt') {
            let date_passed = new Date(data)
            let date_now = new Date()
            if (date_passed < date_now) {
                return `${label} passed has to be later than today`
            }
        }
        if (label === 'Device IMEI') {
            const IMEIRegex = /^\d{15}$/;
            if (!IMEIRegex.test(data)) {
                return 'Invalid IMEI Number'
            }
        }
        if (label === "ICCID") {
            const ICCIDRegex = /^\d{19}$/;
            if (!ICCIDRegex.test(data)) {
                return 'ICCID must contain exactly 19 digits';
            }
        }
        if (label === "price") {
            const priceRegex = /^\d{2-5}$/;
            if (!priceRegex.test(data)) {
                return 'Please enter a valid price';
            }
        }


    } else if (data === '' || data === "") {
        return `Provide a valid ${label} `
    } else {
        return 0
    }

}