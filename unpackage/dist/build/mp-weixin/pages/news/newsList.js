(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/news/newsList"],{2439:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(e("a34a")),a=u(e("0e7a"));function u(t){return t&&t.__esModule?t:{default:t}}function i(t){return f(t)||s(t)||c(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,n){if(t){if("string"===typeof t)return d(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?d(t,n):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function f(t){if(Array.isArray(t))return d(t)}function d(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function l(t,n,e,r,a,u,i){try{var o=t[u](i),c=o.value}catch(s){return void e(s)}o.done?n(c):Promise.resolve(c).then(r,a)}function m(t){return function(){var n=this,e=arguments;return new Promise((function(r,a){var u=t.apply(n,e);function i(t){l(u,r,a,i,o,"next",t)}function o(t){l(u,r,a,i,o,"throw",t)}i(void 0)}))}}var p={mixins:[a.default],data:function(){return{id:-1,tabs_list:[],tabs_current:0,news:[],options:{}}},onLoad:function(){var n=this;return m(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading(),e.next=3,n.getData();case 3:case"end":return e.stop()}}),e)})))()},watch:{id:function(n){var e=this;return m(r.default.mark((function a(){return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(-1!=n){r.next=2;break}return r.abrupt("return");case 2:return t.showLoading(),r.next=5,e.getData();case 5:case"end":return r.stop()}}),a)})))()}},mounted:function(){t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#004b91",animation:{duration:400,timingFunc:"easeIn"}})},methods:{tabsChange:function(t){this.tabs_current=t,this.id=this.tabs_list[t].id},getData:function(){var n=this;return m(r.default.mark((function e(){var a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$http.get("/Market/api.html?api_url_xcx=news",{params:{cate:-1==n.id?"":n.id}});case 2:a=e.sent,t.hideLoading(),n.tabs_list=[{name:"全部",id:""}].concat(i(a.data.cate)),n.news=a.data.list,n.options=a.data.options,n.share_title=a.data.share_title,n.share_img=a.data.share_img;case 9:case"end":return e.stop()}}),e)})))()}}};n.default=p}).call(this,e("543d")["default"])},"2ab5":function(t,n,e){"use strict";e.r(n);var r=e("2439"),a=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=a.a},"462e":function(t,n,e){"use strict";e.r(n);var r=e("e242"),a=e("2ab5");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("b2a7"),e("ad7f");var i,o=e("f0c5"),c=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,"b01f97ce",null,!1,r["a"],i);n["default"]=c.exports},"48c8":function(t,n,e){"use strict";(function(t){e("0df7");r(e("66fd"));var n=r(e("462e"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},"688e":function(t,n,e){},ad7f:function(t,n,e){"use strict";var r=e("688e"),a=e.n(r);a.a},b2a7:function(t,n,e){"use strict";var r=e("f655"),a=e.n(r);a.a},e242:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}));var r={uTabs:function(){return e.e("node-modules/uview-ui/components/u-tabs/u-tabs").then(e.bind(null,"f6b8"))},uImage:function(){return e.e("node-modules/uview-ui/components/u-image/u-image").then(e.bind(null,"a539"))},uEmpty:function(){return e.e("node-modules/uview-ui/components/u-empty/u-empty").then(e.bind(null,"3f6d"))}},a=function(){var t=this,n=t.$createElement;t._self._c},u=[]},f655:function(t,n,e){}},[["48c8","common/runtime","common/vendor"]]]);