<template>
	<view class="wrapper">
		<view class="title">{{ewmInfo.title}}</view>
		<view class="info">{{ewmInfo.info}}</view>
		<u-image width="100%" class="img" mode="widthFix" :src="ewmInfo.url"></u-image>
		<view class="btn-w"><u-button type="primary" shape="circle" @click="saveimg">保存二维码</u-button></view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex"
	export default {
		data() {
			return {
				
			};
		},
		async onLoad() {
			if(!this.ewmInfo.url) {
				this.getEwm()
			}
			
		},
		computed: {
			...mapState(['ewmInfo']),
		},
		methods: {
			...mapActions(['getEwm']),
			async saveimg() {
				let that = this;
				var posterimg = this.ewmInfo.url;
				console.log(posterimg);
				wx.authorize({
					scope: 'scope.writePhotosAlbum',
					success() {
						uni.downloadFile({
							url: posterimg,
							success: res => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function(res1) {
											that.showmodal = false;
											uni.showToast({
												title: '保存成功！',
												icon: 'success'
											});
										},
										fail(err) {
											console.log(err);
										}
									});
								}
							}
						});
					},
					fail(err) {
						uni.showToast({
							title: '请授权保存图片',
							icon: 'none'
						});
					}
				});
			}
			// save() {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '是否保存图片至手机',
			// 		success: (res) => {
			// 			if (res.confirm) {
			// 				uni.saveImageToPhotosAlbum({
			// 					filePath: this.url,
			// 					success(path, errMsg) {
			// 						console.log(path, errMsg);
			// 					},
			// 					fail(err) {
			// 						console.log(err)
			// 					},
			// 					complete() {
			// 						// console.log(image.path)
			// 					}
			// 				})
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	});

			// }
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		padding: 20rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
			text-align: center;
			font-size: 30rpx;
		}
		.img {
			width: 80%;
			margin-bottom: 60rpx;
		}
		.btn-w {
			padding: 0 40rpx;
			width: 80%;
		}

		.info {
			padding: 40rpx 20rpx;
		}

	}
</style>
