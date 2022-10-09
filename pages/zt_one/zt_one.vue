<template>
	<view class="zt-wrapper" :style="{
		backgroundColor: list.color
	}">
		<view class="zt-header">
			<image :src="list.pic" mode="widthFix"></image>
		</view>
		<view class="zt-main u-p-20"
			v-for="item in special"
			:key="item.id"
		>
			<view class="main-title">{{item.name}}</view>
			<view class="p-list u-flex u-flex-wrap" v-if="item.cate == '1'">
				<view class="item" v-for="ele in item.list" :key="ele.id"  @click="handlePathDetail(ele)">
					<CardProductGrid :list="ele"></CardProductGrid>
				</view>
			</view>
			<view class="s-list" v-else-if="item.cate == '2'">
				<view class="item"  v-for="ele in item.list" :key="ele.id">
					<view class="shop-card">
						<view class="shop-card-header u-flex u-row-between">
							<view class="item-left">
								<view class="u-flex u-col-bottom">
									<view class="shop-title u-p-r-12 u-line-1">{{ele.name}}</view>
									<!-- <view class="shop-addr">货源地：萧山</view> -->
								</view>
								<view class="shop-sub u-line-1 u-m-t-6" v-if="ele.description">{{ele.description}}</view>
							</view>
							<view class="item-right">
								<u-button type="error" shape="circle" size="mini" @click="gotoShop(ele.id)">进店</u-button>
							</view>
						</view>
						<view class="shop-card-main">
							<view class="img-wrapper u-flex u-row-between">
								<view class="item-img" v-for="img in ele.product" :key="img.id">
									<image :src="img.pic1"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<nav-bar :tabbar="true" ></nav-bar>
	</view>
</template>

<script>
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				special: [],
				list: {}
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
				let res = await this.$http.get('/Market/api.html?api_url_xcx=special', {params: {id: this.id}})
				uni.hideLoading()
				if(res.data.code == 1) {
					this.special = res.data.special
					this.list = res.data.list
					this.share_title = res.data.share_title
					this.share_img = res.data.share_img
					uni.setNavigationBarTitle({
						title: this.list.title
					});
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: res.data.list.color,
						animation: {
							duration: 400,
							timingFunc: 'easeIn'
						}
					});
				}
				
			},
			handlePathDetail(obj) {
				uni.navigateTo({
					url: `/pages/prodDetail/prodDetail?id=${obj.id}`,
				})
			},
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
			},
			gotoShop(id) {
				uni.navigateTo({
					url: `/pages/shop/shop?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zt-wrapper {
		min-height: 100vh;
		.zt-header {
			max-height: 100vh;
			overflow: hidden;
			image {
				width: 100%;
				font-size: 0;
				display: block;
			}
		}
		.zt-main {
			.main-title {
				color: #fff;
				text-align: center;
				line-height: 40px;
				font-size: 20px;
				margin-bottom: 10px;
				font-weight: bold;
			}
			.p-list {
				.item {
					width: 49%;
					flex: 0 0 49%;
					margin-bottom: 2%;
					margin-right: 2%;
					&:nth-of-type(2n) {
						margin-right: 0;
					}
					.grid-card {
						margin-bottom: 20rpx;
						width: 100%;
						background-color: rgba(255,255,255,.95);
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
			}
			.s-list {
				.item {
					margin-bottom: 10px;
					.shop-card {
						background-color: rgba(255,255,255,.95);
						border-radius: 14px;
						padding: 10px;
						.shop-card-header {
							padding-bottom: 14rpx;
							.item-left {
								font-size: 24rpx;
								flex: 0 0 80%;
								width: 80%;
								.shop-title {
									color: #000;
									font-size: 32rpx;
									font-weight: bold;
									margin-bottom: 5px;
								}
								.shop-addr {
									color: #999;
								}
								.shop-sub {
									color: #666;
								}
							}
							.item-right {
								
							}
						}
						.shop-card-main {
							.img-wrapper {
								.item-img {
									width: 32%;
									padding-top: 32%;
									position: relative;
									overflow: hidden;
									image {
										position: absolute;
										left: 0;
										top: 0;
										width: 100%;
										height: 100%;
										border-radius: 5px;
									}
								}
							}
						}
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
