$(document).ready(function($) {
    "use strict";

    $(window).scroll(function () {
        if ($(document).scrollTop() > 10) {
            $(".lightnav .navbar-inner").addClass("lightnav-alt");
            $(".darknav .navbar-inner").addClass("darknav-alt");
        } else {
            $(".lightnav .navbar-inner").removeClass("lightnav-alt");
            $(".darknav .navbar-inner").removeClass("darknav-alt");
        }
    });

	$(document).ready(function($) {

		// Slidebars off-canvas menu
		$.slidebars();

		// Popovers [Hover]
		// $("[data-toggle=popover]")
		// 	.popover({
		// 		html:true
		// 	}
		// );

		// Page transitions
		$(".animsition").animsition({

			inClass               :   'fade-in',
			outClass              :   'fade-out-down-sm',
			inDuration            :    900,
			outDuration           :    800,
			linkElement           :   '.animsition-link', 
			//e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
			loading               :    true,
			loadingParentElement  :   'body', //animsition wrapper element
			loadingClass          :   'animsition-loading',
			unSupportCss          : [ 'animation-duration',
			                          '-webkit-animation-duration',
			                          '-o-animation-duration'
			                        ],
			//"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser. 
			//The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

			overlay               :   false,

			overlayClass          :   'animsition-overlay-slide',
			overlayParentElement  :   'body'
		});

		// WOW plugin settings
        var wow = new WOW(
          { animateClass: 'animated', // set our global css classT (default is animated)
            offset: 250, // set distance to content until it triggers (default is 0)
            mobile: false, // remove animations for mobiles/tablets (default is true)
            live: true }); // act on asynchronously loaded content (default is true)
        new WOW().init();

		// Functionailty constraints for mobile
		if (!Modernizr.touch) {
		    jQuery(function ($) {
		        // Hero & page-header fade-in effect
		        var divs = $('.herofade');
		        $(window).on('scroll', function () {
		            var st = $(this).scrollTop();
		            divs.css({
		                'margin-top': -(st / 0) + "px",
                    'opacity': 0
		                // 'opacity': 0.9 - st / 1600
		            });
		        });
		    });

		    jQuery(function ($) {
		        // Hero & page-header fade-in effect
		        var divs = $('.videofade');
		        $(window).on('scroll', function () {
		            var st = $(this).scrollTop();
		            divs.css({
		                'margin-top': -(st / 0) + "px",
		                'opacity': 0.8 - st / 1600
		            });
		        });
		    });

		    jQuery(function ($) {
		        // Hero & page-header fade-in effect
		        var divs = $('.headerfade');
		        $(window).on('scroll', function () {
		            var st = $(this).scrollTop();
		            divs.css({
		                'margin-top': -(st / 0) + "px",
		                'opacity': 0.9 - st / 300
		            });
		        });
		    });
		}

		// autohide navbar on scroll
		$("div.navbar-fixed-top").autoHidingNavbar({
			animationDuration: 400,
			hideOffset: 0,
		});

		// faq's floating sidebar (left)
	    $('#sidebar').affix({
	    	offset: {
	    		top: 500
	    	}
		});
		
	    // Scrollspy for scrollto links in floating faq sidebar
		var $body   = $(document.body);
		var navHeight = $('.navbar').outerHeight(true) + 80;

		$body.scrollspy({
			target: '#leftcol',
			offset: navHeight
		});

		// fade out map cover (contact.html)
	    $(".map-cover").click(function () {
	        $(".map-cover").fadeOut("slow");
	    });

		// Collapsible panels for faq's and careers
	    $('.collapse').on('show.bs.collapse', function() {
	        var id = $(this).attr('id');
	        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-panel');
	        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-chevron-up"></i>');
	    });
	    $('.collapse').on('hide.bs.collapse', function() {
	        var id = $(this).attr('id');
	        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-panel');
	        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-chevron-down"></i>');
	    });

	    /*!
	     * IE10 viewport hack for Surface/desktop Windows 8 bug
	     * Copyright 2014 Twitter, Inc.
	     * Licensed under the Creative Commons Attribution 3.0 Unported License. For
	     * details, see http://creativecommons.org/licenses/by/3.0/.
	     */
	    // See the Getting Started docs for more information:
	    // http://getbootstrap.com/getting-started/#support-ie10-width
	    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	        var msViewportStyle = document.createElement('style');
	        msViewportStyle.appendChild(
	            document.createTextNode(
	                '@-ms-viewport{width:auto!important}'
	            )
	        );
	        document.querySelector('head').appendChild(msViewportStyle);
	    }

	}); // Document Ready

}(jQuery)); // End "use strict"

