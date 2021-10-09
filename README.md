## 起步

使用小程序 IDE 打开本项目时，可以直接打开项目根目录（而不是 `dev` 或 `dist` 目录），通过 `change:dev`、`change:prod` 命令切换小程序根目录

运行 `start`、`build:prod` 命令时，会自动检测当前 IDE 识别的目录是否和当前 `env` 一致，并提示更改。

## 命令

推荐使用 `yarn` 执行命令

```bash
$ yarn run start # 开发模式下，监听文件变更自动编译。dev 为输出目录
$ yarn run build:prod # 用于生产模式下，会压缩部分文件，相对耗时。dist 为输出目录

$ yarn run change:dev # 让 IDE 识别 dev 目录作为小程序根目录
$ yarn run change:prod # 让 IDE 识别 dist 目录作为小程序根目录

$ yarn run check # 检查页面中是否存在未引用组件
```

## custom-image 组件

推荐使用该组件替换原生 `image` 组件，可以使用 `width`、`height` 属性获取对应宽高图片资源，节省资源流耗

```html
<custom-image width="200" />
<custom-image width="200" height="200" />
```

warning tip: 尚不支持 `catchTap` 事件

传递 `extraData` 属性，可以在 `onTap` 等事件的第二个参数获取到

```html
<custom-image extraData="1" onTap="handleTap" />
```

```js
handleTap(e, extraData) {
  console.log(extraData) // 1
}
```

`dataset` 相关属性，可以通过事件对象获得（推荐使用 `extraData` 属性，实现相同逻辑）
```html
<custom-image data-a="1" data-b="2" onTap="handleTap" />
```

```js
handleTap(e) {
  console.log(e.target.dataset) // { a: '1', b: '2' }
}
```
