<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<u-search 
				v-model="term" 
				:show-action="false" 
				action-text="搜索" 
				:animation="true"
				@search="handleSearch"
			></u-search>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="{'u-tab-item-active': current==index, 'item-left': item.name != '全部'}"
				 :data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			
			<scroll-view scroll-y class="right-box" @scrolltolower="handlescrolltolower">
				<view class="list">
					<list
						:list="dataList[current].data"
						:loadStatus="dataList[current].loadStatus"
						listType="dot"
						emptyText="列表为空"
						emptyMode="list"
						@goto="handlePathDetail"
					>
						<template v-slot:dot="{item}">
							<CardProductCell :list="item"></CardProductCell>
						</template>
					</list>
				</view>
				
			</scroll-view>
		</view>
		<nav-bar :index="2" :tabbar="true" ></nav-bar>
	</view>
</template>

<script>
	// import classifyData from "@/common/classify.data.js";
	import { List } from '@/components/list/list';
	import { CardProductCell } from '@/components/CardProductCell/CardProductCell.vue'
	
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				tabbar: [
					{
						name: '全部',
						id: '0'
					},
				],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				dataList: [],
				term: '',
				tags: '',
				shareOptions: {
					pageName: '产品列表'
				}
			}
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
		async onLoad(options) {
			if(options && options.tags) {
				this.tags = options.tags
			}
			if(options && options.term || options.keywords) {
				this.term = options.term || options.keywords
			}
			await this.getInitData()
			uni.showLoading({
				title: '加载中'
			})
			await this.getListData()
			uni.hideLoading()
		},
		components: {
			List,
			CardProductCell
		},
		methods: {
			initList() {
				this.tabbar.forEach(ele => {
					this.dataList.push({
						data: [],
						p: 1,
						endFlag: false,
						loadStatus: 'loadmore'
					})
				})
			},
			async getInitData() {
				let res = await this.$http.get('/product_list', {params: {
					p: 1,
					term: this.term,
					tags: this.tags,
				}})
				this.tabbar = [...this.tabbar, ...res.data.tags]
				this.initList();
				// let curIndex = 
			},
			async getListData(search) {
				let obj = search? this.dataList[0] :this.dataList[this.current]
				if(obj.endFlag) return
				obj.loadStatus = 'loading'
				let res = await this.$http.get('/product_list', {params: {
					p: obj.p,
					term: this.term,
					tags: this.tags,
				}})
				this.shareOptions.pageName = res.data.share_title
				obj.data = [...obj.data, ...res.data.list.list_products]
				if(obj.p == res.data.list.pw_page_total) {
					obj.endFlag = true
					obj.loadStatus = 'nomore'
				}else {
					obj.loadStatus = 'loadmore'
				}
			
			},
			async handlescrolltolower() {
				let obj = this.dataList[this.current]
				if(obj.endFlag) return
				obj.p ++
				await this.getListData()
				
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				uni.hideLoading()
				this.current = index;
				this.term = ''
				this.tags = this.tabbar[index].name == '全部' ? '' :this.tabbar[index].name
				if(this.dataList[index].data.length == 0) {
					uni.showLoading({
						title: '加载中'
					})
					await this.getListData()
					uni.hideLoading()
				}
				
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			handleSearch() {
				this.current = 0;
				this.tags = ''
				this.dataList.splice(0, 1, {
					data: [],
					p: 1,
					endFlag: false,
					loadStatus: 'loadmore'
				})
				
				this.getListData(true)
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			
			handlePathDetail(obj) {
				// console.log(obj)
				uni.navigateTo({
					url: `/pages/prodDetail/prodDetail?id=${obj.id}`,
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 20rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		flex: 0 0 160rpx;
		width: 160rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 120rpx;
		// background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 40rpx;
		padding: 0 10rpx;
		border-top: 1rpx solid #f8f8f8;
		transition: all .3s;
		&.item-left {
			// justify-content: flex-start;
		}
	} 
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 28rpx;
		font-weight: 600;
		background: #e6ecff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 2px solid $u-type-primary;
		height: 100%;
		left: 0;
		top: 0;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		flex: 1;
		width: calc(100% - 160rpx);
		background-color: #f5f5f5;
		.list {
			padding: 10rpx;
			width: 100%;
		}
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
