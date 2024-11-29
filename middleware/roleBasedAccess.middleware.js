const userModel = require("../models/user.model");
const roleModel = require("../models/role.model");
const userDao = require("../daos/user.dao");
const roleDao = require("../daos/role.dao");
const roleBasedAccess = (
  module,
  action,
  isAuthenticationRequired = false,
  allowedRoles = []
) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;

      if (!isAuthenticationRequired) {
        return next();
      }

      if (!userId) {
        return res.status(401).json({
          message: "You are not authenticated",
          status: "fail",
          data: null,
          code: 401,
        });
      }

      const userDetails = await userDao.findRoleByUserId(userId);

      if (!userDetails.data || !userDetails.data.roleId) {
        return res.status(403).json({
          message: "User not have valid Role",
          status: "fail",
          data: null,
          code: 401,
        });
      }

      const roleId = userDetails.data.roleId;
      const roleResult = await roleDao.getRoleById(roleId);
      if (!roleResult.data) {
        return res.status(404).json({
          message: "Role not found",
          status: "fail",
          data: null,
          code: 404,
        });
      }
      const modulePermissions = roleResult.data.permission.find(
        (perm) => perm.module === module
      );

      if (!modulePermissions) {
        return res.status(403).json({
          message: `access Denied`,
          status: "fail",
          data: null,
          code: 403,
        });
      }

      if (modulePermissions[action] === true) {
        if (
          allowedRoles.length > 0 &&
          !allowedRoles.includes(roleResult.data.name)
        ) {
          return res.status(403).json({
            message: "You do not have permission to perform this action",
            status: "fail",
            data: null,
            code: 403,
          });
        }
        return next();
      } else {
        return res.status(403).json({
          message: "access denied",
          status: "fail",
          data: null,
          code: 403,
        });
      }
    } catch (error) {
      console.error("Error checking role-based access:", error);
      return res.status(500).json({
        message: "Server error",
        status: "fail",
        data: null,
        code: 500,
      });
    }
  };
};

module.exports = roleBasedAccess;
