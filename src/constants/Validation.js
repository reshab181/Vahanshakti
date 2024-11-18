export const validateUsername = (username) => {
    const errors = [];
  
    if (!username) {
      errors.push("Username cannot be empty");
    }

    if (username && username.length < 3) {
      errors.push("Username must be at least 3 characters long");
    }
  
    
    return errors.length > 0 ? errors : null;
  }
  
  export const validatePhoneNumber = (phoneNumber) => {
    const errors = [];
  
    if (!phoneNumber) {
      errors.push("Phone number cannot be empty");
    }
  
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      errors.push("Phone number must be 10 digits long");
    }
  
    return errors.length > 0 ? errors : null;
  }
  
  export const validatePassword = (password) => {
    const errors = [];
    if (!password) {
      errors.push("Password cannot be empty");
    }
    else if (password && password.length < 4) {
      errors.push("Password must be at least 6 characters long");
    }
    else if (password && password.length > 20) {
      errors.push("Password cannot be longer than 20 characters");
    }
    // else if (!/(?=.*[A-Z])/.test(password)) {
    //   errors.push("Password must contain at least one uppercase letter");
    // }
    // else if (!/(?=.*[a-z])/.test(password)) {
    //   errors.push("Password must contain at least one lowercase letter");
    // }
    // else if (!/(?=.*[0-9])/.test(password)) {
    //   errors.push("Password must contain at least one number");
    // }
  
    return errors.length > 0 ? errors : null;
  }
  
  // Email validation function
export function validateEmail(email) {
  // Email regular expression pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return 'Email is required';
  }
  if (!emailPattern.test(email)) {
    return 'Invalid email address';
  }
  return null;
}

// Phone number validation function
export function validatePhone(phone) {
  // Phone number regular expression pattern
  const phonePattern = /^\d{10}$/;
  
  if (!phone) {
    return 'Phone number is required';
  }
  if (!phonePattern.test(phone)) {
    return 'Invalid phone number';
  }
  return null;
}

// Pin Code validation function
export function validatePIN(pin) {
  if (typeof pin !== 'string') {
    return false;
  }
  // // PIN should be 6 digits
  // if (!/^\d{5}$/.test(pin)) {
  //   return false;
  // }
  let regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
  if( regex.test(pin))
    return false;
  else
    return true
}

import { useState } from 'react';

const useFormValidation = (initialData, validationRules) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    // Clear the error for the current field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));

    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const validateForm = () => {
    let hasErrors = false;
    const newErrors = {};

    for (const fieldName in validationRules) {
      const value = data[fieldName];
      const rules = validationRules[fieldName];
      const isValueString = typeof value === 'string';

      if (rules.required && (!value || (isValueString && value.trim() === ""))) {
        newErrors[fieldName] = "Field is required";
        hasErrors = true;
      } else if (rules.minLength && value.length < rules.minLength) {
        newErrors[fieldName] = `Minimum ${rules.minLength} characters required`;
        hasErrors = true;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        newErrors[fieldName] = `Maximum ${rules.maxLength} characters allowed`;
        hasErrors = true;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[fieldName] = "Invalid input";
        hasErrors = true;
      } else {
        // Clear the error message for the field if it is valid
        newErrors[fieldName] = "";
      }
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  return {
    data,
    errors,
    setErrors,
    onChange,
    validateForm,
  };
};

export default useFormValidation;