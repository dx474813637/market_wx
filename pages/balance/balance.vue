<template>
	<view class="w">
		<view class="w-icon">
			<u-icon name="rmb-circle-fill" color="#5770bd" size="140"></u-icon>
		</view>
		<view class="title">Sinopay余额</view>
		<view class="money">
			<text class="dw">¥</text>
			<u-count-to
				ref="uCountTo"
				:end-val="endVal" 
				separator="," 
				:decimals="2" 
				bold
				:duration="1000" 
				:use-easing="false"
				font-size="60"
				:autoplay="false"
			></u-count-to>
		</view>
		<image class="zy" mode="widthFix" src="https://wx3.y.netsun.com/Public/ye.png" />
	</view>
</template>

<script>
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				endVal: 0,
				info: [{bael: 0}, {bal: 0}]
			};
		},
		async onLoad() {
			uni.showLoading({
				title: '加载中'
			})
			let res = await this.$http.get('Xcx/user_account')
			this.endVal = res.data.list.data.filter(ele => ele.account_type == 'B')[0].bal
			this.info = res.data.list.data
			uni.hideLoading()
			this.start()
			// this.$http.get('sign_out')
			
		},
		methods: {
			start() {
				this.$refs.uCountTo.start();
			},
			paused() {
				this.$refs.uCountTo.paused();
			},
			reStart() {
				this.$refs.uCountTo.reStart();
			},
		}
	}
</script>
<style>
	page {
		/* height: 100%;
		overflow: hidden; */
	}
</style>
<style lang="scss" scoped>
	.w {
		display: flex;
		flex-direction: column;
		align-items: center;
		.zy {
			width: 100%;
			padding: 0;
			margin-top: 50rpx;
			
		}
		.w-icon {
			padding: 100rpx 0 30rpx;
		}
		.title {
			font-size: 30rpx;
			// font-weight: bold;
			margin-bottom: 20rpx;
			color: #333;
		}
		.money {
			font-size: 70rpx;
			// font-weight: bold;
			.dw {
				font-family: '微软雅黑';
				font-size: 40rpx;
				padding-right: 10rpx;
			}
		}
	}
</style>
