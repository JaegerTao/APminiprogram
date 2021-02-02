<template>
	<!-- 答题卡 -->
	<view class="AnswerSheet">
		<view class="Bg cu-bar bg-blue light solid-bottom shadow">
			<view v-if="prtmode" class="content">
				<text class="cuIcon-ellipse text-blue">未做 {{" "}}</text>
				<text class="cuIcon-ellipse text-green">正确 {{" "}}</text>
				<text class="cuIcon-ellipse text-red">{{" "}}错误 </text>
			</view>
			<view v-if="!prtmode" class="content">
				<text class="cuIcon-ellipse text-blue">未做{{" "}} </text>
				<text class="cuIcon-ellipse text-green">已做{{" "}} </text>
			</view>
		</view>
		<scroll-view scroll-y="true">
			<view class="margin-top text-left">
				<view class="margin-left text-bold" v-for="(type,index) in typeOrder" :key="index">
					<view v-if="type == 'D'" class="">单选题</view>
					<view v-if="type == 'F'" class="">多选题</view>
					<view v-if="type == 'P'" class="">判断题</view>
					<view v-if="type == 'J'" class="">简答/填空</view>
					<view v-if="type == 'Z'" class="">综合单选题</view>
					<block v-if="type == 'D'">
						<block v-for="(item,index) in typeD" :key="index">
							<button @click="ansTap(item)" class="cu-btn round" :class="item.uIsTrue!=null?(item.uIsTrue==1?'bg-green':((item.uIsTrue==0&&prtmode)?'bg-red':'bg-green')):'bg-blue'">
								{{item.QuestionOrder}}
							</button>
						</block>
					</block>
					<block v-if="type == 'F'">
						<block v-for="(item,index) in typeF" :key="index">
							<button @click="ansTap(item)" class="cu-btn round" :class="item.uIsTrue!=null?(item.uIsTrue==0?'bg-red':(item.uIsTrue==1?'bg-green':'bg-white')):'bg-blue'">
								{{item.QuestionOrder}}
							</button>
						</block>
					</block>
					<block v-if="type == 'P'">
						<block v-for="(item,index) in typeP" :key="index">
							<button @click="ansTap(item)" class="cu-btn round" :class="item.uIsTrue!=null?(item.uIsTrue==0?'bg-red':(item.uIsTrue==1?'bg-green':'bg-white')):'bg-blue'">
								{{item.QuestionOrder}}
							</button>
						</block>
					</block>
					<block v-if="type == 'J'">
						<block v-for="(item,index) in typeJ" :key="index">
							<button @click="ansTap(item)" class="cu-btn round" :class="item.uIsTrue!=null?(item.uIsTrue==0?'bg-red':(item.uIsTrue==1?'bg-green':'bg-white')):'bg-blue'">
								{{item.QuestionOrder}}
							</button>
						</block>
					</block>
					<block v-if="type == 'Z'">
						<block v-for="(item,index) in typeZ" :key="index">
							<button @click="ansTap(item)" class="cu-btn round" :class="item.uIsTrue!=null?(item.uIsTrue==0?'bg-red':(item.uIsTrue==1?'bg-green':'bg-white')):'bg-blue'">
								{{item.QuestionOrder}}
							</button>
						</block>
					</block>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeD: [],
				typeF: [],
				typeP: [],
				typeJ: [],
				typeZ: [],
				typeOrder: [],
			}
		},
		props:{
			prtmode:{//练习模式
				type: Boolean,
				default: true
			},
			parsemode:{//是否为解析模式
				type: Boolean,
				default: false
			},
			ansdata:[],//题序数组
		},
		mounted() {
			this.analyse()
		},
		watch:{
			
		},
		methods: {
			analyse() { //题型分类
				let type = ""
				if(!this.ansdata) return
				for (let ans of this.ansdata) {
					switch (ans.QTypeID) {
						case "D":
							this.typeD.push(ans)
							break
						case "F":
							this.typeF.push(ans)
							break
						case "P":
							this.typeP.push(ans)
							break
						case "J":
							this.typeJ.push(ans)
							break
						case "Z":
							this.typeZ.push(ans)
							break
						default:
							break
					}
					if (type === "" || type != ans.QTypeID) {
						this.typeOrder.push(ans.QTypeID)
					}
					type = ans.QTypeID
				}
				console.log(this.typeOrder)
			},
			ansTap(quesOdr){//点击答题卡,传值给页面
				// console.log(quesOdr)
				this.$emit('ansTap',quesOdr)
			}
		}
	}
</script>

<style lang="less" scoped>
	.AnswerSheet {
		.Bg{
			background-color: rgba(177, 175, 191, 0.5);
		}
		scroll-view {
			height: 700rpx;
		}

		button {
			margin: 20rpx 20rpx;
			width: 65rpx;
			height: 65rpx;
		}
	}
</style>
