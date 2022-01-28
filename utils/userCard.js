import { http } from '@/common/service.js'
import store from '@/store'

export async function getUserCard() {
	let res = await http.get('Xcx/my_card')
	if(res.data.code == 1) {
		store.commit('setUserInfo', res.data.list)
	}
}

