const { container } = require("googleapis/build/src/apis/container");

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
  if (email.match(regex)) return true;

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
  // If no parameter provided
  if (!password) return false;

  //input prep
  password = password.trim();

  // Length check
  if (password.length < 8 || password.length > 16)
    return "Password length should be between 8 and 16";

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

  // Return corresponding messages
  if (!hasNumber) return "Password should have at least one digit";
  if (!hasUpperCase)
    return "Password should have at least one uppercase letter";
  if (!hasLowerCase)
    return "Password should have at least one lowercase letter";
  if (!hasSymbol) return "Password should have at least one symbol";

  // All else is true
  return true;
}

// Export all the validation functions
module.exports = {
  validateTrackingNumber,
  validateEmailAddress,
  validatePassword,
};
