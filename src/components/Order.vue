<template>
  <div class="hello">
    <h2>My Order</h2>
    <div v-if="error" class="error">
      {{ error}}
    </div>
    <div>ログイン済み</div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  props: {
    msg: String,
    error: null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
