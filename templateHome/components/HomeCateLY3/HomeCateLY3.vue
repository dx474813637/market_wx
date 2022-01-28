<template>
	<view>
		<!-- 状态栏 -->
		<view class="status"></view>
		<!-- 漂浮头部 -->
		<view class="header">
			<view class="search">
				<u-search shape="round" bg-color="#f8f8f8" height="60" color="#000" :show-action="false"
					v-model="searchKw" @search="handlersearch">
				</u-search>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<view class="shopinfo">
			<view class="shop-box">
				<image class="shop-img" :src="list.share.logo"></image>
				<view class="shop-body">
					<view class="shop-name" @click="navTo('/pages/prodList/prodList')">
						{{list.share.company}}
						<u-icon style="transform: scale(0.6);" name="arrow-right"></u-icon>
					</view>
					<view class="shop-label">
						<view class="shop-tag">生意旺铺</view>
						<!-- <text class="shop-follow-num">5000万人关注</text> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="pick">
			<view class="title">热销榜</view>
			<scroll-view scroll-x="true" class="hot-sale-box">
				<view class="hot-sale-item" v-for="(item, index) in list1" :key="index">
					<view class="goods-box" @click="navTo(item.url)">
						<image class="goods-img u-margin-bottom-10" :src="item.image"></image>
						<view class="goods-name u-margin-bottom-10 u-line-2">{{item.title}}</view>
						<view class="goods-price"><text>¥</text>{{item.price}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="title">更多商品</view>
			<view class="product-list">
				<view class="product" v-for="(product, index) in list2" :key="index" @click="navTo(product.url)">
					<image class="goods-img" mode="widthFix" :src="product.image"></image>
					<view class="name u-line-1">{{product.title}}</view>
					<view class="info">
						<view class="price">{{product.price}}</view>
						<!-- <view class="slogan">{{product.slogan}}</view> -->
					</view>
				</view>
			</view>
			<!-- <view class="loading-text">{{loadingText}}</view> -->
		</view>

	</view>
</template>

<script>
	export default {
		name: "HomeCateLY3",
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
				searchKw: "",

			};
		},
		computed: {
			list1() {
				return this.list.product.slice(0, 4)
			},
			list2() {
				return this.list.product.slice(4)
			},
		},
		onLoad() {

		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#0e4a89",
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			});
		},
		methods: {

			navTo(e) {
				uni.navigateTo({
					url: e
				});
			},
			handlersearch(value) {
				this.navTo('/pages/prodList/prodList?keywords=' + value);
			},
		}
	};
