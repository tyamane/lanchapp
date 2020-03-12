/* eslint-disable no-unused-vars */
<template>
  <div class="reset">
    <h2>パスワードの初期化</h2>
    <div v-if="error" class="error">
      {{ error}}
    </div>
    <form @submit.prevent="reset">
      <div>
        ユーザー名:
        <input type="text" placeholder="username" v-model="username" required>
      </div>
      <button>リセット</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Reset',
  data () {
    return {
      username: '',
      error: null
    }
  },
  methods: {
    reset () {
      this.$cognito.resetPassword(this.username)
        .then(() => {
          alert("パスワードを初期化しました")
          // パスワード再設定ページへ
          this.$router.push({name: 'ConfirmPassword',params:{username: this.username} })
        })
        .catch(err =>{
          this.error=err.message
        })
    }
  }
}
</script>