<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		async onLoad() {
			const res = await this.$http.get('Xcx/home_cate')
			if (res.data.code == 1) {
				let pre_verson = 23 //容错还未更新模板的商家
				// const cate = 18
				const cate = res.data.cate > pre_verson ? 2 : res.data.cate
				this.$store.commit('setHomeCate', cate);
				if(cate != 1) {
					//模板首页
					uni.redirectTo({
						url: "/templateHome/index/home"
					})
				}else {
					uni.redirectTo({
						url: "/pages/index/index"
					})
				}
			}
			
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
