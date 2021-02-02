<template>
	<view class="Bg">
		<!-- 倒计时 -->
		<view class="cu-bar bg-blue light solid-bottom shadow">
			<view class="TimeLeft content text-bold">剩余时长：{{ timeLeft }}</view>
		</view>
		<!-- 题目区域 -->
		<view class="Shape">
			<view class="Shape1 border solid"></view>
			<view class="Shape2 border solid"></view>
			<view class="Shape3 border solid"></view>
		</view>
		<view class="padding" v-if="curQues">
			<scroll-view scroll-y="true">
				<view>
					<!-- 多选 -->
					<block v-if="curQues.QTypeID=='F'">
						<multiple-choice :testdata="curQues"></multiple-choice>
					</block>
					<!-- 简答、填空 -->
					<block v-else-if="curQues.QTypeID=='J'">
						<short-answer :testdata="curQues"></short-answer>
					</block>
					<!-- 单选、判断、综合 -->
					<block v-else>
						<single-choice :testdata="curQues"></single-choice>
					</block>
				</view>
			</scroll-view>
		</view>
		<view class="text-center text-gray text-lg margin" v-else>
			<text class="cuIcon-loading"></text>加载中...
		</view>
		<view class="cu-tabbar-height"></view>
		<!-- 底部功能栏 -->
		<view class="cu-bar tabbar bg-gray light foot">
			<view class="action " hover-class="text-orange" @tap="goPre" data-cur="0">
				<view class="cuIcon-back"></view>上一题
			</view>
			<view class="action " hover-class="text-orange" @tap="goNext" data-cur="1">
				<view class="cuIcon-right"></view>下一题
			</view>
			<view class="action " hover-class="text-orange" @tap="showUpload" data-cur="2" v-if="!parsemode">
				<view class="cuIcon-upload"></view>交卷
			</view>
			<view class="action " hover-class="text-orange" @tap="Pause" data-cur="3" v-if="!parsemode&&prtmode">
				<view class="cuIcon-similar"></view>暂停
			</view>
			<view class="action " hover-class="text-orange" @tap="showAnsCard" data-cur="4">
				<view class="cuIcon-rounddown"></view>答题卡
			</view>
		</view>
		<!-- 答题卡 -->
		<view class="cu-modal" :class="isShowAnsCard?'show':''" @tap="hideModal()">
			<view class="cu-dialog" @tap.stop=''>
				<view class="block">
					<answer-sheet :ansdata="ansdata" @ansTap="goTap" ref="answerSheet"></answer-sheet>
				</view>
			</view>
		</view>
		<!-- 交卷对话框 -->
		<view class="cu-modal" :class="isShowUpload?'show':''" @tap="hideModal()">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请确认是否交卷</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					当前剩余<text class="text-bold text-red">{{ undoneNum }}</text>道题未做，是否交卷？
				</view>
				<view class="cu-bar bg-white justify-between">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="upLoadPaper()">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 暂停框 -->
		<view class="cu-modal" :class="isShowPause?'show':''" @tap="hideModal(true)">
			<view class="cu-dialog" @tap.stop=''>
				<view class="Pause block">
					<view class="cu-bar bg-blue light solid-bottom shadow">
						<view class="content text-bold">暂 停 中</view>
					</view>
					<view class="Pause-wait">
						
					</view>
					<view class="foot margin-top margin-bottom">
						<button @tap="hideModal(true)" class="margin cu-btn bg-blue shadow round text-xl">继续答题</button>
						<button class="margin cu-btn bg-red shadow round text-xl">保存并退出</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import singleChoice from "../quesTypes/single-choice.vue"
	import multipleChoice from "../quesTypes/mutiple-choice.vue"
	import shortAnswer from "../quesTypes/short-answer.vue"
	import answerSheet from "../componentItem/answer-sheet.vue"
	import Timer from "./timer.js"

	import testData from "../componentPages/questionBanks.js"
	export default {
		data() {
			return {
				parsemode: false, //是否是解析模式
				prtmode: true, //是否是练习模式
				testmode: false, //是否是考试模式

				timeTotal: 50 * 60 * 1000, //总时长
				timeLeftS: "00", //剩余时间，秒
				timeLeftM: "00", //剩余时间字符,分

				timer: null, //计时器类
				navCur: 0, //底部功能标识 0 1 2 3 4

				testdata: [], //题目列表
				ansdata: [], //题序列表
				curQues: null, //当前显示题目
				curIndex: 0, //当前显示序号

				isShowAnsCard: false, //是否显示答题卡
				isShowUpload: false, //是否显示交卷
				undoneNum: 0, // 题目未做数量
				isShowPause: false,//显示暂停框
			}
		},
		components: {
			singleChoice,
			multipleChoice,
			shortAnswer,
			answerSheet
		},
		computed: {
			timeLeft() {//剩余时间文本
				if (!this.timer) return "00:00"
				let timeLeftS = this.timer.leftS < 1? 0:this.timer.leftS
				let timeLeftM = this.timer.leftM < 1? 0:this.timer.leftM
				return (timeLeftM < 10 ? ('0' + timeLeftM) : timeLeftM) + ":" + (timeLeftS < 10 ? ('0' + timeLeftS) : timeLeftS)
			}
		},
		methods: {
			timerUpdate() { //考试计时器
				if (this.parsemode) return //解析模式，非考试，不需要计时
				this.timer = new Timer(0.5 * 60 * 1000) 
				this.timer.start() //计时器开始
				let that = this
				let listenOut = function(){//监听剩余时间
					let t = that
					setTimeout(()=>{
						if(t.timer.isTimeOut){
							console.log("考试结束")
							t.upLoadPaper()
						}else{
							listenOut()
						}
					}, 500)
				}
				listenOut()//监听剩余时间
			},
			goPre() { //上一题
				if (this.curIndex <= 0) {
					this.$ToastFail("当前是第一题")
					return
				} else {
					this.curIndex -= 1
					this.curQues = this.testdata[this.curIndex]
				}
			},
			goNext() { //下一题
				if (this.curIndex + 1 >= this.testdata.length) {
					this.$ToastFail("当前是最后一题")
					return
				} else {
					this.curIndex += 1
					this.curQues = this.testdata[this.curIndex]
				}
			},
			goTap(quesOdr) { //跳转答题卡点击的题目
				// 模拟请求题目
				let index = 0
				for (let ques of this.testdata) {
					if (ques.QTypeID == quesOdr.QTypeID && ques.QuestionOrder == quesOdr.QuestionOrder) {
						this.curQues = ques
						break
					}
					index += 1
				}
				this.curIndex = index
				this.hideAnsCard()
			},
			showAnsCard() { //显示答题卡
				this.isShowAnsCard = true
			},
			hideModal(e) { //关闭所有对话框
				this.isShowAnsCard = false
				this.isShowUpload = false
				this.isShowPause = false
				if(e){
					this.timer.start()
				}
			},
			showUpload() { //显示交卷对话框
				this.undoneNum = 0
				let undone = 0
				for (let ans of this.ansdata) {
					if (ans.uIsTrue == null) {
						undone += 1
					}
				}
				this.undoneNum = undone
				this.isShowUpload = true
			},
			upLoadPaper() { //交卷
				this.timer.pause()//停止计时
				this.$showLoading("正在提交")
				let that = this
				setTimeout(()=>{
					uni.hideLoading()
					that.$ToastSuccess("提交成功")
					uni.redirectTo({
						url:"./endFrame"
					})
				},2000)
			},
			Pause() { //暂停界面
				this.isShowPause = true
				this.timer.pause()
			}
		},
		onLoad() {
			this.timerUpdate()

			this.testdata = testData[1]
			this.ansdata = testData[2]
			this.curQues = this.testdata[this.curIndex]
		},
		onShow() {
			//#ifdef MP-WEIXIN
			wx.hideHomeButton()
			//#endif
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f2f2f4;
	}

	.TimeLeft {
		font-size: 36rpx;
	}
	.Pause{
		// height: 750rpx;
		button{
			width: 450rpx;
		}
	}
	.Shape{
		view{
			position: absolute;
			top: 270rpx;
			left: -20rpx;
			width: 800rpx;
			height: 300rpx;
			background-color: rgba(165, 165, 182, 0.5);
			border-radius: 20rpx;
		}
		.Shape1{
			transform: rotate(30deg);
		}
		.Shape2{
			transform: translateY(300rpx) rotate(-30deg);
		}
		.Shape3{
			transform: translateY(500rpx) rotate(40deg);
		}
	}
</style>
