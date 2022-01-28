(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderDetail/orderDetail"],{"0e82":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("a34a")),a=i(n("7a11"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,a,i,r){try{var s=t[i](r),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(o,a)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function s(t){r(i,o,a,s,c,"next",t)}function c(t){r(i,o,a,s,c,"throw",t)}s(void 0)}))}}var c=function(){n.e("components/CardSeller/CardSeller").then(function(){return resolve(n("822b"))}.bind(null,n)).catch(n.oe)},u=function(){Promise.all([n.e("common/vendor"),n.e("components/CardCoupon/CardCoupon")]).then(function(){return resolve(n("7853"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/list/list").then(function(){return resolve(n("86b5"))}.bind(null,n)).catch(n.oe)},l={mixins:[a.default],data:function(){return{id:"",list:{},couponList:[],addressData:{},cardshow:!1,pwInputShow:!1,codeInputShow:!1,couponshow:!1,sellerInfo:{},pay_pw:"",pay_code:"",p:1,endFlag:!1,loadStatus:"nomore",chooseCoupon:{},wxPay:0,customStyle:{padding:"0 10rpx",fontSize:"26rpx"},btnList:{}}},onLoad:function(t){t&&t.id&&(this.id=t.id)},onShow:function(){this.getData()},onPullDownRefresh:function(){var e=this;return s(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"获取数据中..."}),n.next=3,e.getData();case 3:t.stopPullDownRefresh();case 4:case"end":return n.stop()}}),n)})))()},components:{CardSeller:c,CardCoupon:u,List:d},computed:{num:function(){return this.list.list_product&&0!=this.list.list_product.length?this.list.list_product.reduce((function(t,e,n,o){return t+e.number}),0):0}},methods:{handleRefresh:function(){var e=this;return s(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"获取数据中..."}),n.next=3,e.getData();case 3:case"end":return n.stop()}}),n)})))()},handleShowPwInput:function(){var e=this;t.showModal({title:"提示",content:"是否确认收货？",confirmText:"确认收货",cancelText:"考虑一下",success:function(){var t=s(o.default.mark((function t(n){var a;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n.confirm){t.next=15;break}if(!e.wxPay){t.next=5;break}e.confirmSh(),t.next=13;break;case 5:if(2!=e.list.pay_tool){t.next=12;break}return t.next=8,e.sendCode();case 8:a=t.sent,1==a.data.code&&(e.codeInputShow=!0),t.next=13;break;case 12:e.pwInputShow=!0;case 13:t.next=16;break;case 15:n.cancel&&console.log("用户点击取消");case 16:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}()})},handleApplyTranSelf:function(){var e=this;return s(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"操作中"}),n.next=3,e.$http.get("Xcx/apply_tran_self",{params:{order_id:e.id}});case 3:a=n.sent,t.hideLoading(),1==a.data.code&&t.showToast({title:"操作成功",success:function(){setTimeout((function(){e.getData()}),1200)}});case 6:case"end":return n.stop()}}),n)})))()},canclePay:function(){this.pwInputShow=!1},confirmSh:function(){var e=this;return s(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.canclePay(),t.showLoading({title:"确认收货中"}),n.next=4,e.$http.get(e.wxPay?"Xcx/sinopay_ok2":"Xcx/sinopay_ok",{params:{psw:e.pay_pw,order_id:e.id}});case 4:a=n.sent,t.hideLoading(),1==a.data.code&&t.showToast({title:"确认收货成功",success:function(){setTimeout((function(){e.getData()}),1200)}});case 7:case"end":return n.stop()}}),n)})))()},cancleCode:function(){this.codeInputShow=!1},sendCode:function(){var e=this;return s(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"发送短信验证码中..."}),n.next=3,e.$http.get("Xcx/get_mobile_code",{params:{order_id:e.id}});case 3:return a=n.sent,t.hideLoading(),n.abrupt("return",a);case 6:case"end":return n.stop()}}),n)})))()},confirmSz:function(){var e=this;return s(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"确认收货中"}),n.next=3,e.$http.get("Xcx/sinopay_ok3",{params:{order_id:e.id,code:e.pay_code}});case 3:a=n.sent,t.hideLoading(),1==a.data.code&&(e.cancleCode(),t.showToast({title:"确认收货成功",success:function(){setTimeout((function(){e.getData()}),1200)}}));case 6:case"end":return n.stop()}}),n)})))()},concatShop:function(){this.cardshow=!0},chooseAddress:function(){t.navigateTo({url:"/pages/address/address?source=1"})},setAddress:function(){var e=this;return s(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"提交中"}),n.next=3,e.$http.get("Xcx/set_buy_get_type",{params:{order_id:e.id,buy_address_id:e.addressData.id}});case 3:n.sent,t.hideLoading(),t.showToast({title:"提交成功"}),e.getData();case 7:case"end":return n.stop()}}),n)})))()},confirmOrder:function(){var e=this;return s(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"提交中"}),n.next=3,e.$http.get("Xcx/check_tran_price",{params:{order_id:e.id}});case 3:n.sent,t.hideLoading(),t.showToast({title:"提交成功",success:function(){setTimeout((function(){e.getData()}),1e3)}});case 6:case"end":return n.stop()}}),n)})))()},cancleOrderPrice:function(){var e=this;return s(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"提交中"}),n.next=3,e.$http.get("Xcx/roll_back_tran_price",{params:{order_id:e.id}});case 3:n.sent,t.hideLoading(),t.showToast({title:"操作成功",success:function(){setTimeout((function(){e.getData()}),1e3)}});case 6:case"end":return n.stop()}}),n)})))()},buyBtn:function(){var e=this;this.list.id&&(this.chooseCoupon.id||this.chooseCoupon.guid?t.navigateTo({url:"/pages/money/pay?orderid=".concat(this.id,"&price=").concat(this.list.pay_price,"&coupon_guid=").concat(this.chooseCoupon.guid,"&coupon_id=").concat(this.chooseCoupon.cid,"&coupon_cate=").concat(this.chooseCoupon.cate,"&coupon_coupon=").concat(this.chooseCoupon.coupon)}):t.showModal({title:"优惠券提示",content:"当前订单未选择优惠券，是否放弃优惠直接付款",confirmText:"放弃优惠",cancelText:"考虑一下",success:function(n){n.confirm?t.navigateTo({url:"/pages/money/pay?orderid=".concat(e.id,"&price=").concat(e.list.pay_price)}):n.cancel&&console.log("用户点击取消")}}))},cancleOrderBtn:function(){var e=this;this.list.id&&t.showModal({title:"提示",content:"是否取消本订单？",confirmText:"取消订单",cancelText:"考虑一下",success:function(n){n.confirm?(t.showLoading({title:"操作中"}),e.$http.get("Xcx/order_cancel",{params:{order_id:e.id}}).then((function(n){t.hideLoading(),1==n.data.code&&t.showToast({title:"操作成功",success:function(){setTimeout((function(){e.getData()}),1e3)}})}))):n.cancel&&console.log("用户点击取消")}})},getData:function(){var e=this;return s(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"加载中..."}),n.next=3,e.$http.get("Xcx/order_detail",{params:{order_id:e.id}});case 3:a=n.sent,t.hideLoading(),e.list=a.data.list,e.btnList=a.data.button,e.sellerInfo=a.data.sell_cards,e.wxPay=a.data.wx_pay,0==e.list.pay_status&&1==e.list.state&&e.getCoupon();case 10:case"end":return n.stop()}}),n)})))()},showCouponList:function(){this.couponshow=!0},getCoupon:function(){var e=this;return s(o.default.mark((function n(){var a,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(0!=Object.keys(e.$store.state.couponCate).length){n.next=5;break}return n.next=3,e.$http.get("Xcx/coupon_list_login");case 3:a=n.sent,e.$store.commit("getCouponCate",a.data.list.cate);case 5:return n.next=7,e.$http.post("Xcx/shop_coupon_login_list",{login:t.getStorageSync("login"),order_id:e.id});case 7:i=n.sent,e.couponList=i.data.list.list.map((function(t){return t.term>e.list.pay_price?t.disabled=!0:t.disabled=!1,t}));case 9:case"end":return n.stop()}}),n)})))()},handleTake:function(e){var n=this;return s(o.default.mark((function a(){var i,r,s,c,u;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return console.log(e),o.next=3,n.$http.get("Xcx/oupon_product_list",{params:{id:e.cid}});case 3:if(i=o.sent,1!=i.data.code){o.next=19;break}if(r=i.data.list,s=n.list.list_product.filter((function(t){return r.includes(t.pid)})),0!=s.length){o.next=11;break}t.showToast({title:"无法使用该优惠劵",icon:"none"}),o.next=19;break;case 11:if(c=s.reduce((function(t,e,n,o){return t+e.pay_price}),0),!(c<e.term)){o.next=15;break}return t.showToast({title:"无法使用该优惠劵",icon:"none"}),o.abrupt("return");case 15:return o.next=17,n.$http.get("Xcx/get_use_coupon",{params:{cno:e.guid}});case 17:u=o.sent,1==u.data.list.code?(n.chooseCoupon=e,n.couponshow=!1,t.showToast({title:"已选择优惠券"})):t.showToast({title:u.data.list.msg,icon:"none"});case 19:case"end":return o.stop()}}),a)})))()}}};e.default=l}).call(this,n("543d")["default"])},1593:function(t,e,n){"use strict";(function(t){n("0df7");o(n("66fd"));var e=o(n("fe1b"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},4529:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uIcon:function(){return n.e("node-modules/uview-ui/components/u-icon/u-icon").then(n.bind(null,"155e"))},uImage:function(){return n.e("node-modules/uview-ui/components/u-image/u-image").then(n.bind(null,"a539"))},uButton:function(){return n.e("node-modules/uview-ui/components/u-button/u-button").then(n.bind(null,"562b"))},uPopup:function(){return n.e("node-modules/uview-ui/components/u-popup/u-popup").then(n.bind(null,"210d"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-input/u-input")]).then(n.bind(null,"9f5c"))},CardCoupon:function(){return Promise.all([n.e("common/vendor"),n.e("components/CardCoupon/CardCoupon")]).then(n.bind(null,"7853"))}},a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.list.list_product?t.__map(t.list.list_product,(function(e,n){var o=t.__get_orig(e),a=t._f("moneyDwInt")(e.single_price),i=t._f("moneyDwPoint")(e.single_price);return{$orig:o,f0:a,f1:i}})):null),o=t._f("moneyDwInt")(t.list.pay_price),a=t._f("moneyDwPoint")(t.list.pay_price),i=5==t.list.pay_status||2==t.list.state||3==t.list.pay_status?t._f("moneyDwInt")(t.list.coupon?t.list.coupon.coupon:0):null,r=5==t.list.pay_status||2==t.list.state||3==t.list.pay_status?t._f("moneyDwPoint")(t.list.coupon?t.list.coupon.coupon:0):null,s=5==t.list.pay_status||2==t.list.state||3==t.list.pay_status?t._f("moneyDwInt")(t.list.final_price):null,c=5==t.list.pay_status||2==t.list.state||3==t.list.pay_status?t._f("moneyDwPoint")(t.list.final_price):null,u=0!=t.list.buy_get_type&&1!=t.list.buy_get_type?t._f("buyGetType")(t.list.buy_get_type):null;t.$mp.data=Object.assign({},{$root:{l0:n,f2:o,f3:a,f4:i,f5:r,f6:s,f7:c,f8:u}})},i=[]},4825:function(t,e,n){"use strict";var o=n("736c"),a=n.n(o);a.a},"736c":function(t,e,n){},b771:function(t,e,n){"use strict";n.r(e);var o=n("0e82"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},bab8:function(t,e,n){},d91d:function(t,e,n){"use strict";var o=n("bab8"),a=n.n(o);a.a},fe1b:function(t,e,n){"use strict";n.r(e);var o=n("4529"),a=n("b771");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("4825"),n("d91d");var r,s=n("f0c5"),c=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"3bf4cf52",null,!1,o["a"],r);e["default"]=c.exports}},[["1593","common/runtime","common/vendor"]]]);