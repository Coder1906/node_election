/**
 * @desc 投票记录
 * @author Zn
 */
'use strict';

const Controller = require('egg').Controller;

const RegEx = require('../../extend/helper').RegEx
class VoteRecordController extends Controller {
  /**
   * @desc 用户投票记录
   */
  async list() {
    const ctx = this.ctx;
    let {election_id, candidate_id, ec_id, start, end, limit, offset} = ctx.request.query;

    let query = {user_id: ctx.userInfo.id}
    if (RegEx.checkUint(election_id)) query.election_id = Number(election_id);
    if (RegEx.checkUint(candidate_id)) query.candidate_id = Number(candidate_id);
    if (RegEx.checkUint(ec_id)) query.ec_id = Number(ec_id);
    if (RegEx.checkDateTime(start)) query.start = start;
    if (RegEx.checkDateTime(end)) query.end = end;
    query.limit = RegEx.checkUint(limit)? Number(limit): 20;
    query.offset = RegEx.checkUint(offset)? Number(offset): 0;

    let list = await ctx.service.voteRecord.listByUser(query);
    ctx.body = {code: 1, data: {list}};
    return
  }
  /**
   * @desc 用户投票总数
   */
  async total() {
    const ctx = this.ctx;
    let {election_id, candidate_id, ec_id, start, end} = ctx.request.query;
    
    let query = {user_id: ctx.userInfo.id}
    if (RegEx.checkUint(election_id)) query.election_id = Number(election_id);
    if (RegEx.checkUint(candidate_id)) query.candidate_id = Number(candidate_id);
    if (RegEx.checkUint(ec_id)) query.ec_id = Number(ec_id);
    if (RegEx.checkDateTime(start)) query.start = start;
    if (RegEx.checkDateTime(end)) query.end = end;

    let total = await ctx.service.voteRecord.total(query);
    ctx.body = {code: 1, data: {total}};
    return
  }
  async add () {
    const ctx = this.ctx;
    let {ec_id} = ctx.request.body;
    if (!RegEx.checkUint(ec_id)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    ec_id = Number(ec_id)
    let ec = await ctx.service.electionCandidate.getById(ec_id)
    if (!ec) {
      ctx.body = {code: -12, msg: '该候选人不存在'};
      return
    }

    //检查选举会的状态
    let election = await ctx.service.election.getById(ec.election_id)
    if (!election || election.status != 1) {
      ctx.body = {code: -3, msg: '选举会不存在'};
      return
    }
    let now = Date.now()
    if (now < new Date(election.start).getTime()) {
      ctx.body = {code: -15, msg: '选举会还没开始'};
      return
    }
    if (now > new Date(election.end).getTime()) {
      ctx.body = {code: -16, msg: '选举会已经结束'};
      return
    }

    //需求是用户不能重复投同一个候选人？ 检查是否已经投过该候选人
    let isExist = await ctx.service.voteRecord.find({ec_id, user_id: ctx.userInfo.id})
    if (isExist) {
      ctx.body = {code: -14, msg: '您已经投过该候选人了'};
      return
    }

    let userVoteTotal = await ctx.service.voteRecord.total({election_id: ec.election_id, user_id: ctx.userInfo.id});

    // 每个用户最低可以投2票，超过2票就判断改选举会的候选人总数
    if (userVoteTotal > 2) {
      let ecTotal = await ctx.service.electionCandidate.total({election_id: ec.election_id});
      //超过候选人总数的20%，返回失败，不能再投了
      if (userVoteTotal > ecTotal*0.2) {
        ctx.body = {code: -15, msg: '您投票次数已经达到上限'};
        return 
      }
    }
    let result = await ctx.service.voteRecord.add({user_id: ctx.userInfo.id, ec_id});
    ctx.body = result? {code: 1}: {code: 0, msg: '内部错误'};
    return
  }
}

module.exports = VoteRecordController;
