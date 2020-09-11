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
/**
 * 运行构建与防抖
 * */
const _runBuild = _debounce(() => {
  console.log('执行构建。。。', String(new Date()));
  exec(buildScript, { cwd: runBuildPath }, err => {
    if (err) {
      console.error('runBuildFail:', err);
    }
    lastModifyTime = new Date().getTime();
  });
}, 2000, { leading: true });


class WatchService extends Service {
  /**
   * 监听文件变化
   * */
  async startWatchFile() {
    lastModifyTime = new Date().getTime();
    chokidar.watch(watchPath, {
      ignored: /node_modules/,
      ignoreInitial: true,
    })
      .on('all', async (event, path) => {
        console.log('监听到文件改变：', event, path, String(new Date()));
        _runBuild();
      });
  }

  /**
   * 运行构建
   * */
  async runBuild() {
    _runBuild();
    return true;
  }

  async getLastModifyTime() {
    return lastModifyTime;
  }
}

module.exports = WatchService;
