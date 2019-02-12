---
title: mock-server
date: 2019-02-12 14:09:58
tags: mock, server, express
---

首先安装 express
`npm install express`

在mock文件加下新建server.js
```
var express = require("express")
var app = express();

app.get('/', function(req, res) {
   res.send('hello world'); 
});
app.listen(3001)
```
这就实现了一个简单的express服务，在浏览器输入http://localhost:3001 就可以看到页面加载出 hello world

这时候修改server.js文件的内容，代码如下
```
var express = require("express")
var app = express();
var router = express.Router();

router.get('/', function(req, res) {
    res.send('hello world');
});

app.use("/api",router)

app.listen(3001)
```
在浏览器的输入http://localhost:3001/api 即可看到输出的JSON数据列表
<br>

### 1702-web Mock
[github 地址](https://github.com/zhaoji223/1702-web)

目录结构
```
├── mock                # mock
│   ├── data            # 模拟数据文件夹
│       ├── a.json      # a.json
│       ├── b.json      # b.json
│   ├── config.json     # 配置路径及返回的模拟数据
│   ├── server.js       # server
```
 
获取 express, express.Router(), 读取文件的 fs, 配置文件, 及当前文件路径
```
const express = require('express')
const fs = require('fs')
const router = express.Router()
const config = require('./config.json')
const dataPath = __dirname + '/data'

const app = express()
```

获取 data目录下的模拟数据的 文件(路径)
```
var fileList = [] 

getFileList(dataPath)

function getFileList(path) {
    // readdirSync 该属性指定用于传给回调的文件名的字符编码
    let files = fs.readdirSync(path)
    files.forEach(item => {
        let tempPath = `${path}/${item}`
        // 返回的 fs.Stats 对象中的数值是否应为 bigint 型。默认值: false
        let stats = fs.statSync(tempPath)
        if (stats.isDirectory()) {
            // 如果是 文件夹, 则递归
            getFileList(tempPath)
        } else {
            // fileList 中存储 的是文件 path
            fileList.push(tempPath)
        }
    })
}
```

获取文件后, 为配置文件配置的访问路径, 添加CURD, 每个请求返回模拟数据json(或其他)
```
fileList.forEach(filePath => {
    handleRouter(filePath)
})

function handleRouter(filePath) {
    let fileJson = require(filePath)
    router.get('/', (req, res) => {
        res.send(fileJson)
    })
    router.get('/:id', (req, res) => {
        for (let i in fileJson) {
            if (req.params.id == fileJson[i].id) {
                return res.send(fileJson[i])
            }
        }
        res.send({});
    })
    router.post('/', (req, res) => {
        res.send(201)
    })
    router.put...
    router.delete...

    app.use(config[filePath.split('mock')[1]], router)
}
```