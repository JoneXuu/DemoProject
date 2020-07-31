import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 注册vue-router
import store from '@/common/vuex.js' //全局仓储
import Global from '@/common/global.js' //全局封装方法
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

const router = new VueRouter({
  mode: 'history',
  base: '/Web/',
  routes: [{
      path: '/',
      name: 'Login',
      meta: {title: '登录'},//requireAuth: false
      component: (resolve) => require(['@/pages/Login.vue'], resolve),
    },{
      path: '/Home',
      name: 'Home',
      component: (resolve) => require(['@/pages/Home.vue'], resolve),
      children: [
        {path: '/',name: 'HomeDefault',meta: {title: '首页',keepAlive: true},component: (resolve) => require(['@/pages/Admin/HomeDefault.vue'], resolve),},
        {path: '/Module1',name: 'Module1',meta: {title: '模块1',keepAlive: true},component: (resolve) => require(['@/pages/Admin/ModuleOne.vue'], resolve),},
        {path: '/Module2',name: 'Module2',meta: {title: '模块2',keepAlive: true},component: (resolve) => require(['@/pages/Admin/ModuleTwo.vue'], resolve),},
        {path: '/ExamplePage',name: 'ExamplePage',meta: {title: '实例页面',keepAlive: true},component: (resolve) => require(['@/pages/Admin/ExamplePage.vue'], resolve),},
        {path: '/UserManage',name: 'UserManage',meta: {title: '用户管理',keepAlive: true},component: (resolve) => require(['@/pages/Admin/UserManage.vue'], resolve),},
      ]
  }]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.name=='Login')  {
    next()
  }else if (to.meta.title) {
    document.title=to.meta.title;
    store.commit('pageJump', to)
    next()
  }else {
    //通知一下
    console.error('stop to errorPage')
    Global.toast('页面路径无效')
  }
});


export default router
