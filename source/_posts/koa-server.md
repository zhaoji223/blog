---
title: koa-server
date: 2019-03-21 10:31:51
tags: koa node server
---

### koa server

``` javascript
const Koa = require('koa'); // koa2
const send = require('koa-send') // 获取 静态文件
const proxy = require('koa-proxies') // 代理
const https = require('https'); // 启动https server
var fs = require('fs');
// https server 启动时需要证书
ar privateKey  = fs.readFileSync('cert.pem');
var certificate = fs.readFileSync('cert.pem');
var credentials = {key: privateKey, cert: certificate};

pp.use(async (ctx, next) => {
    console.log(ctx.path)
    // 设置 默认index.html, 当访问资源不是静态资源时(接口请求), 走代理服务器, 避免跨域问题
    if(ctx.url == '/') {
        await send(ctx, ctx.path, {root: __dirname + '/../static/html/v8/sem/baidu/index.html'})
    } else if(ctx.url.split('?')[0].includes('.')) {
        await send(ctx, ctx.path, {root: __dirname + '/../static'})
    } else {
        await next()
    }
});

app.use(proxy('', {
    target: 'https://gateway.qschou.com/v3.0.0/',
    changeOrigin: true,
    // agent: new httpsProxyAgent('https://gateway.qschou.com'),
    rewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx'),
    logs: true
}))

https.createServer(credentials, app.callback()).listen(443);
console.log('listen 443')
```

#### koa server 注意事项 (No Host, No Nginx)

1、 https 页面的访问需要 证书(`CA认证过`), 自签发的证书在chrome中 会显示 `不安全` 提示, 访问页面时需要手动动过. `但是在 微信H5 中, 未认证的https页面会只显示白屏`
所以, 移动端通过https://192.168.xx 访问 方案 需要通过`http server` 来替代，避免 微信白屏现象。但是一般的页面都是https, 所以http server 也存在瑕疵

2、 通过`ngrok` 生成一个经过CA验证的 https://xxx.io 域名，代理到我们本地的 https server， 因为访问的是 CA验证的 域名，所有在 微爱H5中可以正常访问。 `但是 https server 中设置的 proxy 失效，不能通过代理访问 正常访问 接口`

#### koa server 注意事项 ( Host, No Nginx)

通过设置 host 指向: `127.0.0.1  m2.xxx.com`,  访问指定域名， ACAO headers 中因为已 允许来自该域的访问，所以不用通过proxy 代理来 避免 跨域问题CORS

移动端需要通过代理工具(例如 charles), 来代理到PC 访问页面


### 小米手机 设置代理
小米通过自带的浏览器打开chls.pro/ssl下载证书文件，无法安装，提示“没有可安装的证书”。 `是因为小米手机默认开启了迅雷下载引擎，导致下载的证书文件内容不正确，所以无法安装`
#### 解决办法
在【下载管理】中关闭迅雷引擎重新下载证书，安装即可
#### 注意事项
在【下载管理】中直接点击打开，即使证书格式正确也无法安装。遇到这种情况可以在【文件管理器】中Download目录下找到该文件，点击安装

### Charles 设置
1、打开Charles设置 Charles的 proxy setting, 设置端口号. 例如: 8888
2、在SSL Proxying Setting 中, 设置允许 host: *, port: 443 的访问
3、手机 下载chrls 证书: chls.pro/ssl
4、设置手机网络与PC为统一网络, 手机代理设置为PC IP, port: 8888. 然后访问dev环境即可


