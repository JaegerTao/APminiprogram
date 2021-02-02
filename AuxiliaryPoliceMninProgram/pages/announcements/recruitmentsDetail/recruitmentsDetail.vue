<template>
	<!--招聘公告详情-->
	<view class="recruitmentsDetail">
		<view class="main">
			<view class="title">
				<rich-text :nodes="recruitmentsDetail.title"></rich-text>
			</view>
			<view class="content">
				<rich-text :nodes="recruitmentsDetail.content"></rich-text>
			</view>
		</view>
		<!-- <view class="footer">
			<button type="primary" @click="apply">
				<text>我要报名</text>
			</button>
		</view> -->

	</view>
</template>

<script>
	import Detail from './recruitmentsDetail.js'
	export default {
		data() {
			return {
				recruitmentsDetail: {
					title: "",
					content: ""
				}
			}
		},
		onLoad(data) {
			this.getRecruitmentsDetail(data.id)
		},
		methods: {
			/**
			 * 报名操作
			 */
			apply(){
				var token = uni.getStorageSync("token");
				if(!token){
					uni.setStorageSync("LoginSingup",JSON.stringify(this.recruitmentsDetail)); //表示未登录状态报名
					uni.navigateTo({
						url:'../../login/login'
					})
				}else{
					uni.navigateTo({
						url:'../../../pagesStu/bulletiBboard/bulletiBboard'
					})
				}
			},
			/**
			 * 获取对应招聘公告详情
			 * @param {Object} id 对应公告id
			 */
			getRecruitmentsDetail(id) {
				this.recruitmentsDetail = Detail[parseInt(id)];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recruitmentsDetail {
		.main {
			width: 730rpx;
			margin: 10rpx auto 0;

			.title {
				width: 470rpx;
				margin: 0 auto 20rpx;
				text-align: center;

				rich-text {
					font-size: 32rpx;
					font-weight: bold;
					
				}


			}

			.content {
				width: 730rpx;
				font-size: 30rpx;

				rich-text {}

			}

		}

		.footer {
			// position: absolute;
			width: 750rpx;
			// bottom: 10rpx;
			margin: 40rpx 0 25rpx;

			button {
				width: 60%;
				height: 70rpx;
				margin: 0 auto;
				background: #007AFF;
				line-height: 70rpx;

				text {
					white-space: 5rpx;
					color: #FFFFFF;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>
