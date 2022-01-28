<template>
	<view>
		<view class="status" :style="{position:headerPosition}"></view>
		<view class="header" :style="{position:headerPosition}">
			<view class="menu" v-if="list.share.logo">
				<image mode="widthFix" :src="list.share.logo"></image>
			</view>

			<view class="item">
				<u-search shape="round" bg-color="#f8f8f8" height="60" color="#000" :show-action="false"
					v-model="searchKw" @search="handlersearch">
				</u-search>
			</view>
			<view class="scan" v-if="list.online.phone">
				<view @click="makePhoneCall(list.online.phone)" style="width: 60rpx;height: 60rpx; ">
					<image style="width: 100%;height: 100%;"
						src="https://wx3.y.netsun.com/Public/tpl/static/grid-icon/kefu.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="place"></view>
		<view class="swiper-view">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true"
				indicator-active-color="#ffffff">
				<swiper-item v-for="(item, index) in list.swiper" :key="index" @click="navTo(item.url)">
					<image mode="aspectFill" :src="item.image"></image>
				</swiper-item>
			</swiper>
			<view class="keep-out"></view>
		</view>
		<view class="category">
			<view class="box">
				<view class="category-list">
					<view class="icon" v-for="(item, index) in list.navbar" :key="index"
						@click="navTo(item.url)">
						<image mode="widthFix" :src="item.image"></image>
						<view>{{ item.name }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pick">
			<view class="box">
				<view class="title">
					<view class="big">推荐商品</view>
					<view class="small">好货推荐 低价精选</view>
				</view>
				<view class="product-list">
					<view v-for="(item ,index) in list.product.slice(0, 3)" :key="index"
						@click="navTo(item.url)">
						<image mode="widthFix" :src="item.image"></image>
						<view class="price">￥{{item.price}}</view>
						<!-- <view class="slogan">{{item.slogan}}</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="banner" v-if="list.images[0].image">
			<image @click="navTo(list.images[0].url)" :src="list.images[0].image" mode="widthFix"></image>
		</view>
		<view class="goods-list">
			<view class="title">— 猜你喜欢 —</view>
			<view class="product-list">
				<view class="product" v-for="(item, index) in list.product.slice(3)" :key="index" @click="navTo(item.url)">
					<image mode="widthFix" :src="item.image"></image>
					<view class="name">{{item.title}}</view>
					<view class="info">
						<view class="price">{{item.price}}</view>
						<!-- <view class="slogan">{{item.slogan}}</view> -->
					</view>
				</view>
			</view>
			<!-- <view class="loading-text">{{loadingText}}</view> -->
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			},
			scrollY: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				searchKw: "",
				categoryHeight: '150px',
				currentPageindex: 0,
				headerPosition: "fixed",
				loadingText: "正在加载..."

			};
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#ff570a",
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			});
		},
		onLoad() {},
		methods: {
			...mapMutations(['changeVoteTheme']),

			swiper_click(index) {
				this.navTo(this.list.swiper[index].url);

			},
			makePhoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone + ""
				});
			},
			navTo(e) {
				uni.navigateTo({
					url: e
				});
			},
			swiperChange(e) {
				this.indexs = e.detail.current;
			},
			handlersearch(value) {
				this.navTo('/pages/prodList/prodList?keywords=' + value);
			},
			inCart() {
				this.$store.dispatch('addCart', this.list)
			},
			//扫一扫
			scan() {
				uni.scanCode({
					success: (res) => {
						uni.showToast({
							title: '条码内容：' + res.result
						});
					}
				});
			},
			categoryChange(event) {
				this.currentPageindex = event.detail.current;
			},
			categoryImgLoad(e) {
				this.categoryImg = this.categoryImg ? this.categoryImg + 1 : 1;
				if (this.categoryImg == 10) {
					this.getCategoryHeight();
				}
			},
			getCategoryHeight() {
				let view = uni.createSelectorQuery().select('.category-list');
				view.fields({
						size: true
					},
					data => {
						this.categoryHeight = data.height + 'px';
					}
				).exec();
			}
		}
	};
</script>
<style lang="scss">
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
		background-color: #ff570a;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.header {
		width: 100%;
		height: 100upx;
		background-color: #ff570a;
		display: flex;
			padding-left: 10rpx;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		z-index: 996;

		.scan {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.item {
			flex: 1;
			padding-left: 10rpx;
		}

		.input {
			width: calc(100% - 200upx);
			display: flex;
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

		.menu {
			width: 80upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
				border-radius: 60upx;
			}
		}
	}

	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff570a;
		height: 100upx;
	}

	.swiper-view {
		.swiper {
			width: 100%;
			height: 280upx;

			image {
				width: 100%;
				height: 280upx;
			}
		}

		.keep-out {
			width: 100%;
			height: 30upx;
			border-radius: 100% 100% 0 0;
			background-color: #ff570a;
			margin-top: -15upx;
			position: absolute;
		}
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
	.category {
		width: 100%;
		padding: 2.5vw 2.5vw;
		background-color: #ff570a;

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

				
			}
		}
	}

	.pick {
		width: 100%;
		padding: 0 2.5vw 2.5vw 2.5vw;
		background: linear-gradient(to bottom, #ff570a 0%, #ffffff 105%);

		.box {
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;

			.title {
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;
				height: 60upx;
				border-bottom: solid 1upx #eee;
				padding-bottom: 10upx;

				.big {
					font-size: 34upx;
					padding-left: 20upx;
					color: #46434f;
				}

				.small {
					font-size: 24upx;
					padding-left: 20upx;
					color: #827f8b;
				}
			}

			.product-list {
				padding: 15upx 20upx 15upx 20upx;
				column-count: 2;
				column-width: 50%;
				column-gap: 10upx;

				>view {
					background-color: #f8f8f8;
					position: relative;

					&:nth-child(1) {
						.price {
							color: #e65339;
							font-size: 30upx;
							position: absolute;
							bottom: 8upx;
							left: 8upx;
						}

						.slogan {
							color: #807c87;
							font-size: 30upx;
							position: absolute;
							bottom: 8upx;
							right: 8upx;
						}

						image {
							width: 100%;
							height: 0;
							margin-bottom: 50rpx;
						}
					}

					&:nth-child(2),
					&:nth-child(3) {
						image {
							width: calc(50% - 5upx);
							height: 0;
							margin: 10rpx;
						}

						.price {
							position: absolute;
							top: 25%;
							left: 60%;
							color: #e65339;
							font-size: 30upx;
						}

						.slogan {
							position: absolute;
							top: 60%;
							left: 60%;
							color: #807c87;
							font-size: 20upx;
						}
					}

					&:nth-child(2) {
						margin-bottom: 10upx;
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
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
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
