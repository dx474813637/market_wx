<template>
	<view class="w">
		<view class="s-w">
			<navigator url="/pages/prodList/prodList" class="all">
				<u-icon name="grid-fill" size="24"></u-icon>
				<text>全部</text>
			</navigator>
			<view class="s">
				<u-search v-model="term" placeholder="搜索商品" clearabled :show-action="false" @search="handleSearch">
				</u-search>
			</view>

		</view>
		<view :class="curIndex == 1 ? 'lista' : 'listb'">
			<template v-if="curIndex == 1">
				<view class="list-item" v-for="(item, index) in list" :key="item.id">
					<navigator :url="`/pages/prodList/prodList?tags=${item.name}`" class="card">
						<u-image border-radius="8" width="100%" height="300rpx" :src="item.pic"></u-image>
						<view class="card-content">
							<text class="card-name">{{item.name}}</text>
						</view>
					</navigator>
				</view>
			</template>
			<template v-else>
				<view class="list-item" v-for="(item, index) in list" :key="item.id">
					<navigator :url="`/pages/prodList/prodList?tags=${item.name}`" class="card">
						<div class="card-img">
							<div class="img-w">
								<u-image border-radius="8" width="100%" height="100%" :src="item.pic"></u-image>
							</div>

						</div>
						<view class="card-content">
							<text class="card-name">{{item.name}}</text>
						</view>
					</navigator>
				</view>
			</template>
		</view>
		<nav-bar :index="2" :tabbar="true"></nav-bar>
	</view>
</template>

<script>
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				curIndex: 1,
				list: [],
				term: '',
				shareOptions: {
					pageName: '产品分类'
				}
			}
		},
		onShareTimeline(){
			return{
				title: this.shareOptions.pageName,
				query:`curIndex=${this.curIndex}`
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.shareOptions.pageName,
				path: '/' + this.$scope.route + '?curIndex=' + this.curIndex
			};
		},
		onShow() {
			uni.hideHomeButton()
		},
		onLoad(options) {
			
			if (options.hasOwnProperty('curIndex')) {
				this.curIndex = options.curIndex;
			} else {
				this.curIndex = 1;
			}
			this.getData()

		},
		
		methods: {
			async getData() {
				let res = await this.$http.get('product_list')
				this.list = res.data.tags
				this.shareOptions.pageName = res.data.share_title
			},
			handleSearch() {
				uni.navigateTo({
					url: `/pages/prodList/prodList?term=${this.term}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.w {

		// padding: 20rpx;
		.s-w {
			padding: 20rpx;
			display: flex;
			align-items: center;

			// margin-bottom: 20rpx;
			.all {
				flex: 0 0 120rpx;
				display: flex;
				height: 60rpx;
				justify-content: center;
				align-items: center;
				// border: 1rpx solid $uni-color-theme;
				border-radius: 10rpx;
				background-color: $uni-color-theme;
				color: #fff;
				margin-right: 20rpx;

				text {
					font-size: 24rpx;
					margin-left: 5rpx;
				}
			}

			.s {
				flex: 1
			}
		}

		.lista {
			padding: 0 20rpx;

			.list-item {
				margin-bottom: 20rpx;

				.card {
					position: relative;

					.card-content {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom: 15%;
						background-color: rgba(255, 255, 255, .8);
						padding: 16rpx 40rpx;
						border-radius: 6rpx;

						.card-name {
							color: #333;
							font-weight: bold;
						}
					}
				}
			}
		}

		.listb {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 20rpx;

			.list-item {
				flex: 0 0 30%;
				margin-bottom: 5%;

				&:nth-of-type(3n-1) {
					margin-left: 5%;
					margin-right: 5%;
				}

				.card {
					position: relative;
					overflow: hidden;
					border-radius: 8rpx;

					.card-img {
						padding-top: 100%;
						position: relative;

						.img-w {
							position: absolute;
							width: 100%;
							height: 100%;
							left: 0;
							top: 0;
						}
					}

					.card-content {
						padding: 12rpx 0;
						text-align: center;
						position: absolute;
						left: 0;
						bottom: 0;
						// transform: translate( -50%, -50%);
						background-color: rgba(0, 0, 0, .4);
						padding: 10rpx;
						width: 100%;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						// line-height: 60rpx;
						.card-name {
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>
