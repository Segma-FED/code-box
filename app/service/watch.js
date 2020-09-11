/**
 * Created by Lucas on 2020/9/3.
 * 监听文件变化
 */
'use strict';
const Service = require('egg').Service;
const { exec } = require('child_process');
const _debounce = require('lodash/debounce');
const fs = require('fs');
const { runBuildPath, buildScript } = require('../utils/common');
const setLastModifyTime = timestamp => {
  fs.writeFile('./last_modify_time.json', JSON.stringify({ lastModifyTime: timestamp }), function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('----------修改成功-------------');
    }
  });
};
/**
 * 运行构建与防抖
 * */
const _runBuild = _debounce(() => {
  console.log('执行构建。。。', String(new Date()));
  exec(buildScript, { cwd: runBuildPath }, err => {
    if (err) {
      console.error('runBuildFail:', err);
    }
    setLastModifyTime(new Date().getTime());
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
    const json = require('./last_modify_time.json');
    return json.lastModifyTime;
  }
}

module.exports = WatchService;
