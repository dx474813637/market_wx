<template>
	<view class="card-w u-p-40"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow,
			transition: 'all .3s'
		}" 
		>
		<view class="card-header " @click="handleGotoDetail">
			<view class="item">
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20">
					<view class="name u-flex u-flex-items-center ">
						{{detailData.id}}
					</view>
					<view class="pp text-primary" >
						<template v-if="mode == 'FUNDPAY'">
							{{detailData.state | payFundState2Str}}
						</template>
						<template v-else-if="mode == 'BILLPAY'">
							{{detailData.state | payBillState2Str}}
						</template>
					</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-start u-m-b-20 ">
					<view class="pp u-flex u-flex-items-start">
						<text class="bg-primary u-radius-3 u-p-4 u-p-l-6 u-p-r-6 u-font-24 text-white">
							<template v-if="paytype == 'B'">卖</template>
							<template v-else-if="paytype == 'S'">买</template>
						</text>
						<text class="u-m-l-10 text-dark">
							<template v-if="paytype == 'B'">{{detailData.s_company}}</template>
							<template v-else-if="paytype == 'S'">{{detailData.b_company}}</template>
						</text>
					</view>
					<view class="u-font-28 u-text-right text-base" style="flex: 0 0 100px">
						<template v-if="detailData.Order.settle_type == 'GRT'">担保支付</template>
						<template v-else>直接支付</template>
					</view>
					
					
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center ">
					<view class="pp u-flex u-flex-items-center">
						{{detailData.ctime}}
					</view>
					<view>
						<text>{{detailData.price1}}</text>
						<!-- <u--text type="error" mode="price" :text="detailData.price1"></u--text> -->
					</view>
					
					
				</view>
			</view>
			
		</view>
		<view class="more-btn u-flex u-flex-items-center u-flex-center u-m-t-30 " :class="{
				hen: toggle,
				'u-m-b-30': toggle,
			}" @click="toggle = !toggle">
			<view class="bg-white u-p-l-30 u-p-r-30 more-title">
				<text class="u-font-26 u-m-r-20" style="color: #9ec1e6;">更多交易信息</text>
				<text class=" custom-icon u-font-28 u-info" style="color: #9ec1e6;" 
				:class="{
					'custom-icon-shangjiantou': toggle,
					'custom-icon-unfold': !toggle
				}"></text>
			</view>
		</view>
		<view style="overflow: hidden;transition: all .3s;">
			<view >
				<view class="card-more" @click="handleGotoDetail">
					<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20">
						<view class="pp u-flex u-flex-items-center">
							交易编号
						</view>
						<view class="u-font-28">
							{{detailData.Order.id}}
						</view>
					</view>
					<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20 " v-if="detailData.sinopay_id">
						<view class="pp u-flex u-flex-items-center">
							SINOPAY支付编号
						</view>
						<view class="u-font-28">
							{{detailData.sinopay_id}}
						</view>
					</view>
					<view class="item u-flex u-flex-between u-flex-items-center " v-if="mode == 'FUNDPAY'">
						<view class="pp u-flex u-flex-items-center">
							资金账号
						</view>
						<view class="u-font-28"> 
							{{detailData.b_user_fundaccno}}
						</view>
					</view> 
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: 'BillCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			paytype: {
				type: String,
				default: 'B',
			},
			mode: {
				type: String,
				default: 'FUNDPAY',
			},
			ids: {
				type: String,
				default: 'ids',
			},
			pid: {
				type: String,
				default: 'pid',
			},
			type: {
				type: String,
				default: 'type',
			},
			name: {
				type: String,
				default: 'name',
			},
			price: {
				type: String,
				default: 'price',
			},
			date: {
				type: String,
				default: 'date',
			},
			status: {
				type: String,
				default: '1',
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
				toggle: false
			}
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', this.detailData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 28rpx;
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
	.hen {
		position: relative;
		&:after,
		&:before {
			position: absolute;
			content: '';
			top: 50%;
			transform: translateY(-50%);
			height: 1px;
			width: 50%;
			background-color: #eee;
		}
		&:after {
			right: 0;
		}
		&:before {
			left: 0;
		}
	}
	.more-title {
		position: relative;
		z-index: 50;
	}
	.more-btn {
		transition: all .3s;
	}
</style>
