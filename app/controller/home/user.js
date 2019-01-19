/**
 * @desc 登陆、注册、发送验证码
 */
'use strict';

const Controller = require('egg').Controller;
const RegEx = require('../../extend/helper').RegEx
const crypto = require('crypto');

class UserController extends Controller {
  async login() {
    const ctx = this.ctx;
    let {email, password} = ctx.request.body;
    if (!RegEx.checkEmail(email) || !RegEx.checkPassword(password)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let user = await ctx.service.user.getByEmail(email);
    if (!user) {
      ctx.body = {code: -10, msg: '该邮箱还没注册'};
      return
    }
    if (user.password != ctx.service.user.getPassword(password, user.password_salt)) {
      ctx.body = {code: -11, msg: '密码错误'};
      return
    }
    let token = await ctx.service.user.updateToken({user: {email, id: user.id}});
    ctx.body = {code: 1, data: {
      user: {id: user.id, email, token}
    }};
    return
  }
  async register () {
    const ctx = this.ctx;
    let {email, captcha, password} = ctx.request.body;
    if (!RegEx.checkEmail(email) || !RegEx.checkPassword(password) || !RegEx.checkCaptcha(captcha)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let captchaHistory = await ctx.service.user.getCaptcha(email);

    if (!captchaHistory) {
      ctx.body = {code: -7, msg: '验证码已过有效期，请重新发送'};
      return
    }
    if (captchaHistory.captcha != captcha) {
      ctx.body = {code: -8, msg: '验证码错误'};
      return
    }
    let user = await ctx.service.user.getByEmail(email);
    if (user) {
      ctx.body = {code: -9, msg: '该邮箱已经被使用'};
      return
    }
    let id = await ctx.service.user.add({email, password});
    if (!id) {
      ctx.body = {code: 0, msg: '内部错误'};
      return
    }
    let token = await ctx.service.user.updateToken({user: {email, id}});
    ctx.body = {code: 1, data: {
      user: {email, id, token}
    }};
    return
  }
  async captcha () {
    const ctx = this.ctx;
    let {email} = ctx.request.body;
    if (!RegEx.checkEmail(email)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let user = await ctx.service.user.getByEmail(email);
    if (user) {
      ctx.body = {code: -9, msg: '该邮箱已经被使用'};
      return
    }
    let history = await ctx.service.user.getCaptcha(email);

    //要间隔1分钟才能重发验证码
    if (history && Math.round(history.created+60000) > Date.now()) {
      ctx.body = {code: -6, msg: '操作才频繁，请稍后再重发'};
      return
    }
    let captcha = crypto.randomBytes(3).toString('hex');
    await ctx.service.base.sendEmail(email, '选举注册验证', {text: `您的验证码是：${captcha}，10分钟内有效。`});
    await ctx.service.user.saveCaptcha(email, captcha);
    ctx.body = {code: 1}
    return
  }
}

module.exports = UserController;
