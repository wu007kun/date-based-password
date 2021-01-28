import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import createComp from './lib/index.js'
import './lib/style.css'
const vueApp = createApp(App)
const loginComp = createComp({
  Vue: vueApp,
  key: 3588,
  defaultPassword: 'clear!@#',
  title: 'Login',
  btnText: 'Submit',
  onSuccess (res) {
    console.log(res.info)
    router.push({
      name: 'Home'
    })
  },
  onError (res) {
    alert(res.info)
  }
})
router.addRoute(
  {
    name: 'login',
    path: '/login',
    component: loginComp
  }
)
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else if (localStorage.getItem('dbpExpireAt') && localStorage.getItem('dbpExpireAt') > new Date().setUTCHours(0, 0, 0, 0)) {
    next()
  } else {
    next('/login')
  }
})
router.afterEach((to, from) => {
  if (to.name === 'login') {
    localStorage.removeItem('dbpExpireAt')
  }
})


vueApp.use(router).mount('#app')
