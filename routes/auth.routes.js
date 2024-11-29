const express = require("express");
const router = express.Router();
const JWT = require("../middleware/auth.middleware");
const authControllers = require("../controllers/auth.controller");
const log = require("../configs/logger.config");

router.route("/register").post(JWT.authkey, async (req, res) => {
  try {
    const result = await authControllers.register(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/login").post(JWT.authkey, async (req, res) => {
  try {
    const result = await authControllers.login(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/logOut").get(JWT.authenticateJWT, async (req, res) => {
  try {
    const result = await authControllers.logOut(req, res);
    return result;
  } catch (error) {
    log.error("Internal Server Error : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
