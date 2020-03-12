/* eslint-disable no-unused-vars */
<template>
  <div class="login">
    <h2>ログイン</h2>
    <div v-if="error" class="error">
      {{ error}}
    </div>
    <form @submit.prevent="login">
      <div>
        ユーザー名:
        <input type="text" placeholder="username" v-model="username" required>
      </div>
      <div>
        パスワード:
        <input type="password" placeholder="password" v-model="password" required>
      </div>
      <button>ログイン</button>
    </form>
    <br>
    <router-link to="/signup">ユーザー登録</router-link>
    <br>
    <router-link to="/reset">パスワードリセット</router-link>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error : false
    }
  },
  methods: {
    login () {
      this.$cognito.login(this.username, this.password)
        .then(() => {
          this.$router.replace('/home')
        })
        .catch(err =>{
          this.error=err.message
        })
    }
  }
}
</script>