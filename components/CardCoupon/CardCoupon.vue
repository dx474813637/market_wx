<template>
	<view class="jingdong" :class="{
		disabled: list.disabled,
		dkq: list.cate == 9
	}">
		<view class="left">
			<view class="sum">
				<template v-if="list.cate != 2">
					￥
				</template>
				<text class="num" :class="{bigger: list.coupon < 10000}">{{list.cate == 2 ? list.coupon / 10 :list.coupon}}</text>
				<template v-if="list.cate == 2">
					折
				</template>
			</view>
			<view class="type" v-if="list.cate != 9">满{{list.term}}元可用</view>
		</view>
		<view class="right">
			
			<template v-if="list.cate == 9">
				<view class="dkq-wrapper u-flex u-row-between u-col-top">
					<view class="item-left">
						<view class="title">{{list.title}}</view>
						<view class="sub">{{list.info}}</view>
					</view>
					<view class="item-right">
						<view class="immediate-use" v-if="!list.disabled && btnShow" @click="handleBtn"><slot name="btnText">立即使用</slot></view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="top">
					<view class="title">
						<text class="tag">{{couponCate[list.cate]}}</text>
						<text>{{list.title}}</text>
					</view>
					<view class="bottom">
						<view class="date u-line-1">
							<template v-if="!list.guid">
								剩余：{{list.number - list.receive_num}}/{{list.number}}
							</template>
						</view>
						<view class="immediate-use" v-if="!list.disabled && btnShow" @click="handleBtn"><slot name="btnText">立即使用</slot></view>
					</view>
				</view>
				<view class="tips">
					<view class="explain">
						<!-- <u-icon name="zhuanfa" class="transpond" :size="24"></u-icon> -->
						<text>有效期至{{list.news_end}}</text>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"CardCoupon",
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			},
			btnShow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['couponCate'])
		},
		methods: {
			handleBtn() {
				this.$emit('handle-click', this.list)
			}
		}
	}
</script>

<style lang="scss" scoped>
.jingdong {
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, .1);
		// margin-bottom: 40rpx;
		width: 100%;
		height: auto;
		background-color: #ffffff;
		display: flex;
		.dkq-wrapper {
			// min-height: 150rpx;
			.item-left {
				padding-right: 15rpx;
				.title {
					line-height: 40rpx;
					color: #000;
					font-size: 30rpx;
					margin-bottom: 10rpx;
					// font-weight: bold;
				}
				.sub {
					color: #999;
					font-size: 24rpx;
				}
			}
			.item-right {
				flex: 0 0 auto;
				padding-top: 20rpx;
			}
		}
		&.disabled {
			.left {
				background-image: none;
				background-color: #999;
			}
				
			.right .top .title .tag {
				background-color: #999;
			}
		}
		.left {
			padding: 0 30rpx;
			background-color: #b20a0a; //rgb(94, 152, 225);
			text-align: center;
			font-size: 28rpx;
			color: #ffffff;
			width: 250rpx;
			flex: 0 0 250rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-image: linear-gradient(45deg, #b20a0a, #f51946);

			.sum {
				// margin-top: 50rpx;
				// font-weight: bold;
				font-size: 32rpx;
				margin-bottom: 20rpx;

				.num {
					font-size: 48rpx;
					&.bigger {
						font-size: 60rpx;
					}
				}
			}

			.type {
				// margin-bottom: 50rpx;
				font-size: 24rpx;
			}
		}
		&.dkq {
			.left {
				background-image: linear-gradient(45deg, #d44e00, #ff9d4d);
			}
			.right {
				padding: 50rpx  15rpx 50rpx 25rpx;
				
			}
		}
		.right {
			flex: 1;
			padding: 20rpx 0rpx 0;
			font-size: 28rpx;
			display: flex;
			flex-direction: column;
			
			.top {
				padding: 0 20rpx;
				flex: 1;
				.title {
					// margin-right: 60rpx;
					line-height: 40rpx;
					min-height: 80rpx;
					color: #333;
					.tag {
						padding: 4rpx 20rpx;
						background-color: #ff6565;
						border-radius: 20rpx;
						color: #ffffff;
						// font-weight: bold;
						font-size: 24rpx;
						margin-right: 10rpx;
					}
				}

				.bottom {
					display: flex;
					margin-top: 20rpx;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 10rpx;
					height: 50rpx;
					.date {
						// font-size: 20rpx;
						color: #999;
						font-size: 24rpx;
						flex: 1;
					}

					
				}
			}
			.immediate-use {
				height: auto;
				padding: 0 20rpx;
				font-size: 24rpx;
				border-radius: 40rpx;
				line-height: 40rpx;
				color: #666;
				border: 2rpx solid #bbb;
			}
			.tips {
				width: 100%;
				line-height: 50rpx;
				height: 50rpx;
				flex: 0 0 50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 24rpx;
				padding: 0 20rpx;
				border-top: 1rpx dashed $u-border-color;

				.transpond {
					margin-right: 10rpx;
				}

				.explain {
					display: flex;
					align-items: center;
					color: #999;
				}

				.particulars {
					width: 30rpx;
					height: 30rpx;
					box-sizing: border-box;
					padding-top: 8rpx;
					border-radius: 50%;
					background-color: $u-type-info-disabled;
					text-align: center;
				}
			}
		}
	}
</style>
