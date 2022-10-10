<template>
	<view>
		<view @click="handleDetail"  :class="['bank-card', bank_class]">
			<view class="card-left">
				<view class="bank-logo">
					<i class="custom-icon-vipcard custom-icon"></i>
				</view>
			</view>
			<view class="card-content">
				<view class="bank-name u-line-1">{{bank_name}}</view>
				<!-- <view class="card-sub u-line-1">{{bank_sub}}</view> -->
				<view class="card-num u-line-1">
					{{bank_no.slice(0, bank_no.length - 4).replace(/[A-Za-z0-9]/g, '*')}}
					{{bank_no.slice(bank_no.length - 4)}}
				</view>
			</view>
			<view class="card-btn">
				<i class="custom-icon custom-icon-more"></i>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "BankCard",
		props: {
			origin: {
				type: Object,
				default: () => {
					return {}
				}
			},
			bank_class: {
				type: String,
				default: ''
			},
			bank_name: {
				type: String,
				default: '其他银行'
			},
			bank_sub: {
				type: String,
				default: '储蓄卡'
			},
			bank_no: {
				type: String,
				default: '***********************'
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			handleDetail() {
				this.$emit('detail', this.origin)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank-card {
		border-radius: 10px;
		display: flex;
		position: relative;
		padding: 20px 10px ;
		height: 120px;
		box-sizing: border-box;
		background-color: $bank-card-normal;
		background: linear-gradient(
			90deg,
			$bank-card-dark,
			$bank-card-normal
		);
		&.ny {
			background-color: #36997d;
			background: linear-gradient(90deg, #36997d, #54ba9f);
			.card-left .bank-logo .custom-icon {
				color: #36997d;
			}
		}
		&.zg {
			background-color: #f33846;
			background: linear-gradient(90deg, #f33846, #fb776a);
			.card-left .bank-logo .custom-icon {
				color: #f33846;
			}
		}
		&.gs {
			background-color: #f33846;
			background: linear-gradient(90deg, #f33846, #fb776a);
			.card-left .bank-logo .custom-icon {
				color: #f33846;
			}
		}
		&.js {
			background-color: #013077;
			background: linear-gradient(90deg, #013077, #004af1);
			.card-left .bank-logo .custom-icon {
				color: #013077;
			}
		}
		&.jt {
			background-color: #013077;
			background: linear-gradient(90deg, #013077, #004af1);
			.card-left .bank-logo .custom-icon {
				color: #013077;
			}
		}
		&.gd {
			background-color: #5917da;
			background: linear-gradient(90deg, #5917da, #6965d6);
			.card-left .bank-logo .custom-icon {
				color: #5917da;
			}
		}
		.card-left {
			flex: 0 0 50px;
			width: 50px;
			.bank-logo {
				width: 35px;
				height: 35px;
				overflow: hidden;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 0.3);
				padding: 3px;
				margin-left: 5px;
				display: flex;
				box-sizing: border-box;
				justify-content: center;
				align-items: center;
				color: $bank-card-dark;
				.custom-icon {
					font-size: 20px;
				}
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					overflow: hidden;
				}
			}
		}
		.card-content {
			color: #fff;
			.bank-name {
				font-size: 15px;
				margin-bottom: 5px;
			}
			.card-sub {
				font-size: 12px;
				opacity: .8;
			}
			.card-num {
				padding-top: 20px;
				opacity: 0.5;
				span {
					font-size: 16px;
					margin-right: 10px;
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
		.card-btn {
			position: absolute;
			top: 10px;
			right: 10px;
			opacity: 0.5;
			color: #fff;
			.custom-icon {
				font-size: 18px;
			}
			.custom-icon {
				color: #fff;
			}
		}
	}
</style>
