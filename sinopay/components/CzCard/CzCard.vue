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
					<view class="name text-base">资金账号：{{detailData.user_fundaccno}}</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-20">
					<view class="pp u-flex u-flex-items-center">
						<i class="custom-icon-moneybag custom-icon"></i>
						<text>{{detailData.price/100}}</text>
						<!-- <u--text mode="price" :text="detailData.price/100" type="error"></u--text> -->
					</view>
					<view class="pp">
						<i class="custom-icon-right custom-icon" v-if="type == 'tx'"></i>
					</view>
				</view>
				<view class="item u-flex u-flex-between u-flex-items-center ">
					<view class="pp u-flex u-flex-items-center">
						<i class="custom-icon-info custom-icon"></i>
						<text class="u-p-l-6">{{detailData.ctime}}</text>
					</view>
					<view class="pp" :class="{
						'text-error': detailData.state == 2,
						'text-success': detailData.state == 1,
						'text-primary': detailData.state == 3 || detailData.state == 10,
					}"> 
						<template v-if="type == 'tx'">
							{{detailData.state | tixianState2Str}}
						</template>
						<template v-if="type == 'cz'">
							{{detailData.state | wyczState2Str}}
						</template>
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
