<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onAppHide: function() {
			console.log('hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./colorui/main.css");
	@import url("./colorui/icon.css");
	@import url("./wxcomponents/vant-weapp/common/index.wxss");

	page {
		background-color: #FFFFFF;
		height: 100%;
	}
</style>
