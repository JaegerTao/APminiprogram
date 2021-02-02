<template>
	<!-- 做题记录页面图标 -->
	<view class="Item">
		<view class="Icon text-blue" :class="icon"></view>
		<view class="Num">{{ num }}</view>
		<view class="Title">{{ title }}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type: String,
				default: "做题量"
			},
			icon:{
				type: String,
				default: "cuIcon-rank"
			},
			num:{
				type: String,
				default: "0"
			}
		}
	}
</script>

<style>
	.Item{
		display: flex;
		flex-direction: column;
		width: 187.5rpx;
		justify-content: space-evenly;
		text-align: center;
	}
	.Icon{
		font-size: 100rpx;
	}
	.Num,.Title{
		font-size: 30rpx;
	}
</style>
