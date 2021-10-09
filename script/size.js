const chalk = require('chalk');
const { getFolderSize } = require('./utils');

(async () => {
  const size = await getFolderSize();

  console.log(
    `dist 文件夹大小： ${chalk.yellow((size / 1024 / 1024).toFixed(2))} M`
  );
})();
