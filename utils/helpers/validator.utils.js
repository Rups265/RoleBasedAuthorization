require("dotenv").config();
const CryptoJS = require("crypto-js");

function headerEncode(message) {
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(
    message,
    process.env.API_KEY
  ).toString();
  console.log(ciphertext);
  return ciphertext;
}

function validateEmail(email) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailPattern.test(email)) {
    return true;
  } else {
    return false;
  }
}

function validateMobileNumber(number) {
  const cleanNumber = number.toString().replace(/\D/g, "");
  if (cleanNumber.length === 10) {
    return /^[5-9]\d{2}[1-9]\d{6}$/.test(cleanNumber);
  }
  return false;
}

module.exports = {
  validateMobileNumber,
  validateEmail,
  headerEncode,
};
