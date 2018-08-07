'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const report = middleware.report()
  const checkAuth = middleware.checkAuth()

  //挂载githurb Callback
  app.passport.mount('github')

  router.get('/', controller.home.index);

  router.get('/login', controller.home.renderLogin);
  router.post('/UserLogin', controller.home.userLogin);
  router.get('/Auth', controller.home.auth);
  router.get('/Quit', controller.home.quit);
  

  router.post('/GetUserList', checkAuth, report, controller.home.getUserList);
  router.get('/GetUserInfo', checkAuth, controller.home.getUserInfo);
  router.post('/UpdateUserInfo', checkAuth, controller.home.updateUserInfo);

  router.get('/Halloween', report, controller.home.test);

  router.get('/layout', controller.home.renderLayout);

  router.post('/upload', controller.upload.uploadImg);

  router.resources('posts', '/api/posts', controller.posts);
};
