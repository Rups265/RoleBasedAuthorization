const mongoose = require("mongoose");
const reviewAndCommentSchema = new mongoose.Schema(
  {
    blogId: {
      type: String,
      trim: true,
    },
    review: [
      {
        userId: {
          type: String,
          trim: true,
        },
        rating: {
          type: Number,
          trim: true,
          min: [1, "Rating must be at least 1"],
          max: [5, "Rating cannot exceed 5"],
        },
        comment: {
          type: String,
          trim: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("ReviewAndComment", reviewAndCommentSchema);
