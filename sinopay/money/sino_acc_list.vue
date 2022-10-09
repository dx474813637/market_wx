<template>
	<view class="w">
		
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
					<view class=" u-p-20">
						<view class="u-p-20 bg-white u-radius-10 u-p-l-30 u-p-r-30 u-font-28">
							<view class="header u-flex u-flex-items-center u-flex-between u-p-b-10 u-border-bottom">
								<view class="item text-base">
									{{item.id}}
								</view>
								<view class="item " :class="{
									'text-success': item.state == 2,
									'text-error': item.state == 4,
									'text-base': item.state == 3,
								}">
									<template v-if="item.state == 3">已解绑</template>
									<template v-else-if="item.state == 2">绑定成功</template>
									<template v-else-if="item.state == 4">绑定失败</template>
									<template v-else>{{item.state}}</template>
								</view>
							</view>
							<view class="rows u-flex u-flex-items-center u-flex-between u-p-t-20">
								<view class="item text-base">
									sinopay账号
								</view>
								<view class="item">
									{{item.sinopay_poster}}
								</view>
							</view>
							<view class="rows u-flex u-flex-items-center u-flex-between u-p-t-20">
								<view class="item text-base">
									统一社会信用代码
								</view>
								<view class="item u-m-l-20">
									{{item.reg_no1}}
								</view>
							</view>
							<view class="rows u-flex u-flex-items-center u-flex-between u-p-t-20">
								<view class="item text-base">
									申请日期
								</view>
								<view class="item">
									{{item.ctime}}
								</view>
							</view>
						</view>
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
						name: '充值记录',
						disabled: false,
					},
					{
						name: '提现记录',
						disabled: false,
					},
				],
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore'
			};
		},
		onLoad() {
			uni.showLoading()
			this.getData()
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
			}),
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
				const res = await this.$api.sino_account_list({params: {p: this.curP, terms: this.keyword}})
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
			handleBillDetail() {
				
				uni.navigateTo({
					url: `/sinopay/money/bill_detail`
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
		height: 100%;
		
	}
</style>
