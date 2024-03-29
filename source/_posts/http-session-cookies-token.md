---
title: Session Cookies Token
date: 2018-07-27 10:09:46
tags: [http]
---
### Cookie
首先我们来看一下浏览器中的cookie是如何工作的。
每当浏览器向服务器发起http请求的时候，都会检查本地是否有相应的cookie，如果有则添加到请求头中一起发送到服务器端。由此可以看出cookie适合存储那些每次都要发给服务端的内容，比如身份信息,token等。

![cookie](http://pyqqincie.bkt.clouddn.com/cookie.png)

Name列是cookie的名字；Value列是cookie的值；Domain列是cookie的域；Path列是cookie的路径；Expires/Max-Age列是cookie的有效期；Size列是cookie大小；Http列是控制cookie只能通过http请求的方式访问；Secure列控制cookie只能在https下才被发送；SameSite列是限制cookie在不同站点之间是否被传递的，用的比较少。

domain和path组合在一起来控制cookie可以被发送到哪些URL地址。当URL的域名是domain或者其子域名并且路径是path或者其子路径时，请求该URL就会携带cookie信息。
浏览器发出请求时，会根据cookie的domain和path属性确定是否传送cookie信息。
举个例子：假设cookie的domain属性设置为.abc.def，path属性设置为/，那么当访问book.abc.def/novel或者music.abc.def或者abc.def/movie的时候都会携带该cookie信息。domain的默认值是当前网页的域名，path的默认值是当前网页的路径。

expires和max-age都可以设置cookie的有效期

HttpOnly属性限制cookie只能通过http请求的方式访问，而不能通过本地js访问(document.cookie获取不到)，可以防止js修改cookie的内容

### session和cookie
由于HTTP协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识具体的用户，这个机制就是Session.典型的场景比如购物车，当你点击下单按钮时，由于HTTP协议无状态，所以并不知道是哪个用户操作的，所以服务端要为特定的用户创建了特定的Session，用用于标识这个用户，并且跟踪用户，这样才知道购物车里面有几本书。这个Session是保存在服务端的，有一个唯一标识。在服务端保存Session的方法很多，内存、数据库、文件都有。集群的时候也要考虑Session的转移，在大型的网站，一般会有专门的Session服务器集群，用来保存用户会话，这个时候 Session 信息都是放在内存的，使用一些缓存服务比如Memcached之类的来放 Session。
思考一下服务端如何识别特定的客户？这个时候Cookie就登场了。每次HTTP请求的时候，客户端都会发送相应的Cookie信息到服务端。实际上大多数的应用都是用 Cookie 来实现Session跟踪的，第一次创建Session的时候，服务端会在HTTP协议中告诉客户端，需要在 Cookie 里面记录一个Session ID，以后每次请求把这个会话ID发送到服务器，我就知道你是谁了。有人问，如果客户端的浏览器禁用了 Cookie 怎么办？一般这种情况下，会使用一种叫做URL重写的技术来进行会话跟踪，即每次HTTP交互，URL后面都会被附加上一个诸如 sid=xxxxx 这样的参数，服务端据此来识别用户。
Cookie其实还可以用在一些方便用户的场景下，设想你某次登陆过一个网站，下次登录的时候不想再次输入账号了，怎么办？这个信息可以写到Cookie里面，访问网站的时候，网站页面的脚本可以读取这个信息，就自动帮你把用户名给填了，能够方便一下用户。这也是Cookie名称的由来，给用户的一点甜头。
所以，总结一下：
Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；
Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现Session的一种方式

## token


为什么使用Token验证：

在Web领域基于Token的身份验证随处可见。在大多数使用Web API的互联网公司中，tokens 是多用户下处理认证的最佳方式。

以下几点特性会让你在程序中使用基于Token的身份验证

1.无状态、可扩展
2.支持移动设备
3.跨程序调用
4.安全
 
那些使用基于Token的身份验证的大佬们大部分你见到过的API和Web应用都使用tokens。例如Facebook, Twitter, Google+, GitHub等。


多站点使用
cookie绑定到单个域。foo.com域产生的cookie无法被bar.com域读取。使用token就没有这样的问题。这对于需要向多个服务获取授权的单页面应用程序尤其有用。

使用token，使得用从myapp.com获取的授权向myservice1.com和myservice2.com获取服务成为可能。

支持移动平台
好的API可以同时支持浏览器，iOS和Android等移动平台。然而，在移动平台上，cookie是不被支持的。

性能
一次网络往返时间（通过数据库查询session信息）总比做一次HMACSHA256计算的Token验证和解析要费时得多

#### token的认证流程

1、用户登录校验，校验成功后就返回Token给客户端。
2、客户端收到数据后保存在客户端
3、客户端每次访问API是携带Token到服务器端。
4、服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码

当然， 如果一个人的token 被别人偷走了， 那我也没办法， 我也会认为小偷就是合法用户， 这其实和一个人的session id 被别人偷走是一样的。

这样一来， 我就不保存session id 了， 我只是生成token , 然后验证token ，  我用我的CPU计算时间获取了我的session 存储空间 ！


#### 跨域请求设置withCredentials
一个项目下面有多个子项目，如主数据项目，pos项目等。主数据项目的域名为www.topmall.com，POS项目的域名为pos.topmall.com。即两个项目的主域名相同，子域名不相同。

我们的登陆认证是放在主数据项目的，即进入POS项目如果检测未登陆，是先要调用主数据的一个登陆接口登陆后才可以访问的。这时候跨域问题就出现了，进入POS项目之后跳出登陆框，输入用户名密码请求主数据的http://www.topmall.com/signin 进行登陆，看到返回的response里面也有Set-cookie，但是再次请求POS项目的http://pos.topmall.com/pos/cashier/info 资源时却报错了。调试进去看发现后台获取不到当前登陆的用户，查看请求头发现并没有把登陆时返回的cookies设置到第二次请求的头里面。

这是因为登陆请求的主数据项目与POS项目不属于同一个子域，即存在跨域，跨域请求想要带上cookies必须在请求头里面加上{crossDomain: true, xhrFields: {withCredentials: true}}设置