<template>
	<view class="form-w">
		<u-form
			:model="form" 
			ref="uForm"
			label-position="left"
			:error-type="errorType"
		>	
			<view class="form-item">
				<view class="form-item-content">
					<u-form-item left-icon="account-fill" :left-icon-style="leftIconStyle" prop="name" required >
						<view class="form-item-r">
							<u-input v-model="form.name" placeholder="请输入微信绑定银行卡的姓名" />
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
	export default {
		data() {
			return {
				form: {
					name: '',
				},
				rules: {
					name: [
						{ 
							required: true,
							trigger: ['change'],
							message: '请输入姓名', 
						}
					],
				},
				errorType: ['message'],
			};
		},
		onLoad() {
			this.getLoginBind() 
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			async getLoginBind() {
				let res = await this.$http.get("Xcx/login_binding_auth")
				if(res.data.code == 1){
					this.form.name = res.data.name
				}else {
					uni.navigateBack()
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
				}
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.handlerLoginBind()
					} else {
						console.log('验证失败');
					}
					console.log(this.form)
				});
			},
			async handlerLoginBind() {
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				
				let res = await this.$http.post('Xcx/login_binding', this.form)
				if(res.data.code == 1) {
					uni.hideLoading()
					uni.showToast({
						title: '绑定成功'
					})
					
					
				}
			},
		}
	}
</script>

<style scoped lang="scss">

	.form-item {
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 30rpx;
	}
	.form-item-content {
		padding: 5rpx 20rpx 20rpx;
		margin-bottom: 40rpx;
		.form-item-r {
			padding-left: 30rpx;
		}
	}
</style>
