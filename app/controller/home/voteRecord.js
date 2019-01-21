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
    let {election_id, ec_ids} = ctx.request.body;
    if (!RegEx.checkUint(election_id) || typeof ec_ids != 'object' || ec_ids.length == 0) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    for (let i in ec_ids) {
      if (!RegEx.checkUint(ec_ids[i])) {
        ctx.body = {code: -1, msg: '参数错误'};
        return
      }
      ec_ids[i] = Number(ec_ids[i])
    }

    //检查选举会的状态
    let election = await ctx.service.election.getById(election_id)
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

    //检查候选人数量
    let ecTotal = await ctx.service.electionCandidate.total({election_id, ids: ec_ids})
    if (ecTotal != ec_ids.length) {
      ctx.body = {code: -17, msg: '选中的候选人列表异常'};
      return
    }

    //每个选举会只能投一次票
    let voteTotal = await ctx.service.voteRecord.total({election_id, user_id: ctx.userInfo.id})
    if (voteTotal > 0) {
      ctx.body = {code: -14, msg: '该选举会您已经投过票了'};
      return
    }
    // 每个用户最低可以投2票，超过2票就判断改选举会的候选人总数
    if (ec_ids.length > 2) {
      let ecTotal = await ctx.service.electionCandidate.total({election_id});
      //超过候选人总数的20%，返回失败，不能再投了
      if (ec_ids.length > ecTotal*0.2) {
        ctx.body = {code: -18, msg: '您选中的选中的候选人总数已经达到了上限'};
        return 
      }
    }
    //检测锁的存在
    let lock = await this.app.redis.exists(`vote_${election_id}_${ctx.userInfo.id}`);
    if (lock) {
      ctx.body = {code: -19, msg: '您的操作太频繁了，请稍后重试'};
      return 
    }
    //加锁，15秒过期时间
    await this.app.redis.set(`vote_${election_id}_${ctx.userInfo.id}`, 1);
    await this.app.redis.expire(`vote_${election_id}_${ctx.userInfo.id}`, 15);

    let body = {}
    try {
      await ctx.service.voteRecord.add({user_id: ctx.userInfo.id, ec_ids});
      body.code =1;
    } catch (err) {
      body.code = 0;
      body.msg = '内部错误';
    }
    await this.app.redis.del(`vote_${election_id}_${ctx.userInfo.id}`);
    ctx.body = body
    return
  }
}

module.exports = VoteRecordController;
