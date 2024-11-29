const CryptoJS = require("crypto-js");

const removeNullUndefined = (obj) => {
  for (let prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete obj[prop];
    }
  }
  return obj;
};

const titleCase = (string) => {
  const temp = string.trim().split(" ");
  const result = temp.map((ele) => {
    return ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase();
  });
  return result.join(" ");
};



function headerDecode(message) {
  // Decrypt
  var bytes = CryptoJS.AES.decrypt(message, process.env.API_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(originalText);
  return originalText;
}

module.exports = {
  removeNullUndefined,
  titleCase,
  headerDecode,
};
