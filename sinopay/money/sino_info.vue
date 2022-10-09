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
							<view>{{sino.sinopay_poster}}</view>
						</view>
					</view>
					<view class="list-item">
						<view class="item-left">
							<view>公司名称</view>
						</view>
						<view class="item-right">
							<view>{{myCpy.name}}</view>
						</view>
					</view>
					<view class="list-item">
						<view class="item-left">
							<view>统一社会信用代码</view>
						</view>
						<view class="item-right">
							<view>{{sino.reg_no1}}</view>
						</view>
					</view>
					<view class="list-item">
						<view class="item-left">
							<view>用户类型</view>
						</view>
						<view class="item-right">
							<view>企业</view>
						</view>
					</view> 
					<view class="list-item">
						<view class="item-left">
							<view>状态</view>
						</view>
						<view class="item-right">
							<view>{{sino.state | sinoState2str}}</view>
						</view>
					</view>
					<view class="list-item">
						<view class="item-left">
							<view>认证状态</view>
						</view>
						<view class="item-right">
							<view>
								{{sino.auth_state | sinoAuthState2str}}
							</view>
							<view class="text-primary u-m-l-10" v-if="sino.auth_state != 1" @click="handleGoto('/sinopay/money/card_add')">
								 去认证
							</view>
						</view>
					</view>
					<view class="list-item">
						<view class="item-left">
							<view>绑定时间</view>
						</view>
						<view class="item-right">
							<view>{{sino.ctime}}</view>
						</view>
					</view>
				</view>
				<view class="u-flex u-flex-items-center u-flex-center u-p-20 u-m-b-20">
					<text class="text-base u-font-26" @click="handleGoto('/sinopay/money/sino_acc_list')">绑定列表</text>
				</view>
				
				<u-button type="error" @click="unbind" v-if="sino.state == 2">解除绑定</u-button>
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
				myCpy: state => state.user.myCpy
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
