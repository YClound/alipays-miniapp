const { changeRoot } = require('./utils');
const minimist = require('minimist');
const { root } = minimist(process.argv.slice(2));

(async () => await changeRoot(root))();

module.exports = changeRoot;
