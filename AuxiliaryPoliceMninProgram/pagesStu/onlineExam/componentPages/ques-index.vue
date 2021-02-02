<template>
	<!-- 题库首页 -->
	<view>
		<swiper :style="{height:scrollHeight + 'px'}" :current="swiper">
			<swiper-item catchtouchmove="catchTouchMove">
			<scroll-view scroll-y :style="{height:scrollHeight + 'px'}">
				<view class="swiper-item">
					<!-- 做题情况部分 -->
					<view class="header bg-gradual-blue flex">
						<view class="circlePercent flex-sub">
							<circle-percent bg="#bc64ee" :percent="accuracy" boxSize="200"></circle-percent>
						</view>
						<view class="statInfo flex-sub">
							<view class="problem">
								<text class="pTitle">做题总数</text>
								<text class="pNum">{{ questionNum }}个</text>
							</view>
							<view class="paper">
								<text class="pTitle">已做题卷</text>
								<text class="pNum">{{ paperNum }}套</text>
							</view>
						</view>
					</view>
					<!-- 题卷分类 -->
					<view>
						<van-collapse accordion :value="activeNames" @change="onChange()">
							<van-collapse-item title="试卷一级分类1" name="1">
								<view class="margin-bottom">此处可填写分类介绍</view>
								<view @click="changeSwiper(secondlevel.name, secondlevel.id)" v-for="(secondlevel,index) in papersecondlevel" :key="index" class="margin-right cu-btn round shadow" :class="classChange[secondlevel.id]">
									{{ secondlevel.name }}
								</view>
							</van-collapse-item>
							<van-collapse-item title="试卷一级分类2" name="2">
								<view v-for="(secondlevel,index) in papersecondlevel" :key="index" class="margin-right cu-btn round shadow" :class="classChange[secondlevel.id]">
									{{ secondlevel.name }}
								</view>
							</van-collapse-item>
							<van-collapse-item title="试卷一级分类3" name="3">
								<view v-for="(secondlevel,index) in papersecondlevel" :key="index" class="margin-right cu-btn round shadow" :class="classChange[secondlevel.id]">
									{{ secondlevel.name }}
								</view>
							</van-collapse-item>
						</van-collapse>
					</view>
				</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<!-- 试卷列表部分 -->
					<view class="cu-bar bg-gradual-blue solid-bottom shadow">
						<view class="action" @click="changeSwiper()">
							<text class="cuIcon-back text-gray"></text> 分类
						</view>
						<view class="content">{{ curLevelName }}</view>
					</view>
					<!-- 练习or考试 -->
					<view class="flex text-center nav">
						<view class="cu-item flex-sub" :class="TestModel=='L'?'text-blue cur':''" @tap="showPaper(0)" data-id="0">练习</view>
						<view class="cu-item flex-sub" :class="TestModel=='K'?'text-blue cur':''" @tap="showPaper(1)" data-id="1">考试</view>
					</view>
					<!-- 搜索框 -->
					<view class="cu-bar">
						<view class="search-form round">
							<view class="cuIcon-search"></view>
							<input type="text" v-model="keyWord" placeholder="输入试卷名称"/>
						</view>
						<view class="action" @tap="searchPaper">
							<view class="cu-btn bg-orange shadow-blur round">
								搜索
							</view>
						</view>
					</view>
					<!-- 列表 -->
					<scroll-view scroll-y :style="{height:scrollHeight - 150 + 'px'}">
					<view class="cu-list menu card-menu margin-top">
						<block v-if="TestModel == 'L'">
							<block v-for="(item,index) in [1,2,3,4,5,6,7,8,9,10,11,12,13]" :key="index">
								<view class="cu-item" :class="menuArrow?'arrow':''">
									<view class="content">
										<text class="cuIcon-btn text-green"></text>
										<text class="text-grey">测试试卷{{ item }}</text>
									</view>
									<view class="action">
										<button class="cu-btn round bg-green shadow" @click="navTo()">
											</text> 开始练习</button>
									</view>
								</view>
							</block>
						</block>
						<block v-else-if="TestModel == 'K'">
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<view class="content">
									<text class="cuIcon-btn text-green"></text>
									<text class="text-grey">考试试卷</text>
								</view>
								<view class="action">
									<button class="cu-btn round bg-red shadow">
										</text> 开始考试</button>
								</view>
							</view>
						</block>
						<view class="checkmore margin-bottom text-center">
							查看更多
						</view>
						<!-- <view v-if="isnodata" class="nodata"> 抱歉，暂无试卷 </view> -->
					</view>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	// import vanCollapse from '@/wxcomponents/vant-weapp/collapse/index'
	// import vanCollapseItem from '@/wxcomponents/vant-weapp/collapse-item/index'
	export default {
		data() {
			return {
				questionNum: 0, //已做题目总数
				rightQNum: 0, //正确题目总数
				paperNum: 0, //已做试卷套数

				activeNames: '1', //一级分类
				classChange: ['bg-orange', 'bg-green', 'bg-red', 'bg-blue'],
				papersecondlevel: [{
						name: "二级分类1",
						id: 1
					},
					{
						name: "二级分类2",
						id: 2
					},
					{
						name: "二级分类3",
						id: 3
					},
				],
				
				swiper: 0,//分类列表0 试卷列表1
				curLevelName: "",//当前选择的二级分类名
				
				TestModel: 'L',//练习-L 考试-K
				currentPage: 1,//试卷当前页
			}
		},
		computed: {
			accuracy: function() {
				return 50
			},
			scrollHeight(){
				return this.$deviceHeight() - 55
			}
		},
		components: {
			// vanCollapse,
			// vanCollapseItem
		},
		methods: {
			//禁止触摸滑动
			catchTouchMove: function(res) {
				return false
			},
			navTo() {
				console.log("跳转开始页面")
				uni.navigateTo({
				    url: './examFrame/startFrame'//注意此处为组件，应从onlineExam页面所在索引查找页面
				});
			},
			onChange(event) {
				// console.log(event)
				this.activeNames = event.detail
			},
			changeSwiper(name, id){
				if (this.swiper == 0) { //到试卷列表
					this.swiper += 1
					this.curLevelName = name
				} else if (this.swiper == 1) { //到分类列表
					this.swiper -= 1
				}
			},
			//切换练习试卷与考试卷
			showPaper(dataid) {
				if (dataid == 0) {
					this.TestModel = 'L';
					this.currentPage = 1;
					// this.getTestList('L');
				} else if (dataid == 1) {
					this.TestModel = 'K';
					this.currentPage = 1;
					// this.getTestList('K');
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.header {
		.circlePercent {
			display: flex;
			justify-content: space-around;
		}

		.statInfo {
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			.pTitle,
			.pNum {
				font-size: 35rpx;
			}
		}

		border-radius: 0rpx 0rpx 30rpx 30rpx;
	}
</style>
