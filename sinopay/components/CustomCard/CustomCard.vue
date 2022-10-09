<template>
	<view>
		
		<view class="card-w u-p-26"
			:style="{
				backgroundColor: bgColor,
				borderRadius: borderRadius,
				boxShadow: boxShadow
			}"
			  @click="handleGotoDetail"
			>
			<view class="card-header ">
				<view class="item ">
					<view class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
						<view class="u-flex u-flex-items-center u-flex-1">
							<view class="name " style="flex:0 0 auto">账号</view>
							<view class="u-p-l-20 u-p-r-20 text-base">{{originalData.login}}</view>
							<view :class="{
								'text-primary': originalData.to_state == 1,
								'text-light': originalData.to_state != 1,
							}">{{originalData.to_state == 1 ? '已使用' : '未使用'}}</view>
						</view>
						<view class=" " @click.stop="handleCopy">
							<u-button type="primary" size="mini" plain >复制账号</u-button>
						</view>
					</view>
					<view v-if="originalData.to_state != 1" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
						<view class="name">初始密码</view>
						<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.to_passwd}}</view>
					</view>
					<view 
						class="u-p-20 bg" 
						v-if="originalData.Company"
						>
						<view v-if="originalData.Company.name" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
							<view class="name">客户</view>
							<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.Company.name}}</view>
						</view>
						<view v-if="originalData.Company.contact" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
							<view class="name">联系人</view>
							<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.Company.contact}}</view>
						</view>
						<view v-if="originalData.mobile" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
							<view class="name">绑定手机</view>
							<view class="pp u-flex-1 u-flex u-flex-items-center u-flex-end" >
								<view class="icon-label u-m-r-10 u-flex u-flex-items-center u-flex-center" @click.stop="makecall(originalData.mobile)">
									<i class="custom-icon-iconfonta custom-icon u-font-28"></i>
								</view>
								<view class="icon-label u-m-r-10 u-flex u-flex-items-center u-flex-center" @click.stop="copy(originalData.mobile)">
									<i class="custom-icon-fuzhi custom-icon u-font-28"></i>
								</view>
								<text>{{originalData.mobile}}</text>
							</view>
						</view>
						<view  class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
							<view class="name">审核状态</view>
							<view class="pp u-line-1 u-flex-1 u-text-right text"
								:class="{
									'text-error': originalData.Company.state == 1,
									'text-warn': originalData.Company.state == 2
								}"
							>{{originalData.Company.state | state2Str}}</view>
						</view>
						<view  class="item u-flex u-flex-between u-flex-items-center u-m-b-14" v-if="originalData.guanzhu == '1'">
							<view class="name">服务号</view>
							<view class="pp u-line-1 u-flex-1 u-text-right text text-error" >已关注</view>
						</view>
						<view  class="item u-flex u-flex-between u-flex-items-center u-m-b-14" v-if="originalData.shezhi == '1'">
							<view class="name">首页设置</view>
							<view class="pp u-line-1 u-flex-1 u-text-right text text-error" >已设置</view>
						</view>
						<view v-if="originalData.bangding" class="item u-flex u-flex-between u-flex-items-center u-m-b-14">
							<view class="name">绑定时间</view>
							<view class="pp u-line-1 u-flex-1 u-text-right">{{originalData.bangding}}</view>
						</view>
					</view>
					
				</view>
				
			</view>
		</view>
		<view class="card-w-footer " v-if="originalData.Company">
			<view class="u-flex c-w-f-menus">
				<view class="item" @click="handleGoto({url: '/pages/my/customer/customer_prod', params:{login: originalData.login}})">交易商品</view>
				<view class="item" @click="handleGoto({url: '/pages/my/customer/customer_pan', params: {pan: 's', login: originalData.login}})">卖盘记录</view>
				<view class="item" @click="handleGoto({url: '/pages/my/customer/customer_pan', params: {pan: 'b', login: originalData.login}})">买盘记录</view>
				<view class="item" @click="handleGoto({url: '/pages/baojia/customer_log/customer_log', params: {login: originalData.login, mobile: originalData.mobile}})">访问记录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name: 'CustomCard',
		props: {
			bgColor: {
				type: String,
				default: '#fff',
			},
			ids: {
				type: String,
				default: 'ids',
			},
			c_account: {
				type: String,
				default: 'c_account',
			},
			c_pwd: {
				type: String,
				default: 'c_pwd',
			},
			c_name: {
				type: String,
				default: 'c_name',
			},
			c_contact: {
				type: String,
				default: 'c_contact',
			},
			c_phone: {
				type: String,
				default: 'c_phone',
			},
			c_email: {
				type: String,
				default: 'c_email',
			},
			c_status: {
				type: String,
				default: '1',
			},
			boxShadow: {
				type: String,
				default: '0 0 10rpx rgba(0,0,0,.1)',
			},
			borderRadius: {
				type: String,
				default: '16rpx',
			},
			originalData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				typeConfig: state => state.theme.typeConfig,
				sh: state => state.user.sh,
				myCpy: state => state.user.myCpy,
			}),
			...mapGetters({
				sys: 'theme/sys'
			}),
			themeConfig() {
				return this.typeConfig.white
			}
		},
		filters: {
			state2Str:(v) => {
				if(v == 1) return '已激活'
				else if(v == 0) return '未激活'
				else if(v == 2) return '平台灭活'
				return v
			}
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto'
			}),
			handleGotoDetail() {
				this.$emit('detail', {id: this.ids, originalData: this.originalData})
			},
			handleCopy() {
				this.$emit('copy', this.originalData)
			},
			copy(data) {
				uni.setClipboardData({
					data: data
				});
			},
			makecall(data) {
				if(this.myCpy.state == '2') {
					uni.showToast({
						title: '当前用户信息被平台灭活',
						icon: 'none'
					})
					return
				}
				uni.makePhoneCall({
					phoneNumber: data 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-label {
		width: 25px;
		height: 25px;
		border-radius: 15px;
		background-color: #fff;
		border: 1rpx solid #dae6f3;
		box-sizing: border-box;
		.custom-icon {
			color: #007aff;
		}
	}
	.bg {
		border-radius: 10px;
		background: linear-gradient(to bottom, #e8ebff, #fff)
	}
	.name {
		color: #000;
		font-size: 30rpx;
		white-space: nowrap;
		flex: 0 0 90px
	}
	.pp {
		color: #666;
		font-size: 32rpx;
		padding-left: 10rpx;
		white-space: nowrap;
	}
	.item-sub {
		color: #666;
	}
	.card-w {
		position: relative;
		z-index: 10;
	}
	.card-w-footer {
		position: relative;
		z-index: 5;
		padding: 0 12px;
		.c-w-f-menus {
			border-radius: 0 0 10px 10px;
			padding: 7px 10px 10px;
			background: linear-gradient(to bottom, #e8ebff, #fff);
			box-shadow: 0 5px 10px rgba(0,0,0,.1);
			.item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #000;
				font-size: 14px;
			}
		}
	}
</style>
