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
				label="原始密码"
				prop="opasswd"
				ref="opasswd"
			>
				<u-input
					v-model="model.opasswd"
					password
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
		</u-form>
		<view class="u-p-10 u-font-30"> 
			<view class="u-m-t-20">
				<text class="text-base">如果您忘记了登录密码，您可以</text>
				<text class="text-error" @click="handleGoto({url: '/sinopay/money/sino_loginpw_forget', type: 'redirectTo'})">重置登录密码</text>
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
				model: {
					cpasswd: '',
					npasswd: '',
					opasswd: ''
				},
				rules: {
					opasswd: {
						type: 'string',
						required: true,
						message: '请填写原始密码',
						trigger: ['blur', 'change']
					},
					npasswd: [{
							type: 'string',
							required: true,
							message: '请填写新密码',
							trigger: ['blur', 'change']
						},
						// {
						// 	type: 'string',
						// 	message: '新密码格式不正确',
						// 	trigger: ['blur'],
						// 	validator: (rule, value, callback) => {
						// 		const reg1 = new RegExp(/[a-zA-Z]/)
						// 		const reg2 = new RegExp(/[\d]/)
						// 		return reg1.test(value) && reg2.test(value) && value.length >= 5 ;
						// 	},
						// },
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
		computed: {
			...mapState({
				sino: state => state.sinopay.sino,
			}),
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto', 
			}),
			submit() {
				
				this.$refs.from.validate().then(async res => {
					uni.showLoading()
					const r = await this.$api.sino_account_change_psw({
						params: {
							...this.model, 
							id: this.sino.id
						},
					})
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
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
