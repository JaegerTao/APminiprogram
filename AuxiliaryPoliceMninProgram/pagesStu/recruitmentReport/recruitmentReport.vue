<template>
	<!--招聘报名-->
	<view class="recruitment_report main">
		<!--轮播图区域，实现页面切换-->
		<swiper class="swipers" :current="swiperIndex" duration="50">
			<!--第一个轮播图区域，比赛信息展示-->
			<swiper-item class="swiper_first" catchtouchmove="false">
				<view class="declare">
					<!--信息展示-->
					<scroll-view scroll-y="true" class="info_list">
						<!-- 招聘信息展示 -->
						<view class="declare_item cu-list menu card-menu sm-border margin-top" v-for="(item,index) in declareList" :key="index"
						 @click="showDeclareInfo(item)">
							<view class="cu-item">
								<view class="content">
									<text class="cuIcon-community text-grey"></text>报考单位:
								</view>
								<view class="action">
									<text class="text-grey">{{ item.unit }}</text>
								</view>
							</view>
							<view class="cu-item">
								<view class="content">
									<text class="cuIcon-profile text-grey"></text>报考岗位:
								</view>
								<view class="action">
									<text class="text-grey">{{ item.jobs }}</text>
								</view>
							</view>
							<view class="cu-item item">
								<view class="content">
									<text class="cuIcon-qr_code text-grey"></text>岗位代码:
								</view>
								<view class="action">
									<text class="text-grey">{{ item.postCode }}</text>
								</view>
							</view>
							<view class="cu-item item">
								<view class="content">
									<text class="cuIcon-peoplelist text-grey"></text>招聘人数:
								</view>
								<view class="action">
									<text class="text-grey">{{ item.number }}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</swiper-item>
			<!--第二个轮播图区域，详细信息展示-->
			<swiper-item class="swiper_second" catchtouchmove="false">
				<!-- 返回按钮 -->
				<view class="back" @click="back">
					<view class="btn_nav">
						<text class="btn cuIcon-back"></text>
					</view>
				</view>
				<!--详细信息-->
				<view class="detail">
					<view class="declare_item cu-list menu card-menu sm-border margin-top">
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-community text-grey"></text>报考单位:
							</view>
							<view class="action">
								<text class="text-grey">{{ declareInfo.unit }}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-profile text-grey"></text>报考岗位:
							</view>
							<view class="action">
								<text class="text-grey">{{ declareInfo.jobs }}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-qr_code text-grey"></text>岗位代码:
							</view>
							<view class="action">
								<text class="text-grey">{{ declareInfo.postCode }}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-peoplelist text-grey"></text>招聘人数:
							</view>
							<view class="action">
								<text class="text-grey">{{ declareInfo.number }}</text>
							</view>
						</view>
						<view class="cu-item item">
							<view class="content">
								<text class="cuIcon-info text-grey"></text>岗位说明（报考资格条件）:
							</view>
							<view class="action">
								<text class="text-grey">{{ declareInfo.specifications == "" ? '无' :  declareInfo.specifications }}</text>
							</view>
						</view>
						<view class="cu-item item">
							<view class="content">
								<text class="cuIcon-settings text-grey"></text>特殊说明:
							</view>
							<view class="action">
								<text class="text-grey">{{ declareInfo.special_instructions == "" ? '无' : declareInfo.special_instructions  }}</text>
							</view>
						</view>
					</view>
				</view>

				<!--报名按钮-->
				<view class="btn">
					<button type="primary" @click="apply">
						<text>我要报名</text>
					</button>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import testData from './test.js'
	export default {
		data() {
			return {
				startDate: "2020-10-22", //开始报名时间
				endDate: "2021-10-21", //结束报名时间,
				//需要展示的信息
				declareList: [],
				//展示的信息标题
				declareTitles: ["操作", "报考单位", "报考岗位"],
				swiperIndex: 0, //当前轮播图所在页面
				declareInfo: null, //当前展示的详情
			}
		},
		onLoad() {
			this.getDecalreList();
		},
		created() {

		},
		methods: {
			/**
			 * 获取需要展示的信息
			 */
			getDecalreList: function() {
				this.declareList = testData.rows;
			},
			/**
			 * 展示详情信息
			 * @param {Object} item
			 */
			showDeclareInfo: function(item) {
				this.swiperIndex = 1;
				this.declareInfo = item;
			},
			/**
			 * 返回到信息展示界面
			 */
			back: function() {
				this.swiperIndex = 0;
			},
			/**
			 * 报名
			 */
			apply: function() {
				uni.navigateTo({
					url:'../bulletiBboard/bulletiBboard'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.recruitment_report {
		width: 100%;
		height: 100%;

		.swipers {
			width: 100%;
			height: 100%;

			swiper-item {
				width: 100%;
				height: 100%;
			}

			.swiper_first {
				background-color: #F0F0F0;

				.declare {
					height: 100%;

					.info_list {
						height: 100%;

						.declare_item {
							// border: 1rpx solid #0081FF;
						}

						.declare_item:last-child {
							margin-bottom: 30rpx;
						}
					}
				}
			}

			.swiper_second {
				background-color: #F0F0F0;
				.back {
					
					margin-top: 20rpx;
					height: 80rpx;
					width: 80rpx;

					.btn_nav {
						background: #FFFFFF;
						width: 80rpx;
						height: 80rpx;
						border: 1rpx solid #EAEAEA;
						border-radius: 50rpx;
						margin-left: 24rpx;
						text-align: center;

						.btn {
							font-size: 35rpx;
							line-height: 80rpx;
						}
					}
				}

				.detail {
					.declare_item {
						.item {
							display: block;
							view:nth-child(1) {
								padding: 30rpx 0 25rpx 0;
							}
							view:nth-child(2) {
								padding: 0 0 30rpx 20rpx;
							}

						}

					}
				}

				.btn {
					width: 750rpx;
					margin-top: 30rpx;

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
							letter-spacing: 3rpx;
						}
					}
				}

			}
		}
	}
</style>
