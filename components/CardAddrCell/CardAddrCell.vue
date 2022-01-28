<template>
	<view class="list b-b" @click="checkAddress(list)" :key="list.id">
		<view class="wrapper" v-if="list.id != -1">
			<view class="address-box">
				<text class="address">{{list.regional_name}} {{list.address}}</text>
			</view>
			<view class="u-box">
				<text class="name">{{list.name}}</text>
				<text class="mobile">{{list.mobile}}</text>
			</view>
		</view>
		<view class="wrapper" v-if="list.id == -1">
			<view class="address-box">
				<text class="address">{{list.address}}</text>
			</view>
		</view>
		<text v-if="list.id != -1" class="yticon icon-bianji" @click.stop="addAddress('edit', list)"></text>
	</view>
</template>

<script>
	export default {
		name:"CardAddrCell",
		data() {
			return {
				
			};
		},
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			},
			
		},
			
		created() {
			console.log(this.list)
		},
		methods: {
			addAddress(type, data) {
				this.$emit("addAddress", {
					type,
					data
				})
			},
			//选择地址
			checkAddress(data){
				this.$emit("checkAddress", {
					data
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
		width: 100%;
		min-height: 130rpx;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		/* align-items: center; */
		.tag{
			font-size: 24upx;
			color: #fa436a;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
			height: 40rpx;
			flex-shrink: 0;
			flex-grow: 0;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	

</style>
