/**
 * Created by Lucas on 2020/9/1.
 */
'use strict';
const Service = require('egg').Service;
// const { getIPAddress } = require('../utils/common');

const getProject = () => {
  return [
    {
      name: '项目1',
    },
    {
      name: '项目2',
    },
    {
      name: '项目3',
    },
  ];
};
let currentProject = '';

class ProjectService extends Service {
  async getCurrentProject() {
    return currentProject;
  }

  async getProject() {
    const projects = await getProject();
    return projects.map(i => {
      const { name } = i;
      return {
        name,
        select: name === currentProject,
      };
    });
  }

  async updateProject(val) {
    currentProject = val;
    return true;
  }

  async getEditorUrl() {
    return `http://http://111.229.245.66:8080/?folder=/root/CODE/${currentProject}`;
  }

  async getPageUrl() {
    return 'http://http://111.229.245.66:8091/';
  }


}

module.exports = ProjectService;
