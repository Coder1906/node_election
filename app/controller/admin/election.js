/**
 * @desc 后台管理员
 * @author Zn
 */
'use strict';

const Controller = require('egg').Controller;

const RegEx = require('../../extend/helper').RegEx
class ElectionController extends Controller {
  async list() {
    const ctx = this.ctx;
    let {id, name, status, limit, offset} = ctx.request.query;
    let query = {}
    if (RegEx.checkUint(id)) query.id = parseInt(id);
    if ([0, 1].includes(status)) query.status = parseInt(status);
    if (RegEx.checkName(name)) query.name = name;
    query.limit = RegEx.checkUint(limit)? parseInt(limit): 20;
    query.offset = RegEx.checkUint(offset)? parseInt(offset): 0;
    let list = await ctx.service.election.list(query);
    ctx.body = {code: 1, data: {list}};
    return
  }
  async total() {
    const ctx = this.ctx;
    let {id, name, status} = ctx.request.query;
    let query = {}
    if (RegEx.checkUint(id)) query.id = parseInt(id);
    if ([0, 1].includes(status)) query.status = parseInt(status);
    if (RegEx.checkName(name)) query.name = name;

    let total = await ctx.service.election.total(query);
    ctx.body = {code: 1, data: {total}};
    return
  }
  async add () {
    const ctx = this.ctx;
    let {name, start, end, status} = ctx.request.body;
    if (!RegEx.checkName(name) || !RegEx.checkDateTime(start) || !RegEx.checkDateTime(end) || ![0, 1].includes(status)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    if (new Date(start).getTime() >= new Date(end).getTime()) {
      ctx.body = {code: -1, msg: '结束时间要大于开始时间'};
      return
    }
    let result = await ctx.service.election.add({name, start, end, status: parseInt(status)});
    ctx.body = result? {code: 1}: {code: 0, msg: '服务器内部错误'};
    return
  }
  async update () {
    const ctx = this.ctx;
    let {name, start, end, status} = ctx.request.body;
    if (!RegEx.checkName(name) || !RegEx.checkDateTime(start) || !RegEx.checkDateTime(end) || ![0, 1].includes(status)) {
      ctx.body = {code: -1, msg: '参数错误'};
      return
    }
    if (new Date(start).getTime() >= new Date(end).getTime()) {
      ctx.body = {code: -1, msg: '结束时间要大于开始时间'};
      return
    }
    let electionId = parseInt(ctx.params.id);
    let election = await ctx.service.election.getById(electionId);
    if (!election) {
      ctx.body = {code: -2, msg: '该记录不存在'};
      return
    }
    let result = await ctx.service.election.update(electionId, {name, start, end, status: parseInt(status)});
    ctx.body = result? {code: 1}: {code: 0, msg: '服务器内部错误'};
    return
  }
}

module.exports = ElectionController;
