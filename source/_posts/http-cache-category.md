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
