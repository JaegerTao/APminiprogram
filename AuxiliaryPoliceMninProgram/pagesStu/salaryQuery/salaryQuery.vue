<template>
	<!--薪资查询-->
	<view class="salary-container">
		<view class="search-area">
			<view class="cu-form-group">
				<view class="title"><text class="cuIcon-titles text-blue margin-right"></text>请选择薪资查询的时间范围</text></view>
			</view>
			<view class="cu-form-group">
				<view class="title">起始时间</view>
				<picker mode="date" fields="month" :value="startDate" :end="midDate" @change="startDateChange">
					<view class="picker">
						{{startDate}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">终止时间</view>
				<picker mode="date" fields="month" :value="endDate" :start="midDate" @change="endDateChange">
					<view class="picker">
						{{endDate}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="cuIcon-titles text-blue margin-right"></text>请选择薪资查询类型</text></view>
			</view>
			<view class="cu-form-group searchType_display" v-for="(item, index) in searchTypeList" :key="index">
				<checkbox class="blue" :checked="item.isChoose" :data-index="index" @tap="changeChoose"></checkbox>
				<view class="title checkbox_margin">{{item.name}}</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @tap="searchSalaryInfo">查询</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 起始日期
				startDate:'',
				// 终止日期
				endDate:'',
				// 中间时间,使得起始时间不得大于终止时间
				midDate:'',
				// 薪资类型
				searchTypeList:[
					{name:'基本工资', isChoose:true},
					{name:'岗位工资', isChoose:true},
					{name:'各种津贴', isChoose:true},
					{name:'加班工资', isChoose:true},
					{name:'月度考核工资', isChoose:true},
					{name:'季度考核工资', isChoose:true},
					{name:'年度考核工资', isChoose:true},
				]
			}
		},
		onLoad() {
			let data = new Date()
			let startDate = data.getFullYear() + "-" + (data.getMonth()<9?('0'+(data.getMonth()+1)):(data.getMonth()+1))
			let endDate = data.getFullYear() + "-" + (data.getMonth()<9?('0'+(data.getMonth()+1)):(data.getMonth()+1))
			this.$data.startDate = startDate
			this.$data.endDate = endDate
		},
		methods: {
			// 监听薪资查询起始时间的改变
			startDateChange(e) {
				this.$data.startDate = e.detail.value
				this.$data.midDate = e.detail.value
			},
			// 监听薪资查询终止日期的改变
			endDateChange(e) {
				this.$data.endDate = e.detail.value
				this.$data.midDate = e.detail.value
			},
			// 薪资类型选择的转换
			changeChoose(e) {
				let index = e.currentTarget.dataset.index
				this.$data.searchTypeList[index].isChoose = !this.$data.searchTypeList[index].isChoose
			},
			// 查询符合条件的薪资信息
			searchSalaryInfo() {
				uni.navigateTo({
					url:'salaryQueryInfo/salaryQueryInfo?startDate=' + this.$data.startDate + "&endDate=" + this.$data.endDate + "&searchTypeList=" + JSON.stringify(this.$data.searchTypeList)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-form-group:nth-child(1) {
		font-weight: bold;
	}
	.cu-form-group:nth-child(4) {
		font-weight: bold;
	}
	.searchType_display {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		.checkbox_margin{
			margin-left: 20rpx;
		}
	}
</style>
