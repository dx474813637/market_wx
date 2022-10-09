<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}" 
		>
		<view class="card-header ">
			<view class="item u-m-b-20">
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20" >
					<view class="name">
						<view class="u-m-b-10">{{detailData.bank_name}}</view>
						<view class="text-base u-font-26">{{detailData.account_no}}</view>
					</view>
					<i class="custom-icon-youjiantou-sange-copy custom-icon text-primary u-font-40"></i>
					<view class="name">{{detailData.user_fundaccno}}</view>
				</view>  
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20">
					<view class="pp u-flex u-flex-items-center">
						<i class="custom-icon-moneybag custom-icon"></i>
						<text>{{detailData.amount}}</text>
						<!-- <u--text mode="price" :text="detailData.amount" type="error"></u--text> -->
					</view> 
					<view class="pp u-flex u-flex-items-center">
						<text class=" ">{{detailData.cr_time}}</text>
					</view> 
				</view> 
			</view>
			
		</view>
		<u-modal :show="codeInputShow" negativeTop="220" title="短信验证码校验"
			closeOnClickOverlay
			@close="codeInputShow = false" 
			confirmText="返回"
			@confirm="codeInputShow = false" 
			>
			<view class="slot-content u-p-t-10"> 
				<u-form
					:model="model_yanzheng_code"
					:rules="rules_yanzheng_code"
					ref="from_yanzheng_code"
					labelWidth="100%"
					labelPosition="top"
					:labelStyle="{color: '#777'}"
				>
					<u-form-item
						label="短信验证码"
						prop="captcha"
						ref="captcha"
						required 
					> 
						<u-input
							v-model="model_yanzheng_code.captcha" 
							placeholder="短信验证码"
							clearable
						>
							<!-- <template slot="suffix">
								<u-code
									ref="uCode"
									@change="codeChange"
									seconds="60"
									changeText="X秒重新获取"
								></u-code>
								<u-button
									@tap="getCode"
									:text="tips"
									type="success"
									size="mini"
								></u-button>
							</template> -->
						</u-input> 
					</u-form-item>
				</u-form> 
				<view class="u-m-t-40">
					<u-button type="primary" @click="submit_yanzheng_code">提交验证码</u-button>
				</view> 
				
			</view>
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		name: 'tmzzCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			type: {
				type: String,
				default: 'type',
			},
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
			detailData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				codeInputShow: false, 
				model_yanzheng_code: {  
					captcha: '',
				},
				tips: '',
			}
		},
		computed: {
			typeStr() {
				if(this.type == 'tx') return '提现'
				else return '充值'
			},
			rules_yanzheng_code() {
				return {
					'captcha': {
						type: 'string',
						required: true,
						message: '验证码不得为空',
						trigger: ['blur', 'change']
					}, 
				}
			},
		},
		onReady() { 
			this.$refs.from_yanzheng_code.setRules(this.rules_yanzheng_code)
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', this.detailData)
			}, 
			codeChange(text) {
				this.tips = text;
			},
			showToast(params) {
				this.$refs.uToast.show({
					position: 'bottom',
					...params, 
				})
			},
			async getCode() {
				if (this.$refs.uCode.canGetCode) {
				   
					uni.showLoading({
						title: '正在获取验证码'
					})
					const res = await this.$api.sino_fund_account_tran({
						params: {
							id: this.detailData.id,
							flag: 1,
						}
					})
					if(res.code == 1) {
						this.showToast({
							type: 'success',
							message: '发送成功！', 
						})
						 this.$refs.uCode.start(); 
					}
				} else {
				  uni.$u.toast('倒计时结束后再发送');
				}
			},
			handleValidator() {
				if(this.detailData.state == '0') {
					uni.showModal({
						title: '提示',
						content: '是否发送短信并进行校验？',
						success:  async (res) => {
							if (res.confirm) {
								this.codeInputShow = true
								this.getCode()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else {
					this.codeInputShow = true
				}
			},
			
			submit_yanzheng_code() {
				this.$refs.from_yanzheng_code.validate().then(async () => {
					uni.showLoading()
					const r = await this.$api.sino_fund_account_tran({
						params: {
							id: this.detailData.id,
							captcha: this.model_yanzheng_code.captcha, 
							flag: 2,
						}
					})
					if(r.code == 1) { 
						this.showToast({
							type: 'success',
							message: r.msg, 
						})
						this.$emit('refresh')
					}
				})
			},
			async handleExit() {
				uni.showLoading({
					title: '取消转账...'
				})
				const r = await this.$api.sino_fund_account_tran({
					params: {
						id: this.detailData.id, 
						flag: 4,
					}
				})
				if(r.code == 1) { 
					this.showToast({
						type: 'success',
						message: r.msg, 
					})
					this.$emit('refresh')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 30rpx;
	}
	.pp {
		color: #666;
		font-size: 28rpx;
		// padding-left: 10rpx;
		.custom-icon {
			// color: #bbb;
		}
	}
	.item-sub {
		color: #666;
	}
</style>
