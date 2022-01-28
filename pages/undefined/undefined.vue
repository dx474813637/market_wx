<template>
	<view class="form-w">
		<u-form 
			:model="form" 
			ref="uForm"
			label-position="left"
			:error-type="errorType"
		>	
			<view class="form-item">
				<!-- <view class="form-item-title">
					<u-icon name="file-text-fill" size="50" color="#007aff"></u-icon>
					<text class="title">会员信息</text>
					<text class="title-sub">对外展示，请认真填写</text>
				</view> -->
				<view class="form-item-content">
					<!-- <u-form-item left-icon="camera-fill" :left-icon-style="leftIconStyle" prop="pic" required >
						<view class="form-item-r">
							<u-upload 
								max-count="1"
								:custom-btn	="true"
								:action="imgUploadAction"
								:header="httpHeader"
								@on-change="avatarImgUpChange"
								:file-list="avatarFileList"
							>
								<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
									<u-icon name="camera-fill" size="60" color="#c0c4cc"></u-icon>
								</view>
							</u-upload>
						</view>
						
					</u-form-item> -->
					<u-form-item left-icon="account-fill" :left-icon-style="leftIconStyle" prop="name" required >
						<view class="form-item-r">
							<u-input v-model="form.name" placeholder="请输入姓名" />
						</view>
						
					</u-form-item>
					<u-form-item left-icon="home-fill" :left-icon-style="leftIconStyle" prop="company" required >
						<view class="form-item-r">
							<u-input v-model="form.company" placeholder="请输入公司" />
						</view>
						
					</u-form-item>
					<u-form-item left-icon="phone-fill" :left-icon-style="leftIconStyle" prop="phone" required >
						<view class="form-item-r">
							<u-input v-model="form.phone" placeholder="请输入手机" />
						</view>
						
					</u-form-item>
					<u-form-item left-icon="bookmark-fill" :left-icon-style="leftIconStyle" prop="position" required >
						<view class="form-item-r">
							<u-input v-model="form.position" placeholder="请输入职位" />
						</view>
						
					</u-form-item>	
					
					<u-form-item left-icon="email-fill" :left-icon-style="leftIconStyle" prop="email" required>
						<view class="form-item-r">
							<u-input class="intro-box" v-model="form.email" placeholder="请输入Email" />
						</view>
						
					</u-form-item>	
					<u-form-item left-icon="map-fill" :left-icon-style="leftIconStyle" prop="address" required>
						<view class="form-item-r">
							<u-input class="intro-box" v-model="form.address" placeholder="请输入公司地址" />
						</view>
						
					</u-form-item>	
					<u-form-item left-icon="weixin-circle-fill" :left-icon-style="leftIconStyle" prop="weixin" required>
						<view class="form-item-r">
							<u-input class="intro-box" v-model="form.weixin" placeholder="请输入微信" />
						</view>
						
					</u-form-item>
					<u-form-item left-icon="bell-fill" :left-icon-style="leftIconStyle" prop="tel" required>
						<view class="form-item-r">
							<u-input class="intro-box" v-model="form.tel" placeholder="请输入座机" />
						</view>
						
					</u-form-item>		
				</view>
				<view class="submit-btn">
					<u-button @click="submit" type="primary">提交</u-button>
				</view>

			</view>
			
			
			
		</u-form>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {getUserCard} from '@/utils/userCard'
	
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				imgUploadAction: 'https://www.100ec.cn/Home/Jzbxcx/img_url',
				httpHeader: this.$store.state.httpHeader,
				errorType: ['message'],
				leftIconStyle: {
					color: '#666'
				},
				// xyFlag: false,
				// content: `空山新雨后<br>天气晚来秋<br>空山新雨后<br>天气晚来秋<br>空山新雨后<br>天气晚来秋<br>`,
				// checked: false,
				avatarFileList: [],
				keywordsArr: [],
				form: {
					pic: '',
					name: '',
					phone: '',
					company: '',
					position: '',
					email: '',
					address: '',
					weixin: '',
					tel: ''
				},
				rules: {
					// pic:[
					// 	{ 
					// 		required: true, 
					// 		trigger: ['change'],
					// 		message: '请上传商务/职业照', 
					// 	}
					// ],
					name: [
						{ 
							required: true,
							trigger: ['change'],
							message: '请输入姓名', 
						}
					],
					company: [
						{
							required: true, 
							trigger: ['change'],
							message: '输入公司名'
						}
					],
					phone: [
						{
							required: true, 
							trigger: ['change'],
							pattern: /^1\d{10}$/,
							message: '输入正确的手机号'
						}
					],
					position: [
						{
							required: true, 
							trigger: ['change'],
							message: '输入职位'
						}
					],
					email: [
						{
							required: true, 
							trigger: ['change'],
							pattern: /^[\w\.\-]+@[\w\-]+\.([\w\-]+\.){0,1}[a-z]{2,4}$/,
							message: '输入正确的邮箱地址'
						}
					],
					address: [
						{
							required: true, 
							trigger: ['change'],
							message: '输入公司地址'
						}
					],
				}
			}
		},
		async onLoad(opt) {
			if(Object.keys(this.$store.state.userInfo).length == 0)  {
				await getUserCard()
			}
			
			let { name, phone, company, position, email, address, card_wx: {weixin}, tel } = this.userInfo
			this.form.name = name
			this.form.phone = phone
			this.form.company = company
			this.form.position = position
			this.form.email = email
			this.form.address = address
			this.form.weixin = weixin
			this.form.tel = tel
		},
		watch: {
			keywordsArr(newV) {
				this.$set(this.form, 'field', newV.join(','))
			}
		},
		computed: {
			...mapState(['infoAuthorize', 'userInfo']),
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.handleUpAuthor()
					} else {
						console.log('验证失败');
					}
					console.log(this.form)
				});
			},
			async handleUpAuthor() {
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				
				
				let res = await this.$http.post('Xcx/edit_card', this.form)
				if(res.data.code == 1) {
					let info = {...this.userInfo}
					info.name = this.form.name
					info.phone = this.form.phone
					info.company = this.form.company
					info.position = this.form.position
					info.email = this.form.email
					info.address = this.form.address
					info.card_wx.weixin = this.form.weixin
					info.tel = this.form.tel
					this.$store.commit('setUserInfo', info)
					uni.hideLoading()
					uni.navigateTo({
						url: '/pages/mine/mine'
					})
					uni.showToast({
						title: '更新成功'
					})
					
					
				}
			},
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style scoped lang="scss">
	.key-inp-w {
		margin: 50rpx auto 50rpx;
		width: 90%;
	}
	.xy {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 30rpx;
	}
	.xy-btn {
		color: $uni-color-theme;
	}
	.form-w {
	}
	.tag-class {
		margin-right: 15rpx;
	}
	.form-item {
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 30rpx;
	}
	.form-item-title {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #f8f8f8;
		height: 80rpx;
	}
	.slot-btn {
		margin: 10rpx;
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}
	.slot-btn2 {
		width: 600rpx;
		height: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
	.title {
		flex: 1;
		font-size: 35rpx;
		font-weight: bold;
		color: #333;
		margin-left: 10rpx;
	}
	.title-sub {
		color: #999;
	}
	.form-item-content {
		padding: 5rpx 20rpx 20rpx;
		.form-item-r {
			padding-left: 30rpx;
		}
	}
	.phone-prove {
		display: flex;
		align-items: center;
	}
	.phone-prove-inp {
		flex: 1;
		padding-right: 20rpx;
	}
	.submit-btn {
		padding: 80rpx 0;
	}
	.intro-box {
		background-color: #f8f8f8;
	}
</style>
