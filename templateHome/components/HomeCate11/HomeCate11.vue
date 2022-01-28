<template>
	<view>
		<template v-if="list.notice.length != 0">
			<u-notice-bar type="primary" :list="list.notice" :moreIcon="false"></u-notice-bar>
		</template>
		<view class="header  u-padding-l-r">

			<view class="search">
				<u-search shape="rect" bg-color="#fff" height="60" color="#000" :show-action="false" v-model="searchKw"
					@search="handlersearch">
				</u-search>
			</view>
			<view class="service-btn" @tap="makePhoneCall(list.online.phone)" v-if="list.online.phone">
				<u-icon name="server-fill" size="38"></u-icon>
			</view>

		</view>
		<view class="swiper u-padding-l-r ">
			<u-swiper height="300" :list="list.swiper" @click="swiper_click" bg-color="#ffffff"></u-swiper>
		</view>
		<view class="nav-wrapper " v-if="list.navbar.length != 0">
			<view class="nav ">
				<view class="item-nav" v-for="(ele, i) in list.navbar" :key="i" @click="navTo(ele.url)">
					<image class="nav-icon" :src="ele.image" />
					<view class="nav-title">{{ele.name}}</view>
				</view>
			</view>

		</view>
		<view class="u-padding-l-r u-margin-bottom-10" v-if="list.images[0].image">
			<u-image width="100%" mode="widthFix" :src="list.images[0].image" @click="navTo(list.images[0].url)">
			</u-image>
		</view>
		<view class="u-padding-l-r u-margin-bottom-10" v-if="list.images[1].image">
			<u-image width="100%" mode="widthFix" :src="list.images[1].image" @click="navTo(list.images[1].url)">
			</u-image>
		</view>
		<view class="product-wrapper  u-margin-bottom-40" v-if="list.product.length != 0">
			<view class="wrapper-title">
				<view class="wrapper-left">
					<view class="">热卖推荐</view>
				</view>
			</view>
			<scroll-view class="wrapper-list-x" :scroll-x="true">
				<view class="list">
					<view class="list-item" v-for="(item, index) in list.product.slice(0, 6)" :key="index">
						<view class="card" @click="navTo(item.url)">
							<view class="img-box u-margin-bottom-10">
								<view class="img">
									<u-image width="100%" mode="widthFix" :src="item.image"></u-image>
								</view>

							</view>
							<view class="title u-line-2 u-margin-10">{{item.title}}</view>
							<view class="sub u-line-1">{{item.info}}</view>
							<view class="price">
								<view class="price-bg">
									<text class="dw">￥</text>
									<text>{{item.price}}</text>
								</view>
								<u-icon name="more-dot-fill"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="img-grid u-margin-bottom-20">
			<view class="item-grid img-left">
				<image class="bigtitle" mode="scaleToFill" :src="list.images[2].image"
					@click="navTo(list.images[2].url)" />
			</view>
			<view class="item-grid img-right">
				<image class="bigtitle" mode="scaleToFill" :src="list.images[3].image"
					@click="navTo(list.images[3].url)" />

				<image class="bigtitle" mode="scaleToFill" :src="list.images[4].image"
					@click="navTo(list.images[4].url)" />
			</view>
		</view>
		<view class="img-grid img-grid2 u-margin-bottom-20">
			<view class="item-grid img-left">
				<image class="bigtitle" mode="scaleToFill" :src="list.images[5].image"
					@click="navTo(list.images[5].url)" />
			</view>
			<view class="item-grid img-left">
				<image class="bigtitle" mode="scaleToFill" :src="list.images[6].image"
					@click="navTo(list.images[6].url)" />
			</view>
		</view>


		<view class="product-wrapper  u-margin-bottom-40" v-if="list.product.length != 0">
			<view class="wrapper-title">
				<view class="wrapper-left">
					<view class="">更多优选</view>
				</view>
			</view>
			<view class="wrapper-list">
				<view class="grid-card" v-for="(item, index) in list.product.slice(6)" :key="index"
					@click="navTo(item.url)">
					<view class="card-img-w">
						<view class="card-img">
							<u-image width="100%" height="100%" :src="item.image"></u-image>
						</view>
					</view>
					<view class="card-info">
						<view class="info-title">{{item.title}}</view>
						<view class="info-sub">{{item.info}}</view>
						<view class="info-price">
							<!-- <view class="sold-num">库存:{{item.stock}}{{item.unit}}</view> -->
							<view class="price item price-red">
								<text class="cheap-price-dw">¥</text>
								<text class="price-big item">{{item.price}}</text>
								<!-- <text class="cheap-price-dw">券后价</text> -->
							</view>
							<view class="in-cart-btn" @click.stop="inCart(item)">
								<u-icon name="more-dot-fill"></u-icon>
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
	import {
		CardProductCell
	} from '@/components/CardProductCell/CardProductCell';
	import {
		NewsCell
	} from '@/components/NewsCell/NewsCell';
	export default {
		name: "HomeCate11",
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
		components: {
			CardProductCell,
			NewsCell,
		},
		computed: {
			...mapState(['theme']),
		},
		onReady() {
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

			swiper_click(index) {
				this.navTo(this.list.swiper[index].url);

			},
			makePhoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone + ""
				});
			},
			navTo(e, flag) {
				if (!uni.getStorageSync('login') && flag) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
					uni.showToast({
						title: '请登录生意宝账号。',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: e
					});
				}
			},
			handlersearch(value) {
				this.navTo('/pages/prodList/prodList?keywords=' + value);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.img-grid {
		display: flex;
		height: 500rpx;
		padding: 0 20rpx;
		justify-content: space-between;
		&.img-grid2 {
			height: 240rpx;
			.item-grid image {
				height: 240rpx;
			}
		}
		image {
			border-radius: 12rpx;
		}

		.item-grid {
			width: calc(50% - 10rpx);

			image {
				height: 500rpx;
			}

			&.img-right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				image {
					height: calc(50% - 10rpx);
					display: block;
				}
			}
		}
	}

	.wrapper-list-x {
		.list {
			display: flex;
			align-items: center;
			padding: 10rpx;

			.list-item {
				flex: 0 0 30%;
				width: 30%;
				padding: 10rpx;

				.card {
					width: 100%;
					background-color: #fff;
					border-radius: 10rpx;
					overflow: hidden;
					box-shadow: 0 0 10rpx rgba(0, 0, 0, .05);

					.img-box {
						position: relative;
						width: 100%;
						padding-top: 100%;

						.img {
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
						}
					}

					.title {
						padding: 0 10rpx;
						font-size: 26rpx;
						line-height: 36rpx;
						min-height: 72rpx;
					}

					.sub {
						padding: 0 10rpx;
						font-size: 24rpx;
						color: #999;
					}

					.price {
						padding: 10rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #ff00b3;

						.price-bg {
							border-radius: 6rpx;
							height: 50rpx;
							display: flex;
							align-items: center;

							.dw {
								font-size: 24rpx;

							}
						}
					}
				}
			}
		}
	}

	.homebg {
		background-color: #fff;
	}

	.home-dh {
		display: flex;
		padding: 20rpx;

		.dh-item {
			flex: 1;
			padding: 0 8rpx;

			.dh-card {
				border-radius: 8rpx;
				background-color: #3a89ff;
				height: 100rpx;
				padding: 10rpx;
				position: relative;

				&:after {
					content: "";
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(225deg, transparent, rgba(255, 255, 255, .1))
				}

				&.yhq {
					background-color: #e85ea8;
				}

				&.dd {}

				&.qb {
					background-color: #5776ff;
				}

				.name {
					color: #fff;
					font-size: 26rpx;
					position: relative;
					z-index: 20;
				}

				.dhbg {
					position: absolute;
					z-index: 20;
					right: 8rpx;
					bottom: 8rpx;
					opacity: .6;
				}
			}
		}
	}

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

	.header {
		display: flex;
		align-items: center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;

		.search {
			position: relative;
			z-index: 20;
			flex: 1;
		}

		.service-btn {
			flex: 0 0 100rpx;
			width: 100rpx;
			display: flex;
			align-items: center;
			padding-right: 10rpx;
			justify-content: flex-end;
		}
	}


	.swiper {
		position: relative;
		z-index: 20;
		padding-bottom: 10rpx;
		margin-bottom: 10rpx;

	}

	.wrapper-news-list {
		padding: 0 20rpx;
	}

	.nav-wrapper {
		padding: 0 10rpx;
	}

	.nav {
		// background-color: #fff;
		border-radius: 8rpx;
		display: flex;
		flex-wrap: wrap;

		.item-nav {
			flex: 0 0 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 14rpx 0;


			.nav-icon {
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 8rpx;
			}

			.nav-title {
				color: #000;
				font-size: 24rpx;
				letter-spacing: 2rpx;
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

	.wrapper-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		height: 80rpx;
		border-top: 1rpx solid #f8f8f8;
		border-bottom: 1rpx solid #f8f8f8;

		.wrapper-left {
			display: flex;
			color: #000;
			font-size: 30rpx;
			font-weight: bold;
			letter-spacing: 4rpx;

		}

		.wrapper-right {
			display: flex;
			color: #999;
			font-size: 24rpx;

			view {
				margin-right: 6rpx;
			}
		}
	}

	.product-wrapper {
		// background-color: #fff;

		.wrapper-list {
			padding: 20rpx;
			display: flex;
			flex-wrap: wrap;
		}

	}

	.grid-card {
		margin-bottom: 20rpx;
		flex: 0 0 49%;
		width: 49%;
		background-color: #fff;
		overflow: hidden;
		border-radius: 20rpx;
		padding: 10rpx;
		&:nth-of-type(2n) {
			margin-left: 2%;
		}
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
