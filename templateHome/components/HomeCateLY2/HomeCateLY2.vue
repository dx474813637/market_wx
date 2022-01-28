<template>
	<view class="content">
		<view class="header">
			<view class="serch-wrapper acea-row row-middle">
				<view class="logo">
					<image :src="list.share.logo" mode="heightFix"></image>
				</view>
				<view class="search">
					<u-search shape="round" bg-color="#f8f8f8" height="60" color="#000" :show-action="false"
						v-model="searchKw" @search="handlersearch">
					</u-search>
				</view>
			</view>
		</view>
		
		<view class='hotList' >
			<view class='hot-bg'>
				<view class='title acea-row row-between-wrapper'>
					<view class='text line1'>
						<text class='label'>热门榜单</text>
						根据销量、搜索、好评等综合得出
					</view>
					<view class='more' hover-class="none" @click="navTo('/pages/prodList/prodList')">
						更多
						<text class="iconfont icon-jiantou"></text>
					</view>
				</view>
			</view>
			<view class='list acea-row row-middle'>
				<block v-for="(item,index) in list1" :key='index'>
					<view class='item' @click="navTo(item.url)">
						<view class='pictrue'>
							<image :src='item.image'></image>
						</view>
						<view class='name u-line-2'>{{item.title}}</view>
						<view class='money font-color'>
							<text style="color: #fc4141;">￥</text>
							<text class='num'>{{item.price}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		
		<view class='wrapper'>
			<view class='title acea-row row-between-wrapper'>
				<view class='text'>
					<view class='name line1'>
						首发新品
						<text class='new font-color'>NEW~</text>
					</view>
					<view class='line1'>多个优质商品最新上架</view>
				</view>
				<view class='more'  @click="navTo('/pages/prodList/prodList')">
					更多
					<text class='iconfont icon-jiantou'></text>
				</view>
			</view>
			<view class='newProducts'>
				<scroll-view class="scroll-view_x" scroll-x style="width:auto;overflow:hidden;">
					<block v-for="(item,index) in list2" :key='index'>
						<view class='item' @click="navTo(item.url)">
							<view class='img-box'>
								<image :src='item.image'></image>
								<text class="pictrue_log_medium pictrue_log_class" v-if="item.activity && item.activity.type ==='1'">
									秒杀
								</text>
								<text class="pictrue_log_medium pictrue_log_class" v-if="item.activity && item.activity.type === '2'">
									砍价
								</text>
								<text class="pictrue_log_medium pictrue_log_class" v-if="item.activity && item.activity.type === '3'">
									拼团
								</text>
							</view>
							<view class='pro-info u-line-1'>{{item.title}}</view>
							<view class='money font-color'>￥{{item.price}}</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		
		<view class="product">
			<view class='title acea-row row-between-wrapper'>
				<view class='text'>
					<view class='name line1'>
						精品推荐
					</view>
					<view class='line1'>诚意推荐品质商品</view>
				</view>
				<view class='more'  @click="navTo('/pages/prodList/prodList')">
					更多
					<text class='iconfont icon-jiantou'></text>
				</view>
			</view>
			<view class='list acea-row row-between-wrapper' >
				<view class='item' v-for="(item,index) in list3" :key="index"  @click="navTo(item.url)">
					<view class='pictrue'>
						<image :src='item.image'></image>
					</view>
					<view class='text'>
						<view class='name u-line-1'>{{item.title}}</view>
						<view class='money font-color'>￥<text class='num'>{{item.price}}</text></view>
						
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: "HomeCateLY2",
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
			}
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#ff0000",
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			});
		},
		computed: {
			list1() {
				return this.list.product.slice(0, 3)
			},
			list2() {
				return this.list.product.slice(3, 6)
			},
			list3() {
				return this.list.product.slice(6)
			},
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
	}
</script>

