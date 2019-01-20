/**
 * @desc 投票记录
 * @author Zn
 */
'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class VoteRecordService extends Service {
  async find ({id, ec_id, user_id}) {
    let query = {}
    if (ec_id) query.ec_id = ec_id
    if (user_id) query.user_id = user_id
    if (id) query.id = id
    let result = await this.app.mysql.get('vote_record', query);
    return result
  }
  async listByUser({limit, offset, election_id, user_id, candidate_id, ec_id, start, end}) {
    let sql = 'select vr.id, vr.user_id, vr.ec_id, vr.created, e.name as election_name, c.name as candidate_name  ';
    sql += ' from vote_record vr, election_candidate ec, election e, candidate c  ';
    sql += ' where ec.id = vr.ec_id and e.id = ec.election_id and c.id = ec.candidate_id  '
    let where = {
      condition: [],
      params: []
    };
    where.condition.push('vr.user_id = ?');
    where.params.push(user_id);
    if (ec_id) {
      where.condition.push('vr.ec_id = ?');
      where.params.push(ec_id);
    }
    if (election_id) {
      where.condition.push('ec.election_id = ?');
      where.params.push(election_id);
    }
    if (candidate_id) {
      where.condition.push('ec.candidate_id = ?');
      where.params.push(candidate_id);
    }
    if (start) {
      where.condition.push('vr.created >= ?');
      where.params.push(start);
    }
    if (end) {
      where.condition.push('vr.end ><= ?');
      where.params.push(end);
    }
    if (where.condition.length > 0) sql += ` and ${where.condition.join(' and ')}`;
    sql += ' limit ?, ?';
    where.params.push(offset);
    where.params.push(limit);
    let result = await this.app.mysql.query(sql, where.params);
    return result
  }
  async list({limit, offset, election_id, ec_id, user_id, candidate_id, start, end}) {
    let sql = 'select vr.id, vr.user_id, vr.ec_id, vr.created, e.name as election_name, c.name as candidate_name, u.email  ';
    sql += ' from vote_record vr, election_candidate ec, election e, candidate c, user u  ';
    sql += ' where ec.id = vr.ec_id and e.id = ec.election_id and c.id = ec.candidate_id and u.id = vr.user_id '
    let where = {
      condition: [],
      params: []
    };
    if (user_id) {
      where.condition.push('vr.user_id = ?');
      where.params.push(user_id);
    }
    if (ec_id) {
      where.condition.push('vr.ec_id = ?');
      where.params.push(ec_id);
    }
    if (election_id) {
      where.condition.push('ec.election_id = ?');
      where.params.push(election_id);
    }
    if (candidate_id) {
      where.condition.push('ec.candidate_id = ?');
      where.params.push(candidate_id);
    }
    if (start) {
      where.condition.push('vr.created >= ?');
      where.params.push(start);
    }
    if (end) {
      where.condition.push('vr.created <= ?');
      where.params.push(end);
    }
    if (where.condition.length > 0) sql += ` and ${where.condition.join(' and ')}`;
    sql += ' limit ?, ?';
    where.params.push(offset);
    where.params.push(limit);
    let result = await this.app.mysql.query(sql, where.params);
    return result
  }
  async total ({election_id, user_id, candidate_id, ec_id, start, end}) {
    let sql = 'select count(*) as num from vote_record vr, election_candidate ec where ec.id = vr.ec_id ';
    let where = {
      condition: [],
      params: []
    };
    if (user_id) {
      where.condition.push('vr.user_id = ?');
      where.params.push(user_id);
    }
    if (ec_id) {
      where.condition.push('vr.ec_id = ?');
      where.params.push(ec_id);
    }
    if (election_id) {
      where.condition.push('ec.election_id = ?');
      where.params.push(election_id);
    }
    if (candidate_id) {
      where.condition.push('ec.candidate_id = ?');
      where.params.push(candidate_id);
    }
    if (start) {
      where.condition.push('vr.created >= ?');
      where.params.push(start);
    }
    if (end) {
      where.condition.push('vr.created <= ?');
      where.params.push(end);
    }
    if (where.condition.length > 0) sql += ` and ${where.condition.join(' and ')}`;
    let result = await this.app.mysql.query(sql, where.params);
    return result[0].num;
  }
  async add ({ec_ids, user_id}) {
    let data = [], created = moment().format('YYYY-MM-DD HH:mm:ss');
    for (let ec_id of ec_ids) {
      data.push([ec_id, user_id, created])
    }
    let result = await this.app.mysql.query('INSERT INTO vote_record (ec_id, user_id, created) VALUES ?', [data]);
    return result.affectedRows >= 1;
  }
  async del () {

  }
}

module.exports = VoteRecordService;
