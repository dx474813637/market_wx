
/* 购物车 */
const cartList = [{
		id: 1,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
		attr_val: '春装款 L',
		stock: 15,
		title: 'OVBE 长袖风衣',
		price: 278.00, 
		number: 1 
	},
	{
		id: 3,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 3,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 5
	},
	{
		id: 4,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 5,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 6,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 7,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 8,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 15,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 1
	},
	{
		id: 9,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 10,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 11,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 12,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 13,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552405266625&di=a703f2b2cdb0fe7f3f05f62dd91307ab&imgtype=0&src=http%3A%2F%2Fwww.78.cn%2Fzixun%2Fnews%2Fupload%2F20190214%2F1550114706486250.jpg',
		attr_val: '春装款/m',
		stock: 15,
		title: '女装2019春秋新款',
		price: 420.00,
		number: 1
	}
];

const orderList = [{
		id: 0,
		shopname: '生意宝旗舰店',
		status: 0,
		yj_money: 7123,
		sj_money: 6623,
		time: '2021-4-16 09:09:28',
		orderlist: [{
				pid: 0,
				pname: '皱纹牛皮纸',
				psub: '商品副标题/副描述',
				img: 'http://img-i-album.toocle.com/568-495/2018/11/12/d8/5be96ff5097d8.jpg',
				count: 5,
				dj_money: 99
			},
			{
				pid: 1,
				pname: '柏油防潮纸2021年156x156465mm 柏油防潮纸2021年156x156465mm',
				psub: '商品副标题/副描述',
				img: 'http://img-i-album.toocle.com/568-495/2018/11/12/b7/5be96ff50f5b7.jpg',
				count: 5,
				dj_money: 299
			},
		]

	},
	{
		id: 1,
		shopname: '生意宝旗舰店',
		status: 1,
		yj_money: 456,
		sj_money: 123,
		time: '2021-4-16 01:09:28',
		orderlist: [{
			pid: 0,
			pname: '皱纹牛皮纸',
			psub: '商品副标题/副描述',
			img: 'http://img-i-album.toocle.com/568-495/2018/11/12/d8/5be96ff5097d8.jpg',
			count: 2,
			dj_money: 99,
		}, ]
	},
	{
		id: 2,
		shopname: '生意宝旗舰店',
		status: 2,
		yj_money: 3589,
		sj_money: 3447,
		time: '2021-4-15 05:09:28',
		orderlist: [{
			pid: 0,
			pname: '皱纹牛皮纸',
			psub: '商品副标题/副描述',
			img: 'http://img-i-album.toocle.com/568-495/2018/11/12/d8/5be96ff5097d8.jpg',
			count: 5,
			dj_money: 99,
		}, ]
	}
]

const couponList = [{ 
		id: 0,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 60,
		money: 19,
		ps: ''
	},
	{
		id: 1,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 199,
		money: 49,
		ps: ''
	},
	{
		id: 2,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 299,
		money: 99,
		ps: ''
	},
	{
		id: 3,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 299,
		money: 99,
		ps: ''
	},
	{
		id: 4,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 999,
		money: 299,
		ps: ''
	},
	{
		id: 5,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 499,
		money: 199,
		ps: ''
	},
	{
		id: 6,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 299,
		money: 99,
		ps: ''
	},
	{
		id: 7,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 100,
		money: '8折',
		ps: ''
	},
	{
		id: 8,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '某某分类',
		time: '2021年4月16日 - 2021年4月16日',
		limit: 339,
		money: 120,
		ps: ''
	},
	{
		id: 9,
		name: '生意宝旗舰店平台活动优惠券',
		cgy: '五金分类',
		time: '2021年4月10日 - 2021年6月16日',
		limit: 500,
		money: 140,
		ps: ''
	},
]

const accountBalance = 1448.50

const balanceList= [
	{
		id: 0,
		paytime: '2021-4-19 16:48:55',
		paytype: '直接支付',
		paystatus: '等待支付',
		payid: '10002220',
		paymoney: 5440.11,
		payshop: '浙江马化云材料科技有限公司',
	},
	{
		id: 1,
		paytime: '2021-4-18 16:48:55',
		paytype: '直接支付',
		paystatus: '支付成功',
		payid: '10001220',
		paymoney: 9440.11,
		payshop: '浙江马化云材料科技有限公司',
	},
	{
		id: 2,
		paytime: '2021-4-17 16:48:55',
		paytype: '直接支付',
		paystatus: '支付成功',
		payid: '10002320',
		paymoney: 14440.11,
		payshop: '浙江马化云材料科技有限公司',
	},
	{
		id: 3,
		paytime: '2021-4-19 16:48:55',
		paytype: '直接支付',
		paystatus: '等待支付',
		payid: '10002220',
		paymoney: 5440.11,
		payshop: '浙江马化云材料科技有限公司',
	},
	{
		id: 4,
		paytime: '2021-4-14 16:48:55',
		paytype: '直接支付',
		paystatus: '退款成功',
		payid: '10001220',
		paymoney: 9440.11,
		payshop: '浙江马化云材料科技有限公司',
	},
	{
		id: 5,
		paytime: '2021-4-15 16:48:55',
		paytype: '直接支付',
		paystatus: '支付成功',
		payid: '10002320',
		paymoney: 14440.11,
		payshop: '浙江马化云材料科技有限公司',
	}
] 
const billDetail = {
		id: 0, 
		paytime: '2021-4-15 16:48:55',
		paytype: '现金支付',
		paystatus: '支付成功',
		payid: '10002320DASDAS1231XZC',
		orderid: '10002320451156165154DAS',
		paymoney: 14440.11,
		payshop: '浙江马化云材料科技有限公司',
	}
const productList = [
	{
		id: 0,
		title: '2021年分类产品名称热卖折扣商品大打折扣2021',
		pic: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
		price: '269',
	},
	{
		id: 1,
		title: '2021年分类产品名称热卖折扣商品大打折扣2021',
		pic: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
		price: '269',
	},
	{
		id: 2,
		title: '2021年分类产品名称热卖折扣商品大打折扣2021',
		pic: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
		price: '269',
	},
	{
		id: 3,
		title: '2021年分类产品名称热卖折扣商品大打折扣2021',
		pic: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
		price: '369',
	},
	{
		id: 4,
		title: '2021年分类产品名称热卖折扣商品大打折扣2021',
		pic: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
		price: '469',
	},
	{
		id: 5,
		title: '2021年分类产品名称热卖折扣商品大打折扣2021',
		pic: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
		price: '169',
	},
]


export default {
	cartList,
	orderList,
	couponList,
	accountBalance,
	balanceList,
	billDetail,
	productList
}
