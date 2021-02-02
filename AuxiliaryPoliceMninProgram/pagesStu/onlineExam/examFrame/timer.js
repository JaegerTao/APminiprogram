let Timer = function(millisecond) {//接收毫秒
	// this.minute = minute
	// this.hour = minute/60
	// this.second = minute * 60
	this.millisecond = millisecond
	
	this.leftms = millisecond //剩余毫秒

	this.leftS = 0 //显示秒 00:00格式
	this.leftM = millisecond / 1000 / 60 //显示分钟 00:00格式
	
	this.isTimeOut = false
	
	let speed = 1000 //单位时间 1000ms
	this.pInterval = null
	this.start = function(){//开始计时
		console.log('start')
		this.pInterval = setInterval((res) => {
			if (this.leftms >= 0) { //时间未走完
				this.leftms -= speed
				this.leftM = parseInt(this.leftms / 1000 / 60)
				this.leftS = parseInt(this.leftms / 1000 % 60)
			}else{
				clearInterval(this.pInterval)
				this.isTimeOut = true
			}
		}, 1000)
	}
	this.pause = function() {
		clearInterval(this.pInterval)
	}
}

module.exports = Timer
