<template>
	<view class="ex-mall-tab-page" >
		<!-- 头部 -->
		<view class="ex-mall-header ex-mall-header-bg-color u-flex u-row-betwee" >
			<view class="search">
				<u-search shape="round" bg-color="#ffffff" height="60" color="#000" :show-action="false"
					v-model="searchKw" @search="handlersearch">
				</u-search>
			</view>
		</view>

		<!-- 轮播 -->
		<!-- <view class="carousel" :class="[$themeClass('block-bg-color')]">
			<swiper class="swiper" indicator-dots autoplay :interval="3000" circular>
				<swiper-item class="swiper-item" v-for="(x, xi) in carousels" :key="xi">
					<view class="carousel-item">
						<image class="img" :src="x.url"></image>
						<view class="show">
							<view class="word">
								<view class="w1">{{x.title}}</view>
								<view class="w2">{{x.info}}</view>
							</view>
							<view class="enter">
								<text class="icon ri-arrow-right-s-line"></text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view> -->

		<view class="ex-mall-panel column" style="padding-top: 0;">
			<view class="ex-mall-panel-title ex-mall-panel-title-bg-color ex-mall-panel-title-color">
				<view class="title1">新品</view>
				<view class="more">
					<text class="icon ri-more-2-fill"></text>
				</view>
			</view>
			<view class="ex-mall-panel-content ex-mall-panel-content-bg-color" >
				<scroll-view scroll-x>
					<view class="column-list">
						<view class="item" v-for="(xx, index) in list1" :key="index" @click="navTo(xx.url)" >
							<view class="thumbnail">
								<image class="img" :src="xx.image" mode="aspectFill"></image>
							</view>
							<view class="info" >
								<view class="title u-line-1">{{xx.title}}</view>
								<view class="price">￥{{xx.price}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 商品专题 -->
		<view class="special" >
			<view class="item" >
				<view class="thumbnail" @click="navTo(list.images[0].url)">
					<image class="img" :src="list.images[0].image" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<!-- 推荐商品 -->
		<view class="ex-mall-panel list" >
			<view class="ex-mall-panel-title ex-mall-panel-title-bg-color ex-mall-panel-title-color" >
				<view class="title1">推荐</view>
			</view>
			<view class="ex-mall-panel-content ex-mall-panel-content-bg-color" >
				<view class="list-box">
					<view class="item" v-for="(x, xxi) in list2" :key="xxi" @click="navTo(x.url)"  >
						<view class="thumbnail">
							<image class="img" :src="x.image" mode="aspectFill"></image>
						</view>
						<view class="info" >
							<view class="title u-line-2">{{x.title}}</view>
							<view class="price">￥{{x.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="loadmore ex-mall-panel-content-bg-color ex-mall-panel-title-color" >
			<view class="text" v-if="loadMoreState === 'loadmore'">上拉加载更多</view>
			<view class="text" v-else-if="loadMoreState === 'loading'">正在加载...</view>
			<view class="text" v-else-if="loadMoreState === 'nomore'">没有更多了</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		name: "HomeCateLY4",
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		computed: {
			list1() {
				return this.list.product.slice(0, 4)
			},
			list2() {
				return this.list.product.slice(4)
			},
		},
		data() {
			return {
				searchKw: ""
				
			}
		},
		mounted() {
		},
		methods: {
			navTo(e) {
				
				uni.navigateTo({
					url: e
				});
			},
			handlersearch(value) {
				this.navTo('/pages/prodList/prodList?keywords=' + value);
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.title1 {
		font-weight: bold;
		font-size: 28rpx;
		padding: 20rpx;
	}
	.search {
		width: 100%;
		padding: 20rpx;
		background-color: #f8f8f8;
	}
	.carousel {
		width: 100%;
		height: 48vw;
		margin: 0 auto;
		padding-top: 12px;

		&>.swiper {
			width: 100%;
			height: 100%;

			.swiper-item {
				padding: 0 28px;
				box-sizing: border-box;

				&:nth-child(3n-2) {
					.carousel-item {
						&>.img {
							background-color: #784B32;
						}
					}
				}

				&:nth-child(3n-1) {
					.carousel-item {
						&>.img {
							background-color: #9B927D;
						}
					}
				}

				&:nth-child(3n) {
					.carousel-item {
						&>.img {
							background-color: #96824C;
						}
					}
				}
			}

			.carousel-item {
				position: relative;
				width: 100%;
				height: 100%;
				border-radius: 12px;
				overflow: hidden;

				&>.img {
					display: block;
					width: 100%;
					height: 100%;
				}

				&>.show {
					position: absolute;
					right: 20px;
					bottom: 30px;
					left: 20px;
					display: flex;

					&>.word {
						flex: 1;

						&>.w1 {
							font-size: 16px;
							font-weight: 500;
							color: #FFFFFF;
						}

						&>.w2 {
							margin-top: 10px;
							font-size: 14px;
							color: #FFFFFF;
						}
					}

					&>.enter {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 38px;
						height: 38px;
						background-color: #FFFFFF;
						border-radius: 12px;

						&>.icon {
							font-size: 22px;
							color: #292929;
						}
					}
				}
			}
		}
	}
	.ex-mall-header-bg-color {
		background-color: #FFFFFF;
	}	
	.ex-mall-header-btn-right-bg-color {
	    background-color: #404040;
	}
	.ex-mall-header-btn-left-bg-color {
	    background-color: #F76842;
	}
	.ex-mall-header-btn-right-icon-color {
	    color: #FFFFFF;
	}
	.ex-mall-panel-title-color {
	    color: #292929;
	}
	.ex-mall-panel-title-bg-color {
	    background-color: #F7F7F7;
	}
	.ex-mall-panel-content-bg-color {
	    background-color: #F7F7F7;
	}
	
	.ex-mall-panel.column {
		padding-top: 32px;
		.ex-mall-panel-title-color {
		    color: #292929;
		}
		.ex-mall-panel-title-bg-color {
		    background-color: #F7F7F7;
		}
		.ex-mall-panel-content-bg-color {
		    background-color: #F7F7F7;
		}
		.ex-mall-panel-content {
			.column-list {
				display: flex;
				align-items: flex-start;

				&>.item {
					padding: 0 16px 24px 0;
					width: 360rpx;
					&:first-child {
						padding-left: 28px;
					}

					&:last-child {
						padding-right: 28px;
					}

					&:nth-child(odd) {
						&>.thumbnail {
							&>.img {
								// background-color: #0EAA90;
							}
						}
					}

					&:nth-child(even) {
						&>.thumbnail {
							&>.img {
								// background-color: #F8E3DC;
							}
						}
					}

					&>.thumbnail {
						position: relative;

						&>.img {
							position: relative;
							z-index: 1;
							display: block;
							// width: 188px;
							// height: 218px;
							width: 154px;
							height: 200px;
							border-radius: 12px;
						}

						&>.btn {
							position: absolute;
							top: 14px;
							right: 14px;
							z-index: 10;
							display: flex;
							justify-content: center;
							align-items: center;
							width: 28px;
							height: 28px;
							border-radius: 9px;
							background-color: #FFFFFF;

							&.favorite {
								&>.icon {
									font-size: 15px;
									color: #292929;
								}
							}
						}
					}

					&>.info {
						line-height: 1;

						&>.title {
							margin-top: 20px;
							line-height: 1.3;
							font-size: 15px;
							font-weight: 600;
						}

						&>.price {
							margin-top: 10px;
							font-size: 14px;
							color: red;
						}
					}
				}
			}
		}
	}

	.special {
		padding: 28px;

		&>.item {
			position: relative;
			width: calc(100vw - (28px * 2));
			height: calc(100vw - (28px * 2));
			margin-top: 28px;

			&:first-child {
				margin-top: 0;
			}

			&:nth-child(3n-2) {
				&>.thumbnail {
					&>.img {
						background-color: #98847D;
					}
				}
			}

			&:nth-child(3n-1) {
				&>.thumbnail {
					&>.img {
						background-color: #A06441;
					}
				}
			}

			&:nth-child(3n) {
				&>.thumbnail {
					&>.img {
						background-color: #645E66;
					}
				}
			}

			&>.thumbnail {
				width: 100%;
				height: 100%;

				&>.img {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 12px;
				}
			}

			&>.word {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;

				&>.title {
					font-size: 29px;
					font-weight: 700;
					color: #FFFFFF;
				}

				&>.info {
					margin-top: 12px;
					font-size: 14px;
					color: #FFFFFF;
				}
			}

			&>.btn {
				position: absolute;
				bottom: 38px;
				left: 50%;
				transform: translateX(-50%);
				width: 146px;
				height: 58px;
				text-align: center;
				line-height: 58px;
				font-size: 14px;
				font-weight: 500;
				color: #292929;
				background-color: #FFFFFF;
				border-radius: 12px;
			}
		}
	}

	.ex-mall-panel.list {
		.ex-mall-panel-title-color {
		    color: #292929;
		}
		.ex-mall-panel-title-bg-color {
		    background-color: #F7F7F7;
		}
		.ex-mall-panel-content-bg-color {
		    background-color: #F7F7F7;
		}
		.ex-mall-panel-content {
			.list-box {
				display: flex;
				flex-wrap: wrap;

					&.left {
						padding: 0 6px 0 28px;

						&>.item {
							&:nth-child(odd) {
								&>.thumbnail {
									&>.img {
										// background-color: #0EAA90;
									}
								}
							}

							&:nth-child(even) {
								&>.thumbnail {
									&>.img {
										// background-color: #F8E3DC;
									}
								}
							}
						}
					}

					&.right {
						padding: 0 28px 0 6px;

						&>.item {
							&:nth-child(odd) {
								&>.thumbnail {
									&>.img {
										// background-color: #A8A8A9;
									}
								}
							}

							&:nth-child(even) {
								&>.thumbnail {
									&>.img {
										// background-color: #7F8688;
									}
								}
							}
						}
					}

					&>.item {
						width: 50%;
						padding: 20rpx;
						
						&>.thumbnail {
							position: relative;

							&>.img {
								position: relative;
								z-index: 1;
								display: block;
								width: 100%;
								height: 53vw;
								border-radius: 12px;
							}

							&>.btn {
								position: absolute;
								top: 14px;
								right: 14px;
								z-index: 10;
								display: flex;
								justify-content: center;
								align-items: center;
								width: 28px;
								height: 28px;
								border-radius: 9px;
								background-color: #FFFFFF;

								&.favorite {
									&>.icon {
										font-size: 15px;
										color: #292929;
									}
								}
							}
						}

						&>.info {
							line-height: 1;

							&>.title {
								margin-top: 20px;
								line-height: 1.3;
								font-size: 15px;
								font-weight: 600;
							}

							&>.price {
								margin-top: 10px;
							font-size: 14px;
							color: red;
							}
						}
					}
				
			}
		}
	}

	.loadmore {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 78px;

		&>.text {
			font-size: 14px;
			font-weight: 600;
		}
	}
</style>
