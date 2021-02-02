<template>
	<view class="noticeDetail">
		<view class="main">
			<view class="title">
				<rich-text :nodes="recruitmentsDetail.title"></rich-text>
			</view>
			<view class="content">
				<rich-text :nodes="recruitmentsDetail.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.noticeDetail {
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
	}
</style>
