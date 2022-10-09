<template>
	<view class="w">
		<view class="search-wrapper u-flex u-p-l-20 u-p-r-20">
			<view class="item u-flex-1 u-p-b-10">
				<u-search 
					:placeholder="placeholder" 
					v-model="keyword"
					clearabled
					:showAction="false"
					bgColor="#e8e8e8"
					@search="handleSearch"
				></u-search>
			</view>
			
		</view>
		<view class="tabs-w">
			<u-tabs
				:list="tabs_list"
				:current="tabs_current"
				lineHeight="0"
				:activeStyle="activeTabsStyle"
				:itemStyle="itemTabsStyle"
				@change="handleTabsChange"
			> 
				<!-- <view
					slot="right"
					class="u-p-r-20 u-flex u-flex-items-center" 
					style="width: 100px;"
				>
					<u-subsection 
						:list="mode_list" 
						mode="button" 
						:current="mode_current"
						keyName="name"
						@change="subsectionChange"
						></u-subsection>
				</view> -->
			</u-tabs>
		</view>
		
		<view class="list" >
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
						<BillCard
							:paytype="tabs_list[tabs_current].paytype"
							:mode="mode_list[mode_current].value"
							:detailData="item"
							@detail="handleBillDetail"
						></BillCard>
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
	import BillCard from '@/sinopay/components/BillCard/BillCard.vue'
	export default {
		data() {
			return {
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
						name: '付款列表',
						disabled: false,
						paytype: 'B'
					},
					{
						name: '收款列表',
						disabled: false,
						paytype: 'S'
					},
				],
				mode_current: 0,
				mode_list: [
					{
						name: '现金',
						value: 'FUNDPAY',
						func: 'sino_fund_order_list_order',
					},
					{
						name: '票据',
						value: 'BILLPAY',
						func: 'sino_bill_order_list',
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore'
			};
		},
		watch: {
			mode_current(index) {
				if(this.mode_list[index].value == 'FUNDPAY') {
					this.tabs_list[0].name = '付款列表'
					this.tabs_list[1].name = '收款列表'
				}else if(this.mode_list[index].value == 'BILLPAY') {
					this.tabs_list[0].name = '买方支付列表'
					this.tabs_list[1].name = '卖方支付列表'
				}
			}
		},
		onLoad(options) {
			if(options.hasOwnProperty('current')) {
				this.tabs_current = Number(options.current)
			}
			if(options.hasOwnProperty('mode_current')) {
				this.mode_current = Number(options.mode_current)
			}
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
			placeholder() {
				if(this.tabs_list[this.tabs_current].paytype == 'S') return '输入买方关键字'
				return '输入卖方关键字'
			}
		}, 
		components: {
			BillCard
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
				this.initParamas();
				uni.showLoading();
				this.getData()
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
				this.keyword = ''
				this.initParamas();
				uni.showLoading();
				await this.getData()
				this.changeTabsStatus('disabled', false)
			},
			async subsectionChange(index) { 
				this.changeTabsStatus('disabled', true)
				this.mode_current = index
				this.keyword = ''
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
				const res = await this.$api[this.mode_list[this.mode_current].func]({
					params: {
						paytype: this.tabs_list[this.tabs_current].paytype,
						p: this.curP,
						company: this.keyword
					},
				})
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
			handleBillDetail(data) {
				
				uni.navigateTo({
					url: `/sinopay/money/bill_detail?id=${data.id}&paytype=${this.tabs_list[this.tabs_current].paytype}&mode=${this.mode_list[this.mode_current].value}`
				})
			}
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
		height: calc(100% - 83px);
		
	}
</style>
