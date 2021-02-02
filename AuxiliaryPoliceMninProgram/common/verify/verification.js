
 import Vregular  from "./Vregular.js"; //正则验证
 // import { Toast } from 'vant';
var Vrules={
	phone:{pattern: Vregular.phone, errMess: '请输入正确的手机号码'},
	number:{pattern: Vregular.numberType, errMess: '请输入正确的数字'},
	telephone: {pattern: Vregular.telephone, errMess: "请输入正确的座机号码",},
	email: {pattern: Vregular.email, errMess: '请输入正确的邮箱'},
	idcard:  {pattern: Vregular.IDCard, errMess: '请输入正确的证件号码'},
	bankCard: {pattern: Vregular.bankCard, errMess: '请输入正确的银行卡号码'},
	qq: {pattern: Vregular.qq, errMess: '请输入正确的qq号码'},
	num6:{pattern: Vregular.num6, errMess: '请输入正确的6位数字'},
	AlipayAccount:{pattern: Vregular.AlipayAccount, errMess: '请输入正确的支付宝账号'},
	realName:{pattern: Vregular.realName, errMess: '请输入正确的真实姓名'},
	userName:{pattern: Vregular.userName, errMess: '请输入正确的用户名'},
	URL:{pattern: Vregular.URL, errMess: '请输入正确的url'},
	positiveInteger:{pattern: Vregular.positiveInteger, errMess: '请输入正确的正整数'},
	english:{pattern: Vregular.english, errMess: '请输入正确的英文字母'},
	idNumber:{pattern: Vregular.IDNumber, errMess: '请输入正确的证件号'},
	req:{pattern: Vregular.noEmpty, errMess: '必填项'},
	same:{pattern:"",errMess: '两次输入不一致'},
	pwd:{pattern:Vregular.pwd,errMess: '密码格式不正确'},
	pwd6to20:{pattern:Vregular.char6to20, errMess: '密码格式不正确'},
	enNum4:{pattern: Vregular.enNum4, errMess: '请输入4位英文数字'},
}
// 去掉首尾空格
// function Vtrim(str) {
//     return str.replace(/(^\s*)|(\s*$)/g, "");
// }
var  verification={};

verification.install=function(Vue){
	Vue.prototype.$vervify =function(option){
		/*必传项
		option.formDate={			
			label:"身份证号", //传option.otherPra.reqEmptyVal=true时，label必传，反之不传或者为false时label可不传					
			rules:{				
				value:"",
				verify:"req|idcard", //"req|idcard" req为必填项（文本框是否为必填项） || "idcard" 不传req 如果文本框有内容就进行idcard规则验证，无内容则不验证
				errMess:"请输入身份证号"  //非必传，不传用规则定义的默认提示
			}															
		},
		// 非必传项
		option.otherPra={
			reqEmptyVal:true, 	
		}
		
		*/
		// 不传默认参数
		/*otherDefault.reqEmptyVal=true 必填项为空是先提示请输入**** ,默认false 直接判断是否符合规则，
		不符合规则直接弹用户指定的错误，
		*/
		var otherDefault={
			reqEmptyVal:false,
		 
		 }
		var otherPra=Object.assign({},otherDefault,option.otherPra) //合并对象
		var result=0;
		var flag=true;
		for(var m=0;m<option.formDate.length;m++){
			var regular=option.formDate[m].rules.verify.split("|");			
			for(var i=0;i<regular.length;i++){
				if(Vrules[regular[i]]){							
					var _default=Object.assign({},Vrules[regular[i]],option.formDate[m].rules) //合并对象
						if(regular[i]=="req"){
							// 必填项未填写内容提示
							if(otherPra.reqEmptyVal){
								var emptyMessage="请输入"+option.formDate[m].label;
								if(_default.value.length==0){
									uni.showToast({
									    title:emptyMessage,
									    duration: 2000,
										icon:"none"
									});
									flag=false;
								}else{
									regularVer()
								}
							}else{
								regularVer()
							}																					
						}else if(regular[i]=="same"){//确认输入框需要配置在被确认的下面
							if(m>0){
								if(option.formDate[m-1].rules.value!=_default.value){
									uni.showToast({
									    title: _default.errMess,
									    duration: 2000,
										icon:"none"
									});
									flag=false;
								}
							}else{
								uni.showToast({
								    title: "表单配置不正确，请检查被确认输入框的位置",
								    duration: 2000,
									icon:"none"
								});
								flag=false;
							}
							
						}else{
							if(_default.value.length>0){
								regularVer()
							}
						}						
					function regularVer(){
						if(!_default.pattern.test( _default.value)){
							uni.showToast({
							    title: _default.errMess,
							    duration: 2000,
								icon:"none"
							});											
							flag=false;
						}else{
							flag=true;
						}
					}
					if(!flag){
						return flag
					}									
			 	}		   
			 }						
		}		
		return flag;
	},
	// 提交序列化的表单
	Vue.prototype.$submitForm =function(option){
		var submitData={};
		for(var i=0;i<option.length;i++){
			submitData[option[i].rules.name]=option[i].rules.value;
		}
		return submitData;
	}
}
export default verification
