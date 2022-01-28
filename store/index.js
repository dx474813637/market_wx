import Vue from 'vue'
import Vuex from 'vuex'
import { http } from '@/common/service.js' 

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: true,
        hasLogin: false,
        login: "",
		client:[],//个人中心浮动图标位置记录
		chooseIndex:{bs_id:1,business_name:'网盛生意宝'},
		shenhe:1,
		yindao:1,
		tiao:0,
		sharelist:{},
		updatemsg:{},
		CustomBar:64,
		StatusBar:20,
		bannerstate:true,
		has_wp:false,
		tim_login:false,
		currentMessageList:[],	
		conversationActive:{
			conversationID:''
		},
		conversationList:[],
		g_tim:null,
		theme:{
			themeColor:'#5770bd',
			textColor:'#ffffff',
			bgColor:'#ededef'
		},
		regionalList: [],
		couponCate: {},
		history: [],
		userInfo: {},
		cartCount: uni.getStorageSync('cart') ? uni.getStorageSync('cart').reduce((pre, cur) => pre + Number(cur.num) , 0) : 0,
		homeCate: 8,
		exjson: uni.getExtConfigSync(),
		isEwmed: null,
		ewmInfo: {
			title: "",
			info: "",
			button: "",
			titlea: "",
			url: ""
		}
    },
    mutations: {
		changeEwmFlag(state, data) {
			state.isEwmed = data
		},
		isEwmFunc(state) {
			let timeLimit = 86400000 //24h
			let last_time = uni.getStorageSync("last_time")
			if(!last_time) {
				this.commit("changeEwmFlag", true)
				uni.setStorageSync("last_time", new Date().getTime())
			} else {
				let timeD = new Date().getTime() - last_time
				if(timeD >= timeLimit) {
					this.commit("changeEwmFlag", true)
					uni.setStorageSync("last_time", new Date().getTime())
				}else {
					this.commit("changeEwmFlag", false)
				}
			}
		},
		setHomeCate(state, cate) {
			state.homeCate = cate
		},
		setCartCount(state, num) {
			state.cartCount = num
		},
        login(state, login) {
            state.login = login || '新用户';
            state.hasLogin = true;
        },
		loginstatus(state,login){
			state.hasLogin = login
		},
        logout(state) {
            state.login = "";
            state.hasLogin = false;
        },
		setUserInfo(state, info) {
			state.userInfo = info
		},
		removeUserInfo(state) {
			state.userInfo = {}
		},
		addHistory(state, item) {
			state.history.push(item)
		},
		getCouponCate(state, cate) {
			state.couponCate = cate
		},
		recordclient(state,client) {
			state.client = client
		},
		changechoose(state,e) {
			state.chooseIndex = e
		},
		shenhedata(state,e){
			state.shenhe = e
		},
		yindaodata(state,e) {
			state.yindao = e
		},
		tiaodata(state,e) {
			state.tiao = e
		},
		sharedata(state,e) {
			state.sharelist = e
		},
		getupdatemsg(state,e) {
			state.updatemsg = e
		},
		setCustomBar(state,e) {
			state.CustomBar = e
		},
		setStatusBar(state,e) {
			state.StatusBar = e
		},
		changebanner(state,e) {
			state.bannerstate = e
		},
		wpchange(state,e) {
			state.has_wp = e
		},
		//更新登录状态
		toggleIsLogin(state, isLogin) {
		  state.tim_login = typeof isLogin === 'undefined' ? !state.tim_login : isLogin
		},
		pushCurrentMessageList(state, data) {
		  // 还没当前会话，则跳过
		  if (Array.isArray(data)) {
		    // 筛选出当前会话的消息
		    const result = data.filter(item => item.conversationID === state.conversationActive.conversationID)
		    state.currentMessageList = [...state.currentMessageList, ...result]
		  } 
		  // else if (data.conversationID === state.conversationActive.conversationID) {
		  //   state.currentMessageList = [...state.currentMessageList, data]
		  // }
		  if (state.currentMessageList.length > 200) {
		  	state.currentMessageList = state.currentMessageList.slice(100);
		  }
		},
		//选择好友聊天--创建会话/拼接会话id
		createConversationActive(state,toUserId){
			state.conversationActive.conversationID = toUserId
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state,newConversationList){
			state.conversationList = newConversationList
		},
		set_tim(state,tim) {
			state.g_tim = tim 
		},
		changeVoteTheme(state,data) {
			state.theme  = data
		} ,
		getRegionalList(state, list) {
			state.regionalList = list
		},
    },
	actions:{
		async getEwm({commit, state}) {
			const res = await http.get("Xcx/follow_syb")
			state.ewmInfo.title = res.data.title
			state.ewmInfo.titlea = res.data.titlea
			state.ewmInfo.info = res.data.info
			state.ewmInfo.button = res.data.button
			state.ewmInfo.url = res.data.url
		},
		async getEwmData({commit, dispatch, state}) {
			commit("isEwmFunc")
			if(state.isEwmed) {
				dispatch('getEwm')
			}
		},
		addVoteTheme({commit},data) {
			commit('changeVoteTheme',data)
		},
		addCart({commit}, datalist) {
			// if(!this.check()) return 
			//加入购物车
			let list = uni.getStorageSync('cart') || []
			if(list.some(ele => ele.id == datalist.id)) {
				uni.showModal({
				    title: '提示',
					confirmText: '跳转',
				    content: '该商品已在购物车中，如需调整数量请在购物车中操作。确认是否跳转？',
				    success: function (res) {
				        if (res.confirm) {
				            uni.navigateTo({
				            	url: '/pages/cart/cart'
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}else {
				list.push({...datalist, pid: datalist.id, num: 1})
				uni.setStorageSync('cart', list)	
				uni.showToast({
					title: '成功加入购物车'
				})
				commit('setCartCount', list.reduce((pre, cur) => pre + Number(cur.num) , 0))
			}
			
		},
	}
})

export default store
