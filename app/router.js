'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.codeBox.index);
  router.get('/code-box', controller.codeBox.workbench);
  router.get('/api/health', controller.api.health);
  router.get('/api/update-project', controller.api.updateProject);
  router.get('/api/get-page-origin', controller.api.getPageOrigin);
  router.get('/api/get-last-modify-time', controller.api.getLastModifyTime);
  router.get('/api/run-build', controller.api.runBuild);
};
