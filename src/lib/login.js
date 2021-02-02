import { h, resolveComponent } from 'vue'
import decodePassword from './decodePassword'
export default ({
  Vue, key, defaultPassword, title, onSuccess, onError, btnText
}) => {
  Vue.component('loginComp', {
    render () {
      return h('div', {
        class: ['login-page']
      }, [
        h('h1', {
          class: ['title']
        }, title),
        h('div', {
          class: ['form']
        }, [
          h('input', {
            type: 'password',
            value: this.password,
            onInput: (e) => {
              this.password = e.target.value
            },
            onKeyup: e => {
              if (e.key === 'Enter') {
                this.submit()
              }
            }
          }),
          h('button', {
            onClick: this.submit
          }, btnText)
        ])
      ])
    },
    data () {
      return {
        password: ''
      }
    },
    methods: {
      submit () {
        if (this.password === defaultPassword) {
          localStorage.setItem('dbpExpireAt', new Date().getTime() + 48 * 3600 * 1000)
          onSuccess({
            info: 'default password'
          })
          return
        }
        const res = decodePassword(this.password, key)
        if (res.code === 200) {
          localStorage.setItem('dbpExpireAt', res.info)
          onSuccess(res)
        } else {
          onError(res)
        }
      }
    }
  })
  return {
    setup () {
      const comp = resolveComponent('loginComp')
      return () => h(comp)
    }
  }
}
