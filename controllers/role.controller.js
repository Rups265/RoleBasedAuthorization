
const roleService = require("../services/role.service");

class RoleController {
  async getAllRole(req, res) {
    try {
      const result = await roleService.getAllRoleService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getRoleById(req, res) {
    try {
      const result = await roleService.getRoleByIdService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async createRole(req, res) {
    try {
      const result = await roleService.createRoleService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateRole(req, res) {
    try {
      const result = await roleService.updateRoleService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteRole(req, res) {
    try {
      const result = await roleService.deleteRoleService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  //updatePermission
  async updatePermission(req, res) {
    try {
      const result = await roleService.updatePermissionService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
}


module.exports = new RoleController();
