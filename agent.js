/**
 * Created by Lucas on 2020/9/11.
 */
'use strict';
const { watchPath } = require('./app/utils/common');
const chokidar = require('chokidar');

module.exports = agent => {
  // 在这里写你的初始化逻辑

  // 也可以通过 messenger 对象发送消息给 App Worker
  // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
  agent.messenger.on('egg-ready', () => {
    chokidar.watch(watchPath, {
      ignored: /node_modules/,
      ignoreInitial: true,
    })
      .on('all', async (event, path) => {
        console.log('监听到文件改变：', event, path, String(new Date()));
        agent.messenger.sendRandom('watch_file_change');
      });
  });
};
