<template>
	<view class="tabbar" :customStyle="customStyle">
		<view class="c-w">
			<slot></slot>
		</view>
		
		<!-- <u-safe-bottom></u-safe-bottom> -->
	</view>
</template>

<script>
	export default {
		props: {
			customStyle: {
				type: Object,
				defualt: () => {
					return {}
				}
			}
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
	}
	.c-w {
		height: 60px;
	}
</style>