</script>
<style lang="scss" scoped>
	@font-face {
		font-family: "HMfont-home";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAP8AAsAAAAACFwAAAOwAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqEEINSATYCJAMQCwoABCAFhG0HTxtLBxHVmzvJfhS4scOeC1v4zNNRK/hO5b0IHqg/8838ye5XsIDanmAkhZ1NSZygm4SsbYYkp17ICsOUxIP/ZZm9xejtQAD8zzX10geY387mEtXapUd7A5xF6oAi2pJoE8YNY1dexGkIwCSZQoiq1es2RUdhTBKA6N2jWwf0lAlVky3QEYSUrFSIOTjQ5VR5GZjt/168obDQQeLQMGY27FqtMxWf5z5fpgWCgdYugng8B8DWgQYUAhSI7qWujmhhqBAaptJfURzQ0ZEwVkfB58uCQSTZi0o3//JAItBAhGBk2gAURUrtxMQ2BQnPC1IQ8HyZmpvE1XgdMIDtwHVEJt4qkThsZwFPVHiEFTHKtWBBYGGUe/HmsZu6TluCStw+fXGMY9GyUb4b133Xrze9etV77VqzxcuXbYq8bF6/7rtxo5lY6A1cLcuCQJS3oXHswOYKUSaI71xkXr3ayZy2SIix0YumRS6AwEnLmr58WS9z2pKlYcJCCGzcXOU81Xuhp1osIWbBiUQWehda7lTvaNeCJX0WbYgksMA0hdlLo6zDp1PEomIdVu7YE4wN7nH7uGPdHXz2R3uHnX68tcP6SPE5ZSdObNpN/9dybtfmr6tHoy6+rN+DqdvnW9lUbkHTdcUWfKp1yzVr5Ag5HCqGU0Hca3jpAt2GiWFRwxYvdpYFo2b3tN/HvLeFd+BAr5Bu7CXnzKFlJb8dtP3ucx1djc+589Pep+W7X706stfvml+7i8fsWunxp7/f/uzsrgzj9Sv3p+6T7yqwvrfdy3nk/J6eZ84fnHp2lSvf/m/7H7569dDvuY/fTX+Mwdog+QVAGyB/IHmGyK8/exQrX13Maucu+y23rrbi5tQ1T3yTor3oj4kV8a8VtyxSqtQwKyXLbJF2kaI5DgAkYGICPzQG4dwfQxPVOhMEOlExSEJJAg2dTFSRhcCBRVEIQacCmBSkxnqLCAaiIZQBFGAiAIGH3SBxcRo0PFxBFXkPHETzDkLwCA1MfCJiR4tswStWxeEccIPlAbXSxS1rYEH2G0U8ZpeU+sw/Oq+80JR1NjrghW6MOT6JNgQO3NEJPTgPj4PAONK4hlKGYLqq4mVvKlc6M0YVh3PADZYH1EoXd8sHlvv+G0U8ZldDq/D+0XnVPTRl3QIdVFcr2rX090m0IXA8jjs6oYcOPMwQgSkfpnENpewRMF2FSvG2qnJ+zfmE6wATY6YSUmhCCQehg9V8advwun0+nHuJ0VP0kYrcz/Qox5hl') format('woff2');
	}

	.icon {
		font-family: "HMfont-home" !important;
		font-size: 60upx;
		font-style: normal;
		color: #ffffff;

		&.scan {
			&:before {
				content: "\e69a";
			}
		}

		&.menu {
			&:before {
				content: "\e62b";
			}
		}

		&.search {
			&:before {
				content: "\e628";
			}
		}
	}

	page {
		background-color: #fff;
	}

	.status {
		width: 100%;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);
		/*  #endif  */
		background-color: #0e4a89;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.header {
		width: 100%;
		height: 100upx;
		background-color: #0e4a89;
		display: flex;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		z-index: 996;

		.search {
			width: 100%;
			padding: 20rpx;
		}

		.scan {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.input {
			width: calc(100% - 200upx);
			display: flex;
			margin-left: 20rpx;
			justify-content: center;
			align-items: center;
			position: relative;

			input {
				width: calc(100% - 60upx);
				height: 60upx;
				background-color: #ffffff;
				border-radius: 60upx;
				padding-left: 60upx;
				font-size: 30upx;

			}

			.icon {
				width: 60upx;
				height: 60upx;
				position: absolute;
				color: #a18090;
				z-index: 996;
				top: 20upx;
				left: 0;
				font-size: 40upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.fenx {
			margin-left: 50rpx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 40upx;
				height: 40upx;
			}
		}

		.menu {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 40upx;
				height: 40upx;
			}
		}
	}

	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		background-color: #0e4a89;
		height: 100upx;
	}

	.category {
		width: 100%;
		padding: 2.5vw 2.5vw;
		background-color: #0e4a89;

		.box {
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;

			.dots {
				display: flex;
				justify-content: center;
				height: 15upx;
				width: 100%;

				view {
					width: 30upx;
					height: 5upx;
					background-color: rgba(0, 0, 0, 0.2);

					&.active {
						background-color: #ff570a;
					}
				}
			}

			.swiper {
				width: 100%;
				padding: 10upx 0;

				.uni-swiper-dot {
					width: 20upx;
				}

				.category-list {
					width: 100%;
					height: auto;
					display: flex;
					justify-content: flex-start;
					padding: 10upx 0;
					flex-flow: wrap;

					.icon {
						width: 20%;
						display: flex;
						flex-flow: wrap;
						justify-content: center;
						font-size: 22upx;
						color: #666;

						image {
							width: 70%;
							height: 13.3vw;
						}

						view {
							width: 100%;
							display: flex;
							justify-content: center;
						}
					}
				}
			}
		}
	}

	.shopinfo {
		width: 100%;
		padding: 0 2.5vw 2.5vw 2.5vw;
		background: #0e4a89;

		.shop-box {
			display: flex;
			position: relative;

			.shop-img {
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
				border-radius: 50%;
			}

			.shop-body {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				width: auto;

				.shop-name {
					font-size: 32rpx;
					font-weight: bold;
					color: #fff;
				}

				.shop-label {
					font-size: 22rpx;
					color: #fff;

					.shop-tag {
						display: inline-block;
						height: 40rpx;
						line-height: 40rpx;
						padding: 0 10rpx;
						background-color: #F74141;
						border-radius: 4rpx;
						color: #fff;
						margin-right: 4rpx;
						transform: scale(0.9);
						transform-origin: 0;
					}

					.shop-follow-num {}
				}
			}
		}
	}

	.goods-img {

		position: relative;

		&:after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			border-radius: 20rpx 20rpx 0 0;
			background-color: rgba(90, 90, 90, .1);
		}
	}

	.pick {
		width: 100%;
		padding: 0 2.5vw 2.5vw 2.5vw;
		background: linear-gradient(to bottom, #0e4a89 0%, #ffffff 105%);

		.title {
			font-size: 32rpx;
			color: #fff;
			font-weight: bold;
			position: relative;
			height: 80rpx;
			line-height: 80rpx;
		}

		.hot-sale-box {
			background-color: #fff;
			padding: 20rpx 15rpx;
			height: 370rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			white-space: nowrap;

			.hot-sale-item {
				width: 234rpx;
				height: 100%;
				display: inline-block;
				margin-right: 14rpx;

				&:last-child {
					margin-right: 0;
				}

				.goods-box {
					display: flex;
					flex-direction: column;
					height: 100%;
				}

				.goods-img {
					width: 100%;
					height: 200rpx;
					border-radius: 8rpx;
				}

				.goods-name {
					font-size: 28rpx;
					min-height: 80rpx;
					color: #333333;
					white-space: normal;


				}

				.one-line {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.goods-price {
					color: #E23C2B;
					font-size: 28rpx;
					font-weight: bold;

					text {
						margin-right: 5rpx;
						font-size: 0.8em;
					}
				}
			}
		}
	}

	.banner {
		image {
			width: 100%;
		}
	}

	.goods-list {
		background-color: #f4f4f4;

		.title {
			font-size: 32rpx;
			color: #666;
			font-weight: bold;
			padding-left: 30rpx;
			position: relative;
			height: 80rpx;
			line-height: 80rpx;
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 100%;
			padding: 0 2.5% 2.5vw 2.5%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48.75%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, .1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}

		}
	}
</style>
