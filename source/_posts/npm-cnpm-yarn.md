---
title: npm-cnpm-yarn
date: 2019-02-11 16:12:33
tags: npm
---

### npm
`npm` 就是 Node.js 官方的包管理工具
<br>

### cnpm
`cnpm` 就是淘宝的前端开发者开源的 Node.js 的包管理工具
<br>

### yarn
`yarn` 就是 Facebook 开源的 Node.js 包管理工具. 正如官方文档中写的, Yarn 是为了弥补 npm 的一些缺陷而出现的.
- npm install的时候巨慢。特别是新的项目拉下来要等半天，删除node_modules，重新install的时候依旧如此。
- 同一个项目，安装的时候无法保持一致性。由于package.json文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义

```
"5.0.3",
"~5.0.3",
"^5.0.3"
```
“5.0.3”表示安装指定的5.0.3版本, “～5.0.3”表示安装5.0.X中最新的版本, “^5.0.3”表示安装5.X.X中最新的版本. 这就麻烦了，常常会出现同一个项目, 有的同事是OK的, 有的同事会由于安装的版本不一致出现bug

##### yarn 优点
- 并行(加缓存)安装, 安装速度快
- 引入 yarn.lock 文件来管理依赖版本问题，保证每次安装一致；
- 更简洁的输出(命令语义化)
```
npm install === yarn 
npm install taco --save === yarn add taco
npm uninstall taco --save === yarn remove taco
npm install taco --save-dev === yarn add taco --dev
npm update --save === yarn upgrade
```

##### npm的未来: npm5.0
有了yarn的压力之后，npm做了一些类似的改进。
- 默认新增了类似yarn.lock的 package-lock.json.
- 安装自动添加 dependencies，不需手动书写-S参数
- 安装速度的提升