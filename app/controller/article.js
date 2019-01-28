'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {

  // get list  /
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
    // check database
    const list = await ctx.service.article.find(ctx.query);
    const count = await ctx.service.article.count(ctx.query);
    // return front
    ctx.body = {
      data: list,
      count,
      state: 'success',
    };
    ctx.status = 200;
  }

  // created one  /new
  async create() {
    const ctx = this.ctx;
    const rule = {
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      flag: { type: 'boolean' },
    };
    // validate rule
    try {
      ctx.validate(rule, ctx.request.body);
    } catch (error) {
      ctx.logger.warn(error.errors);
      ctx.body = { state: false, msg: error.errors };
      return;
    }
    // insert database
    const newArticle = await ctx.service.article.create(
      Object.assign({ time: new Date() }, ctx.request.body)
    );
    // return front
    ctx.body = {
      data: newArticle,
      state: 'success',
    };
    ctx.status = 201;
  }

  // get one    /:id
  async show() {
    const ctx = this.ctx;
    // validate rule
    const rule = {
      id: { type: 'string', required: true },
    };
    // validate params
    try {
      ctx.validate(rule, ctx.params);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = { state: false, msg: err.errors };
      return;
    }
    // find
    const theArticle = await ctx.service.article.findOne(ctx.params);
    ctx.body = {
      data: theArticle,
      state: 'success',
    };
    ctx.status = 200;
  }

  // update one   /
  async update() {
    const ctx = this.ctx;
    const rule = {
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      flag: { type: 'boolean', required: true },
      totop: { type: 'boolean', required: true },
    };
    // validate rule
    try {
      ctx.validate({
        id: {
          type: 'string',
          required: true,
        },
      }, ctx.params);
      ctx.validate(rule, ctx.request.body);
    } catch (error) {
      ctx.logger.warn(error.errors);
      ctx.body = { state: false, msg: error.errors };
      return;
    }
    // insert database
    const newArticle = await ctx.service.article.update(
      ctx.params,
      Object.assign(ctx.request.body, { time: new Date() })
    );
    // return front
    ctx.body = {
      data: newArticle,
      state: 'success',
    };
    ctx.status = 201;
  }

  // updated flag
  async updatedFlag() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    try {
      ctx.validate({ flag: { type: 'boolean' } }, body);
      ctx.validate({
        id: {
          type: 'string',
          required: true,
        },
      }, ctx.params);
    } catch (error) {
      ctx.logger.warn(error.errors);
      ctx.body = { state: false, msg: error.errors };
      return;
    }
    // updated database
    const updatedFlagArticle = await ctx.service.article.update(
      { id: ctx.params.id },
      { flag: body.flag }
    );
    // return front
    ctx.body = {
      data: updatedFlagArticle,
      state: 'success',
    };
    ctx.status = 201;
  }

  // update totop
  async updatedTotop() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    try {
      ctx.validate({ totop: { type: 'boolean' } }, body);
      ctx.validate({
        id: {
          type: 'string',
          required: true,
        },
      }, ctx.params);
    } catch (error) {
      ctx.logger.warn(error.errors);
      ctx.body = { state: false, msg: error.errors };
      return;
    }
    // updated database
    const updatedFlagArticle = await ctx.service.article.update(
      { id: ctx.params.id },
      { totop: body.totop }
    );
    // return front
    ctx.body = {
      data: updatedFlagArticle,
      state: 'success',
    };
    ctx.status = 201;
  }

  // destroy one
  async destroy() {
    const ctx = this.ctx;
    // validate
    const rule = {
      id: { type: 'string', required: true },
    };
    // validate params
    try {
      ctx.validate(rule, ctx.params);
    } catch (error) {
      ctx.logger.warn(error.errors);
      ctx.body = { state: false, msg: error.errors };
    }
    // database delete
    const removeArticle = await ctx.service.article.delete(ctx.params);
    // return front
    ctx.body = {
      msg: removeArticle,
      state: 'success',
    };
    ctx.status = 200;
  }
}

module.exports = ArticleController;
