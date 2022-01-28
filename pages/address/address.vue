<template>
	<view class="content b-t">
		<template v-if="addressList.length > 0">
			<view class="list" :class="{
				active: source == 1
			}">
				<view class="list-item b-b" :class="{
					ziti: item.id == -1,
					sactive: sid == item.id
				}" @click="checkAddress(item)" v-for="(item, index) in addrfilter" :key="item.id">
					<view class="addr-radio">
						<template v-if="sid == item.id">
							<u-icon name="checkmark-circle-fill" color="#007aff" size="38"></u-icon>
						</template>
						<template v-else>
							<view class="nocheck"></view>
						</template>
						
					</view>
					
					<view class="wrapper" v-if="item.id != -1">
						<view class="address-box">
							<text class="tag" v-if="item.auto == 1">默认</text>
							<text class="address">{{item.regional_name}} {{item.address}}</text>
						</view>
						<view class="u-box">
							<text class="name">{{item.name}}</text>
							<text class="mobile">{{item.mobile}}</text>
						</view>
					</view>
					<view class="wrapper" v-if="item.id == -1">
						<view class="address-box">
							<text class="address">{{item.address}}</text>
						</view>
					</view>
					<text v-if="item.id != -1" class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
					<view class="shouhuotitle">收货地址列表</view>
				</view>
			</view>
			<u-loadmore
				:status="loadStatus" 
				:icon-type="iconType" 
				:load-text="loadText" 
				margin-top="20"
				margin-bottom="20"
				color="#999"
			/>
		</template>
		<template v-else>
			<u-empty text="暂无收货地址" mode="list" margin-top="20"></u-empty>
		</template>
		
		<!-- <List listType="dot" :list="addrfilter" emptyText="暂无收货地址" emptyMode="list" :loadStatus="loadStatus">
			<template v-slot:dot="{item}">
				<view class="list b-b" @click="checkAddress(item)">
					<view class="wrapper" v-if="item.id != -1">
						<view class="address-box">
							<text class="address">{{item.regional_name}} {{item.address}}</text>
						</view>
						<view class="u-box">
							<text class="name">{{item.name}}</text>
							<text class="mobile">{{item.mobile}}</text>
						</view>
					</view>
					<view class="wrapper" v-if="item.id == -1">
						<view class="address-box">
							<text class="address">{{item.address}}</text>
						</view>
					</view>
					<text v-if="item.id != -1" class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
				</view>
				
			</template>
		</List> -->
		<button class="add-btn" @click="addAddress('add')">新增地址</button>
		
		
	</view>
</template>

<script>
	import List from '@/components/list/list.vue';
	import listMethods from "./reglist2selectlist.js"
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				source: 0,
				addressList: [],
				p: 1,
				endFlag: false,
				loadStatus: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				sid: ""
			}
		},
		computed: {
			addrfilter() {
				if(this.addressList.length == 0) return []
				if(this.source == 1 && this.sid && this.sid != -1) {
					let oldArr = this.$u.deepClone(this.addressList)
					let i;
					oldArr.some((ele, index) => {
						if(ele.id == this.sid) {
							i = index
							return true
						}else {
							return false
						}
					})
					if(i) {
						return [ ...oldArr.slice(0, 1), oldArr[i], ...oldArr.slice(1, i), ...oldArr.slice(i+1)]
					}
				}
				return this.addressList
				
			}
		},
		components: {
			List
		},
		onLoad(option){
			// console.log(option.source);
			if(option && option.source) {
				this.source = option.source;
			}
			if(option && option.sid) {
				this.sid = option.sid;
				console.log(this.sid)
			}
			
			// this.$http.post('Xcx/regional_list').then(res => {
			// 	console.log(JSON.parse(res.data.list))
			// })
			// this.$http.get('check_login')
			this.getData()
			this.getRegionalList()
		},
		onReachBottom() {
			this.getNextData()
		},
		methods: {
			init(){
				this.addressList = []
				this.p = 1
				this.endFlag = false
				this.loadStatus = 'loadmore'
			},
			getNextData() {
				if(this.endFlag) return
				this.p = this.p + 1
				this.getData()
			},
			async getRegionalList() {
				//获取地区toCode 数据 存入vuex
				if(this.$store.state.regionalList.length != 0) {
					return
				}
				let res = await this.$http.get('Xcx/regional_list')
				let resList = JSON.parse(res.data.list)
				const list = listMethods(resList)
				this.$store.commit('getRegionalList', list)
				
			},
			async getData() {
				this.loadStatus = 'loading'
				let res = await this.$http.get('Xcx/addresss_list', {params: {p: this.p, t:1}})
				if(res.data.code == 1) {
					let list = res.data.list.list
					// if(this.p == 1 && this.source != 1) list.splice(0, 1)
					this.addressList = [...this.addressList, ...list]
					
					// console.log(this.addressList)
					if(this.p == res.data.list.pw_page_total) {
						this.endFlag = true
						this.loadStatus = 'nomore'
					}else this.loadStatus = 'loadmore'
					uni.hideLoading()
				}
			},
			//选择地址
			checkAddress(item){
				// console.log(item)
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(type){
				this.init()
				this.getData()
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				// this.addressList.unshift(data);
				
				// console.log(data, type);
			}
		}
	}
</script>
<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
</style>
<style lang='scss' scoped>
	.content{
		position: relative;
	}
	.list.active {
		.list-item {
			padding-left: 90rpx;
			&.sactive {
				padding-left: 90rpx;
			}
			.addr-radio {
				display: block;
			}
		}
	}
	.list-item {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		background: #fff;
		position: relative;
		width: 100%;
		min-height: 130rpx;
		.addr-radio {
			position: absolute;
			display: none;
			left: 28rpx;
			top: 50%;
			transform: translateY(-50%);
			.nocheck {
				width: 30rpx;
				height: 30rpx;
				margin-left: 2rpx;
				border-radius: 50%;
				border: 1rpx solid #ccc;
			}
		}
		&.ziti {
			margin-bottom: 60rpx;
			.shouhuotitle {
				display: flex;
			}
		}
		.shouhuotitle {
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			height: 60rpx;
			background-color: #f8f8f8;
			display: none;
			align-items: center;
			padding: 0 20rpx;
			color: #999;
		}
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		/* display: flex; */
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
		justify-content: center;
		height: 80upx;
		width: 120rpx;
		font-size: 40upx;
		color: $font-color-light;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		margin-bottom: 0;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		/* box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		 */
	}
</style>
