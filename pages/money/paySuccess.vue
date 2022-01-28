<template>
	<view class="content">
		<text class="success-icon yticon icon-xuanzhong2"></text>
		<text class="tit">支付成功</text>
		 
		<view class="btn-group">
			<!--  :url="`/pages/orderDetail/orderDetail?id=${orderid}`" -->
			<navigator open-type="navigateBack" delta="1" class="mix-btn">返回订单</navigator>
			<navigator open-type="reLaunch" url="/pages/order/order" class="mix-btn hollow">返回订单列表</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderid: ''
			}
		},
		onLoad(options) {
			if(options && options.orderid) {
				this.orderid = options.orderid
			}else {
				uni.navigateBack({
					delta: 1
				})
				uni.showToast({
					title: '参数有误',
					icon: 'none'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.success-icon{
		font-size: 160upx;
		color: $uni-color-theme;
		margin-top: 100upx;
	}
	.tit{
		font-size: 38upx;
		color: #303133;
	}
	.btn-group{
		padding-top: 100upx;
	}
	.mix-btn {
		margin-top: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600upx;
		height: 80upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		&.hollow{
			background: #fff;
			color: #303133;
			border: 1px solid #ccc;
		}
	}
</style>
