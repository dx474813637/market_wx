<template>
	<view>
		<view class="main">
			<view class="main-title">
				<view>为了保障您的账号安全</view>
				<view>
					<text class="bold">进行操作前需验证身份</text>
					<text class="small">（对应手机短信）</text>
				</view>
			</view>
			<view class="mian-list-title">请选择以下密码设置</view>
			<view class="main-list" >
				<!-- <view @click="handleGoto({url: '/sinopay/money/sino_loginpw_update'})" class="main-item u-flex u-flex-items-center">
					<view class="item-left u-flex u-flex-center u-flex-items-center">
						<i class="custom-icon-lock custom-icon"></i>
					</view>
					<view class="item-center-safe">
						<view class="item-title">修改sinopay登录密码</view>
						<view class="item-sub">此密码注册时以短信发送至绑定手机</view>
					</view>
					<view class="item-right">
						<i class="custom-icon-right custom-icon"></i>
					</view>
				</view> -->
				<view @click="handleGoto({url: '/sinopay/money/sino_loginpw_forget'})" class="main-item u-flex u-flex-items-center">
					<view class="item-left u-flex u-flex-center u-flex-items-center">
						<i class="custom-icon-question custom-icon"></i>
					</view>
					<view class="item-center-safe">
						<view class="item-title">重置登录密码</view>
						<view class="item-sub">忘记支付密码通过短信验证重置</view>
					</view>
					<view class="item-right">
						<i class="custom-icon-right custom-icon"></i>
					</view>
				</view>
				<view @click="handleGoto({url: '/sinopay/money/sino_paypw_set'})" class="main-item u-flex u-flex-items-center">
					<view class="item-left u-flex u-flex-center u-flex-items-center">
						<i class="custom-icon-moneybag custom-icon"></i>
					</view>
					<view class="item-center-safe">
						<view class="item-title">设置或修改支付密码</view>
						<view class="item-sub">此密码需在注册开户后设置</view>
					</view>
					<view class="item-right">
						<i class="custom-icon-right custom-icon"></i>
					</view>
				</view>
				<view @click="handleGoto({url: '/sinopay/money/sino_paypw_forget'})" class="main-item u-flex u-flex-items-center">
					<view class="item-left u-flex u-flex-center u-flex-items-center">
						<i class="custom-icon-question custom-icon"></i>
					</view>
					<view class="item-center-safe">
						<view class="item-title">重置支付密码</view>
						<view class="item-sub">忘记支付密码通过短信验证重置</view>
					</view>
					<view class="item-right">
						<i class="custom-icon-right custom-icon"></i>
					</view>
				</view>
				<!-- <view v-if="show" @click="handleGoto({url: '/sinopay/money/sino_zh2'})" class="main-item u-flex u-flex-items-center">
					<view class="item-left u-flex u-flex-center u-flex-items-center">
						<i class="custom-icon-friendadd custom-icon"></i>
					</view>
					<view class="item-center-safe">
						<view class="item-title">创建收款账户</view>
						<view class="item-sub">需要旺铺交易收款时一键创建（不可撤销）</view>
					</view>
					<view class="item-right">
						<i class="custom-icon-right custom-icon"></i>
					</view>
				</view> -->
			</view>
			<!-- <view v-if="!show" class="main-list-more u-flex u-flex-center u-flex-items-center dx-col" @click="handleMoreTools">
				<text>更多安全设置</text>
				<i class="custom-icon-unfold custom-icon"></i>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				show: false
			};
		},
		onLoad() {
			
			this.getSinoAccount()
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto'
			}),
			...mapActions({ 
				getSinoAccount: 'sinopay/getSinoAccount', 
			}),
			handleMoreTools() {
				this.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
.main {
	padding: 0 20px;
	.main-title {
		padding: 40px 0px;
		view {
			font-size: 16px;
			color: #666;
			margin-bottom: 5px;
			text {
				color: #000;
				&.bold {
					font-size: 18px;
					font-weight: bold
				}
				&.small {
					font-size: 14px;
				}
			}
		}
	}
	.mian-list-title {
		margin-bottom: 12px;
	}
	.main-list {
		overflow-y: hidden;
		padding: 4px;
		
		&.active {
			height: auto;
		}
		.main-item {
			box-shadow: 0 0 5px rgba(0,0,0,.1);
			margin-bottom: 12px;
			height: 90px;
			.item-left {
				flex: 0 0 45px;
				width: 45px;
				height: 45px;
				margin-left: 20px;
				margin-right: 10px;
				border-radius: 50%;
				background-color: #e1ebff;
				.custom-icon {
					font-size: 24px;
				}
			}
			.item-center-safe {
				flex: 1;
				.item-title {
					font-size: 16px;
					color: #000;
					margin-bottom: 12px;
				}
				.item-sub {
					font-size: 12px;
					color: #999;
				}
			}
			.item-right {
				margin-right: 10px;
				.custom-icon {
					color: #ccc;
				}
			}
		}
	}
	.main-list-more {
		color: #007aff;
		font-size: 12px;
		position: relative;
		height: 60px;
		.custom-icon {
			margin-top: 5px;
			color: #007aff;
			font-size: 14px;
		}
	}
}
</style>
