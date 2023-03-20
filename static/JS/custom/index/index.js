import {
	execSql,
} from '../../../../App.vue'
// 监听页面加载
export function onLoad() {
	this.date = new Date().getFullYear();
	uni.getStorageSync('login') ? this.loginStatus = true : false
}
// 扫码传参
export function scanCode() {
	uni.scanCode({
		onlyFromCamera: true, // 仅允许通过相机扫描  不允许读取相册
		success: function(res) {
			const id = Number(JSON.parse(res.result).id)
			uni.navigateTo({
				url: '/pages/detail/detail?id=' + id // 将id传入库存详情界面
			})
		}
	});
}
// 登录
export function login() {
	let that = this
	if (that.password !== "" && that.password.trim() !== "" && that.password.trim().length !== 0) {
		execSql('wms', {
			api: "checkPassword",
			password: that.password
		}, (res) => {
			if (res.result) {
				that.loginStatus = true
				that.password = ""
				uni.setStorageSync('login', true)
				uni.showToast({
					title: '登录成功',
					icon: 'success'
				})
			} else {
				uni.showToast({
					title: '登录失败请检查',
					icon: 'error'
				})
			}
		})
	} else {
		uni.showToast({
			title: '不能为空请重试',
			icon: 'error'
		})
	}
}
// 转发给朋友
export function onShareAppMessage() {
	return {
		title: '摄影设备管理',
		path: '/pages/index/index',
	}
}
// 转发到朋友圈
export function onShareTimeline() {
	return {
		title: '摄影设备管理'
	}
}
