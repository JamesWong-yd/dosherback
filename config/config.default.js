'use strict';

module.exports = appInfo => {
  const config = exports = {
    // 设置最小解析
    bodyParser: {
      jsonLimit: '1mb',
      formLimit: '1mb',
    },
    mode: 'file',
    key: 'DOSHER_SESS', // 承载 Session 的 Cookie 键值对名字
    maxAge: 86400000,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1548143344816_6081';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://dosherRW:dosher20190123@120.79.203.126:9088/dosher',
      options: {
        useNewUrlParser: true,
        mongos: true,
      },
    },
  };

  config.security = {
    // 关闭csrf
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  // 允许跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return config;
};

