---
title: vue-cli3
date: 2019-06-29 10:46:43
tags:
---

### this指向
```
window.val = 1;
var obj = {
    val: 2,
    getVal: function () {
        this.val *= 2;
        val *= 2;
        console.log(val);
        console.log(this.val);
    },
    prop: {
        getVal: function() {
            return this.val
        }
    },
};
// 说出下面的输出结果
obj.getVal();

var func = obj.getVal;
func();

obj.prop.getVal();
```


```
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    } 
};

// 说出下面的输出结果
object.getNameFunc()()
```

```
var obj = {
  bar: function() {
    var x = () => this;
    return x;
  }
};

// 说出下面的输出结果
var fn = obj.bar();
console.log(fn() === obj);

var fn2 = obj.bar;
console.log(fn2()() === obj);
```
   
`ES6: `
* 1.this 指向定义时的对象，而不是使用时所在的对象; 
* 2.不能作为构造函数,不能用new，否则会抛出一个错误. 
* 3.不能使用arauments对象，不过可以使用rest参数. 
* 4.不能使用yeild命令，因此箭头函数不能用做Generator函数.
* 5.箭头函数用call()或者apply()或bind()调用箭头函数时，无法对this进行绑定

`ES5: `
* 1.一般而言，this指向调用该函数的对象.   
* 2.Function.prototype 的 call 或 apply 方法将this值绑定到调用中的特定对象.
* 3.bind()会创建一个具有相同函数体和作用域的函数,this将永久地被绑定到了bind的第一个参数.   
* 4.当一个函数用作构造函数时(使用new关键字), 它的this被绑定到正在构造的新对象.虽然构造器返回的默认值是this所指的那个对象，但它仍可以手动返回其他的对象(如果返回值不是一个对象,则返回this对象),该对象将是 new 表达式的结果.  
* 5、匿名函数的执行环境具有全局性

### vue-cli3 
vue-cli3 与 2 一样, CLI 服务是构建于 webpack 和 webpack-dev-server 之上的, cli3项目内部的 vue-cli-service 插件,提供 serve、build 和 inspect 命令.
package.json
```
vue-cli-service serve     // 启动一个附带模块热重载的开发服务器
vue-cli-service build     // 会在 dist/ 目录产生一个可用于生产环境的包
vue-cli-service inspect   // 审查一个 Vue CLI 项目的 webpack config
```

### 快速原型开发
vue cli3 提供 `vue serve` 和 `vue build` 命令对单个 *.vue/js 文件进行快速原型开发.不过这需要先额外安装一个全局的扩展:
```
npm install -g @vue/cli-service-global
```


### 图形化界面
vue-cli3 通过命令`vue create xx`来创建一个项目. 当然,你也可以通过 vue ui 命令以图形化界面创建和管理项目:
```
vue ui
```
![management](/images/工程/vue_cli3/management.png)

通过vue ui 管理项目: 
![dashboard](/images/工程/vue_cli3/dashboard.png)


### vue-cli 3 与 2的区别
* vue-cli 3 的 github 仓库由原有独立的 github 仓库迁移到了 vue 项目下
* vue-cli 3 的项目架构完全抛弃了 vue-cli 2 的原有架构，3 的设计更加抽象和简洁
* vue-cli 3 是基于 webpack 4 打造，vue-cli 2 还是 webapck 3
* vue-cli 3 的设计原则是“0配置”
* vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化

vue-cli3 构建的项目,没有了以前熟悉的 build 目录，也就没有了 webpack.base.config.js、webpack.dev.config.js 、webpack.prod.config.js 等配置文件.

那vue-cli3如何配置自定义webpack呢？ 


### vue.config.js
#### 简单的配置方式
```
module.exports = {
  configureWebpack: {
    output: {
      ...
    }
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```
该对象将会被 webpack-merge 合并入最终的 webpack 配置

#### 链式操作(高级)
Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的(`需要熟悉 webpack-chain 的 API`)
例如添加一个loader:
```
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
  }
}
```