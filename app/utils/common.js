/**
 * Created by Lucas on 2020/9/1.
 */
'use strict';

/**
 * 获取本机IP
 * */
const path = require('path');
module.exports = {
  async getIPAddress() {
    const interfaces = require('os')
      .networkInterfaces();
    for (const devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  },
  // 需要监听变化的文件路径
  watchPath: path.resolve('/usr/src/node-app/watch-folder'),
  // 运行构建脚本路径
  runBuildPath: path.resolve('/usr/src/node-app/run-build-folder'),
  // 构建命令
  buildScript: './node_modules/.bin/vue-cli-service build --no-clean --mode development',
};
