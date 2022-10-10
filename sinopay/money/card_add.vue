<template>
	<view class="u-p-20 u-p-l-40">
		
		<u-form
			:model="model"
			:rules="rules"
			ref="from"
			labelWidth="100%"
			labelPosition="top"
			:labelStyle="{color: '#777'}"
		> 
			<u-form-item
				label="请输入卡号"
				prop="bank_accno"
				ref="bank_accno"
				required
			>
				<view>
					<u-input
						v-model="model.bank_accno"
						clearable
						placeholder="请输入银行卡号"
						border="bottom" 
					></u-input> 
					<view class="u-p-t-20 u-flex u-flex-items-center "
						:class="{
							'text-error': isbankInfo.status == 'error',
							'text-light': isbankInfo.status != 'error'
						}"
					>
						<image :src="isbankInfo.logo" mode="" style="width: 25px; height: 25px;"></image>
						<text class="u-p-l-20" v-if="!bankLoading">{{isbankInfo.name}}</text>
						<u-loading mode="circle" v-else></u-loading>
					</view>
				</view>
				
			</u-form-item>
			<template v-if="sino.list.sinop_type == 'C'">
				<u-form-item
					label="持卡人"
					prop="bank_accname"
					ref="bank_accname"
					required
				>
					<u-input
						v-model="model.bank_accname"
						border="bottom"
						placeholder="请输入持卡人"
						clearable
					></u-input>
				</u-form-item>
				<u-form-item
					label="身份证"
					prop="card_id"
					ref="card_id"
					required
				>
					<u-input
						v-model="model.card_id"
						border="bottom"
						placeholder="请输入身份证"
						clearable
					></u-input>
				</u-form-item>
			</template>
			<template v-else-if="sino.list.sinop_type == 'B'">
				<u-form-item
					label="公司户名"
					prop="bank_accname"
					ref="bank_accname"
					required
				>
					<u-input
						v-model="model.bank_accname"
						border="bottom"
						placeholder="请输入公司户名"
						clearable
					></u-input>
				</u-form-item>
				<u-form-item
					label="社会信用统一代码"
					prop="card_id"
					ref="card_id"
					required
				>
					<u-input
						v-model="model.card_id"
						border="bottom"
						placeholder="请输入社会信用统一代码"
						clearable
					></u-input>
				</u-form-item>
				<u-form-item
					label="法人姓名"
					prop="legal_name"
					ref="legal_name"
					required
				>
					<u-input
						v-model="model.legal_name"
						border="bottom"
						placeholder="请输入法人姓名"
						clearable
					></u-input>
				</u-form-item>
				<u-form-item
					label="法人身份证"
					prop="lecerti_code"
					ref="lecerti_code"
					required
				>
					<u-input
						v-model="model.lecerti_code"
						border="bottom"
						placeholder="请输入法人身份证"
						clearable
					></u-input>
				</u-form-item>
			</template>
			
			
			<u-form-item
				label="手机号"
				prop="mobile"
				ref="mobile"
				required
			>
				<view class="">
					<u-input
						v-model="model.mobile"
						border="bottom"
						placeholder="请输入该卡在银行预留的手机号"
						clearable
					></u-input>
					<view class="u-p-t-20 text-light2" style="line-height: 20px">手机号码必须与银行预留手机号一致，绑定后您的资金账户手机号码也会变成该手机号码</view>
				</view>
			</u-form-item>
			
			 
		</u-form>
		
		<view class="u-p-t-20 u-m-b-40">
			<u-button type="primary" @click="submit">提交表单</u-button>
		</view>
		
		<menusPopupBank 
			:show="show" 
			theme="white" 
			showMode="list"
			@close="show = false"
			@confirm="menusConfirm"
		></menusPopupBank>
		
		
		<u-modal :show="codeInputShow" negativeTop="220" :title="textObj.title"
			showCancelButton
			cancelText="账户银行卡列表"
			cancelColor="#999"
			@cancel="handleBack"
			confirmText="当前银行卡详情" 
			@confirm="handleBackDetail"
			>
			<view class="slot-content u-p-t-10">
				<view class="u-m-b-20 text-light2 u-font-28">
					如跳过当前步骤，后续可在账户银行卡详情中填写此次弹窗表单
				</view>
				<u-form
					:model="model_yanzheng"
					:rules="rules_yanzheng"
					ref="from_yanzheng"
					labelWidth="100%"
					labelPosition="top"
					:labelStyle="{color: '#777'}"
				>
					<u-form-item
						label="鉴权验证金额"
						prop="amt"
						ref="amt"
						required 
					>
						<view>
							<u-input
								v-model="model_yanzheng.amt" 
								placeholder="鉴权验证金额"
								clearable
							></u-input>
							<view class="u-font-28 u-info u-m-t-10">鉴权有效时间是48小时</view>
						</view>
					</u-form-item>
					<u-form-item
						label="鉴权验证码"
						prop="code"
						ref="code"
						required 
					>
						<view>
							<u-input
								v-model="model_yanzheng.code" 
								placeholder="鉴权验证码"
								clearable
							></u-input>
							<view class="u-font-28 u-m-t-10">
								<text class="u-info">如长时间未收到鉴权验证码，可点击取消该鉴权任务，重新发起绑定</text>
								<text class="text-error u-m-l-10" @click="check_cancel">点我取消鉴权</text>
							</view>
						</view>
					</u-form-item>
				</u-form> 
				<view class="u-m-t-40">
					<u-button type="primary" @click="submit_yanzheng">提交 验证</u-button>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				tips: '',
				show: false,
				disabled: true,
				codeInputShow: false,
				type: 'b',
				from_wallet: 'B',
				code: '',
				model: { 
					bank_accname: '',
					card_id: '',
					bank_accno: '',
					mobile: '',
					legal_name: '',
					lecerti_code: '',
					bank_name: ''
				},
				model_yanzheng: {
					id: '',
					amt: '',
					code: ''
				},
				bankLoading: false,
				isbankInfo: {
					logo: 'https://65180.m.toocle.com/Public/nocard.png',
					name: '请输入正确卡号系统自动获取银行名称',
					status: 'error'
				}, 
				rules_yanzheng: {
					amt: {
						type: 'string',
						required: true,
						message: '请填写鉴权验证金额',
						trigger: ['blur', 'change']
					}, 
					code: {
						type: 'string',
						required: true,
						message: '请填写鉴权验证码',
						trigger: ['blur', 'change']
					},
				}
			}
		},
		watch: {
			['model.bank_accno'](n) {
				uni.$u.debounce(this.handleBankChange, 1600)
			}
		},
		onReady() {
			this.$refs.from.setRules(this.rules)
			this.$refs.from_yanzheng.setRules(this.rules_yanzheng)
		},
		computed: {
			...mapState({ 
				sino: state => state.sinopay.sino,
				sino_zh: state => state.sinopay.sino_zh,  
			}),
			textObj() {
				if(this.sino.list.sinop_type == 'C') {
					return {
						title: '个人验证',
						sub: '输入短信验证码'
					}
				}else {
					return {
						title: '企业验证',
						sub: '输入鉴权序号'
					}
				}
			},
			rules() {
				let r = {
					bank_accname: [{
						required: true,
						message: '账户名不能为空',
						trigger: ['blur', 'change']
					}, ],
					card_id: [{
						required: true,
						message: '证件号码不能为空',
						trigger: ['blur', 'change']
					}, ],
					bank_accno: [{
						required: true,
						message: '银行账户号不能为空',
						trigger: ['blur', 'change']
					}, ],
					bank_name: [{
						required: true,
						message: '银行名不能为空',
						trigger: ['change']
					}, ],
					mobile: [{
						required: true,
						message: '手机号不能为空',
						trigger: ['blur', 'change']
					}, ],
				}
				if (this.sino.list.sinop_type == 'B') {
					r = {
						...r,
						legal_name: [{
							required: true,
							message: '法人姓名不能为空',
							trigger: ['blur', 'change']
						}, ],
						lecerti_code: [{
							required: true,
							message: '法人身份证不能为空',
							trigger: ['blur', 'change']
						}, ],
					}
				}
				return r
			},
			paramsObj() { 
				let r = {
					bank_accname: this.model.bank_accname,
					card_id: this.model.card_id,
					bank_accno: this.model.bank_accno,
					mobile: this.model.mobile,
					user_fundaccno: this.sino_zh[this.from_wallet].info.user_fundaccno,
					bank_name: this.isbankInfo.name,
				}
				if (this.sino.list.sinop_type == 'B') {
					r = {
						...r,
						legal_name: this.model.legal_name,
						lecerti_code: this.model.lecerti_code,
					}
				}
				return r
			}
		},
		async onLoad(options) { 
			if(options.hasOwnProperty('wallet')) {
				this.from_wallet = options.wallet
			}
			this.model.bank_accname = this.sino.list.name
			this.model.card_id = this.sino.list.bind_info.market_reg_no;
			// this.model.account_id = this.sinoFund.filter(ele => ele.type == this.from_wallet)[0]?.id
			// this.model.name = this.myCpy.name
			// this.model.card_id = this.myCpy.credit_code
			// this.model.mobile = this.myCpy.mobile
		},
		methods: {
			// codeChange(text) {
			// 	this.tips = text;
			// },
			menusConfirm(data) {
				this.model.bank_name = data.bank_name 
				this.$refs.from.validateField('bank_name')
			},
			handleBack() {
				uni.redirectTo({
					url: '/sinopay/money/bank_card'
				})
			},
			handleBackDetail() {
				uni.redirectTo({
					url: '/sinopay/money/bank_card_detail?id=' + this.model_yanzheng.id
				})
			},
			handleCloseModal() {
				
			},
			check_cancel() {
				uni.showModal({
					title: '取消鉴权提示',
					content: '是否取消当前银行卡鉴权',
					success:  async (r) => {
						if (r.confirm) {
							uni.showLoading()
							const res = await this.$api.sino_fund_account_check_cancel({
								params: {
									id: this.model_yanzheng.id
								}
							})
							if(res.code == 1) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									success: () => {
										this.handleGoto('/sinopay/money/index')
									}
								})
							}
						} else if (r.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			submit_yanzheng() {
				this.$refs.from_yanzheng.validate().then(async res => {
					uni.showLoading()
					const r = await this.$api.sino_fund_account_check({
						params: {...this.model_yanzheng}
					})
					console.log(r)
					if(r.code == 1) { 
						uni.showToast({
							title: r.msg,
							icon: 'none',
							success: () => {
								uni.redirectTo({
									url: '/sinopay/money/bank_card_detail?id=' + this.model_yanzheng.id
								})
							}
						})
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			submit() {
				
				this.$refs.from.validate(async res => {
					if(res) {
						uni.showLoading()
						let func = 'market/bind_apply' 
						const r = await this.$http.get( func, {
							params: this.paramsObj
						})
						console.log(r)
						if(r.data.code == 1) {
							this.codeInputShow = true
							this.model_yanzheng.id = r.data.bind_id
							uni.showToast({
								title: r.msg,
								icon: 'none'
							}) 
						}
					}else {
						uni.$u.toast('校验失败')
					}
					
				}) 
			},
			async handleBankChange() {
				// console.log(this.model.bank_accno)
				if(!this.model.bank_accno) return
				this.bankLoading = true
				const res = await this.$http.get('market/sinopay_bank_name', {
					params: {
						no: this.model.bank_accno
					}
				})
				this.bankLoading = false
				if(res.data.code == 1) {
					this.isbankInfo.name = res.data.list || ''
					this.isbankInfo.logo = res.data.logo || ''
				}else {
					this.isbankInfo.name = '请输入正确卡号系统自动获取银行名称' 
					this.isbankInfo.logo = 'https://65180.m.toocle.com/Public/nocard.png'
				}
			},
		}
	}
</script>

<style lang="scss">
	.u-page {
		&__code-text {
			color: $u-primary;
			font-size: 15px;
			padding-top: 10px;
		}
	}
</style>
