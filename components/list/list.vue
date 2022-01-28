<template>
	<view>
		<template v-if="list.length > 0">
			<view class="list" :class="{grid: listType == 'grid'}">
				<view 
					class="list-item"
					v-for="(item, index) in list"
					:key="index"
				>
					<template v-if="listType == 'dot'">
						<view @click="handlegoto(item)">
							<slot name="dot" :item="item" :type="billType"></slot>
						</view>
					</template>
					<template v-else-if="listType == 'grid'">
						<view @click="handlegoto(item)">
							<slot name="grid" :item="item"></slot>	
						</view>
					</template>
					
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
			<u-empty :text="emptyText" :mode="emptyMode" :margin-top="emptymarginTop"></u-empty>
		</template>
	</view>
</template>

<script>
	export default {
		name:"list",
		props: {
			loadStatus: {
				type: String,
				defalut: 'loadmore'
			}, 
			listType: {
				type: String,
				defalut: 'dot'
			}, 
			emptyText: {
				type: String,
				defalut: '无内容'
			}, 
			emptyMode: {
				type: String,
				defalut: 'list'
			}, 
			emptymarginTop: {
				type: String | Number,
				default: 80
			},
			list: {
				type: Array,
				defalut: () => []
			},
			mainKey: {
				type: String,
				defalut: 'id'
			},
			billType: {
				type: String | Number,
				default: 0
			}
		},
		data() {
			return {
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				}
			};
		},
		methods:{
			handlegoto(obj){
				this.$emit('goto', obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	.list-item {
		width: 100%;
	}
	&.grid .list-item {
		flex: 0 0 49%;
		width: 49%;
		&:nth-of-type(2n) {
			margin-left: 1%;
		}
		&:nth-of-type(2n-1) {
			margin-right: 1%;
		}
	}
}
</style>
