<template>
	<view class="w">
		<view class="list">
			<list
				:list="list"
				:loadStatus="loadStatus"
				:listType="listType"
				emptyText="列表为空"
				emptyMode="list"
				@goto="handlePathDetail"
			>
				<template v-slot:dot="{item}">
					<CardProductCell :list="item"></CardProductCell>
				</template>
				
			</list>
			
		</view>
	</view>
	
</template>

<script>
	import { List } from '@/components/list/list.vue';
	import { CardProductCell } from '@/components/CardProductCell/CardProductCell.vue'
	export default {
		data() {
			return {
				list: [],
				loadStatus: 'nomore',
				p: 1,
				endFlag: false,
				listType: 'dot',
			}
		},
		components: {
			List,
			CardProductCell
		},
		onShow() {
			this.list = uni.getStorageSync('followList') || []
		},
		methods: {
			handlePathDetail(obj) {
				uni.navigateTo({
					url: `/pages/prodDetail/prodDetail?id=${obj.id}`,
				})
			},
		}
	}
</script>
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style scoped lang="scss">
	
	.list {
		
		padding: 20rpx 15rpx 15rpx;
		.grid-card {
			margin-bottom: 20rpx;
			width: 100%;
			background-color: #fff;
			overflow: hidden;
			border-radius: 10rpx;
			.card-img-w {
				position: relative;
				width: 100%;
				padding-top: 100%;
				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0,0,0,.1);
					z-index: 20;
				}
				.card-img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
			.card-info {
				padding: 20rpx;
				.info-title {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding-bottom: 10rpx;
					font-size: 30rpx;
				}
				.info-price {
					display: flex;
					justify-content: space-between;
				}
			}
		}
		
		
	}
	.info-price {
		display: flex;
		align-items: flex-end;
		height: 60rpx;
		font-size: 24rpx;
		// flex-wrap: wrap;
		color: #999;
		.price {
			padding: 0 14rpx;
			border-radius: 8rpx;
		}
		.item {
			margin-right: 0rpx;
		}
		.price-red {
			color: #fff;
			background-color: red;
			background: linear-gradient(to right, #aa55ff, #ff00b3);
		}
		.price-big {
			font-size: 1.1rem;
		}
		.cheap-price-dw {
			// color: red;
			font-family: '微软雅黑';
			margin-right: 4rpx;
		}
		.cheap-price {
			// font-size: 34rpx;
			// font-weight: bold;
		}
		.cheap-price-label {
			margin-left: 6rpx;
			font-size: 24rpx;
		}
		.sold-num {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
