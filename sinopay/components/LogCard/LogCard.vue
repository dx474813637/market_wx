<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		>
		<view class="card-header u-flex u-flex-between u-flex-items-center">
			<view class="item u-flex-1 u-m-b-20">
				<view class="item u-flex u-flex-items-center u-flex-between">
					<text class="name">{{ip}}</text>
					<text class="pp">{{date}}</text>
				</view>
				<!-- <view class="item item-sub u-line-1">{{shuxing}}</view> -->
			</view>
			
		</view>
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-b-12 u-p-t-12">
			<view class="item text-light">
				{{bz}}
			</view>
			<view class="item" :class="{
				'text-primary': status == 1,
				'text-error': status != 1,
			}">
				{{status == 1 ? '登录成功' : '登录失败'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'LogCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			date: {
				type: String,
				default: 'date',
			},
			sid: {
				type: String,
				default: 'sid',
			},
			ip: {
				type: String,
				default: 'ip',
			},
			bz: {
				type: String,
				default: 'bz',
			},
			status: {
				type: String,
				default: '1',
			},
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 34rpx;
	}
	.pp {
		color: #999;
		font-size: 28rpx;
		padding-left: 10rpx;
	}
	.item-sub {
		color: #666;
	}
</style>