<style lang="scss" scoped>
	.header {
	    width: 100%;
	    height: 100rpx;
	    background: #ff2e1e;
		.serch-wrapper {
		    padding: 10rpx 50rpx 0 32rpx;
			display: flex;
			align-items: center;
			.search {
				flex: 1;
			}
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
	.hotList .hot-bg {
		width: 100%;
		height: 215rpx;
		background-image: url('data:image/png;base64,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');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #fff;
	}
	
	.hotList .hot-bg .title {
		height: 87rpx;
	}
	
	.hotList .hot-bg .title .text {
		width: 575rpx;
	}
	
	.hotList .hot-bg .title .text .label {
		font-size: 30rpx;
		font-weight: bold;
		margin-right: 20rpx;
	}
	
	.hotList .hot-bg .title .more {
		font-size: 26rpx;
	}
	
	.hotList .hot-bg .title .more .iconfont {
		font-size: 25rpx;
		vertical-align: 2rpx;
		margin-left: 10rpx;
	}
	
	.hotList .list {
		width: 690rpx;
		height: 350rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin: -128rpx auto 0 auto;
		padding: 0 22rpx;
		box-sizing: border-box;
		box-shadow: 0 0 30rpx -10rpx #aaa;
	}
	
	.hotList .list .item {
		width: 200rpx;
	}
	
	.hotList .list .item~.item {
		margin-left: 22rpx;
	}
	
	.hotList .list .item .pictrue {
		width: 100%;
		height: 200rpx;
		position: relative;
	}
	
	.hotList .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	
	.hotList .list .item .pictrue .numPic {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		position: absolute;
		top: 7rpx;
		left: 7rpx;
	}
	
	.hotList .list .item .name {
		font-size: 26rpx;
		color: #282828;
		margin-top: 12rpx;
		min-height: 70rpx;
	}
	
	.hotList .list .item .money {
		font-size: 20rpx;
		font-weight: bold;
		margin-top: 4rpx;
	}
	
	.hotList .list .item .money .num {
		font-size: 28rpx;
		color:  #fc4141;
	}
	.empty-img {
		width: 100%;
		height: 375rpx;
		line-height: 375rpx;
		background: #ccc;
		font-size: 40rpx;
		color: #666;
		text-align: center;
	}
	.acea-row.row-middle {
	    align-items: center;
	}
	.acea-row.row-between-wrapper {
	    align-items: center;
	    justify-content: space-between;
	}
	.acea-row {
	    display: flex;
	    flex-wrap: wrap;
	} 
	.wrapper .newProducts {
		white-space: nowrap;
		padding: 0 30rpx;
		margin: 35rpx 0 42rpx 0;
	}
	
	.wrapper .newProducts .item {
		display: inline-block;
		width: 240rpx;
		margin-right: 20rpx;
		border: 1rpx solid #eee;
		border-radius: 20rpx;
	}
	.wrapper {
		.title {
		    border-top: 1rpx solid #eee;
		    padding-top: 34rpx;
		    margin: 0 30rpx;
			.text {
			    font-size: 24rpx;
			    color: #999;
				.name {
				    color: #282828;
				    font-size: 30rpx;
				    font-weight: bold;
				    margin-bottom: 4rpx;
				    position: relative;
					.new {
					    position: absolute;
					    top: 2rpx;
					    left: 130rpx;
					    font-size: 16rpx;
					    font-weight: bold;
					}
					.font-color, .font-color-red {
					    color: #fc4141!important;
					}
				}
				.line1 {
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
			}
		}
		.more {
		    font-size: 26rpx;
		    color: #333;
		}
	}
	.pictrue, .img-box {
		&:after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			border-radius: 20rpx 20rpx 0 0;
			background-color: rgba(90,90,90,.1);
		}
		image {
			z-index: 10;
		}
	}
	.product {
		.list{
		    padding: 0 30rpx;
			.item {
			    width: 332rpx;
			    margin-top: 20rpx;
			    background-color: #fff;
			    border-radius: 20rpx;
			    border: 0.5px solid #eee;
				.pictrue {
				    position: relative;
				    width: 100%;
				    height: 334rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 20rpx 20rpx 0 0;
					}
				}
				.text {
				    padding: 20rpx 18rpx 26rpx 18rpx;
				    font-size: 30rpx;
				    color: #222;
					.line1 {
					    overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					}
					.money {
					    font-size: 26rpx;
					    font-weight: bold;
					    margin-top: 8rpx;
						.num {
						    font-size: 34rpx;
						}
					}
					.vip {
					    font-size: 22rpx;
					    color: #aaa;
					    margin-top: 6rpx;
					}
				}
			}
		}
		.title {
		    border-top: 1rpx solid #eee;
		    padding-top: 34rpx;
		    margin: 0 30rpx;
			.text {
			    font-size: 24rpx;
			    color: #999;
				.name {
				    color: #282828;
				    font-size: 30rpx;
				    font-weight: bold;
				    margin-bottom: 4rpx;
				    position: relative;
					.new {
					    position: absolute;
					    top: 2rpx;
					    left: 130rpx;
					    font-size: 16rpx;
					    font-weight: bold;
					}
					.font-color, .font-color-red {
					    color: #fc4141!important;
					}
				}
				.line1 {
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
			}
		}
		.more {
		    font-size: 26rpx;
		    color: #333;
		}
	}
	.wrapper .newProducts .item:nth-last-child(1) {
		margin-right: 0;
	}
	
	.wrapper .newProducts .item .img-box {
		width: 100%;
		height: 240rpx;
		position: relative;
	}
	
	.wrapper .newProducts .item .img-box image {
		width: 100%;
		height: 100%;
		border-radius: 20rpx 20rpx 0 0;
	}
	
	.wrapper .newProducts .item .pro-info {
		font-size: 28rpx;
		color: #333;
		text-align: center;
		padding: 19rpx 10rpx 0 10rpx;
	}
	
	.wrapper .newProducts .item .money {
		padding: 0 10rpx 18rpx 10rpx;
		text-align: center;
		font-size: 26rpx;
		font-weight: bold;
	}
	.font-color, .font-color-red {
	    color: #fc4141!important;
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
	
	.productList .list .item .text .money {
		font-size: 26rpx;
		font-weight: bold;
		margin-top: 8rpx;
	}
	
	.productList .list .item .text .money .num {
		font-size: 34rpx;
	}
	
	.productList .list .item .text .vip {
		font-size: 22rpx;
		color: #aaa;
		margin-top: 7rpx;
	}
	
	.productList .list .item .text .vip .vip-money {
		font-size: 24rpx;
		color: #282828;
		font-weight: bold;
	}
	
	.productList .list .item .text .vip .vip-money image {
		width: 46rpx;
		height: 21rpx;
		margin-left: 4rpx;
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
