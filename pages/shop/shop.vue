<template>
	<view>
		<view class="shop-header">
			<view class="shop-h-top u-flex u-row-between">
				<view class="item u-flex u-m-b-12">
					<u-icon name="dianpu" custom-prefix="custom-icon"></u-icon>
					<view class="u-m-l-10 u-font-30">{{shop.list.name}}</view>
					<text class="ziying" v-if="shop.list.ziying == 1">自营</text>
				</view>
			</view>
			<view class="shop-h-main">
				<view >
					<u-parse :html="`${shop.list.intro}`"></u-parse>
				</view>
			</view>
		</view>
		<view class="main u-p-20">
			<view class="list bg-w u-flex u-flex-wrap" v-if="type == 1">
				<view class="item" v-for="item in shop.product" :key="item.id" @click="handlePathDetail(item)">
					<CardProductGrid :list="item"></CardProductGrid>
				</view>
			</view>
			<view class="list bg-w style2" v-else>
				<view class="item u-flex u-row-between u-border-bottom u-p-20" v-for="item in shop.product" :key="item.id" @click="handlePathDetail(item)">
					<view class="item-left">
						<view class="good-title">{{item.name}}</view>
						<view class="good-bottom u-flex">
							<view style="color: red;">
								<text>¥</text>
								<text class="price u-p-l-6">{{item.price}}</text>
							</view>
							<view class="u-font-24 u-p-l-10">元/吨</view>
						</view>
					</view>
					<view class="item-right">
						<view  @click.stop="inCart(item)">
							<u-icon name="shopping-cart" color="#f00" size="36"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" margin-top="40" />
		</view>
		<nav-bar :tabbar="true"></nav-bar>
	</view>
</template>

<script>
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				shop: {
					list: {},
					product: []
				},
				id: '',
				type: 1,
				loadStatus: 'loadmore',
				p: 1,
				endFlag: false,
			};
		},
		onReachBottom() {
			this.getNextData()
		},
		async onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id;
			}else {
				uni.showToast({
					title: '参数有误',
					icon: 'none'
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}, 1500)
				
				return
			}
			uni.showLoading()
			await this.getData()
		},
		methods: {
			getNextData() {
				if (this.endFlag || this.loadStatus == 'nomore') return
				this.p = this.p + 1
				this.getData()
			},
			async getData() {
				this.endFlag = true
				this.loadStatus = 'loading'
				let res = await this.$http.get('/Market/api.html?api_url_xcx=shop', {
					params: {
						id: this.id,
						p: this.p
					},
				})
				uni.hideLoading()
				this.endFlag = false
				if(res.data.code == 1) {
					if(this.p == 1) {
						this.shop = res.data
					}else {
						this.shop.product = [...this.shop.product, ...res.data.product]
					}
					
					this.share_title = res.data.share_title
					this.share_img = res.data.share_img
					uni.setNavigationBarTitle({
						title: this.shop.list.name
					});
					if(res.data.totalPages == this.p) {
						this.loadStatus = 'nomore'
					}else {
						this.loadStatus = 'loadmore'
					}
				}
				
			},
			handlePathDetail(obj) {
				uni.navigateTo({
					url: `/pages/prodDetail/prodDetail?id=${obj.id}`,
				})
			},
			async inCart(obj) {
				uni.showLoading()
				let res = await this.$http.get('/Market/api.html?api_url_xcx=productDetail_json', {
					params: {
						id: obj.id
					}
				})
				
				if(res.data.code == 1) {
					this.$store.dispatch('addCart', res.data.list)
				}
			},
		}
	}
</script>
<style>
	page {
		background-color: #f8f8f8;
	}
</style>
<style lang="scss" scoped>
	.shop-header {
		color: #999;
		padding: 10px;
		background-image: url('../../static/img/sd_bg.jpg');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		.shop-h-top {
			.item {
				color: #fff;
				font-weight: bold;
				.ziying {
					background-color: red;
					color: #fff;
					padding: 0px 6px;
					border-radius: 3px;
					font-size: 24rpx;
					margin-left: 4px;
				}
			}
		}
		.shop-h-main {    
			height: 20px;
			line-height: 20px;
			overflow: hidden;
		}
	}

	.bg-w{
		background-color: #fff;
	}
	.list {
		
		padding: 10rpx 15rpx 15rpx;
		&.bg-w{
			border-radius: 5px;
		}
		&.style2 {
			.item {
				width: 100%;
			}
		}
		.item {
			flex: 0 0 49%;
			width: 49%;
			margin-right: 2%;
			&:nth-of-type(2n) {
				margin-right: 0;
			}
			&:last-child:after {
				border-bottom: 0!important;
			}
		}
		.grid-card {
			margin-bottom: 20rpx;
			width: 100%;
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
	
	
	}
	.in-cart-btn {
		margin-left: 10rpx;
		height: 45rpx;
		background-color: red;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 45rpx;
		color: #fff;
		border-radius: 50%;
	}
	.good-title {
		font-size: 32rpx;
		line-height: 25px;
	}
	.good-bottom {
		.price {
			font-size: 30rpx;
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
			font-size: 1rem;
		.price-yj {
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
