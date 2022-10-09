<script>
	import Vue from 'vue';
	import {
		mapState
	} from 'vuex';
	export default {
		onLaunch: async function(options) {
			// this.$store.commit("isEwmFunc")
			this.$store.dispatch('getEwmData')
			let e = uni.getSystemInfoSync();
			
			Vue.prototype.StatusBar = e.statusBarHeight;
			let custom = wx.getMenuButtonBoundingClientRect();
			
			Vue.prototype.Custom = custom;
			Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			Vue.prototype.proportion = 750 / e.windowWidth;
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									console.log('success====', res);
									// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							uni.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							});
						});
					}
				});
			}
			
			// const res = await this.$http.get('home_cate')
			// if (res.data.code == 1) {
			// 	const cate = res.data.cate
			// 	this.$store.commit('setHomeCate', cate);
			// }

		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import '@/components/feng-parse/parse.css';
	@import "./static/icon/icon.css";
	@import './colorui/ext.scss';
	@import "./static/icon/iconfont.css";
	@import './colorui/main.scss';
	page {
		font-family: Tahoma,-apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	}

	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	page {
		background: #fff;

	}


	/* #endif */
</style>
<style>
</style>
