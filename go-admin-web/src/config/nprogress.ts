import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

NProgress.configure({
    easing: 'ease', //动画的方式
    speed: 500, //进度条的速度
    showSpinner: true, //是否加载Icon
    trickleSpeed: 200,  //自动递增间隔
    minimum: 0.3, //初始化时的最小百分比
})

export default NProgress