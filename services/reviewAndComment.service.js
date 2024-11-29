const log = require("../configs/logger.config");
const reviewAndCommentDao = require("../daos/reviewAndComment.dao");
const userDao = require("../daos/user.dao");
const {
  removeNullUndefined,
  titleCase,
} = require("../utils/helpers/common.utils");
class ReviewAndCommentService {
  async addReviewByBlogId(req, res) {
    try {
      const { blogId, comment, rating } = req.body;
      const userId = req.userId;

      if (!blogId || !comment || !rating) {
        return res.status(400).json({
          message: "please enter all field",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const isReviewExist = await reviewAndCommentDao.getReviewByBlogId(
        blogId,
        userId
      );

      let result = null;
      const data = {
        userId: userId,
        rating: rating,
        comment: comment,
      };
      const updatedData = removeNullUndefined(data);
      if (isReviewExist.data) {
        result = await reviewAndCommentDao.updateTheReviewOfTheUser(
          blogId,
          updatedData
        );
      } else {
        result = await reviewAndCommentDao.updateTheReviewOfTheUser(
          blogId,
          updatedData
        );
      }

      if (result.data) {
        return res.status(200).json({
          message: "review added successfully",
          status: "success",
          code: 200,
          data: result.data,
        });
      }
    } catch (error) {
      log.error("error from [REVIEW SERVICE]: ", error);
      throw error;
    }
  }

  //getReviewByBlogIdService
  async getReviewByBlogIdService(req, res) {
    try {
      const { blogId } = req.body;

      if (!blogId) {
        return res.status(400).json({
          message: "please enter all field",
          status: "fail",
          code: 400,
          data: null,
        });
      }

      const isReviewExist = await reviewAndCommentDao.getReviewByBlog(blogId);
      let data = [];

      if (isReviewExist.data) {
        data = await Promise.all(
          isReviewExist.data.review.map(async (res) => {
            const userId = res.userId;
            const userDetail = await userDao.getUserById(userId);
            let user;
            if (userDetail.data) {
              if (userDetail.data) {
                user = `${userDetail?.data?.firstName} ${userDetail?.data?.lastName}`;
              }
            }
            return {
              ...res.toObject(),
              name: user,
            };
          })
        );
      }

      

      return res.status(200).json({
        message: "reviews get successfully",
        success: "success",
        code: 200,
        data: data,
      });
    } catch (error) {
      log.error("error from [REVIEW SERVICE]: ", error);
      throw error;
    }
  }
}
module.exports = new ReviewAndCommentService();
