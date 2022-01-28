<template>
	<view>
		<u-sticky bg-color="transparent">
			<view class="sticky">
				<u-tabs ref="tabs" :list="tabsList" :is-scroll="false" :current="tabsCurrent" @change="tabsChange"
					:active-color="theme.themeColor" font-size="28" bg-color="#f5f5f5"></u-tabs>
			</view>
		</u-sticky>
		<view class="list">
			<List listType="dot" :list="list" :billType="tabsCurrent" emptyText="暂无记录" emptyMode="order" :loadStatus="loadStatus">
				<template v-slot:dot="{item, type}">
					<CardBillCell :type="type" :list="item"></CardBillCell>
				</template>
			</List>
		</view>
	</view>
</template>

<script>
	import { List } from '@/components/list/list.vue';
	import { CardBillCell } from '@/components/CardBillCell/CardBillCell.vue';
	import {mapState} from 'vuex'
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() { 
			return {
				tabsList: [
					{
						name: 'Sinopay账单',
					},
					{
						name: '微信账单',
					},
				],
				tabsCurrent: 0,
				list: [],
				p: 1,
				endFlag: false,
				loadStatus: 'loadmore'
			};
		},
		computed: {
			...mapState(['theme'])
		},
		components: {
			List,
			CardBillCell
		},
		async onLoad(opt) {
			if (opt && opt.current) {
				this.tabsCurrent = opt.current
			}
			uni.showLoading({
				title: '正在加载...'
			})
			await this.getData()
			
		}, 
		onReachBottom() {
			this.getNextData()
		},
		methods: {
			async tabsChange(index) {
				this.tabsCurrent = index
				this.initData()
				uni.showLoading({
					title: '正在加载...'
				})
				await this.getData()
			},
			initData() {
				this.list = []
				this.p = 1
				this.endFlag = false
				this.loadStatus = 'loadmore'
			},
			getNextData() {
				if (this.endFlag) return
				this.p = this.p + 1
				this.getData()
			},
			async getData() {
				this.loadStatus = 'loading'
				let res
				if(this.tabsCurrent == 0) {
					res = await this.$http.get('Xcx/pay_list', {params: {p: this.p}})
					this.list = [...this.list, ...res.data.list.list]
					if (this.p == res.data.list.pw_page_total) {
						this.loadStatus = 'nomore'
						this.endFlag = 'true'
					} else this.loadStatus = 'loadmore'
				}
				else {
					res = await this.$http.get('Xcx/wx_pay_list', {params: {p: this.p}})
					this.list = [...this.list, ...res.data.list]
					if (this.p == res.data.totalPages) {
						this.loadStatus = 'nomore'
						this.endFlag = 'true'
					} else this.loadStatus = 'loadmore'
				}
				
				
				uni.hideLoading()
			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	.list {
		// padding: 20rpx 0;
		
	}

	
</style>
