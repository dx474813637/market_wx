<template>
	<view class="w u-p-20">
		<u-navbar 
			:is-fixed="false"
			:is-back="false"
			:background="{ backgroundColor: 'transparent' }"
		>
			<view class="u-flex u-flex-items-center text-white u-m-l-30" >
				<view class="u-flex u-flex-items-center" @click="handleGoto({url: '/sinopay/money/index', type: 'reLaunch'})"> 
					<i class="custom-icon-back custom-icon"></i>
					<text class="u-p-l-10">资金中心</text>
				</view>
			</view>
		</u-navbar>
		
		<view class="main u-p-10 u-p-t-20">
			<view class="text-white u-p-b-10 u-font-36">
				注册支付平台(sinopay)账号
			</view>
			<!-- <view class="text-white u-font-28 u-p-b-30">
				所有表单都为必填
			</view> -->
			<view class="form-w u-p-20 u-p-l-40 u-p-r-40 u-m-t-30">
				<u-form
					labelPosition="left"
					:model="model" 
					ref="userform"
					labelWidth="140" 
					:labelStyle="{fontSize: '28rpx', lineHeight: '18px'}"
				>
					<u-form-item
						label="用户类型"
						:borderBottom="false"
						ref="item1" 
					>
						<view class="u-p-10 u-flex u-flex-between u-flex-items-center" @click="showActions">
							<view class="">
								{{userType}}
							</view>
							<u-icon name="arrow-down"></u-icon>
							<!-- <u-input
								v-model="userType"
								disabled
								disabledColor="#ffffff"
								placeholder="请选择用户类型"
								border="none"
							></u-input> -->
						</view>
						
						<!-- <u-icon
							slot="right"
							name="arrow-right"
						></u-icon> -->
					</u-form-item>
					<u-action-sheet
						v-model="showUserType"
						:list="userActions"
						title="请选择用户类型"
						@close="showUserType = false"
						@click="userTypeSelect"
					>
					</u-action-sheet>
					<!-- <u-form-item
						borderBottom
						label="手机号"
						prop="phone"
						ref="base_phone"
					>
						<u-input
							v-model="model.phone"
							placeholder="手机号"
							border="none"
							clearable
						></u-input>
					</u-form-item> -->
					
					<template v-if="userType == '个人'">
						
						<u-form-item
							:borderBottom="false"
							label="姓名"
							prop="name"
							required
							ref="userInfo_name"
						>
							<u-input
								v-model="model.name"
								placeholder="姓名"
								border="none"
								clearable
							></u-input>
						</u-form-item>
						<u-form-item
							label="身份证"
							:borderBottom="false"
							prop="id"
							required
							ref="userInfo_id"
						>
							<u-input
								v-model="model.id"
								placeholder="身份证"
								border="none"
								clearable
							></u-input>
						</u-form-item>
					</template>
					<template v-if="userType == '个体工商户'">
						
						<u-form-item
							:borderBottom="false"
							label="姓名"
							prop="name"
							required
							ref="userInfo_name"
						>
							<u-input
								v-model="model.name"
								placeholder="姓名"
								border="none"
								clearable
							></u-input>
						</u-form-item>
						<u-form-item
							label="身份证"
							:borderBottom="false"
							prop="id"
							required
							ref="userInfo_id"
						>
							<u-input
								v-model="model.id"
								placeholder="身份证"
								border="none"
								clearable
							></u-input>
						</u-form-item>
						<u-form-item
							label="公司名称"
							:borderBottom="false"
							prop="cpyname"
							required
							ref="userInfo_cpyname"
						>
							<u-input
								v-model="model.cpyname"
								placeholder="公司名称"
								border="none"
								clearable
							></u-input>
						</u-form-item>
						<u-form-item
							label="信用统一代码"
							:borderBottom="false"
							prop="cpyid"
							required
							ref="userInfo_cpyid"
						>
							<u-input
								v-model="model.cpyid"
								placeholder="信用统一代码"
								border="none"
								clearable
							></u-input>
						</u-form-item>
					</template>
					
					<template v-else-if="userType == '企业'">
						
						<u-form-item
							:borderBottom="false"
							label="企业名称" 
							prop="cpyname"
							ref="cpyInfo_cpyname"
							required
						>
							<u-input
								border="none"
								v-model="model.cpyname"
								readonly
								placeholder="企业名称"
								clearable
							></u-input>
						</u-form-item>
						<u-form-item
							label="信用统一代码"
							:borderBottom="false" 
							prop="cpyid"
							ref="cpyInfo_cpyid"
							required
						>
							<u-input
								border="none"
								readonly
								v-model="model.cpyid"
								placeholder="信用统一代码" 
							></u-input>
						</u-form-item>
						<u-form-item
							:borderBottom="false"
							label="法人姓名"
							prop="name"
							ref="cpyInfo_name"
							required
						>
							<u-input
								border="none"
								v-model="model.name"
								placeholder="法人姓名"
								clearable
							></u-input>
						</u-form-item>
						<u-form-item
							:borderBottom="false"
							label="法人身份证"
							prop="id"
							ref="cpyInfo_id"
							required
						>
							<u-input
								border="none"
								v-model="model.id"
								placeholder="法人身份证"
								clearable
							></u-input>
						</u-form-item>  
						<u-form-item
							:borderBottom="false"
							label="联系人"
							prop="contact"
							ref="cpyInfo_contact"
							required
						>
							<u-input
								border="none"
								v-model="model.contact"
								placeholder="联系人"
								clearable
							></u-input>
						</u-form-item>
					</template>
					<u-form-item
						:borderBottom="false"
						label="手机" 
						prop="phone"
						ref="phone"
						required
					>
						<u-input
							v-model="model.phone"
							placeholder="手机"
							border="none"
							clearable
						> 
						</u-input> 
					</u-form-item>
					<u-form-item
						:borderBottom="false"
						label="验证码"
						prop="code"
						ref="base_code"
						required
					>	
						<view class="u-flex u-flex-items-center u-flex-between">
							<view class="u-m-r-10" style="flex: 1 1 50%">
								<u-input
									v-model="model.code"
									placeholder="验证码"
									border="none"
									clearable
								> 
								</u-input>
							</view>
							
							<view class="verification u-flex-1">
								<u-toast ref="uToast"></u-toast>
								<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
								@change="codeChange"></u-verification-code>
								<u-button type="primary" plain @click="getCode" :custom-style="{fontSize: '13px', height: '35px'}">{{tips}}</u-button>
							</view>
						</view>
					</u-form-item>
					
				</u-form>
				<view class="u-p-t-50 u-m-b-40">
					<u-button type="primary" @click="submit">提交</u-button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	import {getUserCard} from '@/utils/userCard'
	export default {
		data() {
			return {
				seconds: 60,
				tips: '',
				disabled: false,
				userType: '个人',
				showUserType: false,
				userActions: [{
						text: '个人',
					},
					{
						text: '个体工商户'
					},
					{
						text: '企业'
					},
				],
				model: {
					phone: '',
					code: '',  
					name: '',
					id: '',
					cpyname: '',
					cpyid: '',  
					contact: '', 
					// base: {
					// 	phone: '',
					// 	code: '',
					// },
					// userInfo: {
					// 	name: '',
					// 	id: '',
					// },
					// userInfo2: {
					// 	name: '',
					// 	id: '',
					// 	cpyname: '',
					// 	cpyid: '',
					// },
					// cpyInfo: {
					// 	name: '',
					// 	id: '',
					// 	name2: '', 
					// 	id2: '',
					// 	contact: '', 
					// }
				},
				btnDisabled: false,
			}
		},
		computed: {
			...mapState({
				userInfo_store: state => state.userInfo,
				
			}),
			rules() {
				let user1 = {
					'name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'id': {
						type: 'string',
						validator: (rule, value, callback) => {
							return this.$u.test.idCard(value)
						},
						message: '请填写正确的身份证',
						trigger: ['blur', 'change']
					}, 
				}
				let user2 = { 
					'name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'id': {
						type: 'string',
						required: true,
						message: '请填写身份证',
						trigger: ['blur', 'change']
					},
					'cpyname': {
						type: 'string',
						required: true,
						message: '请填写公司名称',
						trigger: ['blur', 'change']
					},
					'cpyid': {
						type: 'string',
						required: true,
						message: '请填写公司信用统一代码',
						trigger: ['blur', 'change']
					},
				}
				let cpy = {
					'cpyname': {
						type: 'string',
						required: true,
						message: '请填写企业名称',
						trigger: ['blur', 'change']
					},
					'cpyid': {
						type: 'string',
						required: true,
						message: '请填写信用统一代码',
						trigger: ['blur', 'change']
					},
					'contact': {
						type: 'string',
						required: true,
						message: '请填写联系人',
						trigger: ['blur', 'change']
					},
					'name': {
						type: 'string',
						required: true,
						message: '请填写法人姓名',
						trigger: ['blur', 'change']
					},
					'id': {
						type: 'string',
						validator: (rule, value, callback) => {
							return this.$u.test.idCard(value)
						},
						message: '请填写正确的身份证',
						trigger: ['blur', 'change']
					}, 
				}
				let base = {
					'phone': [{
							type: 'string',
							required: true,
							message: '请填写手机号',
							trigger: ['blur', 'change']
						},{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value)
							},
							message: '请填写正确的手机号',
							trigger: ['blur', 'change']
						}],
					'code': {
						type: 'string',
						required: true,
						message: '请填写验证码',
						trigger: ['blur', 'change']
					},
					
					
				}
				let obj = {
					...base
				}
				if(this.userType == '个人') {
					obj = {
						...user1,
						...obj,
					}
				}
				else if(this.userType == '个体工商户') {
					obj = { 
						...user2,
						...obj,
					}
				}
				else if(this.userType == '企业') {
					obj = { 
						...cpy,
						...obj,
					}
				} 
				this.$refs.userform && this.$refs.userform.setRules && this.$refs.userform.setRules(obj)
				return obj
			},
			paramsObj() {
				let params = { 
					phone: this.model.phone,
					code: this.model.code,
				}
				if(this.userType == '个人') {
					params = {
						...params,
						type: 1,
						name: this.model.name,
						sfz: this.model.id,
					}
				}else if(this.userType == '个体工商户') {
					params = {
						...params,
						type: 2,
						cpyname: this.model.cpyname,
						cpycode: this.model.cpyid,
						name: this.model.name,
						sfz: this.model.id,
					}
				}else if(this.userType == '企业') {
					params = {
						...params,
						type: 3,
						cpyname2: this.model.cpyname,
						cpycode2: this.model.cpyid,
						name2: this.model.name,
						sfz2: this.model.id,
						contact: this.model.contact,
					}
				}
				return params
			}
			
		},
		onReady() {
			this.$refs.userform.setRules(this.rules)
		},
		async onLoad() {
			 
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto'
			}),
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if(this.disabled) return
				
				if(this.$refs.uCode.canGetCode) { 
					uni.showLoading({
						title: '正在获取验证码'
					}) 
					if(!this.model.phone)  {
							uni.$u.toast('请检查手机号')
							return
						}
					this.$refs.uCode.start();
					const res = await this.$http.get('market/get_mobile_code', {
						params: {
							mobile: this.model.phone, 
						}
					})
					if(res.data.code == 1) {
						uni.showToast({
							title: '验证码已发送'
						})
					}
				}else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
			},
			userTypeSelect(index) {
				this.userType = this.userActions[index].text
				// this.$refs.userform.resetFields()
				// this.$refs.form1.validateField('sex')
			},
			showActions() { 
				this.showUserType = true; 
				uni.hideKeyboard()
			},
			async submit() {
				
				this.$refs.userform.validate(async r => {
					if(r) {
						// uni.$u.toast('校验通过')
						uni.showLoading()
						const res = await this.$http.get('market/sinopay_create', {
							params: { ...this.paramsObj }
						});
						if(res.data.code == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								success: () => {
									this.handleGoto('/sinopay/money/index')
								}
							})
							
						}
					}else {
						// uni.$u.toast('校验失败')
					}
					
					
				})
			},
			 
			handleCountDownFinish() {
				this.btnDisabled = false;
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style scoped lang="scss">
	
	.w {
		box-sizing: border-box;
		// position: absolute;
		// z-index: 1;
		min-height: 100vh;
		background-image: url("https://wx.rawmex.cn/Public/bg1.png");
		background-size: 100% 240px;
		background-position: top;
		background-repeat: no-repeat;
		width: 100%;
		// height: 240px;
		// left: 0;
		// top: 0;
	}
	.main {
		position: relative;
		z-index: 1;
		box-sizing: border-box;
	}
	.form-w {
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 10px;
	}
</style>
