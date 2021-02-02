<template>
	<!--报名表单-->
	<view class="bulletiBboard">
		<!--标题-->
		<view class="RegisTitle">
			<text>{{RegisTitle}}</text>
		</view>

		<!--弹窗-->
		<view class="cu-modal model" :class="showModalWindow == 'showModalWindow' ? 'show' : '' " @tap="hideWindow">
			<view class="cu-dialog dialog" @tap.stop>
				<view class="page all" :style="{height: 260 + 'px'}">
					<view class="close" :style="{height: 18 + 'px'}" @tap="hideWindow">
						<view class="close_btn">
							<text class="cuIcon-roundclose"></text>
						</view>
					</view>
					<view class="body">

						<view class="f_model model_fs">
							<view class="student_add">
								<view class="number item">
									<text>起止时间</text>
									<input type="text" v-model="personInfo.time" />
								</view>
								<view class="rank item">
									<text>单位（学校）</text>
									<input type="text" v-model="personInfo.unit" />
								</view>
								<view class="rank item">
									<text>岗位（专业）</text>
									<input type="text" v-model="personInfo.jobs" />
								</view>
								<view class="btns">
									<view class="btn_two">
										<button @click="modelSubmit">提交</button>
										<button @click="modelCancel">取消</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!--内容-->
		<view class="container">
			<view v-for="(item1, index1) in writelist" :key="index1" class="collaose">
				<!--标题显示-->
				<view @tap="handleclick(index1)" class="section louis-space-between ">
					<view class="box">
						<text :class="item1.icon"></text>
						<view class="head">
							{{item1.head}}
						</view>
					</view>
					<view class="louis-inline-block incon">
						<text :class=" item1.open ? 'cuIcon-unfold': 'cuIcon-right'"></text>
					</view>
				</view>

				<!--基本情况填写-->
				<view class="basic_situation basic" v-show="item1.open" v-if="item1.id == 0">
					<!-- <view class="basic_title">
						<text>基本情况</text>
					</view> -->
					<form class="form">
						<view class="situation_item " v-for="(item,index) in registrForm.basic_situation" :key="index" :class="item.class">
							<text v-if="item.isRequird" class="isRequird">*</text>
							<text class="title">{{item.label}}</text>
							<input class="input" v-if="item.isInput" :type="item.type" v-model="item.rules.value" :disabled="item.isAutomatically"
							 :class="item.isAutomatically ? 'dark' : ''" />
							<picker v-if="item.isPicker" :range="item.pickerArray" :value="item.pickerIndex" @change="bindPickerChange"
							 @click="hander(item,1)" mode="selector">
								<view class="picker_content">{{item.pickerArray[item.pickerIndex]}}</view>
								<view class="cuIcon-unfold"></view>
							</picker>
							<picker mode="date" :value="item.rules.value" start="1950-01-01" @change="DateChange" v-if="item.isDatePicker"
							 @click="hander(item,1)">
								<view class="picker">
									{{item.rules.value}}
								</view>
								<view class="cuIcon-unfold"></view>
							</picker>
							<view class="img_uplaod" v-if="item.isImg">
								<view class="cu-bar bg-white margin-top">
									<view class="action">
										图片上传
									</view>
									<view class="action">
										{{imgList.length}}/1
									</view>
								</view>
								<view class="cu-form-group">
									<view class="grid col-4 grid-square flex-sub">
										<view class="bg-img" v-for="(item2,index2) in imgList" :key="index2" @tap="ViewImage" :data-url="imgList[index2]">
											<image :src="imgList[index2]" mode="aspectFill"></image>
											<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index2">
												<text class='cuIcon-close'></text>
											</view>
										</view>
										<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
											<text class='cuIcon-cameraadd'></text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</form>
				</view>

				<!--个人简历-->
				<view class="persona_resume basic" v-show="item1.open" v-if="item1.id == 1">
					<!-- <view class="basic_title">
						<text>个人简历</text>
					</view> -->
					<view class="attion">
						<text>注意:从高中或中专开始填</text>
					</view>
					<t-table class="t_table">
						<t-tr>
							<t-th>起止时间</t-th>
							<!-- <t-th>详情</t-th> -->
							<t-th>单位（学校)</t-th>
							<t-th>岗位（专业)</t-th>
						</t-tr>
						<t-tr font-size="14" v-for="item in registrForm.persona_resume" :key="item.id" @longpress="longPress(item)" @tap="handerTable(item)"
						 :class="item.id == tableIndex ? 'dark_green' : '' ">
							<t-td align="left">{{ item.time }}</t-td>
							<t-td>{{ item.unit }}</t-td>
							<t-td>{{ item.jobs }}</t-td>
							<!-- <t-td>
								<button type="default">查看详情</button>
							</t-td> -->
						</t-tr>
					</t-table>
					<view class="dealBtns">
						<view class="add" @click="dealBtns(1)">
							<text class="cuIcon-roundadd"></text>
							<text>添加</text>
						</view>
						<view class="editor" @click="dealBtns(2)">
							<text class="cuIcon-edit"></text>
							<text>编辑</text>
						</view>
						<!-- <view class="delete" @click="dealBtns(3)">
							<text class="cuIcon-delete"></text>
							<text>删除</text>
						</view> -->
						<!-- <view class="search">
							<text class="iconfont iconchazhao"></text>
							<text>查找</text>
						</view>
						<view class="refresh">
							<text class="iconfont iconshuaxin"></text>
							<text>刷新</text>
						</view> -->
					</view>
				</view>

				<!--专业技能-->
				<view class="profession_skills basic" v-show="item1.open" v-if="item1.id == 2">
					<!-- <view class="basic_title">
						<text>专业技能</text>
					</view> -->
					<form class="form">
						<view class="situation_item " v-for="(item,index) in registrForm.profession_skills" :key="index" :class="item.class">
							<text v-if="item.isRequird" class="isRequird">*</text>
							<text class="title">{{item.label}}</text>
							<view class="cu-form-group  textarea_item">
								<textarea @click="hander(item,3)" maxlength="-1" @input="textareaAInput" placeholder="专业技能"></textarea>
							</view>
						</view>
					</form>
				</view>

				<!--考试加分理由-->
				<view class="exam_bonusReasons basic" v-show="item1.open" v-if="item1.id == 3">
					<!-- <view class="basic_title">
						<text>考试加分理由</text>
					</view> -->
					<form class="form">
						<view class="situation_item " v-for="(item,index) in registrForm.exam_bonusReasons" :key="index" :class="item.class">
							<text v-if="item.isRequird" class="isRequird">*</text>
							<text class="title">{{item.label}}</text>
							<view class="cu-form-group  textarea_item">
								<textarea @click="hander(item,3)" maxlength="-1" @input="textareaAInput" placeholder="考试加分理由"></textarea>
							</view>
						</view>
					</form>
				</view>

				<!--服装尺码-->
				<view class="dress_size basic" v-show="item1.open" v-if="item1.id == 4">
					<!-- <view class="basic_title">
						<text>服装尺码</text>
					</view> -->
					<form class="form">
						<view class="situation_item " v-for="(item,index) in registrForm.dress_size" :key="index" :class="item.class">
							<text v-if="item.isRequird" class="isRequird">*</text>
							<text class="title">{{item.label}}</text>
							<input class="input" v-if="!item.isPicker" :type="item.type" v-model="item.rules.value" :disabled="item.isAutomatically"
							 :class="item.isAutomatically ? 'dark' : ''" />
							<picker v-if="item.isPicker" :range="item.pickerArray" :value="item.pickerIndex" @change="bindPickerChange"
							 @click="hander(item,5)" mode="selector">
								<view class="picker_content">{{item.pickerArray[item.pickerIndex]}}</view>
								<view class="cuIcon-unfold"></view>
							</picker>
						</view>
					</form>
				</view>
			</view>
		</view>


		<view class="footer">
			<button type="primary" @click="submitForm">
				<text>提交申请</text>
			</button>
		</view>
	</view>
