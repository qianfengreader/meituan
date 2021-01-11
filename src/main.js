// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);

router.afterEach((to,from,next)=>{/*每次刷新页面 滚轮置于顶端*/
  window.scrollTo(0,0)
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
