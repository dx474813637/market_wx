(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/list/list"],{2915:function(t,e,n){},3023:function(t,e,n){"use strict";n.r(e);var o=n("dab2"),u=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=u.a},"3bb4":function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var o={uLoadmore:function(){return n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"9100"))},uEmpty:function(){return n.e("node-modules/uview-ui/components/u-empty/u-empty").then(n.bind(null,"3f6d"))}},u=function(){var t=this,e=t.$createElement,n=(t._self._c,t.list.length>0?t.__map(t.list,(function(e,n){var o=t.__get_orig(e);return"augmented"===t.$scope.data.scopedSlotsCompiler&&(t.$setScopedSlotsParams("dot",{item:o,type:t.billType}),t.$setScopedSlotsParams("grid",{item:o})),{$orig:o}})):null);t.$mp.data=Object.assign({},{$root:{l0:n}})},r=[]},"3c5a":function(t,e,n){"use strict";var o=n("2915"),u=n.n(o);u.a},"86b5":function(t,e,n){"use strict";n.r(e);var o=n("3bb4"),u=n("3023");for(var r in u)"default"!==r&&function(t){n.d(e,t,(function(){return u[t]}))}(r);n("3c5a");var a,i=n("f0c5"),l=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,"0529ac9f",null,!1,o["a"],a);e["default"]=l.exports},dab2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"list",props:{loadStatus:{type:String,defalut:"loadmore"},listType:{type:String,defalut:"dot"},emptyText:{type:String,defalut:"无内容"},emptyMode:{type:String,defalut:"list"},emptymarginTop:{type:String|Number,default:80},list:{type:Array,defalut:function(){return[]}},mainKey:{type:String,defalut:"id"},billType:{type:String|Number,default:0}},data:function(){return{iconType:"flower",loadText:{loadmore:"轻轻上拉",loading:"努力加载中",nomore:"我也是有底线的"}}},methods:{handlegoto:function(t){this.$emit("goto",t)}}};e.default=o}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/list/list-create-component',
    {
        'components/list/list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("86b5"))
        })
    },
    [['components/list/list-create-component']]
]);