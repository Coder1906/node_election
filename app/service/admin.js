/**
 * @desc 后台管理员
 * @author Zn
 */
'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class AdminService extends Service {
  async getByUserName(username) {
    let admin = await this.app.mysql.get('admin', { username });
    return admin
  }
  getPassword (password, salt) {
    let md5 = crypto.createHash('md5')
    return md5.update(password + salt).digest('hex');
  }
  async updateToken (user) {
    let token = crypto.randomBytes(16).toString('hex');
    await this.app.redis.set(`admin_token_${user.username}_${token}`, JSON.stringify(user))
    await this.app.redis.expire(`admin_token_${user.username}_${token}`, 86400*30)
    return token
  }
}

module.exports = AdminService;
