<template>
	<view class="w">
		<u-sticky bg-color="transparent">
			<view>
				<view class="u-search-box">
					<u-search v-model="term" :show-action="false" action-text="搜索" :animation="true" @search="handleSearch">
					</u-search>
				</view>
				<view class="list-sticky">
					<view class="list-nav">
						<navigator open-type="redirect" url="/pages/prodList/prodList" class="nav" :class="{active: navActive == 0}" >
							<u-icon size="30" name="gouwu" custom-prefix="custom-icon" ></u-icon>
							<view class="u-p-l-10">全部产品</view>
						</navigator> 
						<view class="nav" @click="handleShowBox">
							<u-icon size="30" name="filter2" custom-prefix="custom-icon" color="#999"></u-icon>
							<view class="u-p-l-10">分类筛选</view>
						</view>
					</view>
					<view class="list-type">
						<view class="view-type-btn" @click="handleChangeViewType">
							<view v-show="listType == 'dot'">
								<u-icon size="32" name="list" custom-prefix="custom-icon"></u-icon>
							</view>
							<view v-show="listType == 'grid'">
								<u-icon size="32" name="grid" custom-prefix="custom-icon"></u-icon>
							</view>
				
						</view>
					</view>
				</view>
			</view>
			
		</u-sticky>
		<view class="list">
			<list :list="list" :loadStatus="loadStatus" :listType="listType" emptyText="列表为空" emptyMode="list"
				@goto="handlePathDetail">
				<template v-slot:dot="{item}">
					<CardProductCell :list="item"></CardProductCell>
				</template>
				<template v-slot:grid="{item}">
					<CardProductGrid :list="item"></CardProductGrid>
				</template>
			</list>

		</view>
		<nav-bar :index="2" :tabbar="true"></nav-bar>
		
		<u-popup v-model="filterFlag" mode="bottom" height="80%" >
			<view class="filter-box">
				<scroll-view class="box-content" scroll-y>
					<view class="item-filter" v-for="(item, index) in filter_data" :key="item.id">
						<view class="u-p-b-14">
							<view class="filter-header u-flex u-row-between">
								<view class="item-left">
									<view class="filter-title">{{item.name}}</view>
								</view>
								<view class="item-right">
									<view class="u-font-24" @click="handleFilterMore(index, item.more)">
										<text class="u-p-r-6">{{item.more ? '收起' : '展开'}}</text>
										<u-icon size="22" :name="item.more ? 'minus' : 'plus'" ></u-icon>
									</view>
								</view>
							</view>
							<view class="filter-wrap u-flex u-flex-wrap" :class="{
								moreActive: item.more
							}">
								<view 
									class="filter-label u-line-1" 
									:class="{
										active: filter_select2.includes(ele.id)
									}"
									v-for="ele in item.children"
									:key="ele.id"
									@click="handleSelectLabel(ele)"
								>{{ele.name}}</view>
							</view>
						</view>
						
					</view>
				</scroll-view>
				<view class="box-bottom u-flex u-row-around">
					<view class="item">
						<u-button type="error" plain shape="circle" @click="filterReset">重置</u-button>
					</view>
					<view class="item">
						<u-button type="primary" shape="circle" @click="filterConfirm">确定（{{filter_select2.length}}）</u-button>
					</view>
				</view>
			</view>
		</u-popup>
		
	</view>

</template>

