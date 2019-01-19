const RegEx = require('../extend/helper').RegEx;

module.exports = {
  checkAuth () {
    return async function checkAdminAuth(ctx, next) {
      let token = ctx.headers['auth-user-token'];
      let email = ctx.headers['auth-user-email'];
      if (!RegEx.checkEmail(email) || !RegEx.checkToken(token)) {
        ctx.body = {code: -5, err: '没有权限访问，请先登录'}
        return
      }
      let user = await ctx.service.user.getByToken(token, email)
      if (!user) {
        ctx.body = {code: -5, err: '没有权限访问，请先登录'}
        return
      }
      ctx.userInfo = user
      await next();
    };
  }
}