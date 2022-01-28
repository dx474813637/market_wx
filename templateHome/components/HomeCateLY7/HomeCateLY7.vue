<template>
	<view class="content">
		<view class="swiper-background-box" :class="[show?'show':'']" >
			<block v-for="(item, index) in lists" :key="index">
				<view class="swiper-background" :style="[{backgroundImage:'url('+ item.background +')'}]"
				:class="index == indexs?'show':''"></view>
			</block>
		</view>
		<view class="head-search-box" :style="[{backgroundColor:'rgba(106, 110, 241,'+ headOpacity +')'}]">
			<view class="cu-bar search search-box">
				<view class="item">
					<u-search shape="round" bg-color="#f8f8f8" height="60" color="#000" :show-action="false"
						v-model="searchKw" @search="handlersearch">
					</u-search>
				</view>
				<view v-if="list.online.phone" style="width: 60rpx;height: 60rpx; margin-right: 30rpx;" @click="makePhoneCall(list.online.phone)">
					<image style="width: 100%;height: 100%;" src="https://wx3.y.netsun.com/Public/tpl/static/grid-icon/kefu.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="view-content">
			<view class="swiper-box">
				<swiper class="screen-swiper square-dot c" indicator-dots autoplay circular :current="indexs"
					:interval="3000" :duration="500" @change="swiperChange" indicator-color="rgba(255,255,255,0.6)"
						indicator-active-color="#fff">
					<block v-for="(item,index) in list.swiper" :key="index">
						<swiper-item>
							<view @click="navTo(item.url)" class="swiper-padding">
								<image :src="item.image" mode="">
								</image>
							</view>
						</swiper-item>
					</block>
				</swiper>
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
			
			<view class="actT" v-if="list.images[0].image">
				<image @click="navTo(list.images[0].url)" :src="list.images[0].image" mode="widthFix"></image>
			</view>
			<view class="actImg">
				<image class="actImgLeft" :src="list.images[1].image" mode="widthFix" @click="navTo(list.images[1].url)"></image>
				<image class="actImgRight" :src="list.images[2].image" mode="widthFix" @click="navTo(list.images[2].url)"></image>
			</view>
			<view class="actImg">
				<image class="actImgLeft" :src="list.images[3].image" mode="widthFix" @click="navTo(list.images[3].url)"></image>
				<image class="actImgRight" :src="list.images[4].image" mode="widthFix" @click="navTo(list.images[4].url)"></image>
			</view>
			
			<view class="act">
				<view class="actTitle">
					智慧生活
				</view>
				<scroll-view scroll-x="true" class="hot-sale-box">
					<view class="scrollItem">
						<image v-if="list.images[5].image" class="actImgLeft" :src="list.images[5].image" mode="widthFix" @click="navTo(list.images[5].url)"></image>
						<image v-if="list.images[6].image" class="actImgLeft" :src="list.images[6].image" mode="widthFix" @click="navTo(list.images[6].url)"></image>
						<image v-if="list.images[7].image" class="actImgLeft" :src="list.images[7].image" mode="widthFix" @click="navTo(list.images[7].url)"></image>
						<image v-if="list.images[8].image" class="actImgLeft" :src="list.images[8].image" mode="widthFix" @click="navTo(list.images[8].url)"></image>
					</view>
				</scroll-view>
			</view>
			
			<view class="act" style="margin: 30rpx;">
				<view class="actTitle">
					推荐商品
				</view>
				<view class="goodsList">
					<view class="flex">
						<view class="left" >
							<view class="itemLeft" v-for="(item, index) in list.product" v-if="(index + 1) % 2 != 0">
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
							<view class="itemRight" v-for="(item, index) in list.product" v-if="(index + 1) % 2 == 0">
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
		watch: {
			scrollY(st) {
				if(st <= 150) {
					let num = st / 150;
					this.headOpacity = num;
				} else if(st > 150) {
					this.headOpacity = 1;
				}
			}
		},
		data() {
			return {
				searchKw: "",
				indexs: 0,
				show: true,
				headOpacity: 0,
				welcome: true,
				lists: [
					{
						background: 'https://wx3.y.netsun.com/Public/tpl/static/swiper/swiper-background-1.png'
					},
					{
						background: 'https://wx3.y.netsun.com/Public/tpl/static/swiper/swiper-background-2.png'
					},
					{
						background: 'https://wx3.y.netsun.com/Public/tpl/static/swiper/swiper-background-3.png'
					},
				],
			};
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
		onPageScroll() {
			
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

<style lang="less" scoped>
	page {
		background-color: #f7f7f7;
		height: 100%;
		max-width: 750px;
		margin: auto;
	}
	.content {
		height: 100%;
		padding-top: 100rpx;
		.swiper-background-box {
			position: absolute;
			height: 348rpx;
			width: 100%;
			top: 0;
			display: none;
			transition: 0s;
			.swiper-background {
				position: absolute;
				height: 100%;
				width: 100%;
				max-width: 750px;
				opacity: 0;
				top: 0;
				background-size: cover;
				transition: opacity .25s;
			}
			.swiper-background.show {
				opacity: 1;
				transition: opacity .25s;
			}
		}
		.swiper-background-box.show {
			display: block;
			transition: 0s;
		}
		.swiper-background-box.welcome {
			top: calc(var(--status-bar-height) + 101rpx);
			transition: top .25s;
		}
	}
	
	.head-search-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 9999;
		background-color: rgba(229, 77, 66,0);
		padding-top: 0;
		transition: top .25s;
		// padding-bottom: 10rpx;
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
	.view-content {
	    width: 100%;
		.swiper-box {
		    width: 100%;
			.screen-swiper {
			    height: 230rpx;
			    min-height: 230rpx;
				.swiper-padding {
				    padding: 0 24rpx;
					image {
						width: 100%;
						height: 220rpx;
					}
				}
			}
		}
		.acea-row {
		    display: flex;
		    flex-wrap: wrap;
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
			height: 280rpx;
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
	
</style>

