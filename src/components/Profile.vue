<template>
  <div class="profile">
    <h2>Profile</h2>

    <router-link to="/login">ログイン</router-link>
    <router-link to="/singup">ユーザー登録</router-link>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      username: '',
      confirmationCode: ''
    }
  },
  methods: {
    }
}
</script>
