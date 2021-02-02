# date-based-password
A Vue3 component to generate and verify a password based on date

## Installation

    npm install date-based-password -S

## Usage
### Generate a password
``` javascript
import { generatePassword } from 'date-based-password'
const expireAt = '20210915' // YYYYMMDD
const key = 3588 // 0000~9999
const password = generatePassword(expireAt, key)
```

### Decode a password
``` javascript
import { decodePassword } from 'date-based-password'
const password = 'uwhzq01e'
const key = 3588 // 0000~9999
const result = decodePassword(password, key)
// { code: 200, info: expireTimeInTimestamp }
// or
// { code: 401, info: 'error' }
// or
// { code: 403, info: 'expired' }
```

### Use the login component
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
  key: 3588, // 0000~9999 it's used to generate and verify the password
  defaultPassword: 'your-default-password',
  title: 'Please Login',
  btnText: 'Submit',
  onSuccess (res) {
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

```

## Custom Style
You can use your own stylesheet instead of the default "dist/style.css"
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