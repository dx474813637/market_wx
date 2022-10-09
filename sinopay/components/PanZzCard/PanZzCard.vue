<template>
	<view class="card-w u-p-16"
		:style="{
			backgroundColor: bgColor,
			borderRadius: borderRadius,
			boxShadow: boxShadow
		}"
		
		>
		<view class="card-header u-flex u-flex-between u-flex-items-center u-p-10">
			<view class="item u-flex-1 u-p-r-20" @click="handleGotoDetail">
				<view class="item u-flex u-flex-items-center u-m-b-10">
					<u-tag :text="type | tradeType2" size="mini" plain plainFill :custionStyle="{height: '18px', minHeight: '18px'}"></u-tag>
					<text class="name u-line-1 u-p-l-10">{{name}}</text>
					<text class="pp text-error">{{price | price2str(dprice)}} <template v-if="price>0">元/{{unit}}</template></text>
				</view>
				<view class="item item-sub u-line-1">{{sub}}</view>
			</view>
			<view class="item">
				<u-switch 
					size="20"
					:value="switch_status" 
				></u-switch>
			</view>
		</view> 
		<view class="card-footer u-flex u-flex-between u-flex-items-center u-p-12">
			<view class="item text-light u-font-28">更新于{{date | date2timestamp | timeFrom}}</view>
			<view class="item u-flex u-flex-items-center"> 
				<view class="u-p-l-12">
					<u-button 
						type="primary" 
						size="mini" 
						shape="circle" 
						icon="attach"
						:disabled="doing"
						@click.stop="handleFront"
					>预览</u-button>
				</view> 
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'PanZzCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			name: {
				type: String,
				default: '名称',
			},
			sub: {
				type: String,
				default: 'sub',
			},
			pid: {
				type: String,
				default: '',
			},
			price: {
				type: String,
				default: 'price',
			},
			dprice: {
				type: String,
				default: 'dprice',
			},
			unit: {
				type: String,
				default: 'unit',
			},
			date: {
				type: String,
				default: 'date',
			},
			type: {
				type: String,
				default: 'type',
			},
			status: {
				type: String,
				default: '0',
			},
			origin: {
				type: Object,
				default:() => {
					return {}
				},
			},
			isAuth: {
				type: Boolean,
				default: false
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
				switch_status: false,
				loading: false,
				
			}
		},
		computed: {
			doing() {
				return this.loading
			}
		},
		watch: {
			status: {
				immediate: true,
				handler(flag) {
					if(flag == '1') this.switch_status = true;
					else this.switch_status = false;
					this.loading = false;
				}
			}
		},
		methods: {
			switchInput(value) {
				
				uni.showModal({
					title: '提示',
					content: `是否改变当前${this.name}的状态`,
					success: (res) => {
						if (res.confirm) {
							this.loading = true;
							this.$emit('changeStatus',  {state: value?'1':'0', id: this.pid})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleFront() {
				this.$emit('front', {id: this.pid})
			},
			handleDelet() {
				console.log('删除事件')
				uni.showModal({
					title: '提示',
					content: `是否删除该商品名：${this.name}`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('delet', {id: this.pid})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleResubmit() {
				
				uni.showModal({
					title: '提示',
					content: `是否重发${this.name}`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('resubmit', {data: this.origin})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleGotoDetail() {
				this.$emit('detail', {pid: this.pid, data: this.origin})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name {
		color: #000;
		font-size: 34rpx;
		word-break: break-all;
	}
	.pp {
		color: #999;
		padding-left: 10rpx;
		white-space: nowrap;
	}
	.item-sub {
		color: #666;
	}
</style>
