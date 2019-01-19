/**
 * @desc 用户
 * @author Zn
 */
'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const moment = require('moment');

class UserService extends Service {
  async getByEmail(email) {
    let admin = await this.app.mysql.get('user', { email });
    return admin
  }
  async add ({email, password}) {
    let password_salt = crypto.randomBytes(4).toString('hex');
    password = this.getPassword(password, password_salt);
    let result = await this.app.mysql.insert('user', {email, password, password_salt, created: moment().format('YYYY-MM-DD HH:mm:ss')})
    return result.affectedRows == 1? result.insertId: '';
  }
  async updateToken ({user}) {
    let token = crypto.randomBytes(16).toString('hex');
    await this.app.redis.set(`user_token_${user.email}_${token}`, JSON.stringify(user))
    await this.app.redis.expire(`user_token_${user.email}_${token}`, 86400*30)
    return token
  }
  async getByToken (token, email) {
    let user = await this.app.redis.get(`user_token_${email}_${token}`)
    return user? JSON.parse(user): null
  }
  async saveCaptcha (email, captcha) {
    await this.app.redis.set(`captcha_${email}`, JSON.stringify({captcha, created: Date.now()}))
    await this.app.redis.expire(`captcha_${email}`, 600)
    return
  }
  async getCaptcha (email) {
    let captcha = await this.app.redis.get(`captcha_${email}`)
    return captcha? JSON.parse(captcha): null
  }
  getPassword (password, salt) {
    let md5 = crypto.createHash('md5')
    return md5.update(password + salt).digest('hex');
  }
}

module.exports = UserService;
