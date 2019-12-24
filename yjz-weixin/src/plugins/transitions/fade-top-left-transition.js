import { addClass, removeClass } from "@/utils/dom"

/* 
    下拉动画

*/
var transition = {

    beforeEnter(el) {
        // ...

        el.style.opacity = 1;
        // el.style.width = '0';
        // el.style.transformOrigin = 'right';
        el.style.right = '-1000px';

    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter(el, done) {

        Velocity(el, { right: 0 }, { duration: 500 })
        Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    afterEnter(el) {
        
    },
    enterCancelled(el) {

        // ...
    },
    // --------
    // 离开时
    // --------
    beforeLeave(el) {

        // ...
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    leave(el, done) {
        Velocity(el, { right: '-1000px' }, { duration: 500 });
        Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    afterLeave(el) {
        
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled(el) {

        // ...
    },
}


export default {
    name: "oaFadeTopLeftTransition",
    functional: true,

    render(h, { children }) {
        var data = {
            on: transition
        }
        return h('transition', data, children)
    }
}