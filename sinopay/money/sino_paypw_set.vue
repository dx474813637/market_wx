<template>
	<view class="u-p-40">
		
		<u-form
			labelPosition="left"
			:model="model"
			:rules="rules"
			ref="form"
			labelWidth="160"
		> 
			<u-form-item
				label="原始密码"
				prop="opasswd"
				ref="opasswd"
				v-if="sino.list.sinopay_pay_pass == '1'"
			>
				<u-input
					v-model="model.opasswd"
					type="password"
					clearable
				></u-input>
			</u-form-item>
			<u-form-item
				label="新密码"
				prop="npasswd"
				ref="npasswd"
			>
				<u-input
					v-model="model.npasswd"
					type="password"
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
					type="password"
					clearable
				></u-input>
			</u-form-item>
			<!-- <u-form-item>
				<text class="text-light">密码可使用任何英文字母及阿拉伯数字组合，不得少于5个字符。</text>
			</u-form-item> -->
			
			<u-form-item
				label="验证码"
				prop="code"
				ref="code"
			>	
				<view class="u-flex u-flex-items-center">
					<view class="u-flex-1"> 
						<u-input
							v-model="model.code"
							placeholder="验证码"
							clearable
						></u-input>
					</view>
					<view class="verification">
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
						@change="codeChange"></u-verification-code>
						<u-button type="primary" plain size="mini" @click="getCode">{{tips}}</u-button>
					</view>
				</view>
			</u-form-item>
		</u-form>
		
		<view class="u-p-10 u-font-30"> 
			<view class="u-m-t-20">
				<text class="text-base">如果您忘记了支付密码，您可以</text>
				<text class="text-error" @click="handleGoto({url: '/sinopay/money/sino_paypw_forget', type: 'redirectTo'})">重置支付密码</text>
			</view>
		</view>
		<view class="u-p-t-20 u-m-b-40">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				tips: '',
				seconds: 60,
				disabled: false,
				btnDisabled: false,
				model: {
					cpasswd: '',
					npasswd: '',
					opasswd: '',
					code: ''
				},
			}
		},
		computed: {
			...mapState({
				// myCpy: state => state.user.myCpy,
				sino: state => state.sinopay.sino,
			}),
			rules() {
				let base = {
					code: {
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
				if(this.sino.list.sinopay_pay_pass == '1' ) {
					base = {
						...base, 
						opasswd: {
							type: 'string',
							required: true,
							message: '请填写原始密码',
							trigger: ['blur', 'change']
						},
					}
				}
				
				return base
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad() {
			if(this.sino.paypwd == 1) {
				uni.setNavigationBarTitle({
					title: '修改资金账号支付密码'
				})
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto', 
			}),
			...mapActions({ 
				getSinoAccount: 'sinopay/getSinoAccount', 
			}),
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if(this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					}) 
					const res = await this.$http.get('market/passwd_sendsms')
					if(res.data.code == 1) {
						this.$u.toast('验证码已发送'); 
					}
					this.$refs.uCode.start(); 
					
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			},
			submit() {
				this.$refs.form.validate(async res => {
					if(res) {
						uni.showLoading()
						const r = await this.$http.get(`market/${this.sino.list.sinopay_pay_pass == '1'? 'sinopay_change_passwd' : 'sinopay_create_passwd'}`, {
							params: { 
								code: this.model.code,
								npay_passwd: this.model.npasswd,
								cpay_passwd: this.model.cpasswd,
								opay_passwd: this.model.opasswd,
							},
						}) 
						if(r.data.code == 1) { 
							uni.showToast({
								title: r.data.msg,
								icon: 'none'
							})
							this.getSinoAccount()
							setTimeout(() => {
								uni.navigateBack()
							}, 800)
						}
					}
					else {
						this.$u.toast('校验失败')
					}
					
				}) 
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
