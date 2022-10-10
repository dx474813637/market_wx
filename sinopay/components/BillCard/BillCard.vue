<template>
	<view class="card-w u-p-40"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow,
			transition: 'all .3s'
		}" 
		>
		<view class="card-header " @click="handleGotoDetail">
			<view class="item u-m-b-30 u-flex u-flex-items-center u-flex-between">
				<view>
					{{detailData.c_name}}
				</view>
				<view class="text-error">
					- {{detailData.pay_price}} 元
				</view>
			</view>
			<view class="item u-flex u-flex-items-center u-flex-between">
				<view>
					{{detailData.ctime}}
				</view>
				<view class="">
					{{detailData.pay_tool_name}}
				</view>
			</view>
				 
			
		</view> 
		
	</view>
</template>

<script>
	export default {
		name: 'BillCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			paytype: {
				type: String,
				default: 'B',
			},
			mode: {
				type: String,
				default: 'FUNDPAY',
			},
			ids: {
				type: String,
				default: 'ids',
			},
			pid: {
				type: String,
				default: 'pid',
			},
			type: {
				type: String,
				default: 'type',
			},
			name: {
				type: String,
				default: 'name',
			},
			price: {
				type: String,
				default: 'price',
			},
			date: {
				type: String,
				default: 'date',
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
			detailData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				toggle: false
			}
		},
		methods: {
			handleGotoDetail() {
				this.$emit('detail', this.detailData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 28rpx;
	}
	.pp {
		color: #666;
		font-size: 28rpx;
		// padding-left: 10rpx;
		.custom-icon {
			// color: #bbb;
		}
	}
	.item-sub {
		color: #666;
	}
	.hen {
		position: relative;
		&:after,
		&:before {
			position: absolute;
			content: '';
			top: 50%;
			transform: translateY(-50%);
			height: 1px;
			width: 50%;
			background-color: #eee;
		}
		&:after {
			right: 0;
		}
		&:before {
			left: 0;
		}
	}
	.more-title {
		position: relative;
		z-index: 50;
	}
	.more-btn {
		transition: all .3s;
	}
</style>
