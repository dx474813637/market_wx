<template>
	<view>
		<view class="list">
			<List listType="dot" :list="list" emptyText="暂无优惠劵" emptyMode="order" :loadStatus="loadStatus">
				<template v-slot:dot="{item}">
					<view class="list-item">
						<CardCoupon 
							:list="item"
							@handleClick="handleTake"
						>
							<template #btnText>
								立即领取
							</template>
						</CardCoupon>
					</view>
					
				</template>
			</List>
		</view>
		<nav-bar :index="6" :tabbar="true"></nav-bar>
	</view>
</template>

<script>
	import { List } from '@/components/list/list.vue';
	import { CardCoupon } from '@/components/CardCoupon/CardCoupon.vue';
	import {mapState} from 'vuex'
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				list: [],
				p: 1,
				endFlag: false,
				loadStatus: 'loadmore',
				shareOptions: {
					pageName: '优惠券列表'
				},
			};
		},
		computed: {
			...mapState(['theme'])
		},
		components: {
			List,
			CardCoupon
		},
		onShareTimeline(){
			return{
				title: this.shareOptions.pageName,
				query: `share=${uni.getStorageSync('login')}`
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.shareOptions.pageName,
				path: '/' + this.$scope.route + "?share=" + uni.getStorageSync('login')
			};
		},
		async onLoad(options) {
			console.log(options)
			if (options.hasOwnProperty('share')) {
				uni.setStorageSync('sharelogin', options.share)
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
			async handleTake(item) {
				let res = await this.$http.get('Xcx/receive_coupon', {params: {id: item.id, share: uni.getStorageSync("sharelogin")}})
				if(res.data.list.code == 1) {
					uni.showToast({
						title: `领取成功`,
					})
				}else {
					uni.showToast({
						title: res.data.list.msg,
						icon: 'none'
					})
				}
				
			},
			getNextData() {
				if (this.endFlag) return
				this.p = this.p + 1
				this.getData()
			},
			async getData() {
				this.loadStatus = 'loading'
				let list = await this.$http.get('Xcx/coupon_list_login')
				this.shareOptions.pageName = list.data.share_title
				this.list = [...this.list, ...list.data.list.list]
				this.$store.commit('getCouponCate', list.data.list.cate)
				if (this.p == list.data.list.pages) {
					this.loadStatus = 'nomore'
					this.endFlag = 'true'
				} else this.loadStatus = 'loadmore'
				uni.hideLoading()
			},
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
		padding: 20rpx;
		.list-item {
			margin-bottom: 40rpx;
		}
	}

	
</style>
