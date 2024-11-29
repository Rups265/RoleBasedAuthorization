const express = require("express");
const roleController = require("../controllers/role.controller");
const router = express.Router();
const JWT = require("../middleware/auth.middleware");
const roleBasedAccess = require("../middleware/roleBasedAccess.middleware");
const { trusted } = require("mongoose");

router.get(
  "/getAllRole",
  JWT.authkey,
  roleBasedAccess("Role", "read"),
  async (req, res) => {
    try {
      const result = await roleController.getAllRole(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/getRoleById",
  JWT.authkey,
  roleBasedAccess("Role", "read"),
  async (req, res) => {
    try {
      const result = await roleController.getRoleById(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/createRole",
  JWT.authenticateJWT,
  roleBasedAccess("Role", "create", true),
  async (req, res) => {
    try {
      const result = await roleController.createRole(req, res);
      return result;
    } catch (error) {
      console.log("Error Occured : ", error);
      throw error;
    }
  }
);

router.put(
  "/updateRole",
  JWT.authenticateJWT,
  roleBasedAccess("Role", "update", true),
  async (req, res) => {
    try {
      const result = await roleController.updateRole(req, res);
      return result;
    } catch (error) {
      console.log("Error Occured : ", error);
      throw error;
    }
  }
);

router.delete(
  "/deleteRole",
  JWT.authenticateJWT,
  roleBasedAccess("Role", "delete", true),
  async (req, res) => {
    try {
      const result = await roleController.deleteRole(req, res);
      return result;
    } catch (error) {
      console.log("Error Occured : ", error);
      throw error;
    }
  }
);

router.post(
  "/updatePermission",
  JWT.authenticateJWT,
  roleBasedAccess("Role", "update", true),
  async (req, res) => {
    try {
      const result = await roleController.updatePermission(req, res);
      return result;
    } catch (error) {
      console.log("Error Occured : ", error);
      throw error;
    }
  }
);

module.exports = router;
