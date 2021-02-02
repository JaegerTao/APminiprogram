<template>
	<view class="salaryInfo-container">
		<view class="choiceItem">
			<view style="font-weight: bold;">当前选择:</view>
			<view class="cu-tag bg-blue light">{{startDate}}-{{endDate}}</view>
			<view class="cu-tag bg-blue light" v-for="(item,index) in searchTypeList" v-if="item.isChoose" :key="index">{{item.name}}</view>
		</view>
		<block v-for="(item, index) in salaryList" :key="index">
			<view class="card" style="display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-start;">
				<view class="card_time">
					{{item.detailTime}}
				</view>
				<view v-if="searchTypeList[0].isChoose" class="display_item">
					<view>
						<text class="cuIcon-titles text-red margin-right"></text>基本工资
					</view>
					<view>{{item.price_1}}</view>
				</view>
				<view v-if="searchTypeList[1].isChoose" class="display_item">
					<view>
						<text class="cuIcon-titles text-orange margin-right"></text>岗位工资
					</view>
					<view>{{item.price_2}}</view>
				</view>
				<view v-if="searchTypeList[2].isChoose" class="display_item">
					<view>
						<text class="cuIcon-titles text-yellow margin-right"></text>各种津贴
					</view>
					<view>{{item.price_3}}</view>
				</view>
				<view v-if="searchTypeList[3].isChoose" class="display_item">
					<view>
						<text class="cuIcon-titles text-green margin-right"></text>加班工资
					</view>
					<view>{{item.price_4}}</view>
				</view>
				<view v-if="searchTypeList[4].isChoose" class="display_item">
					<view>
						<text class="cuIcon-titles text-cyan margin-right"></text>月度考核工资
					</view>
					<view>{{item.price_5}}</view>
				</view>
				<view v-if="searchTypeList[5].isChoose" class="display_item">
					<view>
						<text class="cuIcon-titles text-blue margin-right"></text>季度考核工资
					</view>
					<view>{{item.price_6}}</view>
				</view>
				<view v-if="searchTypeList[6].isChoose" class="display_item">
					<view>
						<text class="cuIcon-titles text-purple margin-right"></text>年度考核工资
					</view>
					<view>{{item.price_7}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startDate:'',
				endDate:'',
				searchTypeList:[],
				// 符合条件的薪资列表
				salaryList:[
					{detailTime:'2021-01','price_1':5000,'price_2':500,'price_3':700,'price_4':3000,'price_5':300,'price_6':0,'price_7':100},
					{detailTime:'2020-12','price_1':4000,'price_2':500,'price_3':200,'price_4':3000,'price_5':600,'price_6':100,'price_7':200},
					{detailTime:'2020-11','price_1':5500,'price_2':500,'price_3':500,'price_4':3000,'price_5':500,'price_6':50,'price_7':0},
					{detailTime:'2020-10','price_1':5200,'price_2':500,'price_3':300,'price_4':3000,'price_5':1000,'price_6':0,'price_7':20}
				]
			}
		},
		onLoad(options) {
			this.$data.startDate = options.startDate
			this.$data.endDate = options.endDate
			this.$data.searchTypeList = JSON.parse(options.searchTypeList)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.choiceItem{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		view{
			margin: 10rpx;
		}
	}
	.content{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.card{
		border: 2rpx solid grey;
		width: 90%;
		border-radius: 8rpx;
		margin: 20rpx auto;
		padding: 10rpx;
		box-shadow: 0 1rpx 1rpx #58a;
		.card_time{
			font-size: 40rpx;
			font-weight: bold;
			padding: 10rpx 20rpx;
		}
	}
	.display_item{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 5rpx 0;
	}
</style>
