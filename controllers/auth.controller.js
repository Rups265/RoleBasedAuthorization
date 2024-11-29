const authService = require("../services/auth.service");
class AuthController {
  async register(req, res) {
    try {
      const result = await authService.registerService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(req, res) {
    try {
      const result = await authService.loginService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async logOut(req, res) {
    try {
      const result = await authService.logOutService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new AuthController();
