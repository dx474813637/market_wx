(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/hq/hq"],{"037c":function(t,n,e){"use strict";var a=e("2f06"),u=e.n(a);u.a},"102b":function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var a={uSticky:function(){return e.e("node-modules/uview-ui/components/u-sticky/u-sticky").then(e.bind(null,"733b"))},uTabs:function(){return e.e("node-modules/uview-ui/components/u-tabs/u-tabs").then(e.bind(null,"f6b8"))},uIcon:function(){return e.e("node-modules/uview-ui/components/u-icon/u-icon").then(e.bind(null,"155e"))},uImage:function(){return e.e("node-modules/uview-ui/components/u-image/u-image").then(e.bind(null,"a539"))}},u=function(){var t=this,n=t.$createElement;t._self._c},i=[]},"1c44":function(t,n,e){"use strict";e.r(n);var a=e("cf30"),u=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=u.a},"2f06":function(t,n,e){},"527a":function(t,n,e){"use strict";e.r(n);var a=e("102b"),u=e("1c44");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("897c"),e("037c");var r,c=e("f0c5"),o=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,"52ea4eaa",null,!1,a["a"],r);n["default"]=o.exports},"57d3":function(t,n,e){"use strict";(function(t){e("0df7");a(e("66fd"));var n=a(e("527a"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},"897c":function(t,n,e){"use strict";var a=e("c7f8"),u=e.n(a);u.a},c7f8:function(t,n,e){},cf30:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("a34a")),u=i(e("0e7a"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,a,u,i,r){try{var c=t[i](r),o=c.value}catch(s){return void e(s)}c.done?n(o):Promise.resolve(o).then(a,u)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(a,u){var i=t.apply(n,e);function c(t){r(i,a,u,c,o,"next",t)}function o(t){r(i,a,u,c,o,"throw",t)}c(void 0)}))}}var o={mixins:[u.default],data:function(){return{id:-1,tabs_list:[],tabs_current:0,ppi:{data:[],img:""},ppi_price:[],list:{}}},onLoad:function(){var n=this;return c(a.default.mark((function e(){return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading(),e.next=3,n.getData();case 3:case"end":return e.stop()}}),e)})))()},watch:{id:function(n){var e=this;return c(a.default.mark((function u(){return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!(n<=0)){a.next=2;break}return a.abrupt("return");case 2:return t.showLoading(),a.next=5,e.getData();case 5:case"end":return a.stop()}}),u)})))()}},mounted:function(){t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#004b91",animation:{duration:400,timingFunc:"easeIn"}})},methods:{tabsChange:function(t){this.tabs_current=t,this.id=this.tabs_list[t].id},getData:function(){var n=this;return c(a.default.mark((function e(){var u;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$http.get("/Market/api.html?api_url_xcx=hq",{params:{id:-1==n.id?"":n.id}});case 2:u=e.sent,t.hideLoading(),1==u.data.code&&(n.tabs_list=u.data.cate,n.ppi=u.data.ppi,n.ppi_price=u.data.ppi_price,n.list=u.data.list,n.share_title=u.data.share_title,n.share_img=u.data.share_img);case 5:case"end":return e.stop()}}),e)})))()}}};n.default=o}).call(this,e("543d")["default"])}},[["57d3","common/runtime","common/vendor"]]]);