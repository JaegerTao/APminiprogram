<template>
	<view class="person_info">
		<view class="cu-bar bg-white solid-bottom" style="background-color: #F0F0F0; ">
			<view class="action">
				<text class="cuIcon-titles text-cyan"></text>
				<view class="text-lg text-black">
					基本情况
				</view>
			</view>
		</view>
		<!-- 基本信息列表 -->
		<view class="cu-card shadow" style="height: 90%;overflow: auto; background-color: #F8F8F8;">
			<view class="cu-item">
				<view class=" cu-list menu sm-border ">
					<view class="cu-item" v-for="(item,index) in tableData" :key="index" @click="modify(index)">
						<text class="text-gray text-df text-gray">{{item.key}}</text>
						<image :src="imgList[0]" class="click_item" mode="aspectFill" v-if="index == 0" >
						</image>
						<text class="text-black text-df click_item" v-if="index != 0 && index != 4">{{item.value}}</text>
						<picker mode="date" :value="tableData[4].value" start="1950-01-01" @change="DateChange" v-if="index == 4">
							<view class="picker click_item">
								{{tableData[4].value}}
							</view>
							<!-- <view class="cuIcon-unfold"></view> -->
						</picker>
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
				imgList: [], //图片数组
				tableData: [{
						key: '照片',
						value: '',
					},
					{
						key: '姓名',
						value: '陈元华',
					},
					{
						key: '性别',
						value: '男',
					},
					{
						key: '联系电话',
						value: '13096141049',
					},
					{
						key: '出生日期',
						value: '2020-10-31',
					},
					{
						key: '电子邮箱',
						value: '1925192939@qq.com',
					}


				],
			}
		},
		methods: {
			/**
			 * 日期改变
			 */
			DateChange: function(e) {
				this.tableData[4].value = e.target.value;
			},
			/**
			 * 修改属性
			 * @param {Object} index 
			 */
			modify: function(index) {
				switch (index) {
					case 0:
						this.ChooseImage()
						break;
					case 4:

						break;
				}
			},
			/**
			 * 图片选择
			 */
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.click_item:after {
		content: "\e6a3";
		font-family: "cuIcon";
		padding-left: 5rpx;
	}

	image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
