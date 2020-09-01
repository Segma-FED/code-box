/**
 * Created by Lucas on 2020/9/1.
 */
'use strict';

/**
 * 获取本机IP
 * */
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
};
