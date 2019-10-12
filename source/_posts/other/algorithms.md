---
title: 常见数据结构与算法
date: 2019-04-19 09:54:40
tags: [algorithms, data structure, other]
---

### 数据结构
数据结构是计算机存储、组织数据的方式。数据结构是指相互之间存在一种或多种特定关系的数据元素的集合

### 常见数据结构
* 数组
* 栈
* 队列
* 链表
* 树
* 字典、散列表(哈希表)
* 图


#### 1、数组
##### 数组的基本感念： 
* 数组是多个相同类型数据组合，对这些数据的统一管理(`但在javascript中,也可以保存不同类型的值`)
* 数组的元素可以是任何数据类型，包括基本类型`(JS基本数据类型: Undefined、Null、Boolean、Number、String、Symbol)`和 Object`(JS 引用类型: Object、Function、Array、RegExp、Date等)`
  `除 Object 以外的所有类型都是不可变的（值本身无法被改变). JavaScript 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变`
* 数组变量属引用类型
* 在JavaScript中，数组是一个可以修改的对象。如果添加元素，它就会动态 增长。在C和Java等其他语言里，我们要决定数组的大小，想添加元素就要创建 一个全新的数组，不能简单地往其中添加所需的元素


##### 补充回顾：JS判断各种数据类型方法
* 1、操作符 typeof
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
    `instanceof  网页存在两个以上不同版本的 Array 构造函数.传入的数组与在第二个框架中原生创建的数组分别具有各自 不同的构造函数.  无法通过instanceof 判定`
    ```
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    xArray = window.frames[window.frames.length-1].Array;       
    var arr = new xArray("1","2","3","4","5");
    //这个写法IE下是不支持的，标准浏览器firefox，chrome下有
    
    console.log(arr);  // 打印出 ["1", "2", "3", "4", "5"]
    console.log(arr instanceof Array); // false 
    console.log(arr.constructor === Array); // false
    ```

* 3、constructor
```
({}).constructor === Object;                  =>  true
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
*  `== 类型转换`    
    使用==时，不同类型的值也可以被看作相等, 以下是不同类型的值用相等操作符比较后的结果
    ![类型转换](http://pyqqincie.bkt.clouddn.com/==.png)

    字符串、布尔值的类型转换 通过toNumber() 转换为数字
    对象 通过toPrimitive() 转换为 字符串或者数字
    `toNumber 对不同类型返回的结果如下:`
    ![toNumber](http://pyqqincie.bkt.clouddn.com/toNumber.png)
    `toPrimitive 对不同类型返回结果如下:`
    ![toPrimitive](http://pyqqincie.bkt.clouddn.com/toPrimitive.png)
    <br>
    首先我们看下面的代码会输出什么?
    `console.log('true' ? true : false)`
    那么这两行代码呢？
    `console.log('true' == true)`
    `console.log('true' == false)`
    `console.log(null == undefine)`

#### 2、栈
##### 栈的基本概念
栈是一种遵从后进先出(LIFO)原则的有序集合。新添加的或待删除的元素都保存在栈的
同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底

##### 使用数组实现数据结构 栈
```
function Stack() { 
    //各种属性和方法的声明
    let items = [];
    // 向栈添加元素
    this.push = function(element) {
        items.push(element);
    };
    // 从栈移除元素
    this.pop = function() {
        return items.pop();
    };
    // 查看栈顶元素
    this.peek = function(){
        return items[items.length - 1];
    };
    // 检查栈是否为空
    this.isEmpty = function(){
        return items.length == 0;
    };
    // 清空栈元素
    this.clear = function(){
        items = [];
    };
    // 打印栈元素
    this.print = function(){
        console.log(items.toString());
    };
}
```
<br>
##### ES6写法
```
class Stack {
    constructor () {
        this.items = [];
    }
    push(element){
        this.items.push(element);
    }
    // 其他方法 
}
```
ES6写法尽管代码看起来更简洁、更漂亮，但变量items却是公共的。ES6的类是基于原型的。虽然基于原型的类比基于函数的类更节省内存，也更适合创建多个实例，却不能够声明私有属性(变量) 或方法。`1、优化需要在类外声明一个变量，并把类与变量整体用闭包包起来. 2、ES6 私有属性提案this.#items 来替代 this.items`

