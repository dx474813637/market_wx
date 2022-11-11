<template>
	<view class="wrapper">
		<view class="box-content">
			<view class="c-header u-flex u-flex-between">
				<view class="item-left">
					<view class="money-title u-flex u-flex-items-center">
						<p>可用余额 (元)</p>
						<i class="custom-icon"
							:class="{
								'custom-icon-attentionfill': showMoney,
								'custom-icon-attentionforbidfill': !showMoney,
								'inactive': !showMoney,
							}"
							@click="showMoney = !showMoney"
						></i>
						<i class="custom-icon custom-icon-refresh u-font-30 inactive"  @click="refreshBtn"></i>
					</view>
					<view class="money-num u-flex u-flex-items-end">{{!showMoney? '****': (wallet.bal || 0)}}</view>
				</view>
				<view class="item-right">
					<view class="money-title u-flex u-flex-items-end">
						<p>冻结金额 (元)</p>
					</view>
					<view class="money-num text-danger u-flex u-flex-items-end u-flex-end">
						{{!showMoney? '****': (wallet.bal_freeze || 0)}}
					</view>
				</view>
			</view>
			<view class="c-row u-flex u-flex-between u-flex-items-center">
				<view class="item-left">
					<view class="u-flex u-flex-items-center">
						<text>可提金额 (元):</text>
						<text class="num">{{!showMoney? '****': (wallet.bal_refund || 0)}}</text>
					</view>
				</view>
				<view class="item-right">
					<view v-if="sino.list.sinop_type == 'C'">
						<view @click="handleGoto({url: '/sinopay/money/bang_about_detail', params: { wallet: sinoType }})" class="btn"  v-if="sino.list.auth_state == '1'">银联绑卡</view>
						<view @click="handleGoto({url: '/sinopay/money/card_add', params: { wallet: sinoType }})" class="btn" v-if="sino.list.auth_state != '1'">绑卡认证</view>
					</view> 
					<view @click="handleGoto({url: '/sinopay/money/card_add', params: { wallet: sinoType }})" class="btn" v-else>
						<template v-if="sino.list.auth_state == '1'">添加银行卡</template>
						<template v-else>绑卡认证</template>
						
					</view>
				</view>
			</view>
		</view>
		<view class="box-caozuo u-flex">
			<view @click="handleGoto({url: '/sinopay/money/sino_cz', params: {cz: 0, wallet: sinoType}})" class="item-btn tx u-flex u-flex-center u-flex-items-center">提现</view>
		<!-- <view @click="show_zzlc = true" class="item-btn cz u-flex u-flex-center u-flex-items-center">转账充值</view> -->
			<view @click="handleGoto({url: '/sinopay/money/sino_cz', params: {cz: 1, wallet: sinoType}})" class="item-btn cz u-flex u-flex-center u-flex-items-center">充值</view>
		</view>
		
		<view class="loading-w u-flex u-flex-items-center u-flex-center" v-if="sinoFundLoading">
			
			<u-loading mode="circle" size="45"></u-loading>
		</view>
		<ZzCzPopup
			:aid="aid"
			:sinoType="sinoType"
			:show="show_zzlc"
			@close="show_zzlc = false"  
			></ZzCzPopup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import ZzCzPopup from '@/sinopay/components/ZzCzPopup/ZzCzPopup.vue'
	export default {
		props: {
			sinoType: {
				type: String,
				default: 'B'
			}
		},
		data() {
			return {
				showMoney: false,
				show_zzlc: false,
			}
		},
		components: {
			ZzCzPopup
		},
		computed: {
			...mapState({
				sino: state => state.sinopay.sino,
				sino_zh: state => state.sinopay.sino_zh,
				sinoFundLoading: state => state.sinopay.sinoFundLoading
			}),
			wallet() {
				// let w = {};
				// if(!this.sinoFund || this.sinoFund.length == 0) return w;
				// w = this.sinoFund.filter(ele => ele.type == this.sinoType)[0] || {}
				return this.sino_zh[this.sinoType].info || {}
			},
			aid() { 
				if(!this.sinoFund || this.sinoFund.length == 0) return '';
				console.log(this.sinoType, this.sinoFund.filter(ele => ele.type == this.sinoType)[0]?.id )
				return this.sinoFund.filter(ele => ele.type == this.sinoType)[0]?.id 
			},
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto',
				setSinoFundLoading: 'sinopay/setSinoFundLoading',
			}),
			...mapActions({
				getSinoFundAccount: 'sinopay/getSinoFundAccount',
				refreshSinoFundAccount: 'sinopay/refreshSinoFundAccount'
			}),
			async refreshBtn() {
				// this.setSinoFundLoading(true)
				await this.getSinoFundAccount({type: this.sinoType}) 
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		position: relative;
		.loading-w {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(255,255,255,.85);
			z-index: 10;
		}
	}
	.box-content {
		background-color: #fff;
		border-radius: 3px;
		padding-bottom: 10px;
		box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
		position: relative;
		.c-header {
			padding: 18px 12px 18px 18px;
			border-bottom: 1px solid #f8f8f8;
			.money-title {
				font-size: 12px;
				color: #999;
			}
			.money-num {
				height: 40px;
				font-size: 30px;
				color: #000;
			}
			.item-left {
				.money-title {
					.custom-icon {
						color: #007aff;
						padding-left: 12px;
						&.inactive {
							color: #999;
						}
					}
				}
			}
			.item-right {
				text-align: right;
				.money-num {
					font-size: 20px;
				}
				.text-danger {
					color: red;
				}
			}
		}
		.c-row {
			height: 45px;
			padding: 0 18px;
			padding-right: 12px;
			.item-left {
				view {
					text {
						color: #999;
						font-size: 12px;
						&.num {
							color: #000;
							font-size: 18px;
							padding-left: 10px;
						}
					}
				}
			}
			.item-right {
				.btn {
					color: #007aff;
					border: 1px solid #007aff;
					display: block;
					height: 25px;
					line-height: 25px;
					padding: 0 10px;
					border-radius: 15px;
					font-size: 12px;
				}
			}
		}
	}
	.box-caozuo {
		padding: 0 10px;
		height: 45px;
		.item-btn {
			width: 50%;
			flex: 0 0 50%;
			height: 100%;
			background-color: #fff;
			&.cz {
				background-color: #37a0f3;
				color: #fff;
				border-bottom-right-radius: 10px;
			}
			&.tx {
				border-bottom-left-radius: 10px;
				color: #007aff;
			}
		}
	}
</style>
