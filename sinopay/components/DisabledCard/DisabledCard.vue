<template>
	<view class="bg-white uni-shadow-base u-radius-10 u-p-30 " :style="{
		background: bg, 
	}">
		<view class="u-flex u-flex-items-center u-flex-center text-white" style="min-height: 80px;">
			<view class="item icon u-p-r-40 u-p-l-10">
				<text :class="['custom-icon u-font-40', icon]"></text>
			</view>
			<view class="item u-flex-1">
				<view class="title u-m-b-40 u-font-28 ">
					{{title}}
				</view>
				<view class="sub u-font-36">
					{{sub}}
				</view>
			</view>
			<view class="sub2 item u-font-28">
				{{sub2}}
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		props: {
			icon: {
				type: String,
				default: 'custom-icon-card_fill'
			},
			title: {
				type: String,
				default: '该功能'
			},
			sub: {
				type: String,
				default: '未开通'
			},
			sub2: {
				type: String,
				default: '请前往电脑端开通'
			},
			bg:{
				type: String,
				default: 'linear-gradient(45deg, #007aff, #aa55ff)'
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.w {
		background: linear-gradient(to right, #007aff, #aa55ff);
		
	}
	.icon {
		opacity: .4;
	}
	.title {
		opacity: .8;
	}
	.sub2 {
		opacity: .5;
	}
	.sub {
		font-weight: bold;
	}
</style>