(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address"],{"050b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n("a34a")),i=o(n("3828")),a=o(n("7a11"));function o(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,r,i,a,o){try{var s=t[a](o),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(r,i)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var a=t.apply(e,n);function o(t){s(a,r,i,o,u,"next",t)}function u(t){s(a,r,i,o,u,"throw",t)}o(void 0)}))}}function c(t){return h(t)||f(t)||l(t)||d()}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t,e){if(t){if("string"===typeof t)return p(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(t,e):void 0}}function f(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function h(t){if(Array.isArray(t))return p(t)}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var m=function(){n.e("components/list/list").then(function(){return resolve(n("86b5"))}.bind(null,n)).catch(n.oe)},g={mixins:[a.default],data:function(){return{source:0,addressList:[],p:1,endFlag:!1,loadStatus:"loadmore",iconType:"flower",loadText:{loadmore:"轻轻上拉",loading:"努力加载中",nomore:"我也是有底线的"},sid:""}},computed:{addrfilter:function(){var t=this;if(0==this.addressList.length)return[];if(1==this.source&&this.sid&&-1!=this.sid){var e,n=this.$u.deepClone(this.addressList);if(n.some((function(n,r){return n.id==t.sid&&(e=r,!0)})),e)return[].concat(c(n.slice(0,1)),[n[e]],c(n.slice(1,e)),c(n.slice(e+1)))}return this.addressList}},components:{List:m},onLoad:function(t){t&&t.source&&(this.source=t.source),t&&t.sid&&(this.sid=t.sid,console.log(this.sid)),this.getData(),this.getRegionalList()},onReachBottom:function(){this.getNextData()},methods:{init:function(){this.addressList=[],this.p=1,this.endFlag=!1,this.loadStatus="loadmore"},getNextData:function(){this.endFlag||(this.p=this.p+1,this.getData())},getRegionalList:function(){var t=this;return u(r.default.mark((function e(){var n,a,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0==t.$store.state.regionalList.length){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.$http.get("Xcx/regional_list");case 4:n=e.sent,a=JSON.parse(n.data.list),o=(0,i.default)(a),t.$store.commit("getRegionalList",o);case 8:case"end":return e.stop()}}),e)})))()},getData:function(){var e=this;return u(r.default.mark((function n(){var i,a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.loadStatus="loading",n.next=3,e.$http.get("Xcx/addresss_list",{params:{p:e.p,t:1}});case 3:i=n.sent,1==i.data.code&&(a=i.data.list.list,e.addressList=[].concat(c(e.addressList),c(a)),e.p==i.data.list.pw_page_total?(e.endFlag=!0,e.loadStatus="nomore"):e.loadStatus="loadmore",t.hideLoading());case 5:case"end":return n.stop()}}),n)})))()},checkAddress:function(e){1==this.source&&(this.$api.prePage().addressData=e,t.navigateBack())},addAddress:function(e,n){t.navigateTo({url:"/pages/address/addressManage?type=".concat(e,"&data=").concat(JSON.stringify(n))})},refreshList:function(t){this.init(),this.getData()}}};e.default=g}).call(this,n("543d")["default"])},"3d92":function(t,e,n){"use strict";var r=n("9f1b"),i=n.n(r);i.a},"4b91":function(t,e,n){"use strict";(function(t){n("0df7");r(n("66fd"));var e=r(n("8908"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"677c":function(t,e,n){"use strict";n.r(e);var r=n("050b"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},8908:function(t,e,n){"use strict";n.r(e);var r=n("de61"),i=n("677c");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("3d92"),n("d9e5");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"3b1e03ca",null,!1,r["a"],o);e["default"]=u.exports},"9f1b":function(t,e,n){},d9e5:function(t,e,n){"use strict";var r=n("f5f5"),i=n.n(r);i.a},de61:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uIcon:function(){return n.e("node-modules/uview-ui/components/u-icon/u-icon").then(n.bind(null,"155e"))},uLoadmore:function(){return n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"9100"))},uEmpty:function(){return n.e("node-modules/uview-ui/components/u-empty/u-empty").then(n.bind(null,"3f6d"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},f5f5:function(t,e,n){}},[["4b91","common/runtime","common/vendor"]]]);