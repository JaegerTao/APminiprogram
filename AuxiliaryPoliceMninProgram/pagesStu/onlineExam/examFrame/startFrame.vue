<template>
	<!-- 开始答题界面 -->
	<view>
		<view class="cu-bar bg-blue solid-bottom shadow">
			<view class="content text-lg text-bold">试卷详情</view>
		</view>
		<view>
			<view class="cu-bar solid-bottom shadow">
				<view class="Title content text-lg text-bold">{{ title }}</view>
			</view>
			<view class="cu-list menu">
				<view class="questionNum cu-item">
					<view class="questionNumTitle cu-btn round line-blue">题目数量</view>
					<view class="questionNumText pText">{{ questionNum }}</view>
				</view>
				<view class="testTime cu-item">
					<view class="testTimeTitle cu-btn round line-blue">做题时长</view>
					<view class="testTimeText pText">{{ testTime }}分钟</view>
				</view>
				<view class="fullMarks cu-item">
					<view class="fullMarksTitle cu-btn round line-blue">满分</view>
					<view class="fullMarksText pText">{{ fullMarks }}</view>
				</view>
			</view>
		</view>
		<view class="Start text-center margin-top">
			<button class="cu-btn bg-orange" @click="navTo()">开始答题</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:"测试试卷1",
				questionNum: 50,
				testTime: 50,
				fullMarks: 100
			}
		},
		onLoad() {
			
		},
		methods:{
			navTo(){
				uni.reLaunch({
					url:"./examFrame"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.Title{
		font-size: 36rpx;
	}
</style>
