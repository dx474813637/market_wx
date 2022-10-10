<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		 @click="handleGotoDetail"
		>
		<view class="card-header ">
			<view class="item u-m-b-20">
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20" v-if="detailData.bank_accname">
					<view class="name">户名：{{detailData.bank_accname}}</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-30">
					<view class="name text-base" v-if="type == 'tx'">提现订单号：{{detailData.refund_id}}</view>
					<view class="name text-base" v-if="type == 'cz'">充值单号：{{detailData.id}}</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20">
					<view class="pp u-flex u-flex-items-center">
						<i class="custom-icon-moneybag custom-icon"></i>
						<text class="u-m-l-20" v-if="type == 'tx'">{{detailData.amt}} 元</text>
						<text class="u-m-l-20" v-if="type == 'cz'">{{detailData.amount}} 元</text>
						<!-- <u--text mode="price" :text="detailData.price/100" type="error"></u--text> -->
					</view>
					<view class="pp">
						<i class="custom-icon-right custom-icon" ></i>
					</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center ">
					<view class="pp u-flex u-flex-items-center">
						<i class="custom-icon-info custom-icon"></i>
						<text class="u-p-l-6">{{detailData.ctime}}</text>
					</view>
					<view class="pp" :class="{ 
						'text-success': detailData.status == 1, 
					}"> 
						{{detailData.status_name}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CzCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			type: {
				type: String,
				default: 'type',
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
				
			}
		},
		computed: {
			typeStr() {
				if(this.type == 'tx') return '提现'
				else return '充值'
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
		font-size: 30rpx;
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
</style>
