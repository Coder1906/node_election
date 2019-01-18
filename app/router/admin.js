/**
 * @desc 管理后台 API路由
 * @author Zn
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const admin = controller.admin
  router.post('/admin/v1/admin/login', admin.admin.login);
}