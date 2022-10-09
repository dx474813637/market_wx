<template>
	<view class="card-w"
		:class="{
			'isMe': msg.sender == login
		}"
	>
		<view class="chat-time u-text-center u-p-20 u-font-28" :style="{
			color: themeConfig.msg.detail.timeColor
		}"
			v-if="msg.showTime == 1"
		>{{msg.sendtime | chatTimeFilter}}</view>
		<view class=" u-flex"
			:class="{
				'u-flex-x-reverse': msg.sender == login
			}">
			<view class="item item-avatar u-flex u-flex-center">
				<view class="wrapper u-flex u-flex-items-center u-flex-center"
					:style="{
						backgroundColor: themeConfig.msg.detail.avatarBg,
					}"
				>
					<i class="custom-icon-myfill custom-icon u-font-28":style="{
						color: themeConfig.msg.detail.avatarColor,
					}"></i>
				</view>
				
				<!-- <u-image 
					:src="msg.avatar" 
					radius="5"
					width="35" 
					height="35"
				 ></u-image> -->
			</view>
			<view class="item item-info u-p-15 u-p-l-20 u-p-r-20 "
					:style="{
						color: msg.sender == login ? themeConfig.msg.detail.contentBg1 : themeConfig.msg.detail.contentBg2,
						background: msg.sender == login ? themeConfig.msg.detail.contentBg1: themeConfig.msg.detail.contentBg2
					}">
					<view class="u-content"
						:style="{
							color: themeConfig.msg.detail.contentColor,
							wordBreak: 'break-all'
						}"
					>
						<u-parse :content="msg.body" @ready="handleRenderReady"></u-parse>
						<!-- <rich-text :nodes="msg.body"></rich-text> -->
					</view>
				
			</view>
			<view class="item u-p-l-20 u-p-t-12 u-p-r-20 " v-if="msg.hasOwnProperty('state')">
				<template v-if="msg.state == 'loading'">
					<u-loading mode="circle" size="45"></u-loading>
				</template>
				<template v-if="msg.state == 'error'">
					<u-icon 
						@click="$emit('reset', msg)"
						name="error-circle-fill" 
						size="20" 
						:color="themeConfig.redText"
					></u-icon>
				</template>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name: 'MsgChatCard',
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
				login: state => state.user.login,
			}),
			...mapGetters({
				themeConfig: 'theme/themeConfig'
			}),
		},
		methods: {
			handleRenderReady() {
				if(this.msg.msgType == 1) return
				this.$emit('ready')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-content {
		font-size: 14px;
		// overflow: hidden;
	}
	.pos {
		position: relative;
	}
	.card-w {
		width: 100%;
		box-sizing: border-box;
		&.isMe {
			.item-info {
				&:after {
					right: -5px;
					border-left: 5px solid ;
					border-right: 0;
				}
			}
		}
		.item-avatar{
			width: 60px;
			.wrapper {
				width: 35px;
				height: 35px;
				border-radius: 5px;
			}
		}
		.item-avatar,
		.item-info {
			box-sizing: border-box;
		}
		.item-info {
			max-width: calc(100% - 120px);
			min-height: 35px;
			position: relative;
			color: #007aff;
			border-radius: 6px;
			&:after {
				content: '';
				position: absolute;
				width: 0;
				height: 0;
				right: 100%;
				top: 12px;
				border-right: 5px solid ;
				border-top: 5px solid transparent;
				border-bottom: 5px solid transparent;
				border-left: 0;
			}
			
		}
	}
	.new-label {
		white-space: nowrap;
	}
</style>
