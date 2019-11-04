<template>
  <v-app-bar app color="transparent" flat>
    <v-toolbar-title class="headline font-weight-light">
      HAT
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="$store.state.auth.isLoggedIn" text to="/logout">Logout</v-btn>
      <v-btn v-else text rounded to="/login">Login</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
// import TheLoginLogoutButton from './the-login-logout-button'
export default {
  components: {
    // TheLoginLogoutButton,
  },
  data() {
    return {
      navLinks: [
        {
          to: '/about',
          text: 'About',
        },
      ],
    }
  },
}
</script>