const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    var cellNum = "";
    let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
    
    data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : "";
    data.userPassword = !isEmpty(data.userPassword) ? data.userPassword : "";
    data.userPassword2 = !isEmpty(data.userPassword2) ? data.userPassword2 : "";
  // Email checks
    if (Validator.isEmpty(data.userEmail)) {
      errors.userEmail = "Email field is required";
    } else if (!Validator.isEmail(data.userEmail)) {
      errors.userEmail = "Email is invalid";
    }
  // Password checks
    if (Validator.isEmpty(data.userPassword)) {
      errors.userPassword = "Password field is required";
    }
  if (Validator.isEmpty(data.userPassword2)) {
      errors.userPassword2 = "Confirm password field is required";
    }
  if (!Validator.isLength(data.userPassword, { min: 6, max: 1024 })) {
      errors.userPassword = "Password must be at least 6 characters";
    }
  if (!Validator.equals(data.userPassword, data.userPassword2)) {
      errors.userPassword2 = "Passwords must match";
    }
  //if (!data.cellNum == data.match((/(?<!\d)\d{10}(?!\d)/g)))
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };


