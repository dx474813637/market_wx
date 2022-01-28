<template>
	<view class="w">
		
		<u-popup v-model="show" mode="center" width="90%" closeable close-icon-color="#fff" border-radius="20">
			
			<u-swiper
				:list="list" 
				height="1000" 
				img-mode="aspectFit"
				mode="number"
				:autoplay="false"
				:current="curIndex"
				bg-color="#111"
			></u-swiper>
			
		</u-popup>
		<view class="tabbar-w safe-area-inset-bottom" v-if="sh == 0">
			<view class="tabbar">
				<navigator :url="`/pages/shop/shop?id=${cpy.id}`" class="tabbar-item tab-icon-btn">
					<div class="item-icon"><u-icon name="dianpu" custom-prefix="custom-icon"></u-icon></div>
					<div class="item-icon">旺铺</div>
				</navigator>
				<view class="tabbar-item tab-icon-btn" @click="handleFollow">
					<div class="item-icon">
						<template v-if="isFollow">
							<u-icon name="shoucang" color="#ffb100" custom-prefix="custom-icon"></u-icon>
						</template>
						<template v-else>
							<u-icon name="shoucang1" custom-prefix="custom-icon"></u-icon>
						</template>
						
					</div>
					<div class="item-icon">收藏</div>
				</view>
				<view class="tabbar-item tab-icon-btn" v-if="info.talk_price == 1" @click="showWX">
					<div class="item-icon"><u-icon name="dianhua" custom-prefix="custom-icon"></u-icon></div>
					<div class="item-icon">议价</div>
				</view>
				<navigator url="/pages/cart/cart" class="tabbar-item tab-icon-btn">
					<div class="item-icon"><u-badge type="error" :count="count" :offset="[-5, -10]" size="mini"></u-badge><u-icon name="cart" custom-prefix="custom-icon"></u-icon></div>
					<div class="item-icon">购物车</div>
				</navigator>
				<view class="tabbar-item tab-btn buy-btn">
					<u-button type="error" shape="circle" @click="inCart"><u-icon name="shopping-cart-fill" color="#fff"></u-icon><text class="btn-text">加入购物车</text></u-button>
				</view>
			</view>
			
		</view>
		<view class="swiper">
			<u-swiper
				:list="list" 
				height="500" 
				img-mode="aspectFit"
				mode="number"
				border-radius="0"
				interval="5000"
				indicator-pos="bottomRight"
				@click="handleChangeShow"
				bg-color="#fff"
			></u-swiper>
		</view>
		<view class="prod-info">
			<view class="info-card">
				<view class="info-row info-price">
					<text class="price-dw">¥</text>
					<text class="price">{{info.price}}</text>
					<text class="price-dw">元{{info.unit ? '/'+info.unit :""}}</text>
					<view class="discount-right">
						<navigator url="/pages/discount/shopCoupon" class="discount-btn">旺铺优惠劵<u-icon name="arrow-right"></u-icon></navigator>
					</view>
				</view>
				<view class="info-row info-title">
					<text class="title">{{info.name}}</text>
				</view>
				<!-- 行业分类 -->
				<view class="info-row info-cgy">
					{{info.send_regional}}
				</view>
			</view>
		</view>
		<view class="prod-info">
			<view class="info-card">
				<view class="info-row single-info">
					<view class="info-label label-w-2">品牌</view>
					<view class="info-value">{{info.brand}}</view>
				</view>
				<view class="info-row single-info">
					<view class="info-label">规格型号</view>
					<view class="info-value">{{info.model}}</view>
				</view>
				<view class="info-row single-info">
					<view class="info-label label-w-2">库存</view>
					<view class="info-value">{{info.stock}}{{info.unit}}</view>
				</view>
				<view class="info-row single-info">
					<view class="info-label label-w-3">生产商</view>
					<view class="info-value">{{info.producer}}</view>
				</view>
				<view class="info-row single-info">
					<view class="info-label label-w-2">产地</view>
					<view class="info-value">{{info.send_regional}}</view>
				</view>
			</view>
		</view>
		<view class="prod-info">
			<view class="info-card">
				<view class="info-card-header">
					<view class="header-title">产品介绍</view>
				</view>
				<view class="info-card-content">
					<u-parse :html="`${info.intro}`"></u-parse>
				</view>
			</view>
		</view>
		<view class="safe-area-inset-bottom"></view>
		<u-popup v-model="wxShow" mode="top" safe-area-inset-bottom>
			<view class="card-wrapper">
				<card-seller :list="sellerInfo"></card-seller>
			</view>
		</u-popup>
		<!-- <view class="video-w safe-area-inset-bottom" v-if="live_src"> -->
			<movable-area 
				class="video-w safe-area-inset-bottom" 
				v-if="live_src"
				:style="{
					'width': vWidth + 'rpx',
					'height': movableH + 'px',
				}" 
				scale-area
			>
				<movable-view
					class="video" 
					:style="{
						'width': vWidth + 'rpx',
						'height': vHeight + 'rpx',
						'pointer-events': 'auto'
					}" 
					@click="gotoLive"
					direction="vertical"
					inertia
					:y="movableH*2 - vHeight + 'rpx'"
					out-of-bounds
					friction="4"
				>
					<video 
						id="myVideo" 
						:src="live_src"
						@error="videoErrorCallback" 
						:controls="false" 
						autoplay 
						poster="" 
						style="width: 100%;height: 100%;"
						object-fit="fill" 
						@loadedmetadata="handleGetmeadata" 
						:enable-progress-gesture="false"
					></video>
					<view class="video-label">
						<u-icon name="quanping" custom-prefix="custom-icon"></u-icon>
					</view>
				</movable-view>
			</movable-area>
			
			
		<!-- </view> -->
	</view>
