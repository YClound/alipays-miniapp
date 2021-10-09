const fs = require('fs-extra');
const readLine = require('readline');
const path = require('path');
const MiniProjectPath = path.resolve(__dirname, '../mini.project.json');
const DistPath = path.resolve(__dirname, '../dist');

async function changeRoot(path) {
  if (fs.existsSync(MiniProjectPath)) {
    fs.readJson(MiniProjectPath).then(config => {
      if (config.miniprogramRoot === path) return;
      config.miniprogramRoot = path;
      return fs.writeJSON(MiniProjectPath, config, { spaces: 2 });
    });
  } else {
    const config = { miniprogramRoot: path };
    return fs.writeJSON(MiniProjectPath, config, { spaces: 2 });
  }
}

async function question(text) {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve =>
    rl.question(text, answer => {
      resolve(answer);
      rl.close();
    })
  );
}

async function getFolderSize() {
  const fileSizes = new Map();

  async function processFile(filePath) {
    const stat = await fs.lstat(filePath);

    fileSizes.set(stat.ino, stat.size);

    if (stat.isDirectory()) {
      const directoryPaths = await fs.readdir(filePath);

      await Promise.all(
        directoryPaths.map(directoryPath =>
          processFile(path.join(filePath, directoryPath))
        )
      );
    }
  }

  await processFile(DistPath);

  const folderSize = Array.from(fileSizes.values()).reduce(
    (total, fileSize) => total + fileSize,
    0
  );

  return folderSize;
}

exports.changeRoot = changeRoot;
exports.question = question;
exports.getFolderSize = getFolderSize;
