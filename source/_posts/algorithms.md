---
title: 常见数据结构与算法
date: 2019-04-19 09:54:40
tags: algorithms, data structure
---

### 数据结构
数据结构是计算机存储、组织数据的方式。数据结构是指相互之间存在一种或多种特定关系的数据元素的集合

### 常见数据结构
* 数组
* 栈
* 链表
* 队列
* 图
* 树
* 堆
* 哈希表


#### 1、数组
##### 数组的基本感念： 
* 数组是多个相同类型数据组合，对这些数据的统一管理(但在javascript中,也可以保存不同类型的值)
* 数组的元素可以是任何数据类型，包括基本类型`(JS基本数据类型: Undefined、Null、Boolean、Number、String、Symbol)`和 Object`(JS 引用类型: Object、Function、Array、RegExp、Date等)`
  `除 Object 以外的所有类型都是不可变的（值本身无法被改变). JavaScript 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变`
* 数组变量属引用类型


##### 补充回顾：JS判断各种数据类型方法
* 1、typeof
```
typeof   2                  => number
typeof   null               => object
typeof   {}                 => object
typeof   []                 => object
typeof   (function(){})     => function
typeof   undefined          => undefined
typeof   '222'              => string
typeof   true               => boolean
```
`typeof 对于Object、Array、Date等类型统一返回 'object'.`
`同时，typeof 无法区分 数组 和 null`
* 2、instanceof
```
[1,2,3] instanceof Array                            => true
new Date() instanceof Date                          => true
function(){this.name="22";} instanceof Function     => true
function(){this.name="22";} instanceof function     => false
123 instanceof Number                               => false
'123' instanceof String                             => false
new Number(123) instanceof Number                   => true
new String('123') instanceof String                 => true
```
`instanceof 只能用来判断两个对象是否属于实例关系，而不能判断一个对象实例具体属于哪种类型。`
`instanceof 后面一定要是对象类型，且大小写不能错`
`对于Number,String,Boolean 需要 new 对应的包装类型才能 == 为 true`

`除了 null 和 undefined之外，所有基本类型都有其对应的包装对象. String 为字符串基本类型。Number 为数值基本类型。Boolean 为布尔基本类型。Symbol 为字面量基本类型`

* 3、constructor
```
{}.constructor === Object;                  =>  true
[].constructor === Array;                   =>  true
'abcde'.constructor === String;             =>  true
(1).constructor === Number;                 =>  true
true.constructor === Boolean;               =>  true
function s(){}.constructor === Function;    =>  true
new Date().constructor === Date;            =>  true
new Array().constructor === Array;          =>  true
new Error().constructor === Error;          =>  true
document.constructor === HTMLDocument;      =>  true
window.constructor === Window;              =>  true
```
`constructor为对象对应的构造函数`
`null 和 undefined 是无效的对象，没有 constructor，因此无法通过这种方式来判断`
`Symbol是一个原始类型的值，不是对象，不能通过 constructor 判断`
`函数的 constructor 不稳定.当一个函数被定义时，JS 引擎会为其添加 prototype 原型，然后在 prototype 上添加一个 constructor 属性，并让其指向函数的引用。但函数的 prototype 被重写后，原有的 constructor 引用会丢失。再次新建一个次函数的实例后，其 constructor 指向的内容已发生改变`

* 4、Object.prototype.toString
```
Object.prototype.toString.call(new Date);           => [object Date]
Object.prototype.toString.call(new String);         => [object String]
Object.prototype.toString.call(Math                 => [object Math]
Object.prototype.toString.call(undefined            => [object Undefined]
Object.prototype.toString.call(null);               => [object Null] 
Object.prototype.toString.call('') ;                => [object String]
Object.prototype.toString.call(123) ;               => [object Number]
Object.prototype.toString.call(true) ;              => [object Boolean]
Object.prototype.toString.call(Symbol());           => [object Symbol]
Object.prototype.toString.call(new Function()) ;    => [object Function]
Object.prototype.toString.call(new Date()) ;        => [object Date]
Object.prototype.toString.call([]) ;                => [object Array]
Object.prototype.toString.call(new RegExp()) ;      => [object RegExp]
Object.prototype.toString.call(new Error()) ;       => [object Error]
Object.prototype.toString.call(document) ;          => [object HTMLDocument]
```
`toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，是一个字符串，其中 Xxx 就是对象的类型`



### 常见排序算法
* 冒泡排序
* 堆排序
* 快速排序
* 插入排序
* 选择排序
* 归并排序