</template>

<script>
	import mixShareInfo from '@/utils/mixShareInfo.js'
	import CardSeller from '@/components/CardSeller/CardSeller'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				show: false,
				wxShow: false,
				curIndex: 0,
				list: [],
				roomid: undefined,
				live_src: '',
				vWidth: 200,
				vHeight: 300,
				movableH: 0,
				id: '',
				info: {},
				sellerInfo: {},
				isFollow: false,
				followList: [],
				shareOptions: {
					pageName: '产品'
				},
				sh: 1,
				cpy: {}
				
			}
		},
		components: {
			CardSeller
		},
		computed: {
			count() {
				return this.$store.state.cartCount
			}
		},
		async onLoad(options) {
			let sysInfo = uni.getSystemInfoSync()
			this.movableH = sysInfo.safeArea.height - sysInfo.safeAreaInsets.top + sysInfo.safeAreaInsets.bottom - 20
			if (options.hasOwnProperty('live')) {
				this.live_src = options.live
			}
			if (options.hasOwnProperty('id')) {
				this.id = options.id
				await this.getData()
				this.addHistory()
			}else {
				uni.navigateBack({
					delta: 1
				})
				return
			}
			this.followList = uni.getStorageSync('followList') || []
			if(this.followList.length > 0 && this.followList.some(ele => ele.id == this.info.id)) {
				this.isFollow = true
			}
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			handleFollow() {
				this.isFollow = !this.isFollow
				if(this.isFollow) {
					this.followList.unshift({
						id: this.info.id,
						pic1: this.info.pic1,
						name: this.info.name,
						brand: this.info.brand,
						model: this.info.model,
						price: this.info.price,
						stock: this.info.stock,
						unit: this.info.unit
					})
					uni.showToast({
						title: '收藏成功'
					})
				}else {
					this.followList.some((ele, index) => {
						if(ele.id == this.info.id) {
							this.followList.splice(index, 1)
							return true
						}
					})
					uni.showToast({
						title: '取消收藏',
						icon: 'none'
					})
				}
				uni.setStorageSync('followList', this.followList)
			},
			// check() {
			// 	if(!uni.getStorageSync('login')) {
			// 		uni.navigateTo({
			// 			url: '/pages/login/index'
			// 		})
			// 		return false
			// 	}else {
			// 		return true
			// 	}
			// },
			addHistory() {
				if(!this.$store.state.history.some(ele => ele.id == this.id)) {
					this.$store.commit('addHistory', {id: this.id, image: this.list[0].image})
				}
			},
			inCart() {
				this.$store.dispatch('addCart', this.info)
				
			},
			handleChangeShow(index) {
				this.show = true;
				this.curIndex = index
			},
			async getData() {
				let res = await this.$http.get('/Market/api.html?api_url_xcx=goods', {params: {id: this.id}})
				let obj = res.data.list
				const imgArr = Object.keys(obj).filter(ele => ele.includes('pic') && !isNaN(ele.slice(3)))
				this.shareOptions.pageName = res.data.share_title
				this.list = imgArr.map(ele => {
					return {
						image: obj[ele]
					}
				})
				this.cpy = res.data.company
				this.info = obj
				this.share_title = res.data.share_title
				this.share_img = res.data.share_img
				this.sellerInfo = res.data.sell_cards
				this.sh = res.data.sh || 0
				
			},
			showWX() {
				this.wxShow = true
			},
			handleGetmeadata(e) {
				console.log(e)
				let w = e.detail.width
				let h = e.detail.height
				if(w > h) {
					this.vWidth = 300
				}else {
					this.vWidth = 200
				}
				this.vHeight = Math.ceil((h / w) * this.vWidth)
			},
			videoErrorCallback(e) {
				console.log(e)
				if (e.detail.errMsg) {
					this.videoContext.stop()
				}
			},
			gotoLive() {
				let res = getCurrentPages()
				if(res.length == 1) {
					uni.navigateTo({
						url: `/pages/live/live?roomid=${this.roomid}`
					})
				}else {
					uni.navigateBack()
				}
				
				
			}
		}
	}
</script>
<style>
	page {
		background-color: #f2f2f2;
	}
</style>
<style lang="scss" scoped>
	.card-wrapper {
		padding: 10rpx;
		background-color: #eee;
	}
