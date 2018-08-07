'use strict';
const path = require('path')

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532999583933_3259';

  // add your config here
  config.middleware = ['gzip'];

  // gzip中间件配置
  config.gzip = {
    threshold: 1000
  }

  // 安全插件配置
  config.security = {
    csrf: {
      enable: false,
    }
  }

  // 模版插件配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
    mapping: {
      '.nj': 'nunjucks',
    }
  }

  // 配置mysql插件
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 自定义日志
  config.customLogger = {
    // 定时任务日志写入
    scheduleLogger: {
      consoleLevel: 'NONE',
      file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
    },
  };
  
  //自动更新session时间
  config.session = {
    renew: true,
  }

  //缓存服务器配置（未设密码）
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379, 
      password: '',
      db: '0',
    },
    agent: true
  }

  return config;
}; 