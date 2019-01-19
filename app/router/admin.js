/**
 * @desc 管理后台 API路由
 * @author Zn
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const admin = controller.admin
  router.post('/admin/v1/admin/login', admin.admin.login);

  //选举会
  router.get('/admin/v1/election', middleware.admin.checkAuth(), admin.election.list);
  router.get('/admin/v1/election/total', middleware.admin.checkAuth(), admin.election.total);
  router.post('/admin/v1/election', middleware.admin.checkAuth(), admin.election.add);
  router.post('/admin/v1/election/:id(\\d+)', middleware.admin.checkAuth(), admin.election.update);

  //, middleware.admin.checkAuth()
}