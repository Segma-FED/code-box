/**
 * Created by Lucas on 2020/9/3.
 * 监听文件变化
 */
'use strict';
const Service = require('egg').Service;
let lastModifyTime = 0;

class WatchService extends Service {
  /**
   * 运行构建
   * */
  async runBuild() {
    this.app.messenger.sendToAgent('run_build', '');
    return true;
  }

  async setLastModifyTime(time) {
    lastModifyTime = time;
  }

  async getLastModifyTime() {
    return lastModifyTime;
  }
}

module.exports = WatchService;
