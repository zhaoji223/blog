---
title: http-cross-domain
date: 2018-08-01 15:55:01
tags: [http, cross domain]
---

## 同源策略
同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源

同源策略限制以下几种行为：
**1.) Cookie、LocalStorage 和 IndexDB 无法读取**
**2.) DOM 和 Js对象无法获得**
**3.) AJAX 请求不能发送**

#### 常见跨域场景
![cross domain](/images/http/cross-domain/cross-domain.png)

## 跨域正确的打开方式

#### JSONP
通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信。

1.）原生实现：
```
 <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);

    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }
 </script>
 ```
服务端返回如下（返回时即执行全局函数）：

`onBack({"status": true, "user": "admin"})`

2.）jquery ajax：
```
$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "onBack",    // 自定义回调函数名
    data: {}
});
```
3.）vue.js：
```
this.$http.jsonp('http://www.domain2.com:8080/login', {
    params: {},
    jsonp: 'onBack'
}).then((res) => {
    console.log(res); 
})
```
后端node.js代码示例：
```
var querystring = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(fn + '(' + JSON.stringify(params) + ')');

    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```
<font color=red size=4>jsonp缺点：只能实现get一种请求。</font>

#### 跨域资源共享（CORS）
只服务端设置Access-Control-Allow-Origin即可，前端无须设置。

// TODO

简单请求 / 非简单请求

#### 代理跨域
如果我们请求的时候还是用前端的域名，然后有个东西帮我们把这个请求转发到真正的后端域名上，不就避免跨域了吗

Nginx代理
Nodejs中间件代理跨域
node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发

#### window.postMessage() 
window.postMessage() 方法可以安全地实现跨源通信

#### 跨域请求设置withCredentials
一个项目下面有多个子项目，如主数据项目，pos项目等。主数据项目的域名为www.topmall.com，POS项目的域名为pos.topmall.com。即两个项目的主域名相同，子域名不相同。

我们的登陆认证是放在主数据项目的，即进入POS项目如果检测未登陆，是先要调用主数据的一个登陆接口登陆后才可以访问的。这时候跨域问题就出现了，进入POS项目之后跳出登陆框，输入用户名密码请求主数据的http://www.topmall.com/signin 进行登陆，看到返回的response里面也有Set-cookie，但是再次请求POS项目的http://pos.topmall.com/pos/cashier/info 资源时却报错了。调试进去看发现后台获取不到当前登陆的用户，查看请求头发现并没有把登陆时返回的cookies设置到第二次请求的头里面。

这是因为登陆请求的主数据项目与POS项目不属于同一个子域，即存在跨域，跨域请求想要带上cookies必须在请求头里面加上{crossDomain: true, xhrFields: {withCredentials: true}}设置