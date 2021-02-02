<template>
	<!-- 结算界面 -->
	<view>
		<view class="Head">
			<view class="circlePercent">
				<circle-percent bg="#ee83d7" :percent="50" boxSize="200"></circle-percent>
			</view>
			<view class="Shape">
				<view class="Shape1 border solid"></view>
				<view class="Shape2 border solid"></view>
			</view>
		</view>
		<view class="AnswerSheet text-center border solid">
			<answer-sheet :ansdata="ansdata"></answer-sheet>
		</view>
		<view class="margin">
			<view class="text-center"><button class="cu-btn bg-blue" @tap="navTo()">返回题库首页</button></view>
		</view>
	</view>
</template>

<script>
	import answerSheet from "../componentItem/answer-sheet.vue"
	
	import testData from "../componentPages/questionBanks.js"
	export default{
		data(){
			return{
				prtmode: true, //是否是练习模式
				testmode: false, //是否是考试模式
				ansdata: [], //题序列表
			}
		},
		components:{
			answerSheet
		},
		onLoad() {
			this.ansdata = testData[2]
		},
		methods:{
			navTo(){
				uni.redirectTo({
					url:"../onlineExam"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.Head{
		height: 300rpx;
		.circlePercent {
			display: flex;
			justify-content: space-around;
		}
		.Shape{
			view{
				position: absolute;
				top: 0rpx;
				left: -20rpx;
				width: 800rpx;
				height: 300rpx;
				background-color: rgba(37, 106, 159, 0.5);
			}
			.Shape1{
				transform: rotate(15deg);
			}
			.Shape2{
				transform: rotate(-15deg);
			}
		}
	}
	
</style>
