<template>
	<view>
		 <view class="main">
			<view class="main-header">
				<view class="header-title u-flex u-flex-items-center u-flex-center">
					<view>{{list.state | zzState2Str}}</view>
				</view>
				<view class="header-content u-flex u-flex-items-center u-flex-center">
					<view>{{list.Sino_fund_refund.price1}} 元</view>
				</view>
			</view>
			<view class="main-content">
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>现金账号：</view>
					</view>
					<view class="item-right">
						<view>{{list.Sino_fund_refund.user_fundaccno}}</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>银行卡：</view>
					</view>
					<view class="item-right">
						<view>{{list.Sino_fund_refund.bank_accno1}}</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>金额：</view>
					</view>
					<view class="item-right">
						<view>{{list.Sino_fund_refund.price1}} 元</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>手续费：</view>
					</view>
					<view class="item-right">
						<view>{{list.Sino_fund_refund.fee1}} 元</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>状态：</view>
					</view>
					<view class="item-right">
						<view>{{list.state | zzState2Str}}</view>
					</view>
				</view>
				<view class="row u-flex u-flex-between u-flex-items-center">
					<view class="item-left">
						<view>时间：</view>
					</view>
					<view class="item-right">
						<view>{{list.ctime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				list: {
					Sino_fund_refund: {}
				}
			};
		}, 
		onLoad(options) {
			if(options.hasOwnProperty('id')) {
				this.id =  options.id
			} 
			uni.showLoading()
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.sino_fund_refund_detail_refund({
					params: {
						id: this.id
					}
				})
				if(res.code == 1) {
					this.list = res.list
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
		min-height: 100vh;
	}
</style>

<style lang="scss" scoped>
	.main {
	    padding: 20px;
	    .main-header {
	        margin-bottom: 20px;
	        .header-title {
	            background-color: #fff;
	            position: relative;
	            border-bottom: 1px dashed #eee;
	            height: 45px;
	            color: #000;
	            font-size: 16px;
	            &:before, &:after {
	                content: "";
	                position: absolute;
	                background-color: #f8f8f8;
	                bottom: 0;
	                width: 20px;
	                height: 20px;
	                border-radius: 50%;
	            }
	            &:before {
	                left: 0;
	                transform: translate(-50%, 50%);
	            }
	            &:after {
	                right: 0;
	                transform: translate(50%, 50%);
	            }
	        }
	        .header-content {
	            background-color: #fff;
	            height: 150px;
	            color: red;
	            font-size: 30px;
	            border-radius: 5px;
	            box-shadow: 0 5px 5px rgba(0,0,0,.1);
	        }
	    }
	    .main-content {
	        padding: 0 5px;
	        .row {
	            border-bottom: 1px solid #eee;
	            height: 35px;
	            .item-left {
	                color: #000;
	            }
	            .item-right {
	                color: #999
	            }
	        }
	    }
	}
</style>
