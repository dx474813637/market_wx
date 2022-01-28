<template>
	<view>
		<view class="list">
			<List listType="dot" :list="list" emptyText="暂无直播/回看视频" emptyMode="list" :loadStatus="loadStatus">
				<template v-slot:dot="{item}">
					<navigator :url="`/pages/live/live?roomid=${item.id}`" class="card">
						<view class="card-left">
							<template v-if="item.zt != 1">
								<view class="live"> 
									<view class="live-bar bar1"></view>
									<view class="live-bar bar2"></view>
									<view class="live-bar bar3"></view>
								</view>
							</template>
							<template v-else>
								<view class="video">
									<u-icon name="play-right-fill" color="#fff"></u-icon>
								</view>
							</template>
							<view class="card-img">
								<u-image width="100%" height="100%" :src="item.img_yd" border-radius="10"></u-image>
							</view>
						</view>
						<view class="card-right">
							<view class="live-info">
								<view class="live-title">{{item.title}}</view>
								<view class="live-desc">{{item.description}}</view>
							</view>
							<view class="live-data">
								<view class="data-item">
									<u-icon name="thumb-up-fill"></u-icon>
									<text>{{item.num}}</text>
								</view>
							</view>
						</view>
					</navigator>
					
				</template>
			</List>
		</view>
		<nav-bar :index="5" :tabbar="true"></nav-bar>
	</view>
</template>

<script>
	import { List } from '@/components/list/list.vue';
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
					pageName: '直播间列表'
				}
			};
		},
		computed: {
			...mapState(['theme'])
		},
		components: {
			List
		},
		onShareTimeline(){
			return{
				title: this.shareOptions.pageName,
				query:{}
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.shareOptions.pageName,
				path: '/' + this.$scope.route
			};
		},
		async onLoad() {
			uni.showLoading({
				title: '正在加载...'
			})
			await this.getData()
		},
		onReachBottom() {
			this.getNextData()
		},
		methods: {
			getNextData() {
				if (this.endFlag) return
				this.p ++
				this.getData()
			},
			async getData() {
				this.loadStatus = 'loading'
				let res = await this.$http.post('login_live_list', {p: this.p})
				this.shareOptions.pageName = res.data.share_title
				this.list = [...this.list, ...res.data.list.list]
				if (this.p == res.data.list.pages) {
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
	@keyframes liveBar {
		0% {
			height: 24rpx;
		}
		100% {
			height: 6rpx;
		}
	}
	.list {
		padding: 20rpx;
		.list-item {
			margin-bottom: 40rpx;
		}
		.card {
			display: flex;
			height: 200rpx;
			padding: 15rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			.card-left {
				flex: 0 0 250rpx;
				height: 170rpx;
				margin-right: 20rpx;
				position: relative;
				overflow: hidden;
				.live{
				}
				.live {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					left: 0;
					bottom: 25%;
					width: 100%;
					height: 60rpx;
					z-index: 80;
					// border-radius: 4rpx;
					// background: linear-gradient(45deg, #ef03ff, #ff007f );
					background: rgba(0,0,0,.3);
					.live-bar {
						width: 4rpx;
						height: 24rpx;
						border-radius: 4rpx;
						background-color: #fff;
						margin: 0 3rpx;
						&.bar1 {
							animation: liveBar .4s linear infinite alternate;
						}
						&.bar2 {
							animation: liveBar .4s .2s linear infinite alternate;
						}
						&.bar3 {
							animation: liveBar .4s .4s linear infinite alternate;
						}
					}
				}
				.video {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					background: rgba(0,0,0,.6);
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 20rpx;
					z-index: 20;
				}
				.card-img {
					width: 100%;
					height: 100%;
					position: relative;
					overflow: hidden;
					border-radius: 10rpx;
					&:after {
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						z-index: 20;
						background: rgba(100,100,100,.1);
					}
				}
			}
			.card-right {
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.live-info {
					overflow: hidden;
					.live-title {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #000;
						margin-bottom: 5rpx;
					}
					.live-desc {
						overflow: hidden;
						-o-text-overflow: ellipsis;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						line-height: 20px;
						color: #999;
						font-size: 24rpx;
					}
				}
				.live-data {
					color: #999;
					display: flex;
					align-items: center;
					height: 50rpx;
					.data-item {
						display: flex;
						align-items: center;
						text {
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}

	
</style>
