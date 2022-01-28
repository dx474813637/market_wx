<template>
	<view>

		<template v-if="list.length > 0">
			<view class="list">
				<view
					class="list-item"
					v-for="(item, index) in list"
					:key="index"
				>
					<CardCouponShareCell :list="item"></CardCouponShareCell>
				</view>
			</view>	
			<u-loadmore :status="loadStatus" :icon-type="iconType" :load-text="loadText" margin-top="20"
					margin-bottom="20" color="#999" />
			
		</template>
		<template v-else>
			<u-empty text="暂无数据" mode="order" margin-top="80"></u-empty>
		</template>
		<!-- <view class="list">
			<List listType="dot" :list="list" emptyText="暂无数据" emptyMode="order" :loadStatus="loadStatus">
				<template v-slot:dot="{item}">
					<CardCouponShareCell :type="type" :list="item"></CardCouponShareCell>
				</template>
			</List>
		</view> -->
	</view>
</template>

<script>
	// import {
	// 	List
	// } from '@/components/list/list.vue';
	import {
		CardCouponShareCell
	} from '@/components/CardCouponShareCell/CardCouponShareCell.vue';
	export default {
		data() {
			return {
				list: [],
				p: 1,
				endFlag: false,
				loadStatus: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				}
			}
		},
		async onLoad(options) {

			if (options.hasOwnProperty('title')) {
				uni.setNavigationBarTitle({
					title: options.title
				});
			}
			this.getData()

		},
		components: {
			// List,
			CardCouponShareCell
		},
		onReachBottom() {
			this.getNextData()
		},
		async onPullDownRefresh() {
			this.init()
			uni.showLoading({
				title: "加载中"
			})
			await this.getData()
			uni.stopPullDownRefresh()
			uni.hideLoading()
		},
		methods: {
			init() {
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
				let res = await this.$http.get('Xcx/analysis_share_login_list', {
					params: {
						p: this.p
					}
				})
				if (res.data.code == 1) {
					this.list = res.data.list.list
					console.log(this.list)
					if (this.p == res.data.list.pages) {
						this.endFlag = true
						this.loadStatus = 'nomore'
					} else this.loadStatus = 'loadmore'
					uni.hideLoading()
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	.list-item {
		width: 100%;
		padding: 0 20rpx;
	}
	&.grid .list-item {
		flex: 0 0 49%;
		width: 49%;
		&:nth-of-type(2n) {
			margin-left: 1%;
		}
		&:nth-of-type(2n-1) {
			margin-right: 1%;
		}
	}
}
	// .list {
	// 	padding: 20rpx;

	// 	.list-item {
	// 		margin-bottom: 40rpx;
	// 	}
	// }
</style>
