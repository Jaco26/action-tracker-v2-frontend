<template>
  <v-app>
    <TheNavbar />
    <v-content>
      <v-container fluid style="height: 100%">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/navbar/the-navbar'
export default {
  name: 'AppContainer',
  components: {
    TheNavbar
  },
};
</script>
