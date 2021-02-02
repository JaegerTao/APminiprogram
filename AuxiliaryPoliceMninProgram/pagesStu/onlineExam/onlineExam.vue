<template>
	<view>
		<view class="Main">
			<ques-index v-if="navCur==0"></ques-index>
			<test-record v-if="navCur==1"></test-record>
			<error-record v-if="navCur==2"></error-record>
			<message-center v-if="navCur==3"></message-center>
		</view>
		<view class="cu-bar tabbar bg-gray foot">
			<view class="action" :class="navCur==0?'text-blue':'text-gray'" @tap="NavChange" data-cur="0">
				<view class="cuIcon-home"></view>题库
			</view>
			<view class="action" :class="navCur==1?'text-blue':'text-gray'" @tap="NavChange" data-cur="1">
				<view class="cuIcon-time"></view>做题记录
			</view>
			<view class="action" :class="navCur==2?'text-blue':'text-gray'" @tap="NavChange" data-cur="2">
				<view class="cuIcon-searchlist"></view>我的错题
			</view>
			<view class="action" :class="navCur==3?'text-blue':'text-gray'" @tap="NavChange" data-cur="3">
				<view class="cuIcon-message">
					<view class="cu-tag badge"></view>
				</view>消息中心
			</view>
		</view>
	</view>
</template>

<script>
	import quesIndex from './componentPages/ques-index.vue'
	import testRecord from './componentPages/test-record.vue'
	import errorRecord from './componentPages/error-record.vue'
	import messageCenter from './componentPages/message-center.vue'
	export default {
		data() {
			return {
				questionNum: 100, //已做题目总数
				rightQNum: 20, //正确题目总数
				paperNum: 0, //已做试卷套数
				
				navCur: 0,//底部导航标识 0 1 2 3
			};
		},
		computed: {
			accuracy: function() { //正确率
				let that = this
				if (that.questionNum <= 0) return 0
				let percent = Number(that.rightQNum / that.questionNum * 100).toFixed(1)
				return percent
			}
		},
		components: {
			quesIndex,
			testRecord,
			errorRecord,
			messageCenter
		},
		methods: {
			// 底部导航栏
			NavChange: function(e) {
				this.navCur = e.currentTarget.dataset.cur
			},
			// 跳转页面
			navTo() {
				uni.reLaunch({
					url: './examFrame/examFrame'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.Top {
		height: 320rpx;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		position: relative;
		background-color: #808080;

		.circlePercent {
			position: absolute;
			top: 20rpx;
			left: 260rpx;
		}

		.statInfo {
			position: relative;
			font-weight: 100;
			color: #FFFFFF;
		}

		.problem {
			position: relative;
			top: 60rpx;
			left: 50rpx;
			font-size: 35rpx;
		}

		.paper {
			position: relative;
			top: 60rpx;
			left: 550rpx;
			font-size: 35rpx;
		}

		.pTitle {
			position: absolute;
		}

		.pNum {
			position: absolute;
			top: 80rpx;
			left: 50rpx;
		}
	}
</style>
