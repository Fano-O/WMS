<template>
	<view class="container">
		<view class="el-card" v-for="(item,index) in stock" :key="index">
			<view class="flex mgt12 pd3">
				<span>品牌：</span>
				<view class="text">{{item.brand}}</view>
			</view>
			<view class="flex mgt12 pd3">
				<span>类型：</span>
				<view class="text">{{item.type}}</view>
			</view>
			<view class="flex mgt12 pd3">
				<span>型号：</span>
				<view class="text">{{item.model}}</view>
			</view>
			<view class="flex mgt12 pd3">
				<span>编号：</span>
				<view class="text">{{item.serialNo}}</view>
			</view>
			<view class="flex mgt12 pd3">
				<span>姓名：</span>
				<view class="text">
					<u-input v-model="name" type="text" border="bottom" clearable placeholder="请输入姓名" maxlength="10"
						:disabled="input" @blur="focus=true" @keydown.enter="focus=true" />
				</view>
			</view>
			<view class="flex mgt12 pd3">
				<span>手机号：</span>
				<view class="text">
					<u-input ref="phone" v-model="phone" type="number" border="bottom" clearable placeholder="请输入手机号"
						:disabled="input" maxlength="11" :focus="focus" @input="phone.length==11?check():false"
						@blur="check()" @keyup="check()" />
				</view>
			</view>
			<view class="flex mgt18">
				<span>备注：</span>
				<view class="text pdt6 ">
					<u--textarea v-model="remarks" type="text" border="bottom" placeholder="备注(非必填限45字)"
						:disabled="input" maxlength="45">
					</u--textarea>
				</view>
			</view>
			<view class="flex mgt18 pd3">
				<span>状态：</span>
				<view class="flex">
					<view class="mgr16">{{statusContent?"已借出":"未借出"}}</view>
					<u-switch v-model="value" activeColor="#5ac725" inactiveColor="#f56c6c" @change="change"
						:disabled="status" v-if="show"></u-switch>
				</view>
			</view>
		</view>
		<view class="el-card mgt32">
			<view class="flex search mgb32">
				<view class="width50">
					<u-search placeholder="请输入搜索内容" v-model="serachv" shape="square" :showAction="false" maxlength="11"
						@change="search(serachv,recordArray)"></u-search>
				</view>
			</view>
			<scroll-view scroll-y style="height: 16.95rem">
				<uni-table>
					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="80px">姓名</uni-th>
						<uni-th width="100px">手机号</uni-th>
						<uni-th width="60px">状态</uni-th>
						<!-- 开关 自己品 -->
						<uni-th width="195px" @tap="record.reverse();on=!on">时间 &nbsp;{{on?"▽":"△"}}</uni-th>
						<uni-th width="60px">备注</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item, index) in record" :key="index">
						<uni-td>{{item.name}}</uni-td>
						<uni-td @tap="setClipboard(item.phone)">{{item.phone}}</uni-td>
						<uni-td>
							<u--text :type='item.status?"success":"error"' :text='item.status?"借出":"归还"'></u--text>
						</uni-td>
						<uni-td>{{item.time}}</uni-td>
						<uni-td>
							<u--text type="primary" text="查看" @tap="modal=true;modaltext=item.remarks"></u--text>
						</uni-td>
					</uni-tr>
				</uni-table>
			</scroll-view>
			<u-modal :show="modal" mode="center" @confirm="modal=false" title="备注" :content="modaltext"></u-modal>
		</view>
	</view>
</template>

<script>
	import {
		onLoad,
		change,
		search,
		check,
		queryRecord
	} from '../../static/JS/custom/detail/detail.js';
	import {
		setClipboard
	} from '../../App.vue';
	export default {
		data() {
			return {
				stock: [],
				record: null,
				value: false,
				status: false,
				id: null,
				statusContent: null,
				name: null,
				phone: null,
				input: null,
				serachv: null,
				recordArray: [],
				show: false,
				focus: false,
				offset: 0,
				limit: 6,
				on: true,
				remarks: null,
				modal: false,
				modaltext: null
			}
		},
		onLoad,
		methods: {
			change,
			search,
			check,
			setClipboard,
			queryRecord
		}
	}
</script>

<style>
	@import url('../../static/ElementUI/custom/detail/detail.css'); // 自定义样式
	@import url('../../static/ElementUI/UI/index.css'); // UI 样式
</style>
