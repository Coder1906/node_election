/**
 * @desc 后台管理员
 * @author Zn
 */
'use strict';

const Controller = require('egg').Controller;

const RegEx = require('../../extend/helper').RegEx
class AdminController extends Controller {
  async login() {
    const ctx = this.ctx;
    let {username, password} = ctx.request.body;
    if (!RegEx.checkUserName(username) || !RegEx.checkPassword(password)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let admin = await this.service.admin.getByUserName(username);
    if (!admin) {
      ctx.body = {code: -2, msg: '用户名或者密码错误'};
      return
    }
    if (admin.password != this.service.admin.getPassword(password, admin.password_salt)) {
      ctx.body = {code: -2, msg: '用户名或者密码错误'};
      return
    }
    let token = await this.service.admin.updateToken(admin);

    ctx.body = {code: 1, data: {admin: {username, token}}};
    return
  }
}

module.exports = AdminController;
