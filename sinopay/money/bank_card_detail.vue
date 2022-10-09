<template>
	<view>
		<view class="main">
			<view class="main-header">
				<BankCard
					:bank_class="list.bank_class"
					:bank_name="list.bank_name"
					:bank_sub="list.bank_accname"
					:bank_no="list.bank_accno"
				></BankCard>
			</view>
			<view class="main-content">
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>资金账号</p>
					</view>
					<view class="item-right">
						<p>{{list.user_fundaccno}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>手机号码</p>
					</view>
					<view class="item-right">
						<p>{{list.mobile}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>银行卡号</p>
					</view>
					<view class="item-right">
						<p>{{list.bank_accno1}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>户名</p>
					</view>
					<view class="item-right">
						<p>{{list.bank_accname}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>开户行名称</p>
					</view>
					<view class="item-right">
						<p>{{list.bank_name}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>证件号码</p>
					</view>
					<view class="item-right">
						<p>{{list.card_id1}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>状态</p>
					</view>
					<view class="item-right">
						<p>{{list.state | bankcardState2Str}}</p>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<p>绑定时间</p>
					</view>
					<view class="item-right">
						<p>{{list.ctime}}</p>
					</view>
				</view>
			</view>
			<view class="add-btn u-m-t-30" v-if="list.hasOwnProperty('state') && list.state == 0" @click="codeInputShow = true">
				<i class="custom-icon-info custom-icon"></i>
				<text>银行卡鉴权</text>
			</view>
			<view class="add-btn u-m-t-30 u-m-b-30" v-if="list.state == 1" @click="unbind">
				<i class="custom-icon-info custom-icon"></i>
				<text>解绑银行卡</text>
			</view>
		</view>
		
		<u-modal :show="codeInputShow" negativeTop="220" title="鉴权表单"  
			confirmText="返回" 
			@confirm="codeInputShow = false"
			>
			<view class="slot-content u-p-t-10"> 
				<u-form
					:model="model_yanzheng"
					:rules="rules_yanzheng"
					ref="from_yanzheng"
					labelWidth="100%"
					labelPosition="top"
					:labelStyle="{color: '#777'}"
				>
					<u-form-item
						label="鉴权验证金额"
						prop="amt"
						ref="amt"
						required 
					>
						<view>
							<u-input
								v-model="model_yanzheng.amt" 
								placeholder="鉴权验证金额"
								clearable
							></u-input>
							<view class="u-font-28 u-info u-m-t-10">鉴权有效时间是48小时</view>
						</view>
					</u-form-item>
					<u-form-item
						label="鉴权验证码"
						prop="code"
						ref="code"
						required 
					>
						<view>
							<u-input
								v-model="model_yanzheng.code" 
								placeholder="鉴权验证码"
								clearable
							></u-input>
							<view class="u-font-28 u-m-t-10">
								<text class="u-info">如长时间未收到鉴权验证码，可点击取消该鉴权任务，重新发起绑定</text>
								<text class="text-error u-m-l-10" @click="check_cancel">点我取消鉴权</text>
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
				id: '',
				list: {},
				codeInputShow: false,
				model_yanzheng: {
					id: '',
					amt: '',
					code: ''
				},
				rules_yanzheng: {
					amt: {
						type: 'string',
						required: true,
						message: '请填写鉴权验证金额',
						trigger: ['blur', 'change']
					}, 
					code: {
						type: 'string',
						required: true,
						message: '请填写鉴权验证码',
						trigger: ['blur', 'change']
					},
				}
			};
		},
		components: {
			BankCard
		},
		onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id
			}
			this.model_yanzheng.id = this.id
			uni.showLoading()
			this.getData()
		},
		onReady() { 
			this.$refs.from_yanzheng.setRules(this.rules_yanzheng)
		},
		methods: {
			
			async getData() { 
				const res = await this.$api.sino_fund_account_detail_bind({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.list = res.list 
				}
			},
			submit_yanzheng() {
				this.$refs.from_yanzheng.validate().then(async res => {
					uni.showLoading()
					const r = await this.$api.sino_fund_account_check({...this.model_yanzheng})
					console.log(r)
					if(r.code == 1) { 
						uni.showToast({
							title: r.msg,
							icon: 'none',
							success: () => {
								uni.redirectTo({
									url: '/sinopay/money/bank_card_detail?id=' + this.model_yanzheng.id
								})
							}
						})
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			check_cancel() {
				uni.showModal({
					title: '取消鉴权提示',
					content: '是否取消当前银行卡鉴权',
					success:  async (r) => {
						if (r.confirm) {
							uni.showLoading()
							const res = await this.$api.sino_fund_account_check_cancel({
								params: {
									id: this.model_yanzheng.id
								}
							})
							if(res.code == 1) {
								uni.showToast({
									title: res.msg,
									icon: 'none', 
									success: () => {
										uni.redirectTo({
											url: '/sinopay/money/bank_card_detail?id=' + this.model_yanzheng.id
										})
									}
								})  
							}
						} else if (r.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async unbind() {
				uni.showModal({
					title: '解绑提示',
					content: '是否解绑',
					success:  async (r) => {
						if (r.confirm) {
							uni.showLoading()
							const res = await this.$api.sino_fund_account_unbind({
								params: {
									id: this.list.id
								}
							})
							if(res.code == 1) {
								const p = uni.$u.pages();
								if(p.length > 1) {
									p[p.length - 2].$vm.refreshList();
									uni.navigateBack({
										success() {
											uni.showToast({
												title: res.msg,
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
