'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home/user.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /api/v1/user/login', () => {
    return app.httpRequest()
      .post('/api/v1/user/login')
      .expect('hi, egg')
      .expect(200);
  });
});
