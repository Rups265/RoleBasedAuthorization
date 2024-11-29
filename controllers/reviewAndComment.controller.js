const reviewService = require("../services/reviewAndComment.service");
class ReviewAndCommentController {
  async addReviewByBlogId(req, res) {
    try {
      const result = await reviewService.addReviewByBlogId(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getReviewByBlogId(req, res) {
    try {
      const result = await reviewService.getReviewByBlogIdService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

}
module.exports = new ReviewAndCommentController();
