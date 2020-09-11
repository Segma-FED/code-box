/**
 * Created by Lucas on 2020/9/11.
 * 参考文档：https://eggjs.org/zh-cn/core/cluster-and-ipc.html
 */
'use strict';
const { watchPath, runBuildPath, buildScript } = require('./app/utils/common');
const chokidar = require('chokidar');
const _debounce = require('lodash/debounce');
const { exec } = require('child_process');

module.exports = agent => {
  agent.messenger.on('egg-ready', () => {
    /**
     * 运行构建与防抖
     * */
    const _runBuild = _debounce(() => {
      console.log('执行构建。。。', String(new Date()));
      exec(buildScript, { cwd: runBuildPath }, err => {
        if (err) {
          console.error('runBuildFail:', err);
        }
        agent.messenger.sendToApp('set_last_modify_time', new Date().getTime());
      });
    }, 2000, { leading: true });

    /**
     * 监听文件
     * */
    chokidar.watch(watchPath, {
      ignored: /node_modules/,
      ignoreInitial: true,
    })
      .on('all', async (event, path) => {
        console.log('监听到文件改变：', event, path, String(new Date()));
        _runBuild();
      });

    /**
     * 监听构建请求
     * */
    agent.messenger.on('run_build', () => {
      console.log('run_build');
      _runBuild();
    });
  });
};
