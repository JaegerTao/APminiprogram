<template>
	<!--公告列表-->
	<view class="announcements">
		<view class="info-nav head" id="head">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="action cu-item flex-sub" :class="0==navCur?'text-blue cur':''" @tap="navChange" data-cur="0">
						招聘公告
					</view>
					<view class="action cu-item flex-sub" :class="1==navCur?'text-blue cur':''" @tap="navChange" data-cur="1">
						通知公告
					</view>
				</view>
			</scroll-view>
		</view>
		<swiper class="swipers" :current="swiperIndex" duration="50" :style="{height:showSwiperWindowHeight + 'px'}">
			<!--招聘公告-->
			<swiper-item class="swiper_recruitment swiper" catchtouchmove="false">
				<!-- 招聘公告 -->
				<scroll-view class="recruitments" scroll-y="true">
					<view class="recruitment_item" v-for="(item,index) in recruitmentList" :key="index" @click="showRecruitmentsDetail(item)">
						<view class="item">
							<!-- <view class="type">
								{{item.type}}
							</view> -->
							<view class="content">
								<text>{{item.content}}</text>
							</view>
							<view class="time" :class="getCurrentTime(item.time) ? 'text_red' : ''">
								<text>{{item.time}}</text>
								<text class="cuIcon-right"> </text>
							</view>
						</view>
					</view>
				</scroll-view>
				<!--分页-->
				<view class="pagination">
					<view class="total">
						<text>共{{recruitmentList.length}}条</text>
					</view>
					<view class="choose">
						<text class="cuIcon-back" @click="pre"></text>
						<text>{{1}}</text>
						<text class="cuIcon-right" @click="next"></text>
					</view>
					<view class="to_login" @click="toLogin" v-if="isShowLogin">
						<text>去登录...</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</swiper-item>
			<!--通知公告-->
			<swiper-item class="swiper_notice swiper" catchtouchmove="false">
				<scroll-view class="recruitments" scroll-y="true">
					<view class="recruitment_item" v-for="(item,index) in recruitmentList" :key="index" @click="showNoticeDetail(item)">
						<view class="item">
							<!-- <view class="type">
								{{item.type}}
							</view> -->
							<view class="content">
								<text>{{item.content}}</text>
							</view>
							<view class="time" :class="getCurrentTime(item.time) ? 'text_red' : ''">
								<text>{{item.time}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
				<!--分页-->
				<view class="pagination">
					<view class="total">
						<text>共{{recruitmentList.length}}条</text>
					</view>
					<view class="choose">
						<text class="cuIcon-back" @click="pre"></text>
						<text>{{1}}</text>
						<text class="cuIcon-right" @click="next"></text>
					</view>
					<view class="to_login" @click="toLogin" v-if="isShowLogin">
						<text>去登录...</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperIndex: 0, //当前轮播区域
				navCur: 0, //当前选中的tabbar
				showSwiperWindowHeight: 0, //需要展示的swiper的高度，px
				isShowLogin:true,
				recruitmentList: [ //招聘公告列表
					{
						id: 0,
						type: "热门推荐",
						content: "昆明厚致百盈企业管理有限公司关于昆明市公安局2021年第一批公开招聘勤务辅警公告",
						time: "2021-01-15",
					},
					{
						id: 1,
						type: "热门推荐",
						content: "2021每日辅警招聘、消防员招聘、城管局招聘、法检招聘公告汇总（1月25日）",
						time: "2021-01-25",
					},
					{
						id: 2,
						type: "热门推荐",
						content: "2021广东东莞麻涌镇消防救援大队招聘火灾隐患整治办工作人员公告（6人）",
						time: "2021-01-25",
					},
					{
						id: 3,
						type: "考试公告",
						content: "2021广东江门市消防救援支队招聘政府专职消防员公告（69人）",
						time: "2021-01-25",
					},

				],
				queryInfo:{
					pagesize:10,
					pageNum:20,
					total:0
				}
			};
		},
		created() {
			this.getCurrentTime();
			this.isShowLoginBtn()
		},
		onLoad() {
			this.getWindowHeigth()
		},
		methods: {
			/**
			 * 判断是否需要展示登录按钮
			 */
			isShowLoginBtn(){
				var token = uni.getStorageSync("token");
				if(!token) this.isShowLogin = true;
				else {
					this.isShowLogin = false;
				}
			},
			/**
			 * 展示招聘公告详情
			 * @param {Object} item
			 */
			showRecruitmentsDetail: function(item) {
				uni.navigateTo({
					url: 'recruitmentsDetail/recruitmentsDetail?id=' + item.id
				})
			},
			/**
			 * 展示通知公告详情
			 * @param {Object} item
			 */
			showNoticeDetail: function(item) {
				uni.navigateTo({
					url: 'noticeDetail/noticeDetail'
				})
			},
			/*获取到点击的元素*/
			navChange: function(e) {
				this.navCur = e.currentTarget.dataset.cur;
				this.swiperIndex = this.navCur == 0 ? 0 : 1;
			},
			/*获取窗口高度*/
			async getWindowHeigth() {
				var _self = this;
				uni.getSystemInfo({
					success(res) {
						uni.createSelectorQuery().in(_self).select("#head").fields({
							size: true,
							rect: true,
						}, (data) => {
							_self.showSwiperWindowHeight = res.windowHeight - data.height - 6;
						}).exec();
					}
				})
			},
			/**
			 * 判断公告日期是否为当前日期
			 */
			getCurrentTime: function(nowTime) {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var curTime = year + "-" + month + "-" + day;
				if (curTime == nowTime) return true;
				return false;
			},
			/**
			 * 登陆操作
			 */
			toLogin:function(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			/**
			 * 上一页
			 */
			pre:function(){
				
			},
			/**
			 * 下一页
			 */
			next:function(){
				
			}
		}
	}
</script>

<style lang="scss" scope>
	.text_red {
		color: red;
	}

	.announcements {

		.swipers {
			width: 730rpx;
			margin: 10rpx auto 0;

			.swiper {
				width: 100%;
				height: 100%;

				.recruitments {
					width: 100%;
					height: 95%;

					.recruitment_item {
						width: 750rpx;
						margin: 10rpx 0;
						height: 130rpx;
						// border: 1rpx solid #AAAAAA;
						// border-radius: 10rpx;

						.item {
							width: 100%;
							display: flex;
							padding: 3rpx 2rpx;
							height: 100%;
							background-color: #fff;
							border-bottom: 1px solid rgba(226, 226, 226, 1);
							.content {
								flex: 6;
								font-size: 28rpx;
								display: flex;
								align-items: center;

								text {
									max-height: 120rpx;
								}

								overflow: hidden;
							}

							.time {
								flex: 2;
								text-align: center;
								display: flex;
								align-items: center;

								text:nth-child(1) {
									padding-left: 5rpx;
								}
							}
						}
					}

				}

				
				.pagination {
					position: absolute;
					bottom: 10rpx;
					width: 470rpx;
					left: 50%;
					transform: translate(-50%);
					display: flex;
					justify-content: space-around;
					line-height: 40rpx;

					.total {}

					.choose {
						display: flex;
						text {
							padding: 0 20rpx;
						}
					}

					.to_login {

						text {
							color: #007AFF;
						}
					}
				}
			}
		}
	}
</style>
