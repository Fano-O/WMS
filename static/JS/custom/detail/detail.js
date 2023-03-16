import {
	execSql,
	objValue,
	time,
	checkLoginStatus
} from '../../../../App.vue'
// 监听页面加载
export function onLoad(options) {
	checkLoginStatus() //检查登录状态
	let that = this
	that.id = Number(options.id)
	execSql('wms', objValue('stock', 'queryStock', that.id, null, null, null, null), (res) => {
		that.stock = res.result.data // stock表里的数据
		that.name = that.stock[0].name // 姓名
		that.phone = that.stock[0].phone // 手机号
		that.remarks = that.stock[0].remarks // 备注
		that.statusContent = that.stock[0].status //借出状态
		that.value = that.stock[0].status // u-switch 双向绑定 依据借出状态
		that.input = that.stock[0].status // u-input 双向绑定 依据借出状态
		if (that.statusContent) {
			// 判断借出状态来决定是否启用输入框
			that.input = true; // 禁用输入框
			that.show = true // 显示switch
		} else {
			that.input = false // 启用输入框
		}
	})
	execSql('wms', objValue('record', 'queryRecord', that.id, null, null, null, null, that.offset, that.limit), (
		res) => {
		that.record = res.result.data.reverse() // 根据最新时间进行排序
		that.recordArray = that.record // 存进recordArray数组 模糊搜索所需参数
		that.offset += that.limit; // 更新offset变量的值
	})
}
// 查询记录表
export function queryRecord() {
	let that = this
	execSql('wms', objValue('record', 'queryRecord', that.id, null, null, null, null, that.offset, that.limit), (
		res) => {
		that.record = that.record.concat(res.result.data) // 拼接数组
		that.recordArray = that.record // 存进recordArray数组 模糊搜索所需参数
	})
	that.offset += that.limit; // 更新offset变量的值
}
// Switch状态发生改变校验完毕执行数据库操作
export function change() {
	let that = this
	let namereg = /^[\u4e00-\u9fa5]{2,4}$/; // 姓名正则
	let phonereg = /^1[3456789]\d{9}$/; // 手机号正则
	if (!namereg.test(that.name) || !phonereg.test(that.phone)) {
		that.show = false // 将switch隐藏
		that.value = false // 将switch状态设置为未借出
		// 正则判断 符合则更新 不符合则弹窗提示
		uni.showToast({
			title: '请检查',
			icon: 'error'
		})
	} else {
		update()
	}
	// 更新库存、记录状态
	function update() {
		that.status = true
		that.statusContent = !that.statusContent
		that.remarks !== null ? that.remarks.trim() : that.remarks = "无";
		// objValue(tablename, api, id, name, phone, time, status, offset, limit, remarks)
		// objValue(表名,进行的api指令,设备id,姓名,手机号,时间,状态,查询的起始位置,每次查询的数量,备注) 没有填null
		execSql('wms', objValue('record', 'addRecord', that.id, that.name.trim(), that.phone.trim(), time(), that
			.value, null, null, that.remarks), (res) => {
			execSql('wms', objValue('stock', 'updateStock', that.id, that.name.trim(), that.phone.trim(), null,
				that.value, null, null, that.remarks), (res) => {
				that.input = false // 解除输入框禁用
				const title = that.value == false ? "归还成功" : "借出成功" // 定义弹窗文字
				that.name = "" // 姓名清空
				that.phone = "" // 手机号清空
				that.remarks = "" // 备注清空
				uni.showToast({
					title: title,
					icon: 'success'
				})
				setTimeout(function() {
					uni.navigateBack()
				}, 1600)
			})
		})
	}
}
// 模糊搜索
export function search(v, arr) {
	// v 传入的搜索框值  arr 传入的recordArray数组
	let that = this;
	let itemarr = []
	if (v == "") {
		that.record = arr // 恢复原来的数据
	}
	that.record.filter(item => {
		if (item.name.indexOf(v) !== -1 || item.phone.indexOf(v) !== -1) {
			itemarr.push(item) // 符合条件插入到新数组
		} else {
			itemarr = itemarr
		}
		that.record = itemarr // 显示匹配成功的结果
	});
}
// 正则校验
export function check() {
	let that = this
	let namereg = /^[\u4e00-\u9fa5]{2,4}$/; // 姓名正则
	let phonereg = /^1[3456789]\d{9}$/; // 手机号正则
	// 由于YuYa异于常人的思维方式导致校验方法改了N遍 特此吐槽  --Xiaofan
	if (that.name !== null && that.phone !== null) {
		// 正则校验 符合则进行下一步 不符合则弹窗提示
		if (namereg.test(that.name) && phonereg.test(that.phone)) {
			that.show = true // 校验成功后显示switch
		} else {
			that.show = false // 将switch隐藏
			that.value = false // 将switch状态设置为未借出
			uni.showToast({
				title: '请检查',
				icon: 'error'
			})
		}
	}
}
