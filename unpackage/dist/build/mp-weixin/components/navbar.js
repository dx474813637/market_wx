(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/navbar"],{"0675":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={props:{index:{type:[Number,String],default:0},tabbar:{type:Boolean,default:!1},name:{type:String,default:""},type:{type:Number,default:1}},data:function(){return{nav_memu:n.getStorageSync("nav_menu"),activeindex:0,nav_bs_id:0,verson:""}},created:function(){var n=wx.getAccountInfoSync();n.miniProgram&&(this.verson=n.miniProgram.version),this.home_menuUrl()},computed:{count:function(){return this.$store.state.cartCount}},mounted:function(){},methods:{home_menuUrl:function(){var t=this;this.$http.get("/Market/home_menu",{params:{verson:this.verson,key:"syb"}}).then((function(e){1==e.data.code&&(t.nav_memu=e.data,n.setStorageSync("nav_menu",e.data))}))},navTo:function(t){2!=this.type?n.reLaunch({url:t}):n.redirectTo({url:t})}}};t.default=e}).call(this,e("543d")["default"])},"26f5":function(n,t,e){"use strict";var u=e("5572"),a=e.n(u);a.a},"4f29":function(n,t,e){"use strict";e.r(t);var u=e("0675"),a=e.n(u);for(var r in u)"default"!==r&&function(n){e.d(t,n,(function(){return u[n]}))}(r);t["default"]=a.a},5572:function(n,t,e){},bfc4:function(n,t,e){"use strict";e.r(t);var u=e("d9f1"),a=e("4f29");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);e("26f5");var o,i=e("f0c5"),c=Object(i["a"])(a["default"],u["b"],u["c"],!1,null,"23840064",null,!1,u["a"],o);t["default"]=c.exports},d9f1:function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return u}));var u={uBadge:function(){return e.e("node-modules/uview-ui/components/u-badge/u-badge").then(e.bind(null,"a2b9"))}},a=function(){var n=this,t=n.$createElement;n._self._c},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/navbar-create-component',
    {
        'components/navbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("bfc4"))
        })
    },
    [['components/navbar-create-component']]
]);
