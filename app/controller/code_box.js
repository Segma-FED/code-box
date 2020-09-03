'use strict';

const Controller = require('egg').Controller;

class CodeBoxController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.redirect('/code-box');

    /* if (await ctx.service.project.getCurrentProject()) {
      ctx.redirect('/code-box');
    }
    const projectList = await ctx.service.project.getProject();
    await ctx.render('select_page.ejs', {
      projectList,
    });*/
  }

  async workbench() {
    const { ctx } = this;
    const editorUrl = await ctx.service.project.getEditorUrl();
    const pageOrigin = await ctx.service.project.getPageOrigin();
    await ctx.render('code_box.ejs', {
      editorUrl,
      pageOrigin,
    });
  }
}

module.exports = CodeBoxController;
