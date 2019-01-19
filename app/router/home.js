/**
 * @desc 管理后台 API路由
 * @author Zn
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const home = controller.home
  //用户
  router.post('/api/v1/user/login', home.user.login);
  router.post('/api/v1/user/register', home.user.register);
  router.post('/api/v1/user/captcha', home.user.captcha);
}