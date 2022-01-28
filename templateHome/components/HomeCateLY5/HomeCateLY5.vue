<template>
	<view>
		<view class="head-box">
			<view class="navbar"></view>
			<view class="container">
				<view class="left">
					<view class="logo">
						<image :src="list.share.logo" mode="widthFix"></image>
					</view>
				</view>
				<view class="right" :style="'padding-right: ' + MPPR + 'px'">
					<view class="address-box">
						<text style="font-weight: 700; font-size: 28rpx;color: #fff;">{{list.share.company}}</text>
					</view>
					<view class="notice">
					</view>
				</view>
				
			</view>
		</view>
		<view class="search-box" :class="{'QZBG':GDHEAD}" :style="GDHEAD ? 'padding-right: ' + MPPR + 'px' : ''">
			<!-- <view class="navbar" ></view> -->
			<view class="search">
				<u-search shape="round" bg-color="#ffffff" height="60" color="#000" :show-action="false"
					v-model="searchKw" @search="handlersearch">
				</u-search>
			</view>
		</view>
	
		<view class="pick">
			<view class="title">热销榜</view>
			<scroll-view scroll-x="true" class="hot-sale-box">
				<view class="hot-sale-item"  v-for="(item, index) in list1" :key="index">
					<view class="goods-box" @click="navTo(item.url)"  >
						<image class="goods-img u-margin-bottom-10" :src="item.image" ></image>
						<view class="goods-name u-line-2 u-margin-bottom-10">{{item.title}}</view>
						<view class="goods-price"><text>¥</text>{{item.price}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="container margin-top sort-box">
			<view class="item-box">
				<view class="tit active" >
					<text>推荐</text>
				</view>
			</view>
		</view>
		<view class="product-list">
			<view class="product" v-for="(product, index) in list2" :key="index"  @click="navTo(product.url)"   >
				<image mode="widthFix" :src="product.image"></image>
				<view class="name u-line-1">{{product.title}}</view>
				<view class="info">
					<view class="price">{{product.price}}</view>
					<!-- <view class="slogan">{{product.slogan}}</view> -->
				</view>
			</view>
		</view>
		<!-- <view class="loading-text">{{loadingText}}</view> -->
		<!-- <view class="footzw"></view> -->
		
	</view>
	
</template>

<script>
	
	export default {
		name: "HomeCateLY5",
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		computed: {
			list1() {
				return this.list.product.slice(0, 4)
			},
			list2() {
				return this.list.product.slice(4)
			},
		},
		data() {
			return {
				MPPR: 0,
				GDHEAD: 0,
				
			}
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
		mounted() {
			
		},
		methods: {
			sortIndexS(e) {
				this.sortIndex = e
			},
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
	
page{
	background-color: #f8f8f8;
}
.b-b{
	position: relative;
}
 .b-b:after,
 .b-t:after {
 	position: absolute;
 	z-index: 3;
 	left: 0;
 	right: 0;
 	height: 0;
 	content: '';
 	transform: scaleY(.5);
 	border-bottom: 1px solid #E4E7ED;
 }
 
 .b-b:after {
 	bottom: 0;
 }
 .b-t:after {
 	top: 0;
 }
.container{
	margin: 0 15px;
}
.product-list{
		width: 100%;
		padding: 0 2.5% 2.5vw 2.5%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product{
			width: 48.75%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			image{
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name{
				width: 92%;
				padding: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info{
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;
				
				.price{
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan{
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
		
	}
	.loading-text{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
.pick{
	padding: 0 2.5vw 2.5vw 2.5vw;
	.title {
		font-size: 32rpx;
		color: #666;
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
				// justify-content: space-between;
				height: 100%;
			}
			.goods-img {
				width: 100%;
				height: 200rpx;
				border-radius: 8rpx;
			}
			.goods-name {
				font-size: 28rpx;
				color: #333333;
				min-height: 70rpx;
				
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
.margin-top{
	margin-top: 12px;
}
.head-box{
	padding: 14px 0;
	/* #ifdef MP */
	padding-top:2px;
	/* #endif */
	background: #0e4a89;
	position: relative;
	z-index: 3;
	.navbar{
		position: sticky;
		top: 0;
		height: var(--status-bar-height);
	}
	
	.container{
		display: flex;
		flex-direction: row;
		// justify-content: space-between;
		height: 32px;
		align-items: center;
		.left{
			.logo{
				width: 80rpx;
				height: 80rpx;
				
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
		}
		.right{
			display: flex;
			flex-direction: row;
			color: #333333;
			align-items: center;
			margin-left: 15rpx;
			
			.address-box{
				font-size: 14px;
				margin-right: 16px;
				display: flex;
				flex-direction: row;
				align-items: center;
				text{
					margin-left: 2px;
					margin-right: 4px;
				}
				.icon-right{
					position: relative;
					top: 2px;
				}
			}
			
			.notice{
				font-weight: bold;
				font-size: 18px;
			}
		}
		
	}
	
}
.search-box{
	position: sticky;
	top: 0;
	z-index: 2;
	background: #0e4a89;
	padding-top: var(--status-bar-height);
	margin-top: calc(var(--status-bar-height) * -1);
	.search {
		border-top-left-radius:50upx;
		border-top-right-radius:50upx;
		background: #f8f8f8;
		padding: 15px 15px 12px;
	}
}
.QZBG{
	background:#ffffff;
	box-shadow: 0 1px 6px #ccc;
	.navbar{
		height: var(--status-bar-height);
	}
	.ctn{
		background:#ffffff;
		/* #ifdef MP */
		padding-top:0px;
		/* #endif */
	}
}
.hot-box{
	
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	.item{
		margin-right: 12px;
		background-color: #EEEEEE;
		color: #666666;
		font-size: 12px;
		border-radius: 20px;
		padding: 2px 6px;
		margin-bottom: 8px;
	}
	.item:last-child{
		margin-right: 0;
	}
}
.bannerimg-box{
	border-bottom-left-radius:10upx;
	border-bottom-right-radius:10upx;
	padding: 24rpx;
	swiper{
		height: 233rpx;
		width: 699rpx;
	}
	.swiper-item {
		
		display: flex;
		justify-content: center;
		align-content: center;
		overflow: hidden;
		
		width: 100%;
		height: 100%;
		image {
			border-radius: 8px;
			width: 100%;
			
		}
	}
	
}

.menu-box{
	
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 12px;
	border-radius: 8px;
	background: #ffffff;
	padding: 12px 8px;
	.item-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 40px;
			height: 40px;
		}
		.tit{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			margin-top: 6px;
			color: #333333;
			padding: 2px 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.active{
			color: #ffffff;
			background-color: #999999;
			border-radius: 60px;
		}
	}
}
.sort-box{
	display: flex;
	flex-direction: row;
	margin-top: 24rpx;
	margin-bottom: 24rpx;
	.item-box{
		
		margin-right: 16px;
		.tit{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			color: #666;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.active{
			color: #666;
			font-weight: bold;
			font-size: 32rpx;
		}
	}
}
.store-box{
	margin-top: 20px;
	
	.item-box{
		display: flex;
		flex-direction: column;
		margin-bottom: 14px;
		padding-bottom: 18px;
		padding-top: 18px;
		background-color: #ffffff;
		.top-box{
			display: flex;
			flex-direction: row;
			.left{
				margin-right: 10px;
				
				
				image{
					width: 72px;
					height: 54px;
					border-radius: 6px;
				}
			}
			.right{
				flex: 1;
				.tit{
					font-size: 16px;
					font-weight: bold;
					color: #333333;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.justify-content{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}
				.row{
					font-size: 12px;
					color: #999999;
					margin-top: 4px;
					.row-left{
						display: flex;
						flex-direction: row;
						.t1,i{
							color: #ffca3e;
						}
						
					}
					.t2{
						margin-left: 12px;
					}
					.row-right{
						display: flex;
						flex-direction: row;
						i{
							margin-right: 4px;
						}
					}
					
				}
			}
		}
		.bottom-box{
			&-container{
				margin: 12px 0 0;
				padding-left: 82px;
				
				white-space: nowrap;
				.goods-box{
					width: 80px;
					margin-left: 12px;
					display: inline-block;
					.img-box{
						position: relative;
						width: 80px;
						height: 60px;
						background-color: #f1f1f1;
						border-radius: 4px;
						image{
							width: 100%;
							height: 60px;
						}
						.tag{
							position: absolute;
							bottom: 0;
							left: 0;
							background-color: #FF5722;
							color: #ffffff;
							padding: 2px 4px;
							font-size: 12px;
							border-radius: 4px;
						}
					}
					.tit{
						font-size: 14px;
						margin-top: 4px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.price-box{
						margin-top: 4px;
						.txt1{
							font-size: 10px;
							color: #FF5722;
						}
						.txt2{
							font-size: 16px;
							color: #FF5722;
						}
						.txt3{
							margin-left: 6px;
							font-size: 10px;
							color: #bbbbbb;
							text-decoration: line-through;
						}
					}
				}
				.goods-box:last-child{
					margin-right: 12px;
				}
				
			}
			
		}
	}
	.item-box:last-child{
		border-bottom: 0;
	}
}
.foot{
	position: relative;
	display: flex;
	justify-content: center;
	margin-top: 36px;
	margin-bottom: 50px;
	text{
		font-size: 14px;
		position: relative;
		z-index: 2;
		height: 20px;
		line-height: 20px;
		background-color: #f8f8f8;
		color: #cccccc;
		padding: 0 12px;
	}
}
.foot::before{
	content: "";
	z-index: 1;
	display: block;
	position: absolute;
	top: 50%;
	height: 0;
	width: 100%;
	transform: scaleY(0.5);
	border-bottom: 1px solid #E4E7ED;
}
.footzw{
	/* #ifdef H5*/
	height: 50px;
	/* #endif */
}

</style>
