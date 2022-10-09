<template>
	<view>
		<SinoHeader
			mode="2"
		></SinoHeader>
		<view class="main">
			<view class="main-wrapper u-p-10 u-p-l-24 u-p-r-24">
				<view class="main-list">
					<view class="list-item">
						<view class="item-left">
							<view>Sinopay账号</view>
						</view>
						<view class="item-right">
							<view>{{sino.list.bind_info.sinopay_login}}</view>
						</view>
					</view>
					<view class="list-item">
						<view class="item-left">
							<view>用户类型</view>
						</view>
						<view class="item-right">
							<view v-if="sino.list.sinop_type == 'C'">个人</view>
							<view v-else>企业</view>
						</view>
					</view> 
					<view class="list-item">
						<view class="item-left">
							<view v-if="sino.list.sinop_type == 'C'">姓名</view>
							<view v-else>公司名称</view>
						</view>
						<view class="item-right">
							<view>{{sino.list.name}}</view>
						</view>
					</view>
					<!-- <view class="list-item">
						<view class="item-left">
							<view v-if="sino.list.sinop_type == 'B'">统一社会信用代码</view>
							<view v-else>身份证</view>
						</view>
						<view class="item-right">
							<view>{{sino.list.bind_info.market_reg_no}}</view>
						</view>
					</view> -->
					<view class="list-item">
						<view class="item-left">
							<view>认证状态</view>
						</view>
						<view class="item-right">
							<view v-if="sino.list.auth_state == 1">
								已认证
							</view>
							<view v-else class="text-primary u-m-l-10" >
								未认证
							</view>
						</view>
					</view>
					<view class="list-item">
						<view class="item-left">
							<view>绑定时间</view>
						</view>
						<view class="item-right">
							<view>{{sino.list.bind_info.ctime}}</view>
						</view>
					</view>
				</view> 
				
				<!-- <u-button type="error" @click="unbind" v-if="sino.state == 2">解除绑定</u-button> -->
			</view>
		</view>
		<!-- <menusBar tabbar theme="white" border></menusBar> -->
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import SinoHeader from '@/sinopay/components/SinoHeader/SinoHeader.vue'
	export default {
		data() {
			return {
				
			};
		},
		components: { 
			SinoHeader
		},
		computed: {
			...mapState({
				sino: state => state.sinopay.sino, 
				userInfo: state => state.userInfo
			})
		},
		async onLoad() {
			this.myCompany()
			await this.getSinoAccount() 
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto',
				clearSino: 'sinopay/clearSino'
			}),
			...mapActions({
				getSinoAccount: 'sinopay/getSinoAccount',
				myCompany: 'user/myCompany'
			}),
			async unbind() {
				uni.showModal({
					title: '解绑提示',
					content: '是否解绑',
					success:  async (r) => {
						if (r.confirm) {
							uni.showLoading()
							const res = await this.$api.sino_account_unbind({
								params: {
									id: this.sino.id
								}
							})
							if(res.code == 1) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									success: () => {
										this.clearSino()
										this.handleGoto('/sinopay/money/index')
									}
								})
							}
						} else if (r.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: $page-bg2;
	}
</style>
<style lang="scss" scoped>
	
	
	.main-list {
		background-color: #fff;
		/* border-radius: 5px; */
		box-shadow: 0 0 5px rgba(90, 90, 90, 0.05);
		margin-bottom: 10px;
		padding: 0 15px;
		.list-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			min-height: 50px;
			padding: 5px 0;
			border-bottom: 1px solid #f8f8f8;
			.custom-icon {
				font-size: 18px;
				color: #666;
			}
			.item-left {
				display: flex;
				align-items: center;
				flex: 0 0 150px;
				width: 150px;
				p {
					margin-left: 5px;
					color: #000;
					font-size: 15px;
				}
			}
			.item-right {
				display: flex;
				align-items: center;

				.custom-icon {
					color: #999;
				}
				view {
					margin-right: 5px;
					font-size: 15px;
					color: #999;
				}
				navigator {
					background: var(--theme-color);
					color: #fff;
					display: inline-block;
					padding: 0 5px;
					border-radius: 3px;
					line-height: 25px;
					font-size: 14px;
				}
			}
		}
	}
</style>
