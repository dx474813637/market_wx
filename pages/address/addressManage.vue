<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<u-input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名"
				placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<u-input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码"
				placeholder-class="placeholder" />
		</view>
		<view class="row b-b" @click="chooseLocation2">
			<text class="tit">地区</text>
			<text class="input">
				{{addressData.regional_name || '请点击选择地区'}}
			</text>
			<u-icon name="arrow-down" size="32" color="#7181bd"></u-icon>
			<!-- <text class="yticon icon-shouhuodizhi"></text> -->
			<!-- <input class="input" type="text" v-model="addressData.regional_name" placeholder="楼号、门牌" placeholder-class="placeholder" /> -->
		</view>
		<view class="row b-b">
			<text class="tit">住址</text>
			<u-input class="input" type="text" v-model="addressData.address" placeholder="收货人住址"
				placeholder-class="placeholder" />
			<!-- <u-icon name="map-fill" size="36" color="#7181bd"></u-icon> -->
			<!-- <text class="yticon icon-shouhuodizhi"></text> -->
		</view>

		<view class="row default-row u-row-between">
			<!-- <text class="tit">备注</text>
			<input class="input" type="text" v-model="addressData.remark" placeholder="备注"
				placeholder-class="placeholder" /> -->
			<text class="tit">设为默认</text>
			<u-switch :active-color="theme.themeColor" v-model="addressData.autoCheck" @change="switchChange"></u-switch>
			<!-- <switch :checked="addressData.defaule" @change="switchChange" /> -->
		</view>
		<button class="add-btn" @click="confirm">提交</button>
		<u-select v-model="show" mode="mutil-column-auto" :list="regionalList" @confirm="areaConfirm"
			safe-area-inset-bottom :default-value="dArr"></u-select>
	</view>
</template>

<script>
	import listMethods from "./reglist2selectlist.js"
	import mixCheckLogin from '@/utils/mixCheckLoginStatus.js'
	import {mapState} from "vuex"
	export default {
		mixins: [mixCheckLogin],
		data() {
			return {
				show: false,
				initDefault: false,
				addressData: {
					address: "",
					mobile: '',
					name: "",
					regional: '',
					regional_name: "",
					remark: "",
					autoCheck: false,
					auto: 0
					// ctime: "",
					// id: '',
					// login: "",
					// post_ip: "",
					// post_time: "",
					// poster_id: "",
					// tags: "",
					// name: '',
					// mobile: '',
					// addressName: '在地图选择',
					// address: '',
					// area: '',
					// default: false
				},
				regionalList: [],
				dArr: [0, 0, 0]
			}
		},
		computed: {
			...mapState(['theme'])
		},
		watch: {
			['addressData.autoCheck'](flag) {
				if(flag) {
					this.addressData.auto = 1
				}else {
					this.addressData.auto = 0
				}
			}
		},
		async onLoad(option) {
			let title = '新增收货地址';
			if (this.$store.state.regionalList.length == 0) {
				uni.showLoading({
					title: '初始化地区列表中...'
				})
				await this.getRegionalList()
				uni.hideLoading()
			}
			this.regionalList = this.$store.state.regionalList
			if (option.type === 'edit') {
				title = '编辑收货地址'
				// let res = await this.$http.get('address_detail', {params: {address_id:option.data.id}})
				this.addressData = JSON.parse(option.data)
				if(this.addressData.auto == 1) {
					this.$set(this.addressData, "autoCheck", true)
					this.initDefault = true
				}else {
					this.$set(this.addressData, "autoCheck", false)
				}
				this.filterRegionalList(this.addressData.regional, this.regionalList)
			}
			
			// console.log(this.addressData.regional)
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(v) {
				if(!v && this.initDefault) {
					this.addressData.autoCheck = true
					uni.showToast({
						title: "至少一个默认地址",
						icon: "none"
					})
				}
				
			},
			async getRegionalList() {
				//获取地区toCode 数据 存入vuex
				if (this.$store.state.regionalList.length != 0) {
					return
				}
				let res = await this.$http.get('Xcx/regional_list')
				let resList = JSON.parse(res.data.list)
				const list = listMethods(resList)
				this.$store.commit('getRegionalList', list)

			},
			filterRegionalList(code, list) {
				if (!code) return
				list.forEach((ele, index) => {
					if (ele.children && ele.children.length > 0) {
						ele.children.forEach((item, i) => {
							if (item.value == code) {
								this.dArr = [index, i, 0]
								return
							}
							if (item.children && item.children.length > 0) {
								item.children.forEach((item2, i2) => {
									if (item2.value == code) {
										this.dArr = [index, i, i2]
										return
									}
								})
								// this.dArr = [index, i]
							}
						})

					}
				})
			},
			chooseLocation2() {
				this.show = true
			},
			areaConfirm(e) {
				this.addressData.regional = e[2].value
				let name = e[0].label + e[1].label
				if(e[1].value !== e[2].value) name += e[2].label
				this.addressData.regional_name = name
			},
			//地图选择地址
			chooseLocation() {
				console.log('x')
				uni.chooseLocation({
					success: (data) => {
						// console.log(data)
						// this.addressData.regional_name = data.address;
						this.addressData.address = data.address + ' ' + data.name;
						// this.addressData.area = data.name;
					}
				})
			},

			//提交
			async confirm() {
				let data = this.addressData;
				if (!data.name) {
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if (!data.regional_name) {
					this.$api.msg('请选择地区');
					return;
				}
				if (!data.address) {
					this.$api.msg('请在地图选择住址');
					return;
				}
				await this.submitData(this.addressData)
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				this.$api.prePage().refreshList(this.manageType);
				this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				setTimeout(() => {
					uni.navigateBack()
				}, 800)
			},
			async submitData(addressData) {
				uni.showLoading({
					title: '地址提交中...'
				})
				let res = await this.$http.post('Xcx/address_change',{
					name: addressData.name,
					mobile: addressData.mobile,
					regional: addressData.regional,
					address: addressData.address,
					remark: addressData.remark,
					address_id: addressData.id,
					auto: addressData.auto
				})
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
			height: 100%;
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		// .tit {
		// 	flex: 1;
		// }

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		// box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
