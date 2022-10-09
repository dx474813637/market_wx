<template>
	<view class="w">
		<view class="card">
			<view class="card-header">
				<view class="header-left">
					<view class="left-item">
						<u-icon name="dianpu" size="34" color="#000000" custom-prefix="custom-icon"></u-icon>
						<view class="shop-name">{{list.c_name}}</view>
						<!-- <u-icon name="arrow-right" size="26" color="#ccc"></u-icon> -->
					</view>
				</view>
				<!-- <view class="header-right">
					<view class="right-item">
						<view class="status-text">{{list.status | orderStatus}}</view>
					</view>
				</view> -->
			</view>
			<view class="card-content">
				<view class="p-list" v-if="list.list_product">
					<view class="p-list-item" v-for="ele in list.list_product" :key="ele.id">
						<view class="p-img">
							<u-image width="100%" height="100%" :src="ele.pic1"></u-image>
						</view>
						<view class="p-info">
							<view class="p-info-name">{{ele.p_name}}</view>
							<!-- <view class="p-info-sub">{{ele.psub}}</view> -->
						</view>
						<view class="p-info-money">
							<view class="p-money">
								<template v-if="ele.single_price == 0">
									<text class="price-text">议价</text>
								</template>
								<template v-else>
									<text class="price-dw">¥</text>
									<text class="price-text">{{ele.single_price | moneyDwInt}}</text>
									<text>.{{ele.single_price | moneyDwPoint}}</text>
									
								</template>
								
							</view>
							<view class="p-count">
								<u-icon name="close" size="16"></u-icon>
								<text>{{ele.number}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="p-price">
					<view class="price-item">
						<text class="price-label">共计 {{num}} 件商品</text>
					</view>
				</view>
				<view class="p-price">
					<view class="price-item" :class="{dark: list.pay_status != 5}">
						<text class="price-label">总价</text>
						<view class="p-money">
							<text class="price-dw">¥</text>
							<text class="price-text">{{list.pay_price | moneyDwInt}}</text>
							<text>.{{list.pay_price | moneyDwPoint}}</text>

						</view>
					</view>
					<template v-if="list.pay_status == 5 || list.state == 2 || list.pay_status == 3">
						<view class="price-item">
							<text class="price-label">优惠</text>
							<view class="p-money">
								<text class="price-dw">¥</text>
								<text class="price-text">{{(list.coupon? list.coupon.coupon : 0) | moneyDwInt}}</text>
								<text>.{{(list.coupon? list.coupon.coupon : 0) | moneyDwPoint}}</text>

							</view>
						</view>
						<view class="price-item dark">
							<text class="price-label">实付款</text>
							<view class="p-money">
								<text class="price-dw">¥</text>
								<text class="price-text">{{list.final_price | moneyDwInt}}</text>
								<text>.{{list.final_price | moneyDwPoint}}</text>

							</view>
						</view>
					</template>

				</view>
			</view>
		</view>
		<view class="order-detail"
			v-if="list.state == 5 || (list.address_id == 0 && list.talk_price == 2 && list.buy_get_type !=1)">
			<view class="order-header">
				<view class="header-left">
					<view class="title">当前选择收货地址</view>
				</view>
				<view class="header-right">
					<u-button type="primary" size="mini" @click="chooseAddress">选择地址</u-button>
				</view>
			</view>
			<view class="info-row">
				<view class="info-value address">
					<template v-if="addressData.id">
						<template v-if="addressData.id != -1">
							<text>{{addressData.name}}</text>
							<text>{{addressData.mobile}}</text>
							<text>{{addressData.regional_name}}-{{addressData.address}}</text>
						</template>
						<template v-else>
							<text>{{addressData.address}}{{list.address ? '：'+ list.address : ''}}</text>
						</template>

					</template>
					<template v-else>
						<view>空</view>
					</template>
				</view>
			</view>
		</view>
		<view class="order-detail" v-if="list.pay_status == 0 && list.state == 1 && list.address_id != 0">
			<view class="order-header">
				<view class="header-left">
					<view class="title">当前选择的优惠券</view>
				</view>
			</view>
			<view class="info-row">
				<view class="info-value address">
					<template v-if="chooseCoupon.guid">
						<view>名称：{{chooseCoupon.title}}</view>
						<view>优惠额度：{{chooseCoupon.cate == 2?chooseCoupon.coupon/10:chooseCoupon.coupon }}
							{{chooseCoupon.cate == 2? '折': '元'}}
						</view>
						<view>使用限制：满 {{chooseCoupon.term}} 元使用</view>
						<view>编码：{{chooseCoupon.guid}}</view>
						<view>有效期开始：{{chooseCoupon.news_start}}</view>
						<view>有效期开始：{{chooseCoupon.news_end}}</view>
					</template>
					<template v-else>
						<view>空</view>
					</template>
				</view>
			</view>
		</view>
		<view class="order-detail" style="padding-bottom: 30rpx">
			<view class="order-header">
				<view class="header-left">
					<view class="title">订单信息</view>
				</view>
				<view class="header-right"></view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name1" class="info-label"></rich-text>
				<view class="info-value">{{list.c_name}}</view>
			</view>
			<view class="info-row" v-if="list.address && list.address_name">
				<rich-text :nodes="list.title.name2" class="info-label"></rich-text>
				<view class="info-value">{{list.address_name}}-{{list.address_mobile}}-{{list.address}}</view>
			</view>
			<view class="info-row" v-if="list.address_id == -1">
				<rich-text :nodes="list.title.name3" class="info-label"></rich-text>
				<view class="info-value">{{list.address ? list.address : '买家自提'}}</view>
			</view>
			<view class="info-row" v-if="list.self_time">
				<rich-text :nodes="list.title.name4" class="info-label"></rich-text>
				<view class="info-value">{{list.self_time}}</view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name5" class="info-label"></rich-text>
				<view class="info-value">{{list.id}}</view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name6" class="info-label"></rich-text>
				<view class="info-value">{{list.ctime}}</view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name7" class="info-label"></rich-text>
				<view class="info-value">
					<view class="p-money">
						<text class="price-text">{{list.product_price}} 元</text>
					</view>
				</view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name8" class="info-label"></rich-text>
				<view class="info-value">
					<view class="p-money">
						<text class="price-text">{{list.pay_price}} 元</text>
					</view>
				</view>
			</view>
			<view class="info-row" v-if="list.other">
				<rich-text :nodes="list.title.name22" class="info-label"></rich-text>
				<view class="info-value">
					<view class="p-money">
						<text class="price-text">{{list.other}}</text>
					</view>
				</view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name9" class="info-label"></rich-text>
				<view class="info-value">{{list.toState}}</view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name10" class="info-label"></rich-text>
				<view class="info-value">{{list.xcx_status_zzzz}}</view>
			</view>
			<view class="info-row" v-if="list.buy_get_type != 0 && list.buy_get_type != 1">
				<rich-text :nodes="list.title.name11" class="info-label"></rich-text>
				<view class="info-value">{{list.buy_get_type | buyGetType}}</view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name12" class="info-label"></rich-text>
				<view class="info-value">{{list.toTranState}}</view>
			</view>
			<view class="info-row" v-if="list.tran_id">
				<rich-text :nodes="list.title.name13" class="info-label"></rich-text>
				<view class="info-value">{{list.tran_id}}</view>
			</view>
			<view class="info-row" v-if="list.buy_get_type != 0 && list.buy_get_type != 1">
				<rich-text :nodes="list.title.name14" class="info-label"></rich-text>
				<view class="info-value">{{list.tran_price}} 元</view>
			</view>
			<view class="info-row">
				<rich-text :nodes="list.title.name15" class="info-label"></rich-text>
				<view class="info-value">{{list.toTools}}</view>
			</view>
			<view class="info-row" v-if="list.pay_tool == 2">
				<rich-text :nodes="list.title.name16" class="info-label"></rich-text>
				<view class="info-value">{{list.days || '未知'}} 天</view>
			</view>
			<view class="info-row" v-if="list.pay_tool == 2">
				<rich-text :nodes="list.title.name21" class="info-label"></rich-text>
				<view class="info-value">{{list.toAgreement}}</view>
			</view>
			<view class="info-row" v-if="list.pay_type">
				<rich-text :nodes="list.title.name17" class="info-label"></rich-text>
				<view class="info-value">{{list.toPayType}}</view>
			</view>
			<view class="info-row" v-if="list.coupon_guid && list.coupon_guid != 'undefined'">
				<rich-text :nodes="list.title.name18" class="info-label"></rich-text>
				<view class="info-value">
					<view class="value-item">
						{{list.coupon.title}}/{{`满${list.coupon.term}减${list.coupon_price}`}}/{{list.coupon_guid}}
					</view>
				</view>
			</view>
			<view class="info-row" v-if="list.pay_status == 5 || list.state == 2 || list.pay_status == 3">
				<rich-text :nodes="list.title.name19" class="info-label"></rich-text>
				<view class="info-value">
					<view class="p-money">
						<text class="price-text">{{list.coupon? list.coupon.coupon : 0}} 元</text>
					</view>
				</view>
			</view>
			<view class="info-row" v-if="list.pay_status == 5 || list.state == 2 || list.pay_status == 3">
				<rich-text :nodes="list.title.name20" class="info-label"></rich-text>
				<view class="info-value">
					<view class="p-money">
						<text class="price-text">{{list.final_price}} 元</text>
					</view>
				</view>
			</view>
		</view>

		<view class="tabbar-w safe-area-inset-bottom" v-if="list.state != 2 && list.state != 3">
			<view class="tabbar">
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button1">
					<u-button type="primary" shape="circle" @click="concatShop">
						<text class="btn-text">{{btnList.button1_name}}</text>
					</u-button>
				</view>
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button3">
					<u-button type="primary" :custom-style="customStyle" shape="circle" @click="showCouponList">
						<text class="btn-text">{{btnList.button3_name}}</text>
					</u-button>
				</view>							
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button2">
					<u-button type="warning" shape="circle" @click="cancleOrderBtn">
						<text class="btn-text">{{btnList.button2_name}}</text>
					</u-button>
				</view>
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button4">
					<u-button type="error" :custom-style="customStyle" shape="circle" @click="buyBtn">
						<text class="btn-text">{{btnList.button4_name}}</text>
					</u-button>
				</view>
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button5">
					<u-button type="primary" :disabled="!addressData.id" shape="circle" @click="setAddress">
						<text class="btn-text">{{btnList.button5_name}}</text>
					</u-button>
				</view>
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button6">
					<u-button shape="circle" @click="cancleOrderPrice">
						<text class="btn-text">{{btnList.button6_name}}</text>
					</u-button>
				</view>
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button7">
					<u-button type="primary" shape="circle" @click="confirmOrder">
						<text class="btn-text">{{btnList.button7_name}}</text>
					</u-button>
				</view>
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button8">
					<u-button type="error" plain shape="circle" @click="handleApplyTranSelf">
						<text class="btn-text">{{btnList.button8_name}}</text>
					</u-button>
				</view>
				<view class="tabbar-item tab-btn buy-btn" v-if="btnList.button9">
					<u-button type="primary" :disabled="list.tran_state == 0" shape="circle"
						@click="handleShowPwInput">
						<text class="btn-text">{{btnList.button9_name}}</text>
					</u-button>
				</view>
				<!-- <template v-if="list.state == 0">
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="primary" shape="circle" @click="concatShop">
							<text class="btn-text">我要议价，联系卖家</text>
						</u-button>
					</view>					
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="warning" shape="circle" @click="cancleOrderBtn">
							<text class="btn-text">取消订单</text>
						</u-button>
					</view>
				</template>
				<template v-if="
				list.pay_status == 0 
				&& list.state == 1 
				&& list.address_id != 0
				">
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="primary" :custom-style="customStyle" shape="circle" @click="showCouponList">
							<text class="btn-text">选择优惠券</text>
						</u-button>
					</view>					
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="warning" :custom-style="customStyle" shape="circle" @click="cancleOrderBtn">
							<text class="btn-text">取消订单</text>
						</u-button>
					</view>
					
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="error" :custom-style="customStyle" shape="circle" @click="buyBtn">
							<text class="btn-text">
								<template v-if="list.pay_tool == 2">
									支付账期
								</template>
								<template v-else>
									支付订单
								</template>
								
							</text>
						</u-button>
					</view>
				</template>
				<template
					v-if="list.state == 5 || (list.address_id == 0 && list.talk_price == 2 && list.buy_get_type !=1)">
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="primary" :disabled="!addressData.id" shape="circle" @click="setAddress">
							<text class="btn-text">提交收货地址</text>
						</u-button>
					</view>
				</template>
				<template v-if="list.state == 4">
					<view class="tabbar-item tab-btn buy-btn">
						<u-button shape="circle" @click="cancleOrderPrice">
							<text class="btn-text">退回订立价</text>
						</u-button>
					</view>
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="primary" shape="circle" @click="confirmOrder">
							<text class="btn-text">确认订立价</text>
						</u-button>
					</view>
				</template>
				<template v-if="
					list.tran_state == 0 
					&& (list.pay_status == 5 || list.pay_status == 9 || list.pay_status == 3) 
					&& list.address_id == -1"
				>
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="error" plain shape="circle" @click="handleApplyTranSelf">
							<text class="btn-text">申请提货</text>
						</u-button>
					</view>
				</template>
				<template v-if="(list.tran_state != 2 && list.pay_status == 5) || list.pay_status == 3">
					<view class="tabbar-item tab-btn buy-btn">
						<u-button type="primary" :disabled="list.tran_state == 0" shape="circle"
							@click="handleShowPwInput">
							<text class="btn-text">确认收货</text>
						</u-button>
					</view>
				</template> -->

			</view>

		</view>
		<u-popup v-model="cardshow" mode="bottom" safe-area-inset-bottom>
			<view class="card-wrapper">
				<card-seller :list="sellerInfo"></card-seller>
			</view>
		</u-popup>
		<u-popup v-model="pwInputShow" mode="center" width="80%" border-radius="10">
			<view class="header">请输入支付密码</view>
			<view class="content">
				<u-input type="password" v-model="pay_pw" placeholder="支付密码" border />
			</view>
			<view class="footer">
				<view class="footer-item">
					<u-button @click="canclePay">取消</u-button>
				</view>
				<view class="footer-item">
					<u-button @click="confirmSh" type="primary">确认</u-button>
				</view>

			</view>
		</u-popup>
		<u-popup v-model="codeInputShow" mode="center" width="80%" border-radius="10">
			<view class="header">请输入短信验证码</view>
			<view class="content">
				<u-input type="text" v-model="pay_code" placeholder="短信验证码" border />
			</view>
			<view class="footer">
				<view class="footer-item">
					<u-button @click="cancleCode">取消</u-button>
				</view>
				<view class="footer-item">
					<u-button @click="confirmSz" type="primary">确认</u-button>
				</view>

			</view>
		</u-popup>
		<!-- 优惠券面板 -->
		<u-popup mode="bottom" v-model="couponshow" height="800rpx">
			<view class="c-content">
				<List listType="dot" :list="couponList" emptyText="暂无优惠劵" emptyMode="order" :loadStatus="loadStatus">
					<template v-slot:dot="{item}">
						<view class="list-item">
							<CardCoupon :list="item" @handleClick="handleTake">
								<template #btnText>
									立即使用
								</template>
							</CardCoupon>
						</view>

					</template>
				</List>
			</view>
		</u-popup>
		<view class="refresh" @click="handleRefresh">
			<u-icon name="reload"></u-icon>
		</view>
	</view>
</template>

<script>
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	import CardSeller from '@/components/CardSeller/CardSeller'
	import CardCoupon from '@/components/CardCoupon/CardCoupon.vue';
	import List from '@/components/list/list.vue';
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				id: '',
				list: {},
				couponList: [],
				addressData: {},
				cardshow: false,
				pwInputShow: false,
				codeInputShow: false,
				couponshow: false,
				sellerInfo: {},
				pay_pw: '',
				pay_code: '',
				p: 1,
				endFlag: false,
				loadStatus: 'nomore',
				chooseCoupon: {},
				wxPay: 0,
				customStyle: {
					padding: "0 10rpx",
					fontSize: "26rpx"
				},
				btnList: {}
			};
		},
		onLoad(options) {
			if (options && options.id) {
				this.id = options.id
			}

		},
		onShow() {
			this.getData()
		},
		async onPullDownRefresh() {
			uni.showLoading({
				title: '获取数据中...'
			})
			await this.getData()
			uni.stopPullDownRefresh()
		},
		components: {
			CardSeller,
			CardCoupon,
			List
		},
		computed: {
			num() {
				if (!this.list.list_product || this.list.list_product.length == 0) {
					return 0
				}
				return this.list.list_product.reduce((prev, cur, index, arr) => {
					return prev + cur.number;
				}, 0)
			}
		},
		methods: {
			async handleRefresh() {
				uni.showLoading({
					title: '获取数据中...'
				})
				await this.getData()
			},
			handleShowPwInput() {
				uni.showModal({
					title: '提示',
					content: '是否确认收货？',
					confirmText: '确认收货',
					cancelText: '考虑一下',
					success: async (res) => {
						if (res.confirm) {
							if (this.wxPay) {
								this.confirmSh()
							} else if(this.list.pay_tool == 2) {
								// this.confirmSz()
								const sendRes = await this.sendCode()
								if(sendRes.data.code == 1) {
									this.codeInputShow = true
								}
								
							} else {
								this.pwInputShow = true
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
				})


			},
			async handleApplyTranSelf() {
				uni.showLoading({
					title: '操作中'
				})
				let res = await this.$http.get('Xcx/apply_tran_self', {
					params: {
						order_id: this.id
					}
				})
				uni.hideLoading()
				if (res.data.code == 1) {
					uni.showToast({
						title: '操作成功',
						success: () => {
							setTimeout(() => {
								this.getData()
							}, 1200)
						}
					})

				}
			},
			canclePay() {
				this.pwInputShow = false
			},
			async confirmSh() {
				//确认收货
				this.canclePay()
				uni.showLoading({
					title: '确认收货中'
				})
				let res = await this.$http.get(this.wxPay ? 'Xcx/sinopay_ok2' : 'Xcx/sinopay_ok', {
					params: {
						psw: this.pay_pw,
						order_id: this.id
					}
				})
				uni.hideLoading()
				// console.log(res)
				if (res.data.code == 1) {
					// uni.hideLoading()
					uni.showToast({
						title: '确认收货成功',
						success: () => {
							setTimeout(() => {
								this.getData()
							}, 1200)

						}
					})

				}

			},
			cancleCode() {
				this.codeInputShow = false
			},
			async sendCode() {
				uni.showLoading({
					title: '发送短信验证码中...'
				})
				let res = await this.$http.get('Xcx/get_mobile_code', {
					params: {
						order_id: this.id
					}
				})
				uni.hideLoading()
				return res
			},
			async confirmSz() {
				//赊账确认收货
				uni.showLoading({
					title: '确认收货中'
				})
				let res = await this.$http.get('Xcx/sinopay_ok3', {
					params: {
						order_id: this.id,
						code: this.pay_code
					}
				})
				uni.hideLoading()
				// console.log(res)
				if (res.data.code == 1) {
					// uni.hideLoading()
					this.cancleCode()
					uni.showToast({
						title: '确认收货成功',
						success: () => {
							setTimeout(() => {
								this.getData()
							}, 1200)

						}
					})

				}

			},
			concatShop() {
				this.cardshow = true

			},
			chooseAddress() {
				uni.navigateTo({
					url: '/pages/address/address?source=1'
				})
			},
			async setAddress() {
				uni.showLoading({
					title: '提交中'
				})
				let res = await this.$http.get('Xcx/set_buy_get_type', {
					params: {
						order_id: this.id,
						buy_address_id: this.addressData.id,
					}
				})
				uni.hideLoading()
				uni.showToast({
					title: '提交成功'
				})
				this.getData()
			},
			async confirmOrder() {
				uni.showLoading({
					title: '提交中'
				})
				let res = await this.$http.get('Xcx/check_tran_price', {
					params: {
						order_id: this.id
					}
				})
				uni.hideLoading()
				uni.showToast({
					title: '提交成功',
					success: () => {
						setTimeout(() => {
							this.getData()
						}, 1000)
					}
				})
			},
			async cancleOrderPrice() {
				uni.showLoading({
					title: '提交中'
				})
				let res = await this.$http.get('Xcx/roll_back_tran_price', {
					params: {
						order_id: this.id
					}
				})
				uni.hideLoading()
				uni.showToast({
					title: '操作成功',
					success: () => {
						setTimeout(() => {
							this.getData()
						}, 1000)
					}
				})

			},
			buyBtn() {
				if (!this.list.id) return
				if (!this.chooseCoupon.id && !this.chooseCoupon.guid) {
					uni.showModal({
						title: '优惠券提示',
						content: '当前订单未选择优惠券，是否放弃优惠直接付款',
						confirmText: '放弃优惠',
						cancelText: '考虑一下',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: `/pages/money/pay?orderid=${this.id}&price=${this.list.pay_price}`
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.navigateTo({
						url: `/pages/money/pay?orderid=${this.id}&price=${this.list.pay_price}&coupon_guid=${this.chooseCoupon.guid}&coupon_id=${this.chooseCoupon.cid}&coupon_cate=${this.chooseCoupon.cate}&coupon_coupon=${this.chooseCoupon.coupon}`
					})
				}

			},
			cancleOrderBtn() {
				if (!this.list.id) return
				uni.showModal({
					title: '提示',
					content: '是否取消本订单？',
					confirmText: '取消订单',
					cancelText: '考虑一下',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '操作中'
							})
							this.$http.get("Xcx/order_cancel", {
									params: {
										order_id: this.id
									}
								})
								.then(res2 => {
									uni.hideLoading()
									if (res2.data.code == 1) {
										uni.showToast({
											title: '操作成功',
											success: () => {
												setTimeout(() => {
													this.getData()
												}, 1000)
											}
										})
									}
								})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async getData() {
				uni.showLoading({
					title: '加载中...'
				})
				let res = await this.$http.get('Xcx/order_detail', {
					params: {
						order_id: this.id
					}
				})
				uni.hideLoading()
				this.list = res.data.list
				this.btnList = res.data.button
				this.sellerInfo = res.data.sell_cards
				this.wxPay = res.data.wx_pay
				if (this.list.pay_status == 0 && this.list.state == 1) {
					this.getCoupon()
				}
			},
			showCouponList() {
				this.couponshow = true
			},
			async getCoupon() {
				if (Object.keys(this.$store.state.couponCate).length == 0) {
					let res = await this.$http.get('Xcx/coupon_list_login')
					this.$store.commit('getCouponCate', res.data.list.cate)
				}

				let list = await this.$http.post('Xcx/shop_coupon_login_list', {
					login: uni.getStorageSync('login'),
					order_id: this.id
				})
				this.couponList = list.data.list.list.map(ele => {
					if (ele.term > this.list.pay_price) {
						ele.disabled = true
					} else {
						ele.disabled = false
					}
					return ele
				})
				// if (this.p == list.data.list.pages) {
				// 	this.loadStatus = 'nomore'
				// 	this.endFlag = 'true'
				// } else this.loadStatus = 'loadmore'
			},
			async handleTake(item) {
				console.log(item)
				//获取该优惠劵的商品范畴
				let res1 = await this.$http.get('Xcx/oupon_product_list', {
					params: {
						id: item.cid
					}
				})
				if (res1.data.code == 1) {
					let list = res1.data.list

					let couponList = this.list.list_product.filter(ele => {
						return list.includes(ele.pid)
					})
					if (couponList.length == 0) {
						uni.showToast({
							title: '无法使用该优惠劵',
							icon: 'none'
						})
					} else {
						let money = couponList.reduce((prev, cur, index, arr) => {
							return prev + cur.pay_price;
						}, 0)
						if (money < item.term) {
							uni.showToast({
								title: '无法使用该优惠劵',
								icon: 'none'
							})
							return
						}

						let res = await this.$http.get('Xcx/get_use_coupon', {
							params: {
								cno: item.guid
							}
						})
						if (res.data.list.code == 1) {
							this.chooseCoupon = item
							this.couponshow = false
							uni.showToast({
								title: '已选择优惠券'
							})

						} else {
							uni.showToast({
								title: res.data.list.msg,
								icon: 'none'
							})
						}

					}

				}
				//判断优惠劵是否有效

			},
		},
	}
</script>
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	.refresh {
		position: fixed;
		right: 30rpx;
		bottom: 200rpx;
		background-color: $uni-color-theme;
		color: #fff;
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, .2);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		border: 4rpx solid #fff;
	}

	.c-content {
		padding: 20rpx;

		.list-item {
			margin-bottom: 10rpx;
		}
	}

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

	.card-wrapper {
		padding: 20rpx 20rpx 40rpx;
	}

	.w {
		padding-bottom: 150rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-top: 10rpx;
	}

	.order-detail {
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 20rpx;

		.order-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32rpx;
			margin-bottom: 20rpx;
			padding: 20rpx;
			border-bottom: 1rpx solid #e7e7e7;
		}

		.info-row {
			display: flex;
			// justify-content: space-between;
			padding: 0 20rpx;
			align-items: center;
			min-height: 50rpx;
			margin-bottom: 20rpx;

			.info-label {
				flex: 0 0 200rpx;
				width: 200rpx;
				color: #666;
				font-size: 24rpx;
			}

			.info-value {
				flex: 1;
				color: #000;

				&.address {
					padding-bottom: 20rpx;

					text {
						padding-right: 20rpx;
						line-height: 50rpx;
					}

					view {
						margin-bottom: 10rpx;
					}
				}

				.info-text {
					padding-right: 20rpx;
				}
			}
		}
	}

	.card {
		margin-bottom: 20rpx;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		border-radius: 20rpx;
		padding: 20rpx;
		min-height: 200rpx;

		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 15rpx;
			margin-bottom: 20rpx;
			border-bottom: 1rpx solid #f5f5f5;

			.header-left {
				display: flex;

				.left-item {
					display: flex;
					align-items: center;

					.shop-name {
						font-weight: bold;
						font-size: 30rpx;
						padding: 0 10rpx;
					}
				}
			}

			// .header-right {
			// 	.right-item {
			// 		.status-text {
			// 			color: red;
			// 			// font-size: 24rpx;
			// 		}
			// 	}
			// }
		}

		.card-content {
			.p-list {
				margin-bottom: 20rpx;

				.p-list-item {
					display: flex;
					margin-bottom: 20rpx;

					.p-img {
						flex: 0 0 160rpx;
						height: 160rpx;
						position: relative;
						border-radius: 10rpx;
						overflow: hidden;
						margin-right: 20rpx;

						&:after {
							content: '';
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							background-color: rgba(0, 0, 0, 0.1);
						}
					}

					.p-info {
						flex: 1;
						overflow: hidden;

						.p-info-name {
							// font-size: 30rpx;
							overflow: hidden;
							-o-text-overflow: ellipsis;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							line-height: 40rpx;
							margin-bottom: 10rpx;
							font-weight: bold;
						}

						.p-info-sub {
							color: #999;
							font-size: 24rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 100%;
						}
					}

					.p-info-money {
						// flex-basis: 120rpx;
						min-width: 120rpx;
						padding-left: 30rpx;
						text-align: right;

						.p-count {
							color: #999;
							padding-top: 10rpx;
						}
					}
				}

			}

			.p-price {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				height: 60rpx;

				.price-item {
					display: flex;
					align-items: baseline;
					padding-left: 20rpx;
					color: #999;

					&.dark {
						color: #000;
						font-weight: bold;
					}

					.price-label {
						padding-right: 5rpx;
					}
				}
			}
		}

		.card-footer {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 80rpx;

			.footer-item {
				padding-left: 30rpx;
			}
		}
	}

	.p-money {
		font-size: 24rpx;

		.price-dw {
			font-family: '微软雅黑';
			padding-right: 8rpx;
		}

		.price-text {
			font-size: 30rpx;
		}

	}

	.tabbar-w {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		z-index: 500;

		.tabbar {
			display: flex;
			align-items: center;
			height: 110rpx;
			border-top: 1rpx solid #e7e7e7;
			padding: 0 20rpx;

			.tabbar-item {
				margin: 0 15rpx;

				&:first-child {
					margin-left: 0;
				}

				&:last-child {
					margin-right: 0;
				}

				&.tab-icon-btn {
					display: flex;
					flex-direction: column;
					align-items: center;

					.item-icon {
						color: #000;
						font-size: 24rpx;

						&:first-child {
							font-size: 46rpx;
						}
					}
				}

				&.tab-btn {
					.btn-text {
						margin-left: 8rpx;
					}

					&.buy-btn {
						flex: 1;
					}

				}
			}
		}
	}
</style>
