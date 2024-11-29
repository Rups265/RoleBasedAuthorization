async function sanitizedUserData(userData) {
  console.log("dsfffffaa",userData);
  const sanitizedData = { ...userData._doc };
  delete sanitizedData.password;
  delete sanitizedData._id;
  delete sanitizedData.__v;
  console.log("sdafffffffffffffffffffffff",sanitizedData)
  return sanitizedData;
}

module.exports = {
  sanitizedUserData,
};
