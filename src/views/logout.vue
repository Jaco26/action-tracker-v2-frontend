<template>
  <v-layout>
    <v-flex>
      <h1>Logout</h1>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('user/LOGOUT')
  }
}
</script>