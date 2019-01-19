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
  async find ({id, election_id, candidate_id}) {
    let query = {}
    if (id) query.id = id
    if (election_id) query.election_id = election_id
    if (candidate_id) query.candidate_id = candidate_id
    let result = await this.app.mysql.get('election_candidate', query);
    return result
  }
  async list({limit, offset, id, election_id, candidate_id}) {
    let sql = 'select * from election_candidate';
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
  async del () {

  }
}

module.exports = ElectioneCandidateService;
