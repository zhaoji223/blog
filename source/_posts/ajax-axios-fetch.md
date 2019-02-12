---
title: ajax-axios-fetch
date: 2019-02-11 18:09:05
tags: ajax
---

### ajax
`ajax` 指的是 XMLHttpRequest(XHR), 最早出现的发送后端请求技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后关系的话，就会出现回调地狱。
<br>

##### jq ajax
`$.ajax`是对原生XHR的封装, 为了达到我们跨越的目的, 增添了对JSONP的支持. 经过这么多年的更新维护，不得不承认它已经很成熟，能够满足我们的基本需求，但是随着react,vue新一代框架的兴起，以及ES规范的完善，更多API的更新，它逐渐暴露了自己的不足
```
针对MVC的编程设计,不符合现在前端MVVM的趋势.
基于原生的XHR开发，XHR本身的架构不够清晰.
JQuery较大，单纯使用ajax却要引入整个JQuery非常的不合理.
```
<br>

### fetch
`fetch`是AJAX的替代品,是在ES6出现的，使用了ES6中的promise对象. 但fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象

##### fetch 优点
参考: [传统ajax意思, fetch永生](https://github.com/camsong/blog/issues/2)
```
语法简洁，更加语义化
基于标准 Promise 实现，支持 async/await
同构方便，使用 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)等
```

但是在使用fetch的时候，也会遇到了一些问题：
```
fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
fetch默认不会带cookie，需要添加配置项fetch(url, {credentials: 'include'})
fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时
所有版本的 IE 均不支持原生 Fetch，fetch-ie8 会自动使用 XHR 做 polyfill.
fetch没有办法原生监测请求的进度，而XHR可以.
```
<br>

### axiox
`axios` 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征:

```
从浏览器中创建 XMLHttpRequest
从 node.js 发出 http 请求
支持 Promise API
拦截请求和响应
转换请求和响应数据
取消请求
自动转换JSON数据
客户端支持防止CSRF/XSRF
```

这个支持防止CSRF其实挺好玩的，是怎么做到的呢，就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。

Axios既提供了并发的封装，也没有下文会提到的fetch的各种问题，而且体积也较小，当之无愧现在最应该选用的请求的方式。

虽然axios不支持jsonp，但是可以通过引入jsonp模块来解决.
