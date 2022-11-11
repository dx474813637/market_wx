<template>
	<view class="u-content">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ``
			}
		},
		async onLoad() {
			const res = await this.$http.get('market/bang_about_detail')
			if(res.data.code == 1) {
				this.content = res.data.list
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
