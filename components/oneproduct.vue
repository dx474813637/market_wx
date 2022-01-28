<template>
	<view>
		<view class=" padding-xs radius  cf" :style="bg?'background:#fff;':'background: #F1F1F1;'">
			<image mode="aspectFill" lazy-load="true" :src="product.pic1" class="fl margin-xs radius" style="height: 140upx;width: 140upx;"></image>
			<view class="fl margin-xs margin-left-sm text-content" style="max-width: 65%;">
				<view class="text-lg   text-black text-cut">{{product.name}}</view>
				<view style="color: #666;" class="text-sm text-cut margin-bottom-xs">{{product.post_time}}</view>
				<button hover-class="touch-bg" style="display: inline;" class="radius bg-drakblue padding-lr-sm padding-tb-xs text-df text-centent" @tap="navTo('/pages/detail/cpDetail?id='+product.id)">查看详情</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['product','bg'],
		data() {
			return {

			};
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url:e
				})
			}
		},
	}
</script>

<style lang="less">

</style>
