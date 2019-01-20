const fs = require('fs')
module.exports = app => {
  app.once('server', async (server) => {
    initDataBase(app)
    // websocket
  });
  app.on('error', (err, ctx) => {
    // report error
  });
};

function initDataBase  (app) {
  let tables = await app.mysql.query('show tables')
  if (tables.length > 0) return
  //let sql = fs.readFileSync('./sql/election.sql').toString()
  //创建管理员表
  let adminSQL = "CREATE TABLE `admin` ( "
    + " `id` int(11) NOT NULL AUTO_INCREMENT, "
    + " `username` varchar(30) NOT NULL COMMENT '用户名', "
    + " `password` varchar(32) NOT NULL COMMENT '密码', "
    + " `password_salt` varchar(32) NOT NULL, "
    + " PRIMARY KEY (`id`) "
    + " ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

  let userSQL = "CREATE TABLE `user` ("
    + " `id` int(11) NOT NULL AUTO_INCREMENT, "
    + " `email` varchar(50) NOT NULL COMMENT '邮箱', "
    + " `password` varchar(32) NOT NULL COMMENT '密码', "
    + " `password_salt` varchar(32) NOT NULL, "
    + " `created` datetime NOT NULL COMMENT '创建时间', "
    + " PRIMARY KEY (`id`) "
    + " ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;";

  let electionSQL = "CREATE TABLE `election` ("
    + " `id` int(11) NOT NULL AUTO_INCREMENT,"
    + " `name` varchar(32) NOT NULL COMMENT '选举名称',"
    + " `start` datetime NOT NULL,"
    + " `end` datetime NOT NULL,"
    + " `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态（0=未开启，1=进行中）',"
    + " `created` datetime NOT NULL COMMENT '创建时间',"
    + " PRIMARY KEY (`id`)"
    + " ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8";
  
  let candidateSQL = "CREATE TABLE `candidate` ("
    + "`id` int(11) NOT NULL AUTO_INCREMENT,"
    + "`name` varchar(32) NOT NULL COMMENT '候选人名称',"
    + "`created` datetime NOT NULL COMMENT '创建时间',"
    + "PRIMARY KEY (`id`)"
    + ") ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8";

  let electionCandidateSQL = "CREATE TABLE `election_candidate` ("
    + " `id` int(11) NOT NULL AUTO_INCREMENT,"
    + " `election_id` int(11) NOT NULL COMMENT '选举会id',"
    + " `candidate_id` int(11) NOT NULL COMMENT '候选人id',"
    + " PRIMARY KEY (`id`)"
    + " ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8";

  let voteRecordSQL = "CREATE TABLE `vote_record` ("
    + " `id` int(11) NOT NULL AUTO_INCREMENT,"
    + " `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '投票人',"
    + " `ec_id` int(11) NOT NULL DEFAULT '0' COMMENT '选举会候选人id',"
    + " `created` datetime NOT NULL COMMENT '投票时间',"
    + " PRIMARY KEY (`id`)"
    + " ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8";
  
  let sqls = [adminSQL, userSQL, electionSQL, candidateSQL, electionCandidateSQL, voteRecordSQL]
  let result = await Promise.all(sqls.map(sql => app.mysql.query(sql)))
  await app.mysql.insert('admin', {username: 'admin', password: '568856473c868036aabf9794ee98bdaa', password_salt: 'anuas5wg'})
  // await app.mysql.query()
  console.log('init mysql success')
}