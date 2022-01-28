<template>
	<view>
		<view class="bill-info">
			<view class="bill-top">
				<u-image
					width="120"
					height="120"
					shape="circle"
					:src="info.image"
				></u-image>
				<view class="bill-shop-name">{{info.payshop}}</view>
				<view class="bill-money">-2581.50</view>
			</view>
			<view class="bill-content-list">
				<view class="list-item">
					<view class="bill-label">当前状态</view>
					<view class="bill-content">{{info.paystatus}}</view>
				</view>
				<view class="list-item">
					<view class="bill-label">旺铺名</view>
					<view class="bill-content">{{info.payshop}}</view>
				</view>
				<view class="list-item">
					<view class="bill-label">支付时间</view>
					<view class="bill-content">{{info.paystatus}}</view>
				</view>
				<view class="list-item">
					<view class="bill-label">支付方式</view>
					<view class="bill-content">{{info.paytype}}</view>
				</view>
				<view class="list-item">
					<view class="bill-label">支付单号</view>
					<view class="bill-content">{{info.payid}}</view>
				</view>
				<view class="list-item">
					<view class="bill-label">旺铺单号</view>
					<view class="bill-content">{{info.orderid}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		onLoad(opt) {
			console.log(opt)
			this.initData()
		},
		methods: {
			async initData() {
				uni.showLoading({
					title: '加载中'
				})
				this.info = await this.getData()
				uni.hideLoading()
			},
			async getData() {
				return await this.$api.json('billDetail')
			}
		}
	}
</script>
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
.bill-info {
	background-color: #fff;
	padding: 30rpx 40rpx;
	margin-bottom: 30rpx;
	.bill-top {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 80rpx;
		.bill-shop-name {
			padding: 20rpx 0 30rpx;
			font-size: 30rpx;
			color: #000;
		}
		.bill-money {
			font-size: 50rpx;
			font-weight: bold;
		}
	}
	.bill-content-list {
		padding: 20rpx 0;
		border-top: 1rpx solid #f5f5f5;
		font-size: 24rpx;
		.list-item {
			display: flex;
			align-items: center;
			height: 60rpx;
			.bill-label {
				flex: 0 0 120rpx;
				width: 120rpx;
				margin-right: 30rpx;
				color: #999;
			}
			.bill-content {
				flex: 1;
				color: #000;
			}
		}
	}
}
</style>
