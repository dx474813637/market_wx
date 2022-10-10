<template>
	<view class="tabbar safe-area-inset-bottom" :style="[customStyle]">
		<view class="c-w" :style="[mainStyle]">
			<slot></slot>
		</view>
		
		<!-- <u-safe-bottom
			:customStyle="{
				backgroundColor: themeConfig.tabBg
			}"
		></u-safe-bottom> -->
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name: 'tabBar',
		props: {
			customStyle: {
				type: Object,
				defualt: () => {
					return {}
				}
			},
			mainStyle: {
				type: Object,
				defualt: () => {
					return {}
				}
			},
			theme: {
				type: String,
				defalut: 'white'
			},
		}, 
		data() {
			return {
				active: 0
			};
		},
		created() {
			
		},
		methods: {
			
		}
	};
</script>

<style scoped lang="scss">
	.tabbar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 10
	}
	.c-w {
		height: 60px;
		transition: all .3s;
	}
</style>
