<template>
	<view class="container">
		<u-popup :show="!loginStatus" :round="10" mode="center" :closeOnClickOverlay="false"
			:customStyle='{"width":"18rem"}'>
			<view class="center mgt32 pdb32 poptitle">
				后台登录
			</view>
			<view class="width80 popinput">
				<u--input placeholder="请输入密码" border="surround" clearable password v-model="password"></u--input>
			</view>
			<view class="pd5 btn width50">
				<u-button type="primary" :plain="true" :hairline="true" text="登录" @click="login"></u-button>
			</view>
		</u-popup>
		<view class="el-card flex end admin" @click="router('admin')">
			<u-icon name="account" size="32"></u-icon>
			<text class="scantext">后台</text>
		</view>
		<view class="el-card flex end scan" @click="scanCode">
			<u-icon name="scan" size="32"></u-icon>
			<text class="scantext">扫码</text>
		</view>

		<view class="copy center">&copy; {{date!==2023?"2023-"+date:"2023"}} XX工作室</view>
		<view class="by center flex">
			<u-icon name="github-circle-fill" size="18"></u-icon>
			<view class="mgl8">YuYa & Xiaofan</view>
		</view>
	</view>
</template>

<script>
	//引入扫码传参方法
	import {
		onLoad,
		scanCode,
		login,
		onShareAppMessage,
		onShareTimeline
	} from '../../static/JS/custom/index/index.js';
	// 引入自定义跳转方法
	import {
		router
	} from '../../App.vue';
	export default {
		data() {
			return {
				date: 2023,
				loginStatus: false,
				password: null
			}
		},
		onLoad,
		onShareAppMessage,
		onShareTimeline,
		methods: {
			scanCode,
			router,
			login
		}
	}
</script>

<style>
	@import url('../../static/ElementUI/custom/index/index.css'); // 自定义样式
	@import url('../../static/ElementUI/UI/index.css'); // UI 样式
</style>
