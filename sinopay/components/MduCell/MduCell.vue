<template>
	<view class="wrapper u-radius-10 uni-shadow-base bg-white u-p-15" @click="handleDetail">
		<view class="card u-flex u-flex-items-center u-flex-between u-p-10 u-p-l-20 u-p-r-20 u-border-bottom">
			<view class="item">
				{{detailData.Standard.name}}
			</view>
			<view class="item u-font-30" :class="{
				'text-error': detailData.state == '2',
				'text-success': detailData.state == '1',
				'text-primary': detailData.state == '0',
			}">
				{{detailData.state | mduState2Str}}
			</view>
		</view>
		<view class="main u-p-10 u-p-l-20 u-p-r-20 u-font-30 text-base">
			<view class="rows u-flex u-flex-items-start u-flex-between u-m-b-20">
				<view class="item" style="flex: 0 0 80px"> 
					{{detailData.mdu | mdu2Str}}
				</view>
				<view class="item u-line-2 u-text-right" v-if="detailData.Company"> 
					{{detailData.Company.name}}
				</view>
			</view>
			<view class="rows u-flex u-flex-items-center u-flex-between u-m-t-10">
				<view class="item"> 
				</view>
				<view class="item u-flex u-flex-items-center">
					<view class="u-m-l-15" @click.stop="handleAudit" v-if="isBroker == '0' && detailData.broker_login" >
						<u-button type="primary" size="small" plain shape="circle">审核</u-button>
					</view>
					<view class="u-m-l-15" @click.stop="handleDelete" v-if="isBroker == '0' || detailData.state != '1'">
						<u-button type="error" size="small" plain shape="circle">删除</u-button>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MduCell',
		props: {
			detailData: {
				type: Object,
				default: () => {
					return {}
				}
			},
			isBroker: {
				type: String | Number,
				default: 1
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			handleDelete() {
				uni.showModal({
					title: '提示',
					content: `是否删除该条【${this.detailData.Standard.name}】MDU信息？`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('delete', this.detailData)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			handleAudit() {
				this.$emit('audit', this.detailData)
			},
			handleDetail() {
				this.$emit('detail', this.detailData)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
