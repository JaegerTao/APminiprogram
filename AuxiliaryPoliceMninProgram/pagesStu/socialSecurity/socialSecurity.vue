<template>
	<!--社保公积金-->
	<view class="socialSecurity-container" :style="windowHeight">
		<view class="social" v-if="bottom_tarbar == 1">
			<view class="search_area">
				<view class="date_select" @tap="dateStatusChange">
					<text :class="isShowDate ? 'text-blue' : 'text-black'">日期</text>
					<text :class="isShowDate ? 'cuIcon-fold text-blue' : 'cuIcon-unfold'"></text>
				</view>
				<view class="type_select" @tap="typeStatusChange">
					<text :class="isShowType ? 'text-blue' : 'text-black'">筛选</text>
					<text class="cuIcon-search" :class="isShowType ? 'text-blue' : 'text-black'"></text>
				</view>
			</view>
			<view class="date_select_area" v-if="isShowDate">
				<view style="display: flex;flex-direction: column;border-bottom: 1rpx solid grey;">
					<view style="margin: 10rpx 60rpx;font-weight: bold;">交易时间</view>
					<view>
						<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-around;">
							<view class="cu-tag radius" :class="item.isChoose ? 'bg-blue' : 'line-black'" v-for="(item,index) in timeList" style="margin: 20rpx auto;" :data-index="index" @tap="timeStatusSelect" :key="index">{{item.name}}</view>
						</view>
					</view>
				</view>
				<view style="border-bottom: 1rpx solid grey;">
					<view style="margin: 10rpx 60rpx;font-weight: bold;">自定义</view>
					<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-around;">
						<view style="display: flex;flex-direction: row;">
							<view class="bg-grey date_select_bg">
								<picker mode="date" :end="midDate" @change="startDateChange">
									<view>{{startDate}}</view>
								</picker>
							</view>
							<view class="date_select_bg">
								——
							</view>
							<view class="bg-grey date_select_bg">
								<picker mode="date" :start="midDate" @change="endDateChange">
									<view>{{endDate}}</view>
								</picker>
							</view>
						</view>
						<view class="cu-tag radius bg-blue padding-left padding-right" @tap="search">确定</view>
					</view>
				</view>
			</view>
			<view class="type_select_area" v-if="isShowType">
				<view style="margin: 10rpx 60rpx;font-weight: bold;">费种类型</view>
				<view>
					<view style="display: flex;flex-direction: row;flex-wrap: wrap;">
						<view class="cu-tag radius" :class="item.isChoose ? 'bg-blue' : 'line-black'" v-for="(item,index) in typeList" style="width:250rpx; margin: 10rpx 60rpx;" :data-index="index" @tap="typeStatusSelect" :key="index">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="social-info" @tap="hideAllSelect">
				<view class="social_card">
					<view class="card_time">{{currentDate}}</view>
					<view class="card_info">
						<view class="card_sumMoney text-grey">
							<view>交易总金额</view>
							<view>￥123</view>
						</view>
						<view class="card_count text-grey">
							<view>交易次数</view>
							<view>123笔</view>
						</view>
					</view>
				</view>
				<view>
					<view style="padding-left: 40rpx;">交易记录</view>
					<view></view>
				</view>
			</view>
		</view>
		<view class="Security" v-if="bottom_tarbar == 2">
			<view class="security_card">
				<view class="card_name">{{card_name}}</view>
				<view class="card_number">
					<view>身份证号</view>
					<view style="margin-left: 50rpx;">{{card_number}}</view>
				</view>
				<view class="card_money">
					<view>账户余额</view>
					<view style="margin-left: 50rpx;">{{card_money}}</view>
				</view>
				<view class="card_status">
					<view>状态:</view>
					<view style="margin-left: 10rpx;">{{card_status}}</view>
				</view>
			</view>
			<view class="security">
				<view class="security_item" @tap="socialSecurityInfo">
					<view>公积金账户信息</view>
					<view class="cuIcon-right text-grey"></view>
			    </view>
				<view class="security_item">
					<view>公积金贷款信息</view>
					<view class="cuIcon-right text-grey"></view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="cu-bar tabbar bg-white" style="border: 1rpx solid grey;width:100%">
			    <view class="action" :data-index="1" @tap="tarbar_select">
					<view class="cuIcon-cu-image">
						<image :src="bottom_tarbar == 1 ? '../../static/tabbar/protect_selected.png' : '../../static/tabbar/protect.png'"></image>
					</view>
					<view :class="bottom_tarbar == 1 ? 'text-blue':'text-grey'">社保</view>
			    </view>
				<view class="action" :data-index="2" @tap="tarbar_select">
					<view class="cuIcon-cu-image">
						<image :src="bottom_tarbar == 2 ? '../../static/tabbar/money_selected.png' : '../../static/tabbar/money.png'"></image>
					</view>
					<view :class="bottom_tarbar == 2 ? 'text-blue':'text-grey'">公积金</view>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 高度
				windowHeight:'',
				// 底部导航栏下标
				bottom_tarbar:1,
				isShowDate:false,
				isShowType:false,
				timeList:[
					{name:'本月',isChoose:false},
					{name:'上月',isChoose:false},
					{name:'本年',isChoose:false},
					{name:'去年',isChoose:false}
				],
				startDate:'2021-01-01',
				midDate:'',
				currentDate:'',
				endDate:'2021-01-01',
				typeList:[
					{name:'养老保险',isChoose:false},
					{name:'医疗保险',isChoose:false},
					{name:'失业保险',isChoose:false},
					{name:'工伤保险',isChoose:false},
					{name:'生育保险',isChoose:false}
				],
				card_name:'张晓茵',
				card_number:'330313300002187144',
				card_money:1000,
				card_status:11
			}
		},
		onLoad(){
			let self = this
			uni.getSystemInfo({
				success(res) {
					self.$data.windowHeight = 'height:' + res.windowHeight*2 + 'rpx'
				}
			})
			let currentDate = new Date()
			this.$data.currentDate = currentDate.getFullYear() + "-" + (currentDate.getMonth()<9 ? ('0'+(currentDate.getMonth()+1)): (currentDate.getMonth()+1))
			this.$data.card_number = this.$data.card_number.replace(/(.{2}).*(.{2})/,'$1**************$2')
			this.$data.card_money = '*****'
			this.$data.card_status = '**'
		},
		methods: {
			// 选择时间功能
			dateStatusChange() {
				if (!this.$data.isShowDate) {
					this.hideAllSelect()
				}
				this.$data.isShowDate = !this.$data.isShowDate
			},
			// 只选择一个时间区域
			timeStatusSelect(e) {
				let index = e.currentTarget.dataset.index
				// 选中当前类型, 清除其他类型
				if (!this.$data.timeList[index].isChoose) {
					for (let i = 0; i < this.$data.timeList.length; i++) {
						this.$data.timeList[i].isChoose = false
					}
					this.$data.timeList[index].isChoose = true
				} 
			},
			// 起始时间的改变
			startDateChange(e) {
				this.$data.startDate = e.detail.value
				this.$data.midDate = e.detail.value
			},
			// 终止时间的改变
			endDateChange(e) {
				this.$data.endDate = e.detail.value
				this.$data.midDate = e.detail.value
			},
			search() {
				this.$data.isShowDate = false
			},
			// 选择费种功能
			typeStatusChange() {
				if (!this.$data.isShowType) {
					this.hideAllSelect()
				}
				this.$data.isShowType = !this.$data.isShowType
			},
			// 只选择一个费种类型
			typeStatusSelect(e) {
				let index = e.currentTarget.dataset.index
				// 选中当前类型, 清除其他类型
				if (!this.$data.typeList[index].isChoose) {
					for (let i = 0; i < this.$data.typeList.length; i++) {
						this.$data.typeList[i].isChoose = false
					}
					this.$data.typeList[index].isChoose = true
				} 
				// 开始查询
				this.$data.isShowType = false
			},
			hideAllSelect() {
				this.$data.isShowType = false
				this.$data.isShowDate = false
			},
			socialSecurityInfo() {
				uni.navigateTo({
					url:'socialSecurityInfo/socialSecurityInfo'
				})
			},
			// 底部导航栏的切换
			tarbar_select(e){
				this.$data.bottom_tarbar = e.currentTarget.dataset.index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search_area {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		border: 1rpx solid grey;
		view{
			letter-spacing: 5rpx;
		}
	},
	.date_select_bg{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding:10rpx 20rpx;
		margin: 20rpx auto;
	}
	.type_select_area{
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid black;
		padding-bottom: 10rpx;
	}
	.social_card{
		margin:5% auto;
		width:90%;
		border-radius: 10rpx;
		background-color: #CCE6FF;
		box-shadow: 1rpx 1rpx 1rpx #CCE6FF;
		.card_time{
			font-size: 40rpx;
			font-weight: bold;
			padding: 50rpx 0 30rpx 100rpx;
		}
		.card_info{
			display: flex;
			flex-direction: row;
			align-items:center;
			justify-content: space-around;
			padding-bottom: 50rpx;
		}
	}
	.security{
		display: flex;
		flex-direction: column;
	}
	.security_card{
		margin:5% auto; 
		width:90%;
		border-radius: 10rpx;
		background-color: #CCE6FF;
		box-shadow: 1rpx 1rpx 1rpx #CCE6FF;
		.card_name{
			font-size: 40rpx;
			font-weight: bold;
			padding: 30rpx 0 0 50rpx;
		}
		.card_number{
			display: flex;
			flex-direction: row;
			align-items: center;
			padding:15rpx 0 0 50rpx
		}
		.card_money{
			display: flex;
			flex-direction: row;
			align-items: center;
			padding:15rpx 0 0 50rpx
		}
		.card_status{
			display: flex;
			flex-direction: row;
			align-items: center;
			padding:90rpx 0 30rpx 500rpx
		}
	}
	.security_item{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		padding: 20rpx 50rpx;
		margin: auto;
	}
	.security_item:nth-child(1) {
		border: 1rpx solid black;
		border-top-right-radius: 10rpx;
		border-top-left-radius: 10rpx;
	}
	.security_item:nth-child(2) {
		border-left: 1rpx solid black;
		border-right: 1rpx solid black;
		border-bottom: 1rpx solid black;
		border-bottom-right-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
	}
	.box {
		left: 0;
		position: fixed; 
		bottom: 0; 
		width: 100%; 
	}
</style>
