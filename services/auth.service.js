const log = require("../configs/logger.config");
const roleDao = require("../daos/role.dao");
const userDao = require("../daos/user.dao");
const { hashItem, compareItems } = require("../utils/helpers/bcrypt.utils");
const {
  removeNullUndefined,
  titleCase,
} = require("../utils/helpers/common.utils");
const { sanitizedUserData } = require("../utils/helpers/sanitize.util");
const { createToken } = require("../utils/helpers/token.utils");
const {
  validateEmail,
  validateMobileNumber,
} = require("../utils/helpers/validator.utils");
class AuthService {
  async registerService(req, res) {
    try {
      const { firstName, lastName, email, password, phoneNumber, type} =
        req.body;

      if (!firstName) {
        return res.status(400).json({
          message: "please enter firstName",
          status: "fail",
          code: 400,
          data: null,
        });
      }
      if (!lastName) {
        return res.status(400).json({
          message: "please enter lastName",
          status: "fail",
          code: 400,
          data: null,
        });
      }
      if (!email) {
        return res.status(400).json({
          message: "please enter email",
          status: "fail",
          code: 400,
          data: null,
        });
      }
      if (!phoneNumber) {
        return res.status(400).json({
          message: "please enter phoneNumber",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      if (!password) {
        return res.status(400).json({
          message: "please enter password",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      if (!type) {
        return res.status(400).json({
          message: "please enter password",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const isExistRole = await roleDao.getRoleByName(titleCase(type));
      let roleId;
       if(!isExistRole.data){
        roleId=null;
       }else{
        roleId=isExistRole.data.roleId;
       }
      if (!validateEmail(email)) {
        return res.status(400).json({
          message: "please enter valid email",
          code: 400,
          status: "fail",
        });
      }

      if (!validateMobileNumber(phoneNumber)) {
        return res.status(400).json({
          message: "please enter valid phoneNumber",
          status: "fail",
          code: 400,
        });
      }

      const isExist = await userDao.getUserByEmail(email);
      if (isExist.data) {
        return res.status(400).json({
          message: "email already exist",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const isExistNumber = await userDao.getUserByContact(phoneNumber);
      if (isExistNumber.data) {
        return res.status(400).json({
          message: "phone number already exist",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const data = {
        firstName: titleCase(firstName),
        lastName: titleCase(lastName),
        email: email.toLowerCase(),
        contact: phoneNumber,
        password: await hashItem(password),
        type: type,
        roleId,
      };

      const updatedData = removeNullUndefined(data);
      const userData = await userDao.createUser(updatedData);
      const userType = isUserExist.data.type;
      const token = await createToken(isUserExist.data.userId, userType);
      const result = await sanitizedUserData(userData.data);
      if (result) {
        return res.status(200).json({
          message: "user registered successfully",
          status: "success",
          code: 200,
          data: result,
          token: token,
        });
      }
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }

  async loginService(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "please enter email",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      if (!password) {
        return res.status(400).json({
          message: "please enter email",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      if (!validateEmail(email)) {
        return res.status(201).json({
          message: "please enter valid email",
          code: 400,
          status: "fail",
        });
      }

      const isUserExist = await userDao.getUserByEmail(email);
      if (!isUserExist.data) {
        return res.status(400).json({
          message: "email or password not exist",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      let storedPassword = isUserExist.data.password;
      let compare = await compareItems(password.trim(), storedPassword);
      if (!compare) {
        return res.status(400).json({
          message: "please inter correct password",
          status: "fail",
          data: null,
          code: 400,
        });
      }

      req.session.user = {
        username: `${isUserExist.data.firstName} ${isUserExist.data.lastName}`,
        _id: isUserExist.data.userId,
      };

      const userType = isUserExist.data.type;
      const token = await createToken(isUserExist.data.userId, userType);

      return res.status(200).json({
        message: "login successfully",
        status: "success",
        code: 200,
        data: await sanitizedUserData(isUserExist.data),
        token,
      });
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }

  async logOutService(req, res) {
    try {
      if (req.session && req.session.user) {
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({
              message: "Failed to log out, please try again.",
              status: "fail",
              code: 500,
              data: null,
            });
          }

          res.clearCookie("connect.sid", { path: "/" });

          return res.status(200).json({
            message: "Logged out successfully.",
            status: "success",
            code: 200,
            data: null,
          });
        });
      } else {
        return res.status(400).json({
          message: "No active session found",
          status: "fail",
          code: 400,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }
}
module.exports = new AuthService();
