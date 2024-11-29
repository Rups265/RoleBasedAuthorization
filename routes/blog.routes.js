const express = require("express");
const router = express.Router();
const JWT = require("../middleware/auth.middleware");
const blogControllers = require("../controllers/blog.controller");
const log = require("../configs/logger.config");
const uploadBlogImages = require("../utils/helpers/imageUpload.utils");
const roleBasedAccess = require("../middleware/roleBasedAccess.middleware");

router
  .route("/addBlog")
  .post(
    uploadBlogImages.single("image"),
    JWT.authenticateJWT,
    roleBasedAccess("Blog", "create", true),
    async (req, res) => {
      try {
        const result = await blogControllers.addBlog(req, res);
        return result;
      } catch (error) {
        log.error("Internal Server Error : ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

router
  .route("/getUsersAllBlog")
  .get(
    JWT.authenticateJWT,
    roleBasedAccess("Blog", "read", true),
    async (req, res) => {
      try {
        const result = await blogControllers.getUsersAllBlog(req, res);
        return result;
      } catch (error) {
        log.error("Internal Server Error : ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

router
  .route("/updateBlogById")
  .put(
    JWT.authenticateJWT,
    roleBasedAccess("Blog", "update", true),
    uploadBlogImages.single("image"),
    async (req, res) => {
      try {
        const result = await blogControllers.updateBlogById(req, res);
        return result;
      } catch (error) {
        log.error("Internal Server Error : ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

router
  .route("/getBlogById")
  .get(JWT.authkey, roleBasedAccess("Blog", "read"), async (req, res) => {
    try {
      const result = await blogControllers.getBlogById(req, res);
      return result;
    } catch (error) {
      log.error("Internal Server Error : ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

router
  .route("/removeBlog")
  .delete(
    JWT.authenticateJWT,
    roleBasedAccess("Blog", "delete", true),
    async (req, res) => {
      try {
        const result = await blogControllers.removeBlog(req, res);
        return result;
      } catch (error) {
        log.error("Internal Server Error : ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

module.exports = router;
