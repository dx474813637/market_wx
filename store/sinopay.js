
let state = {
		sino: uni.getStorageSync('sino') || {
			list: {}, 
		},
		sino_zh: {
			B: {}, //付款账户
			S: {}, //收款账户
		},
		sinoFund: [],
		sinoFundLoading: false, 
	},
	getters = {
		
	},
	mutations = {
		setSinoAccount(state, data) {
			state.sino = data
			uni.setStorageSync('sino', data)
		},
		setSinoFundAccount(state, data = {}) { 
			state.sino_zh[data.type] = data.data
		},
		setSinoFundLoading(state, data) {
			state.sinoFundLoading = data
		},  
		clearSino(state, data) {
			state.sinoFund = []
			state.sino = {}
			state.sino_zh = {
				user_fundaccno_b: {}, 
				user_fundaccno_s: {}, 
			} 
			uni.setStorageSync('sino', {})
		},
		handleGoto(state, obj) {  
			this._vm.$u.route(obj)
		},
	},
	actions = {
		async getSinoAccount({commit, state}, data={}) {
			const res = await this._vm.$http.get('Market/moneyCenter3');
			console.log(res)
			if(res.data.code == 1) {
				commit('setSinoAccount', res.data)
			}
		},
		// async getSinoFundAccount({commit, state}, data={}) {
			
		// 	commit('setSinoFundLoading', true)
		// 	const res = await this._vm.$api.sino_fund_account();
		// 	commit('setSinoFundLoading', false)
		// 	if(res.data.code == 1) {
		// 		commit('setSinoFundAccount', res.data.list)
		// 	}
		// },
		async getSinoFundAccount({commit, state}, data={type: 'B'}) {
			
			commit('setSinoFundLoading', true)
			let func = 'sino_zh1'
			if(data.type == 'S') {
				func = 'sino_zh2'
			}
			const res = await this._vm.$http.get(`market/${func}`);
			commit('setSinoFundLoading', false)
			if(res.data.code == 1) {
				commit('setSinoFundAccount', {type: data.type, data: res.data[data.type == 'S' ? 'user_fundaccno_s' : 'user_fundaccno_b']})
			}
		},
		// async getSinoBillAccount({commit, state}, data={}) {
			 
		// 	commit('setSinoBillLoading', true)
		// 	const res = await this._vm.$api.sino_bill_account_list(); 
			
		// 	commit('setSinoBillLoading', false)
		// 	if(res.data.code == 1) {
		// 		commit('setSinoBillAccount', res.data.list.bill_account)
		// 	}
		// },
		// async getSinoBillAccountList({commit, state}, data={}) {
			 
		// 	commit('setSinoBillListLoading', true)
		// 	const res = await this._vm.$api.sino_bill_account_list_account(); 
		// 	commit('setSinoBillListLoading', false)
		// 	if(res.data.code == 1) {
		// 		commit('setSinoBillAccountList', res.data.list.list_accounts)
		// 	}
		// },
		async refreshSinoFundAccount({commit, state}, data={}) {
			
			// commit('setSinoFundLoading', true)
			const res = await this._vm.$api.sino_fund_account_refresh_bal({
				params: {
					account_id: data.id
				}
			});
			// commit('setSinoFundLoading', false)
			// if(res.data.code == 1) {
			// 	commit('setSinoFundAccount', res.data.list)
			// }
		},
	}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}