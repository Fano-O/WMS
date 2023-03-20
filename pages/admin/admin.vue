<template>
	<view class="container">
		<view class="el-card mgt32" v-show="showquery">
			<view class="flex search mgb32">
				<view class="width50">
					<u-search placeholder="请输入搜索内容" v-model="serachv" shape="square" :showAction="false"
						@change="search(serachv,allArray)"></u-search>
				</view>
			</view>
			<u-modal :show="modal" mode="center" @confirm="modal=false" title="备注" :content="modaltext">
			</u-modal>
			<scroll-view scroll-y style="height: 16.95rem">
				<uni-table>
					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="90px">品牌</uni-th>
						<uni-th width="90px">类型</uni-th>
						<uni-th width="140px">型号</uni-th>
						<uni-th width="140px">编号</uni-th>
						<uni-th width="80px">姓名</uni-th>
						<uni-th width="100px">手机号</uni-th>
						<uni-th width="195px" @tap="all.reverse();on=!on">时间 &nbsp;{{on?"▽":"△"}}</uni-th>
						<uni-th width="60px">备注</uni-th>
						<uni-th width="60px">状态</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item, index) in all" :key="index">
						<uni-td>{{item.params[0].brand}}</uni-td>
						<uni-td>{{item.params[0].type}}</uni-td>
						<uni-td>{{item.params[0].model}}</uni-td>
						<uni-td>{{item.params[0].serialNo}}</uni-td>
						<uni-td>{{item.name}}</uni-td>
						<uni-td @tap="setClipboard(item.phone)">{{item.phone}}</uni-td>
						<uni-td>{{item.time}}</uni-td>
						<uni-td>
							<u--text type="primary" text="查看" @tap="modal=true;modaltext=item.remarks"></u--text>
						</uni-td>
						<uni-td>
							<u--text :type='item.status?"success":"error"' :text='item.status?"借出":"归还"'></u--text>
						</uni-td>
					</uni-tr>
				</uni-table>
			</scroll-view>
		</view>
		<view class="el-card mgt32" v-show="!showquery">
			<view class="title">当前借出设备&nbsp;{{lend.length}}</view>
			<scroll-view scroll-y @scrolltolower="queryLend" style="height: 12rem">
				<uni-table>
					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="90px">品牌</uni-th>
						<uni-th width="90px">类型</uni-th>
						<uni-th width="140px">型号</uni-th>
						<uni-th width="140px">编号</uni-th>
						<uni-th width="80px">姓名</uni-th>
						<uni-th width="100px">手机号</uni-th>
						<uni-th width="60px">备注</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<u-modal :show="modal" mode="center" @confirm="modal=false" title="备注"
						:content="modaltext==null?'没有填写任何备注':modaltext"></u-modal>
					<uni-tr v-for="(item, index) in lend" :key="index">
						<uni-td>{{item.brand}}</uni-td>
						<uni-td>{{item.type}}</uni-td>
						<uni-td>{{item.model}}</uni-td>
						<uni-td>{{item.serialNo}}</uni-td>
						<uni-td>{{item.name}}</uni-td>
						<uni-td @tap="setClipboard(item.phone)">{{item.phone}}</uni-td>
						<uni-td>
							<u--text type="primary" text="查看" @tap="modal=true;modaltext=item.remarks"></u--text>
						</uni-td>
					</uni-tr>
				</uni-table>
			</scroll-view>
		</view>

		<u-popup :show="showadd" mode="center" @close="showadd=false" :round="10" closeable customStyle='width:80%'>
			<view class="flex pd3 mgauto width80 mgt72">
				<u--input type="text" placeholder="请输入品牌" v-model="brand"></u--input>
			</view>
			<view class="flex mgt18 pd3 mgauto width80">
				<u--input type="text" placeholder="请输入类型" v-model="type"></u--input>
			</view>
			<view class="flex mgt18 pd3 mgauto width80">
				<u--input type="text" placeholder="请输入型号" v-model="model"></u--input>
			</view>
			<view class="flex mgt18 pd3 mgauto width80">
				<u--input type="text" placeholder="请输入编号" v-model="serialNo"></u--input>
			</view>
			<view class="flex mgt18 pd3 width80 mgauto">
				<u-button type="primary" :plain="true" :hairline="true" text="添加库存" @click="addStock"></u-button>
			</view>
		</u-popup>

		<view class="el-card mgt32 ">
			<u-button type="primary" :plain="true" :hairline="true" text="添加库存" @click="showadd=true"></u-button>
			<u-button type="success" :plain="true" :hairline="true" text="查询记录" @click="queryAll()"></u-button>
		</view>
		<view class="copy center">&copy; {{date!==2023?"2023-"+date:"2023"}} XX工作室</view>
		<view class="by center flex">
			<u-icon name="github-circle-fill" size="18"></u-icon>
			<view class="mgl8">YuYa & Xiaofan</view>
		</view>
	</view>
</template>

<script>
	import {
		onLoad,
		addStock,
		queryAll,
		search,
		onPullDownRefresh,
		onShareAppMessage,
		onShareTimeline
	} from '../../static/JS/custom/admin/admin.js';
	import {
		setClipboard,
	} from '../../App.vue';
	export default {
		data() {
			return {
				brand: null,
				type: null,
				model: null,
				serialNo: null,
				lend: [],
				modal: false,
				modaltext: null,
				serachv: '',
				showadd: false,
				showquery: false,
				all: [],
				modal: false,
				modaltext: null,
				allArray: [],
				on: true,
				date: 2023
			}
		},
		onPullDownRefresh,
		onShareAppMessage,
		onShareTimeline,
		onLoad,
		methods: {
			setClipboard,
			addStock,
			queryAll,
			search
		}
	}
</script>

<style>
	@import url('../../static/ElementUI/custom/admin/admin.css'); // 自定义样式
	@import url('../../static/ElementUI/UI/index.css'); // UI 样式
</style>
