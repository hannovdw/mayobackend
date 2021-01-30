const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateAdminRegisterInput(data) {
    let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
    
    data.adminEmail = !isEmpty(data.adminEmail) ? data.adminEmail : "";
    data.adminPassword = !isEmpty(data.adminPassword) ? data.adminPassword : "";
    data.adminPassword2 = !isEmpty(data.adminPassword2) ? data.adminPassword2 : "";
  // Email checks
    if (Validator.isEmpty(data.adminEmail)) {
      errors.adminEmail = "Email field is required";
    } else if (!Validator.isEmail(data.adminEmail)) {
      errors.adminEmail = "Email is invalid";
    }
  // Password checks
    if (Validator.isEmpty(data.adminPassword)) {
      errors.adminPassword = "Password field is required";
    }
  if (Validator.isEmpty(data.adminPassword2)) {
      errors.adminPassword2 = "Confirm password field is required";
    }
  if (!Validator.isLength(data.adminPassword, { min: 6, max: 1024 })) {
      errors.adminPassword = "Password must be at least 6 characters";
    }
  if (!Validator.equals(data.adminPassword, data.adminPassword2)) {
      errors.adminPassword2 = "Passwords must match";
    }
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };
