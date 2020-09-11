/**
 * Created by Lucas on 2020/9/3.
 */
'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
    app.messenger.on('agent_message_action', data => {
      console.log('receive agent_message_action:', data);
    });
  }

  // 配置文件已读取合并但还未生效，修改配置的最后时机，仅支持同步操作。
  configWillLoad() {
  }

  // 所有配置已经加载完毕，用于自定义 Loader 挂载。
  configDidLoad() {
  }

  // 插件的初始化
  async didLoad() {
    // console.log('didLoad');
  }

  // 所有插件启动完毕，用于做应用启动成功前的一些必须的前置操作。
  async willReady() {
    // console.log('willReady');
  }

  // 应用已经启动完毕，可以用于做一些初始化工作。
  async didReady() {
    // console.log('ready');
    const ctx = await this.app.createAnonymousContext();
    console.log('didReady');
    await ctx.service.watch.startWatchFile();
  }

  // Server 已经启动成功，可以开始导入流量，处理外部请求。
  async serverDidReady() {
    // console.log('serverDidReady');
  }

  // 应用即将关闭前
  async beforeClose() {
    // console.log('beforeClose');
  }
}

module.exports = AppBootHook;
