<template>
  <v-app-bar app color="transparent" flat>
    <v-toolbar-title class="headline font-weight-light">
      HAT
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <template v-for="link in navLinks">
        <v-btn text :key="link.to" :to="link.to">{{link.text}}</v-btn>
      </template>
      <TheLoginLogoutButton />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import TheLoginLogoutButton from './the-login-logout-button'
export default {
  components: {
    TheLoginLogoutButton,
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
  }
}
</script>