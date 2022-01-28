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
				<view class="hq-title-wrap u-flex">
					<u-icon name="viewlist" custom-prefix="custom-icon" size="36"></u-icon>
					<view class="hq-title">{{list.name}}</view>
				</view>
			</view>
		</u-sticky>
		<view class="hq-content">
			<view class="hq-ppi-price-wrap u-m-b-30" v-if="ppi_price.length > 0">
				<view class="ppi-price-header u-flex">
					<view class="item">品牌</view>
					<view class="item">报价</view>
					<view class="item">交货地</view>
					<view class="item">发布时间</view>
				</view>
				<view class="ppi-price-main">
					<view class="price-rows u-flex" v-for="(item, index) in ppi_price" :key="item.id">
						<view class="item u-line-1">{{item.cname}}</view>
						<view class="item u-line-1">{{item.price}} {{item.unit}}</view>
						<view class="item u-line-1">{{item.ptype_name}}</view>
						<view class="item u-line-1">{{item.pubDate}}</view>
					</view>
				</view>
			</view>
			<view class="hq-ppi-img-wrap u-m-b-30" v-if="ppi.img">
				<u-image :src="ppi.img" border-radius="10" mode="widthFix"></u-image>
			</view>
			<view class="hq-ppi-wrap" v-if="ppi.data && ppi.data.length > 0">
				<navigator :url="`/pages/news/newsDetail?type=hq&id=${item.id}&mode=${item.mode}`" class="news u-flex" v-for="(item,index) in ppi.data" :key="item.id">
					<view class="item-left">
						<view class="news-title u-line-2">{{item.title}}</view>
						<view class="news-source u-line-1">来源：{{item.source}}</view>
					</view>
					<view class="item-right">
						<view class="news-time u-flex u-row-center">{{item.md_date}}</view>
					</view>
				</navigator>
			</view>
		</view>
		<nav-bar :tabbar="true"></nav-bar>
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
				ppi: {
					data: [],
					img: ''
				},
				ppi_price: [],
				list: {}
				
			}
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
		},
		watch: {
			async id(newV) {
				if(newV <= 0) return;
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
				let res = await this.$http.get('/Market/api.html?api_url_xcx=hq', {
					params: {
						id: this.id == -1 ? '' : this.id
					}
				})
				uni.hideLoading()
				if(res.data.code == 1) {
					this.tabs_list = res.data.cate;
					this.ppi =  res.data.ppi
					this.ppi_price =  res.data.ppi_price
					this.list =  res.data.list
					this.share_title = res.data.share_title
					this.share_img = res.data.share_img
				}
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
					width: 82%;
					flex: 0 0 82%;
					padding-right: 10px;
					.news-title {
						line-height: 22px;
						font-size: 15px;
						margin-bottom: 4px;
						height: 45px;
					}
					.news-source {
						color: #999;
						font-size: 12px;
					}
				}
				.item-right {
					height: 100%;
					width: 18%;
					flex: 0 0 18%;
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