.video-w {
	position: fixed;
	z-index: 50;
	right: 10rpx;
	bottom: 120rpx;
	pointer-events: none;
	.video {
		width: 200rpx;
		height: 300rpx;
		box-shadow: 0 0 15rpx rgba(0,0,0,.2);
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		pointer-events: auto;
	}
	.video-label {
		position: absolute;
		right: 10rpx;
		top: 10rpx;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-color: rgba(70,70,70,.3);
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		// font-size: 24rpx;
	}
}
.w {
	padding-bottom: 110rpx;
}
.tabbar-w {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	z-index: 500;
	.tabbar {
		display: flex;
		align-items: center;
		height: 110rpx;
		border-top: 1rpx solid #e7e7e7;
		padding: 0 20rpx;
		.tabbar-item {
			margin: 0 20rpx;
			&:first-child {
				margin-left: 0;
			}
			&:last-child {
				margin-right: 0;
			}
			&.tab-icon-btn {
				display: flex;
				flex-direction: column;
				align-items: center;
				.item-icon {
					color: #000;
					font-size: 24rpx;
					position: relative;
					&:first-child {
						font-size: 46rpx;
					}
				}
			}
			&.tab-btn {
				.btn-text {
					margin-left: 8rpx;
				}
				&.buy-btn {
					flex: 1;
				}
				
			}
		}
	}
}

.prod-info {
	padding: 0 20rpx;
	margin-bottom: 30rpx;
	.info-card {
		background-color: #fff;
		border-radius: 10rpx;
		min-height: 200rpx;
		padding: 20rpx 30rpx;
		.info-card-header {
			border-bottom: 2rpx solid #eee;
			margin-bottom: 10rpx;
			.header-title {
				color: #333;
				font-size: 32rpx;
				text-align: center;
				line-height: 60rpx;
				font-weight: bold;
			}
		}
		.info-card-content {
			line-height: 45rpx;
			word-break: break-all;
		}
		.info-row {
			margin-bottom: 15rpx;
			&.single-info {
				display: flex;
				align-items: center;
				padding: 15rpx 0;
				margin-bottom: 0;
				&:last-child {
					margin-bottom: 0;
				}
			}
			.info-label {
				white-space: nowrap;
				font-size: 24rpx;
				flex: 0 0 4em;
				width: 4em;
				color: #999;
				&.label-w-2 {
					letter-spacing: 2em;
				}
				&.label-w-3 {
					letter-spacing: 0.5em;
				}
			}
			.info-value {
				flex: 1;
				padding-left: 40rpx;
			}
			&.info-price {
				display: flex;
				align-items: baseline;
				position: relative;
				.price-dw,
				.price {
					color: red;
				}
				.price-dw {
					font-family: '微软雅黑';
				}
				.price {
					font-size: 1.5rem;
					padding: 0 10rpx;
				}
				.discount-right {
					position: absolute;
					right: 0;
					bottom: 0;
					top: 0;
					margin-top: auto;
					margin-bottom: auto;
					// border-left: 1rpx solid #e7e7e7;
					padding-left: 20rpx;
					display: flex;
					align-items: center;
					.discount-btn {
						font-size: 24rpx;
						color: red;
					}
				}
			}
			&.info-discount {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.discount-left {
					display: flex;
					align-items: center;
					.discount-label {
						color: red;
						background-color: rgba(255, 0, 0, 0.06);
						border-radius: 6rpx;
						font-size: 24rpx;
						padding: 2rpx 12rpx;
						margin-left: 14rpx;
						&:nth-of-type(1) {
							margin-left: 0;
						}
					}
				}
				.discount-right {
					border-left: 1rpx solid #e7e7e7;
					padding-left: 20rpx;
					display: flex;
					align-items: center;
					.discount-btn {
						font-size: 24rpx;
						color: red;
					}
				}
			}
			&.info-title {
				padding-top: 10rpx;
				.title-label {
					background-color: $uni-color-theme;
					color: #fff;
					border-radius: 4rpx;
					padding: 4rpx 8rpx;
					font-size: 24rpx;
					line-height: 35rpx;
					margin-right: 8rpx;
					vertical-align: text-bottom;
				}
				.title {
					font-weight: bold;
					font-size: 32rpx;
					color: #111;
					line-height: 50rpx;
					word-break: break-all;
				}
			}
			&.info-cgy {
				color: #999;
				font-size: 24rpx;
			}
		}
	}
}
.swiper {
	// padding: 20rpx 0;
	margin-bottom: 30rpx;
	background-color: #f3f4f6;
}
.scroll-w {
	width: 100%;
	white-space: nowrap;
	height: 500rpx;
	padding: 0 8rpx;
	margin-bottom: 10rpx;
	// background-color: #eeeeee;
	&.single {
		width: 500rpx;
		margin: 0 auto;
	}
	.scroll-item {
		width: 500rpx;
		height: 100%;
		padding: 16rpx 12rpx;
		display: inline-block;
	}
}
</style>
