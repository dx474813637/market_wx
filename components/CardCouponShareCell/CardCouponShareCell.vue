<template>
	<view class="coupon-card">
		<view class="coupon-cell-main">
			<view class="coupon-content">
				<view class="coupon-title">{{list.title}}-{{list.id}}</view>
				<view class="coupon-title">{{list.guid}}</view>
				<view class="coupon-time">{{list.login}} {{list.uptime}}</view>
			</view>
			<view class="coupon-right">
				<view class="coupon-money" :class="{
							status1: list.state == '0',
							status2: list.state != '0'
						}">
					<template v-if="list">
						{{list.state | toUseState}}
					</template>

				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		name: "CardCouponShareCell",
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
		filters: {
			toUseState(v) {
				if (v == 0) return "未使用"
				if (v == 1) return "已使用"
				if (v == 2) return "已删除"
				return "-"
			}
		},
		data() {
			return {

			};
		},
		methods: {

			navTo(url) {
				if (this.type == 0) return
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-card {
		background-color: #fff;
		display: flex;
		height: 180rpx;
		align-items: center;
		border-bottom: 1rpx solid #f5f5f5;
		padding: 0 20rpx;

		.coupon-cell-left {
			flex: 0 0 80rpx;
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;

			.coupon-img {
				width: 100%;
				height: 100%;
			}
		}

		.coupon-cell-main {
			flex: 1;
			display: flex;
			height: 100%;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;

			.coupon-content {
				overflow: hidden;

				.coupon-title {
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

				.coupon-time {
					color: #999;
					font-size: 24rpx;
				}
			}

			.coupon-right {
				text-align: right;

				.coupon-money {
					position: relative;
					font-weight: bold;
					// margin-bottom: 10rpx;
				}

				.coupon-sub {
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
