<template>
	<view>
		<u-sticky bg-color="transparent">
			<view style="height: 40px;">
				<u-tabs 
					 ref="tabs"
					:list="tabsList" 
					:is-scroll="false" 
					:current="tabsCurrent" 
					@change="tabsChange"
					:active-color="theme.themeColor"
					font-size="28"
					bg-color="#f5f5f5"
				></u-tabs>
			</view>
		</u-sticky>
		<view class="list">
			<List
				listType="dot"
				:list="list"
				emptyText="订单为空"
				emptyMode="order"
				:loadStatus="loadStatus"
			>
				<template v-slot:dot="{item}">
					<CardOrder :list="item"></CardOrder>
				</template>
			</List>
		</view>
		
	</view>
</template>

<script>
	import {List} from '@/components/list/list.vue'
	import {CardOrder} from '@/components/CardOrder/CardOrder.vue'
	import { mapState } from 'vuex'
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				keyword: '',
				bgColor: {
					'backgroundColor': '#004b91'
				},
				tabsList: [],
				tabsCurrent: 0,
				list: [],
				p: 1,
				endFlag: false,
				loadStatus: 'loadmore',
			}
		},
		components: {
			List,
			CardOrder
		},
		computed: {
			...mapState(['theme'])
		},
		async onLoad(opt) {
			await this.getType();
			if(opt && opt.current) {
				this.tabsCurrent = opt.current
			} 
			uni.showLoading({
				title: '正在加载...'
			})
			await this.getData();
		},
		// async onShow() {
		// 	this.initData()
		// 	uni.showLoading({
		// 		title: '正在加载...'
		// 	})
		// 	await this.getData()
		// },
		onReachBottom() {
			this.getNextData()
		},
		async onPullDownRefresh() {
			this.initData()
			uni.showLoading({
				title: '获取数据中...'
			})
			await this.getData()
			uni.stopPullDownRefresh()
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
				if(this.endFlag) return
				this.p = this.p + 1
				this.getData()
			},
			async getType() {
				let res = await this.$http.get('Xcx/order_type',{})
				if (res.data.code == 1) {
					this.tabsList = res.data.list;
				}
			},
			async getData() {
				this.loadStatus = 'loading' 
				let res = await this.$http.get('Xcx/order_list', {
					params: {
						p: this.p, 
						type: this.tabsList[this.tabsCurrent].type,
					},
				})
				this.list = [...this.list, ...res.data.list.list_order]
				if (this.p == res.data.list.pw_page_total) {
					this.loadStatus = 'nomore'
					this.endFlag = 'true'
				} else this.loadStatus = 'loadmore'
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
<style scoped lang="scss">
.slot-wrap {
	display: flex;
	align-items: center;
	/* 如果您想让slot内容占满整个导航栏的宽度 */
	flex: 1;
	/* 如果您想让slot内容与导航栏左右有空隙 */
	/* padding: 0 30rpx; */
	.search-w {
		flex: 1
	}
	.item {
		padding-right: 16rpx;
	}
}
.list {
	padding: 20rpx;
}

</style>
