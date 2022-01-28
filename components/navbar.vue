<template>
	<view>
		<template>
			<template v-if="tabbar">
				<view class="cu-bar tabbar" :class="{'share-mode': !nav_memu}">
					<view class="cu-bar tabbar bg-white shadow foot">
						<button v-for="(item, zzz) in nav_memu.list" :key="zzz"
							@tap="navTo(item.page+'?memu_id='+item.id)" class="action" :data-index="item.id">
							<view class="cuIcon-cu-image padding-top-xs">
								<template v-if="item.id == 3">
									<u-badge type="error" :count="count" :offset="[0, 15]" size="mini"></u-badge>
								</template>
								<image
									:src="'https://wx3.y.netsun.com/Public/xcx/img/'+ item.img + (index == item.id ? '-active' : '') + '.png'">
								</image>
							</view>
							<view :class="index == item.id ? 'text-drakblue' : 'text-gray'" class="padding-bottom-xs">
								{{item.name}}</view>
						</button>

					</view>
				</view>

			</template>
		</template>
	</view>
</template>

<script>
	export default {
		// props: ['index', 'tabbar', 'name','type'],
		props: {
			index: {
				type: [Number, String],
				default: 0
			},
			tabbar: {
				type: Boolean,
				default: false
			},
			name: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				nav_memu: uni.getStorageSync('nav_menu'),
				activeindex: 0,
				nav_bs_id: 0,
				verson: ""
			};
		},
		created() {
			const accountInfo = wx.getAccountInfoSync()
			if (accountInfo.miniProgram) {
				this.verson = accountInfo.miniProgram.version
			}

			this.home_menuUrl();
		},
		computed: {
			count() {
				return this.$store.state.cartCount
			}
		},
		mounted() {
		},
		methods: {
			home_menuUrl() {
				this.$http
					.get('/Market/home_menu', {
						params: {
							verson: this.verson,
							key: "syb"
						}
					})
					.then(res => {
						if (res.data.code == 1) {
							this.nav_memu = res.data;
							uni.setStorageSync('nav_menu', res.data)
						}
					});

			},
			navTo(e) {
				if (this.type == 2) {
					uni.redirectTo({
						url: e
					});
					return;
				}
				uni.reLaunch({
					url: e
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.share-mode {
		display: none;
	}
	.cuIcon-cu-image {
		position: relative;
	}
</style>
