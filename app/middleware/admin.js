const RegEx = require('../extend/helper').RegEx;

module.exports = {
  checkAuth () {
    return async function checkAdminAuth(ctx, next) {
      let token = ctx.headers['auth-admin-token'];
      let username = ctx.headers['auth-admin-username'];
      if (!RegEx.checkUserName(username) || !RegEx.checkToken(token)) {
        ctx.body = {code: -5, err: '没有权限访问，请先登录'}
        return
      }
      let admin = await ctx.service.admin.getByToken(token, username)
      if (!admin) {
        ctx.body = {code: -5, err: '没有权限访问，请先登录'}
        return
      }
      ctx.adminInfo = admin
      await next();
    };
  }
}