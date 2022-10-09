import Vue from 'vue'
import App from './App'
import store from './store'
import { http } from '@/common/service.js' // 全局挂载引入，配置相关在该index.js文件里修改
import uView from "uview-ui";
import filters from '@/static/js/filters.js'
Vue.use(uView);

import navbar from './components/navbar.vue'
Vue.component('nav-bar', navbar)

Vue.config.productionTip = false

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
// const json = type=>{
// 	//模拟异步请求数据
// 	return new Promise(resolve=>{
// 		setTimeout(()=>{
// 			resolve(Json[type]);
// 		}, 500)
// 	})
// }

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.prototype.$api = {msg, prePage};
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))

const app = new Vue({
	store,
    ...App
})
app.$mount()
