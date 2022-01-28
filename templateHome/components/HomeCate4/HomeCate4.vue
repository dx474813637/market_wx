<template>
	<view>
		<view class="swiper u-margin-bottom-20">
			<u-swiper
				height="300"
				:list="list.swiper" 
				indicator-pos="topRight" 
				mode="number" 
				border-radius="0"
				@click="swiper_click"
				bg-color="transparent"
			></u-swiper>
		</view>
		<view class="search u-margin-bottom-20">
			<u-search shape="round" bg-color="#f8f8f8" height="60" :show-action="false" v-model="searchKw"
				@search="handlersearch">
			</u-search>
		</view>
		<view class="nav-wrapper boxShadow u-padding-l-r u-margin-bottom-20" v-if="list.navbar.length != 0">
			<view class="nav">
				<view class="item-nav" v-for="(ele, i) in list.navbar.slice(0, 5)" :key="i" @click="navTo(ele.url)">
					<image class="nav-icon" :src="ele.image" />
					<view class="nav-title">{{ele.name}}</view>
				</view>
			</view>

		</view>
		<view class="service-wrapper boxShadow u-padding-l-r u-margin-bottom-20"  v-if="list.online.phone || list.notice.length != 0">
			<view class="service" v-if="list.online.phone">
				<view class="service-top">
					<view class="item-avatar">
						<u-icon name="server-man" size="50" color="#666"></u-icon>
					</view>
					<view class="item-desc">
						<view class="title">欢迎光临本店</view>
						<view>欢迎点击右侧按钮立即致电店主</view>
					</view>
					<view class="item-func" @tap="makePhoneCall(list.online.phone)">
						<u-icon name="phone-fill" size="40" color="#007aff"></u-icon>
					</view>
				</view>
				<view class="service-bottom" v-if="list.notice.length != 0">
					<u-notice-bar type="primary" :list="list.notice" :moreIcon="false"></u-notice-bar>
				</view>
			</view>


		</view>
		<view class="product-wrapper" v-if="list.product.length != 0">
			<view class="wrapper-title">
				<view class="wrapper-left">
					<u-icon name="tags-fill" color="#ff007f" size="34"></u-icon>
					<view class="">热卖推荐</view>
				</view>
				<view class="wrapper-right" @click="navTo('/pages/prodList/prodList')">
					<view class="">更多</view>
					<u-icon name="arrow-right-double" size="30"></u-icon>
				</view>
			</view>
			<view class="wrapper-list">
				<view class="grid-card" v-for="(item, index) in list.product" :key="index" @click="navTo(item.url)">
					<view class="card-img-w">
						<view class="card-img">
							<u-image width="100%" height="100%" :src="item.image"></u-image>
						</view>
					</view>
					<view class="card-info">
						<view class="info-title">{{item.title}}</view>
						<view class="info-sub">{{item.info}}</view>
						<view class="info-price">
							<view class="price item price-red">
								<text class="cheap-price-dw">¥</text>
								<text class="price-big item">{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="news-wrapper u-margin-bottom-40" v-if="list.news.length != 0">
			<view class="wrapper-title">
				<view class="wrapper-left">
					<u-icon name="list-dot" color="#007aff" size="34"></u-icon>
					<view class="">热门资讯</view>
				</view>
				<view class="wrapper-right" @click="navTo('/pages/news/newsList')">
					<view class="">更多</view>
					<u-icon name="arrow-right-double" size="30"></u-icon>
				</view>

			</view>
			<view class="wrapper-news-list">
				<template v-for="(item, index) in list.news">
					<NewsCell :title="item.title" :image="item.image" :url="item.url" :posttime="item.ctime"></NewsCell>
				</template>
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
		NewsCell
	} from '@/components/NewsCell/NewsCell';
	import {
		CardProductCell
	} from '@/components/CardProductCell/CardProductCell';
	export default {
		name: "HomeCate4",
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
			NewsCell,
		},
		computed: {
			...mapState(['theme']),

		},
		onReady() {
			this.changeVoteTheme({
				themeColor: "#007aff",
				textColor: "#ffffff",
				bgColor: "#007aff",
			})
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#007aff",
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
				this.navTo('/pages/prodList/prodList?keywords=' + value);
			},
			swiper_click(index) {
				this.navTo(this.list.swiper[index].url);
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.news-wrapper {
		background-color: #fff;
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

	.search {
		position: relative;
		z-index: 20;
		margin: -60rpx 20rpx 0;
		background-color: #fff;
		padding: 14rpx 16rpx;
		border-radius: 6rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, .2);
	}

	.swiper {
		position: relative;
		z-index: 20;

	}

	.wrapper-news-list {
		padding: 0 20rpx;
	}

	.nav {
		background-color: #fff;
		border-radius: 8rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 0;

		.item-nav {
			flex: 0 0 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 14rpx 0;

			.nav-icon-wrapper {
				// width: 70rpx;
				// height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 16rpx;
			}

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

	.wrapper-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		height: 90rpx;
		border-bottom: 1rpx solid #f8f8f8;

		.wrapper-left {
			display: flex;
			color: #000;
			font-size: 30rpx;

			view {
				margin-left: 6rpx;
			}
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
		background-color: #fff;

		.wrapper-list {
			padding: 20rpx;
			display: flex;
			flex-wrap: wrap;
		}
	}

	.grid-card {
		margin-bottom: 20rpx;
		flex: 0 0 33.3%;
		width: 33.3%;
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
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
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
