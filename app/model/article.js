'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // article schma
  const ArticleSchma = new Schema({
    title: { type: String },
    create_time: { type: Date, default: Date.now },
    time: { type: Date },
    content: { type: String },
    flag: { type: Boolean, default: false },
  });

  return mongoose.model('article', ArticleSchma);
};
