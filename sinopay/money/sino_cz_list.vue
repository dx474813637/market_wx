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
			<!-- <u-list
				height="100%"
				enableBackToTop
				@scrolltolower="scrolltolower"
				:preLoadingScreen="100"
			>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="item.id"
				>
					<view class="u-p-10">
						<CzCard 
							v-if="tabs_list[tabs_current].value == 'cz' || tabs_list[tabs_current].value == 'tx'"
							:detailData="item"
							:type="tabs_list[tabs_current].value"
							@detail="handleCzDetail"
						></CzCard>
						<txzzCard 
							v-if="tabs_list[tabs_current].value == 'txzz' "
							:detailData="item"
							:type="tabs_list[tabs_current].value" 
						></txzzCard>
						<tmzzCard 
							v-else-if="tabs_list[tabs_current].value == 'tmzz'"
							:detailData="item"
							:type="tabs_list[tabs_current].value" 
							 @refresh="refreshList"
						></tmzzCard>
					</view>
					
				</u-list-item>
				
				<template name="dataStatus">
					<template v-if="indexList.length == 0">
						<u-empty
							mode="data"
							:icon="typeConfig.white.empty"
						>
						</u-empty>
					</template>
					<template v-else>
						<u-loadmore
							:status="loadstatus"
						/>
					</template>
				</template>
				
			</u-list> -->
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import CzCard from '@/sinopay/components/CzCard/CzCard.vue'
	import tmzzCard from '@/sinopay/components/tmzzCard/tmzzCard.vue'
	import txzzCard from '@/sinopay/components/txzzCard/txzzCard.vue'
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
						name: '提现记录',
						disabled: false,
						value: 'tx',
						func: 'sino_fund_refund_list_refund',
					},
					{
						name: '网银充值记录',
						disabled: false,
						value: 'cz',
						func: 'sino_fund_account_list_charge', 
					},
					{
						name: '同名账户转账',
						disabled: false,
						value: 'tmzz',
						func: 'sino_fund_account_list_tran',
					},
					{
						name: '提现卡转账',
						disabled: false,
						value: 'txzz',
						func: 'sino_fund_deposit_list_bind_deposit',
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore',
				codeInputShow: false,
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
				typeConfig: state => state.theme.typeConfig,
				sinoFund: state => state.sinopay.sinoFund,
			}),
			accId() {
				return this.sinoFund.filter(ele => ele.type == this.type)[0]?.id
			}
		},
		components: {
			CzCard,
			tmzzCard,
			txzzCard
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
				this.tabs_current = value.index
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
				if(item.value == 'cz' || item.value == 'tx' || item.value == 'txzz') {
					params.account_id = this.accId
				} 
				const res = await this.$api[func]({params})
				if(res.code == 1) {
					this.indexList = [...this.indexList, ...res.list]
					if(this.indexList.length >= res.total) {
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
			handleCzDetail({id}) {
				if(this.tabs_current != 0) return
				uni.navigateTo({
					url: `/sinopay/money/sino_cz_detail?id=${id}`
				})
			}, 
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
		height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.w {
		height: 100%;
	}
	.list {
		height: calc(100% - 44px);
		
	}
</style>
