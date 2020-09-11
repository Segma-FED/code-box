/**
 * Created by Lucas on 2020/9/3.
 * 监听文件变化
 */
'use strict';
const Service = require('egg').Service;
const chokidar = require('chokidar');
const path = require('path');
const { exec } = require('child_process');
const _debounce = require('lodash/debounce');
// 需要监听变化的文件路径
const watchPath = path.resolve('/usr/src/node-app/watch-folder');
const runBuildPath = path.resolve('/usr/src/node-app/run-build-folder');
const buildScript = './node_modules/.bin/vue-cli-service build --no-clean --mode development';
// 文件上次修改的时间
let lastModifyTime = 0;
const runBuild = () => {
  exec(buildScript, { cwd: runBuildPath }, (err, stdout) => {
    if (err) {
      console.error('runBuildFail:', err);
    }
    console.log('runBuildSuc', stdout);
    console.log('new Date().getTime()', new Date().getTime());
    lastModifyTime = new Date().getTime();
  });
};
const _runBuild = _debounce(runBuild, 2000);

class WatchService extends Service {
  /**
   * 监听文件变化
   * */
  async startWatchFile() {
    lastModifyTime = new Date().getTime();
    const { ctx } = this;
    chokidar.watch(watchPath, {
      ignored: /node_modules/,
      ignoreInitial: true,
    })
      .on('all', async (event, path) => {
        console.log('event, path,new Date().getTime', event, path, new Date().getTime());
        await ctx.service.watch.runBuild();
      });
  }

  /**
   * 运行构建
   * */
  async runBuild() {
    _runBuild();
  }

  async getLastModifyTime() {
    return lastModifyTime;
  }
}

module.exports = WatchService;
