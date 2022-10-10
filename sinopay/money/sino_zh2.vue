<template>
	<view class="wrapper">
		<u-navbar
			is-fixed
			immersive 
			:is-back="false"
			:background="{ backgroundColor: 'transparent' }"
		>
			<view class="u-flex u-flex-items-center text-white u-m-l-30" >
				<view class="u-flex u-flex-items-center" @click="handleGoto({url: '/sinopay/money/index', type: 'reLaunch'})"> 
					<i class="custom-icon-back custom-icon"></i>
					<text class="u-p-l-10">资金中心</text>
				</view>
			</view>
		</u-navbar>
		<view class="header">
			<view class="header-box">
				
		
				<view class="main-card u-flex u-flex-items-center">
					<view class="main-card-label">收款账户</view>
					<view class="main-card-icon">收</view>
					<view class="main-card-info">
						<view class="item name u-line-1">{{wallet.name}}</view>
						<view class="item text-base">户号：{{wallet.user_fundaccno}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="main">
			<view class="main-wrapper">
				<view class="main-box">
					
					<moneyCard sinoType="S"></moneyCard>
				</view>
				<view class="main-list">
					<!-- <view @click="handleGoto({url: '/sinopay/money/bank_card', params: {wallet: 'S'}})" class="list-item">
						<view class="item-left">
							<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-vipcard custom-icon"></i>
							</view>
							<view class="text-base item-t">绑卡认证 / 绑卡查询 / 转账充值</view>
						</view>
						<view class="item-right">
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view> -->
					<!-- <view @click="handleGoto({url: '/sinopay/money/sino_cz_list', params: {wallet: 'S'}})" class="list-item">
						<view class="item-left">
							<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-searchlist custom-icon"></i>
							</view>
							<view class="text-base item-t">充值 / 提现 记录</view>
						</view>
						<view class="item-right">
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view> -->
					<view @click="handleGoto('/sinopay/money/sino_zh1')" class="list-item">
						<view class="item-left">
							<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-moneybag custom-icon"></i>
							</view>
							<view class="text-base item-t">付款账户</view>
						</view>
						<view class="item-right">
							<view>{{wallet.relation_id}}</view>
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view>
					<!-- <view @click="handleGoto({url: '/sinopay/money/sino_cz_list', params: {tabs_current: 3}})" class="list-item">
						<view class="item-left">
							<view class="icon-wrap u-flex u-flex-center u-flex-items-center">
								<i class="custom-icon-moneybag custom-icon"></i>
							</view>
							<view class="text-base item-t">同名账户转账记录</view>
						</view>
						<view class="item-right">
							<i class="custom-icon-right custom-icon"></i>
						</view>
					</view> -->
				</view>
				<view @click="handleGoto({url: '/sinopay/money/sino_cz', params: {cz: 2}})" class="u-flex u-flex-center text-primary u-font-28 u-m-t-40">
					同名账户转账
				</view>
			</view>
		</view>
		<!-- <u-safe-bottom></u-safe-bottom> -->
		<menusBar tabbar theme="white" border></menusBar>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import moneyCard from '@/sinopay/components/moneyCard/moneyCard.vue'
	export default {
		data() {
			return {
				type: 'S'
			};
		},
		computed: {
			...mapState({
				sino: state => state.sinopay.sino,
				sino_zh: state => state.sinopay.sino_zh,
				// myCpy: state => state.user.myCpy
			}),
			wallet() {
				// let w = {};
				// if(!this.sinoFund || this.sinoFund.length == 0) return w;
				// w = this.sinoFund.filter(ele => ele.type == this.sinoType)[0] || {}
				return this.sino_zh[this.type].info || {}
			},
		},
		components: {
			moneyCard
		},
		async onLoad() {
			uni.showLoading()
			await this.getSinoFundAccount({type: this.type})
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto'
			}),
			...mapActions({
				getSinoFundAccount: 'sinopay/getSinoFundAccount', 
			}),
		}
	}

</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	.wrapper {
		padding-bottom: 60px;
	}
	.header {
		position: relative;
		background-image: url("https://wx.rawmex.cn/Public/bg1.png");
		background-size: 100% 100%;
		background-position: top;
		background-repeat: no-repeat;
		padding-top: 100px;

		.header-box {
			padding: 0 12px;

		}

	}
	.main-card {
		background-color: #fff;
		height: 90px;
		padding: 0 20px;
		border-radius: 8px 8px 0 0;
		/* box-shadow: 0 0 5px rgba(90, 90, 90, 0.05); */
		margin-bottom: 10px;
		position: relative; 
		.main-card-label {
			position: absolute;
			right: 0;
			bottom: 10px;
			// top: 50%;
			// transform: translateY(-50%);
			line-height: 22px;
			padding: 0 15px;
			font-size: 15px;
			background-image: linear-gradient(135deg, #103d6f, #007aff);
			color: #fff;
			border-radius: 20px 0 0 20px;
		}
		.main-card-icon {
			width: 35px;
			height: 35px;
			border-radius: 5px;
			line-height: 35px;
			text-align: center;
			font-size: 22px;
			color: #fff;
			background-image: linear-gradient(135deg, #103d6f, #007aff);
		}
		.main-card-info {
			padding-left: 8px;
			.item {
				line-height: 18px;
				font-size: 13px;
				&.name {
					color: #000;
					font-size: 15px;
				}
			}
		}
	}
	.main {
		.main-wrapper {
			padding: 5px 12px;
			.main-box {
				margin-bottom: 20px;
				.box-header {
					margin-bottom: 15px;
					.item-left {
						.box-title {
							font-size: 19px;
							color: #000;
						}
					}
					.item-right {
						font-size: 12px;
						.a-href {
							color: #999;
							span {
							}
							.custom-icon {
								color: #ccc;
								margin-left: 6px;
							}
						}
					}
				}
				
				
			}
			.main-list {
				box-shadow: 0 0 5px rgba(90, 90, 90, 0.05);
				margin-bottom: 10px;
				.list-item {
					padding: 0 10px;
					background-color: #fff;
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 70px;
					margin-bottom: 10px;
					border-radius: 3px;
					/* border-bottom: 1px solid #f8f8f8; */
	
					.custom-icon {
						color: #666;
					}
					.item-left {
						display: flex;
						align-items: center;
						.icon-wrap {
							width: 40px;
							height: 40px;
							border-radius: 50%;
							background-color: #f8f8f8;
							.custom-icon {
								font-size: 24px;
								color: #000;
							}
						}
						.item-t {
							margin-left: 20px;
							font-size: 15px;
						}
					}
					.item-right {
						display: flex;
						align-items: center;
						color: #999;
						.custom-icon {
							color: #ccc;
						}
					}
				}
			}
			.logout-btn {
				background-color: #d03333;
				line-height: 40px;
				border-radius: 5px;
				display: block;
				color: #fff;
				text-align: center;
				margin: 30px auto 20px;
			}
		}
	}
</style>
