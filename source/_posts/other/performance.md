---
title: performance
date: 2019-07-08 10:40:26
tags: other
---

### Performance
关于前端性能指标，W3C 定义了强大的 Performance API，其中又包括了 High Resolution Time 、 Frame Timing 、 Navigation Timing 、 Performance Timeline 、Resource Timing 、 User Timing 等诸多具体标准。

### Performance Timing
PerformanceTiming能够帮助网站开发者检测真实用户数据（RUM），例如带宽、延迟或主页的整体页面加载时间。用法如下：

```javascript
var timinhObj = performance.timing;
```

#### Performance 对象详解
![performance timing](/images/other/performance.jpeg)
```javascript
// 获取 performance 数据
var performance = {  
    // memory 是非标准属性，只在 Chrome 有
    // 财富问题：我有多少内存
    memory: {
        usedJSHeapSize:  16100000, // JS 对象（包括V8引擎内部对象）占用的内存，一定小于 totalJSHeapSize
        totalJSHeapSize: 35100000, // 可使用的内存
        jsHeapSizeLimit: 793000000 // 内存大小限制
    },
    //  哲学问题：我从哪里来？
    navigation: {
        redirectCount: 0, // 如果有重定向的话，页面通过几次重定向跳转而来
        type: 0           // 0   即 TYPE_NAVIGATENEXT 正常进入的页面（非刷新、非重定向等）
                          // 1   即 TYPE_RELOAD       通过 window.location.reload() 刷新的页面
                          // 2   即 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
                          // 255 即 TYPE_UNDEFINED    非以上方式进入的页面
    },
    timing: {
        // 准备加载新页面的起始时间
        navigationStart: 1441112691935,
 
        // 前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0
        unloadEventStart: 0,
 
        // 和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳
        unloadEventEnd: 0,
 
        // 第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0 
        redirectStart: 0,
 
        // 最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0 
        redirectEnd: 0,
 
        // 浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前
        fetchStart: 1441112692155,
 
        // DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupStart: 1441112692155,
 
        // DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
        domainLookupEnd: 1441112692155,
 
        // HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等
        // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间
        connectStart: 1441112692155,
 
        // HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等
        // 注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间
        // 注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过
        connectEnd: 1441112692155,
 
        // HTTPS 连接开始的时间，如果不是安全连接，则值为 0
        secureConnectionStart: 0,
 
        // HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存
        // 连接错误重连时，这里显示的也是新建立连接的时间
        requestStart: 1441112692158,
 
        // HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
        responseStart: 1441112692686,
 
        // HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
        responseEnd: 1441112692687,
 
        // 开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件
        domLoading: 1441112692690,
 
        // 完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件
        // 注意只是 DOM 树解析完成，这时候并没有开始加载网页内的资源
        domInteractive: 1441112693093,
 
        // DOM 解析完成后，网页内资源加载开始的时间
        // 在 DOMContentLoaded 事件抛出前发生
        domContentLoadedEventStart: 1441112693093,
 
        // DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕）
        domContentLoadedEventEnd: 1441112693101,
 
        // DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件
        domComplete: 1441112693214,
 
        // 文档触发load事件的时间。如果load事件没有触发，那么该接口就返回0
        loadEventStart: 1441112693214,
 
        // 文档触发load事件结束后的时间。如果load事件没有触发，那么该接口就返回0
        loadEventEnd: 1441112693215
    }
};
```

### Performance Timing中一些常用的计算
DNS查询耗时 ：domainLookupEnd - domainLookupStart
TCP链接耗时 ：connectEnd - connectStart
request请求耗时 ：responseEnd - responseStart
解析dom树耗时 ： domComplete - domInteractive //解析 DOM 树结构的时间
白屏时间 ：responseStart - navigationStart // 读取页面第一个字节的时间
domready时间(用户可操作时间节点) ：domContentLoadedEventEnd - navigationStart
onload时间(总下载时间) ：loadEventEnd - navigationStart

页面的性能指标详解：
白屏时间（first Paint Time）: 用户从打开页面开始到页面开始有东西呈现为止
首屏时间: 用户浏览器首屏内所有内容都呈现出来所花费的时间
用户可操作时间(dom Interactive): 用户可以进行正常的点击、输入等操作，默认可以统计domready时间，因为通常会在这时候绑定事件操作
总下载时间: 页面所有资源都加载完成并呈现出来所花的时间，即页面 onload 的时间


### Resource Timing
浏览器获取网页时，会对网页中每一个静态资源（脚本文件、样式表、图片文件等等）发出一个HTTP请求。Resource Timing可以获取到单个静态资源从开始发出请求到获取响应之间各个阶段的Timing

```javascript
var resourcesObj = performance.getEntries();

var entry = {  
    // 资源名称，也是资源的绝对路径
    name: "http://cdn.alloyteam.com/wp-content/themes/alloyteam/style.css",
    // 资源类型
    entryType: "resource",
    // 谁发起的请求
    initiatorType: "link", // link 即 <link> 标签
                           // script 即 <script>
                           // redirect 即重定向
    // 加载时间
    duration: 18.13399999809917,
    
    // 剩余部分内容含义参考 Performance Timing
    ... 
};

```


### performance.now() 精确计算程序执行时间
performance.now() 与 Date.now() 不同的是，返回了以微秒（百万分之一秒）为单位的时间，更加精准。
并且与 Date.now() 会受系统程序执行阻塞的影响不同，performance.now() 的时间是以恒定速率递增的，不受系统时间的影响（系统时间可被人为或软件调整）。
注意 Date.now() 输出的是 UNIX 时间，即距离 1970 的时间，而 performance.now() 输出的是相对于 performance.timing.navigationStart(页面初始化) 的时间。
使用 Date.now() 的差值并非绝对精确，因为计算时间时受系统限制（可能阻塞）。但使用 performance.now() 的差值，并不影响我们计算程序执行的精确时间。
```javascript
// 计算程序执行的精确时间
function getFunctionTimeWithDate (func) {  
    var timeStart = Data.now();
    // 执行开始
    func();
    // 执行结束
    var timeEnd = Data.now();
    // 返回执行时间
    return (timeEnd - timeStart);
}
function getFunctionTimeWithPerformance (func) {  
    var timeStart = window.performance.now();
    // 执行开始
    func();
    // 执行结束
    var timeEnd = window.performance.now();
    // 返回执行时间
    return (timeEnd - timeStart);
}
```