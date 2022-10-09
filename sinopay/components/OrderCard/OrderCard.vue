<template>
	<view class="card-w u-p-20"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header u-flex u-flex-items-center u-flex-between  u-p-5">
			<view class="u-flex u-flex-items-baseline">
				<view class="u-font-28 text-base"> 
					<u-tag :text="customData.id" plain size="mini" borderColor="#ccc" color="#777"></u-tag>
				</view>
				<!-- <u-tag :text="customData.id" size="mini" ></u-tag> -->
				<view class="u-line-1 u-m-l-10">{{ordertype == 'S' ? customData.b_company : customData.s_company }}</view>
			</view>
			
			<view class=" u-font-28" style=" flex: 0 0 auto;" >
				<u-tag :text="customData.state | orderState2Str(customData.order_type)" size="mini" :type="(customData.state == '2' || customData.state == '3')? 'error': 'primary'"></u-tag>
			</view>
		</view>
		<view class="card-main u-p-t-20">
			<view class="main-row u-flex u-flex-between u-flex-items-start u-p-20 u-radius-8 page-bg2">
				<view class="item">{{customData.title}}</view>
				<view class="item u-text-right u-m-l-10" style=" flex: 0 0 auto;">
					<view class="u-m-b-10">
						<!-- <u-count-to fontSize="16" :startVal="0" :endVal="customData.price1" decimals="2"  separator=","></u-count-to> -->
						<text class="">{{customData.price1}}</text>
						<text class="u-p-l-10 u-font-28 text-light">元/{{customData.unit}}</text>
					</view>
					<view class="u-font-28 text-light">x {{customData.amount}}{{customData.unit}}</view>
					
					<!-- <u-count-to fontSize="16" :startVal="prices" :endVal="prices" :decimals="2" separator=","></u-count-to>
					<text class="u-p-l-10">元</text> -->
				</view>
			</view>
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-20 u-p-5">
				<view class="item text-light u-font-28">商品总额</view>
				<view class="item ">{{customData.bill_price2}}元</view>
			</view>
			<view class="main-row u-flex u-flex-between u-flex-items-center u-m-t-20 u-p-5">
				<view class="item text-light u-font-28">{{customData.create_time}}</view>
				<view class="item text-error">
					<template v-if="customData.order_type == '1'">
						<text class="u-p-r-10">{{customData.pay_mode.includes('FUNDPAY')? '现金' : '票据'}}</text>
						<text>
							<template v-if="customData.settle_type == 'D_P'">款到发货</template>
							<template v-else-if="customData.settle_type == 'GRT'">担保支付</template>
							<template v-else-if="customData.settle_type == 'COD'">货到付款</template>
							<template v-else >{{customData.settle_type}}</template>
						</text>
					</template>
					<template v-if="customData.order_type == '2'">
						非支付
					</template>
				</view>
			</view>
		</view>
		<!-- <view class="card-footer u-flex u-flex-between u-flex-items-center u-p-b-12 u-p-t-12">
			<view></view>
			
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'CustomCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			ordertype: {
				type: String,
				default: 'B',
			},
			ids: {
				type: String,
				default: 'ids',
			},
			seller: {
				type: String,
				default: 'seller',
			},
			prod: {
				type: String,
				default: 'prod',
			},
			price: {
				type: String,
				default: 'price',
			},
			prices: {
				type: String,
				default: 'prices',
			},
			num: {
				type: String,
				default: 'num',
			},
			pay_type: {
				type: String,
				default: 'pay_type',
			},
			date: {
				type: String,
				default: 'date',
			},
			unit: {
				type: String,
				default: 'unit',
			},
			ht_status: {
				type: String,
				default: 'ht_status',
			},
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
			customData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', this.customData)
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
		font-size: 32rpx;
		padding-left: 10rpx;
	}
	.item-sub {
		color: #666;
	}
</style>
