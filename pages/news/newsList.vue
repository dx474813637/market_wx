<template>
	<view class="w">
		<u-sticky>
			<view class="sticky hq-header">
				<u-tabs 
					:list="tabs_list" 
					is-scroll 
					:current="tabs_current" 
					@change="tabsChange" 
					bg-color="transparent"
					inactive-color="#aad3ff"
					active-color="#fff"
					height="90"
				></u-tabs>
			</view>
		</u-sticky>
		<view class="hq-content">
			
			<view class="hq-ppi-wrap" v-if="news.length > 0">
				<navigator :url="`/pages/news/newsDetail?type=news&id=${item.id}`" class="news u-flex" v-for="(item,index) in news" :key="item.id">
					<view class="item-left">
						<view class="news-title u-line-2">{{item.title}}</view>
						<view class="news-sub u-line-1">
							<text>{{options[item.cate]}}</text>
							<text class="u-p-l-12">{{item.cdate}}</text>
						</view>
						
					</view>
					<view class="item-right">
						<u-image
							height="90%"
							:src="item.img"
							mode="scaleToFill"
							border-radius="10"
						></u-image>
					</view>
				</navigator>
			</view>
			<template v-else>
				<u-empty text="暂无数据" mode="list" margin-top="60"></u-empty>
			</template>
		</view>
		<nav-bar :tabbar="true" :index="6"></nav-bar>
	</view>
</template>

<script>
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				id: -1,
				tabs_list: [],
				tabs_current: 0,
				news: [],
				options: {}
				
			}
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
		},
		watch: {
			async id(newV) {
				if(newV == -1) return;
				uni.showLoading()
				await this.getData()
			}
		},
		mounted() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#004b91',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			});
		},
		methods: {
			tabsChange(index) {
				this.tabs_current = index
				this.id = this.tabs_list[index].id
			},
			async getData() {
				let res = await this.$http.get('/Market/api.html?api_url_xcx=news', {
					params: {
						cate: this.id == -1 ? '' : this.id
					}
				})
				uni.hideLoading()
				// if(res.data.code == 1) {
					this.tabs_list = [{name: '全部', id: ''}, ...res.data.cate];
					this.news =  res.data.list
					this.options = res.data.options
					
					this.share_title = res.data.share_title
					this.share_img = res.data.share_img
					// this.ppi_price =  res.data.ppi_price
					// this.list =  res.data.list
				// }
			}
		}
	}
</script>
<style>
	page {
		background-color: #f8f8f8;
	}
</style>
<style scoped lang="scss">
	.hq-header {
		background-color: #004b91;
		min-height: 40px;
		/deep/ .u-tab-bar {
			bottom: 4px;
		}
		.hq-title-wrap {
			background-color: #f8f8f8;
			color: #004b91;
			border-radius: 18px 18px 0 0;
			height: 45px;
			padding: 0 20px;
			border-bottom: 1rpx solid #eee;
			.hq-title {
				font-size: 18px;
				margin-left: 10px;
				font-weight: bold;
			}
		}
	}
	.hq-content {
		padding: 10px 10px;
		.hq-ppi-price-wrap {
			background-color: #fff;
			border-radius: 10px;
			.ppi-price-header,
			.price-rows {
				padding: 0 10px;
				height: 40px;
				color: #333;
				.item {
					flex: 0 0 25%;
					width: 25%;
					font-size: 28rpx;
				}
			}
			.ppi-price-header {
				color: #000;
				font-weight: bold;
				border-bottom: 1rpx solid #eee;
				.item {
					
				}
			}
			.ppi-price-main {
				.price-rows {
					border-bottom: 1rpx solid #f8f8f8;
					.item {
						
					}
				}
			}
		}
		
		
		.hq-ppi-img-wrap {
			
		}
		
		.hq-ppi-wrap {
			.news {
				height: 90px;
				background-color: #fff;
				padding: 10px;
				margin-bottom: 10px;
				border-radius: 10px;
				.item-left {
					height: 100%;
					width: 70%;
					flex: 0 0 70%;
					padding-right: 10px;
					.news-title {
						line-height: 22px;
						font-size: 15px;
						margin-bottom: 4px;
						height: 45px;
					}
					.news-sub {
						color: #999;
						font-size: 12px;
					}
				}
				.item-right {
					height: 100%;
					width: 30%;
					flex: 0 0 30%;
					.news-time {
						height: 100%;
						background-color: #f8f8f8;
						border-radius: 10px;
						
					}
				}
			}
		}
		
	}
</style>
