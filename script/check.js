const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

const SrcPath = 'src';
const AppJSON = path.resolve(__dirname, `../${SrcPath}/app.json`);

async function check() {
  if (fs.existsSync(AppJSON)) {
    const { pages } = await fs.readJson(AppJSON);

    if (Array.isArray(pages)) {
      await Promise.all(
        pages.map(async page => {
          const pagePath = path.resolve(__dirname, `../${SrcPath}/${page}`);
          const [json, axmlBuffer] = await Promise.all([
            fs.readJson(`${pagePath}.json`),
            fs.readFile(`${pagePath}.axml`),
          ]);
          const { usingComponents } = json;

          if (!usingComponents) return;

          Reflect.ownKeys(usingComponents).forEach(component => {
            if (!new RegExp(`<${component}[\\s>]`).test(axmlBuffer.toString())) {
              console.log(
                `页面 ${chalk.yellow(page)} 中, 组件 ${chalk.yellow(
                  component
                )} 未被使用`
              );
            }
          });
        })
      );
    }

    console.log(`${chalk.green('✔')} 检查结束`);
  } else {
    console.log('app.json 不存在，请检查文件目录是否正确');
  }
}

(async () => await check())();
