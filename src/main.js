import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import auth from 'firebase/auth'
import database from 'firebase/database'
import Chat from '../src/pages/Chat'
import Login from '../src/pages/Login'
import channels  from '../src/otherthings/channels'
import users from '../src/otherthings/users'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)


Vue.config.productionTip = false



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCC0fj30equkAL7VS18UXLginvRUAfjJxM",
    authDomain: "vue-slack-8e44f.firebaseapp.com",
    databaseURL: "https://vue-slack-8e44f.firebaseio.com",
    projectId: "vue-slack-8e44f",
    storageBucket: "vue-slack-8e44f.appspot.com",
    messagingSenderId: "1088943861813"
  };
  firebase.initializeApp(config);

  window.firebase = firebase;

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
store.dispatch('setUser', user)

new Vue({
  
  router,
  store,
  render: h => h(App)
  
}).$mount('#app')

unsubscribe()

})

const scrollToBottom = el => {
  el.scrollTop = el.scrollHeight
}

const vChatScroll = {
  bind: (el, binding) => {
      let timeout
      let scrolled = false

      el.addEventListener('scroll', e => {
          if (timeout) window.clearTimeout(timeout)
          timeout = window.setTimeout(function() {
              scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight
          }, 200)
      });

      (new MutationObserver(e => {
          let config = binding.value || {}
          let pause = config.always === false && scrolled
          if (pause || e[e.length - 1].addedNodes.length !== 1) return
          scrollToBottom(el)
      })).observe(el, {childList: true})
  },
  inserted: scrollToBottom
}

Vue.directive('chat-scroll', vChatScroll)

