# date-based-password
A Vue3 component to generate and verify a password based on date

## Installation

    npm install date-based-password -S

## Example

``` javascript
// in main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import createComp from 'date-based-password'
import 'date-based-password/dist/style.css'

const vueApp = createApp(App)

const loginComp = createComp({
  Vue: vueApp,
  key: 3588,
  defaultPassword: 'your-default-password',
  title: 'Please Login',
  btnText: 'Submit',
  onSuccess (res) {
    // {
    //   code: 200,
    //   info: expireTimeInTimestamp
    // }
    // then you can handle success
    router.push({
      name: 'Home'
    })
  },
  onError (res) {
    // {
    //   code: 401,
    //   info: 'error'
    // }
    // or
    // {
    //   code: 403,
    //   info: 'expired'
    // }
    // then you can handle error
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

```

## Custom Style
You can use your own stylesheet instead of the default "date-based-password.css"
The template of the components is like this:
``` html
<div class="login-page">
  <h1 class="title">{{ title }}</h1>
  <div class="form">
    <input type="password">
    <button>{{ btnText }}</button>
  </div>
</div> 
```

## License
[MIT license](http://www.opensource.org/licenses/MIT).