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

  //候选人列表
  router.get('/admin/v1/candidate', middleware.admin.checkAuth(), admin.candidate.list);
  router.get('/admin/v1/candidate/total', middleware.admin.checkAuth(), admin.candidate.total);
  router.post('/admin/v1/candidate', middleware.admin.checkAuth(), admin.candidate.add);
  router.post('/admin/v1/candidate/:id(\\d+)', middleware.admin.checkAuth(), admin.candidate.update);

  //选举会的候选人列表
  router.get('/admin/v1/election_candidate', middleware.admin.checkAuth(), admin.electionCandidate.list);
  router.get('/admin/v1/election_candidate/total', middleware.admin.checkAuth(), admin.electionCandidate.total);
  router.post('/admin/v1/election_candidate', middleware.admin.checkAuth(), admin.electionCandidate.add);
  router.post('/admin/v1/election_candidate/:id(\\d+)', middleware.admin.checkAuth(), admin.electionCandidate.update);
  router.delete('/admin/v1/election_candidate/:id(\\d+)', middleware.admin.checkAuth(), admin.electionCandidate.del);

  //, middleware.admin.checkAuth()
}