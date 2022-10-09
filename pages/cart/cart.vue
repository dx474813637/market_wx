<template>
	<view class="container">
		<view>
			<!-- 列表 -->
			<view class="cart-list">
				<template v-if="cartList && cartList.length > 0">
					<block v-for="(item, index) in cartList" :key="item.id">
						<view
							class="cart-item" 
							:class="{'b-b': index!==cartList.length-1}"
						>
							<view class="image-wrapper">
								<u-image
									width="100%"
									height="100%"
									:src="item.pic1"
									mode="aspectFill"
								></u-image>
								
								<view 
									class="yticon icon-xuanzhong2 checkbox"
									:class="{checked: item.checked}"
									@click="check('item', index)"
								></view>
							</view>
							<view class="item-right">
								<text class="clamp title">{{item.name}}</text>
								<text class="attr">{{item.model}}</text>
								<text class="price">¥{{item.price | isTalk}}</text>
								<uni-number-box 
									class="step"
									:min="1" 
									:value="item.num"
									:isMax="false"
									:isMin="item.num===1"
									:index="index"
									@eventChange="numberChange"
								></uni-number-box>
							</view>
							<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
						</view>
					</block>
				</template>
				<template v-else>
					<u-empty text="购物车中空空如也!" mode="list" margin-top="160"></u-empty>
					<navigator open-type="redirect" url="/pages/index/index" class="gg">
						去逛逛~
					</navigator>
				</template>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section-w safe-area-inset-bottom">
				<view class="action-section">
					<view class="checkbox">
						<view class="img-bg">
							<image 
								:src="allChecked?'/static/selected.png':'/static/select.png'" 
								mode="aspectFit"
								@click="check('all')"
							></image>
						</view>
						
						<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
							清空
						</view>
					</view>
					<view class="total-box">
						<text class="price">¥{{total}}</text>
					</view>
					<button type="primary" class="no-border confirm-btn" @click="createOrder">创建订单</button>
				</view>
				
			</view>
		</view>
		<nav-bar :index="3" :tabbar="true"></nav-bar>
	</view>
</template>

<script>
	// import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	import {
		mapState
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		// mixins: [mixCheckLogin],
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
			};
		},
		onShow() {
			this.loadData();
			uni.hideHomeButton()
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			handleErr(e) {
				console.log(e)
			},
			handleLoad(e) {
				console.log(e)
			},
			//请求数据
			async loadData(){
				let list = uni.getStorageSync('cart') || []; 
				let cartList = list.map(item=>{
					if(!item.checked && item.checked !== false) item.checked = true;
					return item;
				});
				uni.setStorageSync('cart', cartList)
				this.cartList = cartList;
				this.calcTotal();  //计算总价
			},
			setCartData() {
				uni.setStorageSync('cart', this.cartList)
				this.$store.commit('setCartCount', this.cartList.reduce((pre, cur) => pre + Number(cur.num) , 0))
			},
			 //选中状态处理
			check(type, index){
				if(type === 'item'){
					this.cartList[index].checked = !this.cartList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.setCartData()
				this.calcTotal(type);
			},
			//数量
			numberChange(data){
				this.cartList[data.index].num = data.number;
				this.setCartData()
				this.calcTotal();
			},
			//删除
			deleteCartItem(index){
				let list = this.cartList;
				let row = list[index];
				let id = row.id;

				this.cartList.splice(index, 1);
				this.setCartData()
				this.calcTotal();
				uni.hideLoading();
			},
			//清空
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					success: (e)=>{
						if(e.confirm){
							this.cartList = [];
							this.setCartData()
							this.calcTotal();
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					this.total = 0
					this.allChecked = false
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item=>{
					if(item.checked === true){
						if(item.price == "议价") {
							total += 0
						}else {
							total += item.price * item.num;
						}
						
					}else if(checked === true){
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder(){
				if(!uni.getStorageSync('login')) {
					uni.setStorageSync('prePage', getCurrentPages()[getCurrentPages().length - 1].$page.fullPath)
					uni.navigateTo({
						url: '/pages/login/index'
					})
					uni.showToast({
						title: '请登录生意宝账号。',
						icon: 'none'
					})
					return
				}
				let list = this.cartList;
				let goodsData = [];
				list.forEach(item=>{
					if(item.checked){
						goodsData.push({
							attr_val: item.attr_val,
							number: item.number
						})
					}
				})
				if(goodsData.length == 0) {
					uni.showToast({
						title: '请勾选商品。',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: `/pages/createOrder/createOrder`
				})
				// this.$api.msg('跳转下一页 sendData');
			}
		}
	}
</script>

<style lang='scss' scoped>
	.gg {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		color: $uni-color-theme;
		text-decoration: underline;
		font-size: 30rpx;
	}
	.container{
		padding-bottom: 134upx;
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		.image-wrapper{
			width: 200upx;
			height: 200upx;
			flex-shrink: 0;
			position:relative;
			image{
				width: 200upx;
				height: 200upx;
				border-radius:8upx;
			}
		}
		.checkbox{
			position:absolute;
			left:-16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				/* font-size:$font-base + 2upx; */
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}
			.attr{
				font-size: 24rpx;
				color: $font-color-light;
				height: 40upx;
				line-height: 40upx;
			}
			.price{
				height: 50upx;
				line-height:50upx;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: $font-color-light;
		}
	}
	/* 底部栏 */
	.action-section-w {
		position:fixed;
		left: 30upx;
		bottom:120upx;
		z-index: 95;
		width: 100%;
		.action-section{
			display: flex;
			align-items: center;
			width: 690upx;
			padding: 0 30upx;
			height: 100upx;
			background: rgba(255,255,255,.9);
			box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
			border-radius: 16upx;
			.checkbox{
				height:52upx;
				position:relative;
					z-index: 5;
				.img-bg {
					background-color: #fff;
					border-radius: 50%;
					width: 52upx;
					height: 100%;
					position:relative;
					z-index: 5;
				}
				image{
					width: 52upx;
					height: 100%;
					position:relative;
					z-index: 5;
				}
			}
			.clear-btn{
				position:absolute;
				left: 26upx;
				top: 0;
				z-index: 4;
				width: 0;
				height: 52upx;
				line-height: 52upx;
				padding-left: 38upx;
				font-size: $font-base;
				color: #fff;
				background: $font-color-disabled;
				border-radius:0 50px 50px 0;
				opacity: 0;
				transition: .2s;
				&.show{
					opacity: 1;
					width: 120upx;
				}
			}
			.total-box{
				flex: 1;
				display:flex;
				flex-direction: column;
				text-align:right;
				padding-right: 40upx;
				.price{
					font-size: $font-lg;
					color: $font-color-dark;
					font-weight: bold;
				}
				.coupon{
					font-size: $font-sm;
					color: $font-color-light;
					text{
						color: $font-color-dark;
					}
				}
			}
			.confirm-btn{
				padding: 0 38upx;
				margin: 0;
				border-radius: 100px;
				height: 76upx;
				line-height: 76upx;
				font-size: $font-base + 2upx;
				background: $uni-color-theme;
				/* box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72) */
			}
		}
	}
	
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-theme;
	}
</style>
