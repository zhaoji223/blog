---
title: 鼠标移入事件偏移量属性
date: 2018-07-19 20:54:47
tags: [event]
---

#### event.clientX, event.clientY
鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。
IE事件和标准事件都定义了这2个属性
<br>

#### event.screenX, event.screenY
screenX：当鼠标事件发生时，鼠标相对于显示器屏幕x轴的位置；
screenY：当鼠标事件发生时，鼠标相对于显示器屏幕y轴的位置；
<br>

#### event.offsetX, event.offsetY
offset意为偏移量，是被点击的元素距左上角为参考原点的长度，而IE、FF和Chrome的参考点有所差异。
Chrome下，offsetX offsetY是包含边框的.
而IE、FF是不包含边框的，如果鼠标进入到border区域，为返回负值.
<br>

![offset/client/screenXY](/images/event/offset_client_screenX.png)

#### event.pageX, event.pageY
出当浏览器没有滚动条时（可视窗口与文档窗口重合），pageX与clientX相等，pageX与clientY相等，如果出现下拉滚动条并向下拉动滚动条，文档窗口向上滚动，如果出现左右滑动的滚动条并向右拉动滚动条，文档窗口向左滚动，在文档窗口滚动的情况下，pageX>=clientX, pageY>=clientY
在IE中没有pageX、pageY取而代之的是event.x、evnet.y。x和y在webkit内核下也实现了，所以火狐不支持x，y

![pageXY](/images/event/pageXY.png)


#### offsetTop, offsetWidth 
`offsetTop` 当前对象到其上级层顶部的间隔,  当前元素dom content 到 父元素 border的距离
`offsetWidth` dom content + padding + border 的 width
<br>

#### clientTop , clientWidth
`clientTop` 一个元素顶部边框的宽度（以像素表示）, 即元素 border-top
`clientWidth` dom content 的 width
<br>

#### scrollTop 
`scrollTop` 一个元素的内容垂直滚动的像素数, 即 页面收起部分的 高度
<br>