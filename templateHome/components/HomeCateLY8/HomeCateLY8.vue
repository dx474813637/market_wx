<template>
	<view class="content">
		<view class="head-search-box">
			<view class="cu-bar search search-box">
				<view class="item">
					<u-search shape="round" bg-color="#f8f8f8" height="60" color="#000" :show-action="false"
						v-model="searchKw" @search="handlersearch">
					</u-search>
				</view>
				<view v-if="list.online.phone" @click="makePhoneCall(list.online.phone)" style="width: 60rpx;height: 60rpx; margin-right: 30rpx;">
					<image style="width: 100%;height: 100%;"
						src="https://wx3.y.netsun.com/Public/tpl/static/grid-icon/kufu01.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="swiper" v-if="list.swiper.length > 0">
			<view class="swiper-box">
				<swiper class="screen-swiper square-dot c" indicator-dots autoplay circular :current="indexs"
					:interval="3000" :duration="500" @change="swiperChange" indicator-color="rgba(255,255,255,0.6)"
					indicator-active-color="#fff">
					<block v-for="(item,index) in list.swiper" :key="index">
						<swiper-item>
							<view @click="navTo(item.url)" class="swiper-padding">
								<image :src="item.image" mode="widthFix">
								</image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>

		<view class="nav acea-row acea-row">
			<block v-for="(item,index) in list.navbar" :key="index">
				<view class="item" @click="navTo(item.url)">
					<view class="pictrue">
						<image :src="item.image"></image>
					</view>
					<view class="menu-txt">{{ item.name }}</view>
				</view>
			</block>
		</view>

		<view class="banner" v-if="list.images[0].image">
			<image @click="navTo(list.images[0].url)" :src="list.images[0].image" mode="widthFix"></image>
		</view>

		<view class="promotion">
			<view class="proTitle">
				商品推荐
			</view>
			<view class="promotionList">
				<view class="listItem" v-for="(item, index) in list.product.slice(0,2)" :key="index" @click="navTo(item.url)">
					<view class="itemTop">
						<view class="itemTitle">
							{{ item.title }}
						</view>
					</view>
					<view class="itemLeft">
						<view class="infoPrice">
							<span style="font-size: 26rpx;">￥</span>
							<span>{{ item.price }}</span>
						</view>
						<view class="into">
							点击查看
						</view>
					</view>
					<view class="itemRight">
						<image :src="item.image"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="goods-list">
			<navigator url="/pages/prodList/prodList" class="listTitle">
				更多商品
			</navigator>
			<view class="product-list">
				<view class="product" v-for="(item, index) in list.product.slice(3)" :key="index">
					<image :src="item.image" mode=""></image>
					<view class="productTitle">
						{{ item.title }}
					</view>
					<view class="info">
						<view class="infoPrice">
							<span style="font-size: 26rpx;">￥</span>
							<span>{{ item.price }}</span>
						</view>
						<!-- <view class="slogan">
							1235人付款
						</view> -->
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
	export default {
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
				searchKw: "",
				
			};
		},
		components: {

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
		},
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
		height: 100%;
		max-width: 750px;
		margin: auto;
	}

	.content {
		height: 100%;
		padding-top: 100rpx;

		.head-search-box {
			position: fixed;
			width: 100%;
			top: 0;
			z-index: 9999;
			background-color: #fff;
			// padding-top: var(--status-bar-height);
			transition: top .25s;

			.search-box {
				position: relative;
			}

			.cu-bar {
				display: flex;
				position: relative;
				align-items: center;
				min-height: 100rpx;

				// justify-content: space-between;
				.item {
					flex: 1;
					padding: 0 30rpx;
				}

				.search-form {
					background-color: #f5f5f5;
					line-height: 64rpx;
					height: 64rpx;
					font-size: 24rpx;
					color: #333333;
					flex: 1;
					display: flex;
					align-items: center;
					margin: 0 30rpx;

					.iconfont {
						margin: 0 12rpx 0 20rpx;
						font-size: 26rpx;
					}
				}

				.round {
					border-radius: 2760rpx;
				}
			}
		}

		.swiper {
			margin-top: 10rpx;
			width: 100%;
			display: flex;
			justify-content: center;

			.swiper-box {
				width: 92%;
				height: 30.7vw;
				box-shadow: 0rpx 8rpx 26rpx rgba(0, 0, 0, 0.2);
				border-radius: 16rpx;

				.screen-swiper {
					height: 100%;

					.swiper-padding {
						image {
							width: 100%;
							height: 100%;
							border-radius: 16rpx;

						}
					}
				}
			}
		}

		.acea-row {
			display: flex;
			flex-wrap: wrap;
			border-bottom: solid 1px #f6f6f6;
		}

		.nav {
			padding-bottom: 30rpx;
			margin-top: 20rpx;

			.item {
				margin-top: 30rpx;
				width: 25%;
				text-align: center;
				font-size: 24rpx;

				.pictrue {
					width: 82rpx;
					height: 82rpx;
					margin: 0 auto;

					&.default {
						background-color: #ccc;
						border-radius: 50%;
						text-align: center;
						line-height: 90rpx;

						.iconfont {
							font-size: 40rpx;
						}
					}

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.menu-txt {
					margin-top: 15rpx;
				}

				&.four {
					width: 25%;

					.pictrue {
						width: 90rpx;
						height: 90rpx;
					}
				}
			}
		}

		.banner {
			margin: 40rpx 4%;

			image {
				width: 100%;
				height: 20vw;
				border-radius: 10vw;
				box-shadow: 0px 4rpx 26rpx rgba(0, 0, 0, 0.3);
			}
		}

		.promotion {
			margin: 0 4%;

			.proTitle {
				width: 100%;
				height: 66rpx;
				line-height: 66rpx;
				font-size: 34rpx;
				font-weight: 600;
				margin-top: -10rpx;
			}

			.promotionList {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.listItem {
					width: 48%;
					padding: 16rpx 3%;
					background-color: #ebf9f9;
					border-radius: 10rpx;
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					.itemTop {
						width: 100%;
						height: 44rpx;
						margin-bottom: 4rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;

						.itemTitle {
							font-size: 32rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.itemLeft {
						width: 50%;
						height: 18.86vw;
						display: flex;
						flex-wrap: wrap;
						align-content: space-between;

						.infoPrice {
							color: #e65339;
							font-size: 32rpx;
							font-weight: 600;
						}

						.ad {
							margin-top: 4rpx;
							width: 100%;
							font-size: 24rpx;
							color: #acb0b0;
						}

						.into {
							width: 100%;
							font-size: 26rpx;
							color: #aaa;
							margin-bottom: 4rpx;
						}
					}

					.itemRight {
						width: 18.86vw;
						height: 18.86vw;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.goods-list {
			.listTitle {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 88rpx;
				line-height: 88rpx;
				color: #f47825;
				font-size: 32rpx;
				margin-top: 10rpx;
			}

			.product-list {
				// width: 92%;
				padding: 0 4% 3vw 4%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.product {
					width: 48%;
					border-radius: 22rpx;
					background-color: #fff;
					margin: 0 0 16rpx 0;
					box-shadow: 0px 4rpx 26rpx rgba(0, 0, 0, 0.1);

					image {
						width: 100%;
						border-radius: 22rpx 22rpx 0 0;
					}

					.productTitle {
						width: 92%;
						padding: 0 4%;
						margin: 10rpx 0;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						font-size: 32rpx;
					}

					.info {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						width: 92%;
						padding: 10rpx 4% 10rpx 4%;
						margin-bottom: 15rpx;

						.infoPrice {
							color: #e65339;
							font-size: 32rpx;
							font-weight: 600;
						}

						.slogan {
							color: #807c87;
							font-size: 26rpx;
						}

					}
				}
			}
		}
	}
</style>
