<template>
	<view class="card-w u-flex u-flex-items-center u-p-l-20 u-p-r-20" :style="{
		borderColor: themeConfig.msg.rows.borderColor,
		background: themeConfig.msg.rows.cardBg,
	}"
	@click="msgDetailClick"
	>
		<view class="item item-avatar pos">
			<view class="wrapper u-flex u-flex-items-center u-flex-center"
				:style="{
					backgroundColor: themeConfig.msg.detail.avatarBg,
				}"
			>
				<i class="custom-icon-myfill custom-icon u-font-40":style="{
					color: themeConfig.msg.detail.avatarColor,
				}"></i>
			</view>
			<!-- <u-image :src="msg.avatar" width="50" height="50" radius="6"></u-image> -->
			<u-badge absolute :offset="[-2,-2]" isDot :show="msg.read == '1'" bgColor="#ff2225"></u-badge>
		</view>
		<view class="item item-info u-flex-1 u-flex u-flex-column u-flex-around u-p-l-20 ">
			<view class="item-one u-flex u-flex-items-center u-flex-between">
				<view class="u-flex-1 u-line-1"
					:style="{
						color: themeConfig.msg.rows.titleColor
					}"
				>{{msg.name || msg.clogin}}</view>
				<view class="u-font-24 u-p-l-20"
					:style="{
						color: themeConfig.msg.rows.subColor
					}"
				>{{msg.uptime | date2timestamp | chatTimeFilter(true)}}</view>
			</view>
			<view class="item-two u-flex u-flex-items-center "
				:style="{
					color: themeConfig.msg.rows.contentColor
				}"
				>
				<view class="new-label u-font-28 u-p-r-8" 
					:style="{
						color:  themeConfig.msg.rows.newlabel
					}"
					v-if="msg.read == '1'"
					>[新消息]</view>
				<!-- <view class="u-font-24 u-p-l-20"
					:style="{
						color: themeConfig.msg.rows.subColor
					}"
					>{{msg.uptime | date2timestamp | chatTimeFilter(true)}}</view> -->
				<view class="u-line-1 u-font-28">{{msg.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name: 'MsgRowsCard',
		props: {
			msg: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				typeActive: state => state.theme.typeActive,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig'
			}),
		},
		methods: {
			msgDetailClick() {
				this.$emit('detail', this.msg)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pos {
		position: relative;
	}
	.card-w {
		width: 100%;
		height: 80px;
		border-top: 1rpx solid ;
		box-sizing: border-box;
		.item-avatar,
		.item-info {
			height: 50px;
			box-sizing: border-box;
		}
		.wrapper {
			width: 50px;
			height: 50px;
			border-radius: 5px;
		}
	}
	.new-label {
		white-space: nowrap;
	}
</style>
