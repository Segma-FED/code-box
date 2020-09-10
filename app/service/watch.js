/**
 * Created by Lucas on 2020/9/3.
 * 监听文件变化
 */
'use strict';
const Service = require('egg').Service;
const chokidar = require('chokidar');
const path = require('path');
const { exec } = require('child_process');
let lastModifyTime = 0;
// 需要监听变化的文件路径
const watchPath = path.resolve('/usr/src/node-app/watch-folder');
const runBuildPath = path.resolve('/usr/src/node-app/run-build-folder');
const buildScript = './node_modules/.bin/vue-cli-service build --no-clean';

class WatchService extends Service {
  /**
   * 监听文件变化
   * */
  async startWatchFile() {
    lastModifyTime = new Date().getTime();
    const { ctx } = this;
    chokidar.watch(watchPath, {
      ignored: /node_modules/,
    })
      .on('all', async (event, path) => {
        console.log(event, path);
        const runSuccess = await ctx.service.watch.runBuild();
        if (runSuccess) {
          lastModifyTime = new Date().getTime();
        }
      });
  }

  /**
   * 运行构建
   * */
  async runBuild() {
    try {
      exec(buildScript, { cwd: runBuildPath }, (err, stdout) => {
        if (err) {
          console.error(err);
          return false;
        }
        console.log(stdout);
        return true;
      });
    } catch (e) {
      console.log('runBuildError:', e);
      return false;
    }
  }

  async getLastModifyTime() {
    return lastModifyTime;
  }
}

module.exports = WatchService;
