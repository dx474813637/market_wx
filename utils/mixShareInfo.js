export default {
	data() {
		return {
			shareOptions: {
				pageName: ''
			},
			share_title: '',
			share_img: '',
			params: ''
		}
	},
	async onLoad(options) {
		if(options && options.login) {
			uni.setStorageSync('sharelogin', options.login);
		}
	},
	onShareTimeline(){
		return{
			title: this.share_title,
			query: this.getQuery(),
			imageUrl: this.share_img
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.share_title,
			path: this.getPath(),
			imageUrl: this.share_img
		};
	},
	// onShareTimeline() {
	// 	let opt = {
	// 		title: this.getShareTitle(),
	// 		query: `login=${uni.getStorageSync('login')}`
	// 	}
	// 	return opt
	// },
	// onShareAppMessage(res) {
	// 	let opt = {
	// 		title: this.getShareTitle(),
	// 		path: this.getPath(),
	// 	};
	// 	return opt
	// },
	methods: {
		getQuery() {
			let fullPath = this.$scope.$page.fullPath
			let login = `login=${uni.getStorageSync('login')}`
			let query = ''
			if(fullPath.includes('?')) {
				query = fullPath.split('?')[1] + '&' + login
			} else {
				query = login
			}
			console.log(query)
			return query
		},
		getPath() {
			let fullPath = this.$scope.$page.fullPath
			let login = `login=${uni.getStorageSync('login')}`
			if (fullPath.includes('?')) {
				login = '&' + login
			} else {
				login = '?' + login
			}
			return fullPath + login
		},
		getShareTitle() {
			let title = uni.getStorageSync('home').title || '旺铺'
			return `${title} - ${this.shareOptions.pageName}`
		}
	}
}
