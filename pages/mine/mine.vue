<template>
	<view class="container">
		<view class="user-section">
			<view class="status_bar"></view>
			<!-- <view class="bg"></view> -->
			<image class="bg" src="/static/img/bg-mine.png"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<template v-if="userInfo.mem_pic">
						<image class="portrait" :src="userInfo.mem_pic"></image>
					</template>
					<template v-else>
						<view class="portrait">
							<open-data type="userAvatarUrl"></open-data>
						</view>

					</template>

				</view>
				<view class="info-box">
					<template v-if="userInfo.name">
						<text class="username">{{userInfo.name}}</text>
					</template>
					<template v-else>
						<navigator class="username" url="/pages/login/index">
							<open-data type="userNickName"></open-data>
							<view class="username-label" v-if="!logflag">未登录</view>
						</navigator>
					</template>
					
				</view>
			</view>
			<view class="vip-card-box" @click="navTo('/sinopay/money/index')">
				<!-- <image class="card-bg" src="/static/img/bg-card.png" mode=""></image> -->
				<view class="b-btn">
					进入
				</view>
				<view class="tit">
					<u-icon name="rmb-circle" size="38"></u-icon>
					<text>我的资金</text>
				</view>
			</view>
		</view>

		<view class="cover-container">

			<image class="arc" src="/static/img/arc.png"></image>

			<view class="tj-sction">
				<view class="tj-item" @click="navTo('/pages/balance/balance')">
					<view class="num">
						<u-icon name="red-packet-fill" color="#3c59c3"></u-icon>
					</view>
					<text>Sinopay余额</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/order/order')">
					<view class="num">
						<u-icon name="form" custom-prefix="custom-icon" color="#3c59c3"></u-icon>
					</view>
					<text>订单</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/discount/discount')">
					<view class="num">
						<u-icon name="coupon-fill" color="#3c59c3"></u-icon>
					</view>
					<text>优惠券</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/address/address')">
					<view class="num">
						<u-icon name="map" color="#3c59c3"></u-icon>
					</view>
					<text>地址管理</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" v-for="(item, index) in loginBind.order_type" :key="index" @click="navTo('/pages/order/order?current='+item.current)" hover-class="common-hover"
					:hover-stay-time="50">
					<view class="yticon">
						<u-icon :name="item.icon" custom-prefix="custom-icon"></u-icon>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<template v-if="history.length != 0">
					<view class="sec-header">
						<text class="yticon icon-lishijilu"></text>
						<text>浏览历史</text>
					</view>
					<scroll-view scroll-x class="h-list">
						<view class="list-w">
							<view class="item" v-for="item in history" :key="item.id" @click="navTo(`/pages/prodDetail/prodDetail?id=${item.id}`)">
								<u-image width="100%" height="100%" :src="item.image" border-radius="10"></u-image>
							</view>
						</view>
						
					</scroll-view>
				</template>
				
				<list-cell icon="map-fill" iconColor="#bdbdbd" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<list-cell icon="star-fill" iconColor="#bdbdbd" title="我的收藏" @eventClick="navTo('/pages/follow/follow')"></list-cell>
				<template v-if="couponShareTitle">
					<list-cell icon="share-fill" iconColor="#bdbdbd" :title="couponShareTitle" @eventClick="navTo('/pages/discount/couponShare?title=' + couponShareTitle)"></list-cell>
				</template>
				<template v-if="loginBind.auth">
					<list-cell icon="setting-fill" iconColor="#bdbdbd" :title="loginBind.cash_name" @eventClick="navTo('/pages/loginBind/loginBind')"></list-cell>
				</template>
				<template v-if="userInfo.memu">
					<list-cell v-for="(item, index) in userInfo.memu" :key="index" :type="item.type" :icon="item.icon" iconColor="#bdbdbd" :title="item.name" @eventClick="navTo(item.page)"></list-cell>
				</template>
				<!-- <list-cell icon="icon-share" iconColor="#bdbdbd" title="分享" tips="邀请好友赢10万大礼"></list-cell> -->
			</view>
			
			<view class="logout" v-if="logflag">
				<u-button @click="logout" type="error" border-radius="10">退出登录</u-button>
			</view>
		</view>

		<nav-bar :index="4" :tabbar="true"></nav-bar>
	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
	import {
		mapState
	} from 'vuex';
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	import {getUserCard} from '@/utils/userCard'
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		mixins: [mixCheckLogin],
		components: {
			listCell
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				logflag: uni.getStorageSync('login'),
				
			}
		},
		async onLoad() {
			if(Object.keys(this.$store.state.userInfo).length == 0) getUserCard()
			
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'history'])
		},
		methods: {

			navTo(url) {
				// console.log(url)
				if(!uni.getStorageSync('login')) {
					uni.redirectTo({
						url: '/pages/login/index'
					})
					uni.showToast({
						title: '请登录生意宝账号。',
						icon: 'none'
					})
				}else {
					uni.navigateTo({
						url
					})
				}
				
			},
			async logout() {
				let res = await this.$http.get('Xcx/sign_out')
				if(res.data.code == 1) {
					this.$store.commit('removeUserInfo')
					uni.redirectTo({
						url: "/pages/index/index"
					})
					uni.showToast({
						title: '退出成功'
					})
					uni.removeStorageSync('login')
				}
			}

		}
	}
</script>
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang='scss'>
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
		padding: 0 20rpx;
	}
	
	.logout {
		padding-top: 40rpx;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.user-section {
		height: 570upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 80%;
			/* filter: blur(1px); */
			opacity: 1;
			background: radial-gradient(#444 10%, #111);
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
			overflow: hidden;
			background-color: #eee;
		}
		.username {
			font-size: 34upx;
			color: #fff;
			margin-left: 20upx;
			display: flex;
			flex-direction: column;
			.username-label {
				font-size: 24rpx;
				background-color: #7e7abd;
				color: #fff;
				border-radius: 20rpx;
				padding: 4rpx 8rpx;
				display: block;
				width: 120rpx;
				text-align: center;
				margin-top: 15rpx;
			}
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background-image: url('../../static/img/bg-card.png');
		background-repeat: no-repeat;
		background-size: 105% 105%;
		background-position: center;
		border-radius: 16upx 16upx 0 0;
		border: 1rpx solid #0d356b;
		overflow: hidden;
		position: relative;
		padding: 26upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 30upx;
			/* width: 132upx; */
			padding: 0 30upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background-color: #f9e6af;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			display: flex;
			text {
				margin-left: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		margin-top: -120upx;
		padding: 0 30upx;
		position: relative;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;
		justify-content: space-between;
		.tj-item {
			@extend %flex-center;
			flex: 1;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: 42rpx;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		justify-content: space-between;
		padding: 28upx 20upx;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			flex: 1;
			/* width: 120upx; */
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #111;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		/* padding: 30upx 0 0; */
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			padding-top: 30rpx;

			.yticon {
				font-size: 44upx;
				color: #bdbdbd;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			padding: 20rpx 30rpx 0;
			height: 190rpx;
			.list-w {
				display: flex;
				align-items: center;
			}
			.item {
				flex: 0 0 160rpx;
				height: 160rpx;
				margin-right: 15rpx;
				position: relative;
				border-radius: 10rpx;
				overflow: hidden;
				&:after {
					position: absolute;
					content: '';
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					background-color: rgba(100,100,100,.1);
					
				}
			}
		}
	}
</style>
