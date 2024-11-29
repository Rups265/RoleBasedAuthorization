const log = require("../configs/logger.config.js");
const roleDao = require("../daos/role.dao.js");
const {
  removeNullUndefined,
  titleCase,
} = require("../utils/helpers/common.utils.js");

class RoleService {
  async getAllRoleService(req, res) {
    try {
      const result = await roleDao.getAllRole();
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Role get successfully",
        data: result.data,
      });
    } catch (error) {
      log.error("Error from [ROLE SERVICE]:", error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  async getRoleByIdService(req, res) {
    try {
      const { roleId } = req.body;
      if (!roleId) {
        return res.status(400).json({
          status: "fail",
          code: 400,
          message: "Invalid Request",
          data: null,
        });
      }
      const result = await roleDao.getRoleById(roleId);
      if (!result.data) {
        res.status(404).json({
          status: "fail",
          code: 404,
          message: "role not found",
          data: null,
        });
      }
      res.status(200).json({
        status: "success",
        code: 200,
        message: "role get successfully",
        data: result.data,
      });
    } catch (error) {
      log.error("Error from [Role SERVICE]:", error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  async createRoleService(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        console.log("Invalid Request, All fileds Required!");
        return res.status(400).json({
          message: "Invalid Request",
          status: "failed",
          data: null,
          code: 400,
        });
      }

      const isExist = await roleDao.getRoleByName(name);
      if (isExist.data) {
        return res.status(400).json({
          message: "role already exist",
          status: "failed",
          data: null,
          code: 201,
        });
      }
      const permission = [
        {
          module: "Blog",
        },
        {
          module: "User",
        },
        {
          module: "ReviewAndComment",
        },
        {
          module: "Role",
        },
      ];
      const data = {
        name: titleCase(name),
        permission,
      };

      const dataToUpdate = await removeNullUndefined(data);
      const result = await roleDao.createRole(dataToUpdate);

      res.status(200).json({
        status: "success",
        code: 200,
        message: "Role created successfully",
        data: result.data,
      });
    } catch (error) {
      log.error("Error from [Auth SERVICE]:", error);
      console.log("Error Occured : ", error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  async updateRoleService(req, res) {
    try {
      const { roleId, name } = req.body;

      if (!roleId) {
        console.log("Invalid Request, All fileds Required!");
        return res.status(400).json({
          message: "Invalid Request",
          status: "failed",
          data: null,
          code: 400,
        });
      }

      const isRoleExist = await roleDao.getRoleById(roleId);
      if (!isRoleExist.data) {
        return res.status(201).json({
          message: "Role not found",
          status: "failed",
          data: null,
          code: 201,
        });
      }

      const data = {
        name: titleCase(name),
      };

      const dataToUpdate = await removeNullUndefined(data);
      const result = await roleDao.updateRole(roleId, dataToUpdate);

      res.status(200).json({
        status: "success",
        code: 200,
        message: "Role updated successfully",
        data: result.data,
      });
    } catch (error) {
      log.error("Error from [Auth SERVICE]:", error);
      console.log("Error Occured : ", error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  async deleteRoleService(req, res) {
    try {
      const { roleId } = req.body;

      if (!roleId) {
        console.log("Invalid Request, All fileds Required!");
        return res.status(400).json({
          message: "Invalid Request",
          status: "failed",
          data: null,
          code: 400,
        });
      }

      const isExist = await roleDao.getRoleById(roleId);
      if (!isExist.data) {
        return res.status(400).json({
          status: "fail",
          code: 201,
          message: "role not found",
        });
      }

      const result = await roleDao.deleteRole(roleId);
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Role delete successfully",
      });
    } catch (error) {
      log.error("Error from [Auth SERVICE]:", error);
      console.log("Error Occured : ", error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  //updatePermissionService
  async updatePermissionService(req, res) {
    try {
      const { roleId, module, permission, value } = req.body;

      if (!roleId || !module || !permission || value === undefined) {
        console.log("Invalid Request, All fileds Required!");
        return res.status(400).json({
          message: "Invalid Request",
          status: "failed",
          data: null,
          code: 400,
        });
      }

      const isExist = await roleDao.getRoleById(roleId);
      if (!isExist.data) {
        return res.status(400).json({
          status: "fail",
          code: 201,
          message: "role not found",
        });
      }

      const allowedPermissions = ["create", "read", "update", "delete"];
      const allowedValues = ["active", "inactive"];

      if (!allowedPermissions.includes(permission)) {
        return res.status(400).json({
          status: "fail",
          code: 400,
          message: "Permission must be one of create, read, update, delete",
          data: null,
        });
      }

      if (!allowedValues.includes(value)) {
        return res.status(400).json({
          status: "fail",
          code: 400,
          message: "Value must be either active or inactive",
          data: null,
        });
      }

      const updatedPermissions = isExist.data.permission.map((perm) => {
        if (perm.module === module) {
          perm[permission] = value === "active";
        }
        return perm;
      });

      const updatedRole = await roleDao.updateRole(roleId, {
        permission: updatedPermissions,
      });

      if (updatedRole.data) {
        return res.status(200).json({
          status: "success",
          code: 200,
          message: "Permission Updated successfully",
          data: updatedRole.data,
        });
      }
    } catch (error) {
      log.error("Error from [Auth SERVICE]:", error);
      console.log("Error Occured : ", error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }
}
module.exports = new RoleService();
