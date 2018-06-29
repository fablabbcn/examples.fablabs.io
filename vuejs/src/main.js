import Vue from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import axios from 'axios'
import Vuex from 'vuex'
import store_config from './store'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

const store = new Vuex.Store( store_config )

router.beforeEach((to, from, next) => {
  if (to.query.access_token){
    store.dispatch('setToken', {token: to.query.access_token, created_at: to.query.created_at})
    return next('/')
  }
  next()
})



new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})