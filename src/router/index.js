import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import menu from '@/components/manager/menu'
import menu_brand from '@/components/manager/menu_brand'
import add_brand from '@/components/manager/add_brand'
import menu_stores from '@/components/manager/menu_stores'
import menu_director from '@/components/manager/menu_director'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/menu',
      name: 'menu',
      component: menu,
      children:[{
        name:'menu_brand',
        path:'menu_brand',
        component:menu_brand
      },{
        name:'menu_stores',
        path:'menu_stores',
        component:menu_stores
      },{
        name:'add_brand',
        path:'add_brand',
        component:add_brand
      },{
        name:'menu_director',
        path:'menu_director',
        component:menu_director
      }

      ],

    },
  ]
})
