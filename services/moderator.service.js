const log = require("../configs/logger.config");
const blogDao = require("../daos/blog.dao");

const {
  removeNullUndefined,
  titleCase,
} = require("../utils/helpers/common.utils");
const userDao = require("../daos/user.dao");
class ModeratorService {
  async updateBlogByIdService(req, res) {
    try {
      const { blogId, title, content, summary, category, tags, status } =
        req.body;

      if (
        !blogId ||
        !title ||
        !content ||
        !summary ||
        !category ||
        !tags ||
        !status
      ) {
        return res.status(400).json({
          message: "Please provide all required fields",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const existingBlog = await blogDao.getBlogById(blogId);
      if (!existingBlog.data) {
        return res.status(404).json({
          message: "Blog not found.",
          status: "fail",
          code: 404,
          data: null,
        });
      }

      let parsedTags;
      if (typeof tags === "string") {
        try {
          parsedTags = JSON.parse(tags);
        } catch (error) {
          return res.status(400).json({
            message: "Tags must be a valid JSON array.",
            status: "fail",
            code: 400,
            data: null,
          });
        }
      } else if (Array.isArray(tags)) {
        parsedTags = tags;
      } else {
        return res.status(400).json({
          message: "Tags must be an array.",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const blogData = {
        title: titleCase(title.trim()),
        content: content.trim(),
        summary: titleCase(summary.trim()),
        category: titleCase(category.trim()),
        tags: parsedTags.map((tag) => titleCase(tag.trim())),
        status: status,
      };

      const updatedData = removeNullUndefined(blogData);
      const result = await blogDao.updateBlog(blogId, updatedData);

      if (result.data) {
        return res.status(200).json({
          message: "Blog updated successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      }
    } catch (error) {
      log.error("error from [BLOG SERVICE]: ", error);
      throw error;
    }
  }
}
module.exports = new ModeratorService();
