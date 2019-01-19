/**
 * @desc 选举会管理
 * @author Zn
 */
'use strict';

const Controller = require('egg').Controller;

const RegEx = require('../../extend/helper').RegEx
class ElectionController extends Controller {
  /**
   * @desc 选举会列表
   */
  async list() {
    const ctx = this.ctx;
    let {id, name, limit, offset} = ctx.request.query;

    // status, 查询状态正常的选举列表
    let query = {status: 1}
    if (RegEx.checkUint(id)) query.id = parseInt(id);
    if (RegEx.checkName(name)) query.name = name;
    query.limit = RegEx.checkUint(limit)? parseInt(limit): 20;
    query.offset = RegEx.checkUint(offset)? parseInt(offset): 0;
    let list = await ctx.service.election.list(query);
    ctx.body = {code: 1, data: {list}};
    return
  }
  /**
   * @desc 选举会总数
   */
  async total() {
    const ctx = this.ctx;
    let {id, name} = ctx.request.query;
    
    // status, 查询状态正常的选举总数
    let query = {status: 1}
    if (RegEx.checkUint(id)) query.id = parseInt(id);
    if (RegEx.checkName(name)) query.name = name;

    let total = await ctx.service.election.total(query);
    ctx.body = {code: 1, data: {total}};
    return
  }
}

module.exports = ElectionController;
