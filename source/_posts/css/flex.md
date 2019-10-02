---
title: flex 布局
date: 2019-02-13 14:48:19
tags: layout, flex
---

`flex`（ flexible box：弹性布局盒模型）,是2009年w3c提出的一种可以简洁、快速弹性布局的属性。主要思想是给予容器控制内部元素高度和宽度的能力
`六个容器属性, 六个item 属性`
<br>

flex 概念图
![flex concept](http://pyqqincie.bkt.clouddn.com/flex_concept.png)
使用flex布局的容器（flex container），它内部的元素自动成为flex项目（flex item）。容器拥有两根隐形的轴，水平的主轴（main axis），和竖直的交叉轴。主轴开始的位置，即主轴与右边框的交点，称为main start；主轴结束的位置称为main end；交叉轴开始的位置称为cross start；交叉轴结束的位置称为cross end。item按主轴或交叉轴排列，item在主轴方向上占据的宽度称为main size，在交叉轴方向上占据的宽度称为cross size。

此外，需注意使用flex容器内元素，即flex item的float，clear、vertical-align属性将失效


### 容器属性

`flex-direction`

    决定主轴的方向，即项目排列的方向，有四个可能的值：row(默认)|row-reverse|column|column-reverse

　　     row:主轴为水平方向，项目沿主轴从左至右排列

　　　　  column：主轴为竖直方向，项目沿主轴从上至下排列

　　　　  row-reverse：主轴水平，项目从右至左排列，与row反向

　　　　  column-reverse：主轴竖直，项目从下至上排列，与column反向
<br>

`flex-wrap`

    默认情况下，item排列在一条线上，即主轴上，flex-wrap决定当排列不下时是否换行以及换行的方式，可能的值nowrap(默认)|wrap|wrap-reverse 

　　    nowrap：自动缩小项目，不换行

　　    wrap：换行，且第一行在上方

　　    wrap-reverse：换行，第一行在下面
<br>

`flex-flow`

    是flex-direction和flex-wrap的简写形式，如：row wrap|column wrap-reverse等。默认值为row nowrap，即横向排列 不换行。

<br>

`justify-content`

    决定item在主轴上的对齐方式，可能的值有flex-start（默认），flex-end，center，space-between，space-around。当主轴沿水平方向时，具体含义为

　　　　　　flex-start：左对齐

　　　　　　flex-end：右对齐

　　　　　　center：居中对齐

　　　　　　space- between：两端对齐

　　　　　　space-around：沿轴线均匀分布

![justify-content](http://pyqqincie.bkt.clouddn.com/flex_justify_content.png)

<br>

`align-items`

    决定了item在交叉轴上的对齐方式，可能的值有flex-start|flex-end|center|baseline|stretch，当主轴水平时，其具体含义为

　　　　flex-start：顶端对齐

　　　　flex-end：底部对齐

　　　　center：竖直方向上居中对齐

　　　　baseline：item第一行文字的底部对齐

　　　　stretch：当item未设置高度时，item将和容器等高对齐

![align-items](http://pyqqincie.bkt.clouddn.com/flex_align_items.png)
<br>

`align-content`

    该属性定义了当有多根主轴时，即item不止一行时，多行在交叉轴轴上的对齐方式。注意当有多行时，定义了align-content后，align-items属性将失效。align-content可能值含义如下（假设主轴为水平方向）：

　　　　　　flex-start：左对齐

　　　　　　flex-end：右对齐

　　　　　　center：居中对齐

　　　　　　space- between：两端对齐

　　　　　　space-around：沿轴线均匀分布

　　　　　　stretch：各行将根据其flex-grow值伸展以充分占据剩余空间

![align-content](http://pyqqincie.bkt.clouddn.com/flex_align_content.png)
<br>

### item 属性

`order`

order的值是整数，默认为0，整数越小，item排列越靠前(`与元素在父元素 中的dom 位置无关`)
<br>

`flex-grow`

定义了当flex容器有多余空间时，item是否放大。默认值为0，即当有多余空间时也不放大；可能的值为整数，表示不同item的放大比例

<br>

`flex-shrink`

定义了当容器空间不足时，item是否缩小。默认值为1，表示当空间不足时，item自动缩小，其可能的值为整数，表示不同item的缩小比例。flex-grow
<br>

`flex-basis`

表示项目在主轴上占据的空间

![flex-basis](http://pyqqincie.bkt.clouddn.com/flex_basis.png)
<br>

`flex`

flex属性是flex-grow、flex-shrink和flex-basis三属性的简写总和
<br>


`align-self`

    align-self属性允许item有自己独特的在交叉轴上的对齐方式，它有六个可能的值。默认值为auto

　　　　　　auto：和父元素align-self的值一致

　　　　　　flex-start：顶端对齐

　　　　　　flex-end：底部对齐

　　　　　　center：竖直方向上居中对齐

　　　　　　baseline：item第一行文字的底部对齐

　　　　　　stretch：当item未设置高度时，item将和容器等高对齐

![align-self](http://pyqqincie.bkt.clouddn.com/flex_align_self.png)