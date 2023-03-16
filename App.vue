<script>
	export default {
		onShow() {},
		onLaunch() {},
		onHide() {}
	}
	// 操作数据库对象
	export function objValue(tablename, api, id, name, phone, time, status, offset, limit, remarks, brand, type, model,
		serialNo) {
		// objValue(tablename, api, id, name, phone, time, status, offset, limit, remarks, brand, type, model, serialNo)
		// objValue(表名,进行的api指令,设备id,姓名,手机号,时间,状态,查询的起始位置,每次查询的数量,备注,品牌,类型,型号,编号)
		const object = {
			tablename: tablename,
			api: api,
			id: id,
			name: name,
			phone: phone,
			time: time,
			status: status,
			offset: offset,
			limit: limit,
			remarks: remarks,
			brand: brand,
			type: type,
			model: model,
			serialNo: serialNo
		}
		return object
	}
	// 操作数据库函数
	export function execSql(name, data, callback) {
		// execSql(云函数名,data对象,回调函数)
		uniCloud.callFunction({
			name: name,
			data: data
		}).then(res => {
			callback(res);
		})
	}
	// 返回年月日时分秒
	export function time() {
		const date = new Date();
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		month <= 9 ? month = "0" + month : false
		day <= 9 ? day = "0" + day : false
		h <= 9 ? h = "0" + h : false
		m <= 9 ? m = "0" + m : false
		s <= 9 ? s = "0" + s : false
		let time = year + "年" + month + "月" + day + "日" + h + ":" + m + ":" + s
		return time
	}
	// 复制到剪贴板
	export function setClipboard(data) {
		// data 传入需要复制的内容
		uni.setClipboardData({
			data: data,
			success: function() {
				uni.showToast({
					title: '复制成功',
					icon: 'success'
				})
			}
		});
	}
	// 自定义跳转
	export function router(url) {
		uni.navigateTo({
			url: '/pages/' + url + '/' + url
		})
	}
	// 检查登录状态
	export function checkLoginStatus() {
		if (uni.getStorageSync('login') !== true) {
			uni.showToast({
				title: '您还未登录',
				icon: 'error'
			})
			setTimeout(function() {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}, 1800)

		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss"; // 引入 uview

	page {
		height: 100%;
		background: #f1f6fc;
	}
</style>
