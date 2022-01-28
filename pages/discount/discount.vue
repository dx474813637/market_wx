<template>
	<view>
		<!-- <u-sticky bg-color="transparent">
			<view class="sticky">
				<u-tabs ref="tabs" :list="tabsList" :is-scroll="false" :current="tabsCurrent" @change="tabsChange"
					:active-color="theme.themeColor" font-size="28" bg-color="#f5f5f5"></u-tabs>
			</view>  
		</u-sticky> -->
		<view class="list">
			<List listType="dot" :list="list" emptyText="暂无优惠劵" emptyMode="order" :loadStatus="loadStatus">
				<template v-slot:dot="{item}">
					<view class="list-item">
						<CardCoupon
							:list="item"
							:btnShow="false"
							@handleClick="handleTake"
						>
						</CardCoupon>
					</view>
					
				</template>
			</List>
		</view>
	</view>
</template>

<script>
	import { List } from '@/components/list/list.vue';
	import { CardCoupon } from '@/components/CardCoupon/CardCoupon.vue';
	import {mapState} from 'vuex'
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				list: [],
				loadStatus: 'nomore'
			};
		},
		computed: {
			...mapState(['theme']),
		},
		components: {
			List,
			CardCoupon
		},
		async onLoad(opt) {
		},
		async onShow() {
			uni.showLoading({
				title: '正在加载...'
			})
			await this.getData()
		},
		methods: {
			async getData() {
				// this.loadStatus = 'loading'
				if(Object.keys(this.$store.state.couponCate).length == 0) {
					let res = await this.$http.get('Xcx/coupon_list_login')
					this.$store.commit('getCouponCate', res.data.list.cate)
				}
				
				let list = await this.$http.post('Xcx/shop_coupon_login_list', {
					login: uni.getStorageSync('login')
				})
				this.list = list.data.list.list
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
