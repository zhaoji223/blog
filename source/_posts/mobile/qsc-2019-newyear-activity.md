---
title: qsc-2019-newyear-activity
date: 2019-01-31 09:57:45
tags: 总结
---

## QSC 2019新年抽签活动 总结

### 图片压缩 [TinyPNG](https://tinypng.com/),  减少访问资源大小, 缩短访问加载时间
![select](/images/mobile/qsc-2019-newyear-form.png)
<br>
###  input 输入框:
IOS 与 Android 处理软件盘的方式不同, ios 通过scrolltop移动来展示 软键盘; Android 则是通过切割可是区域大小, 来展示软键盘. 所以在处理 键盘弹出, 遮挡屏幕内容时, 需要分别处理
Android监听 resize 事件:
```javascript
window.addEventListener('resize', () => {
    let isAndroid = this.checkAndriod() 
    if (isAndroid) {
        let normal_height = height
        let now_height = document.documentElement.clientHeight || window.innerHeight
        if (now_height < normal_height) {
            // do something
        } else {
            // do something
        }
    }
})
```
IOS监听 input focus 与 blur 事件:
```javascript
if(this.checkIOS()){
    let input = document.getElementById('inputName')
    input.addEventListener('focus', () => {
        setTimeout(() => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(scrollTop != 0){
                // do something
            }
        }, 20)
    })
    input.addEventListener('blur', () => {
        setTimeout(() => {
            // do something

            // 修正ios下回弹不准确的问题
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            document.body.scrollTop = 0
        }, 20)
    })
}
```
<br>
#### IOS 中 input 框的 '撤销键入'
在IOS 中, 通过 window.DeviceMotionEvent, 监听 手机摇一摇事件时, 会与页面中的input 产生 alert('撤销键入') 的弹框:
解决方案: 
- 通过 input输入 并点击确认后, 重新跳转当前页(或者新页面), 跳过'撤销键入'
- 通过 监听 `WeixinJSBridgeReady` 事件, 来启动加载好的声音
```javascript
document.addEventListener("WeixinJSBridgeReady", function () {
    audio.load();
    audio.pause();
}, false);
```

### 滚动回弹效果

![select](/images/mobile/qsc-2019-newyear-select.png)
-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果.
或者 使用插件实现, 例如: `better-picker`
<br>

### 在某些型号的机型中, animation: bounce-in .5s linner .5s, 回没有动画效果, 而是直接显示图片
<br>

### Canvas 绘图
 在图片加载成功后, 可以在调用 canvas 绘图方法, 加快canvas 绘图速度
```javascript
img.onload = () => {
    this.canvas()
}
```
![canvas](/images/mobile/qsc-2019-newyear-canvas.jpeg)
<br>

### media query
一般媒体查询使用 min-width 做设备适配
如果存在 弹出 软键盘影响高度的情况
<font size=3 color=red>使用min-height 时 需要考虑到 微信/IOS 浏览器 头部状态栏, 底部状态栏 等情况</font>