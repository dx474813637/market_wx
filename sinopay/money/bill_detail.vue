<template>
	<view>
		<view class="main" >
			<view class="main-header">
				<view class="header-title u-flex u-flex-center u-flex-items-center">
					<view >{{list.c_name}}</view> 
				</view>
				<view class="header-content u-flex u-flex-center u-flex-items-center">
					<view>
						<text>- {{list.final_price}} 元</text>
						<!-- <u--text size="30" type="error" mode="price" :text="list.price1 || 0"></u--text> -->
					</view>
				</view>
			</view>
			<view class="main-content">
				<view class="row u-flex">
					<view class="item-left">
						<p>当前状态</p>
					</view>
					<view class="item-right">
						<p>{{list.xcx_status_zzzz}}</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>支付方式</p>
					</view>
					<view class="item-right">
						<p>{{list.toTools}}</p>
					</view>
				</view>
				<view class="row u-flex" >
					<view class="item-left">
						<p>商品</p>
					</view>
					<view class="item-right">
						<p>{{list.product_names}}</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>商户</p>
					</view>
					<view class="item-right">
						<p>{{list.c_name}}</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>支付时间</p>
					</view>
					<view class="item-right">
						<p>{{list.ctime}}</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>支付单号</p>
					</view>
					<view class="item-right">
						<p>{{list.sinopay_id}}</p>
					</view>
				</view>
				<view class="row u-flex">
					<view class="item-left">
						<p>订单号</p>
					</view>
					<view class="item-right">
						<p>{{id}}</p>
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
				const res = await this.$http.get('market/bill_detail',{
					params: {
						order_id: this.id
					}
				})
				if(res.data.code == 1) {
					this.list = res.data.list
				} 
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
