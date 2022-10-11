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
				绑定我的sinopay账号
			</view>
			<!-- <view class="text-white u-font-28 u-p-b-30">
				所有表单都为必填
			</view> -->
			<view class="form-w u-p-20 u-p-l-40 u-p-r-40 u-m-t-30">
				<u-form
					labelPosition="top"
					:model="model" 
					ref="userform"
					labelWidth="140" 
					:labelStyle="{fontSize: '28rpx', lineHeight: '18px'}"
				>
					<u-form-item
						label="用户类型"
						:borderBottom="false"
							required
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
					<u-form-item
						:borderBottom="false"
						label="sinopay账号"
						prop="sinopay"
							required
						ref="base_sinopay"
					>
						<u-input
							v-model="model.sinopay"
							placeholder="sinopay账号"
							border="none"
							clearable
						></u-input>
					</u-form-item>
					<u-form-item
						:borderBottom="false"
						label="sinopay密码"
						prop="sinopay"
							required
						ref="base_sinopay_pwd"
					>
						<u-input
							v-model="model.sinopay_pwd"
							placeholder="sinopay密码"
							border="none"
							type="password"
							clearable
						></u-input>
					</u-form-item>
					
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
					</template> 
					
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
					sinopay: '',
					sinopay_pwd: '',  
					name: '',
					id: '',
					cpyname: '',
					cpyid: '',  
					contact: '',  
				},
				btnDisabled: false,
			}
		},
		computed: { 
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
				}
				let base = {
					'sinopay': [{
							type: 'string',
							required: true,
							message: '请填写sinopay账号',
							trigger: ['blur', 'change']
						} ],
					'sinopay_pwd': {
						type: 'string',
						required: true,
						message: '请填写sinopay密码',
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
					sinopay: this.model.sinopay,
					sinopay_pwd: this.model.sinopay_pwd,
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
						name: this.model.name,
						sfz: this.model.id,
					}
				}else if(this.userType == '企业') {
					params = {
						...params,
						type: 3,
						cpyname2: this.model.cpyname,
						cpycode2: this.model.cpyid, 
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
						const res = await this.$http.get('market/sinopay_bind', {
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
