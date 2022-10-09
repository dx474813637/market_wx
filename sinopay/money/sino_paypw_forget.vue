<template>
	<view class="u-p-20">
		
		<u-form
			labelPosition="left"
			:model="model"
			:rules="rules"
			ref="from"
			labelWidth="80"
		>
			<u-form-item
				label="新密码"
				prop="npasswd"
				ref="npasswd"
			>
				<u-input
					v-model="model.npasswd"
					password
					clearable
				></u-input>
			</u-form-item>
			<u-form-item
				label="确认密码"
				prop="cpasswd"
				ref="cpasswd"
			>
				<u-input
					v-model="model.cpasswd"
					password
					clearable
				></u-input>
			</u-form-item>
			
			<!-- <u-form-item>
				<text class="text-light">密码可使用任何英文字母及阿拉伯数字组合，不得少于5个字符。</text>
			</u-form-item> -->
			<u-form-item 
				label="手机" 
				v-if="sino.mobile1"
			>
				<view>{{sino.mobile1}}</view>
			</u-form-item>
			<u-form-item
				label="验证码"
				prop="captcha"
				ref="captcha"
			>	
				<u-input
					v-model="model.captcha"
					placeholder="验证码"
					clearable
				>
					<!-- <template slot="suffix">
						<u-code
							ref="uCode"
							@change="codeChange"
							keep-running
							change-text="XS后重新获取"
							@start="disabled = true"
							@end="disabled = false"
						></u-code>
						<u-button
							type="primary"
							@tap="getCode"
							:text="tips"
							size="small"
							:disabled="disabled"
						></u-button>
					</template> -->
				</u-input>
			</u-form-item>
		</u-form>
		
		<view class="u-p-t-20 u-m-b-40">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				tips: '',
				disabled: false,
				btnDisabled: false,
				model: { 
					cpasswd: '',
					npasswd: '',
					captcha: ''
				},
				rules: {
					captcha: {
						type: 'string',
						required: true,
						message: '请填写验证码',
						trigger: ['blur', 'change']
					},
					npasswd: [{
							type: 'string',
							required: true,
							message: '请填写新密码',
							trigger: ['blur', 'change']
						}, 
					],
					cpasswd: [{
							type: 'string',
							required: true,
							message: '请填写确认密码',
							trigger: ['blur', 'change']
						},{
							type: 'string',
							message: '确认密码与新密码不一致',
							trigger: ['blur', 'change'],
							validator: (rule, value, callback) => {
								return this.model.npasswd == value;
							},
						},
					]
				}
			}
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		}, 
		computed: {
			...mapState({
				myCpy: state => state.user.myCpy,
				sino: state => state.sinopay.sino
			}),
		},
		methods: {
			
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if(this.disabled) return
				uni.showLoading({
					title: '正在获取验证码'
				})
				this.$refs.uCode.start();
				const res = await this.$api.sino_account_reset_paypwd({params: { flag: 1, id: this.sino.id}})
				if(res.code == 1) {
					uni.showToast({
						title: '验证码已发送'
					})
				}
			},
			submit() {
				
				this.$refs.from.validate().then(async res => {
					uni.showLoading()
					const r = await this.$api.sino_account_reset_paypwd({params: {...this.model, flag: 2, id: this.sino.id}})
					console.log(r)
					if(r.code == 1) {
						// this.$utils.prePage() && this.$utils.prePage().refreshList();
						uni.showToast({
							title: r.msg,
							icon: 'none'
						})
						
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">

</style>
