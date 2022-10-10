<template>
	<view>
		 <view class="main">
			<view class="main-header">
				<view class="header-title u-flex u-flex-items-center u-flex-center">
					<view v-if="type == 'cz'">
						<template v-if="list.status == 0">
							待验证
						</template>
						<template v-else-if="list.status == 1">
							充值成功
						</template>
						<template v-else-if="list.status == 2">
							充值失败
						</template>
						<template v-else-if="list.status == 3">
							充值中
						</template>
						<template v-else-if="list.status == 4">
							已退款
						</template>
					</view>
					<view v-if="type == 'tx'">
						<template v-if="list.status == 0">
							待验证
						</template>
						<template v-else-if="list.status == 1">
							提现成功
						</template>
						<template v-else-if="list.status == 2">
							提现失败
						</template>
						<template v-else-if="list.status == 3">
							提现中
						</template>
						<template v-else-if="list.status == 4">
							已退款
						</template>
					</view>
				</view>
				<view class="header-content u-flex u-flex-items-center u-flex-center">
					<view>{{list.amount || list.amt}} 元</view>
				</view>
			</view>
			<view class="main-content">
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>现金账号：</view>
					</view>
					<view class="item-right">
						<view>{{list.user_fundaccno}}</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center" v-if="type == 'tx'">
					<view class="item-left">
						<view>银行卡：</view>
					</view>
					<view class="item-right">
						<view>{{list.bank_accno}}</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>金额：</view>
					</view>
					<view class="item-right">
						<view>{{list.amount || list.amt}} 元</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>手续费：</view>
					</view>
					<view class="item-right">
						<view>{{list.fee}} 元</view>
					</view>
				</view> 
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>时间：</view>
					</view>
					<view class="item-right">
						<view>{{list.ctime}}</view>
					</view>
				</view>
				<!-- <view class="u-p-t-40" v-if="list.state == '0'">
					<view class="u-p-t-20">
						<u-button type="primary" @click="codeInputShow = true">提现校验</u-button>
					</view>
					<view class="u-p-t-20">
						<u-button type="error" @click="remove">取消提现</u-button>
					</view>
					
				</view> -->
			</view>
		</view>
		<u-modal :show="codeInputShow" negativeTop="220" title="支付密码校验"
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
						label="支付密码"
						prop="paypwd"
						ref="paypwd"
						required 
					> 
						<view style="width: 220px;">
							<u-input
								v-model="model_yanzheng_code.paypwd" 
								placeholder="支付密码"
								clearable
								password
								type="password"
							></u-input> 
						</view>
						
					</u-form-item>
				</u-form> 
				<view class="u-m-t-40">
					<u-button type="primary" @click="submit_yanzheng_code">提交表单</u-button>
				</view> 
				
			</view>
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				type: 'tx',
				list: {
					Sino_fund_refund: {}
				},
				codeInputShow: false,
				model_yanzheng_code: {  
					paypwd: '',
				},
			};
		}, 
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id =  options.id
			}   
			if(options.hasOwnProperty('type')) {
				this.type =  options.type
			}   
			uni.showLoading()
			this.getData()
		},
		computed: { 
			rules_yanzheng_code() {
				return {
					'paypwd': {
						type: 'string',
						required: true,
						message: '支付密码不得为空',
						trigger: ['blur', 'change']
					}, 
				}
			},
		},
		onReady() { 
			this.$refs.from_yanzheng_code.setRules(this.rules_yanzheng_code)
		},
		methods: {
			async getData() {
				let func = 'market/withdraw_detail';
				if(this.type == 'cz') {
					func = 'market/recharge_detail'
				}
				const res = await this.$http.get(func, {
					params: {
						id: this.id
					}
				})
				if(res.data.code == 1) {
					this.list = res.data.list
				}
			},
			async remove() {
				uni.showLoading({
					title: '正在取消...'
				})
				const res = await this.$api.sino_fund_refund_cancel({
					params: {
						id: this.id, 
					}
				})
				if(res.code == 1) {
					uni.showToast({
						title: res.msg
					})
					this.getData()
				}
			},
			async submit_yanzheng_code() {
				uni.showLoading( )
				const res = await this.$api.sino_fund_refund_refund({
					params: {
						id: this.id, 
						paypwd: this.model_yanzheng_code.paypwd, 
					}
				})
				if(res.code == 1) {
					uni.showToast({
						title: res.msg
					})
					this.codeInputShow = false
					this.getData()
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
		min-height: 100vh;
	}
</style>

<style lang="scss" scoped>
	.main {
	    padding: 20px;
	    .main-header {
	        margin-bottom: 20px;
	        .header-title {
	            background-color: #fff;
	            position: relative;
	            border-bottom: 1px dashed #eee;
	            height: 45px;
	            color: #000;
	            font-size: 16px;
	            &:before, &:after {
	                content: "";
	                position: absolute;
	                background-color: #f8f8f8;
	                bottom: 0;
	                width: 20px;
	                height: 20px;
	                border-radius: 50%;
	            }
	            &:before {
	                left: 0;
	                transform: translate(-50%, 50%);
	            }
	            &:after {
	                right: 0;
	                transform: translate(50%, 50%);
	            }
	        }
	        .header-content {
	            background-color: #fff;
	            height: 150px;
	            color: red;
	            font-size: 30px;
	            border-radius: 5px;
	            box-shadow: 0 5px 5px rgba(0,0,0,.1);
	        }
	    }
	    .main-content {
	        padding: 0 5px;
	        .row {
	            border-bottom: 1px solid #eee;
	            height: 35px;
	            .item-left {
	                color: #000;
	            }
	            .item-right {
	                color: #999
	            }
	        }
	    }
	}
</style>
