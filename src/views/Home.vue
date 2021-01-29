<template>
  <div>
    <input type="text" v-model="expireAt" placeholder="YYYYMMDD">
    <input type="text" v-model="key" placeholder="key">
    <button @click="getPassword">生成密码</button>
    <button @click="logout">退出</button>
    <p>{{ result }}</p>
  </div>
</template>
<script>
import { generatePassword } from '@/lib'
export default {
  data () {
    return {
      expireAt: '',
      key: 3588,
      result: ''
    }
  },
  methods: {
    getPassword () {
      if (this.expireAt.length === 8) {
        this.result = generatePassword(this.expireAt, this.key)
      } else {
        this.result = '格式错误'
      }
    },
    logout () {
      localStorage.removeItem('dbpExpire')
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>