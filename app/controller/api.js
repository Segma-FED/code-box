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

  /**
   * 获取最新的更新时间
   * */
  async getLastModifyTime() {
    const { ctx } = this;
    ctx.body = await ctx.service.watch.getLastModifyTime();
  }

  async getPageOrigin() {
    const { ctx } = this;
    ctx.body = await ctx.service.project.getPageOrigin();
  }

  /**
   * 发起构建
   * */
  async runBuild() {
    const { ctx } = this;
    ctx.body = await ctx.service.watch.runBuild();
  }
}

module.exports = ApiController;
