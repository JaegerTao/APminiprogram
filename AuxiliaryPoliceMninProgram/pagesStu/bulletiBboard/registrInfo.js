//报名基本信息
var registrInfo = {};
//基本情况填写表单
registrInfo.basic_situation = [{
		"id": 0,
		"isRequird": true, //是否必填
		"isAutomatically": true, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true, //是否是输入框
		"class": "registr_code",
		"placeholder": "请输入报考岗位代码",
		"label": "报考岗位代码",
		"type": "text",
		"rules": {
			"name": "registr_code",
			"value": "SJ2008",
			"verify": "req|enNum0to20"
		}
	}, {
		"id": 1,
		"isRequird": true, //是否必填
		"isAutomatically": true, //是否自动生成、
		"isPicker": false, //是否为选择器
		"isInput": true,
		"class": "position_name",
		"placeholder": "请输入报考岗位名称",
		"label": "报考岗位名称",
		"type": "text",
		"rules": {
			"name": "position_name",
			"value": "交通管理辅警岗",
			"verify": "req|noEmpty"
		}
	}, {
		"id": 2,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true,
		"class": "user_name",
		"placeholder": "请输入姓名",
		"label": "姓名",
		"type": "text",
		"rules": {
			"name": "user_name",
			"value": "",
			"verify": "req|noEmpty"
		}
	}, {
		"id": 3,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickername": "sex",
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"男", "女"
		],
		"class": "sex",
		"placeholder": "请输入性别",
		"label": "性别",
		"type": "text",
		"rules": {
			"name": "sex",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 4,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickername": "nation",
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"汉族", "壮族", "回族", "满族", "维吾尔族", "苗族", "彝族", "土家族", "藏族", "蒙古族", "侗族", "布依族", "瑶族", "白族", "朝鲜族"
		],
		"class": "nation",
		"placeholder": "请输入民族",
		"label": "民族",
		"type": "text",
		"rules": {
			"name": "nation",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 5,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isDatePicker": true, //是否为日期选择器
		"pickername": "birth_date",
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"2020-10-11", "2020-10-12"
		],
		"class": "birth_date",
		"placeholder": "请输入出生日期",
		"label": "出生日期",
		"type": "text",
		"rules": {
			"name": "birth_date",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 6,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickername": "political",
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"党员", "团员", "群众"
		],
		"class": "political",
		"placeholder": "请输入政治面貌",
		"label": "政治面貌",
		"type": "text",
		"rules": {
			"name": "political",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 7,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": false, //是否是输入框
		"isImg": true, //是否为图片
		"class": "current_employer",
		"placeholder": "请输入现工作单位",
		"label": "照片上传",
		"type": "text",
		"rules": {
			"name": "current_employer",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 8,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true,
		"class": "phone",
		"placeholder": "请输入联系电话",
		"label": "联系电话",
		"type": "text",
		"rules": {
			"name": "phone",
			"value": "",
			"verify": "req|phone"
		}
	},
	{
		"id": 9,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true, //是否是输入框
		"class": "id_card",
		"placeholder": "请输入身份证号",
		"label": "身份证号",
		"type": "text",
		"rules": {
			"name": "id_card",
			"value": "",
			"verify": "req|IDCard"
		}
	}, {
		"id": 10,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickername": "driver_license",
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"A1", "A2", "A3",
			"B1", "B2",
			"C1", "C2"
		],
		"class": "driver_license",
		"placeholder": "请输入驾驶证类型",
		"label": "驾驶证类型",
		"type": "text",
		"rules": {
			"name": "driver_license",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 11,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickername": "highest_record",
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"小学", "初中", "高中", "中职", "专科", "本科", "硕士研究生", "博士研究生"
		],
		"class": "highest_record",
		"placeholder": "请输入最高学历",
		"label": "最高学历",
		"type": "text",
		"rules": {
			"name": "highest_record",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 12,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true, //是否是输入框
		"class": "graduate_school",
		"placeholder": "请输入毕业院校",
		"label": "毕业院校",
		"type": "text",
		"rules": {
			"name": "graduate_school",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 13,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true, //是否是输入框
		"class": "email",
		"placeholder": "请输入电子邮箱",
		"label": "电子邮箱",
		"type": "text",
		"rules": {
			"name": "email",
			"value": "",
			"verify": "req|email"
		}
	},
	{
		"id": 14,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"class": "emergency_contact",
		"isInput": true, //是否是输入框
		"placeholder": "请输入紧急联系人",
		"label": "紧急联系人",
		"type": "text",
		"rules": {
			"name": "emergency_contact",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 15,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true, //是否是输入框
		"class": "emergency_contactNumber",
		"placeholder": "请输入紧急联系人联系电话",
		"label": "联系电话",
		"type": "text",
		"rules": {
			"name": "emergency_contactNumber",
			"value": "",
			"verify": "req|phone"
		}
	},
	{
		"id": 16,
		"isRequird": true, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true, //是否是输入框
		"class": "home_address",
		"placeholder": "请输入家庭住址",
		"label": "家庭住址",
		"type": "text",
		"rules": {
			"name": "home_address",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
	{
		"id": 17,
		"isRequird": false, //是否必填
		"isAutomatically": false, //是否自动生成
		"isPicker": false, //是否为选择器
		"isInput": true, //是否是输入框
		"class": "current_employer",
		"placeholder": "请输入现工作单位",
		"label": "现工作单位",
		"type": "text",
		"rules": {
			"name": "current_employer",
			"value": "",
			"verify": "req|noEmpty"
		}
	},
];
//个人简历表单
registrInfo.persona_resume = [

	{
		"id": 0,
		"time":"2020-10-21 至 2020-11-21", //起止时间
		"unit":"四川师范大学",//单位
		"jobs":"在校学生",//岗位
		

	}
];
//专业技能表单
registrInfo.profession_skills = [{
	"id": 0,
	"isRequird": false, //是否必填
	"isAutomatically": true, //是否自动生成
	"isPicker": false, //是否为选择器
	"isInput": true, //是否是输入框
	"class": "skills",
	"placeholder": "请输入专业技能",
	"label": "专业技能",
	"type": "text",
	"rules": {
		"name": "skills",
		"value": "",
		"verify": "req|noEmpty"
	}
}, ];

//考试加分理由表单
registrInfo.exam_bonusReasons = [{
	"id": 0,
	"isRequird": false, //是否必填
	"isAutomatically": true, //是否自动生成
	"isPicker": false, //是否为选择器
	"isInput": true, //是否是输入框
	"class": "add_score",
	"placeholder": "请输入考试加分",
	"label": "考试加分",
	"type": "text",
	"rules": {
		"name": "add_score",
		"value": "",
		"verify": "req|noEmpty"
	}
}, ];
//服装尺码表单
registrInfo.dress_size = [{
		"id": 0,
		"isRequird": true, //是否必填
		"isAutomatically": true, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"150", "155", "160", "165", "170", "175", "180", "185", "190", "195"
		],
		"class": "height",
		"placeholder": "请输入身高",
		"label": "身高(单位:cm)",
		"type": "number",
		"rules": {
			"name": "height",
			"value": "",
			"verify": "req|naturalNumber"
		}
	}, {
		"id": 1,
		"isRequird": true, //是否必填
		"isAutomatically": true, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"40", "45", "50", "55", "60", "65", "70", "75", "80", "85"
		],
		"class": "weight",
		"placeholder": "请输入身高",
		"label": "体重(单位:kg)",
		"type": "number",
		"rules": {
			"name": "height",
			"value": "",
			"verify": "req|naturalNumber"
		}
	},
	{
		"id": 2,
		"isRequird": true, //是否必填
		"isAutomatically": true, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"30", "35", "40", "45", "50", "55", "60", "65", "70", "75"
		],
		"class": "head_circumference",
		"placeholder": "请输入头围",
		"label": "头围(单位:cm)",
		"type": "number",
		"rules": {
			"name": "head_circumference",
			"value": "",
			"verify": "req|naturalNumber"
		}
	}, {
		"id": 3,
		"isRequird": true, //是否必填
		"isAutomatically": true, //是否自动生成
		"isPicker": true, //是否为选择器
		"pickerIndex": 0, //picker选择器当前选择
		"pickerArray": [
			"35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"
		],
		"class": "height",
		"placeholder": "请输入鞋码",
		"label": "鞋码(单位:码数)",
		"type": "number",
		"rules": {
			"name": "height",
			"value": "",
			"verify": "req|naturalNumber"
		}
	},
];
export default registrInfo;
