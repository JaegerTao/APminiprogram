import Vue from 'vue'
import App from './App'

import request from './utils/request.js'
Vue.prototype.request = request;
Vue.config.productionTip = false

import device from 'common/device.js'//设备信息
Vue.use(device)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
