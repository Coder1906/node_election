/**
 * @desc 选举会&候选人
 * @author Zn
 */
'use strict';

const Service = require('egg').Service;

class ElectioneCandidateService extends Service {
  async getById (id) {
    let result = await this.app.mysql.get('election_candidate', {id});
    return result
  }
  async find ({id, election_id, candidate_id, unequalId}) {
    let sql = 'select * from election_candidate '
    let where = {
      condition: [],
      params: []
    };
    if (unequalId) {
      where.condition.push('id != ?');
      where.params.push(unequalId);
    } else if (id) {
      where.condition.push('id = ?');
      where.params.push(id);
    }
    
    if (election_id) {
      where.condition.push('election_id = ?');
      where.params.push(election_id);
    }
    if (candidate_id) {
      where.condition.push('candidate_id = ?');
      where.params.push(candidate_id);
    }
    if (where.condition.length > 0) sql += ` where ${where.condition.join(' and ')}`;
    sql +=' limit 1'
    let result = await this.app.mysql.query(sql, where.params);
    return result.length > 0? result[0]: null
  }
  async list({limit, offset, id, election_id, candidate_id}) {
    let sql = 'select ec.id, ec.election_id, ec.candidate_id, e.name as election_name, c.name as candidate_name ';
    sql += ' from election_candidate ec, election e, candidate c '
    sql += ' where e.id = ec.election_id and c.id = ec.candidate_id'
    let where = {
      condition: [],
      params: []
    };
    if (id) {
      where.condition.push('ec.id = ?');
      where.params.push(id);
    }
    if (election_id) {
      where.condition.push('ec.election_id = ?');
      where.params.push(election_id);
    }
    if (candidate_id) {
      where.condition.push('ec.candidate_id = ?');
      where.params.push(candidate_id);
    }
    if (where.condition.length > 0) sql += ` and ${where.condition.join(' and ')}`;
    sql += ' limit ?, ?';
    where.params.push(offset);
    where.params.push(limit);
    let result = await this.app.mysql.query(sql, where.params);
    return result
  }
  async total ({id, election_id, candidate_id}) {
    let sql = 'select count(*) as num from election_candidate';
    let where = {
      condition: [],
      params: []
    };
    if (id) {
      where.condition.push('id = ?');
      where.params.push(id);
    }
    if (election_id) {
      where.condition.push('election_id = ?');
      where.params.push(election_id);
    }
    if (candidate_id) {
      where.condition.push('candidate_id = ?');
      where.params.push(candidate_id);
    }
    if (where.condition.length > 0) sql += ` where ${where.condition.join(' and ')}`;
    let result = await this.app.mysql.query(sql, where.params);
    return result[0].num;
  }
  async add ({election_id, candidate_id}) {
    let data = {election_id, candidate_id};
    let result = await this.app.mysql.insert('election_candidate', data);
    return result.affectedRows == 1;
  }
  async update (id, {election_id, candidate_id}) {
    let data = {election_id, candidate_id};
    let result = await this.app.mysql.update('election_candidate', data, {where: {id}});
    return result.affectedRows == 1;
  }
  async del (id) {
    let result = await this.app.mysql.delete('election_candidate', {id});
    return result.affectedRows == 1
  }
}

module.exports = ElectioneCandidateService;
