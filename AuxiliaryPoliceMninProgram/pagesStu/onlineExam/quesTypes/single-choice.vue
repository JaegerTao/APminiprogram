<template>
	<!-- 单选题、判断题、综合单选题 -->
	<view>
		<!-- 题目 -->
		<view class="text-lg">
			<text class="cu-btn bg-blue round light text-sm">{{ typeTxt }}</text>
			<text>{{" " +  testdata.QuestionOrder }}.</text>
			<text>{{ testdata.Question }}</text>
			<!-- 综合题副题目 -->
			<view class="margin-top" v-if="testdata.QTypeID=='Z'">
				<text>{{ testdata.SubOrder }}.</text>
				<text>{{ testdata.SubQuestion }}</text>
			</view>
		</view>
		<!-- 选项 -->
		<view class="margin-top text-lg">
			<!-- 单选、综合单选 -->
			<block v-if="testdata.QTypeID=='D'||testdata.QTypeID=='Z'">
				<radio-group name="DZ" @change="radioChange">
					<view class="margin-top align-center">
						<radio value="A" :checked="0 === current" :disabled="isShowParse"></radio>
						<text class="margin-left">A.{{testdata.QText1}}</text>
					</view>
					<view class="margin-top align-center">
						<radio value="B" :checked="1 === current" :disabled="isShowParse"></radio>
						<text class="margin-left">B.{{testdata.QText2}}</text>
					</view>
					<view class="margin-top align-center">
						<radio value="C" :checked="2 === current" :disabled="isShowParse"></radio>
						<text class="margin-left">C.{{testdata.QText3}}</text>
					</view>
					<view class="margin-top align-center">
						<radio value="D" :checked="3 === current" :disabled="isShowParse"></radio>
						<text class="margin-left">D.{{testdata.QText4}}</text>
					</view>
				</radio-group>
			</block>
			<!-- 判断 -->
			<block v-if="testdata.QTypeID=='P'">
				<radio-group name="P" @change="radioChangeP">
					<view class="margin-top align-center">
						<radio value="T" :checked="0 === current" :disabled="isShowParse"></radio>
						<text class="margin-left margin-right cuIcon-check"></text>正确(T)
					</view>
					<view class="margin-top align-center">
						<radio value="F" :checked="1 === current" :disabled="isShowParse"></radio>
						<text class="margin-left margin-right cuIcon-close"></text>错误(F)
					</view>
				</radio-group>
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
	export default {
		data() {
			return {
				optSerial: ['A', 'B', 'C', 'D'],
				judgeSerial: ['T', 'F'], //T / F
				current: 4,//默认为4，即重置
				// testdata:{"AddNo":null,"uIsDone":null,"AnsParsing":"dd","uIsTrue":null,"QTypeID":"D","QText4":"主观性","uAnsText":" ","QText3":"普遍性","Score":"2.0","QText2":"客观性","QText1":"特殊性","AnsText":"C","Question":"道德具有鲜明的阶级性、社会共同性和（）。","uScore":null,"QuestionOrder":"1"},
				// testdata:{"AddNo":null,"uAnsText":" ","uIsDone":null,"Score":"5.0","AnsParsing":"一般情况下,从业人员的着装要求是朴素大方。","AnsText":"T","Question":"一般情况下,从业人员的着装要求是注重品牌。","uIsTrue":null,"uScore":null,"QTypeID":"P","QuestionOrder":"1"},
				// testdata:{"Addno":"510","uIsDone":null,"SubQuestion":"收受名片时，以下做法欠妥当的是（  ）。","AnsParsing":null,"SubScore":"2.0","Mid":"81","SubOrder":"1","uIsTrue":null,"QTypeID":"Z","TestID":"12","QText4":"既不可用手揉搓名片表面，\n也不可把对方名片当做记事簿","uAnsText":null,"Score":"8.0","QText3":"把名片放在抽屉里保管","QText2":"认真看过名片，轻轻念完其姓名、职位","QText1":"接待人员应恭敬地双手接受","AnsText":"C","Question":"日常事务接待是指对平时来机关单位办理各种具体业务、事务的各类人员的接待工作。\n这种接待时间短，务实性强，看似平常琐碎，但处理不好就有可能会影响单位的声誉和形象，这就要求有关人员必须了解和掌握日常接待的一般内容和环节。阅读以上材料，回答1-4题：","QuestionOrder":"1","uSubScore":null},
				isShowParse: false,//是否显示解析
			}
		},
		props: {
			prtmode:{//练习模式
				type: Boolean,
				default: true
			},
			parsemode:{//是否为解析模式
				type: Boolean,
				default: false
			},
			testdata: null, //题数据
		},
		computed: {
			typeTxt() {
				if (this.testdata.QTypeID == 'D') {
					return '单选题'
				} else if (this.testdata.QTypeID == 'P') {
					return '判断题'
				} else if (this.testdata.QTypeID == 'Z') {
					return '综合题'
				}
			}
		},
		watch:{
			testdata(){//重置选项
				this.current = 4
				this.isShowParse = false
			}
		},
		methods: {
			radioChange(evt) {//单选
				console.log(evt)
				for (let i = 0; i < this.optSerial.length; i++) {
					if (this.optSerial[i] === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			radioChangeP(evt){//判断
				console.log(evt)
				for(let i = 0; i < this.judgeSerial.length; i++){
					if (this.judgeSerial[i] === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			showParse(){//显示解析
				this.isShowParse = true
			}
		}
	}
</script>

<style lang="less" scoped>
	radio-group {
		view {
			display: flex;
		}
	}
</style>
