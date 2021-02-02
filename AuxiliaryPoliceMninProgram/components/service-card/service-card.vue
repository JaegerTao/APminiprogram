<!-- 服务卡片组件 -->
<template>
	<view>
		<view class="card">
			<image :style="{width:imgsize +'rpx',height:imgsize+'rpx'}" :src="url" mode="aspectFill"></image>

			<view class="card-title">
				{{title}}
			</view>
			
			<view class="card-title-vice" v-if="vice==''?false:true">
				{{vice}}
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			url: { //图片链接
				type: String,
				default: '../../static/imgs/个人数据@3x.png'
			},
			title: { //卡片标题
				type: String,
				default: '信息采集与信息服务'
			},
			vice:{//副标题
				type: String,
				default: ''
			},
			imgsize:{//图标大小
				type: String,
				default: '185'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		border-radius: 10rpx;
		margin: 20rpx;
		padding: 20rpx;
		background-color: rgba(256,256,256,0.9);
		height: 330rpx;
		
		image {
			margin: 10rpx;
			border-radius: 40%;
			// height: 185rpx;
			// width: 185rpx;
		}
		
		.card-title-vice{
			margin-top: 5rpx;
			color: #b3b3b3;
			font-size: 22rpx;
		}
	}
	.card:hover{
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
		background-color: #e1e1e1;
	}
</style>
