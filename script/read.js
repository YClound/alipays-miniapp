const fs = require('fs-extra');
const path = require('path');

const ProjectConfigPath = path.resolve(__dirname, '../project.config.json');

async function readConfig(key) {
  if (fs.existsSync(ProjectConfigPath)) {
    const config = await fs.readJson(ProjectConfigPath);
    return getConfig(config, key);
  } else {
    return getConfig({}, key);
  }
}

function getConfig(config, key) {
  if (typeof key === 'string') return config[key];
  else if (Array.isArray(key)) return key.map(k => config[k]);
  else return config;
}

module.exports = readConfig;
