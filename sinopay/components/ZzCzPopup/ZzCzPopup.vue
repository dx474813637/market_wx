<template>
	<view class="">
		<u-popup
			v-model="show" 
			mode="bottom"  
			@close="close"
			@open="open" 
			>
			<view class="wrapper" >
				<view class="header u-p-18" >
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-32">转账充值流程</text>
						</view>
					</view>
				</view>
				<scroll-view scroll-y class="main" :style="{
					backgroundColor: '#f8f8f8',
				}"> 
						<view class="u-p-20">
							<view class="u-radius-10 bg-white uni-shadow-base u-p-20 u-flex u-flex-items-center u-m-b-20">
								<view class="item">
									<u-image src="http://zc.toocle.com/Public/wp/img/yd1.png" mode="aspectFit" width="60" height="60"></u-image>
								</view>
								<view class="item u-m-l-20">
									<view class="u-font-28 u-m-b-10">手机端下载并安装“平安数字口袋APP” </view>
									<view class="u-font-24 text-base">安卓市场或苹果商店自行下载</view> 
								</view>
							</view>
							<view class="u-radius-10 bg-white uni-shadow-base u-m-b-20 boxbox">
								<view class="header u-p-20 bg-grey u-flex u-flex-items-center u-flex-between u-m-b-20">
									<view class="item u-flex u-flex-items-center">
										<i class="custom-icon-vipcard custom-icon text-primary"></i>
										<text class="u-font-28 u-m-l-20">转账白名单流程</text>
									</view>
								</view>
								 <view class="ctx u-p-l-30 u-p-r-30">
									  <u-swiper
										 :list="imgList"
										 indicator
										 indicatorMode="line"
										 keyName="url" 
										 height="500"
										 interval="6000"
										 imgMode="scaleToFill"
										 @change="swiperChange"
										></u-swiper> 
										<view class="u-p-t-30 u-p-b-40 u-font-28 u-text-center text-base">
											<view class="u-m-b-10">
												{{imgList[img_index].title}}
											</view>
											<view class="">
												{{imgList[img_index].sub}}
											</view> 
										</view>  
								 </view>
							</view>
							<view class="u-radius-10 bg-white uni-shadow-base u-m-b-20 boxbox">
								<view class="header u-p-20 bg-grey u-flex u-flex-items-center u-flex-between">
									<view class="item u-flex u-flex-items-center">
										<i class="custom-icon-searchlist custom-icon text-primary"></i>
										<text class="u-font-28 u-m-l-20">转账白名单-申请记录</text>
										<i class="custom-icon-refresh custom-icon u-m-l-10 u-font-28 text-error" @click="open"></i>
									</view>
									<view class="item u-flex u-flex-items-center">
										<text class="text-base u-font-28" @click="handleGoto({url: '/sinopay/money/sino_cz_list', params: {wallet: sinoType, tabs_current: '3'}})">转账充值记录>></text>
									</view>
								</view>
								 <view class="ctx u-p-20">
									 <view class="u-p-l-20 u-p-r-20 u-font-28 u-m-b-20 text-light2">
										  <view class="">“转账白名单”成功的银行卡，方可进行转账充值操作</view> 
									 </view>
									 <view class="u-radius-10 u-p-20" style="background-color: #f8f8f8;position: relative;min-height: 60px;">
									 	<view class="item u-flex u-flex-items-center u-m-b-20">
									 		<view class="u-font-28 text-base" style="flex: 0 0 100px">现金账户</view>
									 		<view class="u-font-28 u-flex-1 u-text-center">银行卡号</view>
									 		<view class="u-font-28 u-text-right" style="flex: 0 0 90px">状态</view>
									 	</view> 
										<view class="cmain" v-if="deposit_white_list.list_binds"> 
											<view class="item u-flex u-flex-items-center u-m-b-20" v-for="(item, index) in deposit_white_list.list_binds" :key="item.id">
												<view class="u-font-28 text-base" style="flex: 0 0 100px">{{item.user_fundaccno}}</view>
												<view class="u-font-28 u-flex-1 u-text-center">{{item.bank_accno}}</view>
												<view class="u-font-28 u-text-right " style="flex: 0 0 90px; color: #007aff">{{item.qingfen_state | qingfen_state2Str}}</view>
											</view> 
										</view>
										<view class="" v-else>
											<u-empty
												mode="data"
												:icon="typeConfig.white.empty"
											>
											</u-empty>
										</view>
										<view class="juzhong u-flex u-flex-items-center u-flex-center" v-if="loading">
											<u-loading mode="circle" size="45"></u-loading>
										</view> 
									 </view> 
								 </view>
							</view>
							<view class="u-radius-10 bg-white uni-shadow-base u-m-b-20 boxbox">
								<view class="header u-p-20 bg-grey u-flex u-flex-items-center u-flex-between">
									<view class="item u-flex u-flex-items-center">
										<i class="custom-icon-moneybag custom-icon text-primary"></i>
										<text class="u-font-28 u-m-l-20">转入账号</text>
										<text class="u-font-24 text-base u-m-l-10">[转账成功后即时入账至您的支付账号]</text>
									</view>
								</view>
								 <view class="ctx u-p-20">
									 <view class="u-p-l-20 u-p-r-20 u-font-28 u-m-b-20 text-light2">
										  <view class="">个人用户，可使用手机银行，</view>
										  <view class="">企业用户可使用网银，向以下账户发起转账：</view>
									 </view>
									 <view class="u-radius-10 u-p-20" style="background-color: #f8f8f8;">
									 	<view class="item u-flex u-flex-items-center u-m-b-20">
									 		<view class="u-font-28 text-base" style="flex: 0 0 60px">户名</view>
									 		<view class="u-font-28 u-flex-1 u-text-right text-error">平安银行电子商务交易资金待清算专户（网盛生意宝）</view>
									 		<view class="u-m-l-20" >
												<u-tag text="复制" size="mini" type="primary" @click="copy('平安银行电子商务交易资金待清算专户（网盛生意宝）')"></u-tag>
											</view>
									 	</view>
									 	<view class="item u-flex u-flex-items-center u-m-b-20">
									 		<view class="u-font-28 text-base" style="flex: 0 0 60px">账号</view>
									 		<view class="u-font-28 u-flex-1 u-text-right text-error">15000103221134</view>
									 		<view class="u-m-l-20" >
												<u-tag text="复制" size="mini" type="primary" @click="copy('15000103221134')"></u-tag> 
											</view>
									 	</view>
									 	<view class="item u-flex u-flex-items-center u-m-b-20">
									 		<view class="u-font-28 text-base" style="flex: 0 0 60px">户名</view>
									 		<view class="u-font-28 u-flex-1 u-text-right text-error">平安银行西湖支行</view>
									 		<view class="u-m-l-20" >
												<u-tag text="复制" size="mini" type="primary" @click="copy('平安银行西湖支行')"></u-tag>  
											</view>
									 	</view>
									 </view>
								 </view>
							</view>
						</view> 
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return { 
				img_index: 0,
				imgList: [
					{
						image: 'http://zc.toocle.com/Public/wp/img/bank-card-cz1.jpg',
						title: '以提现卡对应的手机号注册',
						sub: '并登录，进入：商户专区',
					},
					{
						image: 'http://zc.toocle.com/Public/wp/img/bank-card-cz2.jpg',
						title: '进入：转账白名单维护',
						sub: '—>待确认页',
					},
					{
						image: 'http://zc.toocle.com/Public/wp/img/bank-card-cz3.jpg',
						title: '对待确认记录，点击右上角的“添加”',
						sub: '后续，白名单确认完成后，可进行转账充值',
					},
				], 
				deposit_white_list: {},
				loading: false
			}
		},
		filters: {
			qingfen_state2Str: v => {
				if(v == 1) return '已受理'
				else if(v == 2) return '已添加成功'
				else if(v == 0) return '未添加'
				return ''
			}
		},
		computed: {
			...mapState({ 
				sino_zh: state => state.sinopay.sino_zh,
			}),
		},
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			aid: {
				type: String,
				default: ''
			},
			sinoType: {
				type: String,
				default: 'B'
			}
		},  
		mounted() {
			
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto'
			}),
			close() {
				this.$emit('close')
			},
			async open() { 
				this.loading = true
				await this.getData() 
				this.loading = false
			},
			swiperChange(e) {   
				this.img_index = e
			},
			copy(data) {
				uni.setClipboardData({
					data: data,
					success: function () {
						console.log('success');
					}
				});
			},
			async getData() {
				const res = await this.$http.get('market/bankcard', {params: {
					user_fundaccno: this.sino_zh.B.info.user_fundaccno,
					cate: 3
				}})
				if(res.data.code == 1) {
					this.deposit_white_list = res.data.list.result
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		width: 100%;
		border-radius: 30rpx 30rpx 0 0 ;
		overflow: hidden;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			left: 50%;
			top: 5px;
			transform: translateX(-50%);
			width: 25%;
			height: 4px;
			background-color: #eee;
			border-radius: 8px;
			
		}
		.header {
		}
		.main {
			background-color: #f8f8f8;
			height: 70vh;
			width: 100%;
			box-sizing: border-box;
		}
	}
	.boxbox {
		overflow: hidden;
	}
	.juzhong {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%; 
		background-color: rgba(255,255,255,.8);
	}
</style>