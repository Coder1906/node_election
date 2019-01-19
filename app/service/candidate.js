/**
 * @desc 候选人
 * @author Zn
 */
'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class CandidateService extends Service {
  async getById (id) {
    let result = await this.app.mysql.get('candidate', {id});
    return result
  }
  async list({limit, offset, id, name}) {
    let sql = 'select * from candidate';
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
    if (where.condition.length > 0) sql += ` where ${where.condition.join(' and ')}`;
    sql += ' limit ?, ?';
    where.params.push(offset);
    where.params.push(limit);
    let result = await this.app.mysql.query(sql, where.params);
    return result
  }
  async total ({id, name}) {
    let sql = 'select count(*) as num from candidate';
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
    if (where.condition.length > 0) sql += ` where ${where.condition.join(' and ')}`;
    let result = await this.app.mysql.query(sql, where.params);
    return result[0].num;
  }
  async add ({name}) {
    let data = {name};
    data.created = moment().format('YYYY-MM-DD HH:mm:ss');
    let result = await this.app.mysql.insert('candidate', data);
    return result.affectedRows == 1;
  }
  async update (id, {name}) {
    let data = {name};
    let result = await this.app.mysql.update('candidate', data, {where: {id}});
    return result.affectedRows == 1;
  }
  async del () {

  }
}

module.exports = CandidateService;
