<template>
	<view class="u-wrap">
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
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
				:scroll-into-view="itemId">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box"
				@scroll="rightScroll">
				<view class="page-view">
					<div class="wrapper" :id="'ele' + i" v-for="(ele , i) in tabbar" :key="i">
						<navigator :url="`/pages/prodList/prodList?tags=${ele.name}`" class="wrapper-banner u-flex u-row-center" :style="{'backgroundImage': `url(${ele.pic})`}" v-if="ele.pic">
							<view class="banner-title">{{ele.name}}</view>
						</navigator>
						<template v-if="ele.children && ele.children.length> 0">
							<view class="class-item" v-for="(item , index) in ele.children" :key="index">
								<view class="item-title u-flex u-row-between">
									<text>{{item.name}}</text>
									<navigator class="more" :url="`/pages/prodList/prodList?tags=${item.name}`" >全部<u-icon name="arrow-right"></u-icon></navigator>
								</view>
								<view class="item-container" v-if="item.children && item.children.length > 0">
									<navigator :url="`/pages/prodList/prodList?tags=${item1.name}`" class="thumb-box" v-for="(item1, index1) in item.children" :key="index1">
										<!-- <image class="item-menu-image" :src="item1.icon" mode=""></image> -->
										<view class="item-menu-name u-line-1">{{item1.name}}</view>
									</navigator>
								</view>
							</view>
						</template>
						
					</div>
					
				</view>
			</scroll-view>
		</view>
		<nav-bar :index="2" :tabbar="true"></nav-bar>
	</view>
</template>
<script>
	// import classifyData from '@/common/classify.data.js';
	export default {
		data() {
			return {
				curIndex: 1,
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0,
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				tabbar: [],
				menuItemPos: [],
				arr: [],
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器
				term: "",
				shareOptions: {
					pageName: "产品分类"
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
		onLoad(options) {
			if (options.hasOwnProperty('curIndex')) {
				this.curIndex = options.curIndex;
			} else {
				this.curIndex = 1;
			}
			this.getData()

		},
		onReady() {
			this.getMenuItemTop()
		},
		methods: {
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			// 观测元素相交状态
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					// 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
					// 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			// 设置左边菜单的滚动状态
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取右边菜单每个item到顶部的距离
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.wrapper').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return;
						}
						rects.forEach((rect) => {
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
							resolve();
						})
					}).exec()
				})
			},
			// 右边菜单滚动
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (this.timer) return;
				if (!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					let scrollHeight = e.detail.scrollTop + 20// + this.menuHeight / 2;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return;
						}
					}
				}, 10)
			},

			async getData() {
				let res = await this.$http.get('product_list')
				this.tabbar = res.data.tags
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
	.s-w {
		padding: 20rpx;
		display: flex;
		align-items: center;
		background-color: $uni-color-theme;
	
		// margin-bottom: 20rpx;
		.all {
			flex: 0 0 120rpx;
			display: flex;
			height: 60rpx;
			justify-content: center;
			align-items: center;
			// border: 1rpx solid $uni-color-theme;
			border-radius: 10rpx;
			background-color: #fff;
			color: $uni-color-theme;
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
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
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
		width: 200rpx;
		height: 100%;
		background: #f8f8f8;
	}

	.u-tab-item {
		height: 110rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 6rpx solid $uni-color-theme;
		height: 100%;
		left: 0;
		top: 0;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
		background-color: #fff;
	}
		
	.wrapper {
		padding-left: 10rpx;
		// border-bottom: 1rpx solid #f8f8f8;
		margin-bottom: 60rpx;
	}
	.wrapper-banner {
		width: 100%;
		height: 150rpx;
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
		border-radius: 8rpx;
		position: relative;
		padding: 0 10rpx;
		&:before {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			background-color: rgba(0,0,0,.5);
		}
		.banner-title {
			color: #fff;
			position: relative;
			z-index: 22;
			letter-spacing: 2rpx;
			font-size: 30rpx;
		}
	}
	.class-item {
		background-color: #fff;
		margin-bottom: 30rpx;
		// border-radius: 8rpx;
	}

	.wrapper:last-child {
		min-height: 80vh;
	}

	.item-title {
		font-size: 30rpx;
		color: #000;
		// font-weight: bold;
		height: 70rpx;
		padding: 0 6rpx;
		.more {
			font-size: 26rpx;
		}
	}


	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 49%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-right: 2%;
		margin-bottom: 2%;
		height: 70rpx;
		background-color: #f8f8f8;
		border-radius: 6rpx;
		padding: 5rpx;
	}
	.thumb-box:nth-of-type(2n) {
		margin-right: 0;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		width: 100%;
		text-align: center;
		color: $u-main-color;
	}
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
