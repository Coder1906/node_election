/**
 * @desc 面向用户 API路由
 * @author Zn
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const home = controller.home
  //用户
  router.post('/api/v1/user/login', home.user.login);
  router.post('/api/v1/user/register', home.user.register);
  router.post('/api/v1/user/captcha', home.user.captcha);

  //选举会
  router.get('/api/v1/election', middleware.home.checkAuth(), home.election.list);
  router.get('/api/v1/election/total', middleware.home.checkAuth(), home.election.total);

  //选举会的候选人列表
  router.get('/api/v1/election_candidate', middleware.home.checkAuth(), home.electionCandidate.list);
  router.get('/api/v1/election_candidate/total', middleware.home.checkAuth(), home.electionCandidate.total);
}