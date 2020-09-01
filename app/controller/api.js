'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  async health() {
    const { ctx } = this;
    ctx.body = 'hello, egg';
  }

  async updateProject() {
    const { ctx } = this;
    const { project } = ctx.query;
    await ctx.service.project.updateProject(project);
    ctx.body = true;
  }
}

module.exports = ApiController;
