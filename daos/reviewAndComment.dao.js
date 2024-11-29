const log = require("../configs/logger.config");
const blogModel = require("../models/blog.model");
const reviewModel = require("../models/reviewAndComment.model");

class UserDao {
  async getReviewByBlogId(blogId, userId) {
    try {
      console.log(blogId, userId);
      const result = await reviewModel.findOne({
        blogId: blogId,
        review: {
          $elemMatch: {
            userId: userId,
          },
        },
      });
      console.log(result);
      if (result) {
        return {
          message: "review get successfully",
          success: "success",
          code: 200,
          data: result,
        };
      } else {
        return {
          message: "review not found",
          success: "fail",
          code: 201,
          data: null,
        };
      }
    } catch (error) {
      log.error("Error from [REVIEW DAO] : ", error);
      throw error;
    }
  }

  async updateTheReviewOfTheUser(blogId, data) {
    try {
      console.log(blogId, data);
      const result = await reviewModel.findOneAndUpdate(
        {
          blogId: blogId,
          "review.userId": data.userId,
        },
        {
          $set: {
            "review.$": data,
          },
        },
        {
          new: true,
        }
      );

      if (!result) {
        const updatedResult = await reviewModel.findOneAndUpdate(
          { blogId: blogId },
          {
            $push: {
              review: data,
            },
          },
          {
            new: true,
            upsert: true,
          }
        );
        return {
          message: "review updated successfully",
          success: "success",
          code: 200,
          data: updatedResult,
        };
      } else {
        console.log(result);
        return {
          message: "review updated successfully",
          success: "success",
          code: 200,
          data: result,
        };
      }
    } catch (error) {
      log.error("Error from [REVIEW DAO] : ", error);
      throw error;
    }
  }

  //getReviewByBlog
  async getReviewByBlog(blogId) {
    try {
      const result = await reviewModel.findOne({ blogId }).sort({ _id: -1 });
      console.log(result);
      if (result) {
        return {
          message: "review get successfully",
          success: "success",
          code: 200,
          data: result,
        };
      } else {
        return {
          message: "review not found",
          success: "fail",
          code: 201,
          data: null,
        };
      }
    } catch (error) {
      log.error("Error from [REVIEWANDWISHLIST DAO] : ", error);
      throw error;
    }
  }
}
module.exports = new UserDao();
