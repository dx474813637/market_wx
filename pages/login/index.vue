<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录生意宝</view>
			<u-form :model="form" ref="uForm" :error-type="['border-bottom', 'toast']">
				<u-form-item prop="login" :left-icon-style="{'color': '#999'}"
					:left-icon="logintype == 1 ?'phone-fill' : 'account-fill' ">
					<u-input v-model="form.login" :placeholder="`请输入${logintype == 1? '手机' :'生意宝账号'}`" />
				</u-form-item>

				<template v-if="logintype == 2">
					<u-form-item prop="passwd" :left-icon-style="{'color': '#999'}" left-icon="lock-fill">
						<u-input type="password" v-model="form.passwd" placeholder="请输入密码" />
					</u-form-item>
				</template>
			</u-form>
			<view class="tips" v-if="logintype == 1">未注册的手机号验证后将自动注册</view>
			<u-button type="primary" :ripple="true" @click="submit" :custom-style="inputStyle">
				{{ logintype == 2 ? '登录' : '获取短信验证码'}}</u-button>


			<view class="alternative">
				<view class="password" @click="changeLoginType">{{ logintype == 1 ? '账号密码登录' : '手机验证码登录'}}</view>
				<view class="issue" @click="changeLoginType" v-if="logintype == 2">注册账号</view>
			</view> 
		</view>
		<view class="buttom safe-area-inset-bottom">
			<view class="hint">
				注册/登录代表同意
				<text class="link">生意宝用户协议、隐私政策，</text>
				并授权使用您的生意宝账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logintype: 2,
				form: {
					login: '',
					passwd: '',
				},
				rules1: {
					login: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur', 'change']
						},
						{
							pattern: /^1[0-9]{10}$/,
							transform(value) {
								return String(value);
							},
							message: '请输入正确的11位手机号',
							trigger: ['blur', 'change']
						},
					],
				},
				rules2: {
					login: [{
						required: true,
						message: '请输入生意宝账号',
						trigger: ['blur', 'change']
					}, ],
					passwd: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}, ],
				},
			}
		},
		onReady() {
			this.handleSetRules()
		},
		computed: {
			inputStyle() {
				return {
					'borderRadius': '10rpx',
					'backgroundColor': this.$store.state.theme.themeColor,
					'marginTop': '40rpx'
				}
			}
		},
		onLoad(){
			// this.$http.get('/sign_out')
			// this.$http.get('/check_login')
		},
		methods: {
			handleSetRules() {
				this.$refs.uForm.setRules(this[`rules${this.logintype}`]);
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// console.log('验证通过');
						if (this.logintype == 1) {
							this.getCode()
						} else {
							this.getLogin()
						}
					} else {
						// console.log('验证失败');
					}
				});
			},
			getCode() {
				uni.navigateTo({
					url: `/pages/login/code?login=${this.form.login}`
				})
			},
			async getLogin() {
				uni.showLoading({
					title: '登录信息验证中...'
				})
				let res = await this.$http.get('Xcx/syblogin', {
					params: this.form
				})
				if(res.data.back.code == 200) {
					uni.setStorageSync('login', res.data.back.login)
					// uni.setStorageSync('mobile', res.data.back.mobile)
					// uni.setStorageSync('token', res.data.back.token)
					this.naviBack()
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					 
				}
				
			},
			naviBack() {
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
			},
			changeLoginType() {
				this.logintype == 1 ? this.logintype = 2 : this.logintype = 1
				this.$set(this.form, "login", "")
				this.$refs.uForm.resetFields()
				this.handleSetRules()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		border-bottom: 1rpx solid #e7e7e7;
	}

	.login-box {
		display: none;

		&.tel,
		&.pw {
			display: block;
		}
	}

	.inputRow {
		margin-bottom: 30rpx;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 50rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: #ffaa00;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: #666;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;

			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 34rpx;
				font-size: 24rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
