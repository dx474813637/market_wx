export default {
	data() {
			
		return {
			couponShareTitle: "",
			loginBind: {
				auth: 0,
				cash_name: ""
			}
		}
	},
	async onLoad() {
		// uni.removeStorageSync('login')
		let res = await this.checkLogin()	
		if(res.data.share_name) this.couponShareTitle = res.data.share_name
		this.loginBind.auth = res.data.auth
		this.loginBind.cash_name = res.data.cash_name
		this.loginBind.order_type = res.data.order_type
		if(res.data.login != 0) {
			uni.setStorageSync('login', res.data.login)
		}else {
			uni.setStorageSync('prePage', getCurrentPages()[getCurrentPages().length - 1].$page.fullPath)
			if(getCurrentPages()[0].route != "pages/mine/mine") {
				uni.redirectTo({
					url: '/pages/login/index'
				})
				uni.showToast({
					title: '请登录生意宝账号。',
					icon: 'none'
				})
			}
			
		}
	},
	methods: {
		async checkLogin() {
			return await this.$http.get('Xcx/check_login')
		},
	}
}