<script>
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				filter_data: [],
				filter_select1: [],
				filter_select2: [],
				list: [],
				loadStatus: 'loadmore',
				p: 1,
				endFlag: false,
				listType: 'grid',
				priceSort: 'up',
				navActive: 0,
				term: '',
				tags: '',
				shareOptions: {
					pageName: '产品列表'
				},
				filterFlag: false,
				// share_title: "",
				// share_img: ""
			}
		},
		// onShareTimeline(){
		// 	return{
		// 		title: this.share_title,
		// 		query: `login=${uni.getStorageSync('login')}`,
		// 		imageUrl: this.share_img
		// 	}
		// },
		// onShareAppMessage(res) {
		// 	return {
		// 		title: this.share_title,
		// 		path: '/' + this.$scope.route + '?login=' + uni.getStorageSync('login'),
		// 		imageUrl: this.share_img
		// 	};
		// },
		async onLoad(options) {
			if (options.hasOwnProperty('cate')) {
				this.filter_select1 = options.cate.split(',')
			} else if (options.hasOwnProperty('term') || options.hasOwnProperty('keywords')) {
				this.term = options.term || options.keywords
			}
			if (this.term) {
				uni.setNavigationBarTitle({
					title: this.term + '-产品列表'
				})
			}


			if(this.filter_select1.length == 0) {
				uni.showLoading({
					title: '正在加载...'
				})
				await this.getData(this.term? true: false)
			}
			
		},
		onReachBottom() {
			this.getNextData()
		},
		// async onPullDownRefresh() {
		// 	this.initData()
		// 	await this.getData()
		// 	uni.stopPullDownRefresh()
		// },
		watch: {
			// navActive(newV) {
			// 	if (newV == 0) {
			// 		console.log('综合')
			// 		this.initData()
			// 		this.getData()
			// 	} else if (newV == 1) {
			// 		console.log('销售')
			// 	} else if (newV == 2) {
			// 		console.log('价格 ' + this.priceSort)
			// 	}
			// },
			// priceSort(newV) {
			// 	console.log(newV)
			// },
			async filter_select1(newV) {
				uni.showLoading({
					title: '正在加载...'
				})
				this.initData()
				await this.getData()
			}
		},
		methods: {
			handleShowBox() {
				this.handleChangeFilterBox()
				this.filter_select2 = JSON.parse(JSON.stringify(this.filter_select1))
			},
			handleChangeFilterBox() {
				this.filterFlag = !this.filterFlag;
			},
			async handleSearch() {
				uni.showLoading()
				this.initData()
				await this.getData(true)
				uni.setNavigationBarTitle({
					title: this.term ? this.term + '-产品列表' : '产品列表'
				})
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
			async getData(search) {
				this.loadStatus = 'loading'
				let api = search ? 'search' : 'product'
				let obj = {
					p: this.p,
					terms: this.term,
					cate: this.filter_select1.join(',')
				}
				let list = await this.$http.get(`/Market/api.html?api_url_xcx=${api}`, {
					params: obj
				})
				this.filter_data = list.data.cate.map(ele => {
					ele.more = true
					return ele
				});
				// this.shareOptions.pageName = list.data.share_title
				this.list = [...this.list, ...list.data.list];
				this.share_title = list.data.share_title
				this.share_img = list.data.share_img
				if (this.p == list.data.totalPages) {
					this.loadStatus = 'nomore'
					this.endFlag = 'true'
				} else this.loadStatus = 'loadmore'
				uni.hideLoading()


			},
			handleChangeViewType() {
				if (this.listType == 'dot') this.listType = 'grid'
				else this.listType = 'dot'
			},
			// handleChangeNav(index) {
			// 	if (this.navActive == index && index == 2) {
			// 		this.handleChangeSort('priceSort')
			// 		return
			// 	}
			// 	if (this.navActive == index) return
			// 	this.navActive = index
			// },
			handleChangeSort(sortKey) {
				if (this[sortKey] == 'up') this[sortKey] = 'down'
				else this[sortKey] = 'up'
			},
			handlePathDetail(obj) {
				uni.navigateTo({
					url: `/pages/prodDetail/prodDetail?id=${obj.id}`,
				})
			},
			async inCart(obj) {
				uni.showLoading()
				let res = await this.$http.get('/Market/api.html?api_url_xcx=productDetail_json', {
					params: {
						id: obj.id
					}
				})
				
				if(res.data.code == 1) {
					this.$store.dispatch('addCart', res.data.list)
				}
			},
			handleSelectLabel(item) {
				let i = this.filter_select2.indexOf(item.id);
				if(i == -1) {
					this.filter_select2.push(item.id)
				}else {
					this.filter_select2.splice(i, 1)
				}
			},
			filterConfirm() {
				this.filter_select1 = this.filter_select2;
				this.term = ""
				uni.setNavigationBarTitle({
					title: '产品列表'
				})
				this.handleChangeFilterBox()
			},
			filterReset() {
				this.filter_select2 = []
			},
			handleFilterMore(index, flag) {
				this.filter_data[index].more = !flag
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
	.filter-box {
		background-color: #fff;
		height: 100%;
		border-radius: 40rpx;
		overflow: hidden;
		.box-content {
			height: calc(100% - 120rpx);
			background-color: #f8f8f8;
			padding: 20rpx 30rpx 0;
			.item-filter {
				background-color: #fff;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				box-shadow: 0 0 10rpx rgba(90,90,90,0.1);
				.filter-header {
					border-bottom: 1rpx solid #eee;
					height: 80rpx;
					padding: 0 30rpx;
					.item-left {
						.filter-title {
							font-weight: bold;
						}
					}
					.item-right {
						color: #999;
					}
				}
				.filter-wrap {
					padding-left: 20rpx;
					padding-right: 20rpx;
					height: 85rpx;
					overflow: hidden;
					margin-top: 6rpx;
					&.moreActive {
						padding-bottom: 20rpx;
						height: auto;
						overflow: auto;
					}
					.filter-label {
						width: 30%;
						flex: 0 0 30%;
						margin-right: 5%;
						margin-top: 12rpx;
						background-color: #fff;
						border-radius: 30rpx;
						line-height: 60rpx;
						text-align: center;
						border: 1rpx solid #eee;
						color: #666;
						background-color: #fdfdfd;
						&:nth-of-type(3n) {
							margin-right: 0;
						}
						&.active {
							color: #007aff;
							border-color: #aed5ff;
							background-color:#f6faff;
						}
 					}
				}
			}
		}
		.box-bottom {
			height: 120rpx;
			background-color: #fff;
			border-top: 1rpx solid #e7e7e7;
			.item {
				width: 40%;
			}
		}
	}
	.u-search-box {
		padding: 10rpx 20rpx;
		background-color: #fff;
	}
	.w {
		/deep/ .u-drawer-bottom {
			background-color: transparent;
			padding: 10rpx;
		}
	}
	.list-sticky {
		// position: fixed;
		// left: 0;
		// top: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 10rpx 10rpx;
		height: 60rpx;
		align-items: center;
		background-color: #fff;
		color: #999;
		z-index: 50;

		.list-nav {
			display: flex;
			align-items: center;

			.nav {
				padding: 0 15rpx;
				// font-size: 26rpx;
				display: flex;
				align-items: center;
				margin-right: 30rpx;
				color: #333;
				&:last-child {
					margin-right: 0;
				}

				&.active {
					color: red;
				}

				.sort {
					display: flex;
					flex-direction: column;
					height: 38rpx;
					margin-left: 6rpx;
					position: relative;

					.sort-up,
					.sort-down {
						height: 19rpx;
						display: flex;
						color: #bbb;

						.yticon {
							font-size: 24rpx;
						}

					}
				}

				&.active {

					.sort-up,
					.sort-down {
						&.active {
							color: red;
						}
					}
				}
			}
		}

		.list-type {
			padding-right: 20rpx;
			height: 100%;
			display: flex;
			align-items: center;

			.view-type-btn {}
		}
	}

	.list {

		padding: 10rpx 15rpx 15rpx;

		

	}

	.info-price {
		display: flex;
		align-items: flex-end;
		height: 60rpx;
		font-size: 24rpx;
		// flex-wrap: wrap;
		color: #999;

		.price {
			padding: 0 14rpx;
			border-radius: 8rpx;
		}

		.item {
			margin-right: 0rpx;
		}

		.price-red {
			color: #fff;
			background-color: red;
			background: linear-gradient(to right, #aa55ff, #ff00b3);
		}

		.price-big {
			font-size: 1.1rem;
		}

		.cheap-price-dw {
			// color: red;
			font-family: '微软雅黑';
			margin-right: 4rpx;
		}
			font-size: 1rem;
		.price-yj {
		}

		.cheap-price {
			// font-size: 34rpx;
			// font-weight: bold;
		}

		.cheap-price-label {
			margin-left: 6rpx;
			font-size: 24rpx;
		}

		.sold-num {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
