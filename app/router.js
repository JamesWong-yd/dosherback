'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /**
   *  article
   *  list     /        get
   *  get      /:id     get
   *  created  /        post
   *  updated  /:id     put
   *  deleted  /:id     delete
   */
  router.resources('article', '/api/article', controller.article);
  router.patch('/api/article/:id/flag', controller.article.updatedFlag);
  router.patch('/api/article/:id/totop', controller.article.updatedTotop);
  // font
  router.resources('font', '/api/font', controller.font);
};
