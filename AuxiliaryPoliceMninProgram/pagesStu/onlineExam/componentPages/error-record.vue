<template>
	<!-- 错题记录 -->
	<view>
		<view class="topMsg margin-bottom">
			<icon-text-item class="errorNum" title="错题量" icon="cuIcon-edit" :num="errorNum"></icon-text-item>
			<icon-text-item class="percent" title="错误率" icon="cuIcon-roundclose" :num="percent + '%'"></icon-text-item>
			<icon-text-item class="paperCount" title="试卷数" icon="cuIcon-read" :num="pCount"></icon-text-item>
		</view>
		<!-- <view class="flex text-center nav">
			<view class="cu-item flex-sub" :class="TestModel=='L'?'text-orange cur':''" @tap="showPaper(0)" data-id="0">练习</view>
			<view class="cu-item flex-sub" :class="TestModel=='K'?'text-orange cur':''" @tap="showPaper(1)" data-id="1">考试</view>
		</view> -->
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
						<view class="action">
							<view class="text-center align-center">
								<view class=""><button class="cu-btn round bg-blue light shadow">查看解析</button></view>
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
				questionNum: 0, //题目总数
				tTCount: 0, //正确题目数
				errorNum: 0, //错误题目数
				percent: 0, //错误率
				pCount: 0, //试卷数
				
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
