<template>
	<view>
		<view class="main" >
			<view class="main-header">
				<view class="header-title u-flex u-flex-center u-flex-items-center">
					<view v-if="paytype == 'B'">{{list.s_company}}</view>
					<view v-if="paytype == 'S'">{{list.b_company}}</view>
				</view>
				<view class="header-content u-flex u-flex-center u-flex-items-center">
					<view>
						<text>{{list.price1}}</text>
						<!-- <u--text size="30" type="error" mode="price" :text="list.price1 || 0"></u--text> -->
					</view>
				</view>
			</view>
			<view class="main-content">
				<view class="row u-flex">
					<view class="item-left">
						<p>订单编号</p>
					</view>
					<view class="item-right">
						<p>{{list.id}}</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>交易编号</p>
					</view>
					<view class="item-right">
						<p>{{list.order_id}}</p>
					</view>
				</view>
				<view class="row u-flex" v-if="list.sinopay_id">
					<view class="item-left">
						<p>SINOPAY支付编号</p>
					</view>
					<view class="item-right">
						<p>{{list.sinopay_id}}</p>
					</view>
				</view>
				<view class="row u-flex" v-if="mode == 'FUNDPAY'">
					<view class="item-left">
						<p>资金账号</p>
					</view>
					<view class="item-right">
						<p>{{list.b_user_fundaccno}}</p>
					</view>
				</view> 
				<view class="row u-flex" v-if="paytype == 'B'">
					<view class="item-left">
						<p>卖方<template v-if="mode == 'BILLPAY'">票据账号</template></p>
					</view>
					<view class="item-right">
						<p>
							<template v-if="mode == 'BILLPAY'">{{list.s_sinopay_poster}}</template>
							<template v-else-if="mode == 'FUNDPAY'">{{list.s_company}}</template>
						</p>
					</view>
				</view> 
				<view class="row u-flex" v-if="paytype == 'S'">
					<view class="item-left">
						<p>买方<template v-if="mode == 'BILLPAY'">票据账号</template></p>
					</view>
					<view class="item-right">
						<p>
							<template v-if="mode == 'BILLPAY'">{{list.b_sinopay_poster}}</template>
							<template v-else-if="mode == 'FUNDPAY'">{{list.b_company}}</template>
						</p>
					</view>
				</view> 
				<view class="row u-flex" v-if="mode == 'BILLPAY'">
					<view class="item-left">
						<p>
							<template v-if="paytype == 'B'">卖</template>
							<template v-else-if="paytype == 'S'">买</template>
							方电票账号
						</p>
					</view>
					<view class="item-right">
						<view class="">
							<view class="u-m-b-10">{{list.pyeeAccNo}}</view>
							<view class="u-m-b-10"> 
								<template v-if="paytype == 'S'">{{list.b_company}}</template>
								<template v-if="paytype == 'B'">{{list.s_company}}</template>
							</view>
							<view class="u-m-b-10">{{list.pyeeBnm}}</view>
							<view class="u-m-b-10">{{list.pyeeBname}}</view> 
						</view>
					</view>
				</view> 
				<view class="row u-flex">
					<view class="item-left">
						<p>下单时间</p>
					</view>
					<view class="item-right">
						<p>{{list.ctime}}</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>支付工具</p>
					</view>
					<view class="item-right">
						<text>{{list.pay_mode | paymode2str}}</text>
						<text class="u-m-l-10">
							<template v-if="mode == 'BILLPAY'">{{list.settle_type | settleType2str}}</template>
							<template v-if="mode == 'FUNDPAY'">{{list.settle_type | settleType2str}}</template>
						</text>
						<text class="u-m-l-10" v-if="list.pay_mode && list.pay_mode.includes('GUARANTE')">担保支付</text>
						<text class="u-m-l-10" v-if="list.pay_type == '2'">二站式</text>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>状态</p>
					</view>
					<view class="item-right">
						<p>
							<template v-if="mode == 'BILLPAY'">
								{{list.state | payBillState2Str}}
							</template>
							<template v-else-if="mode == 'FUNDPAY'">
								{{list.state | payFundState2Str}}
							</template>
						</p>
					</view>
				</view>
			</view> 
		</view>
		<u-loading-page v-if="loading"></u-loading-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				paytype: 'B',
				mode: 'FUNDPAY',
				list: {},
				loading: true,
			};
		},
		onLoad(opt) {
			if(opt.hasOwnProperty('id')) {
				this.id = opt.id
			}
			if(opt.hasOwnProperty('paytype')) {
				this.paytype = opt.paytype 
			}
			if(opt.hasOwnProperty('mode')) {
				this.mode = opt.mode 
			}
			uni.setNavigationBarTitle({
				title: `${this.paytype == 'S'? '收' : '付'}款详情`
			})
			uni.showLoading()
			this.getData()
		},
		methods: {
			async getData() {
				let func = 'sino_fund_order_detail_order'
				if(this.mode == 'BILLPAY') {
					func = 'sino_bill_order_detail'
				}
				const res = await this.$api[func]({
					params: {
						pay_id: this.id,
						paytype: this.paytype
					}
				})
				if(res.code == 1) {
					if(this.mode == 'BILLPAY') this.list = res.list 
					else this.list = res.list.Sino_fund_order
				}
				this.loading = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.main {
    padding: 20px;
    background-color: #fff;
    .main-header {
        margin-bottom: 20px;
        border-bottom: 1px solid #f8f8f8;
        .header-title {
            /* background-color: #fff; */
            position: relative;
            /* border-bottom: 1px dashed #eee; */
            height: 45px;
            color: #000;
            font-size: 16px;
            /* &:before, &:after {
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
            } */
        }
        .header-content {
            
            height: 80px;
            color: #000;
            font-size: 30px;
            border-radius: 5px;
            padding-bottom: 20px;
            /* box-shadow: 0 5px 5px rgba(0,0,0,.1); */
        }
        
    }
    .main-content {
        padding: 0 5px;
        .row {
            /* border-bottom: 1px solid #eee; */
            min-height: 30px;
            margin-bottom: 10px;
            .item-left {
                color: #999;
                flex: 0 0 110px;
                width: 110px;
                
            }
            .item-right {
                color: #000;
                flex: 1;
            }
        }
    }
}
</style>
