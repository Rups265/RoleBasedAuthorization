const express = require("express");
const router = express.Router();
const JWT = require("../middleware/auth.middleware");
const reviewAndCommentControllers = require("../controllers/reviewAndComment.controller");
const log = require("../configs/logger.config");
const roleBasedAccess = require("../middleware/roleBasedAccess.middleware");

router
  .route("/addReviewByBlogId")
  .post(
    JWT.authenticateJWT,
    roleBasedAccess("ReviewAndComment", "create",true),
    async (req, res) => {
      try {
        const result = await reviewAndCommentControllers.addReviewByBlogId(
          req,
          res
        );
        return result;
      } catch (error) {
        log.error("Internal Server Error : ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

router
  .route("/getReviewByBlogId")
  .get(
    JWT.authkey,
    roleBasedAccess("ReviewAndComment", "read"),
    async (req, res) => {
      try {
        const result = await reviewAndCommentControllers.getReviewByBlogId(
          req,
          res
        );
        return result;
      } catch (error) {
        log.error("Internal Server Error : ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

module.exports = router;
