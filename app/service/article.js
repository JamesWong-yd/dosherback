'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {

  // find
  async find(params) {
    const page = Number(params.page);
    const pageSize = Number(params.pageSize);
    const queryParams = [
      { title: { $regex: new RegExp(params.title, 'i') } },
    ];
    if (params.startDate) {
      queryParams.push({ time: { $gt: params.startDate, $lte: params.endDate } });
    }
    if (params.flag) {
      queryParams.push({ flag: true });
    }
    const res = await this.ctx.model.Article.find({
      $and: queryParams,
    }).limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec();
    return res;
  }

  // count
  async count(params) {
    const queryParams = [
      { title: { $regex: new RegExp(params.title, 'i') } },
    ];
    if (params.endDate) {
      queryParams.push({ time: { $gt: params.startDate, $lte: params.endDate } });
    }
    const res = await this.ctx.model.Article.count({
      $and: queryParams,
    }).exec();
    return res;
  }

  // find one
  async findOne(params) {
    const res = await this.ctx.model.Article.findById(params.id);
    return res;
  }

  // created
  async create(params) {
    const res = await this.ctx.model.Article.create(params);
    return res;
  }

  // update
  async update(idparams, params) {
    const res = await this.ctx.model.Article.findOneAndUpdate({ _id: idparams.id }, params, { new: true });
    return res;
  }

  // find and remove
  async delete(params) {
    const res = await this.ctx.model.Article.deleteMany({
      _id: params.id,
    });
    return res;
  }
}

module.exports = ArticleService;
