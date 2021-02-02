<template>
	<!-- 消息中心 -->
	<view>
		<view class="top">
			<view class="topText">共{{ messageCount }}条</view>
			<view class="DelAll" @tap="MessageDel">全部清除</view>
		</view>
		<view class="middle">
			<!-- <block v-for="(item, index) in messageList" :key="index">
				<messageListItem :idno="item.IdNo" :isread="item.IsRead" :msgcontent="item.Content" :msgtitletype="item.Type"
				 :noticetime="item.NoticeTime" @delthis="DelThis" @readthis="ReadThis"></messageListItem>
			</block> -->
			<message-list-item></message-list-item>
			<view class="nomessage" v-if="!nomessage && (messageList.length % 12 == 0)" @tap="getMoreMessage">
				查看更多消息...
			</view>
			<view class="nomessage" v-else-if="messageList.length > 0">
				暂无更多消息
			</view>
		</view>
		<view class="nomessage" v-if="nomessage">
			暂无消息记录
		</view>
		
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import messageListItem from '../componentItem/message-list-item.vue'
	export default{
		data(){
			return{
				nomessage: false,
				messageList: [],
				currenrPage: 1,
				messageCount: 1,
				messageNotread: 0,
			}
		},
		components:{
			messageListItem
		},
		methods:{
			//删除全部消息
			MessageDel() {
				uni.showModal({
					title: '提示',
					content: '将要清除系统中的全部消息，是否继续？',
					success: (res) => {
					}
				})
			},
		}
	}
</script>

<style>
	.top {
		margin-left: 15rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 720rpx;
		height: 80rpx;
		text-align: center;
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		box-shadow: 10rpx 10rpx 5rpx #e2e2e2;
	}
	
	.top>view {
		font-size: 30rpx;
		color: #a4acb6;
	}
	
	.topText {
		position: absolute;
		left: 160rpx;
		top: 30rpx;
	}
	
	.DelAll {
		position: absolute;
		left: 500rpx;
		top: 30rpx;
	}
	.nomessage {
		margin-top: 30rpx;
		width: 750rpx;
		text-align: center;
	}
</style>
