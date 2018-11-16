import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../src/pages/Chat'
import Login from '../src/pages/Login'
import auth from 'firebase/auth'
import channels  from '../src/otherthings/channels'
import users from '../src/otherthings/users'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat,
      beforeEnter:(to, from, next) => {
        if( !firebase.auth().currentUser){
          next('/login')
        } else {
          next()
        }
      },
      children: [
        {
          path: 'channels',
          name: 'channel',
          component: channels
        },
        {
          path: 'users',
          name: 'user',
          component: users
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
