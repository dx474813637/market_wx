<template>
	<view class="grid-card">
		<view class="card-img-w">
			<view class="card-img">
				<u-image width="100%" height="100%" :src="list.pic1 || list.pic"></u-image>
			</view>

		</view>
		<view class="card-info">
			<view class="info-title">{{list.name || list.title}}</view>
			<view class="info-sub">库存:{{list.stock}}{{list.unit}}</view>
			<view class="info-price">
				<!-- <view class="sold-num">库存:{{list.stock}}{{list.unit}}</view> -->
				<view class="price item price-red">
					<template v-if="list.price == 0 ">
						<text class="price-yj">议价</text>
					</template>
					<template v-else>
						<text class="cheap-price-dw">¥</text>
						<text class="price-big">{{list.price}}</text>
					</template>
					<!-- <text class="cheap-price-dw">券后价</text> -->
				</view>
				<view class="in-cart-btn" @click.stop="inCart(list)">
					<u-icon name="plus"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CardProductGrid",
		
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			},
			
		},
		data() {
			return {

			};
		},
		methods: {
			async inCart(obj) {
				
					uni.showLoading()
					let res = await this.$http.get('/Market/api.html?api_url_xcx=productDetail_json', {
						params: {
							id: obj.id
						}
					})
					
					if(res.data.code == 1) {
						this.$store.dispatch('addCart', res.data.list)
					}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grid-card {
		margin-bottom: 20rpx;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		border-radius: 20rpx;
		padding: 10rpx;

		.card-img-w {
			position: relative;
			width: 100%;
			padding-top: 100%;
			border-radius: 14rpx;
			overflow: hidden;

			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, .1);
				z-index: 20;
			}

			.card-img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		.card-info {
			padding: 10rpx 6rpx;

			.info-title {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding-bottom: 10rpx;
				font-size: 30rpx;
			}

			.info-sub {
				color: #ea8d00;
				font-size: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.info-price {
				display: flex;

				justify-content: space-between;

				.in-cart-btn {
					margin-left: 10rpx;
					height: 45rpx;
					background-color: #aa55ff;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 45rpx;
					color: #fff;
					border-radius: 50%;
				}
			}
		}
	}
	.info-price {
		display: flex;
		align-items: flex-end;
		height: 60rpx;
		font-size: 24rpx;
		// flex-wrap: wrap;
		color: #999;
	
		.price {
			padding: 0 14rpx;
			border-radius: 8rpx;
		}
	
		.item {
			margin-right: 0rpx;
		}
	
		.price-red {
			color: #fff;
			background-color: red;
			background: linear-gradient(to right, #aa55ff, #ff00b3);
		}
	
		.price-big {
			font-size: 1.1rem;
		}
	
		.cheap-price-dw {
			// color: red;
			font-family: '微软雅黑';
			margin-right: 4rpx;
		}
			font-size: 1rem;
		.price-yj {
		}
	
		.cheap-price {
			// font-size: 34rpx;
			// font-weight: bold;
		}
	
		.cheap-price-label {
			margin-left: 6rpx;
			font-size: 24rpx;
		}
	
		.sold-num {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
