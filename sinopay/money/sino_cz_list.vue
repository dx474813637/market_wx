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
		
		<view class="list">
			<template v-if="indexList.length > 0">
				<view 
					class="list-item"
					v-for="(item, index) in indexList"
					:key="item.id"
				>
					<view>
						<view class="u-p-l-20 u-p-r-20 u-p-t-10 u-p-b-10">
							<CzCard
								v-if="tabs_list[tabs_current].value == 'cz' || tabs_list[tabs_current].value == 'tx'"
								:detailData="item"
								:type="tabs_list[tabs_current].value"
								@detail="handleCzDetail"
							></CzCard>
							<ZzCzCard
								v-if="tabs_list[tabs_current].value == 'zzcz'"
								:detailData="item"
								:type="tabs_list[tabs_current].value"
								@detail="handlezzCzDetail"
							></ZzCzCard>
						</view>
					</view>
					
				</view>
				<u-loadmore 
					:status="loadStatus" 
					:icon-type="iconType" 
					:load-text="loadText" 
					margin-top="20"
					margin-bottom="20"
					color="#999"
				/>
			</template>
			<template v-else>
				<u-empty text="列表为空" mode="list" margin-top="20"></u-empty>
			</template>
			<!-- <List
				listType="dot"
				:list="indexList"
				emptyText="列表为空"
				emptyMode="list"
				:loadStatus="loadStatus"
			>
				<template v-slot:dot="{item}">
					<view class="u-p-l-20 u-p-r-20 u-p-t-10 u-p-b-10">
						<CzCard
							v-if="tabs_list[tabs_current].value == 'cz' || tabs_list[tabs_current].value == 'tx'"
							:detailData="item"
							:type="tabs_list[tabs_current].value"
							@detail="handleCzDetail"
						></CzCard>
					</view>
					
				</template>
			</List>  -->
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import CzCard from '@/sinopay/components/CzCard/CzCard.vue'
	import ZzCzCard from '@/sinopay/components/ZzCzCard/ZzCzCard.vue'
	import tmzzCard from '@/sinopay/components/tmzzCard/tmzzCard.vue'
	import txzzCard from '@/sinopay/components/txzzCard/txzzCard.vue'
	import List from '@/components/list/list.vue'
	export default {
		data() {
			return {
				type: 'B', //付B - 收S
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
						name: '提现列表',
						disabled: false,
						value: 'tx',
						func: 'market/withdraw_list',
					},
					{
						name: '充值列表',
						disabled: false,
						value: 'cz',
						func: 'market/recharge_list', 
					},
					// {
					// 	name: '同名账户转账',
					// 	disabled: false,
					// 	value: 'tmzz',
					// 	func: 'sino_fund_account_list_tran',
					// },
					{
						name: '转账充值',
						disabled: false,
						value: 'zzcz',
						func: 'market/list_bind_deposit',
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				codeInputShow: false,
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				}
			};
		},
		onLoad(options) {
			if(options.hasOwnProperty('tabs_current')) {
				this.tabs_current = Number(options.tabs_current)
			}
			if(options.hasOwnProperty('wallet')) {
				this.type = options.wallet
			}
			uni.setNavigationBarTitle({
				title: this.type == 'B'? '付款账户' : '收款账户'
			})
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({ 
				sino_zh: state => state.sinopay.sino_zh,
			}),
			// accId() {
			// 	return this.sinoFund.filter(ele => ele.type == this.type)[0]?.id
			// }
		},
		components: {
			CzCard,
			ZzCzCard,
			tmzzCard,
			txzzCard,
			List
		},
		onReachBottom() {
			this.scrolltolower()
		},
		methods: {
			refreshList() {
				this.initParamas()
				this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
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
				this.getMoreData()
			}, 
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				let item = this.tabs_list[this.tabs_current]
				let func = item.func 
				let params = {
					p: this.curP
				}
				// if(item.value == 'cz' || item.value == 'tx' || item.value == 'txzz') {
				// 	params.account_id = this.accId
				// } 
				const res = await this.$http.get(func, {params})
				if(res.data.code == 1) { 
					this.indexList = [...this.indexList, ...res.data.list.list]
					if(this.curP >= res.data.list.pw_page_total) {
						this.loadstatus = 'nomore'
					}else {
						this.loadstatus = 'loadmore'
					}
				}
			},
			async getMoreData() {
				if(this.loadstatus != 'loadmore') return
				this.curP ++
				await this.getData()
			},
			handleCzDetail({id, refund_id, quick_id}) {
				// if(this.tabs_current != 0) return
				uni.navigateTo({
					url: `/sinopay/money/sino_cz_detail?id=${refund_id || quick_id}&type=${this.tabs_list[this.tabs_current].value}`
				})
			}, 
			handlezzCzDetail(data) {
				
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
	.w { 
	}
	.list { 
		
	}
</style>
