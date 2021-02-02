<template>
  <div class="home">
    <input type="text" v-model="expireAt" placeholder="YYYYMMDD">
    <input type="text" v-model="key" placeholder="key">
    <button @click="getPassword">Generate</button>
    <button @click="logout">Logout</button>
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
        this.result = 'Format error'
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