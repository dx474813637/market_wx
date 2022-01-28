<template>
	<view><web-view :src="url"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad(options) {
		if (options.hasOwnProperty('url')) {
			this.url = options.url;
		} else {
			this.url = `https://mp.weixin.qq.com/s/ZCa4JJENAx0TGacAkttjAg`;
		}
	},
	methods: {}
};
</script>

<style lang="less"></style>
