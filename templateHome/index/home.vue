<template>
	<view>
		<view class="cate" v-if="homeCate == 2">
			<HomeCateLY2 :list="homelist"></HomeCateLY2>
		</view>
		<view class="cate" v-if="homeCate == 3">
			<HomeCateLY3 :list="homelist"></HomeCateLY3>
		</view>
		<view class="cate" v-if="homeCate == 4">
			<HomeCateLY4 :list="homelist"></HomeCateLY4>
		</view>
		<view class="cate" v-if="homeCate == 5">
			<HomeCateLY5 :list="homelist"></HomeCateLY5>
		</view>
		<view class="cate" v-if="homeCate == 6">
			<HomeCate1 :list="homelist"></HomeCate1>
		</view>
		<view class="cate" v-if="homeCate == 7">
			<HomeCate2 :list="homelist"></HomeCate2>
		</view>
		<view class="cate" v-if="homeCate == 8">
			<HomeCate3 :list="homelist"></HomeCate3>
		</view>
		<view class="cate" v-if="homeCate == 9">
			<HomeCate4 :list="homelist"></HomeCate4>
		</view>
		<view class="cate" v-if="homeCate == 10">
			<HomeCate5 :list="homelist"></HomeCate5>
		</view>
		<view class="cate" v-if="homeCate == 11">
			<HomeCate6 :list="homelist"></HomeCate6>
		</view>
		<view class="cate" v-if="homeCate == 12">
			<HomeCate7 :list="homelist"></HomeCate7>
		</view>
		<view class="cate" v-if="homeCate == 13">
			<HomeCate8 :list="homelist"></HomeCate8>
		</view>
		<view class="cate" v-if="homeCate == 14">
			<HomeCate9 :list="homelist"></HomeCate9>
		</view>
		<view class="cate" v-if="homeCate == 15">
			<HomeCate10 :list="homelist"></HomeCate10>
		</view>
		<view class="cate" v-if="homeCate == 16">
			<HomeCate11 :list="homelist"></HomeCate11>
		</view>
		<view class="cate" v-if="homeCate == 17">
			<HomeCate12 :list="homelist"></HomeCate12>
		</view>
		<view class="cate" v-if="homeCate == 18">
			<HomeCateLY6 :list="homelist"></HomeCateLY6>
		</view>
		<view class="cate" v-if="homeCate == 19">
			<HomeCateLY7 :list="homelist" :scrollY="scrollY"></HomeCateLY7>
		</view>
		<view class="cate" v-if="homeCate == 20">
			<HomeCateLY8 :list="homelist"></HomeCateLY8>
		</view>
		<view class="cate" v-if="homeCate == 21">
			<HomeCateLY9 :list="homelist"></HomeCateLY9>
		</view>
		<view class="cate" v-if="homeCate == 22">
			<HomeCateLY10 :list="homelist"></HomeCateLY10>
		</view>
		<view class="cate" v-if="homeCate == 23">
			<HomeCateLY11 :list="homelist"></HomeCateLY11>
		</view>
		<template v-if="isEwmed">
			<view class="eye-wrapper">
				<view class="close-btn" @click="changeEwmFlag(false)">
					<u-icon name="close" color="#ccc"></u-icon>
				</view>
				<view class="text u-flex">
					<text class="u-padding-right-20">{{ewmInfo.titlea}}</text>
					<u-button @click="handleGoto" shape="circle" type="warning" size="mini">{{ewmInfo.button}}</u-button>
				</view>
			</view>
		</template>
		
		<nav-bar ref="navbar" :index="memu_id" :tabbar="true" :name="homelist.title"></nav-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	// import mockdata from "./data"
	import HomeCate1 from "@/templateHome/components/HomeCate1/HomeCate1.vue"
	import HomeCate2 from "@/templateHome/components/HomeCate2/HomeCate2.vue"
	import HomeCate3 from "@/templateHome/components/HomeCate3/HomeCate3.vue"
	import HomeCate4 from "@/templateHome/components/HomeCate4/HomeCate4.vue"
	import HomeCate5 from "@/templateHome/components/HomeCate5/HomeCate5.vue"
	import HomeCate6 from "@/templateHome/components/HomeCate6/HomeCate6.vue"
	import HomeCate7 from "@/templateHome/components/HomeCate7/HomeCate7.vue"
	import HomeCate8 from "@/templateHome/components/HomeCate8/HomeCate8.vue"
	import HomeCate9 from "@/templateHome/components/HomeCate9/HomeCate9.vue"
	import HomeCate10 from "@/templateHome/components/HomeCate10/HomeCate10.vue"
	import HomeCate11 from "@/templateHome/components/HomeCate11/HomeCate11.vue"
	import HomeCate12 from "@/templateHome/components/HomeCate12/HomeCate12.vue"
	import HomeCateLY2 from "@/templateHome/components/HomeCateLY2/HomeCateLY2.vue"
	import HomeCateLY3 from "@/templateHome/components/HomeCateLY3/HomeCateLY3.vue"
	import HomeCateLY4 from "@/templateHome/components/HomeCateLY4/HomeCateLY4.vue"
	import HomeCateLY5 from "@/templateHome/components/HomeCateLY5/HomeCateLY5.vue"
	import HomeCateLY6 from "@/templateHome/components/HomeCateLY6/HomeCateLY6.vue"
	import HomeCateLY7 from "@/templateHome/components/HomeCateLY7/HomeCateLY7.vue"
	import HomeCateLY8 from "@/templateHome/components/HomeCateLY8/HomeCateLY8.vue"
	import HomeCateLY9 from "@/templateHome/components/HomeCateLY9/HomeCateLY9.vue"
	import HomeCateLY10 from "@/templateHome/components/HomeCateLY10/HomeCateLY10.vue"
	import HomeCateLY11 from "@/templateHome/components/HomeCateLY11/HomeCateLY11.vue"
	export default {
		data() {
			return {
				homelist: {
					navbar: [],
					news: [],
					notice: [],
					online: {},
					product: [],
					share: {},
					swiper: [],
				},
				memu_id: 1,
				cate: 1,
				scrollY: 0
			};
			
		},
		computed: {
			...mapState(['theme', 'homeCate', 'isEwmed', 'ewmInfo']),
		},
		components: {
			HomeCate1,
			HomeCate2,
			HomeCate3,
			HomeCate4,
			HomeCate5,
			HomeCate6,
			HomeCate7,
			HomeCate8,
			HomeCate9,
			HomeCate10,
			HomeCate11,
			HomeCate12,
			HomeCateLY2,
			HomeCateLY3,
			HomeCateLY4,
			HomeCateLY5,
			HomeCateLY6,
			HomeCateLY7,
			HomeCateLY8,
			HomeCateLY9,
			HomeCateLY10,
			HomeCateLY11,
			
		},
		onPageScroll(x) {
			this.scrollY = x.scrollTop
		},
		onShareTimeline() {
			return {
				title: this.homelist.share.share_title,
				query: `login=${uni.getStorageSync('sharelogin')}&cate=${this.homeCate}`,
				// {
				// 	login: uni.getStorageSync('sharelogin'),
				// 	cate: this.homeCate
				// },
				imageUrl: this.homelist.share.image
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.homelist.share.share_title,
				path: '/' + this.$scope.route + '?login=' + uni.getStorageSync('sharelogin') + '&cate=' + this.homeCate,
				imageUrl: this.homelist.share.image
			};
		},
		async onLoad(options) {
			// console.log(mockdata)
			if(options && options.cate) {
				this.$store.commit('setHomeCate', options.cate);
			}
			// this.homelist = mockdata.list
			uni.hideHomeButton()
			options.memu_id ? this.memu_id = options.memu_id : 1;
			options.login ? uni.setStorageSync('sharelogin', options.login) : {};
			await this.homeUrl();
		},
		onshow(options) {

		},
		methods: {
			...mapMutations(['changeVoteTheme', 'changeEwmFlag']),
			handleGoto() {
				uni.navigateTo({
					url: "/pages/ewm/ewm",
					success:() => {
						this.changeEwmFlag(false)
					}
				})
			},
			async homeUrl() {
				// let cate = this.homeCate;
				// if(!cate) {
				// 	const res = await this.$http.get('home_cate')
				// 	if (res.data.code == 1) {
				// 		let pre_verson = 13 //容错还未更新模板的商家
				// 		const cate = res.data.cate > pre_verson ? 2 : res.data.cate
				// 		this.$store.commit('setHomeCate', cate);
				// 	}
				// }
				const res2 = await this.$http.get('Xcx/xcx_home_data')
				if(res2.data.code == 1) {
					this.homelist = res2.data.list
					// this.homelist = mockdata.list
					uni.setStorageSync('home', this.homelist.share)
					uni.setNavigationBarTitle({
						title: this.homelist.share.title,
					});
				}
				
			},
		}
	}
</script>

<style>
	page {
		background-color: #f8f8f8;
	}
</style>

<style lang="scss" scoped>
	.eye-wrapper {
		position: fixed;
		bottom: calc(env(safe-area-inset-bottom) / 2);   
		left: 0;
		width: 100%;
		min-height: 220rpx;
		background-color: rgba(0,0,0,.5);
		z-index: 100;
		padding: 40rpx 20rpx;
		.close-btn {
			position: absolute;
			right: 20rpx;
			top: 20rpx;
		}
		.text {
			color: #fff;
			font-size: 30rpx;
		}
	}
	.cate1 {
		position: relative;
		padding: 20 0rpx;

		
	}
</style>
