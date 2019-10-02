---
title: http-cross-domain
date: 2018-08-01 15:55:01
tags: [http, cross domain]
---

## 同源策略
同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源

同源策略控制了不同源之间的交互，例如在使用`XMLHttpRequest` 或 `<img>` 标签时则会受到同源策略的约束
<br>

同源策略限制以下几种行为：
**1.) Cookie、LocalStorage 和 IndexDB 无法读取**
**2.) DOM 和 Js对象无法获得**
**3.) AJAX 请求不能发送**

#### 常见跨域场景
![cross domain](http://pyqqincie.bkt.clouddn.com/cross-domain.png)

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
jquery在处理jsonp类型的ajax时, (虽然jquery也把jsonp归入了ajax，但其实它们真的不是一回事儿), 自动帮你生成回调函数并把数据取出来供success属性方法来调用
```
$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "onBack",    // 自定义回调函数名
    data: {}
});
```

后端node.js代码示例:
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
简单请求 / 非简单(复杂)请求

复杂请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求

#### 代理跨域
如果我们请求的时候还是用前端的域名，然后有个东西帮我们把这个请求转发到真正的后端域名上，不就避免跨域了吗

Nginx代理
Nodejs中间件代理跨域
node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发

#### window.postMessage() 
window.postMessage() 方法可以安全地实现跨源通信
<br>

### 总结
```
CORS 支持所有类型的 HTTP 请求，是跨域 HTTP 请求的根本解决方案
JSONP 只支持 GET 请求，JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。
不管是 Node 中间件代理还是 nginx 反向代理，主要是通过同源策略对服务器不加限制。
日常工作中，用得比较多的跨域方案是 cors 和 nginx 反向代理
```

