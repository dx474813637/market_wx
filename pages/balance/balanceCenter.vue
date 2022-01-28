<template>
	<view>
		<view class="card">
			<u-cell-group>
				<u-cell-item 
					v-for="(item, index) in list" 
					:icon="item.icon" 
					:title="item.name" 
					:icon-style="iconStyle"
					@click="navTo(item.path)"
					:key="index"
				></u-cell-item>
			</u-cell-group>

		</view>

	</view>
</template>

<script>
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				iconStyle: {
					color: '#5770bd'
				},
				list: [
					{
						name: 'Sinopay余额',
						icon: 'rmb-circle',
						path: '/pages/balance/balance'
					},
					{
						name: '账单',
						icon: 'order',
						path: '/pages/balance/bill'
					}
				]
			};
		},
		methods: {

			navTo(url) {
				uni.navigateTo({
					url
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
<style lang="scss" scoped>
	.card {
		background-color: #fff;
	}
</style>
