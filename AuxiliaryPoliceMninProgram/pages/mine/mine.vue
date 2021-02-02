<template>
	<view class="container">
		<view class="header">
			<view class="avatar-box">
				<image src="../../static/imgs/img_25832_0_2.png" mode="aspectFill"></image>
			</view>
			<view class="header-content" v-if="hasLogin">
				<view class="username">
					{{ YUserName }} 
				</view>
				<view class="userid">
					{{ YLoginId }}
				</view>
			</view>
			<view class="header-content" v-else>
				<view class="BtnGoLogin" @tap="navTo('../login/login')">
					请登录
				</view>
			</view>
		</view>
		
		<view class="main">
			<view class="cu-list menu">
				<view class="cu-item arrow" v-if="hasLogin" @tap="navTo('../login/forgetPwd/forgetPwd')">
					<view class="content">
						<text class="cuIcon-list"></text>
						<text class="text-black">账号管理</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-question"></text>
						<text class="text-black">关于我们</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="navPerInfo">
					<view class="content">
						<text class="cuIcon-info"></text>
						<text class="text-black">个人信息</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="footer">
			<button v-if="hasLogin" class="cu-btn text-white shadow shadow-blur" @tap="logout">退出登录</button>
			<!-- <button v-else class="cu-btn text-white shadow shadow-blur" @tap="navTo('../login/login')">去登录</button> -->
			<button v-else class="cu-btn text-white shadow shadow-blur" @tap="navTo('../login/login')">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	// import loginapi from '../../common/loginApis/loginapi.js'
	// import navHeader from '../../components/nav-header.vue'
	
	export default {
		data() {
			return {
				avatarURL:  this.$baseURL + '/StuInfoService/img/girl.png',
			};
		},
		computed:{
			// ...mapState(['hasLogin','YUserName','YLoginId']),
		},
		components:{
			// navHeader
		},
		onShow() {
		},
		methods:{
			/**
			 * 跳转到个人信息界面
			 */
			navPerInfo:function(){
				uni.navigateTo({
					url:'./personInfo/personInfo'
				})
			},
			/**
			 * 跳转页面
			 * @param {Object} url 跳转的路径
			 */
			navTo(url){
				//登出成功，直接跳转回首页
				uni.clearStorageSync();
				uni.reLaunch({
					url:url
				})
			},
			/**
			 * 退出登录
			 */
			async logout(){
				let confirm = await this.showModelConfirm('退出账号','您确定退出当前账号吗？')
				if(confirm == 'cancel') return //取消登出
				let islogout = await loginapi.doLogout()//执行登出
				if(!islogout) {//执行登出失败
					uni.showToast({
						icon:'none',
						title:'操作失败，请检查网络'
					})
					return 
				}
				//登出成功，直接跳转回首页
				uni.reLaunch({
					url:'../index/index'
				})
			},
			/**
			 * 显示确认框
			 * @param {Object} title
			 * @param {Object} content
			 */
			async showModelConfirm(title, content){
				return new Promise((resolve, reject)=>{
					uni.showModal({
						title:title,
						content:content,
						success: (res => {
							if(res.confirm){
								resolve('confirm')
							}else if(res.cancel){
								resolve('cancel')
							}
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		
	}
	.header{
		height: 250rpx;
		// background-image: url('@{baseURL}/img/Timg.jpg');
		background-size: 800rpx 300rpx;
		border-radius:0rpx 0rpx 30rpx 30rpx;
		box-shadow: 0rpx 10rpx 5rpx #e2e2e2;
		display: flex;
		
		.avatar-box{
			margin: 62.5rpx;
			
			image{
				border: 1rpx solid #ffffff;
				border-radius: 50%;
				width: 125rpx;
				height: 125rpx;
				background-color: #ffffff;
			}
		}
		
		.header-content{
			// border: 1px solid white;
			height: 125rpx;
			margin-top: 62.5rpx;
			font-size: 35rpx;
			color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
	}
	
	.main{
		margin-top: 25rpx;
	}
	
	.footer{
		margin-top: 30rpx;
		text-align: center;
		
		button{
			width: 300rpx;
			font-size: 35rpx;
			border-radius: 30rpx;
			background-color: #808080;
		}
	}
</style>