#### 3、队列
##### 队列的基本概念
队列（queue）是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。队列中没有元素时，称为空队列

##### 使用数组实现数据结构 队列
```
function Queue() { 
    // 各种属性和方法的声明
    let items = [];
    // 从队列移除元素
    this.dequeue = function(){
        return items.shift();
    };
    // 其他方法 
}
```
`Queue类和Stack类非常类似，只是添加和移除元素的原则不同. 移除元素使用 .shift(), 查看队列第一个元素是items[0]`
<br>
##### 优先队列
```
function PriorityQueue() {
    let items = [];
    // 要向PriorityQueue添加元素，需要创建一个特殊的包含需要添加的元素与优先级的元素
    function QueueElement (element, priority){ 
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function(element, priority){
        let queueElement = new QueueElement(element, priority);
        let added = false;
        for (let i=0; i<items.length; i++){
            // 如果队列为空，可以直接将元素入列
            if (queueElement.priority < items[i].priority){ 
                // 一旦找到priority值更大的元素，就插入新元素
                items.splice(i,0,queueElement); 
                added = true;
                // 终止队列循环
                break; 
            } 
        }
        if (!added){
            // 添加元素的priority值大于任何已有的元素，把它添加到队列的末尾就行了
            items.push(queueElement); 
        } 
    };
    this.print = function(){
        for (let i=0; i<items.length; i++){
            console.log(`${items[i].element} - ${items[i].priority}`);
        }
    };
    //其他方法和默认的Queue实现相同 
}
```
<br>

##### JavaScript 任务队列
当我们在浏览器中打开新标签时，就会创建一个任务队列。这是因为每个标签都是单线程处 理所有的任务，它被称为`事件循环`。浏览器要负责多个任务，如渲染HTML，执行JavaScript代码， 处理用户交互(用户输入、鼠标点击等)，执行和处理异步请求


