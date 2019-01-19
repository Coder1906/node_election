/**
 * @desc 参与选举会的候选人管理
 * @author Zn
 */
'use strict';

const Controller = require('egg').Controller;

const RegEx = require('../../extend/helper').RegEx
class ElectionelectionCandidateController extends Controller {
  /**
   * @desc 参与选举会的候选人列表
   */
  async list() {
    const ctx = this.ctx;
    let {id, election_id, candidate_id, limit, offset} = ctx.request.query;
    if (!RegEx.checkUint(election_id)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let query = {election_id: Number(election_id)}
    if (RegEx.checkUint(id)) query.id = Number(id);
    if (RegEx.checkUint(candidate_id)) query.candidate_id = Number(candidate_id);
    query.limit = RegEx.checkUint(limit)? parseInt(limit): 20;
    query.offset = RegEx.checkUint(offset)? parseInt(offset): 0;
    let list = await ctx.service.electionCandidate.list(query);
    ctx.body = {code: 1, data: {list}};
    return
  }
  /**
   * @desc 参与选举会的候选人总数
   */
  async total() {
    const ctx = this.ctx;
    let {id, election_id, candidate_id} = ctx.request.query;
    if (!RegEx.checkUint(election_id)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let query = {election_id: Number(election_id)}
    if (RegEx.checkUint(id)) query.id = Number(id);
    if (RegEx.checkUint(candidate_id)) query.candidate_id = Number(candidate_id);
    let total = await ctx.service.electionCandidate.total(query);
    ctx.body = {code: 1, data: {total}};
    return
  }
}

module.exports = ElectionelectionCandidateController;
