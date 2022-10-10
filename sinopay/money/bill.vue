<template>
	<view class="w">
		<view class="list" >
			<List
				listType="dot"
				:list="indexList"
				emptyText="列表为空"
				emptyMode="list"
				:loadStatus="loadStatus"
			>
				<template v-slot:dot="{item}">
					<view class="u-p-l-20 u-p-r-20 u-p-t-10 u-p-b-10">
						<BillCard
							:detailData="item"
							@detail="handleBillDetail"
						></BillCard>
					</view>
					
				</template>
			</List> 
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import BillCard from '@/sinopay/components/BillCard/BillCard.vue'
	import List from '@/components/list/list.vue'
	export default {
		data() {
			return { 
				indexList: [],
				curP: 1,
				loadstatus: 'loadmore'
			};
		}, 
		async onLoad(options) {  
			uni.showLoading()
			await this.getData()
		}, 
		components: {
			BillCard,
			List
		},
		onReachBottom() {
			this.scrolltolower()
		},
		async onPullDownRefresh() {
			await this.refreshList()
			uni.stopPullDownRefresh();
		},
		methods: {
			async refreshList() {
				uni.showLoading()
				this.initParamas()
				await this.getData()
			},
			initParamas() {
				this.curP = 1;
				this.indexList = [];
				this.loadstatus = 'loadmore'
			}, 
			changeTabsStatus(key, value) {
				this.tabs_list = this.tabs_list.map(ele => {
					ele[key] = value;
					return ele
				})
			},  
			scrolltolower() {
				this.getMoreData()
			},
			async getData() {
				if(this.loadstatus != 'loadmore') return
				this.loadstatus = 'loading'
				const res = await this.$http.get('market/bill2', {
					params: { 
						p: this.curP, 
					},
				})
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
			handleBillDetail(data) {
				
				uni.navigateTo({
					url: `/sinopay/money/bill_detail?id=${data.id}`
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
		// height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.w { 
	} 
</style>
