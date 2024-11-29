//createBlog

const log = require("../configs/logger.config");
const blogModel = require("../models/blog.model");
const getNextSequenceValue = require("../utils/helpers/counter.utils");

class BlogDao {
  async getBlogByUserId(userId) {
    try {
      const result = await blogModel.find({ author: userId }).sort({ _id: -1 });
      if (result) {
        return {
          message: "blog found",
          status: "success",
          code: 200,
          data: result,
        };
      } else {
        return {
          message: "blog not found",
          status: "failed",
          code: 201,
          data: null,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }
  async getBlogById(blogId) {
    try {
      const blog = await blogModel.findOne({ blogId });
      if (!blog) {
        return {
          message: "blog not found",
          status: "fail",
          code: 201,
          data: null,
        };
      } else {
        return {
          message: "blog found",
          status: "success",
          code: 200,
          data: blog,
        };
      }
    } catch (error) {
      log.error("Error from [BLOG DAO] : ", error);
      throw error;
    }
  }

  async createBlog(data) {
    try {
      const blogId = "Blog_" + (await getNextSequenceValue("blog"));
      data.blogId = blogId;
      const blog = new blogModel(data);
      const blogInfo = await blog.save();
      log.info("blog saved");
      if (blogInfo) {
        return {
          message: "blog creation successful",
          status: "success",
          code: 200,
          data: blogInfo,
        };
      } else {
        return {
          message: "blog creation fail",
          status: "fail",
          code: 201,
          data: null,
        };
      }
    } catch (error) {
      log.error("Error from [USER DAO] : ", error);
      throw error;
    }
  }

  async updateBlog(blogId, data) {
    try {
      const blogInfo = await blogModel.findOneAndUpdate(
        { blogId: blogId },
        data,
        {
          new: true,
        }
      );
      if (blogInfo) {
        return {
          message: "blog updated",
          status: "success",
          code: 200,
          data: blogInfo,
        };
      } else {
        return {
          message: "blog update fail",
          status: "fail",
          code: 201,
          data: null,
        };
      }
    } catch (error) {
      log.error("Error from [BLOG DAO] : ", error);
      throw error;
    }
  }

  //deleteBlogById
  async deleteBlogById(blogId) {
    try {
      const blog = await blogModel.findOneAndDelete({ blogId });
      if (!blog) {
        return {
          message: "blog not delete",
          status: "fail",
          code: 201,
          data: null,
        };
      } else {
        return {
          message: "blog deleted found",
          status: "success",
          code: 200,
          data: blog,
        };
      }
    } catch (error) {
      log.error("Error from [BLOG DAO] : ", error);
      throw error;
    }
  }
}
module.exports = new BlogDao();
