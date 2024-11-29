const Auth = require("./auth.routes");
const Role = require("./role.routes");
const Blog=require("./blog.routes");
const ReviewAndComment=require("./reviewAndComment.routes");
const Moderator=require("./moderator.routes")
module.exports = {
  Auth,
  Role,
  Blog,
  ReviewAndComment,
  Moderator
};
