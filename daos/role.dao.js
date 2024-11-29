const Role = require("../models/role.model");
const log = require("../configs/logger.config");
const getNextSequenceValue = require("../utils/helpers/counter.utils");

class RoleDao {
  async getAllRole() {
    try {
      const role = await Role.find({ status: true }).sort({ _id: -1 });
      return {
        message: "Role found",
        status: "success",
        data: role,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [ROLE DAO]: ", error);
      throw error;
    }
  }
  async getRoleById(roleId) {
    try {
      const role = await Role.findOne({ roleId });

      if (role) {
        return {
          message: "role found",
          status: "success",
          data: role,
          code: 200,
        };
      } else {
        return {
          message: "role not found",
          status: "fail",
          data: null,
          code: 201,
        };
      }
    } catch (error) {
      log.error("Error from [ROLE DAO]: ", error);
      throw error;
    }
  }

  async getRoleByName(name) {
    try {
      const role = await Role.findOne({ name });
      return {
        message: "Role found",
        status: "success",
        data: role,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [POST DAO]: ", error);
      throw error;
    }
  }

  async createRole(data) {
    try {
      data.roleId = `Role_${await getNextSequenceValue("Role")}`;
      const role = new Role(data);
      const result = await role.save();
      if (!result) {
        throw new Error("Role creation error");
      }

      log.info("role created successfully");
      return {
        message: "role created successfully",
        status: "success",
        data: result,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [role DAO]: ", error);
      throw error;
    }
  }

  async getRoleByTitle(projectId, dataToUpdate) {
    try {
      const result = await Role.findOneAndUpdate(
        {
          projectId,
        },
        dataToUpdate,
        { new: true }
      );
      if (!result) {
        throw new Error("Project updation error");
      }

      return {
        message: "Project updated successfully",
        status: "success",
        data: result,
        code: 200,
      };
    } catch (error) {
      console.error("Error from [POST DAO]: ", error);
      throw error;
    }
  }

  async updateRole(roleId, dataToUpdate) {
    try {
      const result = await Role.findOneAndUpdate(
        {
          roleId,
        },
        dataToUpdate,
        { new: true }
      );
      if (!result) {
        throw new Error("Role updation error");
      }

      return {
        message: "Role updated successfully",
        status: "success",
        data: result,
        code: 200,
      };
    } catch (error) {
      console.error("Error from [POST DAO]: ", error);
      throw error;
    }
  }
  //deleteRole
  async deleteRole(roleId) {
    try {
      const result = await Role.findOneAndDelete({ roleId });
      if (!result) {
        throw new Error("Role delete error");
      }

      return {
        message: "Role deleted successfully",
        status: "success",
        data: result,
        code: 200,
      };
    } catch (error) {
      console.error("Error from [POST DAO]: ", error);
      throw error;
    }
  }
}

module.exports = new RoleDao();
