/**
 * @version 3.0.4
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-2.7.14 alpha-2.8.0
 */
import Request from '@/utils/luch-request/index.js'
import md5Libs from "uview-ui/libs/function/md5";

// 获取storage中token
const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync('userid')
	} catch (e) {
		//TODO handle the exception
	}
	return token
}

const http = new Request()

const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync():{}
// console.log(extConfig)
// console.log(extConfig.attr.login)
			
uni.setStorageSync('xcx_login', extConfig.attr.login);
uni.setStorageSync('xcx_appid', extConfig.attr.wxappid);
 
function get_xcx_code() {
	return new Promise((resolve, rejected) => {
		uni.login({
			success: function (res){
				resolve(res.code);
			},
			fail: err => {
				md5flag = true
				rejected(err)
			}
		});
	});
}

async function refreshToken() {
	// token接口获取token值
	try{
		let code = await get_xcx_code();
		console.log('code打印:',code)
		return http.post('Xcx/xcx_login',{code:code})
	}catch(e){
		return e
	}
	
}


// 给实例添加一个setToken方法，用于登录后方便将最新token动态添加到header，同时将token保存在localStorage中
http.setToken = (token, md5flag) => {
	http.config.header['userid'] = token
	if(!md5flag) {
		// 不存在md5时保存userid
		uni.setStorageSync('userid', token) 
	}
	
}
let md5flag = false
let requests = [] // 存储无token的请求队列
let isRefreshing = false //正在刷新token


http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = 'https://wx3.y.netsun.com/' /* 根域名不同 */
	config.header = {
		...config.header,
		'content-type': 'application/x-www-form-urlencoded',
		'appid': 10000,
		'appsecret': '7923FoGlaAlRnbpfl+lepwzh/2lVLDAnb8gyRDSpJKX6TJLW9CTXfW4',
		'xcxlogin': extConfig.attr.login,
		'xcxappid': extConfig.attr.wxappid,
		'market': extConfig.attr.market
	}
	return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	const token = getTokenStorage()
	config.header = {
		...config.header,
		'userid': token
	}
	// 登录接口和刷新token接口绕过
	if (config.url.indexOf('xcx_login') >= 0) {
		return config
	}
	if (!token) {
		// 立即刷新token
		if (!isRefreshing) {
			console.log('刷新token ing')
			isRefreshing = true
			refreshToken().then(res => {
				console.log('获取token成功，存入头部',res)
				let userid = ""
				if(res.errMsg != "request:ok") {
					userid = md5Libs.md5(formatDate(new Date()) + 'toocle')
					http.setToken(userid, true)
				}else {
					userid = res.data.userid
					http.setToken(userid)
				}
				
				console.log('刷新token成功，执行队列')
				requests.forEach(cb => cb(userid))
				// 执行完成后，清空队列
				requests = []
			}).catch(res => {
				console.error('refresh token error: ', res)
			}).finally(() => {
				isRefreshing = false
			})
		}
		return new Promise(resolve => {
			requests.push((token) => {
				// 因为config中的token是旧的，所以刷新token后要将新token传进来
				config.header['userid'] = token
				resolve(config)
			})
		})

	}
	/*
	 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	   return Promise.reject(config)
	 }
	 */
	return config
}, (config) => {
	return Promise.reject(config)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//   return Promise.reject(response)
	// }
	uni.hideLoading()
	uni.hideNavigationBarLoading();
	if (response.hasOwnProperty('data')) {
		if (response.data.code != 1) {
			if (response.data.msg) {
				uni.showToast({
					title: response.data.msg,
					icon: 'none',
					mask: true,
					duration: 1000
				})
			}
		}
	} 
	return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	console.log(response)
	return Promise.reject(response)
})
var formatDate = function (date) { 
    var y = date.getFullYear(); 
    var m = date.getMonth() + 1; 
    m = m < 10 ? '0' + m : m; 
    var d = date.getDate(); 
    d = d < 10 ? ('0' + d) : d; 
    return y + m + d; 
}; 
export {
	http
}
