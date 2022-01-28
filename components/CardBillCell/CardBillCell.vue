<template>
	<view class="pay-card" @click="navTo(`/pages/orderDetail/orderDetail?id=${list.order_id}`)">
		<!-- <view class="pay-cell-left">
			<view class="pay-img">
				<u-image shape="circle" width="100%" height="100%" :src="list.payimg"></u-image>
			</view>
		</view> -->
		<template v-if="type == 1">
			<view class="pay-cell-main">
				<view class="pay-content">
					<view class="pay-title">订单号：{{list.order_id}} <text>{{list.posttime}}</text></view>
					<view class="pay-time">交易单号：{{list.trade_no}}</view>
				</view>
				<view class="pay-right">
					<view class="pay-money">-{{list.price/100  | toFixed2}}</view>
					<view class="pay-sub status1">
						<template v-if="list.status != 1">
							{{list.status | wxBillState}}
						</template>
			
					</view>
				</view>
			
			</view>
		</template>
		<template v-else>
			<view class="pay-cell-main">
				<view class="pay-content">
					<view class="pay-title">{{list.c_name}}</view>
					<view class="pay-time">{{list.pay_tool | toTools}} {{list.ctime}}</view>
				</view>
				<view class="pay-right">
					<view class="pay-money">-{{list.final_price | toFixed2}}</view>
					<view class="pay-sub" :class="{
							status1: list.pay_status == '1',
							status2: list.pay_status == '2'
						}">
						<template v-if="list.pay_status != '5'">
							{{list.pay_status | toState}}
						</template>
			
					</view>
				</view>
			
			</view>
		</template>
		
	</view>
</template>

<script>
	export default {
		name: "CardBillCell",
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type: {
				type: String | Number,
				default: 0
			}
		},
		watch: {
			type(newV) {
				console.log(newV)
			},
			list(newV) {
				console.log(newV)
			}
		},
		data() {
			return {

			};
		},
		methods: {

			navTo(url) {
				if(this.type == 0) return 
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pay-card {
		background-color: #fff;
		display: flex;
		height: 150rpx;
		align-items: center;
		border-bottom: 1rpx solid #f5f5f5;
		padding: 0 20rpx;

		.pay-cell-left {
			flex: 0 0 80rpx;
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;

			.pay-img {
				width: 100%;
				height: 100%;
			}
		}

		.pay-cell-main {
			flex: 1;
			display: flex;
			height: 100%;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;

			.pay-content {
				overflow: hidden;

				.pay-title {
					margin-bottom: 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text {
						color: #999;
						font-size: 24rpx;
						margin-left: 20rpx;
					}
				}

				.pay-time {
					color: #999;
					font-size: 24rpx;
				}
			}

			.pay-right {
				text-align: right;

				.pay-money {
					position: relative;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.pay-sub {
					color: $uni-color-theme;
					font-size: 24rpx;
					height: 30rpx;

					&.status1 {
						color: $uni-color-error;
					}

					&.status2 {
						color: $uni-color-warning;
					}
				}
			}

		}
	}
</style>
