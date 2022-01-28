<template>
	<view class="content">
		<view class="header">
			<view class="serch-wrapper acea-row row-middle">
				<view class="logo" v-if="list.share.logo">
					<image :src="list.share.logo" mode="heightFix"></image>
				</view>
				<view class="item">
					<u-search shape="round" bg-color="#f8f8f8" height="60" color="#000" :show-action="false"
						v-model="searchKw" @search="handlersearch">
					</u-search>
				</view>
				<view v-if="list.online.phone" style="width: 60rpx;height: 60rpx; margin-right: 30rpx;" @click="makePhoneCall(list.online.phone)">
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
					<view class="menu-txt">{{ item.name }}</view>
				</view>
			</block>
		</view>
		<view class='news acea-row row-between-wrapper' v-if="list.news.lenght > 0">
			<view class='pictrue'>
				<image src='https://wx3.y.netsun.com/Public/tpl/static/img/news.png'></image>
			</view>
			<view class='swiperTxt'>
				<swiper :indicator-dots="false" :autoplay="true" :interval="2500" :duration="500" :vertical="true"
				 circular="true">
					<block v-for="(item,index) in list.news" :key='index'>
						<swiper-item catchtouchmove='catchTouchMove'>
							<view class='acea-row row-between-wrapper' hover-class='none' @click="navTo(item.url)">
								<view class='text acea-row row-between-wrapper'>
									<view class='newsTitle line1'>{{item.title}}</view>
								</view>
								<view class='iconfont icon-xiangyou'></view>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="specialArea acea-row row-between-wrapper">
			<view class="assemble" hover-class="none">
				<image @click="navTo(list.images[0].url)" :src="list.images[0].image" mode="widthFix"></image>
			</view>
			<view class="list acea-row row-column-between">
				<view class="item">
					<image @click="navTo(list.images[1].url)" :src="list.images[1].image" mode="widthFix"></image>
				</view>
				<view class="item">
					<image @click="navTo(list.images[2].url)" :src="list.images[2].image" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<template v-if="list.images[3].image">
			<image @click="navTo(list.images[3].url)" :src="list.images[3].image" mode="widthFix"></image>
		</template>
		
		<view class="productList">
			<view class='list acea-row row-between-wrapper'>
				<view class='item' v-for="(item,index) in list.product" :key="index" @click="navTo(item.url)">
					<view class='pictrue'>
						<image :src="item.image"></image>
					</view>
					<view class='text'>
						<view class='name line1'>{{item.title}}</view>
						<view class='money font-color'>￥<text class='num'>{{item.price}}</text></view>
						<!-- <view class='vip acea-row row-between-wrapper'>
							<view>已售{{item.sales}}{{item.unit_name}}</view>
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
			}
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
			inCart() {
				this.$store.dispatch('addCart', this.list)
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
		height: 100%;
	}
	.content {
		height: 100%;
	}
	.header {
	    width: 100%;
	    height: 100rpx;
	    background: #fff;
		.serch-wrapper {
		    padding: 10rpx 0 0 32rpx;
			.logo {
				width: 80rpx;
				height: 80rpx;
				margin-right: 32rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.item {
				flex: 1
			}
			.input {
				height: 56rpx;
				padding: 0 0 0 30rpx;
				background: rgba(247, 247, 247, 1);
				border: 1px solid rgba(241, 241, 241, 1);
				color: #999;
				font-size: 28rpx;
				flex: 1;
				.iconfont {
					margin-right: 20rpx;
					color: #555555;
				}
				&.on {
					width: 70%;
				}
				&.fillet {
					border-radius: 29rpx;
				}
				&.row-center {
					padding: 0;
				}
			}
		}
		.acea-row.row-middle {
		    align-items: center;
		}
		.acea-row {
		    display: flex;
		    flex-wrap: wrap;
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
		background-color: #fff;
		padding-bottom: 30rpx;
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
	.acea-row.row-between-wrapper {
	    align-items: center;
	    justify-content: space-between;
	}
	.news {
		height: 77rpx;
		border-top: 1rpx solid #f4f4f4;
		padding: 0 30rpx;
		box-shadow: 0 10rpx 30rpx #f5f5f5;
		&.default {
			text-align: center;
			line-height: 77rpx;
		}
	}
	.news .pictrue {
		width: 124rpx;
		height: 28rpx;
		border-right: 1rpx solid #ddd;
		padding-right: 23rpx;
		box-sizing: content-box;
	}
	.news .pictrue image {
		width: 100%;
		height: 100%;
	}
	.news .swiperTxt {
		width: 523rpx;
		height: 100%;
		line-height: 77rpx;
		overflow: hidden;
	}
	.news .swiperTxt .text {
		width: 480rpx;
	}
	.news .swiperTxt .text .label {
		font-size: 20rpx;
		color: #ff4c48;
		width: 64rpx;
		height: 30rpx;
		border-radius: 40rpx;
		text-align: center;
		line-height: 28rpx;
		border: 2rpx solid #ff4947;
	}
	.news .swiperTxt .text .newsTitle {
		width: 397rpx;
		font-size: 24rpx;
		color: #666;
	}
	.news .swiperTxt .iconfont {
		font-size: 28rpx;
		color: #888;
	}
	.news .swiperTxt swiper {
		height: 100%;
	}
	.specialArea {
		padding: 30rpx;
	}
	.specialArea .assemble {
		width: 260rpx;
		height: 260rpx;
		position: relative;
	}
	.specialArea .assemble image {
		width: 100%;
		height: 100%;
		border-radius: 5rpx;
	}
	.specialArea .assemble .text {
		position: absolute;
		top: 37rpx;
		left: 22rpx;
	}
	.specialArea .name {
		font-size: 30rpx;
		color: #fff;
	}
	.specialArea .infor {
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.8);
		margin-top: 5rpx;
	}
	.specialArea .list {
		height: 260rpx;
		width: 416rpx;
	}
	.specialArea .item {
		width: 100%;
		height: 124rpx;
		position: relative;
	}
	.specialArea .item img {
		width: 100%;
		height: 100%;
	}
	.specialArea .item .text {
		position: absolute;
		top: 23rpx;
		left: 28rpx;
	}
	.specialArea .list {
		height: 260rpx;
		width: 416rpx;
	}
	.specialArea .item {
		width: 100%;
		height: 124rpx;
		position: relative;
	}
	.specialArea .item image {
		width: 100%;
		height: 100%;
	}
	.specialArea .item .text {
		position: absolute;
		top: 23rpx;
		left: 28rpx;
	}
	.slide-image {
		width: 100%;
	}
	.productList .list {
		padding: 0 30rpx;
	}
	.productList .list .item {
		width: 335rpx;
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		border:1rpx solid #eee;
	}
	.productList .list .item .pictrue {
		position: relative;
		width: 100%;
		height: 335rpx;
	}
	.productList .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx 20rpx 0 0;
	}
	.productList .list .item .text {
		padding: 20rpx 17rpx 26rpx 17rpx;
		font-size: 30rpx;
		color: #222;
	}
	.line1 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.productList .list .item .text .money {
		font-size: 26rpx;
		font-weight: bold;
		margin-top: 8rpx;
	}
	.font-color, .font-color-red {
	    color: #fc4141!important;
	}
	.productList .list .item .text .money .num {
		font-size: 34rpx;
	}
	.productList .list .item .text .vip {
		font-size: 22rpx;
		color: #aaa;
		margin-top: 7rpx;
	}
	.empty-img {
		width: 690rpx;
		height: 300rpx;
		border-radius: 14rpx;
		margin: 26rpx auto 0 auto;
		background-color: #ccc;
		text-align: center;
		line-height: 300rpx;
		.iconfont{
			font-size: 50rpx;
		}
	}
</style>

