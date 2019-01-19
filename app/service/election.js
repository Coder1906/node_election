/**
 * @desc 选举会
 */

'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const moment = require('moment');
class ElectionService extends Service {
  async getById (id) {
    let result = await this.app.mysql.get('election', {id});
    return result
  }
  async list({limit, offset, id, name, status}) {
    let sql = 'select * from election';
    let where = {
      condition: [],
      params: []
    };
    if (id) {
      where.condition.push('id = ?');
      where.params.push(id);
    }
    if (name) {
      where.condition.push('name = ?');
      where.params.push(name);
    }
    if (typeof status != 'undefined') {
      where.condition.push('status = ?');
      where.params.push(status);
    }
    if (where.condition.length > 0) sql += ` where ${where.condition.join(' and ')}`;
    sql += ' limit ?, ?';
    where.params.push(offset);
    where.params.push(limit);
    let result = await this.app.mysql.query(sql, where.params);
    return result
  }
  async total ({id, name, status}) {
    let sql = 'select count(*) as num from election';
    let where = {
      condition: [],
      params: []
    };
    if (id) {
      where.condition.push('id = ?');
      where.params.push(id);
    }
    if (name) {
      where.condition.push('name = ?');
      where.params.push(name);
    }
    if (typeof status != 'undefined') {
      where.condition.push('status = ?');
      where.params.push(status);
    }
    if (where.condition.length > 0) sql += ` where ${where.condition.join(' and ')}`;
    let result = await this.app.mysql.query(sql, where.params);
    return result[0].num;
  }
  async add ({name, start, end, status}) {
    let data = {name, start, end, status};
    data.created = moment().format('YYYY-MM-DD HH:mm:ss');
    let result = await this.app.mysql.insert('election', data);
    return result.affectedRows == 1;
  }
  async update (id, {name, start, end, status}) {
    let data = {name, start, end, status};
    let result = await this.app.mysql.update('election', data, {where: {id}});
    return result.affectedRows == 1;
  }
  async del () {

  }
}

module.exports = ElectionService;
