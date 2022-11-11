<template>
	<view class="card-w u-p-26"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}" 
		>
		<view class="card-header "  @click="show = !show">
			<view class="item u-m-b-20"> 
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-30">
					<view class="u-flex u-flex-items-center ">
						<u-tag text="流水号" type="info" />
						<view class="name text-base u-m-l-8" >{{detailData.seq_no}}</view> 
					</view>
					<view>
						<view class="text-error">{{detailData.amount}} 元</view>
					</view>
					
				</view>
				<template v-if="show">
					<view class="item u-flex u-flex-between u-flex-items-center u-m-b-30">
						<view class="u-flex u-flex-items-center "> 
							<view class="name text-base" >入金账号</view> 
						</view>
						<view>
							<view class="">{{detailData.account_no}}</view>
						</view>
						
					</view>
					<view class="item u-flex u-flex-between u-flex-items-center u-m-b-30">
						<view class="u-flex u-flex-items-center "> 
							<view class="name text-base" >入金账户名</view> 
						</view>
						<view>
							<view class="">{{detailData.account_name}}</view>
						</view>
						
					</view>
					<view class="item u-flex u-flex-between u-flex-items-center u-m-b-30">
						<view class="u-flex u-flex-items-center "> 
							<view class="name text-base" >入金账号银行</view> 
						</view>
						<view>
							<view class="">{{detailData.bank_name}}</view>
						</view>
						
					</view>
					<view class="item u-flex u-flex-between u-flex-items-center u-m-b-30">
						<view class="u-flex u-flex-items-center "> 
							<view class="name text-base" >备注</view> 
						</view>
						<view>
							<view class="">{{detailData.remark}}</view>
						</view>
						
					</view>
				</template>
				
				<view class="item u-flex u-flex-between u-flex-items-center u-m-b-30">
					<view class="u-flex u-flex-items-center "> 
						<view class="name text-base" >记账日期：{{detailData.cr_time}} </view> 
					</view>
					<view>
						<u-icon name="more-dot-fill"></u-icon>
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
				show: false
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
