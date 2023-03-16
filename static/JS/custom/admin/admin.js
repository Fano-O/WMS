import {
	execSql,
	objValue,
	checkLoginStatus
} from '../../../../App.vue'
// 监听页面加载
export function onLoad(options) {
	checkLoginStatus() //检查登录状态
	let that = this;
	that.date = new Date().getFullYear();
	execSql('wms', objValue('stock', 'queryLend'), (res) => {
		that.lend = res.result.data.reverse() // 根据最新时间进行排序
	})
}
// 添加库存
export function addStock() {
	let that = this;
	let id;
	execSql('wms', objValue('stock', 'queryStockLength'), (res) => {
		id = res.result.total + 1
		execSql('wms', objValue('stock', 'addStock', id, null, null, null, null, null, null, null, that.brand,
			that.type, that.model, that.serialNo), (res) => {
			that.brand = "" // 清空输入框
			that.type = "" // 清空输入框
			that.model = "" // 清空输入框
			that.serialNo = "" // 清空输入框
			if (res.success) {
				uni.showToast({
					title: '添加成功',
					icon: 'success'
				})
				that.showadd = false
			} else {
				uni.showToast({
					title: '添加失败',
					icon: 'error'
				})
			}
		})
	})
}
// 查询全部
export function queryAll() {
	let that = this
	that.showquery = !that.showquery;
	if (that.showquery) {
		execSql('wms', objValue('record', 'queryAll'), (res) => {
			that.all = res.result.data.reverse()
			that.allArray = that.all
		})
	}
}
// 模糊搜索
export function search(v, arr) {
	// v 传入的搜索框值  arr 传入的recordArray数组
	let that = this;
	let itemarr = []
	if (v == "") {
		that.all = arr // 恢复原来的数据
	}
	that.all.filter(item => {
		// 品牌,类型,姓名,手机号,时间,备注都可以进行模糊搜索
		let name = item.name
		let phone = item.phone
		let time = item.time
		let remarks = item.remarks
		let brand = item.params[0].brand
		let type = item.params[0].type
		if (name.indexOf(v) !== -1 || phone.indexOf(v) !== -1 || time.indexOf(v) !== -1 || remarks.indexOf(
				v) !== -1 || brand.indexOf(v) !== -1 || type.indexOf(v) !== -1) {
			itemarr.push(item) // 符合条件插入到新数组
		} else {
			itemarr = itemarr
		}
		that.all = itemarr // 显示匹配成功的结果
	});
}
// 下拉刷新
export function onPullDownRefresh() {
	execSql('wms', objValue('stock', 'queryLend'), (res) => {
		that.lend = res.result.data.reverse() // 根据最新时间进行排序
	})
	setTimeout(function() {
		wx.stopPullDownRefresh()
	}, 500)
}
// 转发给朋友
export function onShareAppMessage() {
	return {
		title: '后台管理',
		path: '/pages/admin/admin',
	}
}
// 转发到朋友圈
export function onShareTimeline() {
	return {
		title: '后台管理'
	}
}
