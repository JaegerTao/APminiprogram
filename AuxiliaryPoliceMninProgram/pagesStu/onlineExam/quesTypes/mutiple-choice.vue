<template>
	<!-- 多选题 -->
	<view>
		<!-- 题目 -->
		<view class="text-lg">
			<text class="cu-btn bg-orange round light text-sm">多选题</text>
			<text>{{" " + testdata.QuestionOrder }}.</text>
			<text>{{ testdata.Question }}</text>
		</view>
		<!-- 选项 -->
		<view class="margin-top text-lg">
			<block v-if="testdata.QTypeID=='F'">
				<checkbox-group @change="checkboxChange">
					<!-- <view class="margin-top align-center" v-for="(letter,index) in optSerial" :key="index">
						<block v-if="testdata[`QText5`]==null">
							<checkbox :value="letter" :disabled="isShowParse"></checkbox>
							<text class="margin-left">{{letter}}.{{testdata['QText1']}}</text>
						</block>
					</view> -->
					<view class="margin-top align-center">
						<checkbox value="A" :checked="contains('A')" :disabled="isShowParse"></checkbox>
						<text class="margin-left">A.{{testdata.QText1}}</text>
					</view>
					<view class="margin-top align-center">
						<checkbox value="B" :checked="contains('B')" :disabled="isShowParse"></checkbox>
						<text class="margin-left">B.{{testdata.QText2}}</text>
					</view>
					<view class="margin-top align-center">
						<checkbox value="C" :checked="contains('C')" :disabled="isShowParse"></checkbox>
						<text class="margin-left">C.{{testdata.QText3}}</text>
					</view>
					<view class="margin-top align-center">
						<checkbox value="D" :checked="contains('D')" :disabled="isShowParse"></checkbox>
						<text class="margin-left">D.{{testdata.QText4}}</text>
					</view>
					<view class="margin-top align-center" v-if="testdata.QText5!=null">
						<checkbox value="E" :checked="contains('E')" :disabled="isShowParse"></checkbox>
						<text class="margin-left">E.{{testdata.QText5}}</text>
					</view>
				</checkbox-group>
			</block>
		</view>
		<!-- 练习模式可查看解析 -->
		<block v-if="prtmode">
			<view v-if="!isShowParse" class="text-center margin-top">
				<button @click="showParse" class="cu-btn bg-orange text-lg text-bold shadow-blur">确 认</button>
			</view>
			<!-- 解析 -->
			<view v-if="isShowParse" class="margin-top text-lg">
				<view class="flex">
					<view>正确答案:{{ testdata.AnsText }}</view>
				</view>
				<view class="margin-top flex">
					<view class="flex-sub text-bold">解析:</view>
					<view class="flex-fourth">
						{{ testdata.AnsParsing?testdata.AnsParsing:"无" }}
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				optSerial:['A','B','C','D','E'],
				curAns:"",//当前已选
				// testdata:{"AddNo":null,"uIsDone":null,"AnsParsing":"aa","uIsTrue":null,"QTypeID":"F","QText5":null,"QText4":"外出用餐时，尽量不使用一次性筷子","uAnsText":" ","QText3":"在自然光能够满足照明需要的情况下，关闭室内照明灯","Score":"3.0","QText2":"信奉\u201c师徒如父子\u201d的观念，一切按照师傅的要求做事","QText1":"根据实际，从业人员每日适当减少食物的摄入量","AnsText":"BCD  ","Question":"建设节约型社会，要求（）。","uScore":null,"QuestionOrder":"1"},
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
			testdata:null //题数据
		},
		watch:{
			testdata(){//重置选项
				this.isShowParse = false
				this.curAns = ""
			}
		},
		computed:{
			contains(){
				return function(letter){
					if(this.curAns.indexOf(letter)!= -1){
						return true
					}
					return false
				}
			}
		},
		methods:{
			checkboxChange(evt){
				console.log(evt)
				this.curAns = ""//重置当前答案
				for(let i = 0; i < 5; i++){
					for(let j = 0; j < evt.detail.value.length; j++){
						if(this.optSerial[i] == evt.detail.value[j]){
							this.curAns += this.optSerial[i]
						}
					}
				}
			},
			showParse(){//确认答案，显示解析
				this.testdata.uAnsText = this.curAns//记录用户答案
				if(!this.prtmode) return //非练习模式则不显示解析
				this.isShowParse = true
			}
		}
	}
</script>

<style lang="less" scoped>
	checkbox-group{
		view{
			display: flex;
		}
	}
</style>
