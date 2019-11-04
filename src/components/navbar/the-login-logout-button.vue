<template>
  <v-btn text :to="to">
    {{text}}
  </v-btn>
</template>

<script>
export default {
  computed: {
    to() {
      return '/login'
    },
    text() {
      return 'Login'
    }
  },
}
</script>