// Enable dropdown sub-menus in off-canvas navigation
$(document).ready(function($) {
	$('.sb-toggle-submenu').off('click') // Stop submenu toggle from closing Slidebars.
		.on('click', function() {
			$submenu = $(this).parent().children('.sb-submenu');
			$(this).add($submenu).toggleClass('sb-submenu-active'); // Toggle active class.

			if ($submenu.hasClass('sb-submenu-active')) {
			$submenu.slideDown(200);
			} else {
			$submenu.slideUp(200);
		}
	});
});

// performance_timing
!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports._performanceShow=n():t._performanceShow=n()}("undefined"!=typeof self?self:this,function(){return function(t){function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=36)}([function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var r=e(3),o=e(10);t.exports=e(4)?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){var r=e(8),o=e(28),i=e(16),u=Object.defineProperty;n.f=e(4)?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return u(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){t.exports=!e(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n,e){var r=e(48),o=e(13);t.exports=function(t){return r(o(t))}},function(t,n,e){var r=e(20)("wks"),o=e(11),i=e(0).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,e){var r=e(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n){t.exports=!0},function(t,n){var e=t.exports={version:"2.5.5"};"number"==typeof __e&&(__e=e)},function(t,n,e){var r=e(7);t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){t.exports={}},function(t,n,e){var r=e(32),o=e(21);t.exports=Object.keys||function(t){return r(t,o)}},function(t,n,e){var r=e(20)("keys"),o=e(11);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,n,e){var r=e(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(3).f,o=e(1),i=e(6)("toStringTag");t.exports=function(t,n,e){t&&!o(t=e?t:t.prototype,i)&&r(t,i,{configurable:!0,value:n})}},function(t,n,e){n.f=e(6)},function(t,n,e){var r=e(0),o=e(15),i=e(14),u=e(23),c=e(3).f;t.exports=function(t){var n=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in n||c(n,t,{value:u.f(t)})}},function(t,n){n.f={}.propertyIsEnumerable},function(t,n,e){"use strict";var r=e(14),o=e(27),i=e(30),u=e(2),c=e(17),s=e(46),f=e(22),a=e(53),p=e(6)("iterator"),l=!([].keys&&"next"in[].keys()),y=function(){return this};t.exports=function(t,n,e,v,d,h,m){s(e,n,v);var g,b,x,S=function(t){if(!l&&t in j)return j[t];switch(t){case"keys":case"values":return function(){return new e(this,t)}}return function(){return new e(this,t)}},w=n+" Iterator",_="values"==d,O=!1,j=t.prototype,T=j[p]||j["@@iterator"]||d&&j[d],E=T||S(d),P=d?_?S("entries"):E:void 0,M="Array"==n?j.entries||T:T;if(M&&(x=a(M.call(new t)))!==Object.prototype&&x.next&&(f(x,w,!0),r||"function"==typeof x[p]||u(x,p,y)),_&&T&&"values"!==T.name&&(O=!0,E=function(){return T.call(this)}),r&&!m||!l&&!O&&j[p]||u(j,p,E),c[n]=E,c[w]=y,d)if(g={values:_?E:S("values"),keys:h?E:S("keys"),entries:P},m)for(b in g)b in j||i(j,b,g[b]);else o(o.P+o.F*(l||O),n,g);return g}},function(t,n,e){var r=e(0),o=e(15),i=e(44),u=e(2),c=e(1),s=function(t,n,e){var f,a,p,l=t&s.F,y=t&s.G,v=t&s.S,d=t&s.P,h=t&s.B,m=t&s.W,g=y?o:o[n]||(o[n]={}),b=g.prototype,x=y?r:v?r[n]:(r[n]||{}).prototype;y&&(e=n);for(f in e)(a=!l&&x&&void 0!==x[f])&&c(g,f)||(p=a?x[f]:e[f],g[f]=y&&"function"!=typeof x[f]?e[f]:h&&a?i(p,r):m&&x[f]==p?function(t){var n=function(n,e,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,r)}return t.apply(this,arguments)};return n.prototype=t.prototype,n}(p):d&&"function"==typeof p?i(Function.call,p):p,d&&((g.virtual||(g.virtual={}))[f]=p,t&s.R&&b&&!b[f]&&u(b,f,p)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,n,e){t.exports=!e(4)&&!e(9)(function(){return 7!=Object.defineProperty(e(29)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var r=e(7),o=e(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n,e){t.exports=e(2)},function(t,n,e){var r=e(8),o=e(47),i=e(21),u=e(19)("IE_PROTO"),c=function(){},s=function(){var t,n=e(29)("iframe"),r=i.length;for(n.style.display="none",e(52).appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;r--;)delete s.prototype[i[r]];return s()};t.exports=Object.create||function(t,n){var e;return null!==t?(c.prototype=r(t),e=new c,c.prototype=null,e[u]=t):e=s(),void 0===n?e:o(e,n)}},function(t,n,e){var r=e(1),o=e(5),i=e(49)(!1),u=e(19)("IE_PROTO");t.exports=function(t,n){var e,c=o(t),s=0,f=[];for(e in c)e!=u&&r(c,e)&&f.push(e);for(;n.length>s;)r(c,e=n[s++])&&(~i(f,e)||f.push(e));return f}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,e){var r=e(32),o=e(21).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,n,e){"use strict";var r=e(37),o=new r;t.exports=o},function(t,n,e){"use strict";function r(){}var o=e(38),i=o.formatMs,u=o.isObject,c=o.checkResourceType;r.prototype={start:function(t){this._init(),u(this.timing)&&(this.data.timingFormat=this._setTiming(this.timing),this.data.enteriesResouceDataFormat=this._setEnteries(this.enteriesResouceData),"console"==t&&this._show())},_show:function(){console.table(this.data.timingFormat);for(var t in this.data.enteriesResouceDataFormat)console.group(t+"--- 共加载时间"+i(this.data.enteriesResouceDataTiming[t])),console.table(this.data.enteriesResouceDataFormat[t]),console.groupEnd(t)},timing:{},enteriesResouceData:[],data:{timingFormat:{},enteriesResouceDataFormat:{},enteriesResouceDataTiming:{js:0,css:0,image:0,video:0,others:0}},_init:function(){this.timing=window.performance.timing,this.enteriesResouceData=window.performance.getEntriesByType("resource")},_setTiming:function(t){return{"DNS查询耗时":i(t.domainLookupEnd-t.domainLookupStart),"TCP链接耗时":i(t.connectEnd-t.connectStart),"request请求耗时":i(t.responseEnd-t.responseStart),"解析dom树耗时":i(t.domComplete-t.domInteractive),"白屏时间":i(t.responseStart-t.navigationStart),"domready时间(用户可操作时间节点)":i(t.domContentLoadedEventEnd-t.navigationStart),"onload时间(总下载时间)":i(t.loadEventEnd-t.navigationStart)}},_setEnteries:function(t){var n=this,e=[],r=[],o=[],u=[],s=[];return t.map(function(t){var f={"资源名称":t.name,"HTTP协议类型":t.nextHopProtocol,"TCP链接耗时":i(t.connectEnd-t.connectStart),"加载时间":i(t.duration)};switch(c(t.name)){case"image":n.data.enteriesResouceDataTiming.image+=t.duration,e.push(f);break;case"javascript":n.data.enteriesResouceDataTiming.js+=t.duration,r.push(f);break;case"css":n.data.enteriesResouceDataTiming.css+=t.duration,o.push(f);break;case"video":n.data.enteriesResouceDataTiming.video+=t.duration,u.push(f);break;default:n.data.enteriesResouceDataTiming.others+=t.duration,s.push(f)}}),{js:r,css:o,image:e,video:u,others:s}}},t.exports=r},function(t,n,e){"use strict";function r(t){return"object"===(void 0===t?"undefined":(0,p.default)(t))&&null!==t}function o(t){if("number"==typeof t)return t>1e3?(t/1e3).toFixed(2)+"s":Math.round(t)+"ms"}function i(t){return!!/\.(gif|jpg|jpeg|png|webp)/i.test(t)}function u(t){return!!/\.(js)/i.test(t)}function c(t){return!!/\.(css)/i.test(t)}function s(t){return!!/\.(mp4|rm|rmvb|mkv|avi|flv|ogv|webm)/i.test(t)}function f(t){return/\.(gif|jpg|jpeg|png|webp|svg)/i.test(t)?"image":/\.(js)/i.test(t)?"javascript":/\.(css)/i.test(t)?"css":/\.(mp4|rm|rmvb|mkv|avi|flv|ogv|webm)/i.test(t)?"video":"other"}n.__esModule=!0;var a=e(39),p=function(t){return t&&t.__esModule?t:{default:t}}(a);n.isObject=r,n.formatMs=o,n.isImg=i,n.isJs=u,n.isCss=c,n.isVideo=s,n.checkResourceType=f},function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}n.__esModule=!0;var o=e(40),i=r(o),u=e(59),c=r(u),s="function"==typeof c.default&&"symbol"==typeof i.default?function(t){return typeof t}:function(t){return t&&"function"==typeof c.default&&t.constructor===c.default&&t!==c.default.prototype?"symbol":typeof t};n.default="function"==typeof c.default&&"symbol"===s(i.default)?function(t){return void 0===t?"undefined":s(t)}:function(t){return t&&"function"==typeof c.default&&t.constructor===c.default&&t!==c.default.prototype?"symbol":void 0===t?"undefined":s(t)}},function(t,n,e){t.exports={default:e(41),__esModule:!0}},function(t,n,e){e(42),e(55),t.exports=e(23).f("iterator")},function(t,n,e){"use strict";var r=e(43)(!0);e(26)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,e=this._i;return e>=n.length?{value:void 0,done:!0}:(t=r(n,e),this._i+=t.length,{value:t,done:!1})})},function(t,n,e){var r=e(12),o=e(13);t.exports=function(t){return function(n,e){var i,u,c=String(o(n)),s=r(e),f=c.length;return s<0||s>=f?t?"":void 0:(i=c.charCodeAt(s),i<55296||i>56319||s+1===f||(u=c.charCodeAt(s+1))<56320||u>57343?t?c.charAt(s):i:t?c.slice(s,s+2):u-56320+(i-55296<<10)+65536)}}},function(t,n,e){var r=e(45);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){"use strict";var r=e(31),o=e(10),i=e(22),u={};e(2)(u,e(6)("iterator"),function(){return this}),t.exports=function(t,n,e){t.prototype=r(u,{next:o(1,e)}),i(t,n+" Iterator")}},function(t,n,e){var r=e(3),o=e(8),i=e(18);t.exports=e(4)?Object.defineProperties:function(t,n){o(t);for(var e,u=i(n),c=u.length,s=0;c>s;)r.f(t,e=u[s++],n[e]);return t}},function(t,n,e){var r=e(33);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n,e){var r=e(5),o=e(50),i=e(51);t.exports=function(t){return function(n,e,u){var c,s=r(n),f=o(s.length),a=i(u,f);if(t&&e!=e){for(;f>a;)if((c=s[a++])!=c)return!0}else for(;f>a;a++)if((t||a in s)&&s[a]===e)return t||a||0;return!t&&-1}}},function(t,n,e){var r=e(12),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,n,e){var r=e(12),o=Math.max,i=Math.min;t.exports=function(t,n){return t=r(t),t<0?o(t+n,0):i(t,n)}},function(t,n,e){var r=e(0).document;t.exports=r&&r.documentElement},function(t,n,e){var r=e(1),o=e(54),i=e(19)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,n,e){var r=e(13);t.exports=function(t){return Object(r(t))}},function(t,n,e){e(56);for(var r=e(0),o=e(2),i=e(17),u=e(6)("toStringTag"),c="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),s=0;s<c.length;s++){var f=c[s],a=r[f],p=a&&a.prototype;p&&!p[u]&&o(p,u,f),i[f]=i.Array}},function(t,n,e){"use strict";var r=e(57),o=e(58),i=e(17),u=e(5);t.exports=e(26)(Array,"Array",function(t,n){this._t=u(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,o(1)):"keys"==n?o(0,e):"values"==n?o(0,t[e]):o(0,[e,t[e]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,n){t.exports=function(){}},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n,e){t.exports={default:e(60),__esModule:!0}},function(t,n,e){e(61),e(67),e(68),e(69),t.exports=e(15).Symbol},function(t,n,e){"use strict";var r=e(0),o=e(1),i=e(4),u=e(27),c=e(30),s=e(62).KEY,f=e(9),a=e(20),p=e(22),l=e(11),y=e(6),v=e(23),d=e(24),h=e(63),m=e(64),g=e(8),b=e(7),x=e(5),S=e(16),w=e(10),_=e(31),O=e(65),j=e(66),T=e(3),E=e(18),P=j.f,M=T.f,L=O.f,k=r.Symbol,R=r.JSON,D=R&&R.stringify,F=y("_hidden"),C=y("toPrimitive"),A={}.propertyIsEnumerable,N=a("symbol-registry"),I=a("symbols"),G=a("op-symbols"),V=Object.prototype,H="function"==typeof k,W=r.QObject,J=!W||!W.prototype||!W.prototype.findChild,B=i&&f(function(){return 7!=_(M({},"a",{get:function(){return M(this,"a",{value:7}).a}})).a})?function(t,n,e){var r=P(V,n);r&&delete V[n],M(t,n,e),r&&t!==V&&M(V,n,r)}:M,K=function(t){var n=I[t]=_(k.prototype);return n._k=t,n},q=H&&"symbol"==typeof k.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof k},z=function(t,n,e){return t===V&&z(G,n,e),g(t),n=S(n,!0),g(e),o(I,n)?(e.enumerable?(o(t,F)&&t[F][n]&&(t[F][n]=!1),e=_(e,{enumerable:w(0,!1)})):(o(t,F)||M(t,F,w(1,{})),t[F][n]=!0),B(t,n,e)):M(t,n,e)},Y=function(t,n){g(t);for(var e,r=h(n=x(n)),o=0,i=r.length;i>o;)z(t,e=r[o++],n[e]);return t},Q=function(t,n){return void 0===n?_(t):Y(_(t),n)},U=function(t){var n=A.call(this,t=S(t,!0));return!(this===V&&o(I,t)&&!o(G,t))&&(!(n||!o(this,t)||!o(I,t)||o(this,F)&&this[F][t])||n)},X=function(t,n){if(t=x(t),n=S(n,!0),t!==V||!o(I,n)||o(G,n)){var e=P(t,n);return!e||!o(I,n)||o(t,F)&&t[F][n]||(e.enumerable=!0),e}},Z=function(t){for(var n,e=L(x(t)),r=[],i=0;e.length>i;)o(I,n=e[i++])||n==F||n==s||r.push(n);return r},$=function(t){for(var n,e=t===V,r=L(e?G:x(t)),i=[],u=0;r.length>u;)!o(I,n=r[u++])||e&&!o(V,n)||i.push(I[n]);return i};H||(k=function(){if(this instanceof k)throw TypeError("Symbol is not a constructor!");var t=l(arguments.length>0?arguments[0]:void 0),n=function(e){this===V&&n.call(G,e),o(this,F)&&o(this[F],t)&&(this[F][t]=!1),B(this,t,w(1,e))};return i&&J&&B(V,t,{configurable:!0,set:n}),K(t)},c(k.prototype,"toString",function(){return this._k}),j.f=X,T.f=z,e(35).f=O.f=Z,e(25).f=U,e(34).f=$,i&&!e(14)&&c(V,"propertyIsEnumerable",U,!0),v.f=function(t){return K(y(t))}),u(u.G+u.W+u.F*!H,{Symbol:k});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;tt.length>nt;)y(tt[nt++]);for(var et=E(y.store),rt=0;et.length>rt;)d(et[rt++]);u(u.S+u.F*!H,"Symbol",{for:function(t){return o(N,t+="")?N[t]:N[t]=k(t)},keyFor:function(t){if(!q(t))throw TypeError(t+" is not a symbol!");for(var n in N)if(N[n]===t)return n},useSetter:function(){J=!0},useSimple:function(){J=!1}}),u(u.S+u.F*!H,"Object",{create:Q,defineProperty:z,defineProperties:Y,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:$}),R&&u(u.S+u.F*(!H||f(function(){var t=k();return"[null]"!=D([t])||"{}"!=D({a:t})||"{}"!=D(Object(t))})),"JSON",{stringify:function(t){for(var n,e,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(e=n=r[1],(b(n)||void 0!==t)&&!q(t))return m(n)||(n=function(t,n){if("function"==typeof e&&(n=e.call(this,t,n)),!q(n))return n}),r[1]=n,D.apply(R,r)}}),k.prototype[C]||e(2)(k.prototype,C,k.prototype.valueOf),p(k,"Symbol"),p(Math,"Math",!0),p(r.JSON,"JSON",!0)},function(t,n,e){var r=e(11)("meta"),o=e(7),i=e(1),u=e(3).f,c=0,s=Object.isExtensible||function(){return!0},f=!e(9)(function(){return s(Object.preventExtensions({}))}),a=function(t){u(t,r,{value:{i:"O"+ ++c,w:{}}})},p=function(t,n){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!s(t))return"F";if(!n)return"E";a(t)}return t[r].i},l=function(t,n){if(!i(t,r)){if(!s(t))return!0;if(!n)return!1;a(t)}return t[r].w},y=function(t){return f&&v.NEED&&s(t)&&!i(t,r)&&a(t),t},v=t.exports={KEY:r,NEED:!1,fastKey:p,getWeak:l,onFreeze:y}},function(t,n,e){var r=e(18),o=e(34),i=e(25);t.exports=function(t){var n=r(t),e=o.f;if(e)for(var u,c=e(t),s=i.f,f=0;c.length>f;)s.call(t,u=c[f++])&&n.push(u);return n}},function(t,n,e){var r=e(33);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,n,e){var r=e(5),o=e(35).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?c(t):o(r(t))}},function(t,n,e){var r=e(25),o=e(10),i=e(5),u=e(16),c=e(1),s=e(28),f=Object.getOwnPropertyDescriptor;n.f=e(4)?f:function(t,n){if(t=i(t),n=u(n,!0),s)try{return f(t,n)}catch(t){}if(c(t,n))return o(!r.f.call(t,n),t[n])}},function(t,n){},function(t,n,e){e(24)("asyncIterator")},function(t,n,e){e(24)("observable")}])});