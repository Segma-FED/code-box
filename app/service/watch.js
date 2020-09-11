/**
 * Created by Lucas on 2020/9/3.
 * 监听文件变化
 */
'use strict';
const Service = require('egg').Service;
const { exec } = require('child_process');
const _debounce = require('lodash/debounce');
const { runBuildPath, buildScript } = require('../utils/common');
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
