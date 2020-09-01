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
};
