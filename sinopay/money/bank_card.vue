<template>
	<view class="w">
		<view class="tabs-w">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			>  
			</u-tabs>
		</view>
			<u-parse :html="content"></u-parse>
		<view class="list">
			<List
				listType="dot"
				:list="indexList" 
				emptyText="列表为空"
				emptyMode="list"
				:loadStatus="loadStatus"
			>
				<template v-slot:dot="{item}">
					<view class="u-p-10">
						<view class="u-p-20 bg-white u-radius-10 uni-shadow-base" v-if="item">
							<view class="header u-p-10  u-m-b-10 u-flex u-flex-between text-base u-flex-items-center u-font-28">
								<view class="item">
									{{item.ctime}}
								</view>
								<view class="item u-flex u-flex-items-center" :class="{
									'text-success': item.state == '1' || item.status == '1'
								}">
									<u-button type="error" size="mini" plain v-if="item.state == '1' || item.status == '1'" @click="unbindBtn(item)">解绑</u-button>
									<text class="u-m-l-20">{{(item.state == '1' || item.status == '1') ? '已绑定' : '待绑定'}}</text>
								</view>  
							</view>
							<BankCard
								:bank_class="item.bank_class"
								:bank_name="item.bank_name"
								:bank_sub="item.bank_accname"
								:bank_no="`**** **** **** ${item.bank_accno}`"
								:origin="item"
								@detail="handleCardDetail"
							></BankCard>
							
						</view>
						
					</view>
					
				</template>
			</List> 
		</view>
		<tabBar :customStyle="{
			'boxShadow': '0 0 10rpx rgba(0,0,0,.1)'
		}">
			<view class="u-flex u-flex-items-center u-p-20"> 
				<view class="u-flex-1 u-m-r-10" v-if="tabs_current == '0' " >
					<u-button type="error" shape="circle" icon="plus-circle" @click="handleGoto('/sinopay/money/card_add')">添加银行卡</u-button>
				</view>
				<view class="u-flex-1 u-m-l-10" >
					<u-button type="primary" shape="circle" icon="file-text" @click="show_zzlc = true">转账充值流程</u-button>
				</view>
			</view>
		</tabBar>
		
		
		<ZzCzPopup
			:show="show_zzlc"
			@close="show_zzlc = false"  
			></ZzCzPopup>
	 
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import BankCard from '@/sinopay/components/BankCard/BankCard.vue'
	import ZzCzPopup from '@/sinopay/components/ZzCzPopup/ZzCzPopup.vue'
	import List from '@/components/list/list.vue'
	export default {
		data() {
			return {
				content: '',
				wallet_type: 'B',
				keyword: '', 
				tabs_current: 0,
				activeTabsStyle: {
					fontSize: '34rpx',
					fontWeight: 'bold',
					color: '#007aff'
				},
				itemTabsStyle: {
					height: '44px',
					padding: '0 13px'
				},
				tabs_list: [
					{
						name: '认证与提现卡',
						disabled: false,
						state: 'all',
						cate: 0,
					},
					{
						name: '银联充值卡',
						disabled: false,
						state: '1',
						cate: 2,
					}, 
					// {
					// 	name: '已解绑',
					// 	disabled: false,
					// 	state: '3'
					// },
					// {
					// 	name: '绑定失败',
					// 	disabled: false,
					// 	state: '2'
					// },
				],
				wallet_current: 0,
				wallet_list: [
					{
						name: '付款账户',
						value: 'B', 
					},
					{
						name: '收款账户',
						value: 'S', 
					},
				],
				indexList: [],
				curP: 1,
				show_zzlc: false,
				loadstatus: 'nomore',
			};
		},
		onLoad(opt) {
			if(opt.hasOwnProperty('current')) {
				this.tabs_current = opt.current
			}
			if(opt.hasOwnProperty('wallet')) {
				this.wallet_type = opt.wallet
				this.wallet_current = Number(this.wallet_list.findIndex(ele => ele.value == this.wallet_type))
			}
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({ 
				sino: state => state.sinopay.sino, 
				sino_zh: state => state.sinopay.sino_zh, 
			}),
			// themeConfig() {
			// 	return this.typeConfig.white
			// },
			// list() {
			// 	if(this.tabs_list[this.tabs_current].state == 'all') return this.indexList
			// 	return this.indexList.filter(ele => ele.state == this.tabs_list[this.tabs_current].state )
			// },
			wallet() { 
				return this.sino_zh[this.wallet_type].info || {}
			},
		},
		components: {
			BankCard,
			ZzCzPopup,
			List
		},
		onReachBottom() {
			this.scrolltolower()
		},
		async onPullDownRefresh() {
			uni.showLoading()
			await this.refreshList()
			uni.stopPullDownRefresh();
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto'
			}),
			async refreshList() {
				this.initParamas()
				await this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				// this.loadstatus = 'loadmore'
			},
			handleSearch(v) {
				console.log(v)
			},
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			}, 
			async handleTabsChange(value) {
				this.changeTabsStatus('disabled', true)
				this.tabs_current = value  
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			scrolltolower() {
				// this.getMoreData()
			},
			async getData() { 
				const res = await this.$http.get('market/bankcard', {
					params: {
						user_fundaccno: this.wallet.user_fundaccno,
						cate: this.tabs_list[this.tabs_current].cate
					}
				})
				if(res.data.code == 1) {
					this.indexList = res.data.list.list
					this.content = res.data.info
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			handleCardDetail({id}) {
				if(this.tabs_current == 1) return 
				uni.navigateTo({
					url: `/sinopay/money/bank_card_detail?bid=${id}&aid=${this.wallet.user_fundaccno}` 
				})
			},
			unbindBtn(data) { 
				uni.showModal({
					title: '解绑提示',
					content: `是否解绑当前银行卡(${data.bank_accno})`,
					success: async (res) => {
						if (res.confirm) {
							let func = 'market/unbind'
							if(this.tabs_current == '1') {
								func = 'market/unbind1'
							}
							uni.showLoading()
							const r = await this.$http.get(func, {
								params: {
									user_fundaccno: this.wallet.user_fundaccno,
									bind_id: data.id
								}
							})
							if(r.data.code == 1) {
								uni.showToast({
									title: r.data.msg,
									icon: 'none'
								})
								this.refreshList()
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2; 
	}
</style>
<style lang="scss" scoped> 
	.boxbox { 
	}
	.w {  
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
	.list { 
		padding-bottom: 60px
	}
	
</style>
