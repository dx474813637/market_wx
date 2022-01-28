<template>
	<view class="wrapper" :class="{'dark': theme == 'dark'}">
		<view class="wrapper-main">
			<navigator :url="url" class="u-line-2 title">{{title}}</navigator>
			<view class="posttime">{{posttime | timeFilter}}</view>
		</view>
		<view class="wrapper-image" v-if="image">
			<image lazy-load mode="center" :src="image" />
		</view>
	</view>
</template>

<script>
	export default {
		name:"NewsCell",
		props: {
			title: {
				type: String,
				default: ""
			},
			url: {
				type: String,
				default: ""
			},
			image: {
				type: String,
				default: ""
			},
			posttime: {
				type: String,
				default: ""
			},
			theme: {
				type: String,
				default: "light"
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.wrapper {
	display: flex;
	padding: 30rpx 0rpx 20rpx;
	border-bottom: 1rpx solid #f8f8f8;
	&.dark {
		border-color: #303353;
		.wrapper-main {
			color: #fff;
			.title {
				font-weight: normal;
			}
		}
	}
	.wrapper-main {
		flex: 1;
		padding: 5rpx 10rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 140rpx;
		.title {
			font-weight: bold;
		}
		.posttime {
			color: #999;
			font-size: 24rpx;
		}
	}
	.wrapper-image {
		width: 210rpx;
		flex: 0 0 210rpx;
		image {
			width: 100%;
			height: 140rpx;
			border-radius: 10rpx;
		}
	}
}
</style>
