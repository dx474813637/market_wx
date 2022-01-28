<template>
	<view class="content">
		<view class="head-search-box" >
			<view class="cu-bar search search-box">
				<view class="item">
					<u-search shape="round" bg-color="#f8f8f8" height="60" color="#000" :show-action="false"
						v-model="searchKw" @search="handlersearch">
					</u-search>
				</view>
				<view @click="makePhoneCall(list.online.phone)" style="width: 60rpx;height: 60rpx; margin-right: 30rpx;">
					<image style="width: 100%;height: 100%;" src="https://wx3.y.netsun.com/Public/tpl/static/grid-icon/kufu01.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="swiperBg">
			<block >
				<view class="swiper square" v-if="list.swiper.length">
					<swiper style="height: 376rpx;" indicator-dots="true" :autoplay="true" :circular="true"
						:interval="3000" :duration="500" indicator-color="rgba(255,255,255,0.6)"
						indicator-active-color="#fff">
						<block v-for="(item,index) in list.swiper" :key="index">
							<swiper-item>
								<view @click="navTo(item.url)" class='slide-navigator acea-row row-between-wrapper'>
									<image :src="item.image" class="slide-image" style="height: 376rpx;">
									</image>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</block>
		</view>
		
		<view class="nav acea-row acea-row">
			<block v-for="(item,index) in list.navbar" :key="index">
				<view class="item" @click="navTo(item.url)">
					<view class="pictrue">
						<image :src="item.image"></image>
					</view>
					<view class="menu-txt">{{item.name}}</view>
				</view>
			</block>
		</view>
		
		<view class="fixed-container">
			<view class="fixed-head1">
				<view class="fixed-head-left">
					<text class="fixed-main-title">时尚好物 新品专区</text>
				</view>
			</view>
			<view class="fixed-list">
				<view class="fixed-product2" v-for="(item, index) in list.product.slice(0,2)" :key="index" @click="navTo(item.url)">
					<image class="fixed-image2" :src="item.image" mode=""></image>
					<view class="fixed-title">
						{{ item.title }}
					</view>
					<view class="fixed-subtitle">
						点击查看
					</view>
				</view>
			</view>
		</view>
		
		<view class="act" style="margin: 30rpx;">
			<view class="actTitle">
				推荐商品
			</view>
			<view class="goodsList">
				<view class="flex">
					<view class="left" >
						<view class="itemLeft" v-for="(item, index) in list.product.slice(2)" v-if="(index + 1) % 2 != 0" @click="navTo(item.url)">
							<view class="goods-img">
								<image :src="item.image" mode="widthFix"></image>
							</view>
							<view class="padding-xs">
								<view class="text-black">
									{{ item.title }}
								</view>
								<view class="priceS">
									<span style="font-size: 26rpx;">￥</span>
									<span>{{ item.price }}</span>
								</view>
							</view>
						</view>
					</view>
					<view class="right" >
						<view class="itemRight" v-for="(item, index) in list.product.slice(2)" v-if="(index + 1) % 2 == 0" @click="navTo(item.url)">
							<view class="goods-img">
								<image :src="item.image" mode="widthFix"></image>
							</view>
							<view class="padding-xs">
								<view class="text-black">
									{{ item.title }}
								</view>
								<view class="priceS">
									<span style="font-size: 26rpx;">￥</span>
									<span>{{ item.price }}</span>
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
				indexs: 0,
				show: true,
				headOpacity: 0,
				welcome: true,
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
					phoneNumber: phone+""
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
			}
		},
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
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
					padding: 0 20rpx;
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
		.swiperBg {
			position: relative;
			.colorBg {
				position: absolute;
				left: 0;
				top: 0;
				height: 130rpx;
				width: 100%;
			}
			.swiper {
				z-index: 20;
				position: relative;
				// margin: -130rpx auto 0 auto;
				overflow: hidden;
				// image {
				//   width: 100%;
				//   height: auto;
				//   display: block;
				// }
				&.fillet {
					border-radius: 10rpx;
					image {
						border-radius: 10rpx;
					}
				}
				swiper,
				.swiper-item,
				image {
					width: 100%;
					display: block;
				}
				&.circular {
					/deep/.uni-swiper-dot {
						width: 10rpx !important;
						height: 10rpx !important;
						background: rgba(0, 0, 0, .4) !important
					}
					/deep/.uni-swiper-dot-active {
						background: #fff !important
					}
				}
				&.square {
					/deep/.uni-swiper-dot {
						width: 20rpx !important;
						height: 5rpx !important;
						border-radius: 3rpx;
						background: rgba(0, 0, 0, .4) !important
					}
					/deep/.uni-swiper-dot-active {
						background: #fff !important
					}
				}
			}
		}
		.acea-row {
		    display: flex;
		    flex-wrap: wrap;
		}
		.nav {
			padding: 0 22rpx 30rpx 22rpx;
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
		.fixed-container {
			margin: 22rpx 32rpx;
			.fixed-head1 {
				display: flex;
				justify-content: space-between;
				align-content: center;
				.fixed-head-left {
					align-items: center;
					.fixed-main-title {
					    font-weight: bold;
						color: #333;
						font-size: 18px;
						height: 44px;
						line-height: 44px;
					}
				}
			}
			.fixed-head2 {
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: flex-end;
				.fixed-head-left {
					align-items: center;
					.fixed-main-title {
					    color: #8D8D8D;
					    font-size: 28rpx;
					}
				}
				.fixed-head-right {
					align-items: center;
					.fixed-link {
					    color: #8D8D8D;
					    font-size: 28rpx;
					    margin-right: 14rpx;
					}
				}
			}
			.fixed-list {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top: 26rpx;
				.fixed-product2 {
				    width: 332rpx;
				    flex-direction: column;
				    border-radius: 8rpx;
				    background-color: #fff;
					.fixed-image2 {
					    border-top-left-radius: 8rpx;
					    border-top-right-radius: 8rpx;
					    width: 332rpx;
					    height: 188rpx;
					    margin-bottom: 8rpx;
						
					}
					.fixed-title {
					    color: #1A1A1A;
					    font-size: 28rpx;
					    margin: 10rpx 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						color: #333;
					}
					.fixed-subtitle {
					    color: #8d8d8d;
					    font-size: 22rpx;
					    margin-left: 18rpx;
					    margin-bottom: 18rpx;
					}
				}
			}
		}
		.actT {
			width: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.actImg {
			width: 100%;
			margin: 10rpx 30rpx;
			.actImgLeft {
				width: 45%;
			}
			.actImgRight{
				width: 45%;
				margin-left: 15rpx;
			}
		}
		.act {
			margin: 30rpx 0rpx 0 30rpx;
			.actTitle {
				font-weight: bold;
				color: #333;
				font-size: 34rpx;
				height: 80rpx;
				line-height: 80rpx;
			}
			.hot-sale-box {
				height: 210rpx;
				box-sizing: border-box;
				white-space: nowrap;
				.scrollItem {
					image {
						margin: 0 10rpx;
						border-radius: 10px;
					}
					image:last-child {
						margin-right: 50rpx;
					}
				}
				
			}
			.goodsList {
				width: 100%;
				.flex {
					display: flex;
					flex-wrap: wrap;
					.left {
						
						margin-bottom: 22rpx;
						margin-right: 2%;
						box-sizing: border-box;
						flex-basis: 48%;
						.itemLeft {
							border-radius: 10px;
							background-color: #ffffff;
							color: #666666;
							margin-bottom: 20rpx;
							.goods-img {
								width: 100%;
								box-sizing: border-box;
								image {
									width: 100%;
									border-radius: 20rpx 20rpx 0 0;
								}
							}
							.padding-xs {
								padding: 10rpx;
								.text-black {
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;
									color: #333;
									font-size: 28rpx;
								}
								.priceS {
									margin: 10rpx 0;
									box-sizing: border-box;
									color: #e54d42;
									font-size: 36rpx;
								}
							}
						}
					}
					.right {
						
						margin-bottom: 22rpx;
						margin-left: 2%;
						box-sizing: border-box;
						flex-basis: 48%;
						.itemRight {
							border-radius: 10px;
							background-color: #ffffff;
							color: #666666;
							margin-bottom: 20rpx;
							.goods-img {
								width: 100%;
								box-sizing: border-box;
								image {
									width: 100%;
									border-radius: 20rpx 20rpx 0 0;
								}
							}
							.padding-xs {
								padding: 10rpx;
								.text-black {
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;
									color: #333;
									font-size: 28rpx;
								}
								.priceS {
									margin: 10rpx 0;
									box-sizing: border-box;
									color: #e54d42;
									font-size: 36rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
