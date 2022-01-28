<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<view class="price">
				<u-count-to
					ref="uCountTo"
					:end-val="price" 
					separator="," 
					:decimals="2" 
					bold
					:duration="1000" 
					:use-easing="false"
					font-size="60"
					:autoplay="false"
				></u-count-to>
			</view>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)" v-if="isnetsunkt == 1">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">Sinopay支付</text>
					<text :class="{err: netsunMoney < price}">
						可用余额 ¥{{netsunMoney}}元
						<template v-if="netsunMoney < price">
							。提示：当前余额不足，请登录生意宝，向资金中心里现金账户的付款账户充值。 
						</template>
					</text>
				</view>
				<view class="radio" :class="{active: payType == 1, disabled: netsunMoney < price}"></view>
				
			</view>
			<view class="type-item" @click="changePayType(2)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
				</view>
				<view class="radio" :class="{active: payType == 2}"></view>
			</view>
		</view>
		
		<text class="mix-btn" @click="confirm">确认支付</text>
		<u-popup v-model="popshow" mode="center" width="80%" border-radius="10" >
			<view class="header">请输入支付密码</view>
			<view class="content">
				<u-input type="password" v-model="pay_pw" placeholder="支付密码" border />
			</view>
			<view class="footer">
				<view class="footer-item">
					<u-button @click="canclePay">取消</u-button>
				</view>
				<view class="footer-item">
					<u-button @click="netPayConfirm" type="primary">确认</u-button>
				</view>
				
			</view>
		</u-popup>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				popshow: false,
				payType: 2,
				orderInfo: {},
				orderid: undefined,
				price: 0,
				style: {
					backgroundColor: '#5770bd',
					borderRadius: '4rpx'
				},
				netsunMoney: undefined,
				isnetsunkt: 0,
				pay_pw: '',
				coupon_guid: '',
				coupon_id: '',
				coupon_coupon: '',
				coupon_cate: ''
			};
		},
		computed: {
		
		},
		onLoad(options) {
			if(options && options.orderid && options.price) {
				this.coupon_guid = options.coupon_guid || ''
				this.coupon_id = options.coupon_id || ''
				this.coupon_cate = options.coupon_cate
				this.coupon_coupon = options.coupon_coupon
				this.orderid = options.orderid
				if(this.coupon_id) {
					if(this.coupon_cate != 2) {
						options.price = options.price - options.coupon_coupon
					}else {
						options.price = options.price * (options.coupon_coupon / 100)
					}
				}
				console.log(options)
				this.price = options.price
				
			}else {
				uni.navigateBack({
					delta: 1
				})
				uni.showToast({
					title: '参数有误',
					icon: 'none'
				})
				return
			}
			this.start()
			this.getNetsunMoney()
		},

		methods: {
			start() {
				this.$refs.uCountTo.start();
			},
			canclePay() {
				this.popshow = false;
			},
			async netPayConfirm() {
				if(!this.pay_pw) return
				uni.showLoading({
					title: '验证支付密码中...',
				})
				let res = await this.netsunPay()
				if(res.data.code == 1) {
					uni.redirectTo({
						url: `/pages/money/paySuccess?orderid=${this.orderid}`
					})
					uni.showToast({
						title: '支付成功',
						icon: 'none'
					})
				}else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
			},
			//选择支付方式
			changePayType(type) {
				if(type == 1 && this.netsunMoney < this.price) {
					return
				}
				this.payType = type;
			},
			//确认支付
			async confirm() {
				if(!this.orderid) return
				if(this.payType == 1) {
					this.popshow = true
				}
				if(this.payType == 2) {
					this.wxPay()
				}
				// uni.redirectTo({
				// 	url: '/pages/money/paySuccess'
				// })
			},
			async getNetsunMoney() {
				let res = await this.$http.get('Xcx/user_account')
				if(res.data.code == 1 && res.data.kt == 1) {
					this.isnetsunkt = 1;
					this.netsunMoney = res.data.list.data.filter(ele => ele.account_type == 'B')[0].bal
						
				}
			},
			async netsunPay() {
				//生意宝支付
				return await this.$http.post('Xcx/sinopay', {
					psw: this.pay_pw, 
					order_id: this.orderid,
					coupon_guid: this.coupon_guid,
					coupon_id: this.coupon_id
				})
			},
			async wxPay() {
				let res = await this.$http.post('Xcx/xcx_pay', {
					pay_price: this.price * 100,
					order_id: this.orderid,
					coupon_guid: this.coupon_guid,
					coupon_id: this.coupon_id
				})
				if(res.data.list.return_code == 'SUCCESS' && res.data.list.result_code == 'SUCCESS') {
					uni.requestPayment({
					    provider: 'wxpay',
					    timeStamp: String(res.data.pay.timeStamp),
					    nonceStr: res.data.pay.nonceStr,
					    package: res.data.pay.package,
					    signType: res.data.pay.signType,
					    paySign: res.data.pay.paySign,
					    success: data => {
					        console.log('success:' + JSON.stringify(data));
							uni.redirectTo({
								url: `/pages/money/paySuccess?orderid=${this.orderid}`
							})
							uni.showToast({
								title: '支付成功',
								icon: 'none'
							})
					    },
					    fail: err =>{
					        console.log(err);
							if(err.errMsg == 'requestPayment:fail cancel') {
								uni.showToast({
									title: '用户取消支付',
									icon: 'none'
								})
							}else {
								uni.showToast({
									title: '支付失败',
									icon: 'none'
								})
							}
					    }
					});
				}else { 
					uni.showToast({
						title: res.list.return_msg,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.header {
		padding: 20rpx;
		text-align: center;
		border-bottom: 1rpx solid #f8f8f8;
	}
	.content {
		padding: 20rpx;
	}
	.footer {
		display: flex;
		align-items: center;
		padding: 20rpx;
		justify-content: space-between;
		.footer-item {
			flex: 0 0 45%
		}
	}
		
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding: 0 60upx;
		
		.type-item{
			min-height: 120upx;
			padding: 30upx 0;
			display: flex;
			justify-content: space-between;
			/* align-items: center; */
			/* padding-right: 60upx; */
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.juhei {
			color: #fff;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
		.err {
			color: red;
		}
		.radio {
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			border: 1rpx solid $uni-color-theme;
			position: relative;
			&.active {
				&:after {
					transform: scale(1);
				}
				
			}
			&.disabled {
				border-color: #eee;
			}
			&:after {
				transition: all .3s;
				position: absolute;
				content: '';
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 24rpx;
				height: 24rpx;
				margin: auto;
				transform: scale(0);
				border-radius: 50%;
				z-index: 20;
				background-color: $uni-color-theme;
			}
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		/* box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4); */
	}

</style>
