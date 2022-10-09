<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header u-flex u-flex-between u-flex-items-center">
			<view class="item u-flex-1 u-m-b-20">
				<view class="item u-flex u-flex-items-end u-line-1">
					<text class="name">{{pname}}</text>
					<text class="pp">{{psub}}</text>
				</view>
				<!-- <view class="item item-sub u-line-1">{{shuxing}}</view> -->
			</view>
			
		</view>
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-b-12 u-p-t-12">
			<view class="item text-light">
				{{pdate}}
			</view>
			<view class="item text-primary">
				{{status == 1 ? '已通知' : '未通知'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SubscribeMsgCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			pname: {
				type: String,
				default: '标准品',
			},
			sid: {
				type: String,
				default: 'sid',
			},
			pid: {
				type: String,
				default: 'pid',
			},
			type: {
				type: String,
				default: 'b',
			},
			pdate: {
				type: String,
				default: '2022-5-12 09:18:41',
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
		computed: {
			psub() {
				return `${this.type == 's'? '卖盘': '买盘'}：${this.pid}`
			}
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', {pid: this.pid})
			}
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
