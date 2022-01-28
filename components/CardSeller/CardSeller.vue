<template>
	<view class="card-w">
		<view class="card-top">
			<view class="person-info">
				<view class="person-name">
					<view class="name">{{list.name}}</view>
					<view class="position">{{list.position}}</view>
				</view>
				<view class="person-company">{{list.company}}</view>
			</view>
			<view class="person-avatar">
				<view class="img-wrapper">
					<u-image width="100%" height="100%" :src="list.mem_pic" ></u-image>
				</view>
			</view>
		</view>
		<view class="card-bottom">
			<view class="person-concat">
				<view class="concat-item concat-phone" v-if="list.phone" @click="copyData(list.phone)">
					<u-icon name="phone-fill" color="#9073ca"></u-icon>
					<text class="concat-value">{{list.phone}}</text>
					<u-icon name="file-text-fill" color="#a896d6" size="24"></u-icon><text class="copy-text">[点击复制]</text>
				</view>
				<view class="concat-item concat-wx" v-if="list.card_wx.weixin"  @click="copyData(list.card_wx.weixin)">
					<u-icon name="weixin-fill" color="#9073ca"></u-icon>
					<text class="concat-value">{{list.card_wx.weixin}}</text>
					<u-icon name="file-text-fill" color="#a896d6" size="24"></u-icon><text class="copy-text">[点击复制]</text>
				</view>
				<view class="concat-item concat-email" v-if="list.email"  @click="copyData(list.email)">
					<u-icon name="email-fill" color="#9073ca"></u-icon>
					<text class="concat-value">{{list.email}}</text>
					<u-icon name="file-text-fill" color="#a896d6" size="24"></u-icon><text class="copy-text">[点击复制]</text>
				</view>
				<view class="concat-item concat-addr" v-if="list.address" @click="copyData(list.address)">
					<u-icon name="map-fill" color="#9073ca"></u-icon>
					<text class="concat-value">{{list.address}}</text>
					<u-icon name="file-text-fill" color="#a896d6" size="24"></u-icon><text class="copy-text">[点击复制]</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CardSeller",
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			copyData(data) {
				uni.setClipboardData({
				    data: String(data),
				    success: function () {
				        uni.showToast({
				        	title: '成功复制信息'
				        })
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.card-w {
	width: 100%;
	border-radius: 12rpx;
	height: 400rpx;
	padding: 30rpx;
	background: linear-gradient(-45deg, $uni-color-theme, #55007f);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: #fff;
	.card-top {
		display: flex;
		justify-content: space-between;
		padding-top: 10rpx;
		align-items: center;
		.person-info {
			.person-name {
				display: flex;
				align-items: baseline;
				margin-bottom: 15rpx;
				.name {
					font-size: 40rpx;
				}
				.position {
					margin-left: 30rpx;
				}
			}
			.person-company {
				
			}
		}
		.person-avatar {
			flex: 0 0 120rpx;
			.img-wrapper {
				width: 120rpx;
				height: 120rpx;
				border: 4rpx solid #fff;
				border-radius: 50%;
				overflow: hidden;
			}
		}
	}
	.card-bottom {
		.person-concat {
			.concat-item {
				margin-bottom: 14rpx;
				.copy-text {
					color: #a896d6;
					font-size: 24rpx;
				}
				.concat-value {
					margin-left: 10rpx;
					padding-right: 10rpx;
				}
			}
		}
	}
}
</style>
