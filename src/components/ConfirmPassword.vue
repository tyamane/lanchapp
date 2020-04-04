/* eslint-disable no-unused-vars */
<template>
  <div class="confirm">
    <h2>パスワード再設定</h2>
    <div>{{this.$route.params.username}}</div>
    <div v-if="error" class="error"></div>
    <form @submit.prevent="confirm">
      <div>
        メール:
        <input type="text" placeholder="メール" required readonly v-bind:value=this.$route.params.username>
      </div>
      <div>
        パスワード:
        <input type="password" placeholder="new password" v-model="newPassword" required>
      </div>
      <div>
        確認コード:
        <input type="text" placeholder="確認コード" v-model="confirmationCode" required>
      </div>
      <button>確認</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  data () {
    return {
      username: '',
      confirmationCode: '',
      newPassword: null,
      error: false
    }
  },
  methods: {
    confirm () {
      this.$cognito.confirmPassword(this.$route.params.username, this.confirmationCode, this.newPassword)
        .then( () => {
          alert("パスワードを変更しました")
          this.$router.replace('/login')
        })
        .then(err => {
          this.error = err
        })
    }
  }
}
</script>
