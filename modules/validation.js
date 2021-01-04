/**
 * Validates tracking numbers
 * 16 characters, digit or letters only.
 *
 * @param {string} number
 * @returns {boolean}
 */
function validateTrackingNumber(number) {
  // input prep
  number = number.trim();

  // If length is not 16, false
  if (number.length !== 16) return false;

  // Characters or numbers
  let regex = /^[a-zA-Z0-9]+$/;
  if (!number.match(regex)) return false;

  return true;
}

module.exports = {
  validateTrackingNumber,
};
