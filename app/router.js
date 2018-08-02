'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const report = middleware.report()
  router.get('/', controller.home.index);
  router.get('/GetUserInfo', controller.home.getUserInfo);
  router.post('/UpdateUserInfo', controller.home.updateUserInfo);
  router.get('/Halloween', report, controller.home.test);
  router.get('/layout', controller.home.renderLayout);
  router.post('/upload', controller.upload.uploadImg);
  router.resources('posts', '/api/posts', controller.posts);
};
