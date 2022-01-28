# uni-app-template
集成colorui，u-view组件库以及无痛刷新token的uni-app项目模板

`news_list` 参数p
`news_detail` 参数id
`product_list` 参数p term（ 搜索关键字） tags（分类名称）
term、tags两个不能同时有效，传tags了term就无效。
`product_detail` 参数id

`coupon_list_login` 旺铺优惠活动列表 参数p
`shop_coupon_login_list` 账号领取的优惠券列表 参数login（用户自己的login）
`get_use_coupon` 优惠券可用判断 login cno（优惠券编码）
`coupon_detail` 优惠券活动详情 id
`login_follow` 直播间关注按钮
`check_login` 登录状态 返回的login不等于0就是登录

`syblogin`  生意宝账号登录 参数login passwd msgcode
有账号密码登录  账号验证码登录  账号验证码注册
`sign_out` 生意宝账号退出
`msgcode` 验证码获取 参数login（手机号不能是账号）

`create_order` 生成订单 参数pid_array  address_id
json格式，每一条记录包含： cid表示旺铺ID，pid商品ID，num表示购买的商品数量
`order_list` 订单列表 参数p  type  订单类型 选填(系统默认4全部订单)  1待付款2待发货3待收货4全部订单
`order_detail` 订单详情 参数order_id
`user_account`  余额 会把银行信息带过来。

`user_account_refresh` 余额更新 参数user_fundaccno  余额接口里的user_fundaccno
`addresss_list` 地址列表 参数p
`address_detail` 地址详情 参数address_id
`regional_list` 地区列表  在编辑地址时regional字段需要用到。
`address_change` 地址修改 
		参数
		name      收件人姓名       必填
		mobile    收件人手机号码   必填
		regional  收件地区(数字) 这里用到地区列表接口   必填
		address   收件详细地址     必填
		remark    备注             选填
		address_id  地址列表中的地址ID值  选填  修改时原有数据时需要带上，否则是新添加数据
		auto  0 1
`pay_list` 生意宝账单列表 参数p
`wx_pay_list` 微信账单列表 参数p
`set_buy_get_type`
order_id   订单ID      必填
buy_address_id 地址ID  必填   
`check_tran_price`  订立订单 参数order_id订单ID
`roll_back_tran_price` 取消订立 参数order_id订单ID
`sinopay` 参数psw:041029abc 订单order_id coupon_id coupon_guid
`xcx_pay`接口 参数
pay_price 价格 单位分
order_id 订单id
coupon_id
coupon_guid
`my_card`个人信息
`edit_card`
name
position
company
phone
tel
email
address
weixin

`sinopay_ok` 生意宝支付使用的买家确认收货接口
psw
order_id
`sinopay_ok2` 微信支付使用的买家确认收货接口
order_id
`sinopay_ok3` 赊账支付使用的买家确认收货接口
order_id
code
`get_mobile_code` 赊账确认收货时，获取验证码
order_id
`coupon_product_list` 参数id  活动id
`analysis_share_login_list` 优惠券我的推广列表 参数：p
`sinopay_credit` 允不允许赊账支付

`login_binding_auth` 账号绑定权限查询 没参数
`login_binding` 账号绑定 参数：name 微信绑定银行卡的姓名