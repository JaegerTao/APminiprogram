<template>
	<!-- 做题记录 -->
	<view>
		<view class="topMsg">
			<icon-text-item class="questionNum" title="做题量" icon="cuIcon-rank" :num="questionNum"></icon-text-item>
			<icon-text-item class="percent" title="正确率" icon="cuIcon-squarecheck" :num="percent + '%'"></icon-text-item>
			<icon-text-item class="paperCount" title="试卷数" icon="cuIcon-read" :num="paperCount"></icon-text-item>
			<icon-text-item class="tTCount" title="平均分" icon="cuIcon-activity" :num="averageScore"></icon-text-item>
		</view>
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
		<view class="cu-list menu card-menu margin-top">
			<block v-if="TestModel == 'L'">
				<block v-for="(item,index) in [1,2,3,4,5,6,7,8,9,10,11,12,13]" :key="index">
					<view class="cu-item" :class="menuArrow?'arrow':''">
						<view class="content">
							<text class="cuIcon-btn text-green"></text>
							<text class="text-grey">测试试卷{{ item }}</text>
						</view>
						<view class="action margin-top margin-bottom">
							<view class="text-center align-center">
								<view class="">已完成</view>
								<view class=""><button class="cu-btn round margin-top-sm bg-green shadow sm">重新测试</button></view>
							</view>
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
							</text> 查看结果</button>
					</view>
				</view>
			</block>
			<view class="checkmore margin-top margin-bottom text-center">
				查看更多
			</view>
			<!-- <view v-if="isnodata" class="nodata"> 抱歉，暂无试卷 </view> -->
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import iconTextItem from '../componentItem/icon-text-item.vue'
	export default{
		data(){
			return{
				questionNum: 0,
				percent: 0,
				paperCount: 0,
				tTcount: 0,
				averageScore: 0,
				
				TestModel: 'L',//练习-L 考试-K
				currentPage: 1,//试卷当前页
			}
		},
		components:{
			iconTextItem
		},
		methods:{
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
	.topMsg{
		display: flex;
	}
</style>
