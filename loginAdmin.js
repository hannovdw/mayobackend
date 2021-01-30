const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateAdminLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.adminEmail = !isEmpty(data.adminEmail) ? data.adminEmail : "";
  data.adminPassword = !isEmpty(data.adminPassword) ? data.adminPassword : "";
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
return {
    errors,
    isValid: isEmpty(errors)
  };
};