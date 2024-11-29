const log = require("../configs/logger.config");
const blogDao = require("../daos/blog.dao");
const slugify = require("slugify");

const {
  removeNullUndefined,
  titleCase,
} = require("../utils/helpers/common.utils");
const userDao = require("../daos/user.dao");
class BlogService {
  async addBlogService(req, res) {
    try {
      const { title, content, summary, category, tags } = req.body;

      if (!title || !content || !summary || !category || !tags) {
        return res.status(400).json({
          message: "Please provide all required fields",
          status: "fail",
          code: 400,
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

      if (!req.file || !req.file.path) {
        return res.status(400).json({
          message: "Cover image is required.",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const coverImage = req.file.path;

      const slug = slugify(title, {
        lower: true,
        strict: true,
      });

      const blogData = {
        title: titleCase(title.trim()),
        slug,
        content: content.trim(),
        summary: titleCase(summary.trim()),
        category: titleCase(category.trim()),
        tags: parsedTags.map((tag) => titleCase(tag.trim())),
        coverImage,
        author: req.userId,
        status: "pending",
        publishedAt: new Date(),
      };

      const updatedData = removeNullUndefined(blogData);
      const result = await blogDao.createBlog(updatedData);

      if (result.data) {
        return res.status(200).json({
          message: "Blog added successfully",
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

  async getUsersAllBlogService(req, res) {
    try {
      const userId = req.userId;
      console.log("dsfaaaaa", userId);
      if (!userId) {
        return res.status(400).json({
          message: "something went wrong",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isBlogIdExist = await userDao.getUserById(userId);
      if (!isBlogIdExist.data) {
        return res.status(400).json({
          message: "user not exist",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const blogs = await blogDao.getBlogByUserId(userId);

      if (blogs.data) {
        return res.status(200).json({
          message: "Blog found successfully",
          status: "success",
          code: 200,
          data: blogs.data,
        });
      } else {
        return res.status(200).json({
          message: "Blog not found",
          status: "fail",
          code: 400,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [BLOG SERVICE]: ", error);
      throw error;
    }
  }

  async updateBlogByIdService(req, res) {
    try {
      const { blogId, title, content, summary, category, tags } = req.body;

      if (!blogId || !title || !content || !summary || !category || !tags) {
        return res.status(400).json({
          message: "Please provide all required fields",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const existingBlog = await blogDao.getBlogById(blogId);
      console.log("dsfaaaaaaaa",existingBlog.data);
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

      const coverImage = req.file
        ? req.file.path
        : existingBlog?.data?.coverImage;

      const slug = slugify(title, {
        lower: true,
        strict: true,
      });

      const blogData = {
        title: titleCase(title.trim()),
        slug,
        content: content.trim(),
        summary: titleCase(summary.trim()),
        category: titleCase(category.trim()),
        tags: parsedTags.map((tag) => titleCase(tag.trim())),
        coverImage,
        author: req.userId,
        status: "pending",
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

  async getBlogByIdService(req, res) {
    try {
      const { blogId } = req.body;
      if (!blogId) {
        return res.status(400).json({
          message: "please enter BlogId",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isBlogIdExist = await blogDao.getBlogById(blogId);
      if (!isBlogIdExist.data) {
        return res.status(400).json({
          message: "Blog not exist",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      if (isBlogIdExist.data) {
        return res.status(200).json({
          message: "Blogs get successfully",
          status: "success",
          code: 200,
          data: isBlogIdExist.data,
        });
      }
    } catch (error) {
      log.error("error from [BLOG SERVICE]: ", error);
      throw error;
    }
  }

  //deleteBlogByIdService
  async removeBlogService(req, res) {
    try {
      const { blogId } = req.body;
      if (!blogId) {
        return res.status(400).json({
          message: "please enter BlogId",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isBlogIdExist = await blogDao.getBlogById(blogId);
      if (!isBlogIdExist.data) {
        return res.status(400).json({
          message: "Blog not exist",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const result = await blogDao.deleteBlogById(blogId);

      if (result.data) {
        return res.status(200).json({
          message: "Blog deleted successfully",
          status: "success",
          code: 200,
          data:null,
        });
      } else {
        return res.status(201).json({
          message: "Blogs not delete",
          status: "fail",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }

  //markBlogAsCompleteByIdService
  async markBlogAsCompleteByIdService(req, res) {
    try {
      const { BlogId, isCompleted } = req.body;
      if (!BlogId) {
        return res.status(400).json({
          message: "please enter BlogId",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isBlogIdExist = await BlogDao.getBlogById(BlogId);
      if (!isBlogIdExist.data) {
        return res.status(400).json({
          message: "Blog not exist",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isCompletedBlog = isBlogIdExist.data.isCompleted;
      if (isCompletedBlog === true) {
        return res.status(400).json({
          message: "your Blog already have been completed successfully",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const result = await BlogDao.makeBlogCompleted(BlogId, isCompleted);

      if (result.data) {
        return res.status(200).json({
          message: "Blog has been completed successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "Blogs not completed",
          status: "fail",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }

  //setDueDateByIdService
  async setDueDateByIdService(req, res) {
    try {
      const { BlogId, dueDate } = req.body;
      if (!BlogId) {
        return res.status(400).json({
          message: "please enter BlogId",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      if (!dueDate) {
        return res.status(400).json({
          message: "please enter dueDate",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const isBlogIdExist = await BlogDao.getBlogById(BlogId);
      if (!isBlogIdExist.data) {
        return res.status(400).json({
          message: "Blog not exist",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const [day, month, year] = dueDate.split("-");
      const newDueDate = new Date(`${year}-${month}-${day}`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (newDueDate < today) {
        return res.status(400).json({
          message:
            "due date cannot be in the past. Please provide today’s or a future date.",
          status: "fail",
          code: 201,
          data: null,
        });
      }

      const result = await BlogDao.addDueDate(BlogId, newDueDate);

      if (result.data) {
        return res.status(200).json({
          message: "due date has been added successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      } else {
        return res.status(201).json({
          message: "due date is not added",
          status: "fail",
          code: 201,
          data: null,
        });
      }
    } catch (error) {
      log.error("error from [AUTH SERVICE]: ", error);
      throw error;
    }
  }
}
module.exports = new BlogService();
