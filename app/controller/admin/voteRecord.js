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
    let {election_id, candidate_id, user_id, ec_id, start, end, limit, offset} = ctx.request.query;

    let query = {}
    if (RegEx.checkUint(election_id)) query.election_id = Number(election_id);
    if (RegEx.checkUint(candidate_id)) query.candidate_id = Number(candidate_id);
    if (RegEx.checkUint(ec_id)) query.ec_id = Number(ec_id);
    if (RegEx.checkUint(user_id)) query.user_id = Number(user_id);
    if (RegEx.checkDateTime(start)) query.start = start;
    if (RegEx.checkDateTime(end)) query.end = end;
    query.limit = RegEx.checkUint(limit)? Number(limit): 20;
    query.offset = RegEx.checkUint(offset)? Number(offset): 0;

    let list = await ctx.service.voteRecord.list(query);
    ctx.body = {code: 1, data: {list}};
    return
  }
  /**
   * @desc 用户投票总数
   */
  async total() {
    const ctx = this.ctx;
    let {election_id, candidate_id, user_id, ec_id, start, end} = ctx.request.query;
    
    let query = {}
    if (RegEx.checkUint(election_id)) query.election_id = Number(election_id);
    if (RegEx.checkUint(candidate_id)) query.candidate_id = Number(candidate_id);
    if (RegEx.checkUint(ec_id)) query.ec_id = Number(ec_id);
    if (RegEx.checkUint(user_id)) query.user_id = Number(user_id);
    if (RegEx.checkDateTime(start)) query.start = start;
    if (RegEx.checkDateTime(end)) query.end = end;

    let total = await ctx.service.voteRecord.total(query);
    ctx.body = {code: 1, data: {total}};
    return
  }
}

module.exports = VoteRecordController;
