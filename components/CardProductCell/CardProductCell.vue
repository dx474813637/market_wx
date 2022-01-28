<template>
	<view class="row-card">
		<view class="card-img card-left">
			<u-image width="100%" height="100%" :src="list.pic1 || list.pic"></u-image>
		</view>
		<view class="card-info card-right">
			<view class="info-title">
				<view class="title">{{list.name || list.title}}</view>
				<view class="sub" v-if="list.brand || list.model">
					<template v-if="list.brand">
						<text>品牌:{{list.brand}}</text>
					</template> 
					<template v-if="list.model">
						<text>规格:{{list.model}}</text>
					</template>
				</view>
				<view class="sub sub-b" v-if="list.d4">
					<text>{{list.d4}}</text>
				</view>
			</view>
			<view class="info-bottom">
				<view class="info-price">
					<view class="sold-num" v-if="list.stock">库存:{{list.stock}}{{list.unit}}</view>
				</view>
				<view class="info-price bottom-right">
					
					<view class="price item price-red">
						<template  v-if="list.price == '议价' ">
							<text class="price-yj">议价</text>
						</template>
						<template v-else>
							<text class="cheap-price-dw">¥</text>
							<text class="price-big">{{list.price}}</text>
						</template>
						
						<!-- <text class="cheap-price-label">券后价</text> -->
					</view>
					<view class="in-cart-btn" @click.stop="inCart(list)">
						<u-icon name="plus"></u-icon>
					</view>
					<!-- <view class="price item">¥{{list.price1}}</view> -->
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CardProductCell",
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
	.row-card {
		display: flex;
		margin-bottom: 20rpx;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		border-radius: 10rpx;
		height: 200rpx;
		padding: 10rpx;

		.card-img {
			flex: 0 0 180rpx;
			width: 180rpx;
			height: 180rpx;
			position: relative;
			overflow: hidden;
			border-radius: 10rpx;
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
		}

		.card-info {
			padding: 0 12rpx;
			height: 180rpx;
			display: flex;
			flex: 1;
			width: 0;
			flex-direction: column;
			justify-content: space-between;

			.info-title {
				.title {
					color: #000;
					overflow: hidden;
					-o-text-overflow: ellipsis;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					margin-bottom: 6rpx;
				}

				.sub {
					color: #ea8d00;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text {
						padding-right: 8rpx;
						word-break: break-all;
					}
					&.sub-b {
						color: #999;
						margin-top: 6rpx;
					}
				}
			}

			.info-bottom {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
			}
		}
	}

	.info-price {
		display: flex;
		align-items: baseline;
		height: 40rpx;
		font-size: 24rpx;
		flex-wrap: wrap;
		color: #999;
		flex: 1;
		overflow: hidden;
		
		&.bottom-right {
			align-items: center;
			flex-shrink: 0;
			flex-grow: 0;
			flex-basis: auto;
		}
		.in-cart-btn {
			margin-left: 10rpx;
			height: 36rpx;
			background-color: #aa55ff;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 36rpx;
			color: #fff;
			border-radius: 50%;
		}
		.item {
			margin-right: 8rpx;
		}

		.price-red {
			color: red;
		}

		.price-big {
			font-size: 1.1rem;
		}

		.cheap-price-dw {
			color: red;
			font-family: '微软雅黑';
		}
		.price-yj {
			font-size: 1rem;
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
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
</style>
