const moderatorService = require("../services/moderator.service");
class ModeratorController {
  async changeBlogStatus(req, res) {
    try {
      const result = await moderatorService.changeBlogStatusService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new ModeratorController();