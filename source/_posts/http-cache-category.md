---
title: from disk/memory cache区别
date: 2018-07-18 22:15:35
tags: [http, cache]
---

## webkit 资源分类
webkit作为一个开源的浏览器引擎，其资源分类主要分为两大类: <font color=red>主资源</font> 和 <font color=red>派生资源</font>
<br>

#### http 状态码
<font font=5>**200 from memory cache**</font>
不访问服务器，直接读缓存，从内存中读取缓存。此时的数据时缓存到内存中的，当kill进程后，也就是浏览器关闭以后，数据将不存在。
但是这种方式只能缓存派生资源
<br>

<font font=5>**200 from disk cache**</font>
不访问服务器，直接读缓存，从磁盘中读取缓存，当kill进程时，数据还是存在。
这种方式也只能缓存派生资源
<br>

<font font=5>**304 Not Modified**</font>
访问服务器，发现数据没有更新，服务器返回此状态码。然后从缓存中读取数据。

#### 缓存寻找方式
 1. 先去内存看，如果有，直接加载
 2. 如果内存没有，择取硬盘获取，如果有直接加载
 3. 如果硬盘也没有，那么就进行网络请求
 4. 加载到的资源缓存到硬盘和内存
访问-> 200 -> 退出浏览器
再进来-> 200(from disk cache) -> 刷新 -> 200(from memory cache)

#### chrome采取措施的准则
![统计表](/images/http/cache/storage_category.png)

## FireFox 浏览器
以上的数据及统计都是在chrome浏览器下进行的
在Firefox下并没有from memory cache以及from disk cache的状态展现
相同的资源在chrome下是from disk/memory cache，但是Firefox统统是304状态码
即Firefox下会缓存资源，但是每次都会请求服务器对比当前缓存是否更改，chrome不请求服务器，直接拿过来用
这也是为啥chrome比较快的原因之一吧