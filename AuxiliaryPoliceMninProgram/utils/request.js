const BASE_URL = 'http://123.56.26.75:8000';
//const BASE_URL = 'http://www.qycome.cn';
var request = function(params) {
	//加载中
	uni.showLoading({
		title: "加载中...",
	});
	params.url = BASE_URL + params.url;
	var data = params.data;
	console.log(data)
	if (params.method == 'get' || params.method == 'GET') { //get方法请求时
		return new Promise((resolve, reject) => {
			uni.request({
				url: params.url,
				method: 'GET',
				data: {
					...data,
				},
				header: {
					'Authorization': params.token, //指定token
				},
				success(res) {
					resolve(res.data);
				},
				fail(res) {
					reject(res);
				},
				complete() {
					uni.hideLoading();
				}
			})
		})
	} else if (params.method == 'post' || params.method == 'POST') {
		var content_type = postApplaction(params.contentType);
		return new Promise((resolve, reject) => {
			uni.request({
				url: params.url,
				method: 'POST',
				data: {
					...data,
				},
				header: {
					'Authorization': params.token, //指定token
					'content-type': content_type,
				},
				success(res) {
					resolve(res.data);
				},
				fail(res) {
					reject(res);
				},
				complete() {
					uni.hideLoading();
				}
			})
		})
	}


	//get方法不需要指定Content-type
	//post方法：JSON 
	/*
		header: {
			'content-type':'application/json',
		},
	*/

	//post方法：非json
	/*
		header: {
			'content-type':'application/x-www-form-urlencoded',
		},
	*/
}
var postApplaction = function(contentType) {
	if (contentType == 'json') {
		return 'application/json';
	} else if (contentType == 'form') {
		return 'application/x-www-form-urlencoded'
	}
	return 'application/x-www-form-urlencoded';
}
export default request;
