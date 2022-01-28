<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips">验证码已发送至 +{{login | filterLogin}}</view>
			<u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
			<text :class="{ error: error }">验证码错误，请重新输入</text>
			<view class="captcha">
				<text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text>
				<text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			maxlength: 6,
			value: '',
			second: 60,
			show: false,
			error: false,
			login: '',
		};
	},
	computed: {},
	onLoad(opt) {
		if(opt && opt.login) {
			this.login = opt.login
			this.getCaptcha()
			let interval = setInterval(() => {
				this.second--;
				if (this.second <= 0) {
					this.show = true;
					if (this.value.lenth != 6) {
						this.error = true;
					}
					clearInterval(interval);
				}
			}, 1000);
		}else {
			uni.navigateTo({
				url: '/pages/login/index'
			})
		}
		
	},
	filters: {
		filterLogin(v) {
			return v.replace(/^([1-9]{3})[0-9]{4}([0-9]{4})$/, "$1****$2")
		}
	},
	methods: {
		// 收不到验证码选择时的选择
		noCaptcha() {
			uni.showActionSheet({
				itemList: ['重新获取验证码'],
				success: function(res) {
					// console.log(res)
					if(res.errMsg == 'showActionSheet:ok') {
						if(res.tapIndex == 0) {
							this.getCaptcha()
						}
					}
				},
				fail: function(res) {
					
				}
			});
		},
		// change事件侦听
		change(value) {
			// console.log('change', value);
		},
		// 输入完验证码最后一位执行
		async finish(value) {
			uni.showLoading({
				title: '验证中...'
			})
			let res = await this.$http.get('Xcx/syblogin', {params: {login: this.login, msgcode: value}})
			// uni.hideLoading()
			if(res.data.code == 1) {
				uni.setStorageSync('login', res.data.back.login)
				if(uni.getStorageSync('prePage')) {
					uni.redirectTo({
						url: uni.getStorageSync('prePage')
					})
					uni.removeStorageSync('prePage')
				}else {
					uni.navigateTo({
						url: '/pages/mine/mine'
					})
				}
				uni.showToast({
					icon: 'none',
					title: res.data.msg,
				})
			}else {
				this.value = '' 
			}
			
		},
		async getCaptcha() {
			let res = await this.$http.get('Xcx/msgcode', {params: {login: this.login}})
			uni.showToast({
				icon: 'none',
				title: res.data.msg
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 80rpx 0;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
		padding: 0 80rpx;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
	padding: 0 80rpx;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
	padding: 0 80rpx;
}
.captcha {
	color: $u-type-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	padding: 0 80rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
