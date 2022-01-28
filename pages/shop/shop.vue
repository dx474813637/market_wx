<template>
	<view>
		<view class="shop-header">
			<view class="shop-h-top u-flex u-row-between">
				<view class="item u-flex u-m-b-12">
					<u-icon name="dianpu" custom-prefix="custom-icon"></u-icon>
					<view class="u-m-l-10 u-font-30">{{shop.list.name}}</view>
					<text class="ziying" v-if="shop.list.ziying == 1">自营</text>
				</view>
			</view>
			<view class="shop-h-main">
				<view >
					<u-parse :html="`${shop.list.intro}`"></u-parse>
				</view>
			</view>
		</view>
		<view class="list u-flex u-flex-wrap">
			<view class="item" v-for="item in shop.product" :key="item.id" @click="handlePathDetail(item)">
				<view class="grid-card">
					<view class="card-img-w">
						<view class="card-img">
							<u-image width="100%" height="100%" :src="item.pic1"></u-image>
						</view>
				
					</view>
					<view class="card-info">
						<view class="info-title">{{item.name}}</view>
						<view class="info-sub">库存:{{item.stock}}{{item.unit}}</view>
						<view class="info-price">
							<!-- <view class="sold-num">库存:{{item.stock}}{{item.unit}}</view> -->
							<view class="price item price-red">
								<template v-if="item.price == '议价' ">
									<text class="price-yj">议价</text>
								</template>
								<template v-else>
									<text class="cheap-price-dw">¥</text>
									<text class="price-big">{{item.price}}</text>
								</template>
								<!-- <text class="cheap-price-dw">券后价</text> -->
							</view>
							<!-- <view class="in-cart-btn" @click.stop="inCart(item)">
								<u-icon name="plus"></u-icon>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<nav-bar :tabbar="true"></nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop: {
					list: {},
					product: []
				},
				id: '',
			};
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id;
			}else {
				uni.showToast({
					title: '参数有误',
					icon: 'none'
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}, 1500)
				
				return
			}
			uni.showLoading()
			await this.getData()
		},
		methods: {
			async getData() {
				let res = await this.$http.get('/Market/api.html?api_url_xcx=shop', {params: {id: this.id}})
				uni.hideLoading()
				if(res.data.code == 1) {
					this.shop = res.data
					uni.setNavigationBarTitle({
						title: this.shop.list.name
					});
				}
				
			},
			handlePathDetail(obj) {
				uni.navigateTo({
					url: `/pages/prodDetail/prodDetail?id=${obj.id}`,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.shop-header {
		color: #999;
		padding: 10px;
		background-image: url('../../static/img/sd_bg.jpg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		.shop-h-top {
			.item {
				color: #fff;
				font-weight: bold;
				.ziying {
					background-color: red;
					color: #fff;
					padding: 0px 6px;
					border-radius: 3px;
					font-size: 24rpx;
					margin-left: 4px;
				}
			}
		}
		.shop-h-main {
			
		}
	}

	
	.list {
	
		padding: 10rpx 15rpx 15rpx;
		.item {
			flex: 0 0 49%;
			width: 49%;
			margin-right: 2%;
			&:nth-of-type(2n) {
				margin-right: 0;
			}
			
		}
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
