<template>
	<view>
		<view class="main">
			<view class="main-header">
				<BankCard
					:bank_class="list.Card_bind.bank_class"
					:bank_name="list.Card_bind.bank_name" 
					:bank_no="list.Card_bind.bank_accno"
				></BankCard>
			</view>
			<view class="main-content">
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>资金账号</p>
					</view>
					<view class="item-right">
						<p>{{id}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>手机号码</p>
					</view>
					<view class="item-right">
						<p>{{list.Card_bind.mobile}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>银行卡号</p>
					</view>
					<view class="item-right">
						<p>{{list.Card_bind.bank_accno}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>户名</p>
					</view>
					<view class="item-right">
						<p>{{list.Card_bind.bank_accname}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>开户行名称</p>
					</view>
					<view class="item-right">
						<p>{{list.Card_bind.bank_name}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>证件号码</p>
					</view>
					<view class="item-right">
						<p>{{list.Card_bind.card_id}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>状态</p>
					</view>
					<view class="item-right">
						<template v-if="list.Card_bind.state == 0">
							<u-button type="primary" plain @click="codeInputShow = true" size="mini">待绑定（点击验证短信验证码）</u-button>
						</template>
						<template v-else-if="list.Card_bind.state == 1">
							已绑定
						</template>
						<template v-else-if="list.Card_bind.state == 2">
							已失败
						</template>
						<template v-else-if="list.Card_bind.state == 3">
							已解绑
						</template> 
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>绑定时间</p>
					</view>
					<view class="item-right">
						<p>{{list.Card_bind.ctime}}</p>
					</view>
				</view>
			</view>
			<!-- <view class="add-btn u-m-t-30" v-if="list.hasOwnProperty('state') && list.state == 0" @click="codeInputShow = true">
				<i class="custom-icon-info custom-icon"></i>
				<text>银行卡鉴权</text>
			</view> -->
			<view class="add-btn u-m-t-30 u-m-b-30" v-if="list.Card_bind.state == 1" @click="unbind">
				<i class="custom-icon-info custom-icon"></i>
				<text>解绑银行卡</text>
			</view>
		</view>
		
		<u-modal v-model="codeInputShow" negativeTop="220" title="验证表单"  
			confirmText="返回" 
			@confirm="codeInputShow = false"
			>
			<view class="slot-content u-p-30"> 
				<u-form
					:model="model_yanzheng"
					:rules="rules_yanzheng"
					ref="from_yanzheng"
					labelWidth="100%"
					labelPosition="top"
					:labelStyle="{color: '#777'}"
				>
					<u-form-item
						label="验证金额"
						prop="amt"
						ref="amt"
						required 
						v-if="list.sinopay.type == 'B'"
					>
						<view>
							<u-input
								v-model="model_yanzheng.amt" 
								placeholder="验证金额"
								clearable
							></u-input>
							<view class="u-font-28 u-info u-m-t-10">有效时间是48小时</view>
						</view>
					</u-form-item>
					<u-form-item
						label="验证码"
						prop="code"
						ref="code"
						required 
					>
						<view class="u-flex u-flex-items-center u-flex-between">
							<u-input
								v-model="model_yanzheng.code" 
								placeholder="验证码"
								clearable
							></u-input>
							<view class="verification">
								<u-toast ref="uToast"></u-toast>
								<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
								@change="codeChange"></u-verification-code>
								<u-button type="primary" plain size="mini" @click="getCode">{{tips}}</u-button>
							</view>
						</view>
					</u-form-item>
				</u-form> 
				<view class="u-m-t-40">
					<u-button type="primary" @click="submit_yanzheng">提交 验证</u-button>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import BankCard from '@/sinopay/components/BankCard/BankCard.vue'
	export default {
		data() {
			return {
				tips: '', 
				seconds: 60,
				id: '',
				aid: '',
				list: {},
				codeInputShow: false,
				model_yanzheng: {
					id: '',
					amt: '',
					code: ''
				},
				
			};
		},
		components: {
			BankCard
		},
		computed: {
			rules_yanzheng() {
				let obj = {
					
					code: {
						type: 'string',
						required: true,
						message: '请填写验证码',
						trigger: ['blur', 'change']
					},
				}
				if(this.list.sinopay && this.list.sinopay.type == 'B') {
					obj.amt = {
						type: 'string',
						required: true,
						message: '请填写验证金额',
						trigger: ['blur', 'change']
					}
					this.$refs.from_yanzheng && this.$refs.from_yanzheng.setRules && this.$refs.from_yanzheng.setRules(obj)
				}
				return obj
			}
		},
		onLoad(opt) {
			if(opt.hasOwnProperty('bid')) {
				this.id = opt.bid
			}
			if(opt.hasOwnProperty('aid')) {
				this.aid = opt.aid
			}
			this.model_yanzheng.id = this.id
			uni.showLoading()
			this.getData()
		},
		onReady() { 
			console.log(this.$refs.from_yanzheng)
			this.$refs.from_yanzheng.setRules(this.rules_yanzheng)
		},
		methods: {
			
			async getData() { 
				const res = await this.$http.get('market/bankcard_detail2', {
					params: {
						user_fundaccno: this.aid,
						bind_id: this.id
					}
				})
				if(res.data.code == 1) {
					this.list = res.data.list 
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if(this.$refs.uCode.canGetCode) { 
					uni.showLoading({
						title: '正在获取验证码'
					}) 
					const res = await this.$http.get('market/get_bind_code', {
						params: {
							bind_id: this.id,
							user_fundaccno: this.aid
						}
					})
					if(res.data.code == 1) {
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
					}
					this.$refs.uCode.start(); 
					
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
			},
			submit_yanzheng() {
				this.$refs.from_yanzheng.validate(async res => {
					if(res) {
						uni.showLoading()
						let paramsObj = {
							user_fundaccno: this.aid,
							bind_id: this.id
						}
						if(this.list.sinopay.type == 'C') {
							paramsObj = {
								...paramsObj,
								mobile_code: this.model_yanzheng.code
							}
						}else if(this.list.sinopay.type == 'B') {
							paramsObj = {
								...paramsObj,
								mobile_code: this.model_yanzheng.code,
								amt: this.model_yanzheng.amt
							}
						}
						const r = await this.$http.get( 'market/success_rz_sinopay', {params: paramsObj})
						console.log(r)
						if(r.data.code == 1) { 
							uni.showToast({
								title: r.data.msg,
								icon: 'none',
								success: () => {
									uni.redirectTo({
										url: '/sinopay/money/bank_card_detail?id=' + this.model_yanzheng.id
									})
								}
							})
						}
					}else {
						uni.$u.toast('校验失败')
					}
					
				}) 
			},
			// check_cancel() {
			// 	uni.showModal({
			// 		title: '取消鉴权提示',
			// 		content: '是否取消当前银行卡鉴权',
			// 		success:  async (r) => {
			// 			if (r.confirm) {
			// 				uni.showLoading()
			// 				const res = await this.$api.sino_fund_account_check_cancel({
			// 					params: {
			// 						id: this.model_yanzheng.id
			// 					}
			// 				})
			// 				if(res.code == 1) {
			// 					uni.showToast({
			// 						title: res.msg,
			// 						icon: 'none', 
			// 						success: () => {
			// 							uni.redirectTo({
			// 								url: '/sinopay/money/bank_card_detail?id=' + this.model_yanzheng.id
			// 							})
			// 						}
			// 					})  
			// 				}
			// 			} else if (r.cancel) {
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	});
			// },
			async unbind() {
				uni.showModal({
					title: '解绑提示',
					content: '是否解绑',
					success:  async (r) => {
						if (r.confirm) {
							uni.showLoading()
							const res = await this.$http.get('market/unbind', {
								params: {
									bind_id: this.id,
									user_fundaccno: this.aid, 
								}
							})
							if(res.data.code == 1) {
								const p = uni.$u.pages();
								if(p.length > 1) {
									p[p.length - 2].$vm.refreshList();
									uni.navigateBack({
										success() {
											uni.showToast({
												title: res.data.msg,
												icon: 'none'
											})
										}
									})
									return
								}
							}
						} else if (r.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.main {
		padding: 20px 12px;
		.main-header {
			/* margin-bottom: 20px; */
			background-color: #fff;
		}
		.main-content {
			padding: 0 8px;
			background-color: #fff;
			border-radius: 0 0 8px 8px;
			.row {
				/* border-bottom: 1px solid #eee; */
				height: 45px;
				padding: 0 8px;
				.item-left {
					color: #000;
				}
				.item-right {
					color: #999;
				}
			}
		}
	}
	
	.add-btn {
		/* background-color: #434d59; */
		color: #ff6666;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px; 
		border-radius: 25px;
		border: 1px solid #ff6666;
		text {
			margin-left: 5px;
		}
	}
</style>
