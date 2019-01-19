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
    let query = {}
    if (RegEx.checkUint(id)) query.id = Number(id);
    if (RegEx.checkUint(election_id)) query.election_id = Number(election_id);
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
    let query = {}
    if (RegEx.checkUint(id)) query.id = Number(id);
    if (RegEx.checkUint(election_id)) query.election_id = Number(election_id);
    if (RegEx.checkUint(candidate_id)) query.candidate_id = Number(candidate_id);

    let total = await ctx.service.electionCandidate.total(query);
    ctx.body = {code: 1, data: {total}};
    return
  }
  /**
   * @desc 参与选举会的候选人添加
   */
  async add () {
    const ctx = this.ctx;
    let {election_id, candidate_id} = ctx.request.body;
    if (!RegEx.checkUint(election_id) || !RegEx.checkUint(candidate_id)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    election_id = Number(election_id)
    candidate_id = Number(candidate_id)
    let election = await ctx.service.election.getById(election_id);
    if (!election) {
      ctx.body = {code: -3, msg: '选举会不存在'};
      return
    }
    let candidate = await ctx.service.candidate.getById(candidate_id);
    if (!candidate) {
      ctx.body = {code: -3, msg: '候选人不存在'};
      return
    }
    let ec = await ctx.service.electionCandidate.find({election_id, candidate_id});
    if (ec) {
      ctx.body = {code: -4, msg: '该选举会已经存在该候选人'};
      return
    }
    let result = await ctx.service.electionCandidate.add({election_id, candidate_id});
    ctx.body = result? {code: 1}: {code: 0, msg: '服务器内部错误'};
    return
  }
  /**
   * @desc 参与选举会的候选人修改
   */
  async update () {
    const ctx = this.ctx;
    let {election_id, candidate_id} = ctx.request.body;
    if (!RegEx.checkUint(election_id) || !RegEx.checkUint(candidate_id)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let electionCandidateId = Number(ctx.params.id);
    let electionCandidate = await ctx.service.electionCandidate.getById(electionCandidateId);
    if (!electionCandidate) {
      ctx.body = {code: -2, msg: '该记录不存在'};
      return
    }
    election_id = Number(election_id)
    candidate_id = Number(candidate_id)
    let election = await ctx.service.election.getById(election_id);
    if (!election) {
      ctx.body = {code: -3, msg: '选举会不存在'};
      return
    }
    let candidate = await ctx.service.candidate.getById(candidate_id);
    if (!candidate) {
      ctx.body = {code: -3, msg: '候选人不存在'};
      return
    }
    let ec = await ctx.service.electionCandidate.find({unequalId: electionCandidateId, election_id, candidate_id});
    if (ec) {
      ctx.body = {code: -4, msg: '该选举会已经存在该候选人'};
      return
    }

    let result = await ctx.service.electionCandidate.update(electionCandidateId, {election_id, candidate_id});
    ctx.body = result? {code: 1}: {code: 0, msg: '服务器内部错误'};
    return
  }
}

module.exports = ElectionelectionCandidateController;
