/**
 * @desc 候选人管理
 * @author Zn
 */
'use strict';

const Controller = require('egg').Controller;

const RegEx = require('../../extend/helper').RegEx
class CandidateController extends Controller {
  /**
   * @desc 候选人列表
   */
  async list() {
    const ctx = this.ctx;
    let {id, name, limit, offset} = ctx.request.query;
    let query = {}
    if (RegEx.checkUint(id)) query.id = parseInt(id);
    if (RegEx.checkName(name)) query.name = name;
    query.limit = RegEx.checkUint(limit)? parseInt(limit): 20;
    query.offset = RegEx.checkUint(offset)? parseInt(offset): 0;
    let list = await ctx.service.candidate.list(query);
    ctx.body = {code: 1, data: {list}};
    return
  }
  /**
   * @desc 候选人总数
   */
  async total() {
    const ctx = this.ctx;
    let {id, name} = ctx.request.query;
    let query = {}
    if (RegEx.checkUint(id)) query.id = parseInt(id);
    if (RegEx.checkName(name)) query.name = name;

    let total = await ctx.service.candidate.total(query);
    ctx.body = {code: 1, data: {total}};
    return
  }
  /**
   * @desc 候选人添加
   */
  async add () {
    const ctx = this.ctx;
    let {name} = ctx.request.body;
    if (!RegEx.checkName(name)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let result = await ctx.service.candidate.add({name});
    ctx.body = result? {code: 1}: {code: 0, msg: '服务器内部错误'};
    return
  }
  /**
   * @desc 候选人修改
   */
  async update () {
    const ctx = this.ctx;
    let {name} = ctx.request.body;
    if (!RegEx.checkName(name)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    let candidateId = parseInt(ctx.params.id);
    let candidate = await ctx.service.candidate.getById(candidateId);
    if (!candidate) {
      ctx.body = {code: -2, msg: '该记录不存在'};
      return
    }
    let result = await ctx.service.candidate.update(candidateId, {name});
    ctx.body = result? {code: 1}: {code: 0, msg: '服务器内部错误'};
    return
  }
}

module.exports = CandidateController;
