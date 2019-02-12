'use strict';

const Controller = require('egg').Controller;

class FontController extends Controller {
  async index() {
    const ctx = this.ctx;
    // validate rule
    const rule = {
      page: { type: 'string' },
      pageSize: { type: 'string' },
    };
    // validate params
    try {
      ctx.validate(rule, ctx.query);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = { state: false, msg: err.errors };
      return;
    }
    const params = Object.assign({ flag: true }, ctx.query);
    // check database
    const list = await ctx.service.article.find(params);
    const count = await ctx.service.article.count(params);
    // return front
    ctx.body = {
      data: list,
      count,
      state: 'success',
    };
    ctx.status = 200;
  }
}

module.exports = FontController;
