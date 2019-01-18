'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1547817016512_3997';

  // add your config here
  config.middleware = [];
  config.mysql = {
    // 单数据库信息配置
    client: {
      host: '127.0.0.1',
      database: 'election',
      port: 3306,
      user: 'root',
      password: 'root'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
  }
  config.onerror = {
    all(err, ctx) {
      console.log('onerr json', err)
      ctx.res.body = 'error';
      ctx.res.status = 500;
      return
    },
    html(err, ctx) {
      ctx.res.body = '<h3>error</h3>';
      ctx.res.status = 500;
    },
    json(err, ctx) {
      console.log('onerr json', err)
      // json hander
      ctx.res.body = { code: 0, message: '服务器内部错误' };
      ctx.res.status = 500;
    }
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false
    },
    // domainWhiteList: ['http://192.168.2.149:8080', 'http://192.168.2.149:8081', 'http://192.168.31.174:8080', 'http://127.0.0.1:8081']
  };
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  return config;
};
