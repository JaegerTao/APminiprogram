<template>
	<!-- 简答题/填空题 -->
	<view>
		<!-- 题目 -->
		<view class="text-lg">
			<text class="cu-btn bg-green round light text-sm">简答/填空</text>
			<text>{{ testdata.QuestionOrder }}.</text>
			<text>{{ testdata.Question }}</text>
		</view>
		<!-- 答题框 -->
		<view class="margin-top text-lg">
			<view class="text-bold">答题框:</view>
			<view class="TextArea border solid margin padding">
				<textarea v-model="curAns" placeholder="在此输入您的答案" maxlength="300" :disabled="isShowParse" />
			</view>
		</view>
		<!-- 练习模式可查看解析 -->
		<block v-if="prtmode">
			<view v-if="!isShowParse" class="text-center margin-top">
				<button @click="showParse" class="cu-btn bg-orange text-lg text-bold shadow-blur">确 认</button>
			</view>
			<!-- 解析 -->
			<view v-if="isShowParse" class="margin-top text-lg">
				<view class="flex">
					<view class="flex-sub text-bold">答案:</view>
					<view class="flex-fourth">{{ testdata.AnsText }}</view>
				</view>
				<view class="margin-top flex">
					<view class="flex-sub text-bold">解析:</view>
					<view class="flex-fourth">
						{{ testdata.AnsParsing?testdata.AnsParsing:"无" }}
					</view>
				</view>
			</view>
		</block>
		<!-- 考试模式保存按钮 -->
		<block v-if="!prtmode">
			<view v-if="!isShowParse" class="text-center margin-top">
				<button @click="showParse" class="cu-btn bg-orange text-lg text-bold shadow-blur">保 存</button>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// testdata:{"AddNo":null,"uAnsText":null,"uIsDone":null,"Score":"10.0","AnsParsing":"xx","AnsText":"道德具有鲜明的阶级性、社会共同性和（）。","Question":"道德具有鲜明的阶级性、社会共同性和（）。","uIsTrue":null,"uScore":null,"QTypeID":"J","QuestionOrder":"1"},
				curAns: "",//当前答案
				isShowParse: false,//是否显示解析
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
			testdata:null,
		},
		watch:{
			testdata(){
				this.isShowParse = false
				this.curAns = ""
			}
		},
		methods:{
			showParse(){//确认答案，显示解析
				this.testdata.uAnsText = this.curAns//记录用户答案
				if(!this.prtmode) return //非练习模式则不显示解析
				this.isShowParse = true
			}
		}
	}
</script>

<style scoped>
	.TextArea{
		border-radius: 10rpx;
	}
</style>