</template>

<script>
	import registrInfo from './registrInfo.js'
	import PereSume from './persona_resume.js'
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		data() {
			return {
				registrForm: null, //报名表单信息
				RegisTitle: '昆明市公安局公开招聘勤务辅警报名表',
				info: null, //选择器选择的对象暂存
				type: 0, //当前填写的具体部分分类
				showModalWindow: "", //是否开始弹窗
				tableIndex: -1, //个人简历选中
				personInfo: { //个人简历选中数据
					"id": -1,
					"time": "", //起止时间
					"unit": "", //单位
					"jobs": "" //岗位
				},
				// tableInfo:null,
				imgList: [],
				txt: "",
				//表单展示数据
				writelist: [{
						id: 0,
						icon: 'cuIcon-info',
						head: '基本情况',
						open: true
					},
					{
						id: 1,
						icon: 'cuIcon-people',
						head: '个人简历',
						open: false
					},
					{
						id: 2,
						icon: 'cuIcon-skin',
						head: '专业技能',
						open: false
					},
					{
						id: 3,
						icon: 'cuIcon-text',
						head: '考试加分理由',
						open: false
					},
					{
						id: 4,
						icon: 'cuIcon-shop',
						head: '服装尺码',
						open: false
					}
				]
			}
		},
		created() {
			this.registrForm = registrInfo;
			this.setValueForForm();
		},
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		methods: {
			input(e) {
				console.log(e)
			},
			/**
			 * 表单提交申请
			 */
			submitForm: function() {
				console.log(this.registrForm)
				//跳转到支付页面
				uni.navigateTo({
					url:'../payCost/payCost'
				})
			},
			/**
			 * 模板确定事件
			 */
			modelSubmit: function() {
				if (this.tableIndex != -1) { //修改操作
					for (var i = 0; i < this.registrForm.persona_resume.length; i++) {
						if (this.registrForm.persona_resume[i].id == this.tableIndex) {
							var person = new PereSume(this.personInfo.id, this.personInfo.time, this.personInfo.unit, this.personInfo.jobs);
							this.registrForm.persona_resume.splice(i, 1, person);
							this.hideWindow(1)
							return;
						}
					}
				}

				this.personInfo.id = this.registrForm.persona_resume.length;
				var person = new PereSume(this.personInfo.id, this.personInfo.time, this.personInfo.unit, this.personInfo.jobs);
				this.registrForm.persona_resume.push(person);
				this.hideWindow(1);

			},
			/**
			 * 模板取消事件
			 */
			modelCancel: function() {
				this.hideWindow(2);
			},
			/**
			 * 处理按钮点击事件
			 * @param {Object} index
			 */
			dealBtns: function(index) {
				if (index == 1) {
					if (this.tableIndex != -1) return uni.showToast({
						title: '当前选择不可增加',
						icon: "none"
					})
					this.showModalWindow = "showModalWindow"
				} else if (index == 2) {
					if (this.tableIndex == -1) return uni.showToast({
						title: '请选择某一列',
						icon: "none"
					})
					this.showModalWindow = "showModalWindow";
				}
			},
			/**
			 * 隐藏弹窗
			 */
			hideWindow: function(t) {
				this.showModalWindow = "";
				if (t == 1) {
					for (var key in this.personInfo) {
						if (key != 'id') this.personInfo[key] = "";
					}
					this.personInfo.id = -1;
					this.tableIndex = -1;;
				}
			},
			/**
			 * 长按处理
			 * @param {Object} e
			 */
			longPress: function(e) {
				var _self = this;
				uni.showModal({
					title: '材料删除',
					content: "是否删除当前材料",
					success(res) {
						if (res.confirm) {
							_self.registrForm.persona_resume.map((item, index) => {
								if (e.id == item.id) _self.registrForm.persona_resume.splice(index, 1);
							})
							for (var i = 0; i < _self.registrForm.persona_resume.length; i++) {
								_self.registrForm.persona_resume[i].id = i;
							}
						} else if (res.cancel) {}
					}
				})
			},
			/**
			 * table表格选中选择
			 * @param {Object} e
			 */
			handerTable: function(e) {
				if (this.tableIndex == e.id) {
					this.tableIndex = -1;
					var person = new PereSume(e.id, e.time, e.unit, e.jobs);
					this.hideWindow(1)
					this.registrForm.persona_resume.splice(person.id, 1, person);
					return;
				}
				this.tableIndex = e.id;
				this.personInfo = this.registrForm.persona_resume[this.tableIndex];
				//console.log(this.personInfo)
			},
			/**
			 * 多行文本框输入
			 * @param {Object} e
			 */
			textareaAInput: function(e) {
				switch (this.type) {
					case 3:
						this.registrForm.profession_skills[this.info.id].rules.value = e.target.value;
						break;
					case 4:
						this.registrForm.exam_bonusReasons[this.info.id].rules.value = e.target.value;
						break;
				}

			},
			/**
			 * 日期改变
			 * @param {Object} e
			 */
			DateChange: function(e) {
				//console.log(e)
				this.registrForm.basic_situation[this.info.id].rules.value = e.target.value;
			},
			/**图片删除
			 * @param {Object} e
			 */
			DelImg(e) {
				uni.showModal({
					title: '图片删除',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			/**
			 * 图片查看
			 * @param {Object} e
			 */
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
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
			/**
			 * 处理面板的收起
			 * @param {Object} item
			 */
			handleclick: function(index) {
				this.writelist[index].open = !this.writelist[index].open;
				if (this.writelist[index].open == true) {
					for (var i = 0; i < this.writelist.length; i++) {
						if (i == index) {
							this.writelist[i].open = true;
						} else {
							this.writelist[i].open = false;
						}
					}
				}
			},
			/**
			 * 处理picker
			 * @param {Object} item
			 */
			hander: function(item, type) {
				this.info = item;
				this.type = type;
			},
			/**
			 * 初始时对表单赋值
			 */
			setValueForForm: function() {
				for (var i = 0; i < this.registrForm.basic_situation.length; i++) {
					var item = this.registrForm.basic_situation[i];
					if (item.isPicker) {
						this.registrForm.basic_situation[item.id].rules.value = this.registrForm.basic_situation[item.id].pickerArray[
							item.pickerIndex];
					} else if (item.isDatePicker) {
						this.registrForm.basic_situation[item.id].rules.value = this.getCurrentTime();
					}
				}
			},
			/**
			 * 选择器选择
			 * @param {Object} e
			 */
			bindPickerChange: function(e) {
				//console.log('picker发送选择改变，携带值为', e.target.value)
				switch (this.type) {
					case 1:
						this.registrForm.basic_situation[this.info.id].pickerIndex = e.target.value;
						//对value赋值
						this.registrForm.basic_situation[this.info.id].rules.value = this.registrForm.basic_situation[this.info.id].pickerArray[
							e.target.value];
						break;
					case 3:

						break;
					case 5:
						this.registrForm.dress_size[this.info.id].pickerIndex = e.target.value;
						this.registrForm.dress_size[this.info.id].rules.value = this.registrForm.dress_size[this.info.id].pickerArray[
							e.target.value];
						break;
				}
				//console.log(this.registrForm)
			},
			/**
			 * 获取当前日期
			 */
			getCurrentTime: function() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var curTime = year + "-" + month + "-" + day;
				return curTime;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dark_green {
		background: #8DC63F;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.dark {
		background-color: #CDCDCD;
	}

	.bulletiBboard {
		.RegisTitle {
			width: 450rpx;
			margin: 20rpx auto;
			text-align: center;

			text {
				font-size: 35rpx;
				font-weight: bold;
			}
		}

		.model {
			.cu-dialog {
				.page {
					.close {
						.close_btn {
							width: 30rpx;
							margin: 10rpx 10rpx 0 0;
							margin-left: auto;
						}
					}

					.body {
						height: 75%;

						.model_fs {
							width: 100%;
							height: 100%;

							.student_add {
								position: relative;
								width: 95%;
								height: 95%;
								margin: 60rpx auto 0;
								display: flex;
								flex-direction: column;

								.item {
									width: 100%;
									display: flex;
									justify-content: space-around;
									margin: 16rpx auto;

									text {
										flex: 3;
										font-size: 28rpx;
										font-weight: bold;
										text-align: end;
										line-height: 55rpx;
										padding-right: 15rpx;
									}

									input {

										flex: 7;
										height: 55rpx;
										border: 1rpx solid #CCCCCC;
										border-radius: 10rpx;
									}

									picker {
										flex: 7;
										height: 55rpx;
										border: 1rpx solid #CCCCCC;
										border-radius: 10rpx;

										text {
											line-height: 55rpx;
										}
									}
								}

								.btns {
									width: 50%;
									position: absolute;
									bottom: 10%;
									right: 0;

									.btn_two {
										width: 100%;
										margin: 0 auto;
										display: flex;
										justify-content: space-around;

										button {
											font-size: 28rpx;
											width: 120rpx;
											height: 60rpx;
											line-height: 60rpx;
											background: #5BC0DE;
											color: #FFFFFF;
										}

										button:nth-child(2) {
											background: #F0AD4E;
										}
									}
								}
							}
						}
					}
				}
			}
		}

		.container {
			width: 100%;

			.collaose {
				.section {
					display: flex;
					justify-content: space-between;
					background-color: #fff;
					border-top: 1px solid rgba(226, 226, 226, 1);

					.box {
						display: flex;
						padding: 30rpx;
						flex: 80%;
						font-size: 32rpx;

						text {
							font-size: 40rpx;
							padding-right: 5rpx;
						}
					}

					.incon {
						margin-top: 5%;
						margin-right: 20rpx;
					}
				}


				.basic {
					width: 730rpx;
					margin: 20rpx auto 10rpx;
					border: 1rpx solid #AAAAAA;
					padding: 10rpx;
					border-radius: 10rpx;

					.basic_title {
						margin-left: 5rpx;

						text {
							font-size: 32rpx;
							font-weight: bold;
						}
					}

					.attion {
						font-size: 29rpx;
						color: #ED1C24;
						margin: 10rpx 0 15rpx 10rpx;
					}

					.form {
						display: flex;
						justify-content: space-between;
						width: 100%;

						.situation_item {
							display: inline-block;
							margin: 10rpx 0;
							margin-left: 30rpx;

							.isRequird {
								color: red;
								line-height: 50rpx;
							}

							.title {
								line-height: 50rpx;
								font-size: 30rpx;
								letter-spacing: 2rpx;
							}

							.input {
								width: 660rpx;
								height: 60rpx;
								border: 1rpx solid #333333;
								border-radius: 10rpx;
								padding-left: 20rpx;
								font-size: 31rpx;
							}

							picker {
								// height: 100rpx;
								width: 260rpx;
								border: 1rpx solid #333333;
								border-radius: 10rpx;
								font-size: 31rpx;
								text-align: center;
								height: 60rpx;

								// display: flex;
								view:nth-child(1) {
									display: inline-block;
									width: 220rpx;
									line-height: 60rpx;
								}

								view:nth-child(2) {
									display: inline-block;
									width: 40rpx;
									padding: 0 5rpx;
								}
							}

							.img_uplaod {
								// display: block;
								width: 700rpx;
								// border: 1rpx solid red;
							}

							.textarea_item {
								font-size: 30rpx;
								width: 700rpx;
							}
						}
					}

					.t_table {

						// padding-bottom: 10rpx;
						// border-bottom: 1px solid rgba(226, 226, 226, 1);
						button {
							width: 150rpx;
							background-color: #337AB7;
							color: #FFFFFF;
							height: 60rpx;
							font-size: 30rpx;
						}
					}

					.dealBtns {

						height: 10%;
						width: 550rpx;
						margin: 20rpx 0 15rpx 20rpx;
						// margin-left: 20rpx;
						display: flex;
						// justify-content: s;
						align-items: flex-start;

						// border: 1rpx solid red;
						view {
							padding: 5rpx 10rpx 0;

							text:nth-child(1) {
								line-height: 60rpx;
								color: #333333;
							}

							text:nth-child(2) {
								line-height: 60rpx;
								padding-left: 5rpx;
							}
						}

						.editor {
							text:nth-child(1) {
								font-size: 28rpx;
							}
						}

						.refresh {
							text:nth-child(1) {
								font-size: 28rpx;
							}
						}
					}
				}
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
