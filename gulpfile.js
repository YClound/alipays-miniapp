const chalk = require('chalk');
const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const through = require('through2');
const gulp = require('gulp');
const { lastRun } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
// const imagemin = require('gulp-imagemin');
const jsonmin = require('gulp-jsonmin');
const less = require('gulp-less');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const revertPath = require('gulp-revert-path');
const readConfig = require('./script/read');
const { changeRoot, question } = require('./script/utils');
const miniProject = require('./mini.project.json');

const { NODE_ENV } = process.env;

const DevAPPJSONPath = path.resolve(__dirname, './dev/app.json');

const paths = {
  axmls:
    NODE_ENV === 'prod'
      ? ['src/**/*.axml', '!src/pages/demo/*.*']
      : 'src/**/*.axml',
  assets:
    NODE_ENV === 'prod'
      ? ['src/**/*.{png,jpg,jpeg,gif,svg}', '!src/pages/demo/*.*']
      : 'src/**/*.{png,jpg,jpeg,gif,svg}',
  jsons:
    NODE_ENV === 'prod'
      ? ['src/**/*.json', '!src/pages/demo/*.*']
      : 'src/**/*.json',
  scripts:
    NODE_ENV === 'prod'
      ? ['src/**/*.{js,sjs}', '!src/pages/demo/*.*']
      : 'src/**/*.{js,sjs}',
  styles:
    NODE_ENV === 'prod'
      ? ['src/**/*.{acss,less}', '!src/pages/demo/*.*']
      : 'src/**/*.{acss,less}',
  dest: NODE_ENV === 'prod' ? 'dist/' : 'dev/',
};

const change = async () => {
  const root = NODE_ENV === 'dev' ? 'dev' : 'dist';
  const currentRoot = miniProject.miniprogramRoot;

  if (currentRoot === root) return;

  const answer = await question(
    `检测到当前小程序根目录为 ${chalk.yellow(
      currentRoot
    )} 是否切换到 ${chalk.yellow(root)}（y/n）: `
  );

  if (['yes', 'y'].includes(answer.toLowerCase())) {
    await changeRoot(root);
  }
};

const clean = async () => {
  const [devOutput, prodOutput, assetsDir] = await readConfig([
    'devOutput',
    'prodOutput',
    'assetsDir',
  ]);
  const delPatterns =
    NODE_ENV === 'prod'
      ? [`${prodOutput}/**`, `!${prodOutput}/${assetsDir}`]
      : [devOutput];
  return del(delPatterns);
};

const addDemoPath = async () => {
  if (NODE_ENV === 'prod') return;

  if (fs.existsSync(DevAPPJSONPath)) {
    fs.readJson(DevAPPJSONPath).then(config => {
      // config.pages.push('pages/demo/index');
      return fs.writeJSON(DevAPPJSONPath, config, { spaces: 2 });
    });
  }
};

function axmls(useSince = true) {
  return gulp
    .src(paths.axmls, useSince ? { since: lastRun(axmls) } : undefined)
    .pipe(gulp.dest(paths.dest));
}

function assets(useSince = true) {
  return (
    gulp
      .src(paths.assets, useSince ? { since: lastRun(assets) } : undefined)
      // .pipe(gulpIf(NODE_ENV === 'prod', newer(paths.dest)))
      // .pipe(gulpIf(NODE_ENV === 'prod', imagemin()))
      .pipe(gulp.dest(paths.dest))
  );
}

function jsons(useSince = true) {
  return gulp
    .src(paths.jsons, useSince ? { since: lastRun(jsons) } : undefined)
    .pipe(gulpIf(NODE_ENV === 'prod', jsonmin()))
    .pipe(gulp.dest(paths.dest))
    .pipe(
      gulpIf(
        ({ path }) => path === DevAPPJSONPath && NODE_ENV !== 'prod',
        through.obj((file, enc, cb) => addDemoPath().then(() => cb(null, file)))
      )
    );
}

function scripts(useSince = true) {
  return (
    gulp
      .src(paths.scripts, useSince ? { since: lastRun(scripts) } : undefined)
      // .pipe(
      //   babel({
      //     plugins: [
      //       '@babel/plugin-proposal-optional-chaining',
      //       '@babel/plugin-proposal-nullish-coalescing-operator',
      //       '@babel/plugin-proposal-logical-assignment-operators',
      //     ],
      //   })
      // )
      // .pipe(revertPath())
      .pipe(gulp.dest(paths.dest))
  );
}

function styles(useSince = true) {
  return gulp
    .src(paths.styles, useSince ? { since: lastRun(styles) } : undefined)
    .pipe(gulpIf(({ extname }) => extname === '.less', less()))
    .pipe(gulpIf(NODE_ENV === 'prod', cleanCSS()))
    .pipe(rename({ extname: '.acss' }))
    .pipe(gulp.dest(paths.dest));
}

const build = gulp.series(
  change,
  clean,
  gulp.parallel(axmls, assets, jsons, scripts, styles)
);

const watch = gulp.series(build, function gulpWatch(done) {
  gulp.watch(paths.axmls, axmls).on('add', () => axmls(false));
  gulp.watch(paths.assets, assets).on('add', () => assets(false));
  gulp.watch(paths.jsons, jsons).on('add', () => jsons(false));
  gulp.watch(paths.scripts, scripts).on('add', () => scripts(false));
  gulp.watch(paths.styles, styles).on('add', () => styles(false));

  done();
});

exports.clean = clean;
exports.watch = watch;
exports.build = build;

exports.default = build;
