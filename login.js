const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : "";
  data.userPassword = !isEmpty(data.userPassword) ? data.userPassword : "";
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
return {
    errors,
    isValid: isEmpty(errors)
  };
};