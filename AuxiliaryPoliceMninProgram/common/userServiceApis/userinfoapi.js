import Vue from 'vue'
let vm = new Vue()
//获取基本信息
async function getBasicInfo(){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: vm.$baseURL + '/stuinfo/StuTable/getBasicInfo',
			method:'POST',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN
			},
			success: (res) => {
				console.log(res)
				if(res.statusCode == 200){
					resolve(res.data.data)
				}else{
					reject(null)
				}
			},
			fail: (err) => {
				console.log(err)
				reject(null)
			}
		})
	})
}
//获取选项gType: currentTerm-当前学期, termName-学期列表
async function GetOptions(gType){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: vm.$baseURL + '/info/GetOptions?gType='+ gType,
			header:{
				'Content-Type': vm.$contentType,
				'X-SESSION-TOKEN': vm.$store.state.STOKEN
			},
			success: (res) => {
				if(res.statusCode == 200){
					resolve(res.data)
				}else{
					reject(null)
				}
			},
			fail: (err) => {
				console.log(err)
				reject(null)
			}
		})
	})
}
//获取成绩单
async function searchGrade(termCode){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: vm.$baseURL + '/school/person/funcPubStudent/SearchInfo/searchGrade',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN
			},
			data:{
				termCode: termCode,
				StuNo: '2019110401', //测试学号  后期替换：vm.$store.state.YLoginId,
				_search: false,
				nd:'',
				rows: 500,
				page: 1,
				sidx: '',
				sord: 'desc'
			},
			success: (res) => {
				if(res.statusCode == 200){
					resolve(res.data)
				}else{
					reject(null)
				}
			},
			fail: (err) => {
				console.log(err)
				reject(null)
			}
		})
	})
}
//获取活动
async function getActApplyInfo(termCode){
	return new Promise((resolve, reject)=>{
		uni.request({
			url: vm.$baseURL + '/stuRecord/funcStuApplyed/getActApplyInfo',
			header:{
				'X-SESSION-TOKEN': vm.$store.state.STOKEN
			},
			data:{
				termCode: termCode,
				StuNo: vm.$store.state.YLoginId,
				_search: false,
				nd:'',
				rows: 500,
				page: 1,
				sidx: '',
				sord: 'desc'
			},
			success: (res) => {
				if(res.statusCode == 200){
					resolve(res.data)
				}else{
					reject(null)
				}
			},
			fail: (err) => {
				console.log(err)
				reject(null)
			}
		})
	})
}

let userinfoapi = {
	getBasicInfo: getBasicInfo,
	GetOptions: GetOptions,
	searchGrade: searchGrade,
	getActApplyInfo: getActApplyInfo
}

module.exports = userinfoapi