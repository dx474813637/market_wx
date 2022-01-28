<template>
	<view class="w">
		<view class="video-w" :class="{'row-video': rowVideo}" :style="{height: vHeight + 'px'}">
			<!-- src="https://live.manywei.com/live/1400365402_1_c18969051519_main_gq.m3u8" -->
			<template v-if="zt == 1 && !live_src">
				<image class="no-live-bg" src="https://m.toocle.com/live/Public/nolive2.jpg"></image>
			</template>
			<template v-else>
				<video id="myVideo" 
					:src="live_src"
					@error="videoErrorCallback" 
					:controls="false" 
					autoplay 
					poster="" 
					style="width: 100%;height: 100%;"
					object-fit="fill" 
					@loadedmetadata="handleGetmeadata" 
				></video>
			</template>


			<view class="live-header">
				<view class="live-info">
					<view class="live-avatar">
						<u-image width="100%" height="100%" shape="circle"
							:src="room_avatar"></u-image>
					</view>
					<view class="live-host">
						<view class="host-name">{{room_name}}</view>
						<view class="p-num">{{room_num}}人次观看</view>
					</view>
					<view class="live-eye-btn" @click="followBtn">{{live_follow == 1 ? '已关注' : '关注'}}</view>
				</view>
				<view class="live-info right">
					<view class="live-room-id">
						房间ID：{{chatroomId}}
					</view>
				</view>
			</view>

			<view class="live-bottom safe-area-inset-bottom">
				<view class="live-chat-product">
					<!-- 聊天滚屏 -->
					<scroll-view class="live-chat" :class="{'rowVideo': rowVideo}" scroll-y scroll-with-animation :scroll-top="chatScroll"
						@scrolltolower="handleScrolltolower">
						<view class="list" id="msgList" :style="{paddingTop: chatpdtp + 'rpx'}"
							@touchstart="chatListTouchstart" @touchend="chatListTouchend">
							<view class="list-item" v-for="(item, index) in msgList" :key="item.ID">
								<text class="chat-card" :class="{sys: item.payload.data == 'system'}">
									<template v-if="item.payload.data == 'system'">
										<text class="name">系统消息：</text>
									</template>
									<template v-else>
										<text
											class="name">{{ item.from == userInfo.userId ? userInfo.nick : item.nick }}：</text>
									</template>
									<text class="content">{{ item.payload.description }}</text>
								</text>
							</view>
						</view>
					</scroll-view>
					
					<template v-if="tjProduct.title">
						<view class="live-product">
							<view class="product-card" @click="handlePathDetail({xcx_pages: tjProduct.xcx_pages})">
								<view class="product-label">讲解中</view>
								<view class="product-img">
									<image :src="tjProduct.pic" mode=""></image>
								</view>
								<view class="product-info">
									<view class="info-name">{{tjProduct.title}}</view>
									<view class="info-price">
										<text class="dw">¥</text>
										<text class="num">{{tjProduct.price}}</text>
										<!-- <text>元</text> -->
									</view>
								</view>
							</view>
						</view>
					</template>
				</view>
				
				<!-- 当前讲解产品 -->
				<!-- <template v-if="tjProduct.title">
					<view class="live-product">
						<view class="product-card" @click="handlePathDetail({id: 0})">
							<view class="product-label">讲解中</view>
							<view class="product-img">
								<image :src="tjProduct.pic" mode=""></image>
							</view>
							<view class="product-info">
								<view class="info-name">{{tjProduct.title}}</view>
								<view class="info-price">
									<text class="dw">¥</text>
									<text class="num">{{tjProduct.price}}</text>
								</view>
							</view>
						</view>
					</view>
				</template> -->
				
				<!-- 底部菜单栏 -->
				<view class="live-tabbar" :class="{'rowVideo': rowVideo}">
					<view class="tabbar-item product">
						<view class="product-btn" @click="handleShowList">
							<image src="https://m.toocle.com/live/Public/news/img/shop_03.png"></image>
							<view class="product-num">{{plist.length}}</view>
						</view>
					</view>
					<view class="tabbar-item input">
						<view class="chat-input">
							<u-input v-model="textMsg" placeholder="聊点什么..." :custom-style="inputStyle"
								confirm-type="发送" @confirm="sendText" />
						</view>
					</view>
					<view class="tabbar-item">
						<view class="like-btn" @click="likeClick">
							<likeButton ref="likeButton" :site="[100, 80]" :throttle="0">
								<view class="icon-w">
									<u-icon name="thumb-up-fill"></u-icon>
								</view>
								
								<!-- <image @click="likeClick" src="https://m.toocle.com/live/Public/news/img/zanshang_03.png" mode="aspectFill" class="i-btn"
									style="height: 100%;width: 100%;"></image> -->
							</likeButton>
						</view>
						
					</view>
					<view class="tabbar-item">
						<view class="dz-img">
							<view class="icon-w">
								<u-icon name="redu" custom-prefix="custom-icon"></u-icon>
							</view>
						</view>
						<view class="dz-num" v-if="room_dianzan > 0">{{room_dianzan}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup 
			v-model="productListShow" 
			mode="bottom" 
			safe-area-inset-bottom
			:height="800"
			border-radius="20"
		>
			<view class="p-w">
				<list
					:list="plist"
					:loadStatus="loadStatus"
					listType="dot"
					emptyText="列表为空"
					emptyMode="list"
					@goto="handlePathDetail"
				>
					<template v-slot:dot="{item}">
						<CardProductCell :list="item"></CardProductCell>
					</template>
				</list>
			</view>
		</u-popup>
	</view>
</template>
<script>
	// enter_live_room 进入直播间接口 推荐产品直接放这里面了，不用再接口读。
	// like_live_room 直播间点赞接口
	// recommend_live_room 当前推荐产品（讲解中产品）
	// if (item.payload.data == 'recommend_room_product') {
	//         recommend_room_product();//到当前推荐产品接口去读数据
	// }
	import {
		likeButton
	} from '@/components/like-button.vue';
	import { List } from '@/components/list/list.vue';
	import { CardProductCell } from '@/components/CardProductCell/CardProductCell.vue';
	var TIM = require('@/static/js/tim-wx.js');
	let query
	import {
		mapState
	} from 'vuex';
	import mixShareInfo from '@/utils/mixShareInfo.js'
	export default {
		mixins: [mixShareInfo],
		data() {
			return {
				plist: [],
				loadStatus: 'nomore',
				inputStyle: {
					padding: '0 20rpx',
					color: '#fff'
				},
				title: 'video',
				src: '',
				showVideo: false,
				vHeight: 0,
				rowVideo: false,
				options: {
					autoplay: true,
					flv: '',
					m3u8: '',
					poster: ''
				},
				userInfo: {
					nick: '',
					avatar: '',
					userId: '',
					userSig: '',
					like_num: ''
				},
				chatroomId: 0,
				login: '',
				zt: 1,
				scrollTop: 0,
				scrollHeight: 0,
				msgList: [],
				//文字消息
				textMsg: '',
				active_index: 0,
				product_list: {
					p: 1,
					list: [],
					hasmore: true,
					init: false
				},
				TIM: null,
				keyHeight: 0,
				isFocus: false,
				isInput: false,
				room_name: '',
				room_num: 0,
				room_avatar: '',
				chatScroll: 0,
				chatpdtp: 320,
				chatTouchFlag: false,
				productListShow: false,
				room_dianzan: 0,
				livePoster: '',
				tjProduct: {},
				live_src: '',
				live_follow: 0,
				shareOptions: {
					pageName: '直播间'
				}
			}
		},
		components: {
			likeButton,
			List,
			CardProductCell
		},
		created() {
			let _this = this;
			//  监听键盘高度
			// uni.onKeyboardHeightChange(res => {
			// 	_this.keyHeight = res.height;
			// });
			_this.TIM = _this.$TIM;
			_this.$store.commit('createConversationActive', 'GROUPsyb_room');
		},
		onShareTimeline(){
			return{
				title: this.shareOptions.pageName,
				query: `roomid=${this.chatroomId}`
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.shareOptions.pageName,
				path: '/' + this.$scope.route + '?roomid=' + this.chatroomId
			};
		},
		onLoad(options) {
			// this.vHeight = uni.getSystemInfoSync().windowHeight
			if (options.hasOwnProperty('roomid')) {
				this.chatroomId = options.roomid;
			} else {
				this.chatroomId = '1';
			}
			this.enter_room();
			// 保持屏幕常亮
			uni.setKeepScreenOn({
				keepScreenOn: true
			});
		},
		destroyed() {
			uni.setKeepScreenOn({
				keepScreenOn: false
			});
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		computed: {
			...mapState({
				currentMessageList: state => state.currentMessageList,
				tim_login: state => state.tim_login
			}),
			StatusBar() {
				return this.$store.state.StatusBar;
			},
			CustomBar() {
				return this.$store.state.CustomBar;
			},
		},
		watch: {
			currentMessageList(newVal, oldVal) {
				if (newVal.length == 0) {
					return;
				}
				let data = newVal[newVal.length - 1]; //最新一条消息
				// console.log(data)
				if (data.payload.extension == this.chatroomId) {
					if (data.payload.data == 'recommend_room_product') {
						console.log('推荐产品')
					} else if (data.payload.data == 'like') {
						this.room_dianzan ++
						if (data.payload.description != this.userInfo.userId) {
							this.$refs.likeButton.handleClick();
						}
					} else if (data.payload.data == 'system' || data.payload.data == 'text') {
						if (data.payload.data == 'system') {
							if (data.payload.description.includes('进入房间')) {
								this.add_room_num();
							} else if (data.payload.description.includes('退出房间')) {
								this.del_room_num();
							}
						}
						this.msgList = [...this.msgList, data];
					}
				}
			},
			msgList(newV) {
				// console.log(newV)
				if (this.chatTouchFlag) return
				if (newV.length > 10) {
					this.chatpdtp = 20
				}
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this).select('#msgList').boundingClientRect(data => {
						// console.log(data.height, this.chatScroll)
						if (this.chatScroll != data.height) {
							this.chatScroll = data.height
						}
					}).exec();
				})
				
			}
		},
		mounted() {
			// query = uni.createSelectorQuery().in(this)
			
		},
		methods: {
			async followBtn() {
				if(this.live_follow == 1) {
					uni.showToast({ title: '您已关注本直播间' })
					return
				}
				let list = await this.$http.get('/login_follow')
				
				
			},
			handlePathDetail(obj) {
				uni.navigateTo({
					url: `${obj.xcx_pages}&live=${this.live_src}`,
				})
			},
			handleShowList() {
				this.productListShow = true
			},
			chatListTouchstart(e) {
				this.chatTouchFlag = true
			},
			chatListTouchend(e) {
				this.chatTouchFlag = false
			},
			handleScrolltolower() {
				// this.len = this.msgList.length
			},
			sendText() {
				if (!this.textMsg) {
					return;
				}
				if (!this.tim_login) {
					uni.showToast({
						title: '尚未加入聊天室',
						icon: 'none'
					});
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {
					text: content
				};
				this.sendMsg(msg, 'text');
				this.textMsg = ''; //清空输入框
				uni.hideKeyboard();
			},
			handleGetmeadata(e) {
				console.log(e)
				let sysInfo = uni.getSystemInfoSync()
				let h = (e.detail.height / e.detail.width) * sysInfo.windowWidth
				if(h < sysInfo.windowHeight / 2) {
					this.rowVideo = true
					this.chatpdtp = 450
				}
				this.vHeight = h
			},
			enter_room() {
				this.$http
					.post('recommend_live_room', {
						roomid: this.chatroomId
					})
					.then(res => {
						this.tjProduct = res.data.list.list
						this.$nextTick(() => {
							this.msgList.push({
								ID: 'no1',
								payload: {
									data: 'system',
									description: '欢迎大家来到直播间！平台严禁未成年人进行直播或打赏，请大家共同遵守、监督。直播间内禁止出现违法违规、低俗色情、吸烟酗酒及涉政等内容，若有违规行为请及时举报。'
								}
							})
						})
						// this.tjProduct.pic = this.tjProduct.pic.replace('http://', 'https://')
					})
					
				this.$http
					.post('enter_live_room', {
						roomid: this.chatroomId
					})
					.then(res => {
						console.log(res)
						if (res.data.code == 1) {
							let list = res.data.list
							this.options = list.live_h5;
							this.room_name = list.live.author;
							this.shareOptions.pageName = list.live.title
							this.room_num = list.online;
							this.room_dianzan = list.live.num;
							this.room_avatar = list.live.img
							if(list.live_h5.m3u8) {
								this.live_src = list.live_h5.m3u8.includes('https') ? list.live_h5.m3u8 : 'https:' + list.live_h5.m3u8
							}else {
								if(res.data.vod_list.list && res.data.vod_list.list.length != 0) {
									this.live_src = res.data.vod_list.list[0].video_url
								}
							}
							this.plist = res.data.tj_list.list
							this.livePoster = list.live_h5.poster
							this.live_follow = res.data.follow
							
							this.userInfo = {
								nick: list.list.nick,
								avatar: list.list.avatarurl,
								userId: list.list.userid,
								userSig: list.list.usersig,
								like_num: list.list.num
							};
							this.zt = list.list.zt;
							if (list.list.zt == 1) {
								this.vHeight = uni.getSystemInfoSync().windowHeight
								uni.showToast({
										title: '主播还在赶来的路上...',
										icon: 'none'
									},
									3000
								);
							}
							this.login = list.list.live_info.login;

							// this.tim_online_login();
							let _this = this;
							let promise = _this.tim.login({
								userID: _this.userInfo.userId,
								userSig: _this.userInfo.userSig
							});
							promise
								.then(res => {
									_this.$store.commit('toggleIsLogin', true);
									let promise = _this.tim.joinGroup({
										groupID: 'syb_room',
										type: _this.$TIM.TYPES.GRP_AVCHATROOM
									});
									promise
										.then(function(imResponse) {})
										.catch(function(imError) {
											console.log('joinGroup error:', imError); // 申请加群失败的相关信息
										});
								})
								.catch(err => {
									console.warn('login error:', err); // 登录失败的相关信息
								});
							_this.tim.on(_this.$TIM.EVENT.SDK_READY, _this.onReadyStateUpdate);
							// 收到新消息
							_this.tim.on(_this.$TIM.EVENT.MESSAGE_RECEIVED, _this.onReceiveMessage);
							// 会话列表更新
							_this.tim.on(_this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
								this.$store.commit('updateConversationList', event.data);
							});
							
							
						}
					});
				
			},
			videoErrorCallback: function(e) {
				console.log(e)
				if (e.detail.errMsg) {
					this.videoContext.stop()
					this.vHeight = uni.getSystemInfoSync().windowHeight
				}
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = 'https://quan001.y.netsun.com/';
								let imgstr = '<img src="' + onlinePath + this.onlineEmoji[EM.url] + '">';
								return imgstr;
							}
						}
					}
				});
				return replacedStr;
			},
			fliterMyMsg(e) {
				if (e.payload.data == 'like') {
					this.$refs.likeButton.handleClick();
				} else {
					this.msgList = [...this.msgList, e];
				}

			},
			// 发送消息
			async sendMsg(content, type) {
				const res = await this.$http.get("msgcheck", {params: {
					body: content
				}})
				if(res.data.code != 1) return
				this.tim_sendMsg('text', content.text);
			},
			tim_sendMsg(type, content) {
				let message = this.tim.createCustomMessage({
					to: 'syb_room',
					conversationType: 'GROUP', //C2C或GROUP
					payload: {
						data: type,
						description: content,
						extension: this.chatroomId
					}
				});
				let pomise = this.tim.sendMessage(message);
				this.fliterMyMsg(message);
			},
			onReadyStateUpdate({
				name
			}) {
				//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
				//sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
			},
			onReceiveMessage({
				data: messageList
			}) {
				this.$store.commit('pushCurrentMessageList', messageList);
			},
			add_room_num() {
				this.room_num++;
			},
			del_room_num() {
				this.room_num--;
			},
			likeClick() {
				this.tim_sendMsg('like', this.userInfo.userId);
				this.$http.post('Xcx/like_live_room', {
					roomid: this.chatroomId
				}).then(res => {
					this.room_dianzan ++
				})
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #333;
		background: linear-gradient(45deg, #022138, #331d3c);
	}
</style>
<style scoped lang="scss">
	.p-w {
		padding: 20rpx;
		height: 100%;
		background-color: #f5f5f5;
	}
	.video-w {
		width: 100%;
		&.row-video {
			margin-top: 120rpx;
		}
		.live-header {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 120rpx;
			padding: 0 10rpx;

			.live-info {
				display: flex;
				align-items: center;
				height: 80rpx;
				background-color: rgba(0,0,0, 0.3);;
				padding: 0 20rpx;
				border-radius: 40rpx;
				font-size: 24rpx;

				&.right {
					height: 50rpx;
					border-radius: 25rpx;
				}

				.live-avatar {
					width: 60rpx;
					height: 60rpx;
				}

				.live-host {
					padding: 0 15rpx;

					.host-name {}

					.p-num {
						font-size: 20rpx;
					}
				}

				.live-eye-btn {
					background: linear-gradient(45deg, #007aff, #aa55ff);
					height: 35rpx;
					padding: 0 20rpx;
					line-height: 35rpx;
					text-align: center;
					border-radius: 25rpx;
					color: #fff;
					font-size: 20rpx;
				}
			}
		}

		.no-live-bg {
			width: 100%;
			height: 100%;
		}

		.live-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding-left: 10rpx;
			padding-right: 10rpx;
			.live-chat-product {
				display: flex;
				align-items: flex-end;
			}
			.live-product {
				padding: 10rpx 10rpx 0;
				position: relative;
				z-index: 200;
				bottom: 30rpx;
				.product-card {
					display: flex;
					width: 200rpx;
					height: 300rpx;
					border-radius: 8rpx;
					overflow: hidden;
					position: relative;
					background-color: #fff;
					flex-direction: column;
					.product-label {
						position: absolute;
						left: -1rpx;
						top: -1rpx;
						font-size: 20rpx;
						background: linear-gradient(45deg, #ff557f, #ff0000);
						color: #fff;
						border-radius: 0rpx 0 6rpx 0rpx;
						padding: 2rpx 10rpx;
						z-index: 20;
						// transform: scale(.9);
						// transform-origin: 0 0;
						letter-spacing: 2rpx;
						opacity: .8;
					}

					.product-img {
						flex: 0 0 200rpx;
						width: 100%;
						height: 200rpx;
						margin-right: 10rpx;
						position: relative;

						&:after {
							content: '';
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							background-color: rgba(0, 0, 0, 0.1);
						}

						image {
							position: relative;
							width: 100%;
							height: 100%;
						}
					}

					.product-info {
						flex: 1;
						overflow: hidden;
						display: flex;
						flex-direction: column;
						padding: 6rpx;
						.info-name {
							color: #000;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 24rpx;
							margin-bottom: 10rpx;
						}

						.info-price {
							// color: red;
							display: flex;
							align-items: center;
							flex: 1;
							font-size: 24rpx;
							padding: 0 10rpx;
							border-radius: 6rpx;
							background: linear-gradient(45deg, #ff557f, #ff0000);
							color: #fff;
							.dw {
								font-family: '微软雅黑';
							}

							.num {
								font-size: 28rpx;
								padding: 0 6rpx;
							}
						}
					}
				}
			}

			.live-chat {
				flex: 1;
				width: 100%;
				height: 320rpx;
				color: #eee;
				font-size: 24rpx;
				-webkit-mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 1) 20px, rgba(255, 255, 255, 1) 100%);
				&.rowVideo {
					height: 450rpx;
					.list {
						padding-top: 450rpx;
					}
				}
				.list {
					padding-top: 320rpx;

					.list-item {
						margin-bottom: 10rpx;

						.chat-card {
							display: inline-block;
							padding: 10rpx 15rpx;
							border-radius: 15rpx;
							width: auto;
							background-color: rgba(0, 0, 0, .1);
							word-break: break-all;
							&.sys {
								color: #ecc07e;

								.name {
									color: #ecc07e;
								}
							}
						}

						.name {
							color: #05deff;
						}

						.content {}
					}
				}
			}

			.live-tabbar {
				display: flex;
				align-items: center;
				height: 130rpx;
				// padding-bottom: 20rpx;
				
				&.rowVideo {
					.tabbar-item {
						.chat-input,
						.like-btn,
						.dz-img {
							background-color: rgba(100, 100, 100, 0.3);
						}
					}
				}
				.tabbar-item {
					flex: 0 0 90rpx;
					padding: 0 10rpx;
					height: 70rpx;
					position: relative;
					
					&.input {
						flex: 1;
					}

					.product-btn {
						width: 60rpx;
						height: 70rpx;
						position: relative;

						.product-num {
							position: absolute;
							left: 50%;
							bottom: 5rpx;
							transform: translateX(-50%);
							color: #fff;
							z-index: 20;
							font-size: 22rpx;
						}

						image {
							width: 100%;
							height: 100%;
						}
					}
					
					.chat-input,
					.like-btn,
					.dz-img {
						background-color: rgba(0,0,0, 0.3);
						border-radius: 35rpx;
					}

					.like-btn,
					.dz-img {
						width: 70rpx;
						height: 70rpx;
						// padding: 15rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						.icon-w {
							margin-top: -5rpx;
						}
						image {
							width: 100%;
							height: 100%;
						}
					}

					.chat-input {
						height: 100%;

						input {
							height: 100%;
							padding: 0 30rpx;
							color: #fff;
						}
					}

					.like-btn {
						font-size: 34rpx;
						background: linear-gradient(45deg, #007aff, #aa55ff);
						color: #00ffff;
					}

					.dz-img {
						font-size: 36rpx;
						background: linear-gradient(45deg, #007aff, #aa55ff);
						color: #00ffff;
					}

					.dz-num {
						position: absolute;
						bottom: calc(100% - 10rpx);
						left: 50%;
						transform: translateX(-50%);
						background: linear-gradient(45deg, #ff557f, #ff0000);
						// background-color: #fff;
						color: #fff;
						font-size: 20rpx;
						border-radius: 15rpx;
						padding: 5rpx 10rpx;

					}
				}
			}
		}
	}
</style>
