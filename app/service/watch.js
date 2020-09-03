/**
 * Created by Lucas on 2020/9/3.
 * 监听文件变化
 */
'use strict';
const Service = require('egg').Service;
let lastModifyTime = 0;
const chokidar = require('chokidar');
const path = require('path');

class WatchService extends Service {
  async startWatchFile() {
    lastModifyTime = new Date().getTime();
    chokidar.watch(path.resolve('/Person/vs-code-test/segma-framework/src'), {
      ignored: /node_modules/,
    })
      .on('all', (event, path) => {
        console.log(event, path);
        lastModifyTime = new Date().getTime();
      });
  }

  async getLastModifyTime() {
    return lastModifyTime;
  }
}

module.exports = WatchService;
