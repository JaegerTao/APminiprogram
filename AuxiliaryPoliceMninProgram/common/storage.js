// 小程序缓存封装失效时间

let expire = 24*3600*1000
function transValue(data, time, expire){
	let value = {
		data: data,
		time: time,
		expire: expire
	}
	return JSON.stringify(value)
}

//设置缓存并设置缓存时间
function setStorageExpire(key, value){
	var seconds = parseInt(expire)
	if(seconds > 0){
		var timestamp = Date.parse(new Date());
		uni.setStorageSync(key, transValue(value, timestamp, expire))
	}
}

//获取缓存，若已过期则返回null
function getStorageExpire(key){
	let value = uni.getStorageSync(key)
	let data = null
	if(value){
		let valueJson = JSON.parse(value)
		let deadtime =  valueJson.time / 1000 + parseInt(expire);
		if(deadtime < Date.parse(new Date()) / 1000){
			uni.removeStorageSync(key)
			console.log('缓存已过期')
			return null
		}
		return valueJson.data
	}else 
		return null
}

//删除指定缓存
function removeStorageExpire(key){
	uni.removeStorageSync(key)
}

//清除所有缓存
function clearExpire(){
	uni.clearStorageSync()
}

let storageEx = {
	setStorageExpire,
	getStorageExpire,
	removeStorageExpire,
	clearExpire
}

module.exports = storageEx