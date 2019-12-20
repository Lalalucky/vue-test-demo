import Vue from 'vue';

let timerForDelay;
let _old = "" ;
let _new = "" ;
let timeOut = 1000;
Vue.directive('delayRes', {
	bind() {
		// 当指令绑定到 HTML 元素上时触发.**只调用一次**
	},
	inserted() {
		// 当绑定了指令的这个HTML元素插入到父元素上时触发(在这里父元素是 `div#app`)**.但不保证,父元素已经插入了 DOM 文档.**
		console.log('inserted triggerd');
	},
	updated() {
		// 所在组件的`VNode`更新时调用.
		console.log('updated triggerd');
	},
	componentUpdated(ipt) {
		// 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    console.log(ipt.value);
    _old = ipt.value ;
		timerForDelay = setTimeout(() => {

    }, timeOut);
	},
	unbind() {
		// 只调用一次，指令与元素解绑时调用.
		console.log('unbind triggerd');
	}
});
