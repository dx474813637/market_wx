(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/prodList/prodList"],{"490a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),i=a(n("0e7a"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t){return s(t)||l(t)||c(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(t){if("string"===typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function s(t){if(Array.isArray(t))return d(t)}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function f(t,e,n,r,i,a,o){try{var u=t[a](o),c=u.value}catch(l){return void n(l)}u.done?e(c):Promise.resolve(c).then(r,i)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var a=t.apply(e,n);function o(t){f(a,r,i,o,u,"next",t)}function u(t){f(a,r,i,o,u,"throw",t)}o(void 0)}))}}var p={mixins:[i.default],data:function(){return{filter_data:[],filter_select1:[],filter_select2:[],list:[],loadStatus:"loadmore",p:1,endFlag:!1,listType:"grid",priceSort:"up",navActive:0,term:"",tags:"",shareOptions:{pageName:"产品列表"},filterFlag:!1}},onLoad:function(e){var n=this;return h(r.default.mark((function i(){return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.hasOwnProperty("cate")?n.filter_select1=e.cate.split(","):(e.hasOwnProperty("term")||e.hasOwnProperty("keywords"))&&(n.term=e.term||e.keywords),n.term&&t.setNavigationBarTitle({title:n.term+"-产品列表"}),0!=n.filter_select1.length){r.next=6;break}return t.showLoading({title:"正在加载..."}),r.next=6,n.getData(!!n.term);case 6:case"end":return r.stop()}}),i)})))()},onReachBottom:function(){this.getNextData()},watch:{filter_select1:function(e){var n=this;return h(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"正在加载..."}),n.initData(),e.next=4,n.getData();case 4:case"end":return e.stop()}}),e)})))()}},methods:{handleShowBox:function(){this.handleChangeFilterBox(),this.filter_select2=JSON.parse(JSON.stringify(this.filter_select1))},handleChangeFilterBox:function(){this.filterFlag=!this.filterFlag},handleSearch:function(){var e=this;return h(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading(),e.initData(),n.next=4,e.getData(!0);case 4:t.setNavigationBarTitle({title:e.term?e.term+"-产品列表":"产品列表"});case 5:case"end":return n.stop()}}),n)})))()},initData:function(){this.list=[],this.p=1,this.endFlag=!1,this.loadStatus="loadmore"},getNextData:function(){this.endFlag||(this.p=this.p+1,this.getData())},getData:function(e){var n=this;return h(r.default.mark((function i(){var a,u,c;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n.loadStatus="loading",a=e?"search":"product",u={p:n.p,terms:n.term,cate:n.filter_select1.join(",")},r.next=5,n.$http.get("/Market/api.html?api_url_xcx=".concat(a),{params:u});case 5:c=r.sent,n.filter_data=c.data.cate.map((function(t){return t.more=!0,t})),n.list=[].concat(o(n.list),o(c.data.list)),n.share_title=c.data.share_title,n.share_img=c.data.share_img,n.p==c.data.totalPages?(n.loadStatus="nomore",n.endFlag="true"):n.loadStatus="loadmore",t.hideLoading();case 12:case"end":return r.stop()}}),i)})))()},handleChangeViewType:function(){"dot"==this.listType?this.listType="grid":this.listType="dot"},handleChangeSort:function(t){"up"==this[t]?this[t]="down":this[t]="up"},handlePathDetail:function(e){t.navigateTo({url:"/pages/prodDetail/prodDetail?id=".concat(e.id)})},inCart:function(e){var n=this;return h(r.default.mark((function i(){var a;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.showLoading(),r.next=3,n.$http.get("/Market/api.html?api_url_xcx=productDetail_json",{params:{id:e.id}});case 3:a=r.sent,1==a.data.code&&n.$store.dispatch("addCart",a.data.list);case 5:case"end":return r.stop()}}),i)})))()},handleSelectLabel:function(t){var e=this.filter_select2.indexOf(t.id);-1==e?this.filter_select2.push(t.id):this.filter_select2.splice(e,1)},filterConfirm:function(){this.filter_select1=this.filter_select2,this.term="",t.setNavigationBarTitle({title:"产品列表"}),this.handleChangeFilterBox()},filterReset:function(){this.filter_select2=[]},handleFilterMore:function(t,e){this.filter_data[t].more=!e}}};e.default=p}).call(this,n("543d")["default"])},"4e12":function(t,e,n){"use strict";var r=n("b8f1"),i=n.n(r);i.a},"5c53":function(t,e,n){"use strict";(function(t){n("0df7");r(n("66fd"));var e=r(n("7297"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"5e68":function(t,e,n){"use strict";n.r(e);var r=n("490a"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},7297:function(t,e,n){"use strict";n.r(e);var r=n("fc30"),i=n("5e68");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("b019"),n("4e12");var o,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"14366cb6",null,!1,r["a"],o);e["default"]=c.exports},b019:function(t,e,n){"use strict";var r=n("fc3c"),i=n.n(r);i.a},b8f1:function(t,e,n){},fc30:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uSticky:function(){return n.e("node-modules/uview-ui/components/u-sticky/u-sticky").then(n.bind(null,"733b"))},uSearch:function(){return n.e("node-modules/uview-ui/components/u-search/u-search").then(n.bind(null,"3052"))},uIcon:function(){return n.e("node-modules/uview-ui/components/u-icon/u-icon").then(n.bind(null,"155e"))},list:function(){return n.e("components/list/list").then(n.bind(null,"86b5"))},CardProductCell:function(){return Promise.all([n.e("common/vendor"),n.e("components/CardProductCell/CardProductCell")]).then(n.bind(null,"997e"))},CardProductGrid:function(){return n.e("components/CardProductGrid/CardProductGrid").then(n.bind(null,"274f"))},uPopup:function(){return n.e("node-modules/uview-ui/components/u-popup/u-popup").then(n.bind(null,"210d"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"562b"))}},i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.filter_data,(function(e,n){var r=t.__get_orig(e),i=t.__map(e.children,(function(e,n){var r=t.__get_orig(e),i=t.filter_select2.includes(e.id);return{$orig:r,g0:i}}));return{$orig:r,l0:i}})));t.$mp.data=Object.assign({},{$root:{l1:n}})},a=[]},fc3c:function(t,e,n){}},[["5c53","common/runtime","common/vendor"]]]);