<template>
	<view>
		<view class="search u-margin-bottom-20 u-padding-l-r">
			<u-search 
				shape="round" 
				bg-color="#f8f8f8" 
				height="60" 
				:show-action="false"
				v-model="searchKw"
				@search="handlersearch"
			>
			</u-search>
		</view>
		<view class="swiper" v-if="list.swiper.length != 0" >
			<u-swiper
				height="300"
				:list="list.swiper"
				@click="swiper_click"
				bg-color="transparent"
			></u-swiper>
		</view>
		<view class="product-wrapper" v-if="list.product.length != 0">
			<view class="wrapper-title">
				<view class="wrapper-left">
					<!-- <u-icon name="tags-fill" color="#ff007f" size="34"></u-icon> -->
					<view class="left-title">热卖推荐</view>
				</view>
				<view class="wrapper-right" @click="navTo('/pages/prodList/prodList')">
					<view class="right-btn">查看所有</view>
				</view>
			</view>
			<view class="wrapper-list">
				<view class="product-card" v-for="(item, index) in list.product" :key="index" @click="navTo(item.url)">
					<view class="card-img card-left">
						<u-image width="100%" height="100%" :src="item.image"></u-image>
					</view>
					<view class="card-info card-right">
						<view class="info-title">
							<view class="title">{{item.title}}</view>
							<view class="sub">
								<text>{{item.info}}</text>
							</view>
						</view>
						<view class="info-bottom">
							<view class="info-price"></view>
							<view class="info-price bottom-right">
								
								<view class="price item price-red">
									<text class="cheap-price-dw">¥</text>
									<text class="price-big">{{item.price}}</text>
								</view>
								<view class="in-cart-btn">
									<u-icon name="more-dot-fill"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import { CardProductCell } from '@/components/CardProductCell/CardProductCell';
	export default {
		name: "HomeCate1",
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				searchKw: ""
			};
		},
		components: {
			CardProductCell,
		},
		computed: {
			...mapState(['theme']),
		},
		onReady() {
			// this.changeVoteTheme({
			// 	themeColor: "#007aff",
			// 	textColor: "#ffffff",
			// 	bgColor: "#007aff",
			// })
			uni.setNavigationBarColor({
				frontColor: "#000000",
				backgroundColor: "#ffffff",
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			});
		},
		methods: {
			...mapMutations(['changeVoteTheme']),
			
			makePhoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone+""
				});
			},
			navTo(e) {
				uni.navigateTo({
					url: e
				});
			},
			handlersearch(value) {
				this.navTo('/pages/prodList/prodList?keywords='+value);
			},
			swiper_click(index) {
				this.navTo(this.list.swiper[index].url);
				
			},
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 260rpx;

		image {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 30rpx;
		}
	}

	.boxShadow {
		box-shadow: 0 0px 10rpx rgba(0, 0, 0, .1);
	}

	.u-padding-l-r {
		padding: 0 25rpx;
	}

	.search {
		position: relative;
		z-index: 20;
	}

	.swiper {
		position: relative;
		z-index: 20;
		margin: 0 20rpx 20rpx 20rpx;

	}

	.nav {
		background-color: #fff;
		border-radius: 8rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 0;

		.item-nav {
			flex: 0 0 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 12rpx 0;

			.nav-icon {
				width: 70rpx;
				height: 70rpx;
				margin-bottom: 4rpx;
			}

			.nav-title {
				color: #000;
				font-size: 26rpx;
			}
		}
	}

	.service {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 10rpx 0 10rpx;
		.service-top {
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			height: 140rpx;
		}
		.service-bottom {
			padding: 0 15rpx 5rpx 15rpx;
		}

		.item-avatar {
			flex: 0 0 80rpx;
			width: 80rpx;
			height: 80rpx;
			background-color: #f8f8f8;
			border-radius: 6rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
		}

		.item-desc {
			flex: 1;
			color: #999;
			font-size: 24rpx;

			.title {
				color: #666;
				font-size: 30rpx;
				margin-bottom: 10rpx;
			}
		}

		.item-func {
			flex: 0 0 70rpx;
			width: 70rpx;
			height: 70rpx;
			border: 1rpx solid #007aff;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

		}

	}

	.product-wrapper {
		background-color: #fff;

		.wrapper-list {
			padding: 20rpx;
		}
		.wrapper-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			height: 90rpx;
			// border-bottom: 1rpx solid #f8f8f8;
			.wrapper-left {
				display: flex;
				color: #000;
				font-size: 30rpx;
				view {
					margin-left: 6rpx;
				}
				.left-title {
					font-weight: bold;
				}
			}

			.wrapper-right {
				display: flex;
				color: #999;
				font-size: 24rpx;
				view {
					margin-right: 6rpx;
				}
				.right-btn {
					border: 1rpx solid #f8f8f8;
					border-radius: 24rpx;
					padding: 4rpx 14rpx;
				}
			}
		}
	}
	.product-card {
		display: flex;
		margin-bottom: 30rpx;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		border-radius: 10rpx;
		height: 220rpx;
		padding: 20rpx 10rpx;
		box-shadow: 0 6rpx 6rpx rgba(90,90,90,.05);
		
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
					color: #b5b2e5;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text {
						padding-right: 8rpx;
						word-break: break-all;
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
	}
</style>
