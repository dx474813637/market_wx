(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"02c6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(n("a34a")),a=n("26cb"),o=u(n("7a11"));function u(t){return t&&t.__esModule?t:{default:t}}function i(t){return f(t)||l(t)||s(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function f(t){if(Array.isArray(t))return d(t)}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function p(t,e,n,r,a,o,u){try{var i=t[o](u),c=i.value}catch(s){return void n(s)}i.done?e(c):Promise.resolve(c).then(r,a)}function b(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function u(t){p(o,r,a,u,i,"next",t)}function i(t){p(o,r,a,u,i,"throw",t)}u(void 0)}))}}function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){m(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g=function(){n.e("components/list/list").then(function(){return resolve(n("86b5"))}.bind(null,n)).catch(n.oe)},w=function(){n.e("components/CardOrder/CardOrder").then(function(){return resolve(n("859c"))}.bind(null,n)).catch(n.oe)},y={mixins:[o.default],data:function(){return{keyword:"",bgColor:{backgroundColor:"#004b91"},tabsList:[],tabsCurrent:0,list:[],p:1,endFlag:!1,loadStatus:"loadmore"}},components:{List:g,CardOrder:w},computed:v({},(0,a.mapState)(["theme"])),onLoad:function(e){var n=this;return b(r.default.mark((function a(){return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,n.getType();case 2:return e&&e.current&&(n.tabsCurrent=e.current),t.showLoading({title:"正在加载..."}),r.next=6,n.getData();case 6:case"end":return r.stop()}}),a)})))()},onReachBottom:function(){this.getNextData()},onPullDownRefresh:function(){var e=this;return b(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.initData(),t.showLoading({title:"获取数据中..."}),n.next=4,e.getData();case 4:t.stopPullDownRefresh();case 5:case"end":return n.stop()}}),n)})))()},methods:{tabsChange:function(e){var n=this;return b(r.default.mark((function a(){return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n.tabsCurrent=e,n.initData(),t.showLoading({title:"正在加载..."}),r.next=5,n.getData();case 5:case"end":return r.stop()}}),a)})))()},initData:function(){this.list=[],this.p=1,this.endFlag=!1,this.loadStatus="loadmore"},getNextData:function(){this.endFlag||(this.p=this.p+1,this.getData())},getType:function(){var t=this;return b(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("Xcx/order_type",{});case 2:n=e.sent,1==n.data.code&&(t.tabsList=n.data.list);case 4:case"end":return e.stop()}}),e)})))()},getData:function(){var e=this;return b(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.loadStatus="loading",n.next=3,e.$http.get("Xcx/order_list",{params:{p:e.p,type:e.tabsList[e.tabsCurrent].type}});case 3:a=n.sent,e.list=[].concat(i(e.list),i(a.data.list.list_order)),e.p==a.data.list.pw_page_total?(e.loadStatus="nomore",e.endFlag="true"):e.loadStatus="loadmore",t.hideLoading();case 7:case"end":return n.stop()}}),n)})))()}}};e.default=y}).call(this,n("543d")["default"])},1966:function(t,e,n){"use strict";var r=n("9340"),a=n.n(r);a.a},2040:function(t,e,n){"use strict";n.r(e);var r=n("b1d9"),a=n("878d");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("a81a"),n("1966");var u,i=n("f0c5"),c=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,"7bb0d91f",null,!1,r["a"],u);e["default"]=c.exports},"2cc3":function(t,e,n){"use strict";(function(t){n("0df7");r(n("66fd"));var e=r(n("2040"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"2e17":function(t,e,n){},"878d":function(t,e,n){"use strict";n.r(e);var r=n("02c6"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},9340:function(t,e,n){},a81a:function(t,e,n){"use strict";var r=n("2e17"),a=n.n(r);a.a},b1d9:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={uSticky:function(){return n.e("node-modules/uview-ui/components/u-sticky/u-sticky").then(n.bind(null,"733b"))},uTabs:function(){return n.e("node-modules/uview-ui/components/u-tabs/u-tabs").then(n.bind(null,"f6b8"))},CardOrder:function(){return n.e("components/CardOrder/CardOrder").then(n.bind(null,"859c"))}},a=function(){var t=this,e=t.$createElement;t._self._c},o=[]}},[["2cc3","common/runtime","common/vendor"]]]);