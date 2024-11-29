//addBlog
const blogService = require("../services/blog.service");
class BlogController {
  async addBlog(req, res) {
    try {
      const result = await blogService.addBlogService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUsersAllBlog(req, res) {
    try {
      const result = await blogService.getUsersAllBlogService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateBlogById(req, res) {
    try {
      const result = await blogService.updateBlogByIdService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBlogById(req, res) {
    try {
      const result = await blogService.getBlogByIdService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async removeBlog(req, res) {
    try {
      const result = await blogService.removeBlogService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBlogById(req, res) {
    try {
      const result = await blogService.getBlogByIdService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  //setDueDateById
  async addDueDateById(req, res) {
    try {
      const result = await blogService.setDueDateByIdService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new BlogController();
