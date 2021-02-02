<template>
	<view class="socialSecurityInfo-container">
		<view class="top-info" :style="top_height">
			<view class="text-white">账户余额</view>
			<view class="text-white">￥{{remainMoney}}</view>
		</view>
		<view class="bottom-info" :style="bottom_height">
		</view>
		<view class="main-info">
			<view class="cu-list menu sm-border card-menu">
				<view class="cu-item">
					<view class="content">
						<text class="text-black part-title">基本信息</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">个人账号</text>
						<text></text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">缴存单位</text>
						<text></text>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu margin-top">
				<view class="cu-item">
					<view class="content">
						<text class="text-black part-title">缴存信息</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black part-content">个人缴存基数</text>
						<text class="part-content">￥</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black part-content">个人月缴存额</text>
						<text>￥</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black part-content">个人缴存比例</text>
						<text>%</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black part-content">单位月缴存额</text>
						<text>￥</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black part-content">单位缴存比例</text>
						<text>%</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 账户余额
				remainMoney:2000,
				top_height:'',
				bottom_height:''
			}
		},
		onLoad() {
			let self = this
			uni.getSystemInfo({
				success(res){
					self.$data.top_height = 'height:' + 0.4*res.windowHeight + 'rpx'
					self.$data.bottom_height = 'height:' + 1.6*res.windowHeight + 'rpx'
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.top-info{
		background-color: #3F536E;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		view{
			padding: 10rpx 0;
		}
	}
	.bottom-info{
		width: 100%;
		background-color: #EEEEEE;
	}
	.main-info{
		position: absolute;
		width: 100%;
		margin-top: -145%;
		.part-title{
			font-size: 40rpx;
			font-weight: bold;
		}
		.content{
			display: flex;
			flex-direction: row;
		}
		.part-content{
			display: inline-block;
			width: 20%;
			padding: 15rpx 0;
		}
		.content text:nth-child(2){
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: flex-start;
			padding: 15rpx 25rpx;
		}
	}
</style>
