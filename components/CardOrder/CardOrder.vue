<template>
	<view>
		<view class="card" :key="list.cid" @click="handleToDetail">
			<view class="card-header">
				<view class="header-left">
					<view class="left-item">
						<!-- {{list.ctime | timeFilter}} -->
						<!-- <u-icon name="dianpu" size="34" color="#000000" custom-prefix="custom-icon"></u-icon> -->
						<view class="shop-name">{{list.c_name}}</view>
						<!-- <u-icon name="arrow-right" size="26" color="#ccc"></u-icon> -->
					</view>
				</view>
				<view class="header-right">
					<view class="right-item">
						<view class="status-text">{{list.toState}}</view>
					</view>
				</view>
			</view>
			<view class="card-content">
				<view class="p-list">
					<view class="p-list-item" v-for="ele in list.product_list" :key="ele.id">
						<view class="p-img">
							<u-image width="100%" height="100%" :src="ele.pic1"></u-image>
						</view>
						<view class="p-info">
							<view class="p-info-name">{{ele.p_name}}</view>
							<!-- <view class="p-info-sub">{{ele.p_name}}</view> -->
						</view>
						<view class="p-info-money">
							<view class="p-money">
								<text class="price-dw">¥</text>
								<text class="price-text">{{ele.single_price | moneyDwInt}}</text>
								<text>.{{ele.single_price | moneyDwPoint}}</text>

							</view>
							<view class="p-count">
								<u-icon name="close" size="16"></u-icon>
								<text>{{ele.number}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="p-price">
					<view class="price-item">
						<text class="price-label">共计 {{num}} 件商品</text>
					</view>
				</view>
				<view class="p-price">
					<view class="price-item" :class="{dark: list.pay_status != 5}">
						<text class="price-label">总价</text>
						<view class="p-money">
							<text class="price-dw">¥</text>
							<text class="price-text">{{list.pay_price | moneyDwInt}}</text>
							<text>.{{list.pay_price | moneyDwPoint}}</text>

						</view>
					</view>
					<template v-if="list.pay_status == 5 || list.state == 2 || list.pay_status == 3">
						<view class="price-item">
							<text class="price-label">优惠</text>
							<view class="p-money">
								<text class="price-dw">¥</text>
								<text class="price-text">{{(list.pay_price - list.final_price) | moneyDwInt}}</text>
								<text>.{{(list.pay_price - list.final_price) | moneyDwPoint}}</text>

							</view>
						</view>
						<view class="price-item dark">
							<text class="price-label">实付款</text>
							<view class="p-money">
								<text class="price-dw">¥</text>
								<text class="price-text">{{list.final_price | moneyDwInt}}</text>
								<text>.{{list.final_price | moneyDwPoint}}</text>

							</view>
						</view>
					</template>

				</view>
			</view>
			<view class="card-footer" v-if="list.state != 3">
				<view class="footer-item">
					<u-button type="defalut" shape="circle" size="mini" @click="handleToDetail">{{list.toPayState}}</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CardOrder",
		props: {
			list: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		computed: {
			num() {
				if(!this.list.product_list || this.list.product_list.length == 0) {
					return 0
				}
				return this.list.product_list.reduce((prev, cur, index, arr) => {
					return prev + cur.number;
				}, 0)
			}
		},
		methods: {
			handleToDetail() {
				uni.navigateTo({
					url: `/pages/orderDetail/orderDetail?id=${this.list.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		margin-bottom: 20rpx;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		border-radius: 20rpx;
		padding: 20rpx;
		min-height: 200rpx;

		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
			border-bottom: 1rpx solid #f2f2f2;

			.header-left {
				display: flex;
				color: #999;
				flex: 1;
				overflow: hidden;
				.left-item {
					display: flex;
					align-items: center;
					overflow: hidden;
					.shop-name {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						// font-weight: bold;
						font-size: 30rpx;
						padding: 0 10rpx;
					}
				}
			}

			.header-right {
				flex-grow: 0;
				flex-shrink: 0;
				.right-item {
					.status-text {
						color: #ff4700;
						// font-size: 24rpx;
					}
				}
			}
		}

		.card-content {
			.p-list {
				margin-bottom: 20rpx;
				border-bottom: 1rpx solid #f2f2f2;
				.p-list-item {
					display: flex;
					margin-bottom: 20rpx;

					.p-img {
						flex: 0 0 160rpx;
						height: 160rpx;
						position: relative;
						border-radius: 10rpx;
						overflow: hidden;
						margin-right: 20rpx;

						&:after {
							content: '';
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							background-color: rgba(0, 0, 0, 0.1);
						}
					}

					.p-info {
						flex: 1;
						overflow: hidden;

						.p-info-name {
							// font-size: 30rpx;
							overflow: hidden;
							-o-text-overflow: ellipsis;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							line-height: 40rpx;
							margin-bottom: 10rpx;
							font-weight: bold;
						}

						.p-info-sub {
							color: #999;
							font-size: 24rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 100%;
						}
					}

					.p-info-money {
						// flex-basis: 120rpx;
						min-width: 120rpx;
						padding-left: 30rpx;
						text-align: right;

						.p-count {
							color: #999;
							padding-top: 10rpx;
						}
					}
				}

			}

			.p-money {
				font-size: 24rpx;

				.price-dw {
					font-family: '微软雅黑';
					padding-right: 8rpx;
				}

				.price-text {
					font-size: 30rpx;
				}

			}

			.p-price {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				height: 60rpx;
				// border-bottom: 1rpx solid #f5f5f5;
				.price-item {
					display: flex;
					align-items: baseline;
					padding-left: 20rpx;
					color: #999;

					&.dark {
						color: #000;
						font-weight: bold;
					}

					.price-label {
						padding-right: 5rpx;
					}
				}
			}
		}

		.card-footer {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 80rpx;

			.footer-item {
				padding-left: 30rpx;
			}
		}
	}
</style>
