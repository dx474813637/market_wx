<template>
	<view class="header">
		<view class="header-box">
			<!-- 已登录 -->
			<view class="person">
				<view class="item-left">
					<view class="person-avatar">
						<open-data type="userAvatarUrl"></open-data>
					</view>
				</view>
				<view class="item-right">
					<view class="person-nick u-line-1">{{sino.list.name}}</view>
					<view class="person-sub">
						<view class="status u-flex u-flex-items-center">
							<view class="icon-acc u-flex u-flex-items-center u-flex-center">
								<i class="custom-icon-my custom-icon"></i>
							</view>
							<span class="acc-name">{{sino.list.hasOwnProperty('bind_info') ? sino.list.bind_info.sinopay_login : '未开通或绑定资金账号'}}</span>
						</view> 
					</view>
				</view>
				<view class="item-info" v-if="mode == '1'">
					<view @click="handleGoto('/sinopay/money/sino_info')" class="info-a u-flex u-flex-items-center">
						<text class="u-font-28">账号信息</text>
						<i class="custom-icon-right custom-icon"></i>
					</view>
				</view>
				<view class="item-info" v-if="mode == '2'">
					<view @click="handleGoto({url: '/sinopay/money/index', type: 'reLaunch'})" class="info-a u-flex u-flex-items-center">
						<text class="u-font-28">资金中心</text>
						<i class="custom-icon-right custom-icon"></i>
					</view>
				</view>
			</view>
			
			
			<view class="main-card" v-if="mode == '1'">
				<view @click="handleGoto('/pages/mine/mine')" class="card-item">
					<view class="item-top icon">
						<i class="custom-icon-my custom-icon"></i>
					</view>
					<view class="item-bottom c-title">返回我的</view>
				</view>
				<view @click="handleGoto('/sinopay/money/sino_info')" class="card-item" v-if="sino.list.auth_state == 1">
					<view class="item-top icon">
						<i class="custom-icon-safe custom-icon"></i>
					</view>
					<view class="item-bottom c-title">已认证</view>
				</view>
				<view @click="handleGoto('/sinopay/money/sino_info')" class="card-item" v-else>
					<view class="item-top icon">
						<i class="custom-icon-warn custom-icon" style="color: red"></i>
					</view>
					<view class="item-bottom c-title">未认证</view>
				</view>
				<view @click="handleGoto('/sinopay/money/bill')" class="card-item">
					<view class="item-top icon">
						<i class="custom-icon-form custom-icon"></i>
					</view>
					<view class="item-bottom c-title">收付记录</view>
				</view>
				<view @click="handleGoto('/sinopay/money/safe_list')" class="card-item">
					<view class="item-top icon">
						<i class="custom-icon-lock custom-icon"></i>
					</view>
					<view class="item-bottom c-title">安全设置</view>
				</view>
			</view> 
	
			<view class="main-card2 " v-else-if="mode == '2'">
				<view class="card-item"  v-if="sino.list.auth_state == 1">
					<view class="item-left icon">
						<i class="custom-icon-safe custom-icon"></i>
					</view>
					<view class="item-right ">
						<view class="c-title">认证状态</view>
						<view class="c-value">已认证</view>
					</view>
				</view>
				<view class="card-item" v-else>
					<view class="item-left icon">
						<i class="custom-icon-warn custom-icon" style="color: red"></i>
					</view>
					<view class="item-right ">
						<view class="c-title">认证状态</view>
						<view class="c-value">未认证</view>
					</view>
				</view>
				<view class="card-item">
					<view class="item-left icon">
						<i class="custom-icon-form custom-icon"></i>
					</view>
					<view class="item-right ">
						<view class="c-title">账号类型</view>
						<view class="c-value" v-if="sino.list.sinopay_pay_pass == 'C'">个人</view>
						<view class="c-value" v-else >企业</view>
					</view>
				</view>
			</view>
		
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		props: {
			mode: {
				type: String | Number,
				default: 1,
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				sino: state => state.sinopay.sino,
				// myCpy: state => state.user.myCpy
			})
		},
		methods: {
			...mapMutations({
				handleGoto: 'sinopay/handleGoto'
			}),
		},
	}
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
		background-image: url("https://wx.rawmex.cn/Public/bg1.png");
		background-size: 100% 80%;
		background-position: top;
		background-repeat: no-repeat;
		padding-top: 85px;
	
		.header-box {
			padding: 0 12px;
	
			.person {
				display: flex;
				align-items: center;
				height: 50px;
				margin-bottom: 18px;
				position: relative;
	
				.item-left {
					flex: 0 0 50px;
					width: 50px;
					height: 50px;
	
					.person-avatar {
						width: 50px;
						height: 50px;
						border-radius: 50%;
						overflow: hidden;
	
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
	
				.item-right {
					flex: 0 0 calc(100% - 50px);
					width: calc(100% - 50px);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					padding-left: 10px;
	
					.person-nick {
						color: #fff;
						font-size: 15px;
						/* padding-left: 8px; */
					}
	
					.person-sub {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;
						font-size: 12px;
	
						.status {
							/* background-color: #007aff; */
							color: #71adef;
							height: 30px;
							border-radius: 15px;
							/* padding: 0 15px; */
							position: relative;
	
							.icon-acc {
								position: absolute;
								left: 0;
								top: 50%;
								transform: translateY(-50%);
								width: 20px;
								height: 20px;
								border-radius: 50%;
								background-color: #feb800;
	
								.custom-icon {
									color: #fff;
									font-size: 12px;
								}
							}
	
							.acc-name {
								padding: 2px 10px 2px 25px;
								border-radius: 10px;
								background-color: rgba(0, 0, 0, 0.7);
								color: #fff;
								margin-left: 5px;
							}
						}
					}
				}
	
				.item-info {
					position: absolute;
					right: -10px;
					bottom: 5px;
					
					// top: 50%;
					// transform: translateY(-50%);
	
					.info-a {
						padding: 2px 5px 2px 15px;
						// display: inline-block;
						background-color: #007aff;
						color: #fff;
						border-radius: 15px 0 0 15px;
					}
				}
			}
		}
	
	}
	
	
	.main-card {
		background-color: #fff;
		height: 90px;
		display: flex;
		align-items: center;
		border-radius: 3px;
		box-shadow: 0 0 5px rgba(90, 90, 90, 0.05);
		margin-bottom: 20px;
	
		.card-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
			align-items: center;
	
			.item-top {
				height: 30px;
				display: flex;
				align-items: center;
				color: #000;
				margin-bottom: 8px;
	
				&.num {
					font-weight: bold;
					font-size: 16px;
				}
	
				.custom-icon {
					font-size: 28px;
					color: #007aff;
				}
			}
	
			.item-bottom {
				&.c-title {
					font-size: 12px;
				}
			}
		}
	}
	
	.main-card2 {
		background-color: #fff;
		height: 80px;
		display: flex;
		align-items: center;
		border-radius: 3px;
		box-shadow: 0 0 5px rgba(90, 90, 90, 0.05);
		margin-bottom: 10px;
		padding: 15px 0;
		.card-item {
			flex: 1;
			display: flex;
			justify-content: center;
			height: 100%;
			align-items: center;
			border-left: 1px solid #f8f8f8;
			.item-left {
				height: 100%;
				display: flex;
				align-items: center;
				color: #000;
				margin-right: 8px;
				&.num {
					font-weight: bold;
					font-size: 16px;
				}
				.custom-icon {
					font-size: 32px;
					color: #007aff;
				}
			}
			.item-right {
				.c-title {
					font-size: 12px;
					color: #999;
					// margin-bottom: 5px;
				}
				.c-value {
					font-size: 15px;
					color: #000;
				}
			}
		}
	}
</style>