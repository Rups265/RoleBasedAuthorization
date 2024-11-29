const express = require("express");
const router = express.Router();
const JWT = require("../middleware/auth.middleware");
const moderatorControllers = require("../controllers/moderator.controller");
const log = require("../configs/logger.config");
const roleBasedAccess = require("../middleware/roleBasedAccess.middleware");

router
  .route("/changeBlogStatus")
  .post(
    JWT.authenticateJWT,
    roleBasedAccess("Blog", "update",true),
    async (req, res) => {
      try {
        const result = await moderatorControllers.changeBlogStatus(req, res);
        return result;
      } catch (error) {
        log.error("Internal Server Error : ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

module.exports = router;
