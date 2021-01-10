const e = require("express");

const PROVINCES = ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK"];

/**
 * Validates tracking numbers
 * 16 characters, digit or letters only.
 *
 * @param {string} number
 * @returns {boolean}
 */
function validateTrackingNumber(number) {
  // If no parameter provided
  if (!number) return false;

  // input prep
  number = number.trim();

  // If length is not 16, false
  if (number.length !== 16) return false;

  // Characters or numbers
  let regex = /^[a-zA-Z0-9]+$/;
  if (!number.match(regex)) return false;

  return true;
}

/**
 * Validates an email address. Returns true if valid.
 *
 * @param {string} email The email addr to be validat
 * @returns {boolean}
 */
function validateEmailAddress(email) {
  // If no parameter provided
  if (!email) return false;

  // input prep
  email = email.trim();

  let regex = /\S+@\S+\.\S+/; //string@string.string
  console.log("here");
  if (email.match(regex)) return true;
  console.log("here not");

  return false;
}

/**
 * Validates a password. Returns true if valid.
 * Returns string reason if invalid
 *
 * Must be between 8-16 characters long
 * Atleast One Uppercase, atleast one lowercase, atleast one symbol and atleast one digit
 *
 * @param {string} password The password to be validated
 * @returns {boolean|string} True if valid, reason if invalid
 */
function validatePassword(password) {
  //input prep
  password = password.trim();

  // If no parameter provided
  if (!password) {
    return false;
  }
  // Length check
  else if (password.length < 8 || password.length > 16){
    return false;
  }
  else{
    // Metrics =>
    let hasNumber = false,
    hasUpperCase = false,
    hasLowerCase = false,
    hasSymbol = false;

    // Loop through password
    for (let i = 0; i < password.length; i++) {
      let char = password.charAt(i);

      // If one number is found, set hasNumber to true
      if (char >= "0" && char <= "9") {
        hasNumber = true;
        continue;
      }

      // If one symbol is found, set hasSymbol to true
      if ("`~!@#$%^&*()_-+[{]}|\\;:<>,./?".split("").includes(char)) {
        hasSymbol = true;
        continue;
      }

      // If one uppercase char is found, set hasUpperCase to true
      if (char === char.toUpperCase()) {
        hasUpperCase = true;
        continue;
      }

      // If one lowercase char is found, set hasLowerCase to true
      if (char === char.toLowerCase()) {
        hasLowerCase = true;
        continue;
      }
    }
    // All else is true
    if(hasLowerCase && hasNumber && hasSymbol && hasUpperCase) return true;
    else return false;
  }
}

/**
 * Validates address
 *
 * City should be all letters.
 * Province code should be one of the 10 province codes in Canada.
 * Postal Code should be a valid Canadian postal code -> A9A 9A9 OR A9A9A9.
 *
 * @param {string} city The city name to be validated
 * @param {string} province The province CODE to be validated
 * @param {string} postalCode The postal code to be validated
 *
 * @returns {boolean|string} True if valid, reason if invalid
 */
function validateAddress(city, province, postalCode) {
  // Each param should be provided
  if (!city || !province || !postalCode) return false;

  // City should be letters only
  if (!city.match(/\S+/g)) return "City name should only have letters";

  // Province check in list of Canadian Provinces
  if (!PROVINCES.includes(province.toUpperCase()))
    return "Province should be a valid Canadian Province Code";

  // Postal Code check
  postalCode = postalCode.toUpperCase();

  if (!postalCode.match(/[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]/))
    return "Postal Code should be a valid Canadian postal Code";

  return true;
}

// Export all the validation functions
module.exports = {
  validateTrackingNumber,
  validateEmailAddress,
  validatePassword,
  validateAddress,
};