#### 4、链表
##### 链表的基本概念
链表存储有序的元素集合(`链表表示的元素的有序并不一定是值得有序，而是逻辑次序上的有序`)，但不同于数组，链表中的元素在内存中并不是连续放置的。每个 元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成
![linked list](http://pyqqincie.bkt.clouddn.com/linkedList.png)
`相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。数组的另一个细节是可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，需要从起点(表头)开始迭代列表直到找到 所需的元素`
`列表最后一个节点的下一个元素始终是null`

##### JS实现链表 LinkedList的骨架
```
function LinkedList() {
    // Node类表示要加入列表的项
    let Node = function(element){ 
        this.element = element;
        this.next = null;
    };
    let length = 0; // 链表长度
    let head = null; // 列表为空(第一个链表元素)
    // 向列表尾部添加一个新的项
    this.append = function(element){};
    // 向列表的特定位置插入一个新的项
    this.insert = function(position, element){};
    // 从列表的特定位置移除一项
    this.removeAt = function(position){};
    // 返回元素在列表中的索引。如果列表中没有该元素则返回-1
    this.indexOf = function(element){};
    // 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false
    this.isEmpty = function() {};
    // 返回链表包含的元素个数。与数组的length属性类似
    this.size = function() {};
    // 由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值
    this.toString = function(){};
}
```
<br>
##### 向链表尾部追加元素
```
this.append = function(element){
    let node = new Node(element), current;
    if (head === null){ 
        //列表中第一个节点 
        head = node;
    } else {
        current = head; 
        //循环列表，直到找到最后一项
        while(current.next){
          current = current.next;
        }
        // 找到最后一项，将其next赋为node，建立链接
        current.next = node; 
    }
    length++; //更新列表的长度 
};
```
追加元素存在两种情况: `向为空的列表添加一个元素; 向一个不为空的列表尾部添加元素`
<br>
##### 从链表中移除元素
```
this.removeAt = function(position){
    //检查越界值
    if (position > -1 && position < length){
        let current = head, // 要删除的元素
        previous, // 删除元素的前一个元素
        index = 0; // 用于内部控制和递增的变量
        //移除第一项
        if (position === 0){ 
            head = current.next;
        } else {
            while (index++ < position){ 
                previous = current;     
                current = current.next; 
            }
            //将previous与current的下一项链接起来:跳过current，从而移除它
            previous.next = current.next; 
        }
        length--; 
        return current.element
    } else {
        return null; 
    } 
};
```
从列表中移除第一个元素(position === 0)时，要做的就是让head指向列表的第二个元素.
移除列表的最后一项或者中间某一项时，要做的就是将previous.next和current.next链接起来.这样，当前元素就会被丢弃在计算机内存中，等着被`垃圾回收器清除`
![linked list](http://pyqqincie.bkt.clouddn.com/linkedList_remove.png)
<br>
##### 在任意位置插入元素
```
this.insert = function(position, element){
    //检查越界值
    if (position >= 0 && position <= length){ 
        let node = new Node(element),
        current = head,
        previous,
        index = 0;
        if (position === 0){ 
            //在第一个位置添加 
            node.next = current;
            head = node;
        } else {
            while (index++ < position){ // 找到当前position所在的节点与前一个节点
                previous = current;
                current = current.next;
            }
            // 插入节点
            node.next = current; 
            previous.next = node; 
        }
        length++; //更新列表的长度
        return true;
    } else {
        return false;
    }
};
```
`我们要处理不同的场景。第一种场景，需要在列表的起点添加一个元素，也就是第一个位置 position = 0.我们需要做的是把node.next的值设为 current(列表中第一个元素)。现在head重新指向 node`
` 第二种场景，在列表中间或尾部添加一个元素.首先，我们需要循环访问列表, 找到目标位置.然后需要把新项(node)和当前项链接起来，然后需要改变previous和current之间的链接。我们还需要让previous.next 指向node`

<br>
##### 双向链表
双向链表和普通链表的区别在于，在链表中， 一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的:一个链向下一个元素， 另一个链向前一个元素
![linkedList two way](http://pyqqincie.bkt.clouddn.com/linkedList_two_way.png)
向双向链表中插入一个新项跟(单向)链表非常类似。区别在于，链表只要控制一个next
指针，而双向链表则要同时控制next和prev(previous，前一个)这两个指针
<br>
##### 循环链表
循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针不是引用null， 而是指向第一个元素(head)
![linkedList loop](http://pyqqincie.bkt.clouddn.com/linkedList_loop.png)
<br>

#### 5、树
树是一种分层数据的抽象模型.一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点(除了顶部的第一个节点)以及零个或多个子节点
![tree](http://pyqqincie.bkt.clouddn.com/tree.png)
`位于树顶部的节点叫作根节点。它没有父节点.至少有一个子节点的节点称为内部节点.没有子元素的节点称叶节点.`
`树的高度取决于所有节点深度的最大值`
<br>
##### 二叉树
二叉树中的节点最多只能有两个子节点:一个是左侧子节点，另一个是右侧子节点
<br>
##### 二叉搜索树
二叉搜索树(BST)是二叉树的一种，但是它只允许你在左侧节点存储(比父节点)小的值， 在右侧节点存储(比父节点)大(或者等于)的值
`BinarySearchTree类 大致结构`
```
function BinarySearchTree() {
    var Node = function(key){ // 节点对象 
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null; // 根节点
    insert(key) // 向树中插入一个新的键
    inOrderTraverse() // 通过中序遍历方式遍历所有节点。
    preOrderTraverse() // 通过先序遍历方式遍历所有节点。
    postOrderTraverse() // 通过后序遍历方式遍历所有节点。
    min() // 返回树中最小的值/键。
    max() // 返回树中最大的值/键
}
```
<br>
##### 满二叉树
* 对于国内的满二叉树:
一个二叉树，如果每一个层的结点数都达到最大值，则这个二叉树就是满二叉树
* 国外(国际)定义: 
如果一棵二叉树的结点要么是叶子结点，要么它有两个子结点，这样的树就是满二叉树
![满二叉树](http://pyqqincie.bkt.clouddn.com/full_binary_tree.png)
<br>
##### 完全二叉树
二叉树的深度为h，除第 h 层外，其它各层 (1～h-1) 的结点数都达到最大个数，第 h 层所有的结点都连续集中在最左边，这就是完全二叉树
![完全二叉树](http://pyqqincie.bkt.clouddn.com/complete_binary_tree.png)
<br>
##### 树的遍历
##### 中序遍历
中序遍历是一种先访问左侧节点，在访问节点本身，最后是右侧子节点.
![tree inOrder](http://pyqqincie.bkt.clouddn.com/tree_inOrder.png)
`在BST中，中序遍历是从最小到最大的顺序访问所有节点`
```
this.inOrderTraverse = function(callback){
      inOrderTraverseNode(root, callback); 
};
var inOrderTraverseNode = function (node, callback) {
    if (node !== null) { // 节点存在时，查看是否还存在子节点
        inOrderTraverseNode(node.left, callback);  // 递归循环至最左侧节点
        callback(node.key);                        // 当前节点key
        inOrderTraverseNode(node.right, callback); // 递归循环至最右侧节点
    } 
};
```
<br>
##### 先序遍历
先序遍历是以优先于节点本身的顺序访问每个节点的.即先访问节点本身，再左侧节点，最后访问右侧子节点.
![tree pre](http://pyqqincie.bkt.clouddn.com/tree_pre.png)
```
this.preOrderTraverse = function(callback){
      preOrderTraverseNode(root, callback); 
};
var preOrderTraverseNode = function (node, callback) {
    if (node !== null) { // 节点存在时，查看是否还存在子节点
        callback(node.key);                         // 当前节点key
        preOrderTraverseNode(node.left, callback);  // 递归循环至最左侧节点
        preOrderTraverseNode(node.right, callback); // 递归循环至最右侧节点
    } 
};
```
<br>
##### 后序遍历
先序遍历是以优先于后代节点的顺序访问每个节点的.即先访问左侧节点，在访问右侧子节点，最后是节点本身.
![tree post](http://pyqqincie.bkt.clouddn.com/tree_post.png)
```
this.postOrderTraverse = function(callback){
      postOrderTraverseNode(root, callback); 
};
var postOrderTraverseNode = function (node, callback) {
    if (node !== null) { // 节点存在时，查看是否还存在子节点
        postOrderTraverseNode(node.left, callback);  // 递归循环至最左侧节点
        postOrderTraverseNode(node.right, callback); // 递归循环至最右侧节点
        callback(node.key);                         // 当前节点key
    } 
};
```
<br>
##### 自平衡树
随着添加的节点数增加，树的一条边可能会非常深。也就是说，树的一条分支会有很多层，而其他的分支却只有几层。移除和搜索某个节点时引起一些性能问题。AVL树是一种自平衡二叉搜索树，意思是任何一个节点左右两侧子树的高度之差最多为1。`也就是说这种树会在添加或移除节点时，会计算出每个节点左右两侧子树的高度来作为计算平衡因子，对树进行旋转平衡(旋转分多种方式选中，下图为其中的一种)`
![tree pre](http://pyqqincie.bkt.clouddn.com/tree_translate.png)
`红黑树也是自平衡二叉树的一种`
<br>
#### 6、字典、散列表(哈希表)
字典中，我们用`[键，值]`的形式来存储数据。在散列表中也是一样(`也是以[键， 值]对的形式来存储数据)`。但是两种数据结构的实现方式略有不同

##### 散列表(哈希表)
`要在数据结构中获得一个值(使用get方法)，需要遍历整个数据结构来找到它。如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后返回值在表中的地址`
`哈希表也称为散列表, 是根据关键字值（key value）而直接进行访问的数据结构。也就是说，它通过把关键字值映射到一个位置来访问记录，以加快查找的速度。这个映射函数称为哈希函数（也称为散列函数），映射过程称为哈希化，存放记录的数组叫做散列表`
![hash](http://pyqqincie.bkt.clouddn.com/hash.png)
<br>
##### 散列冲突(哈希冲突)
有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为冲突。因此，当这种情况发生的时候就要去解决它。处理冲突有几种方法:`分离链接`、`线性探查`
* `分离链接`
    分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的最简单的方法，但是需要额外的存储空间
    ![hash linkedList](http://pyqqincie.bkt.clouddn.com/hash_linkedList.png)
    <br>
* `线性探查`
    当想向表中某个位置加入一个新元素的时候，如果索引 为index的位置已经被占据了，就尝试index+1的位置。如果index+1的位置也被占据了，就尝试 index+2的位置，以此类推
    ![hash line](http://pyqqincie.bkt.clouddn.com/hash_line.png)
    `在一些编程语言中，我们需要定义数组的大小。如果使用线性探查的话，需要注意的一个问题是数组的可用位置可能会被用完。在JavaScript中，我们不需要担心这个问题，因为我们不需要定义数组的大小，它可以根据需要自动改变大小————这是JavaScript内置的一个功能`

<br>
#### 7、图
图是网络结构的抽象模型。图是一组由边连接的节点(或顶点).
![graph](http://pyqqincie.bkt.clouddn.com/graph.png)
    `由一条边连接在一起的顶点称为相邻顶点.`
    `一个顶点的度是其相邻顶点的数量.`
    `路径是顶点v1, v2,...,vk的一个连续序列，其中vi和vi+1是相邻的.其中包含路径A B E I和A C D G`
<br>
##### 图的遍历
图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索.
*  `广度优先搜索(Breadth-First Search，BFS)`
    广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层。换句话说，就是先宽后深地访问顶点
    ![graph](http://pyqqincie.bkt.clouddn.com/graph_bfs.png)
* `深度优先搜索(Depth-First Search，DFS)`
    深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径。换句话说，它是先深度后广度地访问顶点
    ![graph](http://pyqqincie.bkt.clouddn.com/graph_dfs.png)

### 常见排序算法
* 冒泡排序
* 选择排序
* 插入排序
* 归并排序
* 快速排序
* 堆排序

#### 1、冒泡排序
冒泡排序比较任何两个相邻的项，如果第一个比第二个大，则交换它们。元素项向上移动至 正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名.
`时间复杂度O(n^2)`
```
var bubbleSort = function(array){
    var length = array.length;
    for (var i=0; i<length; i++){
        for (var j=0; j<length-1; j++ ){ 
            if (array[j] > array[j+1]){
                swap(array, j, j+1);
            }
        }
    }
}
var swap = function(array, index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};
var arr = [3, 5, 1, 6, 4, 7, 2]
bubbleSort(arr)
```
![bubbleSort](http://pyqqincie.bkt.clouddn.com/bubbleSort.png)

##### 改进后的冒泡算法
如果从内循环减去外循环中已跑过的轮数，就可以避免内循环中所有不必要的比较
`时间复杂度O(n^2)`
```
var modifiedBubbleSort = function(array){
    var length = array.length;
    for (var i=0; i<length; i++){
        for (var j=0; j<length-1-i; j++ ){ //{1}
            if (array[j] > array[j+1]){
                swap(array, j, j+1)
            } 
        }
    };
}
var swap = function(array, index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};
var arr = [3, 5, 1, 6, 4, 7, 2]
modifiedBubbleSort(arr)
```
<br>

#### 2、选择排序
选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推
`时间复杂度O(n^2)`
```
function SelectionSort(arr) {
    if (arr == null || arr.length < 2) {
         return arr;
    }
    for (var i = 0; i < (arr.length - 1); i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            minIndex = arr[j] < arr[minIndex] ? j : minIndex;
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}
var arr = [3, 5, 1, 6, 4, 7, 2]
SelectionSort(arr)
```
![selectSort](http://pyqqincie.bkt.clouddn.com/selectSort.png)
<br>

#### 3、插入排序
插入排序的基本思想是：把要排序的数组分成两部分：第一部分包含了这个数组的所有元素，而第二部分就只包含这一个元素（即待插入元素）。每步将一个待排序的记录，按其关键码值的大小插入前面已经排序的文件中适当位置上，直到全部插入完为止。
`时间复杂度O(n^2)`
```
function InsertionSort(arr) {
    if (arr == null || arr.length < 2) {
        return arr;
    }
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
var arr = [3, 5, 1, 6, 4, 7, 2]
InsertionSort(arr)
```
![insertionSort](http://pyqqincie.bkt.clouddn.com/insertionSort.png)
<br>

#### 4、归并排序
归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组`归并数组过程即排序过程`.
由于是分治法，归并排序也是递归的:
`时间复杂度O(nlog^n)`
`如果a的x次方等于N（a>0，且a不等于1），那么数x叫做以a为底N的对数（logarithm），记作x=logaN。其中，a叫做对数的底数，N叫做真数`
```
function　mergeSort(items){
    if(items.length == 1){
        return　items;
    }
    var middle = Math.floor(items.length/2),
        left = items.slice(0, middle),
        right = items.slice(middle);
    return　merge(mergeSort(left), mergeSort(right));
}
function　merge(left, right){
    var　result=[];
    while(left.length>0 && right.length>0){
        if(left[0]<right[0]){
        /* shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。*/
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    return　result.concat(left).concat(right);
}
var arr = [3, 5, 1, 6, 4, 7, 2]
mergeSort(arr)
```
![mergeSort](http://pyqqincie.bkt.clouddn.com/mergeSort.png)
<br>

#### 5、快速排序
基本思想：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列
* 数组中间项为基准值的情况
(1) 首先，从数组中选择中间一项作为基准值.(`基准值的选择不固定`)
(2) 创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。移动左指针直到我们找到一个比基准值大的元素，接着，移动右指针直到找到一个比基准值小的元素，然后交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比基准值小的值都排在基准值之前，而比基准值大的值都排在基准值之后。这一步叫作划分操作。
(3) 接着，算法对划分后的小数组(较基准值小的值组成的子数组，以及较基准值大的值组成的 子数组)重复之前的两个步骤，直至数组已完全排序。
`时间复杂度O(nlog^n)`
```
var quick = function(array, left, right){
    var index; // 记录将子数组分离为较小值数组和较大值数组
    if (array.length > 1) { 
        index = partition(array, left, right); // 划分过程，返回划分索引值
        if (left < index - 1) { // 较小值的元素子数组
            quick(array, left, index - 1);
        }
        if (index < right) {  // 较大值的元素子数组
            quick(array, index, right);
        }
    }
};

var partition = function(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)], // 选择中间项作为基准值
    i = left,
    j = right;
    while (i <= j) { // 只要left和right指针没有相互交错，就执行划分操作
        while (array[i] < pivot) {  // 移动left指针直到找到一个元素比基准值大
            i++;
        }
        while (array[j] > pivot) {  // 移动right指针直到我们找到一个元素比基准值小
            j--;
        }
        if (i <= j) { // 左指针元素比基准值大且右指针元素比基准值小，并且左指针没有右指针大
            swap(array, i, j); 
            i++;
            j--;
        }
    }
    return i;
};
var swap = function(array, index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};
var arr = [3, 5, 1, 6, 4, 7, 2]
quick(arr, 0, arr.length - 1)
```
<br>
* 数组最后一个数为基准值时:
```
const quickSort = (array) => {
    const sort = (arr, left = 0, right = arr.length - 1) => {
        if (left >= right) { //如果左边的索引大于等于右边的索引说明整理完毕
            return
        }
        let i = left
        let j = right
        const baseVal = arr[j] // 取无序数组最后一个数为基准值
        while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
            while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
                i++
            }
            arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
            while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
                j--
            }
            arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
        }
        arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
        sort(arr, left, j-1) // 将左边的无序数组重复上面的操作
        sort(arr, j+1, right) // 将右边的无序数组重复上面的操作
    }
    const newArr = array.concat() // 为了保证这个函数是纯函数拷贝一次数组
    sort(newArr)
    return newArr
}
var arr = [3, 5, 1, 6, 4, 7, 2]
quickSort(arr)
```
<br>

#### 6、堆排序
堆分为两种类型：最大堆、最小堆.`根的值大于或小于左右子树的值(左右子树也是如此)`
顾名思义，就是保证根节点是所有数据中最大/小. 堆总是一棵完全二叉树
特点: `如果 i 是节点的索引，那么下面的公式就给出了它的父节点和子节点在数组中的位置`
```
parent(i) = Math.floor((i - 1)/2)
left(i)   = 2i + 1
right(i)  = 2i + 2
```
##### 转换为最大/小堆
首先需要一个操作来实现这个交换过程，这就是上浮: 从当前结点开始，和它的父亲节点比较，若是比父亲节点来的小，就交换，然后将当前询问的节点下标更新为原父亲节点下标；否则退出
上浮操作中，只能保证最大/小值上浮到根节点, 无法保证子树的根节点也是最大/小值，此时需要下沉操作: 让当前结点的左右儿子(如果有的话)作比较，哪个比较小就和它交换，并更新询问节点的下标为被交换的儿子节点下标，否则退出。
![heap up down](http://pyqqincie.bkt.clouddn.com/heap_up_down.png)
<br>
##### 堆排序思想
1、堆排序首先把无序数组转换为最大/小堆, 然后利用最大/小堆的性质(`根的值大于或小于左右子树的值 `),
2、让根节点元素和尾节点进行交换，然后让剩下的数组元素中的根元素下沉(即重新完成一个最大/小堆转换). 
3、然后重复2，完成堆排序

![heapify](http://pyqqincie.bkt.clouddn.com/heapify.png)
<br>
* 递归堆排序:
```
var buildHeap = function(array){
    var heapSize = array.length;
    for (var i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
        heapify(array, heapSize, i);
    }
    //先将第一个元素和已排好元素前一位做交换，再重新调整，直到排序完毕
    for (var i = heapSize - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(array, i, 0);
    }
};
var heapify = function(array, heapSize, i){
    var left = i * 2 + 1,
    right = i * 2 + 2,
    largest = i;
    if (left < heapSize && array[left] > array[largest]) {
        largest = left;
    }
    if (right < heapSize && array[right] > array[largest]) {
        largest = right;
    }
    if (largest !== i) {
        swap(array, i, largest);
        heapify(array, heapSize , largest);
    }
};
var swap = function(array, index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};
var arr = [3, 5, 1, 6, 4, 7, 2]
buildHeap(arr)
```
<br>
* 非递归堆排序:
```
var swap = function(array, index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};
var max_heapify = function(arr, start, end) {
    //建立父节点指标和子节点指标
    var dad = start;
    var son = dad * 2 + 1;
    while (son <= end) { //若子节点指标在范围内才做比较
        if (son + 1 <= end && arr[son] < arr[son + 1]) //先比较两个子节点大小，选择最大的
            son++;
        if (arr[dad] > arr[son]) //如果父节点大於子节点代表调整完毕，直接跳出函数
            return;
        else { //否则交换父子内容再继续子节点和孙节点比较
            swap(arr, dad, son);
            dad = son;
            son = dad * 2 + 1;
        }
    }
}
var heap_sort = function(arr, len) {
    //初始化，i从最後一个父节点开始调整
    for (var i = Math.floor(len/2 - 1); i >= 0; i--){
        max_heapify(arr, i, len - 1);
    }
    //先将第一个元素和已排好元素前一位做交换，再重新调整，直到排序完毕
    for (var i = len - 1; i > 0; i--) {
        swap(arr, 0, i);
        max_heapify(arr, 0, i - 1);
    }
}
var arr = [3, 5, 1, 6, 4, 7, 2]
heap_sort(arr, arr.length)
```
<br>